from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.api.routes.model_info import router as model_info_router
from app.api.routes.predict import router as predict_router
from app.api.routes.history import router as history_router

from app.database import Base, engine
from app.models.prediction_history import PredictionHistory


# =====================================================
# DATABASE INITIALIZATION
# =====================================================

Base.metadata.create_all(bind=engine)


# =====================================================
# FASTAPI APPLICATION
# =====================================================

app = FastAPI(
    title="Restaurant Revenue Prediction API",
    description="""
API untuk Sistem Prediksi Pendapatan Restoran
menggunakan Machine Learning Regression.

Fitur utama:
- Health Check
- Model Information
- Revenue Prediction
- Prediction History
- Database Monitoring
""",
    version="1.0.0",
)


# =====================================================
# CORS CONFIGURATION
# =====================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


# =====================================================
# ROOT ENDPOINT
# =====================================================

@app.get(
    "/",
    tags=["Root"]
)
def root():
    return {
        "status": "success",
        "message": "Restaurant Revenue Prediction API Running",
        "version": "1.0.0",
        "documentation": "/docs"
    }


# =====================================================
# API STATUS ENDPOINT
# =====================================================

@app.get(
    "/status",
    tags=["Monitoring"]
)
def api_status():
    return {
        "api_status": "online",
        "database_status": "connected",
        "service": "Restaurant Revenue Prediction API",
        "version": "1.0.0"
    }


# =====================================================
# ROUTERS
# =====================================================

app.include_router(health_router)
app.include_router(model_info_router)
app.include_router(predict_router)
app.include_router(history_router)