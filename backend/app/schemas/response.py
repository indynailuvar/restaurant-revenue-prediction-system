from pydantic import BaseModel


class RevenuePredictionResponse(BaseModel):
    predicted_revenue: float
    model_status: str
    model_name: str
    model_version: str | None = None
    model_alias: str | None = None
    currency_note: str
    supporting_factors: list[str]
    recommendation: str