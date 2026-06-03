from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.api.routes.model_info import router as model_info_router
from app.api.routes.predict import router as predict_router
from app.api.routes.history import router as history_router
from app.database import Base, engine
from app.models.prediction_history import PredictionHistory


app = FastAPI(
    title="Restaurant Revenue Prediction API",
    version="1.0.0",
)

Base.metadata.create_all(bind=engine)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(model_info_router)
app.include_router(predict_router)
app.include_router(history_router)