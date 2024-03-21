// fetchJSON

/**
 * 엔드포인트에서 JSON 데이터를 가져옵니다.
 *
 * @param endPoint {string}
 * @returns {Promise<any>} JSON 데이터입니다.
 * @example
 * // "https://api.example.com/data" 엔드포인트에서 JSON 데이터를 가져옵니다.
 * const jsonData = await fetchJSON("https://api.example.com/data");
 */
async function fetchJSON(endPoint: string) {
  const res = await fetch(endPoint);
  if (!res.ok) {
    console.error('Error fetching data : ', Error);
  }
  const data = await res.json();
  return data;
}

export default fetchJSON;