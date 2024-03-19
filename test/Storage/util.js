// test/Storage/util.js

function ObjectsInBucketCRUD(operation, fileName) {
  if (operation === "create") {
    console.log(`선택한 내용을 아래에서 확인하세요. \n작동 모드: ${operation} / 파일명: ${fileName}`);
  }
}

ObjectsInBucketCRUD("create", "test.txt");
