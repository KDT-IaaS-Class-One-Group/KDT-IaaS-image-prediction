from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Server/app.py

app = FastAPI()

# CORS 설정 추가
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def read_root():
    return {"Greet": "Hello, FastAPI!"}

# 실행 명령: uvicorn app:app --reload --port 8000