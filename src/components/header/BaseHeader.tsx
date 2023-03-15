import React from 'react';
import styles from './styles.module.css';
import noti from 'assets/noti.png';
import Image from 'next/image';
import Link from 'next/link';
export const BaseHeader = () => {
  return (
    <nav className={styles.header_container}>
      <div className={styles.title}>
        <Image
          src={noti}
          alt="Noti_img"
          onError={() => {
            console.log('img load fail');
          }}
        />
        <span className="noti_text">
          오늘 하루도 유렉카와 함께 효율적인 업무를 진행하세요
        </span>
      </div>
      <div className={styles.user_box}>
        <div className={styles.user_img}></div>
        <p className={styles.login_box}>
          <span className={styles.bold_text}>유렉카</span>님
        </p>
      </div>
    </nav>
  );
};
