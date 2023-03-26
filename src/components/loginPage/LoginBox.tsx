import Image from "next/image"
import styles from "./LoginBox.module.css"
import kakao_login from "assets/kakao_login.png"
import naver_login from "assets/naver_login.png"
import r_google from "assets/r_google.png"
import { getCookie } from "@/util/async/Cookie"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import LocalLogin from "./LocalLogin"
import logo from "assets/renderlogo.png"
import { Alert, AlertTitle } from "@mui/material"

const LoginBox = () => {
  const [local, setLocal] = useState(false)
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    const cookie = getCookie("access_token")
    if (cookie) {
      redirect("/main")
    }
  }, [])

  const kakaoUrl = `${process.env.NEXT_PUBLIC_API}auth/kakao`
  const onClickKakaoBtn = () => {
    window.location.href = kakaoUrl
  }
  const onClickNaverBtn = () => {
    setAlert(true)
    // alert("개발중입니다..!")
  }

  const onClickGoogleBtn = () => {
    setAlert(true)
    // alert("개발중입니다...!")
  }

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false)
      }, 2000)
    }
  }, [alert])

  return (
    <>
      <div className={styles.container}>
        <div>
          <h1 className={styles.title}>Login</h1>
          <p className={styles.content}>
            U렉카와 함께 쉽고 빠른 업무를 느껴보세요!
          </p>
          {alert && (
            <Alert className={styles.alert} severity="warning">
              아직 개발 중입니다...!{" "}
              <strong>카카오로 바로 시작해보세요!</strong>
            </Alert>
          )}
        </div>
        <div>
          {!local ? (
            <>
              <div>
                <Image src={kakao_login} alt="" width={15} height={15} />
                <button className={styles.kakao_btn} onClick={onClickKakaoBtn}>
                  카카오로 1초만에 시작하기
                </button>
              </div>
              <div>
                <Image src={naver_login} alt="" width={15} height={15} />
                <button className={styles.naver_btn} onClick={onClickNaverBtn}>
                  네이버로 1초만에 시작하기
                </button>
              </div>
              <div>
                <Image src={r_google} alt={""} width={15} height={15} />
                <button
                  className={styles.google_btn}
                  onClick={onClickGoogleBtn}
                >
                  구글로 1초만에 시작하기
                </button>
              </div>
              <div onClick={() => setLocal(true)}>
                <Image src={logo} alt={""} width={40} height={15} />
                <button className={styles.email_btn}>이메일로 시작하기</button>
              </div>
            </>
          ) : (
            <LocalLogin setLocal={setLocal} />
          )}
        </div>
      </div>
    </>
  )
}

export default LoginBox
