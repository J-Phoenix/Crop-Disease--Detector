# 🌱 Crop Disease Detector (Teachable Machine + TensorFlow.js)

A simple **AI-powered web app** that detects whether a crop leaf is **healthy** or **diseased** using a model trained with [Google Teachable Machine](https://teachablemachine.withgoogle.com/).  
The app runs **entirely in the browser** with **TensorFlow.js**, so no server or backend is required.  

---

## 🚀 Features
- Upload a leaf image **or** use your **webcam** for live detection.  
- Supports multiple crop classes (healthy, leaf spot, blight, etc.).  
- Lightweight and runs directly in the browser (no installation needed).  
- Built with **HTML, CSS, JavaScript, TensorFlow.js**.  
- Trained on a custom dataset with **Google Teachable Machine**.  

---

## 📂 Project Structure
 ```text
CropDetector/
├─ index.html # Main webpage
├─ style.css # Styling
├─ script.js # Logic & prediction
└─ model/ # Exported Teachable Machine model
├─ model.json
├─ metadata.json
└─ weights.bin
 ```

---

## 🛠️ How to Run Locally
### 1. Clone the repository:
   ```bash
   git@github.com:J-Phoenix/Crop-Disease--Detector.git
   cd CropDetector
   ```

### 2.Start a local server (Python 3):
```bash
   python3 -m http.server 8000
   ```

### 3.Open your browser and go to:
```bash
   http://localhost:8000
   ```

## 🌐 Live Demo
👉 [GitHub Pages Link](https://J-Phoenix.github.io/Crop-Disease--Detector/) 

---

## 📊 Model Training
- Dataset collected from [PlantVillage on Kaggle](https://www.kaggle.com/datasets/emmarex/plantdisease).  
- Model trained on **Google Teachable Machine**.  
- Exported in **TensorFlow.js format** for web use.  

---

