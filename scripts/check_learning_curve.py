# scripts/check_learning_curve.py

import numpy as np
import matplotlib.pyplot as plt
import pickle
import sys
import os

sys.path.append('.')
from scripts.preprocess_data import load_and_preprocess
from sklearn.model_selection import learning_curve
from sklearn.ensemble import GradientBoostingRegressor
from sklearn.metrics import mean_absolute_error, r2_score

# ── Load data ──
X_train, X_test, y_train, y_test, scaler, feature_names = load_and_preprocess()

# ── Load model champion (Tuning_GradientBoosting) ──
with open('models/trained/best_model.pkl', 'rb') as f:
    model = pickle.load(f)

print("✅ Model loaded:", type(model).__name__)
print(f"   Params: {model.get_params()}")

# ── 1. Hitung Learning Curve ──
print("\nMenghitung learning curve... (ini butuh beberapa menit)")

train_sizes, train_scores_mae, val_scores_mae = learning_curve(
    estimator   = model,
    X           = X_train,
    y           = y_train,
    cv          = 5,
    scoring     = 'neg_mean_absolute_error',
    train_sizes = np.linspace(0.1, 1.0, 10),
    n_jobs      = -1,
    verbose     = 0
)

train_sizes_r2, train_scores_r2, val_scores_r2 = learning_curve(
    estimator   = model,
    X           = X_train,
    y           = y_train,
    cv          = 5,
    scoring     = 'r2',
    train_sizes = np.linspace(0.1, 1.0, 10),
    n_jobs      = -1,
    verbose     = 0
)

# Convert MAE ke positif
train_mae = -train_scores_mae.mean(axis=1)
val_mae   = -val_scores_mae.mean(axis=1)
train_mae_std = train_scores_mae.std(axis=1)
val_mae_std   = val_scores_mae.std(axis=1)

train_r2 = train_scores_r2.mean(axis=1)
val_r2   = val_scores_r2.mean(axis=1)
train_r2_std = train_scores_r2.std(axis=1)
val_r2_std   = val_scores_r2.std(axis=1)

# ── 2. Print Hasil Numerik ──
print("\n" + "="*60)
print("HASIL LEARNING CURVE")
print("="*60)
print(f"\n{'Data Size':>12} | {'Train MAE':>12} | {'Val MAE':>12} | {'Gap':>10}")
print("-"*55)
for i, size in enumerate(train_sizes):
    gap = val_mae[i] - train_mae[i]
    print(f"{size:>12} | {train_mae[i]:>12.2f} | {val_mae[i]:>12.2f} | {gap:>10.2f}")

print(f"\n{'Data Size':>12} | {'Train R2':>10} | {'Val R2':>10} | {'Gap':>10}")
print("-"*50)
for i, size in enumerate(train_sizes_r2):
    gap = train_r2[i] - val_r2[i]
    print(f"{size:>12} | {train_r2[i]:>10.4f} | {val_r2[i]:>10.4f} | {gap:>10.4f}")

# ── 3. Deteksi Overfitting ──
print("\n" + "="*60)
print("ANALISIS OVERFITTING")
print("="*60)

final_train_mae = train_mae[-1]
final_val_mae   = val_mae[-1]
final_train_r2  = train_r2[-1]
final_val_r2    = val_r2[-1]
mae_gap         = final_val_mae - final_train_mae
r2_gap          = final_train_r2 - final_val_r2

print(f"\nMAE  Train (full data) : {final_train_mae:,.2f}")
print(f"MAE  Val   (full data) : {final_val_mae:,.2f}")
print(f"MAE  Gap               : {mae_gap:,.2f}")

print(f"\nR2   Train (full data) : {final_train_r2:.4f}")
print(f"R2   Val   (full data) : {final_val_r2:.4f}")
print(f"R2   Gap               : {r2_gap:.4f}")

# Diagnosis
print("\n--- DIAGNOSIS ---")
if mae_gap > final_train_mae * 0.3:
    print("⚠️  OVERFITTING TERDETEKSI")
    print("   MAE validation jauh lebih besar dari MAE training")
    print("   Model terlalu hafal data training")
elif mae_gap < final_train_mae * 0.1:
    print("✅ TIDAK ADA OVERFITTING SIGNIFIKAN")
    print("   Gap MAE train vs validation kecil")
else:
    print("⚠️  SEDIKIT OVERFITTING — masih dalam batas wajar")

if r2_gap > 0.05:
    print("⚠️  R2 Gap terlalu besar — indikasi overfitting")
elif r2_gap < 0.01:
    print("✅ R2 Gap sangat kecil — model generalize dengan baik")
else:
    print("⚠️  R2 Gap sedang — perlu diperhatikan")

# ── 4. Plot Learning Curve ──
fig, axes = plt.subplots(1, 2, figsize=(14, 5))
fig.suptitle('Learning Curve — Tuning GradientBoosting\n(Champion Model)',
             fontsize=13, fontweight='bold')

# Plot MAE
axes[0].plot(train_sizes, train_mae, 'o-', color='steelblue',
             label='Training MAE', linewidth=2)
axes[0].plot(train_sizes, val_mae, 'o-', color='tomato',
             label='Validation MAE', linewidth=2)
axes[0].fill_between(train_sizes,
                     train_mae - train_mae_std,
                     train_mae + train_mae_std,
                     alpha=0.15, color='steelblue')
axes[0].fill_between(train_sizes,
                     val_mae - val_mae_std,
                     val_mae + val_mae_std,
                     alpha=0.15, color='tomato')
axes[0].set_title('MAE vs Ukuran Data Training')
axes[0].set_xlabel('Jumlah Data Training')
axes[0].set_ylabel('MAE')
axes[0].legend()
axes[0].grid(True, alpha=0.3)

# Tambahkan anotasi gap di akhir
axes[0].annotate(
    f'Gap: {mae_gap:,.0f}',
    xy=(train_sizes[-1], (final_train_mae + final_val_mae) / 2),
    fontsize=9, color='gray',
    ha='right'
)

# Plot R2
axes[1].plot(train_sizes_r2, train_r2, 'o-', color='steelblue',
             label='Training R2', linewidth=2)
axes[1].plot(train_sizes_r2, val_r2, 'o-', color='tomato',
             label='Validation R2', linewidth=2)
axes[1].fill_between(train_sizes_r2,
                     train_r2 - train_r2_std,
                     train_r2 + train_r2_std,
                     alpha=0.15, color='steelblue')
axes[1].fill_between(train_sizes_r2,
                     val_r2 - val_r2_std,
                     val_r2 + val_r2_std,
                     alpha=0.15, color='tomato')
axes[1].set_title('R2 vs Ukuran Data Training')
axes[1].set_xlabel('Jumlah Data Training')
axes[1].set_ylabel('R2 Score')
axes[1].legend()
axes[1].grid(True, alpha=0.3)
axes[1].set_ylim([0.9, 1.01])

# Tambahkan anotasi gap di akhir
axes[1].annotate(
    f'Gap: {r2_gap:.4f}',
    xy=(train_sizes_r2[-1], (final_train_r2 + final_val_r2) / 2),
    fontsize=9, color='gray',
    ha='right'
)

plt.tight_layout()
os.makedirs('reports/figures', exist_ok=True)
plt.savefig('reports/figures/learning_curve_champion.png', dpi=150)
plt.show()
print("\n✅ Grafik tersimpan: reports/figures/learning_curve_champion.png")