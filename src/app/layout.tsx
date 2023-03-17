import './globals.css';
import styles from './layout.module.css';
import type { Metadata } from 'next';
import { SideNav } from '@/components/sidebar/SideNav';
import Header from '@/components/header/Header';
export const metadata: Metadata = {
  title: '유렉카',
  description: 'UTM을 쉽고 빠르게 생성할 수 있습니다.',
  icons: {
    icon: './favicon.ico',
  },
  openGraph: {
    title: '유렉카',
    description: '복잡한 UTM을 빠르게 만들자!',
    url: 'https://u-wreckcar-fe-phi.vercel.app/',
    siteName: '유렉카',
    images: [
      {
        url: '../../src/assets/ogimg.png',
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
    <html lang="kr">
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
