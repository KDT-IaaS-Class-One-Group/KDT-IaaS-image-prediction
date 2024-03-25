import os
from datetime import datetime

def nowTime():
    time = datetime.now().strftime('%Y-%m-%d-%H-%M-%S')
    return time

def generateYoonValues(name, index):
    for i in range(1, index):
        #현재시간
        now = nowTime()
        directory_name = f'{now}'+' '+f'{name}-{i}'
        
        #파일 생성
        os.makedirs(directory_name)
        directory_path = f'{directory_name}'
        
        # print(directory_path)  
        if os.path.exists(directory_path):
            print("디렉토리가 존재합니다.")
            file_name = f'{directory_name}/{name}-{i}.txt'
            with open(file_name, 'w') as file:
                file.write('This is a sample text.')
        else:
            print("디렉토리가 존재하지 않습니다.")
            continue

generateYoonValues('yoon',3)