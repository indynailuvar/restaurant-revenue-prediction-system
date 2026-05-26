from typing import Any
import os

import pandas as pd

from app.services.model_loader import load_model_artifacts


DEFAULT_USD_TO_IDR_RATE = 16000.0


def get_usd_to_idr_rate() -> float:
    raw_rate = os.getenv("USD_TO_IDR_RATE", str(DEFAULT_USD_TO_IDR_RATE))

    try:
        rate = float(raw_rate)
    except ValueError:
        rate = DEFAULT_USD_TO_IDR_RATE

    if rate <= 0:
        return DEFAULT_USD_TO_IDR_RATE

    return rate


class PredictionService:
    def __init__(self):
        self.model = None
        self.scaler = None
        self.feature_names = None
        self.encoders = None
        self.training_metadata: dict[str, Any] = {}

        self.model_name = None
        self.model_version = None
        self.model_alias = None

    def load_artifacts(self) -> None:
        artifacts = load_model_artifacts()

        self.model = artifacts["model"]
        self.scaler = artifacts["scaler"]
        self.feature_names = artifacts["feature_names"]
        self.encoders = artifacts["encoders"]
        self.training_metadata = artifacts.get("training_metadata", {})

        self.model_name = artifacts["model_name"]
        self.model_version = artifacts["model_version"]
        self.model_alias = artifacts["model_alias"]

    def predict(self, input_data: dict[str, Any]) -> dict[str, Any]:
        if self.model is None:
            self.load_artifacts()

        validation_result = self._validate_input_against_training_metadata(input_data)

        input_df = pd.DataFrame([input_data])
        processed_df = self._preprocess(input_df)

        prediction = self.model.predict(processed_df)

        raw_predicted_revenue_usd = float(prediction[0])

        # Revenue secara bisnis tidak boleh negatif.
        # Jika model menghasilkan angka negatif, nilai ditahan menjadi 0.
        predicted_revenue_usd = max(raw_predicted_revenue_usd, 0.0)
        is_prediction_adjusted = raw_predicted_revenue_usd < 0

        if is_prediction_adjusted:
            validation_result["validation_warnings"].append(
                "Model menghasilkan prediksi Revenue negatif. Sistem menyesuaikan nilai menjadi 0 karena Revenue tidak dapat bernilai negatif."
            )
            validation_result["input_status"] = "warning"
            validation_result["prediction_reliability"] = "low"

        return self._build_response(
            predicted_revenue_usd=predicted_revenue_usd,
            input_data=input_data,
            validation_result=validation_result,
            is_prediction_adjusted=is_prediction_adjusted,
        )

    def _validate_input_against_training_metadata(
        self,
        input_data: dict[str, Any],
    ) -> dict[str, Any]:
        numeric_ranges = self.training_metadata.get("numeric_ranges", {})
        categorical_values = self.training_metadata.get("categorical_values", {})

        validation_warnings: list[str] = []
        out_of_range_features: list[dict[str, Any]] = []
        unknown_categories: list[dict[str, Any]] = []

        for feature, range_info in numeric_ranges.items():
            if feature not in input_data:
                continue

            value = input_data.get(feature)

            try:
                numeric_value = float(value)
            except (TypeError, ValueError):
                validation_warnings.append(
                    f"Nilai {feature} tidak dapat dibaca sebagai angka."
                )
                continue

            min_value = range_info.get("min")
            max_value = range_info.get("max")

            if min_value is None or max_value is None:
                continue

            if numeric_value < min_value or numeric_value > max_value:
                out_of_range_features.append(
                    {
                        "feature": feature,
                        "input_value": numeric_value,
                        "training_min": min_value,
                        "training_max": max_value,
                        "message": (
                            f"Nilai {feature} berada di luar rentang data training."
                        ),
                    }
                )

        for feature, allowed_values in categorical_values.items():
            if feature not in input_data:
                continue

            input_value = str(input_data.get(feature)).strip()

            allowed_values_as_string = [
                str(value).strip()
                for value in allowed_values
            ]

            if input_value not in allowed_values_as_string:
                unknown_categories.append(
                    {
                        "feature": feature,
                        "input_value": input_value,
                        "allowed_values": allowed_values_as_string,
                        "message": (
                            f"Kategori {input_value} pada fitur {feature} tidak ditemukan pada data training."
                        ),
                    }
                )

        if out_of_range_features:
            validation_warnings.append(
                "Beberapa nilai numerik berada di luar rentang data training."
            )

        if unknown_categories:
            validation_warnings.append(
                "Beberapa kategori input tidak ditemukan pada data training."
            )

        if validation_warnings:
            input_status = "warning"
            prediction_reliability = "low"
            prediction_note = (
                "Prediksi tetap dihitung, tetapi hasilnya perlu ditafsirkan dengan hati-hati "
                "karena terdapat input yang berada di luar distribusi atau kategori data training."
            )
        else:
            input_status = "valid"
            prediction_reliability = "normal"
            prediction_note = (
                "Input berada dalam kategori dan rentang data training yang diketahui. "
                "Hasil prediksi dapat digunakan sebagai estimasi awal."
            )

        return {
            "input_status": input_status,
            "prediction_reliability": prediction_reliability,
            "validation_warnings": validation_warnings,
            "out_of_range_features": out_of_range_features,
            "unknown_categories": unknown_categories,
            "prediction_note": prediction_note,
        }

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

        value_as_string = str(value).strip()

        if value_as_string in classes:
            return value_as_string

        # Fallback agar backend tetap bisa prediksi.
        # Warning untuk kategori tidak dikenal sudah dibuat di tahap validasi metadata.
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
        predicted_revenue_usd: float,
        input_data: dict[str, Any],
        validation_result: dict[str, Any],
        is_prediction_adjusted: bool,
    ) -> dict[str, Any]:
        usd_to_idr_rate = get_usd_to_idr_rate()
        predicted_revenue_idr = predicted_revenue_usd * usd_to_idr_rate

        return {
            # Field lama dipertahankan agar frontend lama tidak error.
            # Maknanya tetap USD.
            "predicted_revenue": round(predicted_revenue_usd, 2),

            # Output utama USD.
            "predicted_revenue_usd": round(predicted_revenue_usd, 2),
            "currency": "USD",

            # Output tambahan IDR.
            "predicted_revenue_idr": round(predicted_revenue_idr, 2),
            "converted_currency": "IDR",
            "usd_to_idr_rate": usd_to_idr_rate,
            "exchange_rate_note": (
                "Konversi IDR menggunakan rate konfigurasi sistem, bukan kurs real-time."
            ),

            "model_status": "loaded",
            "model_name": self.model_name or "restaurant_gb_revenue1",
            "model_version": self.model_version or "1",
            "model_alias": self.model_alias or "champion",
            "currency_note": (
                "Prediksi Revenue utama ditampilkan dalam USD sesuai satuan target pada dataset training."
            ),

            "input_status": validation_result["input_status"],
            "prediction_reliability": validation_result["prediction_reliability"],
            "validation_warnings": validation_result["validation_warnings"],
            "out_of_range_features": validation_result["out_of_range_features"],
            "unknown_categories": validation_result["unknown_categories"],
            "is_prediction_adjusted": is_prediction_adjusted,
            "prediction_note": validation_result["prediction_note"],

            "supporting_factors": self._get_supporting_factors(input_data),
            "recommendation": self._build_recommendation(validation_result),
        }

    def _build_recommendation(self, validation_result: dict[str, Any]) -> str:
        if validation_result["input_status"] == "warning":
            return (
                "Hasil prediksi tetap dihitung, tetapi terdapat input yang berada di luar "
                "rentang atau kategori data training. Gunakan hasil ini sebagai estimasi awal "
                "dan tafsirkan dengan hati-hati karena akurasi dapat menurun."
            )

        return (
            "Hasil prediksi dapat digunakan sebagai estimasi awal Revenue restoran berdasarkan "
            "fitur operasional, pemasaran, ulasan, reservasi, dan karakteristik bisnis yang diberikan."
        )

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
            factors.append("Restoran memiliki alokasi anggaran pemasaran dalam USD.")

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