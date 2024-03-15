// Client/next/app/layout.tsx

import type { Metadata } from "next";
import "./global.css";

export const metadata: Metadata = {
  title: "Project B 인터랙션 점검",
  description: "Next.js로 확인",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>
        <header style={{ backgroundColor: "lightblue", padding: "1rem" }}>
          <h1>
            <a href="/">To Home</a>
          </h1>
        </header>
        {children}
        <footer style={{ backgroundColor: "ghostwhite", padding: "1rem" }}>
          <p>Footer</p>
        </footer>
      </body>
    </html>
  );
}
