from fastapi import APIRouter

from app.services.model_loader import (
    MODEL_ALIAS,
    MODEL_NAME,
    MODEL_VERSION,
    validate_artifacts,
)

router = APIRouter()


@router.get("/model-info")
def model_info():
    artifact_status = validate_artifacts()

    return {
        "project": "restaurant revenue prediction",
        "problem_type": "regression",
        "target": "Revenue",
        "model_name": MODEL_NAME,
        "model_version": MODEL_VERSION,
        "model_alias": MODEL_ALIAS,
        "artifact_status": artifact_status,
        "endpoint": {
            "health": "/health",
            "predict": "/predict",
            "docs": "/docs",
        },
    }