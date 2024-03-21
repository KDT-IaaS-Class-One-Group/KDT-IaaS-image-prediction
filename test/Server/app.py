from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, HTTPException
from pydantic import BaseModel
import httpx 
import requests

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

# 파일 로컬 image파일에 저장
@app.post("/check1")
async def check_file_upload(image: UploadFile = File(...)):
    # 파일 처리 로직...
    print(image)
    # 파일을 저장할 경로 설정
    save_path = r"C:\Users\user\Desktop\k-digital\DEV\KDT-IaaS-image-prediction\test\Server\images\\" + image.filename

    # 이미지 파일 저장
    with open(save_path, "wb") as f:
        content = await image.read()
        f.write(content)
        
    

    return {"message": "Image saved successfully"}


# 이미지 데이터 전송 (base64 - json 이미지 데이터 전송)
class ImageData(BaseModel):
    imageData: str

async def send_to_storage(image_data: ImageData):
    # Storage 서버의 주소
    storage_server_url = "대충 스토리지 서버 주소/이미지 저장"
    
    # Storage 서버로 이미지 데이터 전송
    try:
        storage_response = await requests.post(storage_server_url, json=image_data.dict())
        storage_response.raise_for_status()  # HTTP 오류가 발생하면 예외를 발생시킴
        return storage_response.json()
    except Exception as e:
        # 실패 시 롤백 로직을 추가할 수 있음
        raise HTTPException(status_code=500, detail="Storage 서버에 이미지 전송 중 오류가 발생했습니다.") from e

async def save_to_database(image_data: ImageData, storage_response: dict):
    # DB 서버의 주소
    db_server_url = "대충 스토리지 db 주소/메타데이터 저장"
    
    # DB 서버로 이미지 메타데이터 전송
    try:
        db_payload = {
            "image_url": storage_response["image_url"],
            "metadata": image_data.dict()
        }
        db_response = await requests.post(db_server_url, json=db_payload)
        db_response.raise_for_status()  # HTTP 오류가 발생하면 예외를 발생시킴
    except Exception as e:
        # 실패 시 롤백 로직을 추가할 수 있음
        # 여기서는 Storage 서버에 이미지를 삭제하는 등의 롤백 작업이 필요할 수 있음
        raise HTTPException(status_code=500, detail="DB 서버에 메타데이터 저장 중 오류가 발생했습니다.") from e

@app.post("/api/upload")
async def upload_image(image_data: ImageData):
    if image_data.imageData:
        # 이미지 데이터를 확인하는 라우트
        print("받은 이미지 데이터:", image_data.imageData)
        
        # Storage 서버로 이미지 데이터를 전달하는 라우트
        storage_response = await send_to_storage(image_data)
        
        # DB 서버에 이미지 메타데이터를 저장하는 라우트
        await save_to_database(image_data, storage_response)
        
        return {"message": "이미지가 성공적으로 업로드되었습니다.", "storage_response": storage_response}
    else:
        raise HTTPException(status_code=400, detail="이미지 데이터가 없습니다.")


# 실행 명령: uvicorn app:app --reload --port 8000
