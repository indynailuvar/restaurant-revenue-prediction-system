from pydantic import BaseModel


class RevenuePredictionRequest(BaseModel):
    Location: str
    Cuisine: str
    Rating: float
    Seating_Capacity: int
    Average_Meal_Price: float
    Marketing_Budget: float
    Social_Media_Followers: int
    Chef_Experience_Years: int
    Number_of_Reviews: int
    Avg_Review_Length: float
    Ambience_Score: float
    Service_Quality_Score: float
    Weekend_Reservations: int
    Weekday_Reservations: int
    Parking_Availability: str