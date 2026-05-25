# scripts/evaluate_regression.py

import pandas as pd
import numpy as np
import pickle
import matplotlib.pyplot as plt
import sys
import os

sys.path.append('.')
from scripts.preprocess_data import load_and_preprocess

from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from sklearn.linear_model import Ridge
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor

# ── Load data ──
X_train, X_test, y_train, y_test, scaler, feature_names = load_and_preprocess()

print("="*50)
print("EVALUASI 3 MODEL REGRESI")
print("="*50)

# ── Definisi model ──
models = {
    "Ridge_Regression": Ridge(alpha=1.0),
    "Random_Forest_Regressor": RandomForestRegressor(
        n_estimators=100, max_depth=10, random_state=42
    ),
    "Gradient_Boosting_Regressor": GradientBoostingRegressor(
        n_estimators=100, learning_rate=0.1,
        max_depth=4, random_state=42
    )
}

results = {}

for model_name, model in models.items():
    # Training
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)

    # Metrik
    mae  = mean_absolute_error(y_test, y_pred)
    rmse = np.sqrt(mean_squared_error(y_test, y_pred))
    r2   = r2_score(y_test, y_pred)

    results[model_name] = {
        "MAE": round(mae, 2),
        "RMSE": round(rmse, 2),
        "R2": round(r2, 4)
    }

    print(f"\n{model_name}")
    print(f"  MAE  : {mae:,.2f}")
    print(f"  RMSE : {rmse:,.2f}")
    print(f"  R2   : {r2:.4f}")

# ── Tabel perbandingan ──
print("\n" + "="*50)
print("TABEL PERBANDINGAN MODEL")
print("="*50)
results_df = pd.DataFrame(results).T.sort_values('MAE')
print(results_df)

# ── Plot perbandingan MAE ──
fig, axes = plt.subplots(1, 3, figsize=(14, 5))
metrics = ['MAE', 'RMSE', 'R2']
colors  = ['steelblue', 'coral', 'seagreen']

for i, metric in enumerate(metrics):
    values = [results[m][metric] for m in results]
    axes[i].bar(results.keys(), values, color=colors[i])
    axes[i].set_title(f'Perbandingan {metric}')
    axes[i].tick_params(axis='x', rotation=30)
    for j, v in enumerate(values):
        axes[i].text(j, v, f'{v:.2f}', ha='center', va='bottom', fontsize=9)

plt.tight_layout()
os.makedirs('reports/figures', exist_ok=True)
plt.savefig('reports/figures/perbandingan_model.png', dpi=150)
plt.show()
print("\n Grafik tersimpan: reports/figures/perbandingan_model.png")

# ── Simpan model terbaik ──
best_name  = results_df.index[0]
best_model = models[best_name]

os.makedirs('models/trained', exist_ok=True)
with open('models/trained/best_model.pkl', 'wb') as f:
    pickle.dump(best_model, f)

print(f"\n Model terbaik: {best_name}")
print(f"   Tersimpan di : models/trained/best_model.pkl")