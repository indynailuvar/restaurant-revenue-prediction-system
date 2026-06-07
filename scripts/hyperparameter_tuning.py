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

# ── Set experiment — 
mlflow.set_experiment("restaurant_revenue_prediction")

# ── Helper: train dan evaluasi ──
def train_and_eval(model):
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mae  = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2   = r2_score(y_test, y_pred)
    return mae, rmse, r2


# ── Objective Ridge ──
def objective_ridge(trial):
    params = {
        "alpha": trial.suggest_float("alpha", 0.001, 100.0, log=True),
        "solver": trial.suggest_categorical(
            "solver", ["auto", "svd", "cholesky", "lsqr", "sag"]
        )
    }
    model = Ridge(**params)
    mae, _, _ = train_and_eval(model)
    return mae


# ── Objective Random Forest ──
def objective_rf(trial):
    params = {
        "n_estimators"    : trial.suggest_int("n_estimators", 50, 300),
        "max_depth"       : trial.suggest_int("max_depth", 3, 20),
        "min_samples_split": trial.suggest_int("min_samples_split", 2, 10),
        "min_samples_leaf": trial.suggest_int("min_samples_leaf", 1, 5),
        "random_state"    : 42
    }
    model = RandomForestRegressor(**params)
    mae, _, _ = train_and_eval(model)
    return mae


# ── Objective Gradient Boosting ──
def objective_gb(trial):
    params = {
        "n_estimators"      : trial.suggest_int("n_estimators", 50, 300),
        "learning_rate"     : trial.suggest_float("learning_rate", 0.01, 0.3),
        "max_depth"         : trial.suggest_int("max_depth", 2, 8),
        "min_samples_split" : trial.suggest_int("min_samples_split", 2, 10),
        "min_samples_leaf"  : trial.suggest_int("min_samples_leaf", 1, 5),
        "subsample"         : trial.suggest_float("subsample", 0.6, 1.0),
        "random_state"      : 42
    }
    model = GradientBoostingRegressor(**params)
    mae, _, _ = train_and_eval(model)
    return mae


# ── Konfigurasi 3 model ──
model_scenarios = [
    {
        "name"      : "Ridge",
        "objective" : objective_ridge,
        "class"     : Ridge,
        "has_random": False      # Ridge tidak pakai random_state
    },
    {
        "name"      : "RandomForest",
        "objective" : objective_rf,
        "class"     : RandomForestRegressor,
        "has_random": True
    },
    {
        "name"      : "GradientBoosting",
        "objective" : objective_gb,
        "class"     : GradientBoostingRegressor,
        "has_random": True
    }
]

summary_results = []

print("\n" + "="*60)
print("MULTI-MODEL HYPERPARAMETER TUNING — Optuna + MLflow")
print("="*60)

for scenario in model_scenarios:
    run_name = f"Tuning_{scenario['name']}"
    print(f"\n▶ Tuning: {scenario['name']}...")

    with mlflow.start_run(run_name=run_name):

        # Suppress log Optuna
        optuna.logging.set_verbosity(optuna.logging.WARNING)

        # Buat study dan optimize
        study = optuna.create_study(direction="minimize")
        study.optimize(scenario['objective'], n_trials=20)

        best_params = study.best_params

        # Re-train dengan parameter terbaik
        # Ridge tidak pakai random_state
        if scenario['has_random']:
            best_model = scenario['class'](**best_params, random_state=42)
        else:
            best_model = scenario['class'](**best_params)

        mae, rmse, r2 = train_and_eval(best_model)

        # Log ke MLflow
        mlflow.log_param("model_type",   scenario['name'])
        mlflow.log_param("search_type",  "Optuna")
        mlflow.log_param("n_trials",     20)
        mlflow.log_param("dataset",      "restaurant_data.csv")
        mlflow.log_param("n_train",      len(X_train))
        mlflow.log_param("n_test",       len(X_test))
        mlflow.log_param("n_features",   len(feature_names))
        mlflow.log_params(best_params)

        mlflow.log_metric("MAE",  round(mae, 4))
        mlflow.log_metric("RMSE", round(rmse, 4))
        mlflow.log_metric("R2",   round(r2, 4))

        # Log model artifact
        mlflow.sklearn.log_model(
            best_model,
            f"best_{scenario['name'].lower()}"
        )

        summary_results.append({
            "Model"      : scenario['name'],
            "MAE"        : mae,
            "RMSE"       : rmse,
            "R2"         : r2,
            "Best_Params": best_params,
            "model_obj"  : best_model
        })

        print(f"   {scenario['name']} selesai!")
        print(f"     MAE  : {mae:,.2f}")
        print(f"     RMSE : {rmse:,.2f}")
        print(f"     R2   : {r2:.4f}")
        print(f"     Params terbaik: {best_params}")


# ── Pilih model terbaik (MAE terkecil) ──
summary_df = pd.DataFrame(summary_results)[["Model", "MAE", "RMSE", "R2"]].sort_values(by="MAE").reset_index(drop=True)
winner     = min(summary_results, key=lambda x: x["MAE"])  

print("\n" + "="*60)
print("HASIL AKHIR PERBANDINGAN")
print("="*60)
print(summary_df.to_string(index=False))

print(f"\n CHAMPION: {winner['Model']}")
print(f"   MAE  : {winner['MAE']:,.2f}")
print(f"   RMSE : {winner['RMSE']:,.2f}")
print(f"   R2   : {winner['R2']:.4f}")

# ── Simpan model terbaik untuk FastAPI ──
os.makedirs('models/trained', exist_ok=True)
with open('models/trained/best_model.pkl', 'wb') as f:
    pickle.dump(winner['model_obj'], f)
print(f"\n Model terbaik tersimpan: models/trained/best_model.pkl")

# ── Simpan laporan CSV ──
os.makedirs('reports/tables', exist_ok=True)
summary_df[["Model", "MAE", "RMSE", "R2"]].to_csv(
    'reports/tables/tuning_comparison.csv', index=False
)
print(" Laporan tersimpan: reports/tables/tuning_comparison.csv")

print("\n" + "="*60)
print("SELESAI — Buka MLflow UI untuk lihat semua run")
print("Jalankan : mlflow ui")
print("Buka     : http://127.0.0.1:5000")
print("="*60)