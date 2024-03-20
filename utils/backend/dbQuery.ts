// import mysql from "mysql";
// import dotenv from "dotenv";
// dotenv.config({ debug: true, path: ".env.local" });

// * db 연결 풀 생성
// const pool = mysql.createPool({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME,
// });

// * console.log 확인
// console.log("process.env.DB_HOST", process.env.DB_HOST);
// console.log("process.env.DB_USER", process.env.DB_USER);
// console.log("process.env.DB_PASS", process.env.DB_PASS);
// console.log("process.env.DB_NAME", process.env.DB_NAME);

// 데이터베이스 연결 풀을 사용하여 쿼리를 실행하는 함수
/**
 * 데이터베이스 연결 풀을 사용하여 쿼리를 실행하는 함수
 * @param query {string} 쿼리
 * @param ?values {any[]} 쿼리에 바인딩할 값
 * @returns {Promise<any>}
 */
const dbQuery = (query: string, values?: any[]) => {
  return new Promise((resolve, reject) => {
    pool.query(query, values, (error, results) => {
      if (error) reject(error);
      else resolve(results);
    });
  });
};

export default dbQuery;
