// "use client"
import React, { useCallback, useEffect, useRef, useState } from "react"
import styles from "./styles.module.css"
import b_noti from "assets/b_noti.png"
import Image from "next/image"
import Link from "next/link"
import { myProfile } from "@/util/async/api"
import UserModal from "./UserModal"
import axios from "axios"
import { setClientHeaders } from "@/util/async/axiosConfig"
import { getCookie } from "@/util/async/Cookie"
import { useRouter } from "next/navigation"

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
  const access_token = getCookie("access_token")
  const refresh_token = getCookie("refresh_token")
  // const fetchUserData = useCallback(
  //   async (access_token: string, refresh_token: string) => {
  //     const res = await myProfile(access_token, refresh_token)
  //
  //     setUserData(res.data)
  //   },
  //   [access_token, refresh_token]
  // )
  // useEffect(() => {

  //   setClientHeaders(access_token, refresh_token)

  //   fetchUserData(access_token, refresh_token).then((i) => {
  //     console.log("sdfsdfsdf", i)
  //     router.refresh()
  //   })
  // }, [access_token, refresh_token])
  // const accessToken = getCookie("access_token")
  // const refreshToken = getCookie("refresh_token")

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
    "X-Refresh-Token": `Bearer ${refresh_token}`,
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-store",
    Expires: "0",
  }
  async function fetchUserData() {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}users/profile`, {
        headers,
        timeout: 10000,
      })
      .then((res) => {
        setUserData(res.data)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  useEffect(() => {
    fetchUserData()
  }, [])
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
              "https://unexpected-ceder-0b7.notion.site/bf09668791d646babb76dd482e0712b8"
            }
            target='_blank'>
            [클릭]
          </Link>
          {""} 설문조사 당첨 확인하러 가기
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
