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

    # Cek tipe data awal
    print(f"\nTipe data kolom:")
    print(df.dtypes)

    # Fix kolom Avg Review Length (object → numeric) 
    if 'Avg Review Length' in df.columns:
        df['Avg Review Length'] = df['Avg Review Length'].astype(str)
        df['Avg Review Length'] = df['Avg Review Length'].str.replace(',', '.', regex=False)
        df['Avg Review Length'] = pd.to_numeric(df['Avg Review Length'], errors='coerce')
    
    # Cek berapa yang null setelah convert
        null_count = df['Avg Review Length'].isna().sum()
        print(f"  Avg Review Length null setelah convert: {null_count}")
    
    # Kalau semua null, isi dengan 0
        if null_count == len(df):
            df['Avg Review Length'] = 0
            print("  Semua null → diisi 0")
        else:
            df['Avg Review Length'] = df['Avg Review Length'].fillna(
            df['Avg Review Length'].median()
            )
        print(f"  Avg Review Length setelah fix: {df['Avg Review Length'].dtype}")
        print(f"  Sample nilai: {df['Avg Review Length'].head(3).tolist()}")

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
    kolom_wajib = ['Revenue', 'Rating', 'Seating Capacity',
                   'Average Meal Price', 'Marketing Budget']
    before = len(df)
    df = df.dropna(subset=kolom_wajib)
    print(f"\nBaris setelah drop null: {len(df)} (dihapus {before - len(df)})")

    # Encode kolom kategorikal 
    encoders = {}
    cat_cols = ['Location', 'Cuisine', 'Parking Availability']
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

    # Pastikan tidak ada NaN di X sebelum scaling 
    # Isi NaN yang tersisa dengan median kolom masing-masing
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
    print(f"\n Dataset tersimpan: {output_path}")

    # Simpan scaler, encoder, feature_names 
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