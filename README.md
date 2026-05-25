##  Update Progress: Data Modeling (Orang 1)
Status: **Done** 

###  Ringkasan Model
Setelah melakukan eksperimen dengan beberapa algoritma (Logistic Regression, Random Forest, dan Gradient Boosting), berikut adalah hasilnya:

| Model | R-Squared ($R^2$) | MAE |
| :--- | :---: | :---: |
| **Gradient Boosting** | **0.9996** | **3810.5871** |
| Random Forest | 0.9982 | 12.98 |
| Ridge Regression | 0.8540 | - |

> **Note:** **Gradient Boosting Regressor** terpilih sebagai model terbaik karena memiliki akurasi tertinggi dan error terendah.

###  MLflow Registry
Model terbaik telah didaftarkan ke dalam MLflow Model Registry untuk memudahkan tahap deployment:
- **Model Name**: `restaurant_gb_revenue1`
- **Version**: `1`
- **Alias**: `@champion`

###  Output File
- `master_dataset_labeled.csv`: Dataset yang sudah melalui tahap labeling dan siap digunakan untuk analisis lanjut.