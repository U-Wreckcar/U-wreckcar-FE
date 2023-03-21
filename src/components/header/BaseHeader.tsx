import React, { useEffect, useState } from 'react';
import styles from './styles.module.css';
import b_noti from 'assets/b_noti.png';
import Image from 'next/image';
import Link from 'next/link';
import { myProfile } from '@/util/async/api';

interface UserProfile {
  username: string;
  email: string;
  age: number;
  profile_img: any;
  // Add more properties as needed
}
export const BaseHeader = () => {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState<UserProfile | undefined>();
  useEffect(() => {
    async function fetchUserData() {
      const res = await myProfile();
      setUserData(res.data);
    }
    fetchUserData();
  }, []);

  return (
    <section className={styles.header_container}>
      <div className={styles.title}>
        <Image
          src={b_noti}
          alt='Noti_img'
          onError={() => {
            console.log('img load fail');
          }}
          width={18}
          height={18}
        />
        <span>오늘 하루도 유렉카와 함께 효율적인 업무를 진행하세요</span>
      </div>
      <div className={styles.base_user_box}>
        <Image
          src={userData?.profile_img}
          alt='img'
          width={30}
          height={30}
          style={{ borderRadius: '50%', marginRight: '7px' }}
          unoptimized={true}
        />
        <p
          onClick={() => {
            setModal(!modal);
          }}
          className={styles.login_box}>
          <span className={styles.bold_text}>{userData?.username}</span>님
        </p>
      </div>
      {modal && (
        <dialog>
          <Link
            className={styles.links}
            href={'/userinfo'}>
            <div className={styles.links_box}>개인정보 관리</div>
          </Link>
          <div className={styles.links_box}>로그아웃</div>
        </dialog>
      )}
    </section>
  );
};
