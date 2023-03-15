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
        <div>
          <SideNav />
          <Header />
          {children}
        </div>
      </body>
    </html>
  );
}
