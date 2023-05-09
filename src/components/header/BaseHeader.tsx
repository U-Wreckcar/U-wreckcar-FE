"use client";
import React, { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";
import b_noti from "public/assets/img/b_noti.png";
import Image from "next/image";
import Link from "next/link";
import { myProfile } from "src/util/async/api";
import UserModal from "./UserModal";
import { getCookie } from "src/util/async/Cookie";

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
  const access_token = getCookie("access_token");
  const refresh_token = getCookie("refresh_token");

  const fetchUserData = useCallback(async () => {
    const res = await myProfile(access_token, refresh_token);
    setUserData(res?.data);
  }, [access_token, refresh_token]);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  return (
    <section className={styles.header_container}>
      <div className={styles.title}>
        <Image
          src={b_noti}
          alt="Noti_img"
          onError={() => {
            console.log("img load fail");
          }}
          width={18}
          height={18}
        />
        <p>
          <Link
            className={styles.click_text}
            href={"https://unexpected-ceder-0b7.notion.site/bf09668791d646babb76dd482e0712b8"}
            target="_blank"
          >
            [클릭]
          </Link>
          {""} 설문조사 당첨 확인하러 가기
        </p>
      </div>
      <div
        className={styles.base_user_box}
        onClick={() => {
          setModal(!modal);
        }}
      >
        <Image
          src={userData?.profile_img}
          alt=""
          width={30}
          height={30}
          style={{ borderRadius: "50%", marginRight: "7px" }}
          unoptimized={true}
        />
        <p className={styles.login_box}>
          <span className={styles.bold_text}>{userData?.username}</span>님
        </p>
      </div>
      {modal && <UserModal setModal={setModal} modal={modal} />}
    </section>
  );
};
