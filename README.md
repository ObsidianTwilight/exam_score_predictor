# 🎓 AI Exam Score Predictor: End-to-End MLOps Project

This repository contains a complete, end-to-end Machine Learning pipeline that predicts a student's final exam score based on their study habits, attendance, and demographics. 

This project follows the complete MLOps lifecycle: from raw data cleaning and model selection to creating a web interface and containerizing the application with Docker.

## 🚀 Project Architecture
1. **Model Training:** Jupyter Notebook utilizing `scikit-learn` to test Linear Regression vs. Random Forest models. Hyperparameter tuning was conducted using `RandomizedSearchCV`.
2. **Data Pipeline:** A robust `ColumnTransformer` and `Pipeline` that automatically handles missing values, scales numerical features, and target-encodes categorical data.
3. **Backend API:** A Python `Flask` server that receives user input, passes it through the serialized (`joblib`) ML pipeline, and returns predictions.
4. **Frontend Interface:** A dynamic, responsive HTML/CSS/JS web page that communicates with the Flask API asynchronously.
5. **Containerization:** A complete `Dockerfile` ensuring the app runs flawlessly across any environment.

## 📊 Model Performance
* **Selected Model:** Regularized Linear Regression
* **Cross-Validation RMSE:** ~9.78
* **Test Set RMSE:** 9.81
* **95% Confidence Interval:** [9.61, 10.02]

## 🛠️ How to Run Locally

### Option 1: Using Docker (Recommended)
Make sure Docker Desktop is running, then execute:
```bash
docker build -t exam-predictor-app .
docker run -p 5000:5000 exam-predictor-app