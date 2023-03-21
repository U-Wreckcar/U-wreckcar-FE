import React from 'react';
import type { AppProps } from 'next/app';
import { Hydrate } from '@tanstack/react-query';
import './globals.css';
import localFont from 'next/font/local';
const myFont = localFont({ src: './PretendardVariable.woff2' });

export default function APP({ Component, pageProps }: AppProps) {
  return (
    <Hydrate state={pageProps.dehydratedState}>
      <main className={myFont.className}>
        <Component {...pageProps} />
      </main>
    </Hydrate>
  );
}
