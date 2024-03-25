# Database/db.py

from fastapi import FastAPI

# FastAPI 인스턴스 생성
app = FastAPI()

@app.get("/")
def read_root():
    return {"Greet": "Hello, FastAPI World!"}

# 서버를 7777번 포트로 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=7777)