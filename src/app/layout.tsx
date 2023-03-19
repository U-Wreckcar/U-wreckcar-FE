import "./globals.css";
import styles from "./layout.module.css";
import type { Metadata } from "next";
import { SideNav } from "@/components/sidebar/SideNav";
import Header from "@/components/header/Header";
export const metadata: Metadata = {
  title: 'UTM 카테고라이징 서비스 "유렉카"',
  description:
    "유렉카는 구글 애널리틱스 마케팅 캠페인 효과 추적을 위해 UTM을 파라미터 별로 생성, 관리, 추출까지! GA를 쓰는 마케터들의 효율적인 업무 관리 툴입니다.",
  icons: {
    icon: "./favicon.ico",
  },
  openGraph: {
    title: "유렉카",
    description: "복잡한 UTM을 빠르게 만들자!",
    url: "https://utm.works",
    siteName: "유렉카",
    images: [
      {
        url: "../../src/assets/ogimg.png",
        width: 800,
        height: 600,
      },
    ],
  },
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // const router = useRouter();

  return (
    <html lang="en">
      <body>
        <SideNav />
        <div>
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
