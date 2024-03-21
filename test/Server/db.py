from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import mysql.connector

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)


# .env를 활용해도 좋다.
db_config = {
    "host": "127.0.0.1",
    "port": "3306",
    "user": "root",
    "password": "0000",
    "database": "test_database"
}

mydb = mysql.connector.connect(**db_config)

@app.get('/')
async def read_root():
    return {"Hello": "im 8001"}

# 테이블 이름 가져오기
@app.get("/table")
async def get_table_names():
    cursor = mydb.cursor()
    cursor.execute("SHOW TABLES")
    tables = cursor.fetchall()
    table_names = [table[0] for table in tables]
    return {"tables": table_names}

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8001)

# 실행 명령: uvicorn db:app --reload --port 8001