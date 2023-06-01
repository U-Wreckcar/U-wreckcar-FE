"use client";
import { BlueButton } from "@/src/common/button/blue_button/BlueButton";
import { confirmEmail, signUp, verifyEmailNum } from "src/util/async/api";

import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./signup.module.css";

type FormData = {
  email: string;
  emailNum: string;
  phone_no: number;
  username: string | number;
  password: string;
  company_name: string;
  confirmPw: string;
  marketing_accept: boolean;
};

export default function SignUp() {
  const [emailNum, setEmailNum] = useState(0);
  const [confirmNum, setConfirmNum] = useState("");
  const [email, setEmail] = useState("");
  const router = useRouter();

  // 이미 로그인 한 사람은 메인으로
  // useEffect(() => {
  //   const cookie = getCookie("access_token")
  //   if (cookie) {
  //     router.push("/main")
  //   }
  // }, [])

  const {
    register,
    setError,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FormData>({ criteriaMode: "all", mode: "onChange" });

  //   이메일 인증 발송
  // 1. 이메일 인증에 실패했을 경우 -> 중복된 이메일 문구 -> catch문
  const emailConfirm = async () => {
    const emailValue = getValues("email");
    setEmail(emailValue);
    const emailRegex = new RegExp("[a-z0-9]+@[a-z]+.[a-z]{2,3}");

    if (emailRegex.test(emailValue)) {
      const res = await confirmEmail({ data: { email: emailValue } });
      if (res?.data.result.success === true) {
        setEmailNum(1);
      } else if (res?.data.result.success === false) {
        setError("email", { message: "중복된 이메일은 사용하실 수 없습니다." });
      }
    } else {
      setError("email", { message: "이메일을 확인해주세요." });
    }
  };

  //인증번호 확인
  // 1. 이메일 인증번호와 틀린 경우 -> 이메일 인증 번호 확인 문구 -> if 문
  const confirmEmailNum = async () => {
    const emailNum = getValues("emailNum");
    try {
      const res = await verifyEmailNum({
        data: { email, verificationCode: emailNum },
      });
      if (res?.status === 200) {
        setEmailNum(2);
      }
    } catch (err) {
      setError("emailNum", { message: "이메일 인증번호를 확인해주세요." });
    }
  };

  // 회원가입
  //1. if문으로 비밀번호와 비밀번호 확인 로직 -> 다른 경우 else로 넘어감
  //2. 완료 후 로그인페이지로
  const onSubmit = async (data: FormData) => {
    const password = getValues("password");
    const passwordConfirm = getValues("confirmPw");
    if (password === passwordConfirm && emailNum === 2) {
      try {
        const res: any = await signUp({
          data: {
            email,
            company: data.company_name,
            isMarketing: data.marketing_accept,
            password: data.password,
            name: data.username,
          },
        });
        if (res) {
          alert("유렉카의 회원이 되신 걸 환영합니다!");
          router.push("/login");
        }
      } catch (err) {
        console.log(err);
      }
    } else if (password !== passwordConfirm) {
      setError("confirmPw", { message: "비밀번호를 동일하게 적어주세요." });
    } else if (emailNum === 0) {
      setError("email", { message: "이메일 인증번호발송을 해주세요." });
    } else if (emailNum === 1) {
      setError("email", { message: "인증번호를 확인해주세요." });
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <h1>회원가입</h1>
        <h4>반갑습니다! 유렉카의 새로운 회원님!</h4>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.wrap}>
            <h5>이메일</h5>
            <input
              type="email"
              className={styles.email_input}
              placeholder="사용하실 이메일을 입력해주세요"
              {...register("email", {
                required: "이메일 주소를 입력해주세요.",
                minLength: {
                  value: 8,
                  message: "이메일을 8자 이상 작성해주세요",
                },
                maxLength: {
                  value: 30,
                  message: "이메일을 30자 이하로 작성해주세요",
                },
                pattern: {
                  value: /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                  message: "이메일이 형식에 맞지 않습니다.",
                },
                disabled: emailNum !== 0 ? true : false,
              })}
            />
            <BlueButton size={"sm"} color={"full"} text={"인증하기"} types={"button"} clickEvent={emailConfirm} />
          </div>
          {errors.email && <p>{errors.email?.message}</p>}
          {emailNum === 1 && <span>인증번호 발송에 성공했습니다.</span>}
          <div className={styles.wrap}>
            <h5>인증번호</h5>
            <input
              type={"text"}
              className={styles.confirm_input}
              placeholder="받으신 이메일 인증번호를 입력해주세요"
              {...register("emailNum", {
                required: "이메일 인증번호를 입력해주세요.",
                disabled: emailNum === 0 || emailNum > 1 ? true : false,
              })}
            />

            <BlueButton text={"인증하기"} types={"button"} color={"full"} size={"sm"} clickEvent={confirmEmailNum} />
          </div>
          {errors.emailNum && <p>{errors.emailNum?.message}</p>}
          {emailNum === 2 && <span>인증번호가 일치합니다.</span>}
          <div className={styles.wrap}>
            <h5>이름</h5>
            <input
              type="text"
              className={styles.signup_input}
              placeholder="성함을 입력해주세요"
              {...register("username", {
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
          {errors.username && <p>{errors.username?.message}</p>}
          <div className={styles.wrap}>
            <h5>비밀번호</h5>
            <input
              className={styles.signup_input}
              type="password"
              placeholder="영문,숫자,특수문자 포함 8자 이상 20자 이하로 입력해주세요."
              {...register("password", {
                required: "비밀번호를 입력해주세요",
                minLength: {
                  value: 8,
                  message: "비밀번호를 8자 이상 작성해주세요",
                },
                maxLength: {
                  value: 20,
                  message: "비밀번호를 20자 이하로 작성해주세요",
                },
                pattern: {
                  value: /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                  message: "비밀번호가 형식에 맞지 않습니다.",
                },
              })}
            />
          </div>
          {errors.password && <p>{errors.password?.message}</p>}
          <div className={styles.wrap}>
            <h5>비밀번호 확인</h5>
            <input
              className={styles.signup_input}
              type="password"
              placeholder="비밀번호를 다시 입력해주세요"
              {...register("confirmPw", {
                required: "비밀번호 확인을 해주세요",
              })}
            />
          </div>
          {errors.confirmPw && <p>{errors.confirmPw?.message}</p>}
          <div className={styles.wrap}>
            <h5>회사 이름</h5>
            <input
              className={styles.signup_input}
              placeholder="회사이름을 입력해주세요"
              {...register("company_name", {
                required: "회사이름을 입력해주세요",
              })}
            />
          </div>
          {errors.company_name && <p>{errors.company_name?.message}</p>}

          <div className={styles.check_wrap}>
            <h5>이용약관 동의</h5>
            <label className={styles.confirm_label} style={{ cursor: "pointer" }}>
              <input
                className={styles.check_input}
                type="checkbox"
                {...register("marketing_accept", {
                  required: "마케팅 활용에 동의 해주세요",
                })}
              />
              유렉카의 개인정보 처리 방침에 동의합니다.
            </label>
            <div
              className={styles.noti}
              style={{ cursor: "pointer" }}
              onClick={() => window.open("https://unexpected-ceder-0b7.notion.site/567d742a0cac4441991e88ac540c659e")}
            ></div>
          </div>
          {errors.marketing_accept && <p>{errors.marketing_accept?.message}</p>}
          <div className={styles.button_box}>
            <BlueButton text={"회원가입"} types={"submit"} size={"md"} color={"full"} clickEvent={confirmEmailNum} />
          </div>
        </form>
      </div>
    </div>
  );
}
