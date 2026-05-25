from fastapi import APIRouter

router = APIRouter()


@router.get("/health")
def health_check():
    return {
        "status": "ok",
        "service": "restaurant-revenue-backend",
        "problem_type": "regression",
        "target": "Revenue",
    }