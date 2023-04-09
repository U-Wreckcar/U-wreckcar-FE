import { localLogin, myProfile } from "@/util/async/api"
import { setClientHeaders } from "@/util/async/axiosConfig"
// import { setClientHeaders } from "@/util/async/axiosConfig"
import { getCookie, setCookie } from "@/util/async/Cookie"
import Link from "next/link"
import { redirect, useRouter } from "next/navigation"
import { usePathname } from "next/navigation"
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react"
import { useForm } from "react-hook-form"
import styles from "./LocalLogin.module.css"

interface LocalLoginProps {
  setLocal: Dispatch<SetStateAction<boolean>>
}

type LoginFormData = {
  email: string
  password: string
}

const LocalLogin: React.FC<LocalLoginProps> = ({ setLocal }) => {
  const router = useRouter()
  const pathName = usePathname()
  const [remember, setRemember] = useState(false)
  const [userId, setUserId] = useState("")
  const [change, setChanged] = useState<string | undefined>(undefined)
  const access_token = getCookie("access_token")
  const refresh_token = getCookie("refresh_token")
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
  const onSubmit =
    // useCallback(
    async (data: LoginFormData) => {
      try {
        const res = await localLogin({ data })
        // if (remember) {
        //   localStorage.setItem("userID", data.email)
        // }
        console.log("실행?")
        console.log(
          "login Token:",
          res.data.refresh_token,
          "userName",
          res.data.userData.username
        )

        setChanged(res.data)
        setCookie("access_token", res.data.access_token)
        setCookie("refresh_token", res.data.refresh_token)
        setClientHeaders(res.data.access_token, res.data.refresh_token)
        router.replace("/main")
        // window.location.reload()
      } catch (err) {
        setError("email", { message: "e-mail을 다시 확인해주세요" })
        setError("password", { message: "비밀번호를 다시 확인해주세요" })
      }
    }
  //   ,
  //   [
  //     pathName,
  //     remember,
  //     router,
  //     setError,
  //     setCookie,
  //     setClientHeaders,
  //     localLogin,
  //     change,
  //   ]
  // )
  // console.log(pathName)
  // useCallback(onSubmit, [usePathname])

  useEffect(() => {
    const id = localStorage.getItem("userID")
    const emailInput = document.getElementById("email")
    myProfile(access_token, refresh_token)
    setClientHeaders(access_token, refresh_token)
    if (id) {
      setUserId(id)
      setRemember(true)
      emailInput?.focus()
    }
  }, [access_token, change])

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className={styles.email_box}>
          <input
            id='email'
            className={`${errors.email ? styles.error : styles.input_style}`}
            placeholder='이메일을 입력해주세요.'
            defaultValue={userId}
            autoFocus
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
          {/* {errors.email && (
            <div className={styles.error_message}>{errors.email?.message}</div>
          )} */}
        </div>
        <div>
          <input
            className={`${errors.password ? styles.error : styles.input_style}`}
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
          {errors.password ? (
            <div className={styles.error_message}>
              {errors.password?.message}
            </div>
          ) : (
            <div className={styles.been_box} />
          )}
        </div>
        <div className={styles.option_box_containel}>
          <div className={styles.id_remember_box}>
            <input
              id='rememberId'
              type='checkbox'
              checked={remember}
              onChange={() => setRemember(!remember)}
            />
            <label htmlFor='rememberId'>아이디 저장</label>
          </div>
          <div className={styles.sign_up_password_forget_box}>
            <Link href={"/signup"}>
              <p className={styles.sign_up_text_style}>회원가입</p>
            </Link>
            <pre className={styles.pre_style}> | </pre>
            <Link href={"/find"}>
              <p className={styles.password_text_style}>
                비밀번호를 잊으셨나요?
              </p>
            </Link>
          </div>
        </div>
        <div>
          <button
            className={styles.login_button}
            type='submit'
            disabled={isSubmitting}>
            로그인
          </button>
        </div>
      </form>
    </div>
  )
}
export default LocalLogin
