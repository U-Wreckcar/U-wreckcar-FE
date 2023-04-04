"use client"
import { BlueButton } from "@/shared/button/BlueButton"
import React, { useState } from "react"
import styles from "./TryUTM.module.css"
import { utmdata } from "./tryUTMData"
export default function TryUtm() {
  const [show, setShow] = useState(false)
  const addUTMHandler = () => {
    setShow(true)
  }
  return (
    <div className={styles.containel}>
      <div className={styles.title_box}>
        <p>유렉카 기능 알아보기</p>
        <h1>유렉카의 놀라운 기능을 미리 체험해보세요!</h1>
      </div>
      <div className={styles.try_section}>
        <div className={styles.add_utm_box_article}>
          <p className={styles.add_utm_text}>
            이미 만들어져 있는 UTM을 추가한다면?
          </p>
          <textarea
            className={styles.textarea}
            value={
              "https://www.utm.works?utm_source=google&utm_medium=cpc&utm_campaign=uwreker_close_beta&utm_content=1st&utm_term=GA&utm_id=20230312_UCB"
            }
          />
          <BlueButton
            text={"추가하기"}
            x={84}
            y={38}
            confirmFN={addUTMHandler}
          />
        </div>
        <div className={styles.get_utm_article}>
          {show && (
            <>
              <p className={styles.get_artcle_title}>
                파라미터 별로 구분되어 자동으로 저장!
              </p>
              {utmdata.map((utm, idx) => (
                <div key={idx} className={styles.get_utm}>
                  <p className={styles.item_name}>{utm.itemName}</p>
                  <div className={styles.items_style}>{utm.item}</div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  )
}
