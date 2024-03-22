# test/Storage/s3.py
from fastapi import FastAPI
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

# 루트 경로에 대한 라우트
@app.get("/")
def read_root():
    # 조회한 객체 반환
    return {"Objects": objects}

# 파일 업로드를 위한 라우트
@app.get("/upload")
def upload_file():
    return {"Upload": "파일 업로드"}

# 서버를 5555번 포트로 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=5555)
