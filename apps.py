from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from tensorflow.keras.models import load_model
from contextlib import asynccontextmanager
import numpy as np
from utils import preprocess_image

# Global variable to hold the model
model = None
letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"

@asynccontextmanager
async def lifespan(app: FastAPI):
    # Load the ML model
    global model
    try:
        model = load_model('sign_trained_cnn.h5')
        print("Model loaded successfully")
    except Exception as e:
        print(f"Error loading model: {e}")
    yield
    # Clean up the ML models and release the resources
    model = None

app = FastAPI(lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/")
def home():
    return {"message": "Welcome to Sign Language Detection API"}

@app.post("/predict/")
async def predict(file: UploadFile = File(...)):
    global model
    if model is None:
        raise HTTPException(status_code=503, detail="Model not loaded")

    try:
        contents = await file.read()
        img = preprocess_image(contents)

        prediction = model.predict(img, verbose=0)
        predicted_class = np.argmax(prediction)
        predicted_letter = letters[predicted_class]

        return JSONResponse(content={
            "predicted_class": int(predicted_class),
            "predicted_letter": predicted_letter
        })
    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")
