# Database/db.py

from fastapi import FastAPI
import pymysql

# FastAPI 인스턴스 생성
app = FastAPI()

# MariaDB 연결 설정
db = pymysql.connect(
  host='localhost',
  user='root',
  password='1234',
  db='image',
)

# 커서 생성
cursor = db.cursor(pymysql.cursors.DictCursor)

@app.get("/")
def read_root():
    return {"Greet": "Hello, FastAPI World!"}

# 서버를 7777번 포트로 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=7777)