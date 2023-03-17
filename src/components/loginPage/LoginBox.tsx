import Image from 'next/image';
import styles from './LoginBox.module.css';
import kakao_login from 'assets/kakao_login.png';
import naver_login from 'assets/naver_login.png';
import google_login from 'assets/google_login.png';
const LoginBox = () => {
  const kakaoUrl = `${process.env.NEXT_PUBLIC_API}/auth/kakao`;
  const onClickKakaoBtn = () => {
    window.location.href = kakaoUrl;
  };
  const onClickNaverBtn = () => {
    alert('개발중입니다..!');
  };

  const onClickGoogleBtn = () => {
    alert('개발중입니다...!');
  };
  return (
    <div className={styles.container}>
      <div>
        <h1 className={styles.title}>Login</h1>
        <p className={styles.content}>
          U렉카와 함께 쉽고 빠른 업무를 느껴보세요!
        </p>
      </div>
      <div>
        <div>
          {/* <Image src={kakao_login} alt="" width={20} height={20} /> */}
          <button className={styles.kakao_btn} onClick={onClickKakaoBtn}>
            카카오로 1초만에 시작하기
          </button>
        </div>
        <div>
          {/* <Image src={naver_login} alt="" width={20} height={20} /> */}
          <button className={styles.naver_btn} onClick={onClickNaverBtn}>
            네이버로 1초만에 시작하기
          </button>
        </div>
        <div>
          {/* <Image src={google_login} alt={''} width={40} height={40} /> */}
          <button className={styles.google_btn} onClick={onClickGoogleBtn}>
            구글로 1초만에 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
