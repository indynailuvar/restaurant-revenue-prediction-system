# API Contract - Restaurant Revenue Prediction

Base URL lokal:
http://127.0.0.1:8000

## GET /health

Response:
{
  "status": "ok",
  "service": "restaurant-revenue-backend",
  "problem_type": "regression",
  "target": "Revenue"
}

## GET /model-info

Response utama:
{
  "project": "restaurant revenue prediction",
  "problem_type": "regression",
  "target": "Revenue",
  "model_name": "restaurant_gb_revenue1",
  "model_version": "1",
  "model_alias": "champion"
}

## POST /predict

Request body:
{
  "Location": "Downtown",
  "Cuisine": "Japanese",
  "Rating": 4.5,
  "Seating_Capacity": 80,
  "Average_Meal_Price": 150000,
  "Marketing_Budget": 5000000,
  "Social_Media_Followers": 12000,
  "Chef_Experience_Years": 8,
  "Number_of_Reviews": 350,
  "Avg_Review_Length": 120,
  "Ambience_Score": 4.3,
  "Service_Quality_Score": 4.4,
  "Weekend_Reservations": 60,
  "Weekday_Reservations": 35,
  "Parking_Availability": "Yes"
}

Response body:
{
  "predicted_revenue": 1234567.89,
  "model_status": "loaded",
  "model_name": "restaurant_gb_revenue1",
  "model_version": "1",
  "model_alias": "champion",
  "currency_note": "Prediksi mengikuti skala Revenue pada dataset.",
  "supporting_factors": [
    "Rating restoran relatif tinggi.",
    "Kapasitas tempat duduk cukup besar."
  ],
  "recommendation": "Hasil prediksi dapat digunakan sebagai estimasi pendapatan restoran berdasarkan fitur operasional, pemasaran, ulasan, reservasi, dan karakteristik bisnis yang diberikan."
}

Field yang dipakai frontend:
- predicted_revenue
- model_status
- model_name
- model_version
- model_alias
- currency_note
- supporting_factors
- recommendation

Catatan:
Nama field request harus sama persis dengan schema backend. Gunakan Average_Meal_Price, bukan average_meal_price.