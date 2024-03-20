// test/Storage/s3.js

const express = require("express");
const app = express();
const dotenv = require("dotenv");
const AWS = require("aws-sdk");
const bodyParser = require("body-parser");
const cors = require("cors");
const multer = require("multer");

// 환경변수 로드
dotenv.config({ path: "../../.env" });

// AWS S3 설정
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

// multer 설정
const upload = multer();

// 미들웨어 설정
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// 이미지 업로드 라우트
app.post("/upload", upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "이미지가 제공되지 않았습니다." });
  }

  const imageData = req.file.buffer; // multer로 파싱된 이미지 데이터

  // S3에 업로드할 파일 설정
  const params = {
    Bucket: process.env.S3_BUCKET_NAME,
    Key: "unique_filename.jpg", // 파일 이름은 고유해야!
    Body: imageData,
    ContentType: "image/jpeg", // 이미지 타입에 따라 변경
  };

  // S3에 파일 업로드
  s3.upload(params, (err, data) => {
    if (err) {
      console.error("S3 업로드 중 오류:", err);
      return res.status(500).json({ error: "이미지를 업로드하는 동안 오류가 발생했습니다." });
    }
    // 성공적으로 업로드된 경우 클라이언트에게 응답
    res.json({ imageUrl: data.Location });
  });
});

// 서버를 5555번 포트로 실행
const PORT = 5555;
app.listen(PORT, () => {
  console.log(`서버 ON: http://localhost:${PORT}`);
});
