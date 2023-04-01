"use client"
import { setClientHeaders } from "@/util/async/axiosConfig"
import { setCookie } from "@/util/async/Cookie"
import axios from "axios"
import { redirect, useRouter } from "next/navigation"
import { useEffect } from "react"
import CircularUnderLoad from "../CircularUnderLoad"
import styles from "./Kakao.module.css"

const KakaoCallback = () => {
  const router = useRouter()

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")

    if (code) {
      // 백엔드 서버에 액세스 토큰과 리프레시 토큰을 요청합니다.
      fetch(`${process.env.NEXT_PUBLIC_API}auth/kakao/callback?code=${code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then(async (response) => {
          const res = await response.json()
          setCookie("refresh_token", res.refresh_token)
          setClientHeaders(res.access_token, res.refresh_token)
        })
        .then(() => {
          router.push("/main")
        })
        .catch((error) => {
          // 에러 처리
          console.error(error)
          //   router.push('/error');
        })
    } else {
      // 에러 처리
      //   router.push('/error');
    }
  }, [router])

  return (
    <div className={styles.container}>
      <CircularUnderLoad />
    </div>
  )
}

export default KakaoCallback
