import os
from dotenv import load_dotenv

load_dotenv("../../.env")

db_config = {
    "host": os.getenv("db_config.host"),
    "port": os.getenv("db_config.port"),
    "user": os.getenv("db_config.user"),
    "password": os.getenv("db_config.password"),
    "database": os.getenv("db_config.database")
}