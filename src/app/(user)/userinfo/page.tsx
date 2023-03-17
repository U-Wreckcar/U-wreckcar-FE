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
        <p>{time.time}분 전에 생성됐어요! </p>
      </div>
      <article>
        <div className={styles.profile_img_box}>
          {/* <Image src={b_createutm} alt="profile_img" width={180} height={180} /> */}
          <div className={styles.prfile_img}></div>
          <button>E</button>
        </div>
        <div className={styles.item_box}>
          <div>이름</div>

          <span>흰둥이</span>
        </div>
        <div className={styles.item_box}>
          <div>이메일</div>
          <span>sdfasdf@naver.com</span>
        </div>
        <div className={styles.item_box}>
          <div>연락처</div>
          <span>010-1010-1010</span>
        </div>
        <button className={styles.edit_save}>변경사항 저장</button>
      </article>
    </section>
  );
}
