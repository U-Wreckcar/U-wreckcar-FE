import React from 'react';
import type { AppProps } from 'next/app';
import RootLayout from './layout';
import { Hydrate } from '@tanstack/react-query';

// const queryClient = new QueryClient();

export default function APP({ Component, pageProps }: AppProps) {
  return (
    <>
      <Hydrate state={pageProps.dehydratedState}>
        <link
          rel='stylesheet'
          as='style'
          href='https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.6/dist/web/static/pretendard.css'
        />
        <Component {...pageProps} />
      </Hydrate>
    </>
  );
}
