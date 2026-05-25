from typing import Any

import pandas as pd

from app.services.model_loader import load_model_artifacts


class PredictionService:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.feature_names = None
        self.encoders = None
        self.model_name = None
        self.model_version = None
        self.model_alias = None

    def load_artifacts(self) -> None:
        artifacts = load_model_artifacts()

        self.model = artifacts["model"]
        self.scaler = artifacts["scaler"]
        self.feature_names = artifacts["feature_names"]
        self.encoders = artifacts["encoders"]
        self.model_name = artifacts["model_name"]
        self.model_version = artifacts["model_version"]
        self.model_alias = artifacts["model_alias"]

    def predict(self, input_data: dict[str, Any]) -> dict[str, Any]:
        if self.model is None:
            self.load_artifacts()

        input_df = pd.DataFrame([input_data])
        processed_df = self._preprocess(input_df)

        prediction = self.model.predict(processed_df)
        predicted_revenue = float(prediction[0])

        return self._build_response(predicted_revenue, input_data)

    def _preprocess(self, input_df: pd.DataFrame) -> pd.DataFrame:
        df = input_df.copy()

        df = self._clean_string_values(df)
        df = self._apply_encoders(df)
        df = self._one_hot_encode_remaining_objects(df)
        df = self._align_features(df)
        df = self._convert_to_numeric(df)
        df = self._apply_scaler(df)

        return df

    def _clean_string_values(self, df: pd.DataFrame) -> pd.DataFrame:
        for column in df.columns:
            if df[column].dtype == "object":
                df[column] = df[column].astype(str).str.strip()

        return df

    def _apply_encoders(self, df: pd.DataFrame) -> pd.DataFrame:
        if not isinstance(self.encoders, dict):
            return df

        for column, encoder in self.encoders.items():
            if column not in df.columns:
                continue

            try:
                value = df[column].iloc[0]

                if hasattr(encoder, "classes_"):
                    safe_value = self._get_safe_label_encoder_value(value, encoder)
                    df[column] = encoder.transform([safe_value])[0]

                elif isinstance(encoder, dict):
                    df[column] = encoder.get(value, encoder.get(str(value), 0))

            except Exception:
                df[column] = 0

        return df

    def _get_safe_label_encoder_value(self, value: Any, encoder: Any) -> Any:
        classes = list(encoder.classes_)

        if value in classes:
            return value

        value_as_string = str(value)

        if value_as_string in classes:
            return value_as_string

        return classes[0]

    def _one_hot_encode_remaining_objects(self, df: pd.DataFrame) -> pd.DataFrame:
        object_columns = df.select_dtypes(include=["object"]).columns.tolist()

        if object_columns:
            df = pd.get_dummies(df, columns=object_columns)

        return df

    def _align_features(self, df: pd.DataFrame) -> pd.DataFrame:
        if self.feature_names is None:
            raise ValueError("feature_names belum dimuat dari artifact model.")

        for feature in self.feature_names:
            if feature not in df.columns:
                df[feature] = 0

        df = df[self.feature_names]

        return df

    def _convert_to_numeric(self, df: pd.DataFrame) -> pd.DataFrame:
        return df.apply(pd.to_numeric, errors="coerce").fillna(0)

    def _apply_scaler(self, df: pd.DataFrame) -> pd.DataFrame:
        if self.scaler is None:
            return df

        if hasattr(self.scaler, "transform"):
            scaled_values = self.scaler.transform(df)
            return pd.DataFrame(scaled_values, columns=self.feature_names)

        return df

    def _build_response(
        self,
        predicted_revenue: float,
        input_data: dict[str, Any],
    ) -> dict[str, Any]:
        return {
            "predicted_revenue": round(predicted_revenue, 2),
            "model_status": "loaded",
            "model_name": self.model_name or "restaurant_gb_revenue1",
            "model_version": self.model_version or "1",
            "model_alias": self.model_alias or "champion",
            "currency_note": "Prediksi mengikuti skala Revenue pada dataset.",
            "supporting_factors": self._get_supporting_factors(input_data),
            "recommendation": (
                "Hasil prediksi dapat digunakan sebagai estimasi pendapatan restoran "
                "berdasarkan fitur operasional, pemasaran, ulasan, reservasi, "
                "dan karakteristik bisnis yang diberikan."
            ),
        }

    def _get_supporting_factors(self, input_data: dict[str, Any]) -> list[str]:
        factors = []

        rating = float(input_data.get("Rating", 0) or 0)
        seating_capacity = int(input_data.get("Seating_Capacity", 0) or 0)
        marketing_budget = float(input_data.get("Marketing_Budget", 0) or 0)
        social_media_followers = int(input_data.get("Social_Media_Followers", 0) or 0)
        weekend_reservations = int(input_data.get("Weekend_Reservations", 0) or 0)
        weekday_reservations = int(input_data.get("Weekday_Reservations", 0) or 0)
        number_of_reviews = int(input_data.get("Number_of_Reviews", 0) or 0)

        total_reservations = weekend_reservations + weekday_reservations

        if rating >= 4.0:
            factors.append("Rating restoran relatif tinggi.")

        if seating_capacity >= 75:
            factors.append("Kapasitas tempat duduk cukup besar.")

        if marketing_budget > 0:
            factors.append("Restoran memiliki alokasi anggaran pemasaran.")

        if social_media_followers >= 10000:
            factors.append("Jumlah pengikut media sosial relatif besar.")

        if total_reservations >= 80:
            factors.append("Jumlah reservasi menunjukkan permintaan pelanggan yang baik.")

        if number_of_reviews >= 300:
            factors.append("Jumlah ulasan pelanggan relatif banyak.")

        if not factors:
            factors.append(
                "Prediksi dihitung berdasarkan kombinasi seluruh fitur input yang diberikan."
            )

        return factors


prediction_service = PredictionService()


def predict_revenue(payload: Any) -> dict[str, Any]:
    if hasattr(payload, "model_dump"):
        features = payload.model_dump()
    elif isinstance(payload, dict):
        features = payload
    else:
        raise ValueError("Format input tidak valid untuk prediksi Revenue.")

    return prediction_service.predict(features)