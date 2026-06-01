# scripts/insert_to_db.py

import mlflow
import psycopg2
import json
from datetime import datetime

# =========================================
# KONEKSI POSTGRESQL
# =========================================
conn = psycopg2.connect(
    host="localhost",
    port=5432,
    database="PBL",
    user="postgres",
    password="Laudita2005"
)

cur = conn.cursor()

print("✅ Koneksi database berhasil")

# =========================================
# INSERT KE TABEL ml_experiment
# =========================================
cur.execute("""
    INSERT INTO ml_experiment (
        experiment_name,
        mlflow_experiment_id,
        dataset_version,
        total_data,
        total_fitur,
        target_column,
        target_type,
        created_at
    )
    VALUES (%s,%s,%s,%s,%s,%s,%s,%s)
    RETURNING id
""", (
    'restaurant_revenue_prediction',
    '1,2',
    'v1',
    8368,
    15,
    'revenue',
    'regression',
    datetime.now()
))

experiment_id = cur.fetchone()[0]

print(f"✅ Experiment berhasil dibuat dengan id: {experiment_id}")

# =========================================
# AMBIL RUN DARI MLFLOW
# =========================================
client = mlflow.tracking.MlflowClient()

runs = client.search_runs(
    experiment_ids=['1', '2']
)

runs = sorted(
    runs,
    key=lambda x: x.info.start_time
)

print(f"✅ Total run ditemukan: {len(runs)}")

# =========================================
# INSERT MODEL RUN
# =========================================
best_mae = float('inf')
best_run_name = None

for run in runs:

    run_name = run.data.tags.get(
        'mlflow.runName',
        'unknown'
    )

    model_type = run.data.params.get(
        'model_type',
        'unknown'
    )

    mae = run.data.metrics.get('MAE', 0)
    rmse = run.data.metrics.get('RMSE', 0)
    r2 = run.data.metrics.get('R2', 0)

    parameters = json.dumps(run.data.params)

    # cek best model
    if mae < best_mae:
        best_mae = mae
        best_run_name = run_name

    cur.execute("""
        INSERT INTO ml_model_run (
            experiment_id,
            run_name,
            mlflow_run_id,
            model_type,
            parameters,
            mae,
            rmse,
            r2_score,
            is_best_model,
            trained_at
        )
        VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)
    """, (
        experiment_id,
        run_name,
        run.info.run_id,
        model_type,
        parameters,
        float(mae),
        float(rmse),
        float(r2),
        False,
        datetime.now()
    ))

    print(f"✅ {run_name} berhasil diinsert")

# =========================================
# UPDATE BEST MODEL
# =========================================
cur.execute("""
    UPDATE ml_model_run
    SET is_best_model = TRUE
    WHERE run_name = %s
    AND experiment_id = %s
""", (
    best_run_name,
    experiment_id
))

print("\n🏆 Best Model:")
print(f"Nama : {best_run_name}")
print(f"MAE  : {best_mae}")

# =========================================
# COMMIT
# =========================================
conn.commit()

cur.close()
conn.close()

print("\n✅ Semua data berhasil masuk PostgreSQL")