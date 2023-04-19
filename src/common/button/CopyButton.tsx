"use client"
import React, { useEffect, useState } from "react"
import Image from "next/image"
import check from "assets/icons.png"
import styles from "./copy.module.css"
import Alert from "./Alert"
import { BlueButton } from "./blue_button/BlueButton"

type CopyButtonProps = {
  text: string
}

//style 속성 프롭스 no

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [alert, setAlert] = useState(false)

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false)
      }, 3000)
    }
  }, [alert])

  const onClickCopyBtn = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setAlert(true)
      })
    }
  }
  return (
    <>
      {alert && (
        <Alert
          title={"성공"}
          contents={"UTM이 복사되었습니다!"}
          onClickEvent={setAlert}
        />
      )}
      {/* <button
        id='copy_btn'
        className={styles.copy_button}
        onClick={onClickCopyBtn}>
        복사하기
      </button> */}
      <BlueButton
        text={"복사하기"}
        types={"button"}
        color={"tp"}
        size={"sm"}
        clickEvent={onClickCopyBtn}></BlueButton>
    </>
  )
}
