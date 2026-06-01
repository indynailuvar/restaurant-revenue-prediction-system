# scripts/train_regression.py

import mlflow
import mlflow.sklearn
import pandas as pd
import numpy as np
import sys
sys.path.append('.')

from scripts.preprocess_data import load_and_preprocess
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

# ── Load data ──
X_train, X_test, y_train, y_test, scaler, feature_names = load_and_preprocess()

# ── Set experiment MLflow ──
mlflow.set_experiment("restaurant_revenue_prediction")

# ── 3 Baseline model ──
models = {
    "Ridge_Regression": {
        "model" : Ridge(alpha=1.0),
        "params": {"alpha": 1.0}
    },
    "Random_Forest_Regressor": {
        "model" : RandomForestRegressor(
            n_estimators=100, max_depth=10,
            random_state=42, n_jobs=-1
        ),
        "params": {
            "n_estimators": 100,
            "max_depth"   : 10,
            "random_state": 42
        }
    },
    "Gradient_Boosting_Regressor": {
        "model" : GradientBoostingRegressor(
            n_estimators=100, learning_rate=0.1,
            max_depth=4, random_state=42
        ),
        "params": {
            "n_estimators" : 100,
            "learning_rate": 0.1,
            "max_depth"    : 4,
            "random_state" : 42
        }
    }
}

results = {}

print("\n" + "="*50)
print("BASELINE MODEL TRAINING + MLFLOW")
print("="*50)

for model_name, config in models.items():
    with mlflow.start_run(run_name=model_name):

        # Log info dataset
        mlflow.log_param("model_type",   model_name)
        mlflow.log_param("dataset",      "restaurant_data.csv")
        mlflow.log_param("n_train",      len(X_train))
        mlflow.log_param("n_test",       len(X_test))
        mlflow.log_param("n_features",   len(feature_names))
        mlflow.log_param("test_size",    0.2)
        mlflow.log_param("random_state", 42)

        # Log parameter model
        for k, v in config["params"].items():
            mlflow.log_param(k, v)

        # Training
        model = config["model"]
        model.fit(X_train, y_train)
        y_pred = model.predict(X_test)

        # Metrik
        mae  = mean_absolute_error(y_test, y_pred)
        rmse = np.sqrt(mean_squared_error(y_test, y_pred))
        r2   = r2_score(y_test, y_pred)

        # Log metrik
        mlflow.log_metric("MAE",  round(mae, 4))
        mlflow.log_metric("RMSE", round(rmse, 4))
        mlflow.log_metric("R2",   round(r2, 4))

        # Log model artifact
        mlflow.sklearn.log_model(model, model_name)

        results[model_name] = {"MAE": mae, "RMSE": rmse, "R2": r2}

        print(f"\n{model_name}")
        print(f"  MAE  : {mae:,.2f}")
        print(f"  RMSE : {rmse:,.2f}")
        print(f"  R2   : {r2:.4f}")

# ── Perbandingan ──
print("\n" + "="*50)
print("PERBANDINGAN HASIL")
print("="*50)
results_df = pd.DataFrame(results).T.sort_values('MAE')
print(results_df)

best = results_df.index[0]
print(f"\n Model terbaik: {best}")
print(f"   MAE  : {results[best]['MAE']:,.2f}")
print(f"   RMSE : {results[best]['RMSE']:,.2f}")
print(f"   R2   : {results[best]['R2']:.4f}")