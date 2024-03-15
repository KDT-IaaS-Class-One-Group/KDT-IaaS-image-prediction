# Model/app.py

from flask import Flask, jsonify
from main import json_data

app = Flask(__name__)

@app.route('/')
def get_prediction():
    # main.py에서 생성된 JSON 데이터를 클라이언트에 반환
    return jsonify(json_data)

if __name__ == '__main__':
    app.run(debug=True)
