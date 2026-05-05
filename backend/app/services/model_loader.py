from pathlib import Path


MODEL_PATH = Path("backend/app/ml/artifacts/model.joblib")
PREPROCESSOR_PATH = Path("backend/app/ml/artifacts/preprocessor.joblib")


def model_files_exist() -> bool:
    return MODEL_PATH.exists() and PREPROCESSOR_PATH.exists()