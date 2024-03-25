# 가상환경을 넘어 루트 디렉토리 경로 설정

import set_root_directory
from utils.config.dbconfig import db_config
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import mysql.connector
from pydantic import BaseModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE"],
    allow_headers=["*"],
)

mydb = mysql.connector.connect(**db_config)

#이미지 메타데이터를 저장하기 위한 요청 바디 모델
class ImageMetadata(BaseModel):
    """
    Represents the metadata of an image.
    
    Attributes:
        filename (str): The name of the image file.
        filepath (str): The path of the image file.
        filesize (int): The size of the image file in bytes.
    """
    filename: str
    filepath: str
    filesize: int
    

@app.get('/')
async def read_root():
    return {"Hello": "im 8001"}

# 이미지 메타데이터를 저장하는 라우트 함수
@app.post("/save-image-metadata")
async def save_image_metadata(image_metadata:ImageMetadata):
    try:
        # 여기서는 받은 데이터를 그대로 출력하는 예시 코드를 작성하였음
        print("Received image metadata:", image_metadata.dict())
        
        # 받은 이미지 메타데이터를 데이터베이스에 저장
        cursor = mydb.cursor()
        query = "INSERT INTO image_metadata (filename, filepath, filesize) VALUES (%s, %s, %s)"
        values = (image_metadata.filename, image_metadata.filepath, image_metadata.filesize)
        cursor.execute(query, values)
        mydb.commit()
        
        return {"message": "Image metadata saved successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to save image metadata: {str(e)}")

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