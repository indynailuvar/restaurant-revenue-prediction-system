from pydantic import BaseModel, Field


class RevenuePredictionRequest(BaseModel):
    Location: str = Field(..., example="Downtown")
    Cuisine: str = Field(..., example="Japanese")
    Rating: float = Field(..., ge=0, le=5, example=4.5)
    Seating_Capacity: int = Field(..., ge=0, example=80)
    Average_Meal_Price: float = Field(..., ge=0, example=150000)
    Marketing_Budget: float = Field(..., ge=0, example=5000000)
    Social_Media_Followers: int = Field(..., ge=0, example=12000)
    Chef_Experience_Years: int = Field(..., ge=0, example=8)
    Number_of_Reviews: int = Field(..., ge=0, example=350)
    Avg_Review_Length: float = Field(..., ge=0, example=120)
    Ambience_Score: float = Field(..., ge=0, le=5, example=4.3)
    Service_Quality_Score: float = Field(..., ge=0, le=5, example=4.4)
    Weekend_Reservations: int = Field(..., ge=0, example=60)
    Weekday_Reservations: int = Field(..., ge=0, example=35)
    Parking_Availability: str = Field(..., example="Yes")