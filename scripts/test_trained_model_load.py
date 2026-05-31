from pathlib import Path
import sys


PROJECT_ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(PROJECT_ROOT))


from backend.app.services.predict_service import PredictionService


def main():
    service = PredictionService()
    status = service.load_artifacts()

    print("[SUCCESS] Artifact model berhasil di-load.")
    print(status)


if __name__ == "__main__":
    main()