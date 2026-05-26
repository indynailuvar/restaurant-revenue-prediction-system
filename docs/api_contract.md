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
  "predicted_revenue": 638945.52,
  "predicted_revenue_usd": 638945.52,
  "currency": "USD",
  "predicted_revenue_idr": 10223128320,
  "converted_currency": "IDR",
  "usd_to_idr_rate": 16000,
  "exchange_rate_note": "Konversi IDR menggunakan rate konfigurasi sistem, bukan kurs real-time.",
  "model_status": "loaded",
  "model_name": "restaurant_gb_revenue1",
  "model_version": "1",
  "model_alias": "champion",
  "currency_note": "Prediksi Revenue utama ditampilkan dalam USD sesuai satuan target pada dataset training.",
  "input_status": "valid",
  "prediction_reliability": "normal",
  "validation_warnings": [],
  "out_of_range_features": [],
  "unknown_categories": [],
  "is_prediction_adjusted": false,
  "prediction_note": "Input berada dalam kategori dan rentang data training yang diketahui. Hasil prediksi dapat digunakan sebagai estimasi awal.",
  "supporting_factors": [
    "Rating restoran relatif tinggi."
  ],
  "recommendation": "Hasil prediksi dapat digunakan sebagai estimasi awal Revenue restoran berdasarkan fitur operasional, pemasaran, ulasan, reservasi, dan karakteristik bisnis yang diberikan."
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