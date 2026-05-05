from fastapi import FastAPI
from backend.app.api.routes.health import router as health_router
from backend.app.api.routes.model_info import router as model_info_router
from backend.app.api.routes.predict import router as predict_router

app = FastAPI(title="Restaurant Revenue Prediction API")


@app.get("/")
def root():
    return {
        "message": "Restaurant Revenue Prediction API is running",
        "docs": "/docs"
    }


app.include_router(health_router)
app.include_router(model_info_router)
app.include_router(predict_router)