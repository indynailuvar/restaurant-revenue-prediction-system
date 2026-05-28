from typing import Any

from pydantic import BaseModel


class RevenuePredictionResponse(BaseModel):
    # Backward compatibility untuk frontend lama.
    # Nilainya sama dengan predicted_revenue_usd.
    predicted_revenue: float

    # Output utama model dalam USD.
    predicted_revenue_usd: float
    currency: str = "USD"

    # Output tambahan hasil konversi ke IDR.
    predicted_revenue_idr: float
    converted_currency: str = "IDR"
    usd_to_idr_rate: float
    exchange_rate_note: str

    model_status: str
    model_name: str
    model_version: str | None = None
    model_alias: str | None = None

    currency_note: str

    input_status: str
    prediction_reliability: str
    validation_warnings: list[str]
    out_of_range_features: list[dict[str, Any]]
    unknown_categories: list[dict[str, Any]]
    is_prediction_adjusted: bool
    prediction_note: str

    supporting_factors: list[str]
    recommendation: str