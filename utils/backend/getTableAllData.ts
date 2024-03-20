// import dbQuery from "../../dbQuery";
// import { Request, Response } from "express";

/**
 * 해당 테이블의 모든 데이터를 가져오는 함수
 *
 * @param req
 * @param res
 * @param table {string} 테이블 이름
 * @returns {Promise<Response>} 응답
 *
 */

async function getTableAllData(req: Request, res: Response, table: string) {
  const queryString = `SELECT * FROM ${table}`;
  try {
    const data = await dbQuery(queryString);
    const result = res.status(200).json(data);
    return result;
  } catch (error) {
    console.error("Database query error", error);
    const errorResult = res
      .status(500)
      .json({ message: "Error retrieving posts from the database" });
    return errorResult;
  }
}

export default getTableAllData;
