// test\Client\next\app\component\JsonuploadFrom.tsx
"use client";
import React, { useState } from "react";

const JsonUploadForm: React.FC = () => {
  const [jsonData, setJsonData] = useState("");

  const handleJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const jsonText = e.target.value;
    try {
      setJsonData(jsonText);
    } catch (error) {
      console.error("Error parsing JSON:", error);
      setJsonData("");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!jsonData) {
      console.error("No JSON data to upload");
      return;
    }
    
    try {
      const response = await fetch("http://localhost:8000/uploadjson", {
        method: "POST",
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
