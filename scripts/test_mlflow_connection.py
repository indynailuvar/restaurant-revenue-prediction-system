import os
import mlflow

mlflow.set_tracking_uri(os.getenv("MLFLOW_TRACKING_URI", "http://127.0.0.1:5000"))
mlflow.set_experiment("MLflow Connection Test")

with mlflow.start_run(run_name="test_run_1"):
    mlflow.log_param("developer_role", "backend_mlops")
    mlflow.log_param("owner", "Indy")
    mlflow.log_metric("dummy_accuracy", 0.95)
    mlflow.log_metric("dummy_loss", 0.10)

    with open("test_artifact.txt", "w", encoding="utf-8") as f:
        f.write("MLflow test artifact from Indy")

    mlflow.log_artifact("test_artifact.txt")

print("MLflow test run berhasil dikirim.")