import { SideNav } from "src/components/sidebar/SideNav";
import Header from "src/components/header/Header";
import localFont from "next/font/local";
import type { Metadata } from "next";
import Providers from "./providers";
import Script from "next/script";
import "./globals.css";
const pretendard = localFont({
   src: "../../public/assets/font/Pretendard-Regular.ttf",
   variable: "--font-pretendard",
   display: "swap",
});
export const metadata: Metadata = {
   title: 'UTM 카테고라이징 서비스 "유렉카"',
   description:
      "유렉카는 구글 애널리틱스 마케팅 캠페인 효과 추적을 위해 UTM을 파라미터 별로 생성, 관리, 추출까지! GA를 쓰는 마케터들의 효율적인 업무 관리 툴입니다.",
   icons: {
      icon: "./favicon.ico",
   },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
   return (
      <html lang="ko" className={pretendard.className}>
         <head>
            <link
               rel="stylesheet"
               as="style"
               href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css"
            />
            {/* Google Analytics */}
            <script async src={`https://www.googletagmanager.com/gtag/js?id=G-N10RX7RLWY`}></script>
            <script
               dangerouslySetInnerHTML={{
                  __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', "G-N10RX7RLWY");
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
          })(window,document,'script','dataLayer','GTM-PTJSFK5');
        `,
               }}
            />
            <meta property="og:image" content="https://utm.works/api/og1200.png" />
         </head>
         <body>
            {/* Google Tag Manager (noscript) */}
            <noscript>
               <iframe
                  src="https://www.googletagmanager.com/ns.html?id=GTM-PTJSFK5"
                  height="0"
                  width="0"
                  style={{ display: "none", visibility: "hidden" }}
               ></iframe>
            </noscript>

            <SideNav />
            <div id="__next">
               <Header />
               <Providers> {children}</Providers>
            </div>
         </body>
      </html>
   );
}
