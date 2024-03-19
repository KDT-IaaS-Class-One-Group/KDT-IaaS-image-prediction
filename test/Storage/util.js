// test/Storage/util.js

/**
 * @function ObjectsInBucketCRUD - 버킷 내 객체의 생성, 조회, 삭제를 수행하는 유틸 함수
 * @param {string} operation - create, read, delete
 * @param {string} fileName - 파일명
 */
function ObjectsInBucketCRUD(operation, fileName) {
  if (operation === "create") {
    console.log(`${operation} 실행 -> ${fileName}`)

    const AWS = require('aws-sdk');
    const dotenv = require('dotenv');
    dotenv.config({path: "../../.env"});
    const s3 = new AWS.S3(
      {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      }
    );
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: "something"
    };

    s3.putObject(params, (err, data) => {
      if (err) {
        console.log("객체 생성 중 오류 발생:", err);
      } else {
        console.log("객체가 성공적으로 생성되었습니다.", data);
      }
    });
    
  }
  else if (operation === "read") {
    console.log(`${operation} 실행 -> ${fileName}`)

  }
  else if (operation === "delete") {
    console.log(`${operation} 실행 -> ${fileName}`)

  }
  else {
    console.log("잘못된 작동 모드입니다. JSDoc의 설명에 맞게 다시 시도해보세요.");
  }
}

ObjectsInBucketCRUD("create", "test.txt");