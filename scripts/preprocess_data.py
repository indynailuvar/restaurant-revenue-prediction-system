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
    # Load CSV 
    df = pd.read_csv(input_path, sep=';')
    print(f"Dataset loaded: {df.shape[0]} baris × {df.shape[1]} kolom")

    # Rename kolom pakai underscore
    df.columns = df.columns.str.strip().str.replace(' ', '_')
    print(f"\nKolom setelah rename: {list(df.columns)}")

    # Cek tipe data awal
    print(f"\nTipe data kolom:")
    print(df.dtypes)

    # Fix kolom Avg_Review_Length (object → numeric)
    if 'Avg_Review_Length' in df.columns:
        df['Avg_Review_Length'] = pd.to_numeric(
            df['Avg_Review_Length'].astype(str).str.replace(',', '.', regex=False),
            errors='coerce'
        )
        null_count = df['Avg_Review_Length'].isna().sum()
        print(f"  Avg_Review_Length null setelah convert: {null_count}")
        if null_count == len(df):
            df['Avg_Review_Length'] = 0
        else:
            df['Avg_Review_Length'] = df['Avg_Review_Length'].fillna(
                df['Avg_Review_Length'].median()
            )
        print(f"  Avg_Review_Length setelah fix: {df['Avg_Review_Length'].dtype}")
        print(f"  Sample nilai: {df['Avg_Review_Length'].head(3).tolist()}")

    # Cek Revenue
    print(f"\nStatistik Revenue:")
    print(f"  Min    : {df['Revenue'].min():,.2f}")
    print(f"  Max    : {df['Revenue'].max():,.2f}")
    print(f"  Mean   : {df['Revenue'].mean():,.2f}")
    print(f"  Median : {df['Revenue'].median():,.2f}")
    print(f"  Null   : {df['Revenue'].isna().sum()}")

    # Hapus kolom identitas
    drop_cols = ['Name']
    df = df.drop(columns=[c for c in drop_cols if c in df.columns])

    # Drop baris null di kolom penting
    kolom_wajib = ['Revenue', 'Rating', 'Seating_Capacity',
                   'Average_Meal_Price', 'Marketing_Budget']
    before = len(df)
    df = df.dropna(subset=kolom_wajib)
    print(f"\nBaris setelah drop null: {len(df)} (dihapus {before - len(df)})")

    # Encode kolom kategorikal
    encoders = {}
    cat_cols = ['Location', 'Cuisine', 'Parking_Availability']
    for col in cat_cols:
        if col in df.columns:
            le = LabelEncoder()
            df[col] = le.fit_transform(df[col].astype(str))
            encoders[col] = le
            print(f"  Encoded '{col}': {list(le.classes_)}")

    # Pisah fitur dan target
    X = df.drop(columns=['Revenue'])
    y = df['Revenue']
    feature_names = list(X.columns)
    print(f"\nJumlah fitur : {len(feature_names)}")
    print(f"Fitur        : {feature_names}")

    # Isi NaN yang tersisa dengan median
    for col in X.columns:
        if X[col].isna().any():
            if X[col].dtype in ['float64', 'int64']:
                X[col] = X[col].fillna(X[col].median())
            else:
                X[col] = X[col].fillna(0)

    print(f"\nNaN di X setelah impute: {X.isna().sum().sum()}")

    # Train-test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )
    print(f"\nTrain: {X_train.shape} | Test: {X_test.shape}")

    # Scaling
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled  = scaler.transform(X_test)

    # Simpan dataset processed
    os.makedirs(os.path.dirname(output_path), exist_ok=True)
    df_processed = pd.concat([
        pd.DataFrame(X, columns=feature_names).reset_index(drop=True),
        pd.Series(y, name='Revenue').reset_index(drop=True)
    ], axis=1)
    df_processed.to_csv(output_path, index=False)
    print(f"\nDataset tersimpan: {output_path}")

    # Simpan scaler, encoder, feature_names
    os.makedirs('models/trained', exist_ok=True)
    with open('models/trained/scaler.pkl', 'wb') as f:
        pickle.dump(scaler, f)
    with open('models/trained/feature_names.pkl', 'wb') as f:
        pickle.dump(feature_names, f)
    with open('models/trained/encoders.pkl', 'wb') as f:
        pickle.dump(encoders, f)
    print("Scaler, encoder, feature_names tersimpan")

    return X_train_scaled, X_test_scaled, y_train, y_test, scaler, feature_names


if __name__ == '__main__':
    load_and_preprocess()