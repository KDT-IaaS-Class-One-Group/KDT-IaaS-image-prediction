// test\Client\next\app\component\ImgeUploadFrom.tsx
"use client";
import React, { useState } from "react";

//! 이미지를 업로드하는 컴포넌트
const ImageUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // 이미지 파일을 선택하면 미리보기를 표시
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const file = target.files?.[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // 이미지 파일을 서버로 업로드
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) {
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    const response = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });
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
}

export default ImageUploadForm;