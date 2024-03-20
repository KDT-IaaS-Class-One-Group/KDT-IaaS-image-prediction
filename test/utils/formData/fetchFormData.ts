/**
 * FormData를 사용하여 서버로 파일 또는 데이터를 POST 방식으로 전송합니다.
 *
 * @param {string} url - 서버의 엔드포인트 URL
 * @param {FormData} formData - 서버로 전송할 FormData 객체
 * @returns {Promise<any>} 서버로부터의 응답 JSON 객체
 */
async function fetchFormData(url: string, formData: FormData): Promise<any> {
  console.log(`fetchFormData: ${url}로 요청을 보냅니다.`);
  try {
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`서버가 ${response.status} 오류를 반환했습니다: ${response.statusText}`);
    }
    const data = await response.json();
    console.log('fetchFormData: 서버로부터의 응답:', data);
    return data;
  } catch (error) {
    console.error('fetchFormData에서 오류 발생:', error);
    throw error;
  }
}

export default fetchFormData;
