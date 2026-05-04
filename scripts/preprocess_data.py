import pandas as pd
import numpy as np
import pickle
import os
from sklearn.preprocessing import LabelEncoder, StandardScaler
from sklearn.model_selection import train_test_split


def load_and_preprocess(
    input_path='data/raw/restaurant_data.csv',
    output_path='data/processed/dataset_modeling.csv'
):
    # ── 1. Load CSV ──
    df = pd.read_csv(input_path, sep=';')
    print(f"Dataset loaded: {df.shape[0]} baris × {df.shape[1]} kolom")

    # ── 2. Bersihkan kolom numerik 
    kolom_numerik = [
        'Rating', 'Seating Capacity', 'Average Meal Price',
        'Marketing Budget', 'Social Media Followers',
        'Chef Experience Years', 'Number of Reviews',
        'Avg Review Length', 'Ambience Score',
        'Service Quality Score', 'Weekend Reservations',
        'Weekday Reservations', 'Revenue'
    ]
    for col in kolom_numerik:
        if col in df.columns:
            df[col] = df[col].astype(str).str.replace('.', '', regex=False)
            df[col] = pd.to_numeric(df[col], errors='coerce')

    # Drop baris yang null setelah konversi
    before = len(df)
    df = df.dropna(subset=[c for c in kolom_numerik if c in df.columns])
    print(f"Baris setelah drop null: {len(df)} (dihapus {before - len(df)} baris)")

    # ── 3. Hapus kolom identitas ──
    drop_cols = ['Name']
    df = df.drop(columns=[c for c in drop_cols if c in df.columns])

    # ── 4. Encode kolom kategorikal ──
    encoders = {}
    cat_cols = ['Location', 'Cuisine', 'Parking Availability']
    for col in cat_cols:
        if col in df.columns:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            encoders[col] = le
            print(f"  Encoded '{col}': {list(le.classes_)}")

    # ── 5. Pisah fitur dan target ──
    X = df.drop(columns=['Revenue'])
    y = df['Revenue']
    feature_names = list(X.columns)
    print(f"\nJumlah fitur : {len(feature_names)}")
    print(f"Fitur        : {feature_names}")

    # ── 6. Train-test split ──
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    print(f"\nTrain: {X_train.shape} | Test: {X_test.shape}")

    # ── 7. Scaling ──
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled  = scaler.transform(X_test)

    # ── 8. Simpan dataset processed ──
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df_processed = pd.concat([
        pd.DataFrame(X, columns=feature_names).reset_index(drop=True),
        pd.Series(y, name='Revenue').reset_index(drop=True)
    ], axis=1)
    df_processed.to_csv(output_path, index=False)
    print(f"\n Dataset tersimpan: {output_path}")

    # ── 9. Simpan scaler, encoder, feature_names ──
    os.makedirs('models/trained', exist_ok=True)
    with open('models/trained/scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
    with open('models/trained/feature_names.pkl', 'wb') as f:
        pickle.dump(feature_names, f)
    with open('models/trained/encoders.pkl', 'wb') as f:
        pickle.dump(encoders, f)
    print(" Scaler, encoder, feature_names tersimpan")

    return X_train_scaled, X_test_scaled, y_train, y_test, scaler, feature_names


if __name__ == '__main__':
    load_and_preprocess()