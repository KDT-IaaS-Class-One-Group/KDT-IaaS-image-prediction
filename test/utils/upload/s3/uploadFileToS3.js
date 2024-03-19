const { PutObjectCommand } = require('@aws-sdk/client-s3');
const s3Client = require('../../Config/s3Config');
const appendDateToFileName = require('./appendDateToFileName');
const fs = require('fs');

async function uploadFileToS3(filePath, fileName, contentType) {
  const datedFileName = appendDateToFileName(fileName); // 파일명에 날짜 추가
  const fileStream = fs.createReadStream(filePath);
  const uploadParams = {
    Bucket: process.env.S3_BUCKET,
    Key: `upload/${datedFileName}`,
    Body: fileStream,
    ContentType: contentType,
  };
  try {
    const command = new PutObjectCommand(uploadParams);
    const response = await s3Client.send(command);
    console.log('Successfully uploaded file to S3:', response);
    return `https://${process.env.S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/upload/${datedFileName}`;
  } catch (error) {
    console.error('Error uploading file to S3:', error);
    throw error;
  }
}

module.exports = uploadFileToS3;
