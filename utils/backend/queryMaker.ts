// 해당 테이블은 전체 데이터를 가져오는 쿼리를 만드는 함수입니다.
// 예시 : SelectQueryMaker('user') => 'SELECT * FROM user'
const SelectQueryMaker = (table) => {
  const result = `SELECT * FROM ${table}`;
  return result;
};

export default SelectQueryMaker;
