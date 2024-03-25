// Client/next/components/FetchTable.tsx

import React, { useEffect, useState } from "react";

interface ImageMeta {
  id: number;
  file_name: string;
  upload_datetime: string;
  extension: string;
  src?: string;
}

const FetchTable = () => {
  const [data, setData] = useState<ImageMeta[]>([]);

  useEffect(() => {
    fetch("http://localhost:7777/db/imageMeta")
      .then((response) => response.json())
      .then((data) => {
        const formattedData: ImageMeta[] = data.map((item: any[]) => {
          // 한국 시간으로 변환
          const uploadDatetime = new Date(item[2]);
          const koreanDatetime = new Intl.DateTimeFormat("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour12: false, // 24시간 형식 채택
            hour: "2-digit",
            minute: "2-digit",
            weekday: "short"
          }).format(uploadDatetime);

          // 날짜와 시간 사이에 공백을 추가
          const [date, time] = koreanDatetime.split(" ");
          
          return {
            id: item[0], // 고유번호
            file_name: item[1], // 파일명
            upload_datetime: koreanDatetime, // 업로드 일시
            extension: item[3], // 확장자
            src: item[4], // 이미지 객체 URL
          };
        });
        setData(formattedData);
      });
  }, []);

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <div style={{ display: "flex" }}>
        <div style={{ flex: 1 }}>고유번호</div>
        <div style={{ flex: 3 }}>파일명</div>
        <div style={{ flex: 3 }}>업로드 일시</div>
        <div style={{ flex: 1 }}>확장자</div>
        <div style={{ flex: 2 }}>이미지 객체 URL</div>
      </div>
      {data.map((row: ImageMeta) => (
        <div key={row.id} style={{ display: "flex" }}>
          <div style={{ flex: 1 }}>{row.id}</div>
          <div style={{ flex: 3 }}>{row.file_name}</div>
          <div
            style={{
              flex: 3,
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {row.upload_datetime}
          </div>
          <div style={{ flex: 1 }}>{row.extension}</div>
          <div style={{ flex: 2 }}>{row.src}</div>
        </div>
      ))}
    </div>
  );
};

export default FetchTable;
