import React from 'react';
import type { AppProps } from 'next/app';
import { Hydrate } from '@tanstack/react-query';
import './globals.css';
import localFont from 'next/font/local';
import { useRouter } from 'next/router';

import Head from 'next/head';
const myFont = localFont({ src: './PretendardVariable.woff2' });

export default function APP({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const ogImgPath = `${router.basePath}/og-image.png`;
  return (
    <>
      <Head>
        <title>유렉카!</title>
        <meta
          property='og:title'
          content='og image'
        />
        <meta
          property='og:image'
          content={ogImgPath}
        />
      </Head>
      <Hydrate state={pageProps.dehydratedState}>
        <main className={myFont.className}>
          <Component {...pageProps} />
        </main>
      </Hydrate>
    </>
  );
}
