from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes.health import router as health_router
from app.api.routes.model_info import router as model_info_router
from app.api.routes.predict import router as predict_router


app = FastAPI(
    title="Restaurant Revenue Prediction API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://restaurant-revenue-prediction-system-aon3n1b5g.vercel.app",
        "https://restaurant-revenue-prediction-system-cu2qjqxyg.vercel.app",
    ],
    allow_origin_regex=r"https://restaurant-revenue-prediction-system-.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(health_router)
app.include_router(model_info_router)
app.include_router(predict_router)