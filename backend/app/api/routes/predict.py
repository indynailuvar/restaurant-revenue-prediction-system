from fastapi import APIRouter
from backend.app.schemas.request import RevenuePredictionRequest
from backend.app.schemas.response import RevenuePredictionResponse
from backend.app.services.predict_service import predict_revenue

router = APIRouter()


@router.post("/predict", response_model=RevenuePredictionResponse)
def predict(request: RevenuePredictionRequest):
    result = predict_revenue(request.model_dump())
    return result