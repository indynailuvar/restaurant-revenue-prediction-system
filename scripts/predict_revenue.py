import mlflow
import pandas as pd
import numpy as np
import pickle

# 1. Load Penunjang (Scaler, Encoders, Feature Names)
with open('models/trained/scaler.pkl', 'rb') as f:
    scaler = pickle.load(f)
with open('models/trained/encoders.pkl', 'rb') as f:
    encoders = pickle.load(f)
with open('models/trained/feature_names.pkl', 'rb') as f:
    feature_names = pickle.load(f)

# 2. Load Model Champion dari MLflow
model_uri = "models:/restaurant_revenue_gb_model@champion"
model = mlflow.sklearn.load_model(model_uri)

def predict_new_restaurant(input_data):
    # Buat DataFrame dari input agar mudah diolah
    df_input = pd.DataFrame([input_data])
    
    # ── A. Encoding Kolom Kategorikal ──
    for col, le in encoders.items():
        if col in df_input.columns:
            # Jika ada kategori baru yang belum pernah dilihat model, 
            # kita handle agar tidak error (pilih kelas pertama)
            df_input[col] = df_input[col].apply(
                lambda x: le.transform([x])[0] if x in le.classes_ else 0
            )

    # ── B. Pastikan Urutan Kolom Sama dengan Saat Training ──
    df_input = df_input[feature_names]
    
    # ── C. Scaling (WAJIB) ──
    # Menggunakan scaler yang sudah di-fit pada data training
    input_scaled = scaler.transform(df_input)
    
    # ── D. Prediksi ──
    prediction = model.predict(input_scaled)
    return prediction[0]

# --- CONTOH PENGGUNAAN ---
new_res = {
    'Location': 'Downtown',
    'Cuisine': 'Japanese',
    'Rating': 4.8,
    'Seating Capacity': 60,
    'Average Meal Price': 75.50,
    'Marketing Budget': 4000,
    'Social Media Followers': 50000,
    'Chef Experience Years': 12,
    'Number of Reviews': 300,
    'Avg Review Length': 25.4,
    'Ambience Score': 8.5,
    'Service Quality Score': 9.0,
    'Parking Availability': 'Yes',
    'Weekend Reservations': 45,
    'Weekday Reservations': 20
}

hasil = predict_new_restaurant(new_res)
print(f"\n================================")
print(f"Estimasi Pendapatan: Rp {hasil:,.2f}")
print(f"================================")