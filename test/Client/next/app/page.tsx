"use client";
import React, { useState } from "react";
import ImageUploadForm from "@/app/component/ImageUploadForm";

export default function MainPage() {
  const handleButtonClick = async () => {
    try {
      const response = await fetch("http://localhost:8000/test", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ key: "value" }),
      });
      // Handle the response here
      console.log("Response : ", response);
    } catch (error) {
      // Handle any errors here
      console.log("Error fetching data : ", error);
    }
  };

  return (
    <main>
      <ImageUploadForm />
      <button onClick={handleButtonClick}>Send Fetch</button>
    </main>
  );
}
