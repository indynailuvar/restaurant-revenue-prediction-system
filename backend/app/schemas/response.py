from pydantic import BaseModel


class RevenuePredictionResponse(BaseModel):
    predicted_revenue: float
    model_status: str
    model_name: str