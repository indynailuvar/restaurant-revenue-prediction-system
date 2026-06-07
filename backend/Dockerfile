# Gunakan image Python ringan
FROM python:3.12-slim

# Set working directory
WORKDIR /app/backend

# Install dependency sistem jika diperlukan
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
        build-essential \
        curl \
    && rm -rf /var/lib/apt/lists/*

# Copy requirements
COPY backend/requirements.txt /app/backend/requirements.txt

# Install dependency Python
RUN pip install --no-cache-dir --upgrade pip && \
    pip install --no-cache-dir -r /app/backend/requirements.txt

# Copy semua source code backend
COPY backend /app/backend

# Default workdir untuk menjalankan backend
WORKDIR /app/backend

# Expose port backend jika ada
EXPOSE 8000

# Command untuk run backend (sesuaikan kalau pakai FastAPI/uvicorn)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]