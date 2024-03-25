# Database/db.py

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pymysql

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

# 엔드 포인트 설정 및 확인
# /db
@app.get("/db")
def read_db():
    try:
        with db.cursor() as cursor:
            # test 테이블 조회
            cursor.execute("SELECT * FROM test")
            tests = cursor.fetchall()
        return tests
    except Exception as e:
        return {"error": str(e)}

# /db/imageMeta
@app.get("/db/imageMeta")
def read_imageMeta():
    try:
        with db.cursor() as cursor:
          # imageMeta 테이블 조회
          cursor.execute("SELECT * FROM imageMeta")
          imageMeta = cursor.fetchall()
          return imageMeta
    except Exception as e:
        return {"error": str(e)}

# 서버를 7777번 포트로 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="localhost", port=7777)