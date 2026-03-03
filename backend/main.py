from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import pickle

app = FastAPI()

# Allow frontend to connect
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model & vectorizer
model = pickle.load(open("svc_model.pkl", "rb"))
vectorizer = pickle.load(open("tfidf_vectorizer.pkl", "rb"))

class Message(BaseModel):
    text: str

@app.post("/predict")
def predict(message: Message):
    transformed = vectorizer.transform([message.text])
    prediction = model.predict(transformed)[0]

    return {
        "prediction": "Spam" if prediction == 1 else "Not Spam"
    }