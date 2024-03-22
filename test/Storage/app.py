# test\Storage\app.py
from fastapi import FastAPI
# CORS 설정을 위한 라이브러리 추가
from fastapi.middleware.cors import CORSMiddleware
#? CORS는? Cross-Origin Resource Sharing의 약자로, 다른 도메인에서의 요청을 허용하는 기능
# HTTPException를 사용하기 위해 추가 -> fastapi 패키지에 포함되어있음
from fastapi import HTTPException

app = FastAPI()

# 모든 도메인에서의 요청을 허용하는 CORS 설정
app.add_middleware(
    # CORS 미들웨어 추가
    CORSMiddleware,
    # 모든 도메인에서의 요청을 허용
    allow_origins=["*"],
    # 모든 HTTP 메서드 허용
    allow_credentials=True,
    # 모든 메서드 허용
    allow_methods=["*"],
    # 모든 헤더 허용
    allow_headers=["*"],
)

@app.get("/")
async def root():
    return {"message": "Hello World"}

# test\Client\next\app\component\JsonuploadFrom.tsx을 대응하기 위한 라우터
@app.post("/uploadjson")

# JSON 데이터를 받아오는 라우터
async def create_upload_json(json: dict):
    print("uploadjson 라우터 실행")
    # # 받은 JSON 데이터의 image 필드에서 파일을 추출
    # if "json" not in json:
    #     raise HTTPException(status_code=400, detail="No json provided")
    # 이미지 파일 처리 로직을 수행
    try:
        print(json)
        # 이미지 처리 로직
        return {"json 내용" : json}
    # 예외 처리
    except Exception as e:
        # 서버 오류 발생 시 500 에러 반환
        raise HTTPException(status_code=500, detail=str(e))

# 이미지 업로드 라우터
# @app.post("/uploadfile/")
# async def create_upload_file(image: dict):
#     # 받은 JSON 데이터의 image 필드에서 파일을 추출
#     if "image" not in image:
#         raise HTTPException(status_code=400, detail="No image provided")
    
#     # 이미지 파일 처리 로직을 수행
#     try:
#         # 이미지 처리 로직
#         return {"filename": "your_filename_here"}
#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))

# 서버 실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)
#? 서버를 구동하는 power shell 명령어 : python app.py
# uvicorn app:app --host 127.0.0.1 --port 8000 --reload
    

# ? 왜 안됐을까?
    