// test/Storage/util.js

/**
 * @function ObjectsInBucketCRUD - 버킷 내 객체의 생성, 조회, 삭제를 수행하는 유틸 함수
 * @param {string} operation - create, read, delete
 * @param {string} fileName - 파일명
 */
function ObjectsInBucketCRUD(operation, fileName) {
  if (operation === "create") {
    console.log(`선택한 내용을 아래에서 확인하세요. \n작동 모드: ${operation} / 파일명: ${fileName}`);
  }
}

ObjectsInBucketCRUD("create", "test.txt");
