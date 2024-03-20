// Client/next/app/layout.tsx

export default function MainPage() {
  return (
    <main>
      <h1>Project B 인터랙션 점검</h1>
      <h2>
        <a href="/user">01 User</a>
      </h2>
      <h2>
        <a href="/next">02 App Server(Next.js)</a>
      </h2>
      <h2>
        <a href="/fast">03 REST API Server(FastAPI)</a>
      </h2>
      <h2>
        <a href="/db">04 DataBase Server(MariaDB)</a>
      </h2>
      <h2>
        <a href="/storage">05 Storage Server(S3)</a>
      </h2>
      <h2>
        <a href="/ml">06 Machine Learning Model</a>
      </h2>
    </main>
  );
}
