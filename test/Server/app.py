from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, Form
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

@app.post("/test")
async def handle_post_request(data: dict):
    print(data)
    return {"message": "Data received successfully"}

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

@app.post("/form")
async def check_data(data: str = Form(...)):
    return {"data": data}

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


@app.post("/files/")
async def create_file(
    file: bytes = File(), fileb: UploadFile = File(), token: str = Form()
):
    return {
        "file_size": len(file),
        "token": token,
        "fileb_content_type": fileb.content_type,
    }


# 실행 명령: uvicorn app:app --reload --port 8000
