import React from 'react';
import type { AppProps } from 'next/app';
import RootLayout from './layout';
import { Hydrate } from '@tanstack/react-query';
import './globals.css';
import localFont from 'next/font/local';
const myFont = localFont({ src: './PretendardVariable.woff2' });

// const queryClient = new QueryClient();

export default function APP({ Component, pageProps }: AppProps) {
  return (
    <main className={myFont.className}>
      <Hydrate state={pageProps.dehydratedState}>
        <link
          rel='stylesheet'
          as='./globals.css'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css'
        />
        <Component {...pageProps} />
      </Hydrate>
    </main>
  );
}
