import React, { useState } from 'react';
import styles from './styles.module.css';
import noti from 'assets/noti.png';
import Image from 'next/image';
import Link from 'next/link';
export const BaseHeader = () => {
  const [modal, setModal] = useState(false);
  console.log(modal);
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
        <p
          onClick={() => {
            setModal(!modal);
          }}
          className={styles.login_box}
        >
          <span className={styles.bold_text}>유렉카</span>님
        </p>
      </div>
      <dialog {...(modal ? { open: true } : {})}>
        <Link className={styles.links} href={'/userinfo'}>
          <div>개인정보 관리</div>
        </Link>
        <div>로그아웃</div>
      </dialog>
    </nav>
  );
};
