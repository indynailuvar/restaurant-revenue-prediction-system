from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from app.database import get_db
from app.repositories.prediction_history_repository import get_prediction_histories
from app.schemas.history import PredictionHistoryResponse


router = APIRouter()


@router.get("/prediction-history", response_model=list[PredictionHistoryResponse])
def list_prediction_history(
    limit: int = Query(default=20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    return get_prediction_histories(db=db, limit=limit)