FROM python:3.11-slim

WORKDIR /app

# system deps (untuk numpy, sklearn, cryptography, dll)
RUN apt-get update && apt-get install -y \
    build-essential \
    gcc \
    g++ \
    python3-dev \
    pkg-config \
    libssl-dev \
    libffi-dev \
    curl \
    && rm -rf /var/lib/apt/lists/*

# copy backend requirements saja
COPY requirements-backend.txt .

RUN pip install --upgrade pip setuptools wheel

# install dependencies backend (NO JUPYTER, NO WINPTY ISSUE)
RUN pip install --no-cache-dir -r requirements-backend.txt

COPY . .

RUN mkdir -p /app/models/trained

EXPOSE 8000

CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
