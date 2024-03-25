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
          return {
            id: item[0],
            file_name: item[1],
            upload_datetime: item[2],
            extension: item[3],
            src: item[4],
          };
        });
        setData(formattedData);
      });
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>고유번호</th>
          <th>파일명</th>
          <th>업로드</th>
          <th>확장자</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row: ImageMeta) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.file_name}</td>
            <td>{row.upload_datetime}</td>
            <td>{row.extension}</td>
            <td>{row.src}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FetchTable;
