"use client";
import React, { useState } from "react";
import styles from "./styles.module.css";
import Modal from "react-modal";
import { AddUtmModal } from "./AddUtmModal";
import { setSideProps } from "./PlusSideNav";

/**
 * Image
 */
import menu from "public/assets/img/menu.png";
import myutm from "public/assets/img/myutm.png";
import addutm from "public/assets/img/addutm.png";
import createutm from "public/assets/img/createutm.png";
import help from "public/assets/img/help.png";
import noti from "public/assets/img/noti.png";
import guide from "public/assets/img/guide.png";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { customStyles } from "../loginPage/LoginModal";
export const SlimSideNav: React.FC<setSideProps> = ({ setSide, side }) => {
  const [modal, setModal] = useState(false);
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
    <div className={styles.slim_container}>
      <div>
        <div>
          <Image
            priority={true}
            onClick={() => setSide(true)}
            width={24}
            height={24}
            className={styles.menu_button}
            src={menu}
            alt="Menu"
            onError={() => console.log("Image loading failed")}
          />
        </div>
        <div className={styles.slim_category_box}>
          <div className={` ${pathName === "/main" ? styles.slim_active : styles.slim_utm_category_item} `}>
            <Link href="/main" prefetch={false}>
              <Image
                priority={true}
                width={24}
                height={24}
                src={myutm}
                alt="My-UTM"
                onError={() => console.log("Image loading failed")}
              />
            </Link>
          </div>
          <div className={` ${pathName === "/createutm" ? styles.slim_active : styles.slim_utm_category_item} `}>
            <Link href="/createutm" prefetch={false}>
              <Image
                priority={true}
                width={24}
                height={24}
                src={createutm}
                alt="Menu"
                onError={() => console.log("Image loading failed")}
              />
            </Link>
          </div>
          <div className={styles.addbtnstyle}>
            <div onClick={() => setModal(!modal)}>
              <Image
                priority={true}
                width={24}
                height={24}
                src={addutm}
                alt="addutm"
                onError={() => console.log("Image loading failed")}
              />
            </div>
            <AddUtmModal isOpen={modal} onRequestClose={closeModal} style={customStyles} />
          </div>
        </div>
      </div>
      <div className={styles.slim_category_bottom_box}>
        <div className={styles.slim_utm_category_item}>
          <Image
            priority={true}
            onClick={onClickNoti}
            width={24}
            height={24}
            src={noti}
            alt="Noti Img"
            onError={() => console.log("Image loading failed")}
          />
        </div>
        <div className={styles.slim_utm_category_item}>
          <Image
            priority={true}
            onClick={onClickGuide}
            width={24}
            height={24}
            src={guide}
            alt="Guide Img"
            onError={() => console.log("Image loading failed")}
          />
        </div>
        <div className={styles.slim_utm_category_item}>
          <Image
            priority={true}
            onClick={onClickKakao}
            width={24}
            height={24}
            src={help}
            alt="Help Img"
            onError={() => console.log("Image loading failed")}
          />
        </div>
      </div>
    </div>
  );
};
