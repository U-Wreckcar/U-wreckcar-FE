import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
export const OGImgage = () => {
  const router = useRouter();
  const ogImgPath = `${router.basePath}/og_image.png`;
  return (
    <div>
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
      <h1>UTM업무 1시간? 유렉카에서는 3분이면 OK!</h1>
    </div>
  );
};
