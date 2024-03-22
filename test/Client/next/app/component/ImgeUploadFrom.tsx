// test\Client\next\app\component\ImgeUploadFrom.tsx
"use client";
import React, { useState } from "react";

//! 이미지를 업로드하는 컴포넌트
const ImageUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // 이미지 파일을 선택하면 미리보기를 표시
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    //  선택한 파일을 가져옴
    const target = e.target as HTMLInputElement;
    //  선택한 파일이 없으면 종료
    const file = target.files?.[0];
    //  파일이 있으면 미리보기를 표시
    if (file) {
      //  파일을 상태에 저장
      setFile(file);
      //  FileReader 객체를 사용해 이미지 파일을 미리보기로 변환
      const reader = new FileReader();
      //  파일을 읽으면 발생하는 이벤트 핸들러
      reader.onload = () => {
        //  미리보기 이미지 주소를 상태에 저장
        setPreview(reader.result as string);
      };
      //  파일을 읽음
      reader.readAsDataURL(file);
    }
  };

  // 이미지 파일을 서버로 업로드
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //  기본 이벤트를 막음
    e.preventDefault();
    if (!file) {
      return;
    }
    // FormData 객체를 생성하고 이미지 파일을 추가
    const formData = new FormData();
    // 이미지 파일을 "image"라는 이름으로 추가
    formData.append("image", file);
    console.log("formData - ", formData);
    // 서버로 POST 요청을 보냄
    const response = await fetch("http://localhost:8000/check", {
      // 이미지 파일과 메타데이터를 포함
      method: "POST",
      //  'Content-Type': 'multipart/form-data' 헤더는 자동으로 설정됨
      body: formData,
    });
    //  응답이 성공적이면 성공 메시지를 표시
    if (response.ok) {
      alert("업로드 성공");
    } else {
      alert("업로드 실패");
    }
  };


  return (
    <form onSubmit={handleSubmit}>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && <img src={preview} alt="preview" style={{ width: 300 }} />}
      <button type="submit">업로드</button>
    </form>
  );
};

export default ImageUploadForm;
