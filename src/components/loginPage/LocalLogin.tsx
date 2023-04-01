import { localLogin } from "@/util/async/api"
import { setClientHeaders } from "@/util/async/axiosConfig"
import { setCookie } from "@/util/async/Cookie"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import React, { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import styles from "./LoginBox.module.css"

type LocalLoginProps = {
  setLocal: Dispatch<SetStateAction<boolean>>
}

type LoginFormData = {
  email: string
  password: string
}

const LocalLogin: React.FC<LocalLoginProps> = ({ setLocal }) => {
  const router = useRouter()

  const {
    register,
    setError,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<LoginFormData>({ criteriaMode: "all", mode: "onChange" })

  //    로그인
  // 완료 후 쿠키에 토큰 값 담기
  // 메인페이지로 이동하기
  const onSubmit = async (data: LoginFormData) => {
    try {
      const res = await localLogin({ data })

      setCookie("refresh_token", res.data.refresh_token)
      setClientHeaders(res.data.refresh_token)
      router.push("/main")
    } catch (err) {
      setError("email", { message: "e-mail을 다시 확인해주세요" })
      setError("password", { message: "비밀번호를 다시 확인해주세요" })
    }
  }

  return (
    <div className={styles.local_container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {errors.email && <h6>{errors.email?.message}</h6>}
          <label>E-mail</label>
          <input
            placeholder='E-mail을 입력해주세요'
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
        <div>
          {errors.password && <h6>{errors.password?.message}</h6>}
          <label className={styles.pw_input}>PW</label>
          <input
            type='password'
            placeholder='비밀번호를 입력해주세요'
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
        <div>
          <button type='submit' disabled={isSubmitting}>
            로그인
          </button>
        </div>
      </form>
      <div className={styles.signup_wrap}>
        <div className={styles.signup}>
          <span>유렉카의 회원이 아니시라면?</span>
          <Link href={"/signup"}>
            <button>회원가입</button>
          </Link>
        </div>
        <div className={styles.signup}>
          <span>유렉카 1초만에 시작하기</span>
          <button onClick={() => setLocal(false)}>소셜 로그인 하러 가기</button>
        </div>
      </div>
    </div>
  )
}
export default LocalLogin
