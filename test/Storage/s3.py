# test/Storage/s3.py
from fastapi import FastAPI, UploadFile, File
from fastapi.middleware.cors import CORSMiddleware
import boto3
from dotenv import load_dotenv
import os

# 환경변수 로드
load_dotenv()

# S3 연결 설정
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION_NAME"),
)

# 버킷 내의 객체 조회
response = s3.list_objects(Bucket=os.getenv("S3_BUCKET_NAME"))

# 조회한 객체를 변수로 선언
objects = [obj["Key"] for obj in response["Contents"]]
    
# FastAPI 인스턴스 생성
app = FastAPI()

# CORS 설정
origins = [
    "http://localhost:3000", # Next App
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 루트 경로에 대한 라우트
@app.get("/")
def read_root():
    # 조회한 객체 반환
    return {"Objects": objects}

# 파일 업로드를 위한 라우트
@app.post("/upload")
# 파일 업로드 함수
async def upload_file(file: UploadFile = File(...)):
    # 파일을 업로드
    with open(file.filename, "wb") as buffer:
        # 파일을 읽어서 버퍼에 저장
        buffer.write(await file.read())
    # S3에 파일 업로드
    upload_file(os.getenv("S3_BUCKET_NAME"), file.filename, file.filename)
    # 업로드한 파일 이름을 반환
    return {"filename": file.filename}

# 서버를 5555번 포트로 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=5555)
