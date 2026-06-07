from typing import Any

from sqlalchemy.orm import Session

from app.models.prediction_history import PredictionHistory


def create_prediction_history(
    db: Session,
    input_payload: dict[str, Any],
    prediction_result: dict[str, Any],
) -> PredictionHistory:
    history = PredictionHistory(
        input_payload=input_payload,

        predicted_revenue_usd=prediction_result.get("predicted_revenue_usd", 0),
        predicted_revenue_idr=prediction_result.get("predicted_revenue_idr", 0),

        currency=prediction_result.get("currency", "USD"),
        converted_currency=prediction_result.get("converted_currency", "IDR"),
        usd_to_idr_rate=prediction_result.get("usd_to_idr_rate", 16000),

        input_status=prediction_result.get("input_status", "unknown"),
        prediction_reliability=prediction_result.get("prediction_reliability", "unknown"),

        validation_warnings=prediction_result.get("validation_warnings", []),
        out_of_range_features=prediction_result.get("out_of_range_features", []),
        unknown_categories=prediction_result.get("unknown_categories", []),

        model_name=prediction_result.get("model_name"),
        model_version=prediction_result.get("model_version"),
        model_alias=prediction_result.get("model_alias"),
    )

    db.add(history)
    db.commit()
    db.refresh(history)

    return history


def get_prediction_histories(
    db: Session,
    limit: int = 20,
) -> list[PredictionHistory]:
    return (
        db.query(PredictionHistory)
        .order_by(PredictionHistory.created_at.desc())
        .limit(limit)
        .all()
    )