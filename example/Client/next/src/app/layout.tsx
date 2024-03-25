// default import
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// custom import
// notice : layoutMetadata
// info: title, description, language, style(padding, header, footer) 등의 값이 객체로 작성되어 있음
import layoutMetadata from "./layout-metadata";
// compoenent import
import Header from "../../components/atoms/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: layoutMetadata.default.title,
  description: layoutMetadata.default.description
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header style={{ ...layoutMetadata.style.header, padding: layoutMetadata.style.padding }}>
        </Header>
      </body>
    </html>
  );
}
