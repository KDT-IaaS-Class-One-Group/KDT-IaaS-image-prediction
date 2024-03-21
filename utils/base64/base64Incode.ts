/**
 * ! FileReader 라이브러리 필수 
 * 파일을 Data URL로 변환하여 반환하는 유틸 함수 (인코딩 함수) 
 * 
 * 사용 방법:반환값을 post 바디에 담아 보내면 된다.
 * @param {File} file 변환할 파일 객체
 * @returns {Promise<string>} Data URL 형식의 문자열을 반환하는 Promise 객체
 * 
 * @example
 * // 사용 예시
const handleFileChange = async (event) => {
  const file = event.target.files[0];
  try {
    const imageData = await fileToDataURL(file);
    console.log(imageData); // Data URL 형식의 이미지 데이터 출력
    setImageData(imageData); // 이미지 데이터 상태 업데이트
  } catch (error) {
    console.error('이미지를 Data URL로 변환하는 중 오류가 발생했습니다:', error);
  }
};
 */
const base64Incode = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onloadend = () => {
      const base64String = reader.result;
      resolve(base64String);
    };

    reader.onerror = (error) => {
      reject(error);
    };

    reader.readAsDataURL(file);
  });
};
