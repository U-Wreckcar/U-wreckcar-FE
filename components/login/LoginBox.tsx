import styles from './LoginBox.module.css';

const LoginBox = () => {
  const kakaoUrl = 'https://5034-14-6-160-238.jp.ngrok.io/auth/kakao';
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
          <img />
          <button className={styles.kakao_btn} onClick={onClickKakaoBtn}>
            카카오로 1초만에 시작하기
          </button>
        </div>
        <div>
          <img />
          <button className={styles.naver_btn} onClick={onClickNaverBtn}>
            네이버로 1초만에 시작하기
          </button>
        </div>
        <div>
          <img />
          <button className={styles.google_btn} onClick={onClickGoogleBtn}>
            구글로 1초만에 시작하기
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginBox;
