import Modal from "@/src/common/type/Modal";
import styles from "./loginModal.module.css";
export const customStyles = {
  content: {
    top: "55%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0,
  },
};
const LoginModal = ({ isOpen, onRequestClose }: any) => {
  const secondContent = `유렉카를 처음 이용하시는 고객께서는\n이메일 회원가입을 이용해주시면 감사하겠습니다\n다만 기존 고객님들은 카카오로 로그인하기로`;

  const onClickNoti = () => {
    window.open("https://open.kakao.com/o/sbK3Rfaf", "_blank");
  };

  return (
    <>
      <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
        <div className={styles.modal_container}>
          <div className={styles.underLine}>
            {/* <h4>안내</h4> */}
            <h4 style={{ color: "red" }}>카카오 로그인 관련 이슈 안내</h4>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className={styles.modal_wrap}>
            <div>
              <p>안녕하세요. TEAM 유렉카입니다</p>

              <p>유렉카의 로그인 방식이 로컬 로그인으로 통일되어 현재 카카오 계정 유저분들의 로그인이 불가능한</p>

              <p>이슈가 있습니다. 유렉카 오픈 채팅을 통해 카카오 이메일 보내주시면 최대한 빠른 시일 내에 로컬 로</p>
              <p>그인이 가능하도록 변환해드리도록 하겠습니다.</p>
              <p>불편함을 드려 죄송합니다. 감사합니다.</p>
              {/* <h3 style={{ textAlign: "center", margin: "40px 40px 70px 0" }}>- TEAM 유렉카 -</h3> */}
            </div>
            {/* <div>
            <h2 className={styles.modal_title}>회원가입 방식 변경 안내</h2>
          </div>
          <div>
            <p>유렉카의 회원가입 방식을 이메일 회원가입으로 변경함에 따라</p>
            <span>현재 카카오톡으로 회원가입은 할 수 없습니다.</span>
          </div>
          <div>
            <p>{secondContent}</p>
            <span>그대로 로그인하여 서비스를 이용하실 수 있습니다</span>
          </div>
          <div>
            <p>자세한 사항은 공지사항 확인 부탁드립니다.</p>
          </div> */}

            <div className={styles.button_box}>
              <button className={styles.confirm_button} onClick={onClickNoti}>
                문의하기
              </button>
              <button className={styles.noti_button} onClick={onRequestClose}>
                팝업닫기
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default LoginModal;
