// test/Storage/util.js

/**
 * @function ObjectsInBucketCRUD - 버킷 내 객체의 생성, 조회, 삭제를 수행하는 유틸 함수
 * @param {string} operation - create, read, update, delete
 * @param {string} fileName - 파일명
 * @throws {Error} operation이 잘못된 경우 에러를 throw
 */
function ObjectsInBucketCRUD(operation, fileName) {
  const allowedOperations = ["create", "read", "update", "delete"];
  
  if (allowedOperations.includes(operation) == false) {
    throw new Error("잘못된 작동 모드입니다. JSDoc의 설명에 맞게 다시 시도해보세요.");
  }  else if (operation === "create") {
    console.log(`${operation} 실행 -> ${fileName}`)

    const AWS = require('aws-sdk');
    const dotenv = require('dotenv');
    dotenv.config({path: "../../../.env"});
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
      Body: "something" // fixme: 작성자 ID 등을 기입하도록 수정?
    };

    s3.putObject(params, (err, data) => {
      if (err) {
        console.log("객체 생성 중 오류 발생:", err);
      } else {
        console.log("객체가 성공적으로 생성되었습니다.", data);
      }
    });
  } else if (operation === "read") {
    console.log(`${operation} 실행 -> ${fileName}`)

    const AWS = require('aws-sdk');
    const dotenv = require('dotenv');
    dotenv.config({path: "../../../.env"});
    const s3 = new AWS.S3(
      {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      }
    );
    const params = {
      Bucket: process.env.S3_BUCKET_NAME,
      Key: fileName
    };

    s3.getObject(params, (err, data) => {
      if (err) {
        console.log("객체 조회 중 오류 발생:", err);
      } else {
        console.log("객체 조회 결과:", data);
      }
    });

  } else if (operation === "update") {
    console.log(`${operation} 실행 -> ${fileName}`)

    const AWS = require('aws-sdk');
    const dotenv = require('dotenv');
    dotenv.config({path: "../../../.env"});
    const s3 = new AWS.S3(
      {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION
      }
    );
      // 객체 목록 조회를 위한 파라미터
      const listParams = {
      Bucket: process.env.S3_BUCKET_NAME,
      Prefix: fileName
    };

    // 객체가 존재하는지 확인
    s3.listObjects(listParams, (err, data) => {
      if (err) {
        console.log("객체 목록 조회 중 오류 발생:", err);
      } else {
        // 존재하면 업데이트를 진행
        if (data.Contents.length > 0) {
          console.log("객체가 존재합니다. 업데이트를 진행합니다.");

          // 객체 업데이트를 위한 파라미터
          const updateParams = {
            Bucket: process.env.S3_BUCKET_NAME,
            Key: fileName,
            Body: "updated data" // 새로운 데이터로 업데이트
          };

          // 객체 업데이트
          s3.putObject(updateParams, (err, data) => {
            if (err) {
              console.log("객체 업데이트 중 오류 발생:", err);
            } else {
              console.log("객체가 성공적으로 업데이트되었습니다.", data);
            }
          });
        } else {
          console.log("객체가 존재하지 않습니다.");
        }
      }
    });

  } else if (operation === "delete") {    
    console.log(`${operation} 실행 -> ${fileName}`)

  const AWS = require('aws-sdk');
  const dotenv = require('dotenv');
  dotenv.config({path: "../../../.env"});
  const s3 = new AWS.S3(
    {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION
    }
  );
    // 객체 목록 조회를 위한 파라미터
    const listParams = {
    Bucket: process.env.S3_BUCKET_NAME,
    Prefix: fileName
  };

  // 객체가 존재하는지 확인
  s3.listObjects(listParams, (err, data) => {
    if (err) {
      console.log("객체 목록 조회 중 오류 발생:", err);
    } else {
      // 존재하면 업데이트를 진행
      if (data.Contents.length > 0) {
        console.log("객체가 존재합니다. 객체 삭제를 진행합니다.");

        // 객체 삭제를 위한 파라미터
        const deleteParams = {
          Bucket: process.env.S3_BUCKET_NAME,
          Key: fileName,
        };

        // 객체 업데이트
        s3.deleteObject(deleteParams, (err, data) => {
          if (err) {
            console.log("객체 삭제 중 오류 발생:", err);
          } else {
            console.log("객체가 성공적으로 삭제되었습니다.", data);
          }
        });
      } else {
        console.log("객체가 존재하지 않습니다.");
      }
    }
  });

  }
}