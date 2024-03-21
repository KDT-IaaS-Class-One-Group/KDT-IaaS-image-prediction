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

@app.get("/table")
async def get_table_names():
    url = "http://localhost:8001/table"
    response = httpx.get(url)
    response.raise_for_status()  # 오류 발생 시 예외를 일으킴
    table_names = response.json()  # JSON 데이터 추출
    return table_names

@app.post("/check1")
async def check_file_upload2(image: UploadFile = File(...)):
    # 파일 처리 로직...
    print(image)
    # 파일을 저장할 경로 설정
    save_path = r"C:\Users\user\Desktop\k-digital\DEV\KDT-IaaS-image-prediction\test\Server\images\\" + image.filename

    # 이미지 파일 저장
    with open(save_path, "wb") as f:
        content = await image.read()
        f.write(content)

    return {"message": "Image saved successfully"}


# 실행 명령: uvicorn app:app --reload --port 8000
