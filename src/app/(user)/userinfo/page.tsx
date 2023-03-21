'use client';
import React, { useEffect, useState } from 'react';
import styles from './userinfo.module.css';
import b_createutm from 'assets/b_createutm.png';
import Image from 'next/image';
import { myProfile } from '@/util/async/api';

interface UserProfile {
  username: string;
  email: string;
  age: number;
  profile_img: any;
  // Add more properties as needed
}

export default function UserPage() {
  const [userData, setUserData] = useState<UserProfile | undefined>();
  useEffect(() => {
    async function fetchUserData() {
      const res = await myProfile();
      console.log(res);
      setUserData(res.data);
      console.log(res.data);
    }
    fetchUserData();
  }, []);

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
          <Image
            className={styles.img}
            src={userData?.profile_img}
            alt='프로필 이미지'
            width={180}
            height={180}
          />
          <button>수정</button>
        </div>
        <div className={styles.item_box}>
          <div>이름</div>

          <span>{userData?.username}</span>
        </div>
        <div className={styles.item_box}>
          <div>이메일</div>
          <span>{userData?.email}</span>
        </div>
        <div className={styles.item_box}>
          <div>연락처</div>
          <span>연락 API 있을까요?</span>
        </div>
        <button className={styles.edit_save}>변경사항 저장</button>
      </article>
    </section>
  );
}
