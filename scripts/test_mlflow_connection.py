import os
import mlflow

mlflow.set_tracking_uri(os.getenv("MLFLOW_TRACKING_URI", "http://127.0.0.1:5000"))
mlflow.set_experiment("Restaurant Revenue Regression")

with mlflow.start_run(run_name="test_backend_mlops_indy"):
    mlflow.log_param("owner", "Indy")
    mlflow.log_param("role", "backend_mlops")
    mlflow.log_param("project_type", "regression")

    mlflow.log_metric("dummy_rmse", 1234.56)
    mlflow.log_metric("dummy_mae", 789.12)
    mlflow.log_metric("dummy_r2", 0.88)

    with open("mlflow_test_artifact.txt", "w", encoding="utf-8") as f:
        f.write("MLflow connection test from Indy")

    mlflow.log_artifact("mlflow_test_artifact.txt")

print("MLflow test run berhasil dikirim.")