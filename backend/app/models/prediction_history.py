from datetime import datetime, timezone

from sqlalchemy import JSON, Column, DateTime, Float, Integer, String

from app.database import Base


class PredictionHistory(Base):
    __tablename__ = "prediction_histories"

    id = Column(Integer, primary_key=True, index=True)

    input_payload = Column(JSON, nullable=False)

    predicted_revenue_usd = Column(Float, nullable=False)
    predicted_revenue_idr = Column(Float, nullable=False)

    currency = Column(String(10), nullable=False, default="USD")
    converted_currency = Column(String(10), nullable=False, default="IDR")
    usd_to_idr_rate = Column(Float, nullable=False)

    input_status = Column(String(50), nullable=False)
    prediction_reliability = Column(String(50), nullable=False)

    validation_warnings = Column(JSON, nullable=True)
    out_of_range_features = Column(JSON, nullable=True)
    unknown_categories = Column(JSON, nullable=True)

    model_name = Column(String(255), nullable=True)
    model_version = Column(String(50), nullable=True)
    model_alias = Column(String(50), nullable=True)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )