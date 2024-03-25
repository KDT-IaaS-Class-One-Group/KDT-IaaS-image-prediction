const AWS = require("aws-sdk");
const dotenv = require("dotenv");

/**
 * @function ObjectsInBucketCRUD - 버킷 내 객체를 생성, 읽기, 업데이트, 삭제하기 위한 유틸리티 함수
 * @param {string} operation - create, read, update, delete
 * @param {string} fileName - 파일 이름
 * @throws {Error} 작업이 유효하지 않은 경우 오류를 throw합니다.
 */
function ObjectsInBucketCRUD(operation, fileName) {
  const allowedOperations = ["create", "read", "update", "delete"];

  if (!allowedOperations.includes(operation)) {
    throw new Error(
      "유효하지 않은 작업입니다. JSDoc에 설명된 대로 다시 시도해주세요."
    );
  }

  // AWS SDK와 dotenv 로드
  dotenv.config({ path: "../../../.env" });

  // S3 인스턴스 생성
  const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
  });

  if (operation === "create") {
    console.log(`${operation} 실행 -> ${fileName}`);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
      Body: "something", // TODO: 작성자 ID 또는 다른 관련 데이터를 포함하도록 수정
    };

    s3.putObject(params, (err, data) => {
      if (err) {
        console.log("객체 생성 중 오류 발생:", err);
      } else {
        console.log("객체가 성공적으로 생성되었습니다:", data);
      }
    });
  } else if (operation === "read") {
    console.log(`${operation} 실행 -> ${fileName}`);

    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName,
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        console.log("객체 읽기 중 오류 발생:", err);
      } else {
        console.log("객체가 성공적으로 읽혔습니다:", data);
      }
    });
  } else if (operation === "update") {
    console.log(`${operation} 실행 -> ${fileName}`);

    // 객체 목록을 위한 매개변수
    const listParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: fileName,
    };

    // 객체가 존재하는지 확인
    s3.listObjects(listParams, (err, data) => {
      if (err) {
        console.log("객체 목록 조회 중 오류 발생:", err);
      } else {
        if (data.Contents.length > 0) {
          console.log("객체가 존재합니다. 객체를 업데이트합니다.");

          // 객체 업데이트를 위한 매개변수
          const updateParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: "updated data", // 새로운 데이터로 업데이트
          };

          // 객체 업데이트
          s3.putObject(updateParams, (err, data) => {
            if (err) {
              console.log("객체 업데이트 중 오류 발생:", err);
            } else {
              console.log("객체가 성공적으로 업데이트되었습니다:", data);
            }
          });
        } else {
          console.log("객체가 존재하지 않습니다.");
        }
      }
    });
  } else if (operation === "delete") {
    console.log(`${operation} 실행 -> ${fileName}`);

    // 객체 목록을 위한 매개변수
    const listParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: fileName,
    };

    // 객체가 존재하는지 확인
    s3.listObjects(listParams, (err, data) => {
      if (err) {
        console.log("객체 목록 조회 중 오류 발생:", err);
      } else {
        if (data.Contents.length > 0) {
          console.log("객체가 존재합니다. 객체를 삭제합니다.");

          // 객체 삭제를 위한 매개변수
          const deleteParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
          };

          // 객체 삭제
          s3.deleteObject(deleteParams, (err, data) => {
            if (err) {
              console.log("객체 삭제 중 오류 발생:", err);
            } else {
              console.log("객체가 성공적으로 삭제되었습니다:", data);
            }
          });
        } else {
          console.log("객체가 존재하지 않습니다.");
        }
      }
    });
  }
}

module.exports = ObjectsInBucketCRUD;
