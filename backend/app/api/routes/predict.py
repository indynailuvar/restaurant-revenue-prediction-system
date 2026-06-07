from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import Session

from app.database import get_db
from app.repositories.prediction_history_repository import create_prediction_history
from app.schemas.request import RevenuePredictionRequest
from app.schemas.response import RevenuePredictionResponse
from app.services.predict_service import predict_revenue

router = APIRouter()


@router.post("/predict", response_model=RevenuePredictionResponse)
def predict(
    request: RevenuePredictionRequest,
    db: Session = Depends(get_db),
):
    try:
        result = predict_revenue(request)

        if hasattr(request, "model_dump"):
            input_payload = request.model_dump()
        else:
            input_payload = request.dict()

        prediction_history_id = None
        try:
            history = create_prediction_history(
                db=db,
                input_payload=input_payload,
                prediction_result=result,
            )
            prediction_history_id = history.id
        except SQLAlchemyError:
            # Prediction tetap dikembalikan walau histori gagal disimpan.
            prediction_history_id = None

        result["prediction_history_id"] = prediction_history_id
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