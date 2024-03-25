// default import
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// custom import
import layoutMetadata from "./layout-metadata";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: layoutMetadata.default.title,
  description: layoutMetadata.default.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
