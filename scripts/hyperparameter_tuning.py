# scripts/hyperparameter_tuning.py

import mlflow
import mlflow.sklearn
import optuna
import numpy as np
import pandas as pd
import pickle
import os
import sys

sys.path.append('.')
from scripts.preprocess_data import load_and_preprocess

from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# ── Load data ──
X_train, X_test, y_train, y_test, scaler, feature_names = load_and_preprocess()

# ── Set experiment ──
mlflow.set_experiment("hyperparameter_tuning_optuna")

def train_and_eval(model, X_train, X_test, y_train, y_test):
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mae = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2 = r2_score(y_test, y_pred)
    return mae, rmse, r2

# ── 1. Objective Ridge ──
def objective_ridge(trial):
    params = {
        "alpha": trial.suggest_float("alpha", 0.001, 100.0, log=True),
        "solver": trial.suggest_categorical("solver", ["auto", "svd", "cholesky", "lsqr", "sag"]),
        "random_state": 42
    }
    model = Ridge(**params)
    mae, _, _ = train_and_eval(model, X_train, X_test, y_train, y_test)
    return mae

# ── 2. Objective Random Forest ──
def objective_rf(trial):
    params = {
        "n_estimators": trial.suggest_int("n_estimators", 50, 300),
        "max_depth": trial.suggest_int("max_depth", 3, 20),
        "min_samples_split": trial.suggest_int("min_samples_split", 2, 10),
        "random_state": 42
    }
    model = RandomForestRegressor(**params)
    mae, _, _ = train_and_eval(model, X_train, X_test, y_train, y_test)
    return mae

# ── 3. Objective Gradient Boosting ──
def objective_gb(trial):
    params = {
        "n_estimators": trial.suggest_int("n_estimators", 50, 300),
        "learning_rate": trial.suggest_float("learning_rate", 0.01, 0.3),
        "max_depth": trial.suggest_int("max_depth", 2, 8),
        "subsample": trial.suggest_float("subsample", 0.6, 1.0),
        "random_state": 42
    }
    model = GradientBoostingRegressor(**params)
    mae, _, _ = train_and_eval(model, X_train, X_test, y_train, y_test)
    return mae

# ── Konfigurasi Looping Tuning ──
model_scenarios = [
    {"name": "Ridge", "objective": objective_ridge, "class": Ridge},
    {"name": "RandomForest", "objective": objective_rf, "class": RandomForestRegressor},
    {"name": "GradientBoosting", "objective": objective_gb, "class": GradientBoostingRegressor}
]

summary_results = []

print("\n" + "="*60)
print("START MULTI-MODEL HYPERPARAMETER TUNING")
print("="*60)

for scenario in model_scenarios:
    run_name = f"Tuning_{scenario['name']}"
    print(f"\n Running Tuning for: {scenario['name']}...")
    
    with mlflow.start_run(run_name=run_name):
        # Setup Optuna Study
        study = optuna.create_study(direction="minimize")
        study.optimize(scenario['objective'], n_trials=20) # n_trials bisa ditambah jika waktu cukup
        
        best_params = study.best_params
        
        # Re-train model terbaik
        best_model = scenario['class'](**best_params, random_state=42)
        mae, rmse, r2 = train_and_eval(best_model, X_train, X_test, y_train, y_test)
        
        # Log to MLflow
        mlflow.log_params(best_params)
        mlflow.log_metric("MAE", mae)
        mlflow.log_metric("RMSE", rmse)
        mlflow.log_metric("R2", r2)
        mlflow.log_param("model_type", scenario['name'])
        
        # Log model artifact
        mlflow.sklearn.log_model(best_model, f"best_{scenario['name'].lower()}")
        
        summary_results.append({
            "Model": scenario['name'],
            "MAE": mae,
            "RMSE": rmse,
            "R2": r2,
            "Best_Params": best_params,
            "object": best_model
        })
        
        print(f" {scenario['name']} Done! Best MAE: {mae:.4f}")

# ── 4. Pilih Pemenang Akhir ──
summary_df = pd.DataFrame(summary_results).sort_values(by="MAE")
winner = summary_results[summary_df.index[0]]

print("\n" + "="*60)
print("FINAL COMPETITION RESULTS")
print("="*60)
print(summary_df[["Model", "MAE", "RMSE", "R2"]].to_string(index=False))

print(f"\n CHAMPION: {winner['Model']}")

# ── Simpan Pemenang untuk FastAPI ──
os.makedirs('models/trained', exist_ok=True)
with open('models/trained/best_model.pkl', 'wb') as f:
    pickle.dump(winner['object'], f)

print(f" Model {winner['Model']} disimpan ke models/trained/best_model.pkl")

# Simpan laporan CSV
os.makedirs('reports/tables', exist_ok=True)
summary_df.to_csv('reports/tables/tuning_comparison.csv', index=False)

print("\n🔥 Selesai! Buka MLflow untuk detail tiap trial.")