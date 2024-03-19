/**
 * FormData를 사용하여 서버로 파일 또는 데이터를 POST 방식으로 전송합니다.
 *
 * @param {string} url - 서버의 엔드포인트 URL
 * @param {FormData} formData - 서버로 전송할 FormData 객체
 * @returns {Promise<any>} 서버로부터의 응답 JSON 객체
 */
async function fetchFormData(url, formData) {
  try {
    const response = await fetch(url, {
      method: 'POST',
      // 'Content-Type': 'multipart/form-data' 헤더는 자동으로 설정됩니다.
      body: formData,
    });
    if (!response.ok) {
      throw new Error(`서버가 ${response.status} 오류를 반환했습니다: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error('fetchFormData에서 오류 발생:', error);
    throw new Error('데이터 전송 중 오류가 발생했습니다.'); // 에러를 다시 throw하여 호출자가 처리할 수 있게 합니다.
  }
}

export default fetchFormData;
