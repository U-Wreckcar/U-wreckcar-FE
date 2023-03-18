'use client';
import { ImageResponse } from '@vercel/og';
import Image from 'next/image';
import ogimg from 'assets/ogimg.png';
export const config = {
  runtime: 'edge',
};

export default function OG() {
  return new ImageResponse(
    (
      <>
        <div
          style={{
            display: 'flex',
            fontSize: 128,
            width: '100%',
            height: '100%',
          }}
        >
          <Image src={ogimg} alt="og_img" />
        </div>
      </>
    )
  );
}
