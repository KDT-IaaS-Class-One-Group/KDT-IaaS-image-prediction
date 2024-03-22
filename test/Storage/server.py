from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, File, UploadFile

# Server.py
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
    print("Hello, Storage")
    return {"Greet": "storage server is running입니다요"}

@app.post("/check")
async def check_file_upload(image: UploadFile = File(...)):
    # 파일 처리 로직...
    print(image)
    
    # 파일을 저장할 경로 설정
    save_path = r"C:\Users\user\Desktop\k-digital\DEV\KDT-IaaS-image-prediction\test\Server\images\\" + image.filename
    
    # 이미지 파일 저장
    with open(save_path, "wb") as f:
        content = await image.read()
        f.write(content)

    return {"message": "Image saved successfully"}
  
# 실행 명령: uvicorn server:app --reload --port 8002