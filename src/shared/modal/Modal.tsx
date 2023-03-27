import React, { useState } from "react"
import styles from "./modal.module.css"
import b_close from "assets/b_close.png"

type PropsType = {
  isCancle?: boolean
  buttonName?: string
  cancleButtonName?: string
  confirmButtonName?: string
  modalTitle?: string
  context?: string
  contextSeconde?: string
  confirmButtonHanlder?: () => void
  childComponent?: any
  x: number
  y: number
  setNoti: any
}

export const Modal: React.FC<PropsType> = ({
  confirmButtonName,
  context,
  contextSeconde,
  modalTitle,
  confirmButtonHanlder,
  childComponent,
  x,
  y,
  setNoti,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const modalHandler = () => {
    setIsOpen(!isOpen)
  }
  return (
    <form
      method='dialog'
      className={styles.container}
      style={{ width: `${x}px`, height: `${y}px`, backgroundColor: "white" }}>
      <div className={styles.header}>
        <div className={styles.title_box}>
          <span className={styles.title}>{modalTitle}</span>
        </div>
      </div>
      <div className={styles.contents}>
        <div>
          <h5
            style={{
              whiteSpace: "pre-line",
              fontWeight: "400",
              marginTop: "25px",
            }}>
            {context}
          </h5>
          <p style={{ color: "red", fontSize: "10px", lineHeight: "50px" }}>
            {contextSeconde}
          </p>
        </div>
        <div>{childComponent}</div>
      </div>
      <div className={styles.bottom}>
        <button
          className={styles.modal_button}
          id='confirmBtn'
          value='default'
          onClick={() => {
            setNoti(false)
            // confirmButtonHanlder()
          }}>
          {confirmButtonName}
        </button>
      </div>
    </form>
  )
}
