from fastapi import APIRouter, HTTPException

from app.schemas.request import RevenuePredictionRequest
from app.schemas.response import RevenuePredictionResponse
from app.services.predict_service import predict_revenue

router = APIRouter()


@router.post("/predict", response_model=RevenuePredictionResponse)
def predict(request: RevenuePredictionRequest):
    try:
        result = predict_revenue(request)
        return result

    except FileNotFoundError as error:
        raise HTTPException(
            status_code=500,
            detail={
                "message": "Artifact model tidak ditemukan atau belum lengkap.",
                "error": str(error),
            },
        )

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail={
                "message": "Input prediksi tidak valid.",
                "error": str(error),
            },
        )

    except Exception as error:
        raise HTTPException(
            status_code=500,
            detail={
                "message": "Terjadi error saat memproses prediksi Revenue.",
                "error": str(error),
            },
        )