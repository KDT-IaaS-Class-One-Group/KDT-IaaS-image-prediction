# test\Storage\app.py
from fastapi import FastAPI
# CORS 설정을 위한 라이브러리 추가
#? CORS는? Cross-Origin Resource Sharing의 약자로, 다른 도메인에서의 요청을 허용하는 기능
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 모든 도메인에서의 요청을 허용하는 CORS 설정
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)




# python app.py로 명령어 없이 FastAPI 서버실행
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)