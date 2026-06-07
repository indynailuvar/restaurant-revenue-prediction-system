from datetime import datetime
from typing import Any

from pydantic import BaseModel


class PredictionHistoryResponse(BaseModel):
    id: int
    input_payload: dict[str, Any]

    predicted_revenue_usd: float
    predicted_revenue_idr: float

    currency: str
    converted_currency: str
    usd_to_idr_rate: float

    input_status: str
    prediction_reliability: str

    validation_warnings: list[Any] | None = None
    out_of_range_features: list[Any] | None = None
    unknown_categories: list[Any] | None = None

    model_name: str | None = None
    model_version: str | None = None
    model_alias: str | None = None

    created_at: datetime

    class Config:
        orm_mode = True