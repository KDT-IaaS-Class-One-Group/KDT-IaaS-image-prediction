from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile, HTTPException
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

# 클라이언트에서 이미지를 받아서 storage에 저장하고 저장되면 DB에 저장하는 트랜젝션을 활용한 엔드포인트
@app.post("/upload-image-and-save-to-db")
async def upload_image_and_save_to_db(image: UploadFile = File(...)):
    try:
        # 이미지를 받아옴
        image_content = await image.read()

        # * storage 서버로 전송
        storage_url = "http://localhost:8002/check"  # storage 서버의 엔드포인트 URL
        files = {"image": (image.filename, image_content)}  # 이미지 파일을 담은 딕셔너리
        response = httpx.post(storage_url, files=files)  # storage 서버로 POST 요청 보냄
        print("storage : " + response.json())
        response.raise_for_status()  # 오류 발생 시 예외를 일으킴

        # * 이미지 파일의 메타데이터 추출
        print(image)
        
        # image_metadata = {
        #     "filename": image.filename,
        #     # "filepath": response.json().get("filepath"),  # storage 서버에서 받은 파일 경로
        #     "filepath": image.filename,  # storage 서버에서 받은 파일 경로
        #     "filesize": image.filesize,
        # }
        # print(image_metadata)
        
        # * DB에 이미지 메타데이터 저장
        # db_url = "http://localhost:8001/save-image-metadata"  # DB 서버의 엔드포인트 URL
        # db_response = httpx.post(db_url, json=image_metadata)  # DB 서버로 POST 요청 보냄
        # db_response.raise_for_status("db error")  # 오류 발생 시 예외를 일으킴

        return {"message": "이미지가 성공적으로 업로드되고 메타데이터가 DB에 저장되었습니다."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"이미지 업로드 및 메타데이터 저장에 실패했습니다: {e}")

# 클라이언트로부터 이미지를 받아서 storage 서버로 전달하는 엔드포인트
@app.post("/check")
async def check_file_upload(image: UploadFile = File(...)):
    # 이미지를 받아옴 - 
    image_content = await image.read()

    # storage 서버로 전송
    storage_url = "http://localhost:8002/check"  # storage 서버의 엔드포인트 URL
    files = {"image": (image.filename, image_content)}  # 이미지 파일을 담은 딕셔너리
    print(files)
    response = httpx.post(storage_url, files=files)  # storage 서버로 POST 요청 보냄

    # storage 서버의 응답 반환
    return response.json()

# 실행 명령: uvicorn app:app --reload --port 8000
