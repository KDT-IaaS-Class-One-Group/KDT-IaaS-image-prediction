# test/Storage/s3.py
from fastapi import FastAPI

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
