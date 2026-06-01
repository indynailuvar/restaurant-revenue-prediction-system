# Model Contract - Restaurant Revenue Prediction

## Problem Type

Supervised Learning - Regression

## Target

Revenue

## Model Registry

Model Name: restaurant_gb_revenue1  
Version: 1  
Alias: champion  

## Required Artifacts

Backend membutuhkan artifact berikut:

- models/trained/best_model.pkl
- models/trained/encoders.pkl
- models/trained/feature_names.pkl
- models/trained/scaler.pkl

## Required Input Features

- Location
- Cuisine
- Rating
- Seating_Capacity
- Average_Meal_Price
- Marketing_Budget
- Social_Media_Followers
- Chef_Experience_Years
- Number_of_Reviews
- Avg_Review_Length
- Ambience_Score
- Service_Quality_Score
- Weekend_Reservations
- Weekday_Reservations
- Parking_Availability

## Output

predicted_revenue

## Evaluation Metrics

Model regresi dievaluasi menggunakan:

- MAE
- MSE
- RMSE
- R2

## Catatan Integrasi

1. Urutan fitur pada feature_names.pkl harus sama dengan urutan fitur saat model dilatih.
2. Encoder pada encoders.pkl harus sesuai dengan fitur kategorikal yang digunakan saat training.
3. Jika scaler.pkl digunakan saat training, backend juga harus menerapkan scaler yang sama sebelum prediksi.
4. Jika target Revenue pernah ditransformasi, output prediksi harus dikembalikan ke skala Revenue asli sebelum ditampilkan di frontend.
5. Backend tidak boleh mengubah problem menjadi klasifikasi. Output utama tetap berupa nilai prediksi pendapatan.