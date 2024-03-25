import os
import boto3
from botocore.exceptions import ClientError
from datetime import datetime
from .appendDateToFileName import append_time_to_file_name

s3 = boto3.client('s3')
bucket_name = os.environ['S3_BUCKET']

def upload_file_to_s3(file_path, file_name, content_type):
    dated_file_name = append_time_to_file_name(file_name)
    with open(file_path, 'rb') as file:
        try:
            s3.upload_fileobj(file, bucket_name, f'upload/{dated_file_name}', ExtraArgs={'ContentType': content_type})
            print("파일이 S3에 업로드되었습니다:", dated_file_name)
            return f"https://{bucket_name}.s3.{os.environ['AWS_REGION']}.amazonaws.com/upload/{dated_file_name}"
        except ClientError as e:
            print("S3 업로드 실패:", e)
            raise e
