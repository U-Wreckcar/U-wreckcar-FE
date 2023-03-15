import './globals.css';
import { RenderHeader } from '@/components/header/RenderHeader';
import styles from './layout.module.css';

import { useRouter } from 'next/router';
import type { Metadata } from 'next';
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
          <RenderHeader />
          {children}
        </div>
      </body>
    </html>
  );
}
