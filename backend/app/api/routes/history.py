from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.exc import SQLAlchemyError
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
    try:
        return get_prediction_histories(db=db, limit=limit)
    except SQLAlchemyError as exc:
        raise HTTPException(
            status_code=503,
            detail=f"Database error: {exc}",
        )