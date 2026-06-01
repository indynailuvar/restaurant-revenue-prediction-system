from pathlib import Path
import json
import sys


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))


from backend.app.services.predict_service import PredictionService


SAMPLE_INPUT_PATH = Path("reports/model_requirements/sample_prediction_input.json")


def main():
    service = PredictionService()

    if SAMPLE_INPUT_PATH.exists():
        with open(SAMPLE_INPUT_PATH, "r", encoding="utf-8") as file:
            payload = json.load(file)

        features = payload["features"]
    else:
        features = {
            "delivery": 1,
            "takeaway": 1,
            "dine_in": 1,
            "ada_instagram": 1,
            "ada_website": 0,
            "ada_jam_buka": 1,
            "bayar_qris": 1,
        }

    result = service.predict(features)

    print("[SUCCESS] Prediksi berhasil.")
    print(json.dumps(result, indent=4, ensure_ascii=False))


if __name__ == "__main__":
    main()