# Server/app.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
import httpx

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


@app.get("/")
def read_root():
    return {"Greet": "Hello, FastAPI!"}

@app.get("/table")
async def get_table_names():
    url = "http://localhost:8001/table"
    response = httpx.get(url)
    response.raise_for_status()  # 오류 발생 시 예외를 일으킴
    table_names = response.json()  # JSON 데이터 추출
    return table_names

@app.post("/check")
async def check_request(request_body: dict):
    print(request_body)
    return {"message": "Request body printed successfully"}

# 실행 명령: uvicorn app:app --reload --port 8000