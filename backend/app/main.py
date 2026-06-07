import logging
import time

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.exc import OperationalError, SQLAlchemyError

from app.api.routes.health import router as health_router
from app.api.routes.model_info import router as model_info_router
from app.api.routes.predict import router as predict_router
from app.api.routes.history import router as history_router
from app.database import Base, engine
from app.models.prediction_history import PredictionHistory  # noqa: F401

logger = logging.getLogger(__name__)

app = FastAPI(
    title="Restaurant Revenue Prediction API",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_db() -> None:
    last_error = None

    for attempt in range(1, 6):
        try:
            Base.metadata.create_all(bind=engine)
            logger.info("Database tables ensured.")
            return
        except OperationalError as exc:
            last_error = exc
            logger.warning("Database not ready (attempt %s/5): %s", attempt, exc)
            time.sleep(5)
        except SQLAlchemyError as exc:
            last_error = exc
            logger.warning("Database init failed (attempt %s/5): %s", attempt, exc)
            time.sleep(5)

    logger.error("Database initialization skipped after retries: %s", last_error)


app.include_router(health_router)
app.include_router(model_info_router)
app.include_router(predict_router)
app.include_router(history_router)


@app.get("/")
def root():
    return {
        "message": "Restaurant Revenue Prediction API is running",
        "problem_type": "regression",
        "target": "Revenue",
        "docs": "/docs",
        "health": "/health",
        "predict": "/predict",
        "prediction_history": "/prediction-history",
    }