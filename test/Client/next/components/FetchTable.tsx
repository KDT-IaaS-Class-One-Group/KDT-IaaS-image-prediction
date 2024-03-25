// Client/next/components/FetchTable.tsx

import React, { useEffect, useState } from 'react';

interface ImageMeta {
  id: number;
  file_name: string;
  upload_datetime: string;
  extension: string;
}

const FetchTable = () => {
  const [data, setData] = useState<ImageMeta[]>([]);

  useEffect(() => {
    fetch('http://localhost:7777/db/imageMeta')
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>id</th>
          <th>file_name</th>
          <th>upload_datetime</th>
          <th>extension</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row: ImageMeta) => (
          <tr key={row.id}>
            <td>{row.id}</td>
            <td>{row.file_name}</td>
            <td>{row.upload_datetime}</td>
            <td>{row.extension}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default FetchTable;