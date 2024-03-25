"use client"
// Client/next/app/db/page.tsx
import FetchTable from '../../components/FetchTable';

const DBPage = () => {
  return (
    <main>
      <h1>04 DataBase Server(MariaDB)</h1>
      <FetchTable />
    </main>
  );
};

export default DBPage;