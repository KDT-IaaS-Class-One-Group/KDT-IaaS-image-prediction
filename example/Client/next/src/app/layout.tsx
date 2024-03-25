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
import H1 from "../../components/atoms/H1";
import Anchor from "../../components/atoms/Anchor";
import Main from "../../components/atoms/Main";
import Footer from "../../components/atoms/Footer";
import Paragraph from "../../components/atoms/Paragraph";

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
          <H1>
            <Anchor href="/">layoutMetadata.text.anchor</Anchor>
          </H1>
        </Header>
        <Main>{children}</Main>
        <Footer style={{ ...layoutMetadata.style.footer, padding: layoutMetadata.style.padding }}>
          <Paragraph> layoutMetadata.text.footer</Paragraph>
        </Footer>
      </body>
    </html>
  );
}
