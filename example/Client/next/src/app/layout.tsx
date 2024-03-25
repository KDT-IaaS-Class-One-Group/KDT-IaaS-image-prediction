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
/**
 * point
 * 1. layoutMetadata 객체를 가져와서, 해당 객체의 key와 value를 분해하여 사용한다.
 * 2. layoutMetadata 객체의 key와 value는 '어떻게 변할지' 예측하기 어렵기 때문에, 해당 파일과 같이 일원화 하면 관리하기 매우 편하다.
 * 3. 구조분해 할당을 통해, 객체의 key와 value를 분해하여 사용한다.(호출 부분에서 길어지므로)
 */
const { title:defaultTitle, description:defaultDescription, language:defaultLanguage } = layoutMetadata.default;
const { padding:stylePadding, header:styleHeader , footer:styleFooter } = layoutMetadata.style
const { anchor:textAnchor, paragraph:textFooter } = layoutMetadata.text

export const metadata: Metadata = {
  title: defaultTitle,
  description: defaultDescription,
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLanguage}>
      <body className={inter.className}>
        <Header style={{ ...styleHeader, padding: stylePadding }}>
          <H1>
            <Anchor href="/">textAnchor</Anchor>
          </H1>
        </Header>
        <Main>{children}</Main>
        <Footer style={{ ...styleFooter, padding: stylePadding }}>
          <Paragraph> textFooter</Paragraph>
        </Footer>
      </body>
    </html>
  );
}
