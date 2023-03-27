"use client"
import { confirmEmail, signUp } from "@/util/async/api"
import { getCookie } from "@/util/async/Cookie"
import Link from "next/link"
import { redirect } from "next/navigation"
import React, { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import styles from "./signup.module.css"

type FormData = {
  email: string
  emailNum: string
  phone_no: number
  userName: string | number
  password: string
  company_name: string
  confirmPw: string
}

export default function SignUp() {
  const [emailNum, setEmailNum] = useState(0)
  const [confirmNum, setConfirmNum] = useState("")

  //이미 로그인 한 사람은 메인으로
  //   useEffect(() => {
  //     const cookie = getCookie("access_token")
  //     if (cookie) {
  //       redirect("/main")
  //     }
  //   }, [])

  const {
    register,
    setError,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({ criteriaMode: "all", mode: "onChange" })

  //   이메일 인증 발송
  // 1. 이메일 인증에 실패했을 경우 -> 중복된 이메일 문구 -> catch문
  // 2. 이메일 인증번호와 틀린 경우 -> 이메일 인증 번호 확인 문구 -> try 내 if 문
  const emailConfirm = async () => {
    const email = getValues("email")

    try {
      const res = await confirmEmail({ data: { email: email } })
      console.log(res.data.verificationCode)
      setConfirmNum(res.data.verificationCode)
      setEmailNum(1)
    } catch (err) {
      setError("email", { message: "중복된 이메일은 사용하실 수 없습니다." })
    }
  }

  //인증번호 확인
  const confirmEmailNum = async () => {
    const emailNum = await getValues("emailNum")
    if (emailNum === confirmNum) {
      setEmailNum(2)
    } else {
      setError("emailNum", { message: "이메일 인증번호를 확인해주세요." })
    }
  }

  //    회원가입
  // 완료 후 로그인페이지로
  const onSubmit = (data: FormData) => {
    const email = getValues("email")
    const password = getValues("password")
    const passwordConfirm = getValues("confirmPw")
    const username = getValues("userName")
    const company_name = getValues("company_name")
    if (password === passwordConfirm) {
      try {
        const data = {
          email,
          username,
          password,
          company_name,
          marketing_accept: true,
        }
        signUp({ data })
        redirect("/login")
      } catch (err) {
        console.log(err)
      }
    } else {
      setError("confirmPw", { message: "비밀번호를 동일하게 적어주세요." })
    }
  }

  return (
    <div className={styles.container}>
      <h1>유렉카 회원가입</h1>
      <h4>반갑습니다! 유렉카의 새로운 회원님!</h4>
      <form onSubmit={handleSubmit(onSubmit)}>
        {emailNum === 0 && (
          <>
            {errors.email && <p>{errors.email?.message}</p>}
            <div className={styles.wrap}>
              <label>E-mail</label>
              <input
                placeholder="사용하실 이메일을 입력해주세요"
                {...register("email", {
                  required: "이메일은 필수 입력입니다.",
                  minLength: {
                    value: 8,
                    message: "이메일을 8자 이상 작성해주세요",
                  },
                  maxLength: {
                    value: 30,
                    message: "이메일을 30자 이하로 작성해주세요",
                  },
                  pattern: {
                    value:
                      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                    message: "이메일이 형식에 맞지 않습니다.",
                  },
                })}
              />
            </div>

            <button type="button" onClick={emailConfirm}>
              인증번호 발송
            </button>
          </>
        )}
        {emailNum === 1 && (
          <>
            {errors.emailNum && <p>{errors.emailNum?.message}</p>}
            <div className={styles.wrap}>
              <label>E-mail 인증번호</label>
              <input
                placeholder="받으신 이메일 인증번호를 입력해주세요"
                {...register("emailNum", {
                  required: "이메일 인증번호를 입력해주세요.",
                })}
              />
            </div>
            <button type="button" onClick={confirmEmailNum}>
              인증번호 확인
            </button>
          </>
        )}
        {emailNum === 2 && (
          <>
            {/* {errors.phone_no && <p>{errors.phone_no?.message}</p>}
            <div className={styles.wrap}>
              <label>전화번호</label>
              <input
                placeholder="-를 제외한 숫자만 입력해주세요"
                {...register("phone_no", {
                  required: "전화번호를 입력해주세요",
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "전화번호를 숫자로만 작성해주세요",
                  },
                })}
              />
            </div> */}
            {errors.userName && <p>{errors.userName?.message}</p>}
            <div className={styles.wrap}>
              <label>이름</label>
              <input
                placeholder="성함을 입력해주세요"
                {...register("userName", {
                  required: "성함을 입력해주세요",
                  minLength: {
                    value: 1,
                    message: "성함을 1자 이상 작성해주세요",
                  },
                  maxLength: {
                    value: 16,
                    message: "성함을 16자 이하로 작성해주세요",
                  },
                })}
              />
            </div>
            {errors.password && <p>{errors.password?.message}</p>}
            <div className={styles.wrap}>
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="영문,숫자,특수문자 포함 8자 이상 20자 이하"
                {...register("password", {
                  required: "비밀번호는 필수 입력입니다.",
                  minLength: {
                    value: 8,
                    message: "비밀번호를 8자 이상 작성해주세요",
                  },
                  maxLength: {
                    value: 20,
                    message: "비밀번호를 20자 이하로 작성해주세요",
                  },
                  pattern: {
                    value:
                      /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                    message: "비밀번호가 형식에 맞지 않습니다.",
                  },
                })}
              />
            </div>
            {errors.confirmPw && <p>{errors.confirmPw?.message}</p>}
            <div className={styles.wrap}>
              <label>비밀번호 확인</label>
              <input
                type="password"
                placeholder="비밀번호를 다시 입력해주세요"
                {...register("confirmPw", {
                  required: "비밀번호 확인을 해주세요",
                })}
              />
            </div>
            {errors.company_name && <p>{errors.company_name?.message}</p>}
            <div className={styles.wrap}>
              <label>회사이름</label>
              <input
                placeholder="회사이름을 입력해주세요"
                {...register("company_name", {
                  required: "회사이름을 입력해주세요",
                })}
              />
            </div>
            <button type="submit" disabled={isSubmitting}>
              회원가입
            </button>
          </>
        )}
      </form>
      <div className={styles.login}>
        <span>이미 유렉카의 회원이신가요?</span>
        <Link href={"/login"}>
          <button>로그인</button>
        </Link>
      </div>
    </div>
  )
}
