// uploadFileToS3.js
const fs = require("fs");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const s3Client = require("../../Config/s3Config");
const appendDateToFileName = require("./appendDateToFileName");
const bucketName = process.env.S3_BUCKET;

async function uploadFileToS3(filePath, fileName, contentType) {
  const datedFileName = appendDateToFileName(fileName); // 파일명에 날짜 추가
  // fs.createReadStream() 함수를 사용하여 filePath에서 파일 스트림을 생성합니다.
  const fileStream = fs.createReadStream(filePath);
  const uploadParams = {
    Bucket: bucketName,
    Key: `upload/${datedFileName}`,
    Body: fileStream,
    ContentType: contentType,
  };

  try {
    /**
     * AWS SDK의 PutObjectCommand 객체입니다.
     * S3 버킷에 파일을 업로드하는 역할을 합니다.
     *
     * @type {PutObjectCommand}
     */
    const command = new PutObjectCommand(uploadParams);
    await s3Client.send(command);
    console.log("S3에 파일이 업로드 되었습니다:", datedFileName);

    // 업로드된 파일의 경로를 반환
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/upload/${datedFileName}`;
  } catch (error) {
    console.error("S3업로드에 실패 하였습니다:", error);
    throw error;
  }
}

module.exports = { uploadFileToS3 };
