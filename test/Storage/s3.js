// test/Storage/s3.js

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send("Express 서빙 테스트 완료");
})

// 서버를 5555번 포트로 실행
const PORT = 5555;
app.listen(PORT, () => {
  console.log(`서버 ON: http://localhost:${PORT}`);
});
