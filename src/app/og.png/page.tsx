import Image from 'next/image';
import React from 'react';
import ogimg from 'assets/ogimg.png';
export default function OGImage() {
  return (
    <>
      <Image
        src={ogimg}
        alt='og-image'
        width={800}
        height={600}
      />
    </>
  );
}
