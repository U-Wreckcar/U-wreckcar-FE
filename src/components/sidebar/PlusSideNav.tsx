'use client';
import React, { Dispatch, SetStateAction, useState } from 'react';

import styles from './styles.module.css';
import Modal from 'react-modal';
import { AddUtmModal } from './AddUtmModal';

/**
 * Image
 */
import logo from '../../assets/logo.png';
import myutm from '../../assets/myutm.png';
import addutm from '../../assets/addutm.png';
import createutm from '../../assets/createutm.png';
import slim from '../../assets/slim.png';
import help from '../../assets/help.png';
import noti from 'assets/noti.png';
import guide from 'assets/guide.png';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export type setSideProps = {
  setSide: Dispatch<SetStateAction<boolean>>;
  side: boolean;
};

export const PlusSideNav: React.FC<setSideProps> = ({ setSide, side }) => {
  const [modal, setModal] = useState(false);
  const pathName = usePathname();

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };
  return (
    <div className={styles.plus_container}>
      <div>
        <div className={styles.logo_container}>
          <Image src={logo} alt="Logo" width={150} height={80} />

          <Image
            onClick={() => setSide(false)}
            width={30}
            height={30}
            className={styles.slim_button}
            src={slim}
            alt="Slim Button"
            // onError={() => console.log('Image loading failed')}
          />
        </div>
        <div className={styles.titleBox}>
          <h3>MY UTM</h3>
        </div>

        <div className={styles.category_box}>
          <Link className={styles.linklink} href="/main">
            <div
              className={` ${
                pathName === '/main' ? styles.active : styles.utm_category_item
              } `}
            >
              <Image
                className={styles.icon}
                width={30}
                height={30}
                src={myutm}
                alt="My-UTM"
                onError={() => console.log('Image loading failed')}
              />
              <span className="category_text">UTM 관리하기</span>
            </div>
          </Link>
          <Link
            className={styles.linklink}
            // style={{ textDecoration: 'none', color: 'd1d1d1' }}
            href="/createutm"
          >
            <div
              className={`${
                pathName === '/createutm'
                  ? styles.active
                  : styles.utm_category_item
              }`}
            >
              <Image
                className={styles.icon}
                width={30}
                height={30}
                src={createutm}
                alt="Create-UTM"
              />
              <span className="category_text">새 UTM 생성하기</span>
            </div>
          </Link>
          {/* <Link to="/userinfo">유저정보</Link> */}
          <div className={styles.utm_category_item}>
            <Image
              className={styles.icon}
              width={24}
              height={24}
              src={addutm}
              alt="Add_UTM"
            />
            <span className="category_text" onClick={() => setModal(!modal)}>
              기존 UTM 추가하기
            </span>
            <AddUtmModal
              isOpen={modal}
              onRequestClose={closeModal}
              style={customStyles}
            />
          </div>
        </div>
      </div>
      <div>
        {/* <div className={styles.sidebar_section}></div> */}
        <h3 className={styles.urc_category}>유렉카</h3>
        <div className={styles.category_bottom_box}>
          <div className={styles.utm_category_item}>
            <Image
              className={styles.icon}
              width={24}
              height={24}
              src={noti}
              alt="Noti Img"
              onError={() => console.log('Image loading failed')}
            />
            <span className="category_text">공지사항</span>
          </div>
          <div className={styles.utm_category_item}>
            <Image
              className={styles.icon}
              width={24}
              height={24}
              src={guide}
              alt="Guide Img"
              onError={() => console.log('Image loading failed')}
            />
            <span className="category_text">가이드</span>
          </div>
          <div className={styles.utm_category_item}>
            <Image
              className={styles.icon}
              width={24}
              height={24}
              src={help}
              alt="Help Img"
              onError={() => console.log('Image loading failed')}
            />
            <span className="category_text">문의하기</span>
          </div>
        </div>
      </div>
    </div>
  );
};
