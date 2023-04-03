"use client"

import React, { useEffect, useState } from "react"
import styles from "./styles.module.css"
import b_noti from "assets/b_noti.png"
import Image from "next/image"
import Link from "next/link"
import { myProfile } from "@/util/async/api"
import { removeCookie } from "@/util/async/Cookie"
import { useRouter } from "next/navigation"
import { setClientHeaders } from "@/util/async/axiosConfig"
import plus from "assets/plus.png"
interface UserProfile {
  username: string
  email: string
  age: number
  profile_img: any
  // Add more properties as needed
}

type BaseHeaderProp = {
  pathName: string | null
}
export const BaseHeader: React.FC<BaseHeaderProp> = ({ pathName }) => {
  const [modal, setModal] = useState(false)
  const [userData, setUserData] = useState<UserProfile | undefined>()

  async function fetchUserData() {
    const res = await myProfile()
    setUserData(res.data)
  }

  useEffect(() => {
    fetchUserData()
  }, [pathName])

  const router = useRouter()
  const logOut = () => {
    removeCookie("access_token")
    removeCookie("refresh_token")
    router.push("/")
    setModal(!modal)
  }

  return (
    <section className={styles.header_container}>
      <div className={styles.title}>
        <Image
          src={b_noti}
          alt="Noti_img"
          onError={() => {
            console.log("img load fail")
          }}
          width={18}
          height={18}
        />
        <p>
          <span className={styles.event_noti}>
            <Link
              href={
                "https://docs.google.com/forms/d/e/1FAIpQLSc9YT3SIVC6ARWONo5DZSd4CN4TD68E-dXCwAJcAitOWWSnuw/viewform"
              }
              target="_blank"
            >
              [클릭]
            </Link>
          </span>{" "}
          설문조사 참여하고 백화점 상품권 받으러 가기
        </p>
      </div>
      <div
        className={styles.base_user_box}
        onClick={() => {
          setModal(!modal)
        }}
      >
        {modal && (
          <dialog>
            <Link className={styles.links} href={"/userinfo"}>
              <div
                className={styles.links_box}
                onClick={() => {
                  setModal(!modal)
                }}
              >
                개인정보 관리
              </div>
            </Link>
            <div
              className={styles.links_box}
              onClick={() => {
                logOut()
              }}
            >
              로그아웃
            </div>
          </dialog>
        )}

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
    </section>
  )
}
