# Model/main.py

import json

# 예측 결과를 받아온다고 가정한 데이터
prediction_data = {'class': 'cat', 'probability': 0.98}

# JSON 형식으로 변환
json_data = json.dumps(prediction_data)

print(json_data) # 데이터 확인: {"class": "cat", "probability": 0.98}
