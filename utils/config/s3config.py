import os
from dotenv import load_dotenv
from boto3 import client

# s3config.py
load_dotenv(dotenv_path="../../.env")

s3_client = client(
  "s3",
  region_name=os.getenv("AWS_REGION"),
  aws_access_key_id=os.getenv("AWS_ACCESS_KEY_ID"),
  aws_secret_access_key=os.getenv("AWS_SECRET_ACCESS_KEY")
)

