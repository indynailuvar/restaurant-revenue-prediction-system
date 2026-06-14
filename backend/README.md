# Restaurant Revenue Prediction System

## Overview

Restaurant Revenue Prediction System adalah sistem prediksi pendapatan tahunan restoran berbasis machine learning yang dikembangkan sebagai proyek gabungan mata kuliah Teknologi Web Service, Data Mining, Machine Learning Operations, dan Web Developer. Sistem ini tidak hanya berfokus pada proses analisis dan pemodelan data, tetapi juga mengintegrasikan model machine learning ke dalam backend API, frontend web, database histori prediksi, deployment, serta dokumentasi teknis.

Project ini menggunakan pendekatan supervised learning berbasis regresi untuk memprediksi nilai `Revenue` atau pendapatan tahunan restoran berdasarkan karakteristik restoran seperti lokasi, jenis masakan, rating, kapasitas tempat duduk, harga rata-rata makanan, anggaran pemasaran, jumlah pengikut media sosial, pengalaman chef, jumlah ulasan, panjang ulasan, skor suasana, kualitas layanan, reservasi, dan ketersediaan parkir. Model terbaik yang digunakan dalam sistem adalah Gradient Boosting Regressor yang telah disimpan sebagai artifact dan diintegrasikan ke backend FastAPI.

Kesimpulan utama dari project ini adalah bahwa model ensemble berbasis boosting mampu memberikan performa prediksi terbaik dibandingkan model pembanding. Insight penting dari sistem ini adalah bahwa prediksi pendapatan restoran tidak cukup hanya dilihat dari satu faktor seperti rating atau kapasitas, tetapi perlu dianalisis melalui kombinasi faktor operasional, pemasaran, kualitas layanan, dan pola reservasi.

## Project Goals

Tujuan utama project ini adalah:

1. Membangun model machine learning untuk memprediksi pendapatan tahunan restoran.
2. Membandingkan beberapa algoritma supervised learning berbasis regresi.
3. Menentukan model terbaik berdasarkan metrik evaluasi.
4. Menyimpan model terbaik sebagai artifact yang dapat digunakan ulang oleh backend.
5. Mengembangkan backend API menggunakan FastAPI untuk melayani request prediksi.
6. Mengembangkan frontend web agar pengguna dapat memasukkan data restoran baru.
7. Menampilkan hasil prediksi dalam satuan USD dan konversi IDR.
8. Menambahkan validasi input untuk mendeteksi data yang berada di luar distribusi training.
9. Menyimpan histori input dan hasil prediksi ke database PostgreSQL.
10. Mengintegrasikan project dengan GitHub, Docker, Railway, Vercel, dan MLflow sebagai bagian dari praktik MLOps.

## Dataset

Dataset yang digunakan adalah Restaurant Revenue Prediction Dataset dari Kaggle milik Anthony Therrien.

Dataset ini digunakan untuk membangun model prediksi pendapatan restoran dengan target:

```text
Revenue
```

Jenis problem machine learning:

```text
Supervised Learning - Regression
```

Fitur input yang digunakan dalam sistem meliputi:

| No. | Fitur                  | Tipe        | Keterangan                          |
| --- | ---------------------- | ----------- | ----------------------------------- |
| 1   | Location               | Kategorikal | Lokasi restoran                     |
| 2   | Cuisine                | Kategorikal | Jenis masakan                       |
| 3   | Rating                 | Numerik     | Rating restoran                     |
| 4   | Seating_Capacity       | Numerik     | Kapasitas tempat duduk              |
| 5   | Average_Meal_Price     | Numerik     | Harga rata-rata makanan dalam USD   |
| 6   | Marketing_Budget       | Numerik     | Anggaran pemasaran dalam USD        |
| 7   | Social_Media_Followers | Numerik     | Jumlah pengikut media sosial        |
| 8   | Chef_Experience_Years  | Numerik     | Pengalaman chef dalam tahun         |
| 9   | Number_of_Reviews      | Numerik     | Jumlah ulasan pelanggan             |
| 10  | Avg_Review_Length      | Numerik     | Rata-rata panjang ulasan            |
| 11  | Ambience_Score         | Numerik     | Skor suasana restoran               |
| 12  | Service_Quality_Score  | Numerik     | Skor kualitas layanan               |
| 13  | Weekend_Reservations   | Numerik     | Reservasi akhir pekan               |
| 14  | Weekday_Reservations   | Numerik     | Reservasi hari kerja                |
| 15  | Parking_Availability   | Kategorikal | Ketersediaan parkir                 |
| 16  | Revenue                | Numerik     | Target prediksi pendapatan restoran |

Output utama model menggunakan satuan USD sesuai target pada dataset training. Sistem juga menampilkan konversi ke IDR menggunakan nilai kurs tetap yang dikonfigurasi pada backend.

## System Architecture

```mermaid
flowchart TD
    A[User] --> B[Frontend Web - React Vite]
    B --> C[Backend API - FastAPI]
    C --> D[Input Validation & Preprocessing]
    D --> E[Encoder, Scaler, Feature Names]
    E --> F[Gradient Boosting Model]
    F --> G[Prediction Result]
    G --> H[USD & IDR Output]
    G --> I[PostgreSQL Prediction History]
    C --> J[Model Artifact]
    J --> J1[best_model.pkl]
    J --> J2[encoders.pkl]
    J --> J3[feature_names.pkl]
    J --> J4[scaler.pkl]
    C --> K[Railway Deployment]
    B --> L[Vercel Deployment]
    M[GitHub Repository] --> N[Dockerfile & GitHub Actions]
    N --> O[Docker Hub Image Pipeline]
```

Alur utama sistem:

1. User mengisi form prediksi pada frontend.
2. Frontend mengirim data input ke endpoint `/predict`.
3. Backend menerima input JSON dan melakukan validasi.
4. Fitur kategorikal diproses menggunakan encoder.
5. Urutan fitur disesuaikan dengan `feature_names.pkl`.
6. Data diproses menggunakan scaler jika dibutuhkan.
7. Model Gradient Boosting Regressor menghasilkan prediksi revenue.
8. Backend melakukan post-processing agar revenue tidak bernilai negatif.
9. Output utama ditampilkan dalam USD.
10. Output tambahan dikonversi ke IDR.
11. Input dan hasil prediksi disimpan ke PostgreSQL sebagai histori prediksi.
12. Frontend menampilkan hasil prediksi, reliabilitas, catatan validasi, dan faktor pendukung.

## Features

Fitur utama sistem:

1. Form input data restoran berbasis web.
2. Prediksi pendapatan tahunan restoran menggunakan model Gradient Boosting Regressor.
3. Output prediksi dalam USD.
4. Output konversi prediksi ke IDR.
5. Validasi input berdasarkan rentang data training.
6. Deteksi input di luar distribusi training.
7. Deteksi kategori yang tidak dikenal pada fitur kategorikal.
8. Penyesuaian otomatis jika model menghasilkan prediksi negatif.
9. Informasi status model, versi model, dan alias model.
10. Penyimpanan histori prediksi ke database PostgreSQL.
11. Endpoint API untuk melihat histori prediksi.
12. Integrasi frontend dengan backend melalui environment variable `VITE_API_URL`.
13. Deployment backend menggunakan Railway.
14. Deployment frontend menggunakan Vercel.
15. Dockerfile backend untuk containerization.
16. GitHub Actions workflow untuk pipeline Docker Hub.
17. Dokumentasi API dan model contract.

## Tech Stack

| Komponen                    | Teknologi          |
| --------------------------- | ------------------ |
| Bahasa Pemrograman          | Python, JavaScript |
| Machine Learning            | Scikit-learn       |
| Model Tracking              | MLflow             |
| Backend                     | FastAPI            |
| Frontend                    | React Vite         |
| Database                    | PostgreSQL         |
| Deployment Backend          | Railway            |
| Deployment Frontend         | Vercel             |
| Containerization            | Docker             |
| CI/CD                       | GitHub Actions     |
| Package Management Backend  | pip                |
| Package Management Frontend | npm                |
| Version Control             | Git dan GitHub     |
| API Testing                 | Swagger UI, curl   |
| Visualization               | Recharts           |
| Model Artifact              | Pickle file `.pkl` |

## Team Roles

| Anggota                 | Peran Utama                              | Tanggung Jawab                                                                                                          |
| ----------------------- | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| Laudita Esma Syahputri  | Machine Learning Engineer                | Dataset, preprocessing, training model, evaluasi model, MLflow, model artifact                                          |
| Indy Nailuvar           | Backend Engineer / MLOps Engineer        | FastAPI backend, endpoint API, integrasi artifact model, validasi input, PostgreSQL prediction history, Railway, Docker |
| Syavikarani Cahya Putri | Frontend Developer / Deployment Engineer | React Vite frontend, UI/UX website, integrasi API backend, Vercel deployment, halaman prediksi dan hasil                |

## Machine Learning Pipeline

Alur machine learning pada project ini:

```text
Dataset
↓
Data Understanding
↓
Preprocessing
↓
Feature Encoding
↓
Feature Scaling
↓
Model Training
↓
Model Evaluation
↓
Model Selection
↓
MLflow Tracking
↓
Model Registry
↓
Artifact Export
↓
Backend Integration
↓
Prediction Serving
```

Model yang dibandingkan:

| Model                       | Jenis Model                           | Status           |
| --------------------------- | ------------------------------------- | ---------------- |
| Ridge Regression            | Linear Regression with Regularization | Model pembanding |
| Random Forest Regressor     | Ensemble Bagging                      | Model pembanding |
| Gradient Boosting Regressor | Ensemble Boosting                     | Model terpilih   |

Ringkasan performa model berdasarkan hasil eksperimen:

| Model                       | R-Squared |       MAE |
| --------------------------- | --------: | --------: |
| Gradient Boosting Regressor |    0.9996 | 3810.5871 |
| Random Forest Regressor     |    0.9982 |     12.98 |
| Ridge Regression            |    0.8540 |         - |

Model final:

```text
Model Name  : restaurant_gb_revenue1
Version     : 1
Alias       : champion
Artifact    : best_model.pkl
```

Artifact yang digunakan backend:

```text
models/trained/best_model.pkl
models/trained/encoders.pkl
models/trained/feature_names.pkl
models/trained/scaler.pkl
```

Insight penting dari pipeline model:

1. Gradient Boosting Regressor dipilih sebagai model champion karena menghasilkan performa terbaik berdasarkan nilai R-Squared.
2. Model ensemble lebih mampu menangkap pola nonlinier pada data pendapatan restoran dibandingkan model linear baseline.
3. Artifact seperti encoder, scaler, dan feature names penting agar data baru dari frontend diproses dengan aturan yang sama seperti data training.
4. Prediksi data baru tidak dilakukan dengan mencocokkan baris dataset secara manual, tetapi dengan menerapkan pola yang telah dipelajari model dari data historis.
5. Validasi metadata training membantu memberi peringatan ketika input user berada di luar rentang data training.

## Backend API

Backend dikembangkan menggunakan FastAPI. Endpoint utama:

| Endpoint              | Method | Fungsi                                                                  |
| --------------------- | ------ | ----------------------------------------------------------------------- |
| `/`                   | GET    | Root endpoint untuk mengecek informasi dasar API                        |
| `/health`             | GET    | Mengecek status backend                                                 |
| `/model-info`         | GET    | Menampilkan informasi model dan kelengkapan artifact                    |
| `/predict`            | POST   | Menerima input data restoran dan mengembalikan prediksi revenue         |
| `/prediction-history` | GET    | Menampilkan histori input dan hasil prediksi yang tersimpan di database |

Contoh request ke `/predict`:

```json
{
  "Location": "Rural",
  "Cuisine": "Japanese",
  "Rating": 4,
  "Seating_Capacity": 38,
  "Average_Meal_Price": 73.98,
  "Marketing_Budget": 2224,
  "Social_Media_Followers": 23406,
  "Chef_Experience_Years": 13,
  "Number_of_Reviews": 185,
  "Avg_Review_Length": 16.19,
  "Ambience_Score": 1.3,
  "Service_Quality_Score": 7,
  "Weekend_Reservations": 13,
  "Weekday_Reservations": 4,
  "Parking_Availability": "Yes"
}
```

Contoh response dari `/predict`:

```json
{
  "prediction_history_id": 8,
  "predicted_revenue": 639672.65,
  "predicted_revenue_usd": 639672.65,
  "currency": "USD",
  "predicted_revenue_idr": 10234762433.32,
  "converted_currency": "IDR",
  "usd_to_idr_rate": 16000,
  "exchange_rate_note": "Konversi IDR menggunakan rate konfigurasi sistem, bukan kurs real-time.",
  "model_status": "loaded",
  "model_name": "restaurant_gb_revenue1",
  "model_version": "1",
  "model_alias": "champion",
  "input_status": "valid",
  "prediction_reliability": "normal",
  "validation_warnings": [],
  "out_of_range_features": [],
  "unknown_categories": [],
  "is_prediction_adjusted": false,
  "prediction_note": "Input berada dalam kategori dan rentang data training yang diketahui. Hasil prediksi dapat digunakan sebagai estimasi awal.",
  "supporting_factors": [
    "Rating restoran relatif tinggi.",
    "Restoran memiliki alokasi anggaran pemasaran dalam USD.",
    "Jumlah pengikut media sosial relatif besar."
  ],
  "recommendation": "Hasil prediksi dapat digunakan sebagai estimasi awal Revenue restoran berdasarkan fitur operasional, pemasaran, ulasan, reservasi, dan karakteristik bisnis yang diberikan."
}
```

## Project Structure

Struktur utama repository:

```text
restaurant-revenue-prediction-system/
├── .github/
│   └── workflows/
│       └── docker-publish-backend.yml
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   └── routes/
│   │   ├── core/
│   │   ├── ml/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   └── utils/
│   ├── Dockerfile
│   ├── requirements.txt
│   └── README.md
├── data/
├── docs/
│   ├── api_contract.md
│   └── model_contract.md
├── frontend/
│   ├── src/
│   ├── Dockerfile
│   └── package.json
├── mlruns/
├── models/
│   └── trained/
│       ├── best_model.pkl
│       ├── encoders.pkl
│       ├── feature_names.pkl
│       └── scaler.pkl
├── notebooks/
├── reports/
├── scripts/
├── docker-compose.yml
├── mlflow.db
├── requirements.txt
└── README.md
```

## How to Run Locally

### 1. Clone repository

```bash
git clone https://github.com/indynailuvar/restaurant-revenue-prediction-system.git
cd restaurant-revenue-prediction-system
```

### 2. Setup backend environment

```bash
python -m venv venv
source venv/Scripts/activate
```

Untuk Windows Git Bash:

```bash
source C:/Users/Indy/restaurant-revenue-prediction-system/venv/Scripts/activate
```

Install dependencies backend:

```bash
pip install -r backend/requirements.txt
```

### 3. Setup environment variables backend

Buat file `.env` pada root project atau folder `backend`.

Contoh:

```env
DATABASE_URL=postgresql://postgres:password@localhost:5432/restaurant
USD_TO_IDR_RATE=16000
```

Untuk deployment Railway, `DATABASE_URL` dan `USD_TO_IDR_RATE` disimpan melalui Railway Variables, bukan ditulis langsung ke repository.

### 4. Run backend

```bash
cd backend
uvicorn app.main:app --reload
```

Backend akan berjalan pada:

```text
http://127.0.0.1:8000
```

Swagger UI:

```text
http://127.0.0.1:8000/docs
```

### 5. Test backend API

```bash
curl http://127.0.0.1:8000/health
```

```bash
curl -X POST http://127.0.0.1:8000/predict \
  -H "Content-Type: application/json" \
  -d @backend/sample_request.json
```

```bash
curl http://127.0.0.1:8000/prediction-history
```

### 6. Setup frontend

```bash
cd frontend
npm install
```

Buat file `.env` pada folder `frontend`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

Untuk production Vercel:

```env
VITE_API_URL=https://restaurant-revenue-prediction-system-production.up.railway.app
```

Run frontend:

```bash
npm run dev
```

Frontend akan berjalan pada:

```text
http://localhost:5173
```

### 7. Run using Docker

Build backend image:

```bash
docker build -f backend/Dockerfile -t restaurant-revenue-backend:test .
```

Run backend container:

```bash
docker run --rm -p 8000:8000 \
  -e DATABASE_URL="postgresql://postgres:password@host:5432/railway" \
  -e USD_TO_IDR_RATE=16000 \
  restaurant-revenue-backend:test
```

### 8. Docker Hub Pipeline

Repository ini menyiapkan GitHub Actions workflow untuk build dan push backend image ke Docker Hub.

Required GitHub Secrets:

```text
DOCKERHUB_USERNAME
DOCKERHUB_TOKEN
```

Expected Docker image:

```text
<dockerhub-username>/restaurant-revenue-backend:latest
```

## Current Status

Status pengembangan saat ini:

| Komponen                     | Status                 | Keterangan                                                                  |
| ---------------------------- | ---------------------- | --------------------------------------------------------------------------- |
| Dataset                      | Selesai                | Dataset telah digunakan untuk training model                                |
| Modeling                     | Selesai                | Gradient Boosting Regressor dipilih sebagai champion model                  |
| MLflow Tracking              | Selesai                | Model dicatat dan diregistrasikan melalui MLflow                            |
| Model Artifact               | Selesai                | Artifact tersedia pada `models/trained`                                     |
| Backend API                  | Selesai                | FastAPI menyediakan endpoint utama                                          |
| Model Serving                | Selesai                | Backend berhasil memproses data baru dan menghasilkan prediksi              |
| Input Validation             | Selesai                | Backend mendeteksi input valid, warning, out-of-range, dan unknown category |
| Currency Output              | Selesai                | Output ditampilkan dalam USD dan IDR                                        |
| Prediction History           | Selesai                | Input dan hasil prediksi tersimpan ke PostgreSQL                            |
| PostgreSQL Integration       | Selesai                | Database Railway terhubung dengan backend                                   |
| Frontend UI                  | Selesai                | React Vite menampilkan form input dan hasil prediksi                        |
| Frontend-Backend Integration | Selesai                | Frontend mengirim request ke backend melalui `VITE_API_URL`                 |
| Deployment Backend           | Selesai                | Backend dideploy menggunakan Railway                                        |
| Deployment Frontend          | Selesai                | Frontend dideploy menggunakan Vercel                                        |
| Docker Backend               | Tersedia               | Backend Dockerfile sudah dapat dibuild secara lokal                         |
| Docker Hub Pipeline          | Dalam tahap verifikasi | Workflow GitHub Actions disiapkan untuk push image ke Docker Hub            |

Kesimpulan status: sistem inti sudah berjalan dari input user, prediksi model, output hasil, hingga penyimpanan histori prediksi di database. Bagian yang masih perlu dipastikan secara terpisah adalah stabilitas pipeline Docker Hub apabila image backend ingin dipublikasikan otomatis melalui GitHub Actions.

## Documentation

Dokumentasi detail project tersedia pada folder `docs`.

Dokumen utama:

| Dokumen                  | Fungsi                                                    |
| ------------------------ | --------------------------------------------------------- |
| `docs/api_contract.md`   | Menjelaskan kontrak integrasi antara frontend dan backend |
| `docs/model_contract.md` | Menjelaskan kontrak artifact antara modeling dan backend  |
| `backend/README.md`      | Dokumentasi khusus backend                                |
| `frontend/README.md`     | Dokumentasi khusus frontend jika tersedia                 |
| `reports/`               | Folder hasil analisis, visualisasi, dan laporan           |
| `notebooks/`             | Notebook eksplorasi data dan eksperimen modeling          |
| `mlruns/`                | Catatan eksperimen MLflow                                 |
| `models/trained/`        | Artifact model final yang digunakan backend               |

## Contributors

| Nama                    | Peran                                    |
| ----------------------- | ---------------------------------------- |
| Laudita Esma Syahputri  | Machine Learning Engineer                |
| Indy Nailuvar           | Backend Engineer / MLOps Engineer        |
| Syavikarani Cahya Putri | Frontend Developer / Deployment Engineer |

## License

Project ini dibuat untuk kebutuhan pembelajaran dan pengerjaan Project Based Learning pada mata kuliah Teknologi Web Service, Data Mining, Machine Learning Operations, dan Web Developer.

Penggunaan ulang project diperbolehkan untuk tujuan edukasi, pengembangan akademik, dan demonstrasi sistem machine learning berbasis web, dengan tetap mencantumkan kredit kepada kontributor project.