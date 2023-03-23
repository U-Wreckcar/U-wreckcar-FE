import { ImageResponse } from '@vercel/og';
import Image from 'next/image';
import ogimg from 'assets/ogimg.png';

export const config = {
  runtime: 'experimental-edge',
};

export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: 'white',
          width: '100%',
          height: '100%',
          display: 'flex',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          src={ogimg}
          alt='imgage'
        />
      </div>
    ),
    {
      width: 1200,
      height: 600,
    }
  );
}
