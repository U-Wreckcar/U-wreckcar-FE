import React from "react"
import styles from "./renderModal.module.css"
import ReactModal from "react-modal"
import close from "assets/b_close.png"
import Image from "next/image"
import Link from "next/link"

type RenderModalType = {
  isOpen: boolean
  onRequestClose: any
}

const RenderModal: React.FC<RenderModalType> = ({ isOpen, onRequestClose }) => {
  const style = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
    },
  }
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div className={styles.container}>
        <button className={styles.close_button} onClick={onRequestClose}>
          <Image src={close} alt="close" width={32} height={32} />
        </button>
        <h1>
          설문조사 참여하고 <br></br> 백화점 상품권 받아가세요!
        </h1>
        <div>
          <p>유렉카를 사용해 보시고 설문에 성실하게 참여하시는 분들을</p>
          <p>대상으로 추첨을 통해 푸짐한 상품을 드립니다.</p>
        </div>
        <div>
          <p>1등: 백화점 상품권 5만원권 2인</p>
          <p>2등: 치킨 기프티콘 3인</p>
          <p>3등: 스타벅스 기프티콘 10인</p>
        </div>
        <div>
          <p>참여 기간: 2023년 4월 5일까지</p>
        </div>
        <div>
          <p>여러분의 소중한 피드백을 바탕으로</p>
          <p>더욱 더 편리한 유렉카가 되겠습니다. </p>
        </div>
        <Link
          href={
            "https://docs.google.com/forms/d/e/1FAIpQLSc9YT3SIVC6ARWONo5DZSd4CN4TD68E-dXCwAJcAitOWWSnuw/viewform"
          }
        >
          <button>설문조사 참여하러 가기</button>
        </Link>
      </div>
    </ReactModal>
  )
}
export default RenderModal
