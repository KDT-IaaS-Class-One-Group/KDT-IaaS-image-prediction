# Server/app.py
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
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

# Form을 사용하여 클라이언트로부터 데이터를 받음
# @app.post("/check")
# async def check_data(data: str = Form(...)):
#     return {"data": data}

@app.post("/check")
async def check_file_upload(image: UploadFile = File(...)):
    # 파일 메타데이터를 콘솔에 출력
    file_details = {
        "filename": image.filename,
        "content_type": image.content_type,
        "file_size": await image.read().__sizeof__()
    }
    print(file_details)

    # 파일 처리 완료 후 파일을 닫습니다.
    await image.close()

    return {"file_details": file_details}

# 실행 명령: uvicorn app:app --reload --port 8000