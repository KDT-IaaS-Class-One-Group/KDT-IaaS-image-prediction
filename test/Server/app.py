# Server/app.py

from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Greet": "Hello, FastAPI!"}

# 실행 명령: uvicorn app:app --reload --port 8000