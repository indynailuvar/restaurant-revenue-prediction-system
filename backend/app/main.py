from fastapi import FastAPI

from backend.app.api.routes.health import router as health_router
from backend.app.api.routes.model_info import router as model_info_router
from backend.app.api.routes.predict import router as predict_router


app = FastAPI(
    title="Restaurant Revenue Prediction API",
    description="API untuk prediksi revenue restoran menggunakan model hasil integrasi MLflow.",
    version="1.0.0",
)


@app.get("/")
def root():
    return {
        "message": "Restaurant Revenue Prediction API is running",
        "docs": "/docs",
        "health": "/health",
        "model_info": "/model-info",
        "predict": "/predict",
    }


app.include_router(health_router, tags=["Health"])
app.include_router(model_info_router, tags=["Model Info"])
app.include_router(predict_router, tags=["Prediction"])
