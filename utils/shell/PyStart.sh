#!/bin/bash

# 현재 스크립트가 실행되는 디렉토리를 저장
CURRENT_DIR="$(cd "$(dirname "$0")" && pwd)"

# 현재 디렉토리를 콘솔에 출력
echo "현재 디렉토리: $CURRENT_DIR"

# 가상환경이 존재하는지 확인
if [ -d "$CURRENT_DIR/.venv" ]; then
    echo "이미 생성된 가상환경이 있습니다."
    # 가상환경 실행 안내
    echo "source .venv/Scripts/activate를 입력해 가상환경을 실행하세요."
else
    # 가상환경이 존재하지 않는다면, 가상환경을 생성
    python -m venv "$CURRENT_DIR/.venv"
    echo "새로운 .venv/ 가상환경을 생성했습니다."
fi
