from datetime import datetime

# 날짜를 파일명에 추가하는 함수
def append_date_to_file_name(file_name, upload_date=None):
    if upload_date is None:
        upload_date = datetime.now()
        
    formatted_date = upload_date.strftime('%Y%m%d')
    new_file_name = f"{formatted_date}_{file_name}"
    return new_file_name

print(append_date_to_file_name('test.txt'))


# 날짜+시간을 파일명에 추가하는 함수
def append_time_to_file_name(file_name):
    now = datetime.now()
    timestamp = now.strftime("%Y%m%d%H%M%S")
    file_name_parts = file_name.split('.')
    file_name_parts[0] = timestamp+'_'+ file_name_parts[0] 
    return '.'.join(file_name_parts)

# print(append_time_to_file_name1('test.txt'))