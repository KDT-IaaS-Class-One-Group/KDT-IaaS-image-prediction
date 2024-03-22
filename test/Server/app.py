from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile
import httpx

# Server/app.py
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
    print("Hello, FastAPI!")
    return {"Greet": "Hello, FastAPI!"}

#테이블 확인
@app.get("/table")
async def get_table_names():
    url = "http://localhost:8001/table"
    response = httpx.get(url)
    response.raise_for_status()  # 오류 발생 시 예외를 일으킴
    table_names = response.json()  # JSON 데이터 추출
    return table_names

# 클라이언트로부터 이미지를 받아서 storage 서버로 전달하는 엔드포인트
@app.post("/check")
async def check_file_upload(image: UploadFile = File(...)):
    # 이미지를 받아옴
    image_content = await image.read()

    # storage 서버로 전송
    storage_url = "http://localhost:8002/check"  # storage 서버의 엔드포인트 URL
    files = {"image": (image.filename, image_content)}  # 이미지 파일을 담은 딕셔너리
    print(files)
    response = httpx.post(storage_url, files=files)  # storage 서버로 POST 요청 보냄

    # storage 서버의 응답 반환
    return response.json()




# 실행 명령: uvicorn app:app --reload --port 8000
