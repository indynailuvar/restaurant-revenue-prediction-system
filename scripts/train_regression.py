import os
import mlflow

mlflow.set_tracking_uri(os.getenv("MLFLOW_TRACKING_URI", "http://127.0.0.1:5000"))
mlflow.set_experiment("Restaurant Revenue Regression")

with mlflow.start_run(run_name="regression_template_check"):
    mlflow.log_param("problem_type", "regression")
    mlflow.log_param("target", "Revenue")
    mlflow.log_param("owner_role", "backend_mlops")
    mlflow.log_metric("template_rmse", 999.99)
    mlflow.log_metric("template_mae", 888.88)
    mlflow.log_metric("template_r2", 0.50)

print("Regression template berhasil dikirim ke MLflow.")