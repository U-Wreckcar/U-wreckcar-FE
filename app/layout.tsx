import './globals.css';
import Head from 'next/head';
import Link from 'next/link';
export const metadata = {
  title: 'U-렉카',
  description: 'UTM을 쉽게 생성할 수 있습니다.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <nav>헤더</nav>
        <nav>
          <Link href={'/createutm'}>유티엠생성하러가기</Link>
        </nav>
        {children}
      </body>
    </html>
  );
}
