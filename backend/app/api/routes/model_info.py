from fastapi import APIRouter

router = APIRouter()


@router.get("/model-info")
def model_info():
    return {
        "project": "restaurant revenue prediction",
        "problem_type": "regression",
        "target": "Revenue",
        "status": "dummy mode until final model is available"
    }