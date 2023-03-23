import "./globals.css"
import type { Metadata } from "next"
import { SideNav } from "@/components/sidebar/SideNav"
import Header from "@/components/header/Header"
import localFont from "next/font/local"
import Script from "next/script"

const myFont = localFont({ src: "./PretendardVariable.woff2" })

export const metadata: Metadata = {
  title: 'UTM 카테고라이징 서비스 "유렉카"',
  description:
    "유렉카는 구글 애널리틱스 마케팅 캠페인 효과 추적을 위해 UTM을 파라미터 별로 생성, 관리, 추출까지! GA를 쓰는 마케터들의 효율적인 업무 관리 툴입니다.",
  icons: {
    icon: "./favicon.ico",
  },
  // openGraph: {
  //   title: '유렉카',
  //   description: '복잡한 UTM을 빠르게 만들자!',
  //   url: 'https://utm.works',
  //   siteName: '유렉카',
  //   images: [
  //     {
  //       url: 'https://utm.works/og.png',
  //       width: 800,
  //       height: 600,
  //     },
  //     {
  //       url: 'https://utm.works/og-alt.png',
  //       width: 1200,
  //       height: 600,
  //       alt: 'OG IMAGE',
  //     },
  //   ],
  //   locale: 'ko-kr',
  //   type: 'website',
  // },
}
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko" className={myFont.className}>
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE}`}
        ></script>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G - N10RX7RLWY');
            `,
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N6DT5Z8');
            `,
          }}
        />
        <meta property="og:image" content="https://utm.works/api/og" />
      </head>
      <body>
        {/* Google Tag Manager (noscript) */}
        <noscript
          dangerouslySetInnerHTML={{
            __html: `
            <iframe src="https://www.googletagmanager.com/ns.html?id=GTM-N6DT5Z8"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>
            `,
          }}
        />

        <SideNav />
        <div>
          <Header />
          {children}
        </div>
      </body>
    </html>
  )
}
