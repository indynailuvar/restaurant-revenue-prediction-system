# scripts/explain_model.py

import pandas as pd
import numpy as np
import pickle
import matplotlib.pyplot as plt
import sys
import os

sys.path.append('.')
from scripts.preprocess_data import load_and_preprocess

# ── Load data ──
X_train, X_test, y_train, y_test, scaler, feature_names = load_and_preprocess()

# ── Load model terbaik ──
with open('models/trained/best_model.pkl', 'rb') as f:
    model = pickle.load(f)

print("="*50)
print("FEATURE IMPORTANCE ANALYSIS")
print("="*50)

# ── Feature Importance dari model ──
if hasattr(model, 'feature_importances_'):
    # Untuk Random Forest dan Gradient Boosting
    importances = model.feature_importances_
    fi_df = pd.DataFrame({
        'Fitur'      : feature_names,
        'Importance' : importances
    }).sort_values('Importance', ascending=False)

    print("\nTop 10 Fitur Paling Berpengaruh:")
    print(fi_df.head(10).to_string(index=False))

    # ── Plot feature importance ──
    plt.figure(figsize=(10, 6))
    plt.barh(
        fi_df['Fitur'].head(10)[::-1],
        fi_df['Importance'].head(10)[::-1],
        color='steelblue'
    )
    plt.title('Top 10 Feature Importance')
    plt.xlabel('Importance Score')
    plt.tight_layout()
    os.makedirs('reports/figures', exist_ok=True)
    plt.savefig('reports/figures/feature_importance.png', dpi=150)
    plt.show()
    print("\n✅ Grafik tersimpan: reports/figures/feature_importance.png")

elif hasattr(model, 'coef_'):
    # Untuk Ridge Regression
    importances = np.abs(model.coef_)
    fi_df = pd.DataFrame({
        'Fitur'      : feature_names,
        'Koefisien'  : model.coef_,
        'Abs_Koef'   : importances
    }).sort_values('Abs_Koef', ascending=False)

    print("\nKoefisien Ridge Regression (diurutkan dari terbesar):")
    print(fi_df.to_string(index=False))

    plt.figure(figsize=(10, 6))
    plt.barh(
        fi_df['Fitur'].head(10)[::-1],
        fi_df['Abs_Koef'].head(10)[::-1],
        color='steelblue'
    )
    plt.title('Top 10 Koefisien Ridge Regression')
    plt.xlabel('Nilai Absolut Koefisien')
    plt.tight_layout()
    os.makedirs('reports/figures', exist_ok=True)
    plt.savefig('reports/figures/feature_importance_ridge.png', dpi=150)
    plt.show()
    print("\n Grafik tersimpan: reports/figures/feature_importance_ridge.png")

else:
    print("Model tidak memiliki feature importance.")