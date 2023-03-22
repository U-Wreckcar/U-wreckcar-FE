import './globals.css';
import type { Metadata } from 'next';
import { SideNav } from '@/components/sidebar/SideNav';
import Header from '@/components/header/Header';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';
import Script from 'next/script';
import Head from 'next/head';
// import { Head } from 'next/document';
// import Head from 'next/head';

const myFont = localFont({ src: './PretendardVariable.woff2' });

export const metadata: Metadata = {
  title: 'UTM 카테고라이징 서비스 "유렉카"',
  description:
    '유렉카는 구글 애널리틱스 마케팅 캠페인 효과 추적을 위해 UTM을 파라미터 별로 생성, 관리, 추출까지! GA를 쓰는 마케터들의 효율적인 업무 관리 툴입니다.',
  icons: {
    icon: './favicon.ico',
  },
  openGraph: {
    title: '유렉카',
    description: '복잡한 UTM을 빠르게 만들자!',
    url: 'https://utm.works',
    siteName: '유렉카',
    images: [
      {
        url: 'https://utm.works/og-alt.png',
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang='ko'
      className={myFont.className}>
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE}`}></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', ${process.env.NEXT_PUBLIC_GOOGLE});
            `,
          }}
        />
      </head>
      <Header />
      <body>
        <SideNav />
        <div>{children}</div>
      </body>
    </html>
  );
}
