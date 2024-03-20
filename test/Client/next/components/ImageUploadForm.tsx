// Client/next/components/ImageUploadForm.tsx

import React, { useState } from 'react';

function ImageUploadForm() {
  // 이미지 상태를 관리하는 useState 훅
  const [image, setImage] = useState<File | null>(null);

  // 이미지 선택 핸들러
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 사용자가 이미지를 선택하면 실행
    if (event.target.files && event.target.files.length > 0) {
      // 선택된 이미지를 상태에 저장
      setImage(event.target.files[0]);
    }
  };

  // 이미지 업로드 핸들러
  const handleUploadImage = async () => {
    // 이미지가 선택되지 않으면 경고
    if (!image) {
      alert('이미지를 선택하세요.');
      return;
    }

    // FormData 객체 생성
    const formData = new FormData();
    formData.append('image', image);

    try {
      // 이미지 업로드 요청
      const response = await fetch('http://localhost:5555/upload', {
        method: 'POST',
        body: formData,
      });
      
      // JSON 형식으로 응답 받기
      const data = await response.json();

      // 업로드된 이미지 URL 출력
      console.log('업로드된 이미지 URL:', data.imageUrl);
    } catch (error) {
      // 오류 발생 시 콘솔에 오류 메시지 출력
      console.error('이미지 업로드 중 오류:', error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleImageChange} />
      <button onClick={handleUploadImage}>이미지 업로드</button>
    </div>
  );
}

export default ImageUploadForm;
