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
    window.open(" https://unexpected-ceder-0b7.notion.site/11f8741947a441e5822fd8723ef48492", "_blank");
  };

  return (
    <Modal isOpen={isOpen} style={customStyles} onRequestClose={onRequestClose}>
      <div className={styles.modal_container}>
        <div className={styles.underLine}>
          {/* <h4>안내</h4> */}
          <h4 style={{ color: "red" }}>긴급 공지</h4>
        </div>
        <div className={styles.modal_wrap}>
          <div style={{ marginTop: "70px" }}>
            <p>서버 이슈로 인하여 현재 유렉카 서비스가 정상적으로 운영</p>
            <p>되지 않고 있습니다. 필요한 UTM목록이 있거나 기타 문의사항은</p>
            <p>오픈채팅으로 연락주시면 빠르게 대처해드리도록 하겠습니다.</p>
            <p>서비스 이용에 불편함을 드려 죄송합니다.</p>
            <h3 style={{ textAlign: "center", margin: "40px 40px 70px 0" }}>- TEAM 유렉카 -</h3>
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
            <button className={styles.noti_button} onClick={onClickNoti}>
              공지사항 보기
            </button>
            <button className={styles.confirm_button} onClick={onRequestClose}>
              확인
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default LoginModal;
