import Modal from "@/app/Modal"
import React, { useState } from "react"
import Image from "next/image"
import { ModalType } from "./AddUtmModal"
import styles from "./ExcelAddModal.module.css"
import helpImg from "assets/blue_help.png"
import helpMsgImg from "assets/excel_help.png"
import downloader from "assets/e_download.png"
import drag from "assets/e_drag.png"
import dragBox from "assets/e_drag_box.png"

export const ExcelAddModal: React.FC<ModalType> = ({
  isOpen,
  onRequestClose,
  style,
}) => {
  const [helpMsg, setHelpMsg] = useState(false)

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div className={styles.add_modal}>
        <div className={styles.title_box}>
          <h1>엑셀파일로 추가하기</h1>
          <Image
            src={helpImg}
            alt=""
            width={16}
            height={16}
            onMouseEnter={() => setHelpMsg(true)}
            onMouseLeave={() => setHelpMsg(false)}
          />
        </div>
        {helpMsg && (
          <Image
            className={styles.help_msg_img}
            src={helpMsgImg}
            alt=""
            width={300}
            height={140}
          />
        )}
        <div className={styles.sub_title}>
          <span>
            유렉카 엑셀 양식에 맞춰 UTM 리스트 파일을 등록하면
            <br></br>
            자동으로 파라미터 값이 분류되어 추가됩니다.
          </span>
        </div>
        <div className={styles.modal_footer_box}>
          <div>
            <Image src={downloader} alt="" width={86} height={28} />
          </div>
          <div className={styles.footer_drag_box}>
            <Image src={dragBox} alt="" width={730} height={60} />
            <Image
              className={styles.footer_drag_box_content}
              src={drag}
              alt=""
              width={300}
              height={24}
            />
          </div>
          <button id="add_btn" className={styles.add_button}>
            추가하기
          </button>
        </div>
      </div>
    </Modal>
  )
}
