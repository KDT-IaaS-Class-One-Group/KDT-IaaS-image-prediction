require('dotenv').config({ path: '../../.env' });
const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../../Config/s3Config');
const appendDateToFileName = require('./appendDateToFileName');
const fs = require('fs');
const bucketName = process.env.S3_BUCKET_NAME;
console.log(bucketName);

async function uploadFileToS3(filePath, fileName, contentType) {
  const datedFileName = appendDateToFileName(fileName); // 파일명에 날짜 추가
  const fileStream = fs.createReadStream(filePath);
  const uploadParams = {
    Bucket: bucketName,
    Key: `upload/${datedFileName}`,
    Body: fileStream,
    ContentType: contentType,
  };
  try {
    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);
    console.log('S3에 파일이 업로드 되었습니다:', response);
    return `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/upload/${datedFileName}`;
  } catch (error) {
    console.error('S3업로드에 실패 하였습니다:', error);
    throw error;
  }
}

module.exports = { uploadFileToS3 };
