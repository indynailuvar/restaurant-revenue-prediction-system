from __future__ import annotations

import json
from pathlib import Path
from typing import Any

import pandas as pd


ROOT_DIR = Path(__file__).resolve().parents[1]
RAW_DATA_PATH = ROOT_DIR / "data" / "raw" / "restaurant_data.csv"
OUTPUT_PATH = ROOT_DIR / "models" / "trained" / "training_metadata.json"


COLUMN_RENAME_MAP = {
    "Seating Capacity": "Seating_Capacity",
    "Average Meal Price": "Average_Meal_Price",
    "Marketing Budget": "Marketing_Budget",
    "Social Media Followers": "Social_Media_Followers",
    "Chef Experience Years": "Chef_Experience_Years",
    "Number of Reviews": "Number_of_Reviews",
    "Avg Review Length": "Avg_Review_Length",
    "Ambience Score": "Ambience_Score",
    "Service Quality Score": "Service_Quality_Score",
    "Parking Availability": "Parking_Availability",
    "Weekend Reservations": "Weekend_Reservations",
    "Weekday Reservations": "Weekday_Reservations",
}


CATEGORICAL_COLUMNS = [
    "Location",
    "Cuisine",
    "Parking_Availability",
]


NUMERIC_COLUMNS = [
    "Rating",
    "Seating_Capacity",
    "Average_Meal_Price",
    "Marketing_Budget",
    "Social_Media_Followers",
    "Chef_Experience_Years",
    "Number_of_Reviews",
    "Avg_Review_Length",
    "Ambience_Score",
    "Service_Quality_Score",
    "Weekend_Reservations",
    "Weekday_Reservations",
]


def clean_number(value: Any) -> float | None:
    """
    Membersihkan angka dari dataset.
    Beberapa nilai bisa terbaca sebagai string dengan format titik yang aneh,
    misalnya 16.192.490.574.327.900.
    Fungsi ini mencoba mengubahnya menjadi angka yang masuk akal.
    """
    if pd.isna(value):
        return None

    if isinstance(value, (int, float)):
        return float(value)

    text = str(value).strip()

    if text == "":
        return None

    # Jika ada banyak titik, anggap titik pertama sebagai desimal,
    # lalu titik berikutnya dihapus.
    # Contoh: 16.192.490.574.327.900 -> 16.192490574327900
    if text.count(".") > 1:
        parts = text.split(".")
        text = parts[0] + "." + "".join(parts[1:])

    try:
        return float(text)
    except ValueError:
        return None


def main() -> None:
    if not RAW_DATA_PATH.exists():
        raise FileNotFoundError(f"Dataset tidak ditemukan: {RAW_DATA_PATH}")

    # Dataset kamu terlihat memakai separator semicolon ;
    df = pd.read_csv(RAW_DATA_PATH, sep=";")

    df = df.rename(columns=COLUMN_RENAME_MAP)

    for col in NUMERIC_COLUMNS + ["Revenue"]:
        if col in df.columns:
            df[col] = df[col].apply(clean_number)

    numeric_ranges = {}

    for col in NUMERIC_COLUMNS:
        if col in df.columns:
            series = pd.to_numeric(df[col], errors="coerce").dropna()

            if not series.empty:
                numeric_ranges[col] = {
                    "min": float(series.min()),
                    "max": float(series.max()),
                    "mean": float(series.mean()),
                }

    categorical_values = {}

    for col in CATEGORICAL_COLUMNS:
        if col in df.columns:
            values = (
                df[col]
                .dropna()
                .astype(str)
                .str.strip()
                .sort_values()
                .unique()
                .tolist()
            )
            categorical_values[col] = values

    target_series = pd.to_numeric(df["Revenue"], errors="coerce").dropna()

    target_metadata = {
        "name": "Revenue",
        "currency": "USD",
    }

    if not target_series.empty:
        target_metadata.update(
            {
                "min": float(target_series.min()),
                "max": float(target_series.max()),
                "mean": float(target_series.mean()),
            }
        )

    metadata = {
        "project": "restaurant revenue prediction",
        "problem_type": "regression",
        "target": target_metadata,
        "currency": "USD",
        "categorical_columns": CATEGORICAL_COLUMNS,
        "numeric_columns": NUMERIC_COLUMNS,
        "categorical_values": categorical_values,
        "numeric_ranges": numeric_ranges,
        "prediction_warning_note": (
            "Jika input berada di luar rentang data training, prediksi tetap dihitung "
            "tetapi hasilnya perlu ditafsirkan dengan hati-hati."
        ),
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)

    with open(OUTPUT_PATH, "w", encoding="utf-8") as file:
        json.dump(metadata, file, indent=2, ensure_ascii=False)

    print(f"Training metadata berhasil dibuat: {OUTPUT_PATH}")
    print(json.dumps(metadata, indent=2, ensure_ascii=False))


if __name__ == "__main__":
    main()