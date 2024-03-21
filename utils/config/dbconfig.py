import os
from dotenv import load_dotenv

# 선택1
# dbConfig = {
#   "host": os.environ.get("DB_HOST", ""),
#   "user": os.environ.get("DB_USER", ""),
#   "password": os.environ.get("DB_PASSWORD", ""),
#   "database": os.environ.get("DB_NAME", ""),
# }


# 선택2 .env
# .env 파일 로드
load_dotenv()

# 환경 변수 가져오기
db_host = os.getenv("DB_HOST")
db_user = os.getenv("DB_USER")
db_password = os.getenv("DB_PASSWORD")
db_name = os.getenv("DB_NAME")

# dbConfig 딕셔너리 생성
dbConfig = {
  "host": db_host,
  "user": db_user,
  "password": db_password,
  "database": db_name
}
