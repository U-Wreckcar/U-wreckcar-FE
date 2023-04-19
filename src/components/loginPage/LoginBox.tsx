import Image from "next/image"
import styles from "./LoginBox.module.css"
import kakao_login from "public/assets/kakao_login.png"

import { getCookie } from "src/util/async/Cookie"
import { useEffect, useState } from "react"
import { redirect } from "next/navigation"
import { Modal } from "src/common/modal/Modal"

import LocalLogin from "./LocalLogin"
import logo from "public/assets/renderlogo.png"
import { Alert } from "@mui/material"
import LoginModal from "./LoginModal"
const LoginBox = ({ router }: any) => {
  const [local, setLocal] = useState(false)
  const [alert, setAlert] = useState(false)
  const [noti, setNoti] = useState(true)

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
    <div className={styles.container}>
      {/* {noti && (
        <Modal
          x={500}
          y={464}
          setNoti={setNoti}
          modalTitle={"안내"}
          context={
            "유렉카의 회원가입 방식을 이메일 회원가입으로 변경함에 따라 \n 현재 카카오톡으로 회원가입은 할 수 없습니다."
          }
          contextSeconde={
            "유렉카를 처음 이용하시는 고객께서는\n 이메일 회원가입을 이용해주시면 감사하겠습니다\n다만 기존 고객님들은 카카오로 로그인하기로\n그대로 로그인하여 서비스를 이용하실 수 있습니다."
          }
          confirmButtonName={"확인"}
        />
      )} */}
      {noti && (
        <LoginModal isOpen={noti} onRequestClose={() => setNoti(false)} />
      )}

      <h1 className={styles.title}>Login</h1>
      <p className={styles.content}>
        U렉카와 함께 쉽고 빠른 업무를 느껴보세요!
      </p>
      {alert && (
        <Alert className={styles.alert} severity="warning">
          아직 개발 중입니다...! <strong>카카오로 바로 시작해보세요!</strong>
        </Alert>
      )}

      <LocalLogin setLocal={setLocal} />
      <button className={styles.kakao_btn} onClick={onClickKakaoBtn}>
        <p>
          <Image className={styles.kakao_img} src={kakao_login} alt="" />
          <span> 카카오로 시작하기</span>
        </p>
      </button>

      {/* <div>
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
              </div> */}
    </div>
  )
}

export default LoginBox
