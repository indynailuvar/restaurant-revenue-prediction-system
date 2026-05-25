from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.api.routes.model_info import router as model_info_router
from app.api.routes.predict import router as predict_router


app = FastAPI(
    title="Restaurant Revenue Prediction API",
    description=(
        "API untuk prediksi pendapatan restoran menggunakan supervised learning "
        "berbasis regresi dengan target Revenue."
    ),
    version="1.0.0",
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def root():
    return {
        "message": "Restaurant Revenue Prediction API is running",
        "problem_type": "regression",
        "target": "Revenue",
        "docs": "/docs",
        "health": "/health",
        "model_info": "/model-info",
        "predict": "/predict",
    }


app.include_router(health_router, tags=["Health"])
app.include_router(model_info_router, tags=["Model Info"])
app.include_router(predict_router, tags=["Prediction"])