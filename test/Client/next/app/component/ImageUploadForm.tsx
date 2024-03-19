"use client";
import React, { useState } from "react";

const ImageUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    console.log("formData - ", formData);
    console.log("formData.image - ", formData.get("image"));

    const response = await fetch("http://localhost:8000/check", {
      method: "POST",
      body: formData,
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
