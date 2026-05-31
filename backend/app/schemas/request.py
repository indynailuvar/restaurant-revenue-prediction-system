from pydantic import BaseModel, Field


class RevenuePredictionRequest(BaseModel):
    Location: str = Field(..., example="Rural")
    Cuisine: str = Field(..., example="Japanese")

    Rating: float = Field(..., ge=0, example=4.0)
    Seating_Capacity: int = Field(..., ge=0, example=38)

    # Dataset menggunakan satuan USD, jadi input ini juga harus USD.
    Average_Meal_Price: float = Field(..., ge=0, example=73.98)
    Marketing_Budget: float = Field(..., ge=0, example=2224)

    Social_Media_Followers: int = Field(..., ge=0, example=23406)
    Chef_Experience_Years: int = Field(..., ge=0, example=13)
    Number_of_Reviews: int = Field(..., ge=0, example=185)
    Avg_Review_Length: float = Field(..., ge=0, example=16.19)

    Ambience_Score: float = Field(..., ge=0, example=1.3)
    Service_Quality_Score: float = Field(..., ge=0, example=7.0)

    Weekend_Reservations: int = Field(..., ge=0, example=13)
    Weekday_Reservations: int = Field(..., ge=0, example=4)

    Parking_Availability: str = Field(..., example="Yes")