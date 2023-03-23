import { ImageResponse } from '@vercel/og';
import Image from 'next/image';

export const config = {
  runtime: 'experimental-edge',
};
/* eslint import/no-anonymous-default-export: [2, {"allowAnonymousFunction": true}] */
export default function () {
  return new ImageResponse(
    (
      <Image
        src='https://utm.works/og.png'
        alt='imgage'
      />
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
