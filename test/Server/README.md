# 스켈레톤 만들기

- APP SERVER : app router 방식

- REST API SERVER : fast api 어떻게 쓸까? (flask, express와 다르지 않음)

  - 왜 하필 이거일까?
    - Django : mvt방식이라 템플릿 찍어냄
    - flask : 마이크로, 비동기 x
  - 어떻게 돌아갈지 확인

- DB : mariaDB

  - CRUD 테스팅
  - 매개변수 까지만 만들면 된다.

- stroage
  - 스토리지 서버는 왜 필요할까?
  - 파일을 분류하고 저장하는 인덱싱에 필요하다.

# 관련 명령어 정리

```
python -m venv fastapitest // 생성
.\fastapitest\Scripts\activate // 입장
pip install -r requirements.txt //
pip install fastapi uvicorn[standard] // fast api, uvicorn(비동기) 설치
pip install mysql-connector-python // mariadb 연결 드라이버
pip install boto3 // aws sdk for python
pip install httpx // httpx - FastAPI 의존성, http 클라이언트 라이브러리

(main.py 생성)

uvicorn main:app --reload // 애플리케이션 시작
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
uvicorn db:app --host 0.0.0.0 --port 8001 --reload
```
