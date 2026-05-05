from backend.app.services.model_loader import model_files_exist


def predict_revenue(data: dict) -> dict:
    if not model_files_exist():
        return {
            "predicted_revenue": 100000.0,
            "model_status": "dummy",
            "model_name": "dummy-regression"
        }

    # Nanti bagian ini diganti setelah model final dari orang 1 siap
    return {
        "predicted_revenue": 100000.0,
        "model_status": "model_loaded",
        "model_name": "final-regression-model"
    }