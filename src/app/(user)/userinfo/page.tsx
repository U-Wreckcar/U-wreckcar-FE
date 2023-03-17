import React from 'react';
import styles from './userinfo.module.css';
import b_createutm from 'assets/b_createutm.png';
import Image from 'next/image';

export default function UserPage() {
  const time = {
    time: 30,
  };
  return (
    <section className={styles.user_container}>
      <div className={styles.title_box}>
        <h1>개인정보 관리</h1>
        <p>{time.time}전에 </p>
      </div>
      <article>
        <div className={styles.profile_img_box}>
          <Image src={b_createutm} alt="profile_img" width={180} height={180} />
          <button>E</button>
        </div>
        <div className={styles.item_box}>
          <p>
            이름<span>흰둥이</span>
          </p>
        </div>
        <div className={styles.item_box}>
          <p>
            이메일<span>sdfasdf@naver.com</span>
          </p>
        </div>
        <div className={styles.item_box}>
          <p>
            연락처<span>010-1010-1010</span>
          </p>
        </div>
        <button>저장</button>
      </article>
    </section>
  );
}
