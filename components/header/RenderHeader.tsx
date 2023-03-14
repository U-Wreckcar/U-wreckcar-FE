import React from 'react';
import styles from './styles.module.css';
import Link from 'next/link';
export const RenderHeader = () => {
  return (
    <nav className={styles.render_nav}>
      <div className={styles.render_nav_left}>
        <div className={styles.render_nav_left_img}></div>
        <div className={styles.render_nav_left_noti}>공지사항</div>
        <div className={styles.render_nav_left_guide}>가이드</div>
      </div>
      <div className={styles.user_box}>
        <Link href={'/login'} as={'/login'}>
          <p>로그인</p>
        </Link>
      </div>
    </nav>
  );
};
