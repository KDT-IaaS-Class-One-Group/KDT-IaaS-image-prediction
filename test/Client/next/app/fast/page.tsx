// Client/next/app/fast/page.tsx
"use client";
import React, { useEffect } from "react";

const FastPage = () => {
  useEffect(() => {
    fetch("http://localhost:8000")
      .then((response) => response.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  }, []);

  return (
    <main>
      <h1>03 REST API Server(FastAPI)</h1>
    </main>
  );
};

export default FastPage;
