'use client';

import React from 'react';
import fetchFormData from '../../../../utils/formData/fetchFormData';

const UploadPage: React.FC = () => {
  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (event) => {
    event.preventDefault();
    const fileField = document.querySelector('input[type="file"]');

    if (!fileField || !(fileField instanceof HTMLInputElement) || !fileField.files) {
      console.error('파일 입력 필드를 찾을 수 없거나, 파일이 선택되지 않았습니다.');
      return;
    }

    const formData = new FormData();
    formData.append('file', fileField.files[0]);

    try {
      const data = await fetchFormData('http://localhost:5555/api/upload', formData);
      console.log('파일이 성공적으로 업로드되었습니다:', data);
      fileField.value = '';
      // 업로드 성공 메시지 팝업
      alert('파일이 성공적으로 업로드되었습니다.');
    } catch (error) {
      if (error instanceof TypeError && error.message === 'Failed to fetch') {
        console.error('네트워크 오류가 발생했습니다. 서버 연결을 확인하세요.');
      } else {
        console.error('파일 업로드 중 오류가 발생했습니다:', error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="file" id="file" name="file" />
      <button type="submit">업로드</button>
    </form>
  );
};

export default UploadPage;
