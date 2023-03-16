import React from 'react';
import styles from './styles.module.css';
import b_noti from 'assets/b_noti.png';
import Image from 'next/image';
import Link from 'next/link';
export const BaseHeader = () => {
  return (
    <section className={styles.header_container}>
      <div className={styles.title}>
        <Image
          src={b_noti}
          alt="Noti_img"
          onError={() => {
            console.log('img load fail');
          }}
          width={18}
          height={18}
        />
        <span>오늘 하루도 유렉카와 함께 효율적인 업무를 진행하세요</span>
      </div>
      <div className={styles.user_box}>
        <div className={styles.user_img}></div>
        <p className={styles.login_box}>
          <span className={styles.bold_text}>유렉카</span>님
        </p>
      </div>
    </section>
  );
};
