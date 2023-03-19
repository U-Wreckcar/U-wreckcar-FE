import Image from 'next/image';
import React from 'react';
import styles from './404.module.css';
import notfoundpage from 'assets/notfoundpage.png';
import Link from 'next/link';

export default function NotFoundPage() {
  return (
    <>
      <div className={styles.container}>
        <Link href={'/main'}>
          <Image src={notfoundpage} alt="button" width={250} height={50} />
        </Link>
      </div>
    </>
  );
}
