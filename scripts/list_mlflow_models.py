import mlflow
from mlflow.tracking import MlflowClient

TRACKING_URI = "http://127.0.0.1:5001"

mlflow.set_tracking_uri(TRACKING_URI)
client = MlflowClient(tracking_uri=TRACKING_URI)

print("=== Registered Models ===")

models = client.search_registered_models()

if not models:
    print("Tidak ada registered model di MLflow Registry.")
    print("Cek tab Experiments, kemungkinan model hanya tersimpan sebagai artifact run.")
else:
    for model in models:
        print(f"\nModel Name: {model.name}")

        for version in model.latest_versions:
            print(f"  Version : {version.version}")
            print(f"  Stage   : {version.current_stage}")
            print(f"  Run ID  : {version.run_id}")
            print(f"  Source  : {version.source}")

            try:
                aliases = client.get_model_version_download_uri(
                    name=model.name,
                    version=version.version
                )
                print(f"  Download URI: {aliases}")
            except Exception:
                pass
