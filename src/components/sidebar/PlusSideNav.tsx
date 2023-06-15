"use client";
import React, { Dispatch, SetStateAction, useState } from "react";

import styles from "./styles.module.css";
import { AddUtmModal } from "./AddUtmModal";
import Link from "next/link";

/**
 * Image
 */
import whitelogo from "public/assets/img/whitelogo.png";
import myutm from "public/assets/img/myutm.png";
import addutm from "public/assets/img/addutm.png";
import createutm from "public/assets/img/createutm.png";
import slim from "public/assets/img/slim.png";
import help from "public/assets/img/help.png";
import noti from "public/assets/img/noti.png";
import guide from "public/assets/img/guide.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { customStyles } from "../loginPage/LoginModal";

export type setSideProps = {
  setSide: Dispatch<SetStateAction<boolean>>;
  side: boolean;
};

export const PlusSideNav: React.FC<setSideProps> = ({ setSide, side }) => {
  const [modal, setModal] = useState(false);
  const [login, setLogin] = useState(false);
  const pathName = usePathname();

  const openModal = () => {
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const onClickNoti = () => {
    window.open("https://unexpected-ceder-0b7.notion.site/11f8741947a441e5822fd8723ef48492", "_blank");
  };

  const onClickGuide = () => {
    window.open("https://unexpected-ceder-0b7.notion.site/0a3db0d8103f4be2855a23186fc1b5e3", "_blank");
  };

  const onClickKakao = () => {
    window.open("https://open.kakao.com/o/sbK3Rfaf", "_blank");
  };

  return (
    <section className={styles.plus_container}>
      <div className={styles.category_box}>
        <div className={styles.logo_container}>
          <Link prefetch={false} href={`${pathName === "/login" ? "/" : "/main"}`}>
            <Image className={styles.white_logo} src={whitelogo} alt="Logo" width={81.11} height={30} />
          </Link>
          <Image
            onClick={() => setSide(false)}
            width={30}
            height={30}
            className={styles.slim_button}
            src={slim}
            alt="Slim Button"
            onError={() => console.log("Image loading failed")}
          />
        </div>
        <div className={styles.titleBox}>
          <h3>MY UTM</h3>
        </div>

        <Link prefetch={false} className={styles.linklink} href="/main">
          <div className={` ${pathName === "/main" ? styles.active : styles.utm_category_item} `}>
            <Image
              className={styles.icon}
              width={30}
              height={30}
              src={myutm}
              alt="My-UTM"
              onError={() => console.log("Image loading failed")}
            />
            <p>UTM 관리하기</p>
          </div>
        </Link>
        <Link prefetch={false} className={styles.linklink} href="/createutm">
          <div className={`${pathName === "/createutm" ? styles.active : styles.utm_category_item}`}>
            <Image className={styles.icon} width={30} height={30} src={createutm} alt="Create-UTM" />
            <p>새 UTM 생성하기</p>
          </div>
        </Link>
        <Link prefetch={false} className={styles.link} href={"/main"}>
          <span className={styles.link}>
            <p className={styles.utm_category_item} onClick={() => setModal(!modal)}>
              <Image className={styles.icon} width={30} height={30} src={addutm} alt="Add_UTM" />
              기존 UTM 추가하기
            </p>
          </span>
        </Link>
        <AddUtmModal isOpen={modal} onRequestClose={closeModal} style={customStyles} />
      </div>

      <div className={styles.bottom_box}>
        <h3 className={styles.urc_category}>유렉카</h3>
        <div className={styles.category_bottom_box}>
          <div className={styles.utm_category_item} onClick={onClickNoti}>
            <Image
              className={styles.icon}
              width={24}
              height={24}
              src={noti}
              alt="Noti Img"
              onError={() => console.log("Image loading failed")}
            />
            <p>공지사항</p>
          </div>
          <div className={styles.utm_category_item} onClick={onClickGuide}>
            <Image
              className={styles.icon}
              width={24}
              height={24}
              src={guide}
              alt="Guide Img"
              onError={() => console.log("Image loading failed")}
            />
            <p>가이드</p>
          </div>
          <div className={styles.utm_category_item} onClick={onClickKakao}>
            <Image
              className={styles.icon}
              width={24}
              height={24}
              src={help}
              alt="Help Img"
              onError={() => console.log("Image loading failed")}
            />
            <p>문의하기</p>
          </div>
        </div>
      </div>
    </section>
  );
};
