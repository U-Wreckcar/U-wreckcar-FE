"use client"
import React, { useEffect, useRef, useState } from "react"
import styles from "./styles.module.css"
import b_noti from "assets/b_noti.png"
import Image from "next/image"
import Link from "next/link"
import { myProfile } from "@/util/async/api"
import { removeCookie } from "@/util/async/Cookie"
import { useRouter } from "next/navigation"
import UserModal from "./UserModal"
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

  return (
    <section className={styles.header_container}>
      <div className={styles.title}>
        <Image
          src={b_noti}
          alt='Noti_img'
          onError={() => {
            console.log("img load fail")
          }}
          width={18}
          height={18}
        />
        <p>
          <Link
            className={styles.click_text}
            href={
              "https://docs.google.com/forms/d/e/1FAIpQLSc9YT3SIVC6ARWONo5DZSd4CN4TD68E-dXCwAJcAitOWWSnuw/viewform"
            }
            target='_blank'>
            [클릭]
          </Link>
          설문조사 참여하고 백화점 상품권 받으러 가기
        </p>
      </div>
      <div
        className={styles.base_user_box}
        onClick={() => {
          setModal(!modal)
        }}>
        <Image
          src={userData?.profile_img}
          alt=''
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
  )
}
