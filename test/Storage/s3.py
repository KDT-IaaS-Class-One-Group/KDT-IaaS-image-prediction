# test/Storage/s3.py
from fastapi import FastAPI
import boto3
from dotenv import load_dotenv

# 환경변수 로드
load_dotenv()

# S3 연결 설정
s3 = boto3.client(
    "s3",
    aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
    aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY"),
    region_name=os.getenv("AWS_REGION_NAME"),
)

# FastAPI 인스턴스 생성
app = FastAPI()

# 루트 경로에 대한 라우트
@app.get("/")
def read_root():
    return {"Greet": "Hello, FastAPI World!"}

# 파일 업로드를 위한 라우트
@app.get("/upload")
def upload_file():
    return {"Upload": "파일 업로드"}

# 서버를 5555번 포트로 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=5555)
