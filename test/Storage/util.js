// test/Storage/util.js

/**
 * @function ObjectsInBucketCRUD - 버킷 내 객체의 생성, 조회, 삭제를 수행하는 유틸 함수
 * @param {string} operation - create, read, delete
 * @param {string} fileName - 파일명
 */
function ObjectsInBucketCRUD(operation, fileName) {
  if (operation === "create") {
    console.log(`${operation} 실행 -> ${fileName}`)
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

ObjectsInBucketCRUD("create", "test.txt"); // create 실행 -> test.txt
ObjectsInBucketCRUD("read", "test.txt"); // read 실행 -> test.txt
ObjectsInBucketCRUD("delete", "test.txt"); // delete 실행 -> test.txt
ObjectsInBucketCRUD("update", "test.txt"); // 잘못된 작동 모드입니다. JSDoc의 설명에 맞게 다시 시도해보세요.