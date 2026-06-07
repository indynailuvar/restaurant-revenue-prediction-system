from datetime import datetime, timezone

from sqlalchemy import Column, DateTime, Float, Integer, String
from sqlalchemy.dialects.postgresql import JSONB

from app.database import Base


class PredictionHistory(Base):
    __tablename__ = "prediction_histories"

    id = Column(Integer, primary_key=True, index=True)

    input_payload = Column(JSONB, nullable=False)

    predicted_revenue_usd = Column(Float, nullable=False)
    predicted_revenue_idr = Column(Float, nullable=False)

    currency = Column(String(10), default="USD", nullable=False)
    converted_currency = Column(String(10), default="IDR", nullable=False)
    usd_to_idr_rate = Column(Float, nullable=False)

    input_status = Column(String(50), nullable=False)
    prediction_reliability = Column(String(50), nullable=False)

    validation_warnings = Column(JSONB, nullable=True)
    out_of_range_features = Column(JSONB, nullable=True)
    unknown_categories = Column(JSONB, nullable=True)

    model_name = Column(String(255), nullable=True)
    model_version = Column(String(50), nullable=True)
    model_alias = Column(String(50), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )