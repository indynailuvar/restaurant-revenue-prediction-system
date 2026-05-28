from pathlib import Path
import pickle
import json

import joblib


ARTIFACT_DIR = Path("models/trained")

FEATURE_NAMES_PATH = ARTIFACT_DIR / "feature_names.pkl"
ENCODERS_PATH = ARTIFACT_DIR / "encoders.pkl"


def load_file(path: Path):
    try:
        return joblib.load(path)
    except Exception:
        with open(path, "rb") as file:
            return pickle.load(file)


def main():
    feature_names = load_file(FEATURE_NAMES_PATH)
    encoders = load_file(ENCODERS_PATH)

    print("=== FEATURE NAMES ===")
    print(f"Total features: {len(feature_names)}")

    for index, feature in enumerate(feature_names, start=1):
        print(f"{index}. {feature}")

    print("\n=== ENCODERS ===")

    if isinstance(encoders, dict):
        print(f"Total encoders: {len(encoders)}")

        for column, encoder in encoders.items():
            print(f"\nColumn: {column}")
            print(f"Encoder type: {type(encoder)}")

            if hasattr(encoder, "classes_"):
                classes = list(encoder.classes_)
                print(f"Total classes: {len(classes)}")
                print("Sample classes:")
                for value in classes[:20]:
                    print(f"  - {value}")
            else:
                print("Encoder tidak memiliki attribute classes_.")
    else:
        print(f"Encoders bukan dict. Type: {type(encoders)}")

    sample_input = {}

    for feature in feature_names:
        sample_input[feature] = 0

    if isinstance(encoders, dict):
        for column, encoder in encoders.items():
            if hasattr(encoder, "classes_") and len(encoder.classes_) > 0:
                sample_input[column] = str(encoder.classes_[0])
            else:
                sample_input[column] = "unknown"

    output_dir = Path("reports/model_requirements")
    output_dir.mkdir(parents=True, exist_ok=True)

    output_path = output_dir / "sample_prediction_input.json"

    with open(output_path, "w", encoding="utf-8") as file:
        json.dump({"features": sample_input}, file, indent=4, ensure_ascii=False)

    print(f"\n[SUCCESS] Sample input disimpan ke: {output_path}")


if __name__ == "__main__":
    main()