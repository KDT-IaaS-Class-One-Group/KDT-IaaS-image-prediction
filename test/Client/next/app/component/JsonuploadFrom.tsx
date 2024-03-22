// test\Client\next\app\component\JsonuploadFrom.tsx
"use client";
import React, { useState } from "react";

//! json 데이터를 입력받아 서버로 전송하는 컴포넌트
const JsonUploadForm: React.FC = () => {
  const [jsonData, setJsonData] = useState("");

  // json 데이터를 입력받아 state에 저장
  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // json 데이터를 입력받아 state에 저장
    const jsonText = e.target.value;
    try {
      // json 데이터가 유효한지 확인
      setJsonData(jsonText);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      // json 데이터가 유효하지 않으면 state를 초기화
      setJsonData("");
    }
  };

  // json 데이터를 서버로 전송
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 기본 이벤트를 막음
    e.preventDefault();
    if (!jsonData) {
      console.error("No JSON data to upload");
      return;
    }
    // 서버로 json 데이터를 전송
    try {
      const response = await fetch("http://localhost:8000/uploadjson", {
        // 서버로 전송할 데이터
        method: "POST",
        // json 데이터를 전송하기 위한 헤더
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ "json": jsonData }),
      });
      if (response.ok) {
        console.log("Upload successful");
      } else {
        console.error("Upload failed:", response.statusText);
      }
    } catch (error) {
      console.error("Error uploading JSON:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <textarea onChange={handleJsonChange}></textarea>
      <button type="submit">Upload JSON</button>
    </form>
  );
};

export default JsonUploadForm;
