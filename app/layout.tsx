import './globals.css';
import Link from 'next/link';
import Head from 'next/head';
// export const metadata = {
//   title: '헤더',
//   description: 'UTM을 쉽게 생성할 수 있습니다.',
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {/* <Head>
          <nav>헤더</nav>
        </Head> */}
        <nav>
          사이드바
          <Link href={'/createutm'}>유티엠생성하러가기</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
