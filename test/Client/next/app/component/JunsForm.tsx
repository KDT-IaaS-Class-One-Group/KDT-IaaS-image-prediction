// test\Client\next\app\component\JunsForm.tsx
"use client";
import React, { useState } from "react";

//! 이미지를 업로드하는 컴포넌트
const ImageUploadForm: React.FC = () => {
  //  파일 상태를 저장하는 file 상태
  const [file, setFile] = useState<File | null>(null);

  //  이미지 파일을 서버로 업로드
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    //  기본 이벤트를 막음
    e.preventDefault();
    //  파일이 없으면 종료
    if (!file) return;
    //  FormData 객체를 생성하고 이미지 파일을 추가
    const formData = new FormData();
    //  이미지 파일을 "image"라는 이름으로 추가
    formData.append("image", file);
    //  서버로 POST 요청을 보냄
    console.log("formData - ", formData);
    //  이미지 파일과 메타데이터를 포함
    console.log("formData.image - ", formData.get("image"));
    //  'Content-Type': 'multipart/form-data' 헤더는 자동으로 설정됨
    const response = await fetch("http://localhost:8000/check", {
      method: "POST",
      body: formData, // 이미지 파일과 메타데이터를 포함
      // 'Content-Type': 'multipart/form-data' 헤더는 자동으로 설정됩니다.
    });

    if (response.ok) {
      console.log("Image uploaded successfully");
      // 성공적으로 업로드 후 처리...
    } else {
      console.error("Upload failed");
      // 업로드 실패 처리...
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full h-1/2 flex flex-col space-y-10"
    >
      <label htmlFor="image">Upload an image</label>
      <input
        id="image"
        type="file"
        accept="image/*"
        onChange={(e) => setFile(e.target.files ? e.target.files[0] : null)}
      />
      <button type="submit">Upload Image</button>
    </form>
  );
};

export default ImageUploadForm;