'use client';
import { findEmail, newPW, verifyEmailNum } from 'src/util/async/api';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import styles from './findPW.module.css';

type FindFormData = {
  email: string;
  emailNum: string;
  password: string;
  confirmPw: string;
};

export const FindPW = () => {
  const [emailNum, setEmailNum] = useState(0);
  const [email, setEmail] = useState('');
  const router = useRouter();

  const {
    register,
    setError,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm<FindFormData>({ criteriaMode: 'all', mode: 'onChange' });

  const onSubmit = async (data: FindFormData) => {
    const password = getValues('password');
    const passwordConfirm = getValues('confirmPw');
    if (password === passwordConfirm && emailNum === 2) {
      try {
        const res: any = await newPW({
          data: {
            email,
            password: data.password,
          },
        });
        if (res) {
          alert('비밀번호가 변경되셨습니다!');
          router.push('/login');
        }
      } catch (err) {
        console.log(err);
      }
    } else if (password !== passwordConfirm) {
      setError('confirmPw', { message: '비밀번호를 동일하게 적어주세요.' });
    } else if (emailNum === 0) {
      setError('email', { message: '이메일 인증번호발송을 해주세요.' });
    } else if (emailNum === 1) {
      setError('email', { message: '인증번호를 확인해주세요.' });
    }
  };
  //   이메일 인증 발송
  // 1. 이메일 인증에 실패했을 경우 -> 중복된 이메일 문구 -> catch문
  const emailConfirm = async () => {
    const emailValue = getValues('email');
    setEmail(emailValue);
    const emailRegex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    try {
      if (emailRegex.test(emailValue)) {
        const res = await findEmail({ data: { email: emailValue } });
        if (res?.status === 200) {
          setEmailNum(1);
        }
      } else {
        setError('email', { message: '이메일 형식을 확인해주세요.' });
      }
    } catch (err) {
      setError('email', { message: '존재하지 않는 이메일입니다.' });
    }
  };

  //인증번호 확인
  // 1. 이메일 인증번호와 틀린 경우 -> 이메일 인증 번호 확인 문구 -> if 문
  const confirmEmailNum = async () => {
    const emailNum = getValues('emailNum');
    try {
      const res = await verifyEmailNum({
        data: { email, verificationCode: emailNum },
      });
      if (res?.status === 200) {
        setEmailNum(2);
      }
    } catch (err) {
      setError('emailNum', { message: '이메일 인증번호를 확인해주세요.' });
    }
  };

  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2>비밀번호를 잊으셨나요?</h2>
          <p>이메일 인증을 통해 비밀번호를 재설정하세요.</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
          <div className={styles.wrap}>
            <label>이메일</label>
            <input
              type="email"
              className={styles.email_input}
              placeholder="가입하실 때 사용하신 이메일을 입력해주세요"
              {...register('email', {
                required: '이메일을 입력해주세요',
                minLength: {
                  value: 8,
                  message: '이메일을 8자 이상 작성해주세요',
                },
                maxLength: {
                  value: 30,
                  message: '이메일을 30자 이하로 작성해주세요',
                },
                pattern: {
                  value:
                    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/,
                  message: '이메일이 형식에 맞지 않습니다.',
                },
                disabled: emailNum !== 0 ? true : false,
              })}
            />
            <button
              className={styles.confirm_button}
              type="button"
              onClick={emailConfirm}
            >
              인증하기
            </button>
          </div>
          {errors.email && <p>{errors.email?.message}</p>}
          {emailNum === 1 && <span>인증번호 발송에 성공했습니다.</span>}

          <div className={styles.wrap}>
            <label>인증번호</label>
            <input
              type={'text'}
              className={styles.email_input}
              placeholder="이메일로 전송된 인증번호를 입력해주세요"
              {...register('emailNum', {
                required: '이메일로 전송된 인증번호를 입력해주세요.',
                disabled: emailNum > 1 ? true : false,
              })}
            />
            <button
              className={styles.confirm_button}
              type="button"
              onClick={confirmEmailNum}
            >
              인증확인
            </button>
          </div>
          {errors.emailNum && <p>{errors.emailNum?.message}</p>}
          {emailNum === 2 && <span>인증번호가 일치합니다.</span>}
          <div className={styles.wrap}>
            <label>새 비밀번호</label>
            <input
              className={styles.signup_input}
              type="password"
              placeholder="영문,숫자,특수문자 포함 8자 이상 20자 이하로 입력해주세요"
              {...register('password', {
                required: '비밀번호는 필수 입력입니다.',
                minLength: {
                  value: 8,
                  message: '비밀번호를 8자 이상 작성해주세요',
                },
                maxLength: {
                  value: 20,
                  message: '비밀번호를 20자 이하로 작성해주세요',
                },
                pattern: {
                  value:
                    /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/,
                  message: '비밀번호가 형식에 맞지 않습니다.',
                },
              })}
            />
          </div>
          {errors.password && <p>{errors.password?.message}</p>}
          <div className={styles.wrap}>
            <label>새 비밀번호 확인</label>
            <input
              className={styles.signup_input}
              type="password"
              placeholder="새로 사용할 비밀번호를 다시 입력해주세요"
              {...register('confirmPw', {
                required: '비밀번호 확인을 해주세요',
              })}
            />
          </div>
          {errors.confirmPw && <p>{errors.confirmPw?.message}</p>}
          <div className={styles.button_box}>
            <button
              onClick={() => (window.location.href = '/login')}
              type="button"
              className={styles.cancel_button}
            >
              취소
            </button>
            <button
              className={styles.find_button}
              type="submit"
              disabled={isSubmitting}
            >
              비밀번호 재설정
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
