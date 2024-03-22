from fastapi import FastAPI, File, UploadFile
from utils.s3.uploadFileToS3 import upload_file_to_s3

app = FastAPI()

@app.post("/api/upload")
async def upload_image(file: UploadFile = File(...)):
    file_location = f"uploads/{file.filename}"
    with open(file_location, "wb+") as file_object:
        file_object.write(file.file.read())
    upload_file_to_s3(file_location, file.filename, file.content_type)
    return {"detail": "Image uploaded"}