/**
 * postFetchJSON 함수는 주어진 엔드포인트로 POST 요청을 보내고 JSON 형식의 응답을 처리합니다.
 * @param {string} endPoint - 요청을 보낼 엔드포인트 URL입니다.
 * @param {string | object} bodyContent - 요청의 본문 내용입니다. 문자열 또는 객체 형식으로 전달될 수 있습니다.
 * @returns {Promise<void>} - 요청이 성공적으로 완료되면 아무 값도 반환하지 않습니다.
 *
 * @example
 * const endPoint = "https://api.example.com/upload";
 * const bodyContent = { image: "image data" };
 * await postFetchJSON(endPoint, bodyContent);
 */
const postFetchJSON = async (
  endPoint: string,
  bodyContent: string | object
) => {
  const response = await fetch(endPoint, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ bodyContent }),
  });

  if (response.ok) {
    console.log("이미지가 성공적으로 업로드되었습니다.");
  } else {
    console.error("이미지 업로드 중 오류가 발생했습니다.");
  }
};

export default postFetchJSON;
