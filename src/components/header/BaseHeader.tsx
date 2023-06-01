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
  name: string;
  email: string;
  profileImg: any;
  // Add more properties as needed
}

export const BaseHeader = () => {
  const [modal, setModal] = useState(false);
  const [userData, setUserData] = useState<UserProfile | undefined>();
  const refresh_token = getCookie("refresh_token");

  const fetchUserData = useCallback(async () => {
    const res = await myProfile(refresh_token);
    console.log("user", res);
    setUserData(res?.data.data);
  }, [refresh_token]);

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
            href={
              "https://unexpected-ceder-0b7.notion.site/11f8741947a441e5822fd8723ef48492?p=466c5b37c40d4e7ba9db48b604905730&pm=s"
            }
            target="_blank"
          >
            [클릭]
          </Link>
          유렉카 로그인 관련 공지사항
        </p>
      </div>
      <div
        className={styles.base_user_box}
        onClick={() => {
          setModal(!modal);
        }}
      >
        <Image
          src={userData?.profileImg}
          alt=""
          width={30}
          height={30}
          style={{ borderRadius: "50%", marginRight: "7px" }}
          unoptimized={true}
        />
        <p className={styles.login_box}>
          <span className={styles.bold_text}>{userData?.name}</span>님
        </p>
      </div>
      {modal && <UserModal setModal={setModal} modal={modal} />}
    </section>
  );
};
