# Model/app.py

from fastapi import FastAPI
from main import json_data

app = FastAPI()

@app.get("/")
def get_prediction():
    # main.py에서 생성된 JSON 데이터를 클라이언트에 반환
    return json_data

# 실행 명령: uvicorn app:app --reload --port 9999