// test/Storage/s3.js

const express = require('express');
const app = express();
const dotenv = require('dotenv');
const AWS = require('aws-sdk');

// 환경변수 로드
dotenv.config({path: "../../.env"});

// AWS S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION
});

// S3 버킷 리스트 조회 함수
function listObjectsInBucket(bucketName) {
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: bucketName
    };

    s3.listObjects(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data.Contents);
      }
    });
  });
}

// GET 엔드포인트 생성
app.get('/bhn-s3', async (req, res) => {
  try {
    const bucketName = process.env.S3_BUCKET_NAME;
    const objects = await listObjectsInBucket(bucketName);
    res.json(objects);
  } catch (error) {
    console.error("Error listing objects in S3 bucket:", error);
    res.status(500).json({ error: "Failed to list objects in S3 bucket" });
  }
});

// 서버를 5555번 포트로 실행
const PORT = 5555;
app.listen(PORT, () => {
  console.log(`서버 ON: http://localhost:${PORT}`);
});
