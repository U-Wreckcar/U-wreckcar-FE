"use client"
import { BlueButton } from "@/shared/button/BlueButton"
import React from "react"
import styles from "./TryUTM.module.css"
export default function TryUtm() {
  const addUTMHandler = () => {}
  return (
    <div className={styles.containel}>
      <div className={styles.title_box}>
        <p>유렉카 기능 알아보기</p>
        <h1>유렉카의 놀라운 기능을 미리 체험해보세요!</h1>
      </div>
      <div className={styles.try_section}>
        <article className={styles.add_utm_box}>
          <p className={styles.add_utm_text}>
            이미 만들어져 있는 UTM을 추가한다면?
          </p>
          <textarea className={styles.textarea} />
          <BlueButton
            text={"추가하기"}
            x={84}
            y={38}
            confirmFN={addUTMHandler}
          />
        </article>
        <div className={styles.direction_right}></div>
        <div className={styles.direction_left}></div>
        <article></article>
      </div>
    </div>
  )
}
