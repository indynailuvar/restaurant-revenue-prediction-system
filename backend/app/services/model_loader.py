from pathlib import Path
from typing import Any
import json
import os
import pickle

import joblib


MODEL_NAME = os.getenv("MODEL_NAME", "restaurant_gb_revenue1")
MODEL_VERSION = os.getenv("MODEL_VERSION", "1")
MODEL_ALIAS = os.getenv("MODEL_ALIAS", "champion")


def get_project_root() -> Path:
    current_path = Path(__file__).resolve()

    for parent in current_path.parents:
        if (parent / "models" / "trained").exists():
            return parent

    raise FileNotFoundError(
        "Root project tidak ditemukan. Folder models/trained tidak ditemukan dari posisi file backend."
    )


PROJECT_ROOT = get_project_root()
MODEL_DIR = Path(os.getenv("MODEL_DIR", PROJECT_ROOT / "models" / "trained"))

MODEL_PATH = MODEL_DIR / "best_model.pkl"
SCALER_PATH = MODEL_DIR / "scaler.pkl"
FEATURE_NAMES_PATH = MODEL_DIR / "feature_names.pkl"
ENCODERS_PATH = MODEL_DIR / "encoders.pkl"
TRAINING_METADATA_PATH = MODEL_DIR / "training_metadata.json"


def load_pickle_or_joblib(path: Path) -> Any:
    if not path.exists():
        raise FileNotFoundError(f"File artifact tidak ditemukan: {path}")

    try:
        return joblib.load(path)
    except Exception:
        with open(path, "rb") as file:
            return pickle.load(file)


def load_training_metadata() -> dict[str, Any]:
    if not TRAINING_METADATA_PATH.exists():
        return {
            "currency": "USD",
            "numeric_ranges": {},
            "categorical_values": {},
            "prediction_warning_note": (
                "Training metadata belum tersedia. Validasi range input belum aktif."
            ),
        }

    with open(TRAINING_METADATA_PATH, "r", encoding="utf-8") as file:
        return json.load(file)


def validate_artifacts() -> dict:
    required_files = {
        "model": MODEL_PATH,
        "scaler": SCALER_PATH,
        "feature_names": FEATURE_NAMES_PATH,
        "encoders": ENCODERS_PATH,
    }

    optional_files = {
        "training_metadata": TRAINING_METADATA_PATH,
    }

    missing_files = {
        name: str(path)
        for name, path in required_files.items()
        if not path.exists()
    }

    optional_missing_files = {
        name: str(path)
        for name, path in optional_files.items()
        if not path.exists()
    }

    return {
        "model_dir": str(MODEL_DIR),
        "required_files": {
            name: str(path)
            for name, path in required_files.items()
        },
        "optional_files": {
            name: str(path)
            for name, path in optional_files.items()
        },
        "missing_files": missing_files,
        "optional_missing_files": optional_missing_files,
        "is_complete": len(missing_files) == 0,
    }


def load_model_artifacts() -> dict:
    artifact_status = validate_artifacts()

    if not artifact_status["is_complete"]:
        raise FileNotFoundError(
            "Artifact model belum lengkap. File yang hilang: "
            + str(artifact_status["missing_files"])
        )

    model = load_pickle_or_joblib(MODEL_PATH)
    scaler = load_pickle_or_joblib(SCALER_PATH)
    feature_names = load_pickle_or_joblib(FEATURE_NAMES_PATH)
    encoders = load_pickle_or_joblib(ENCODERS_PATH)
    training_metadata = load_training_metadata()

    return {
        "model": model,
        "scaler": scaler,
        "feature_names": feature_names,
        "encoders": encoders,
        "training_metadata": training_metadata,
        "model_name": MODEL_NAME,
        "model_version": MODEL_VERSION,
        "model_alias": MODEL_ALIAS,
        "model_dir": str(MODEL_DIR),
    }