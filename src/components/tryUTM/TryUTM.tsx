"use client"
import { BlueButton } from "@/src/common/button/blue_button/BlueButton"
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
        <h1 className={styles.origin_title}>
          유렉카의 놀라운 기능을 미리 체험해보세요!
        </h1>
        <h1 className={styles.m_title}>유렉카의 놀라운 기능을</h1>
        <h2 className={styles.m_title_sub}>미리 체험해보세요</h2>
      </div>
      <div className={styles.try_section}>
        <div className={styles.add_utm_box_article}>
          <p className={styles.add_utm_text}>
            이미 만들어져 있는 UTM을 추가한다면?
          </p>
          <div className={styles.left_box}>
            <p className={styles.m_text}>
              이미 만들어져 있는 UTM을 추가한다면?
            </p>
            <p className={styles.left_title}>기존 UTM 추가하기</p>
            <p className={styles.left_content}>
              추가하기 버튼을 클릭해서 UTM을 저장해보세요!
            </p>

            <div className={styles.textarea}>
              {" "}
              https://www.utm.works?utm_source=google&utm_medium=cpc&utm_campaign=u
              <br />
              wreker_close_beta&utm_content=1st&utm_term=GA&utm_i
              <br />
              d=20230312_UCB
            </div>

            <BlueButton
              text={"추가하기"}
              confirmFN={addUTMHandler}
              size={"sm"}
              color={"full"}
              types={"button"}
            />
          </div>
        </div>
        <div className={styles.right_section}>
          <p className={styles.get_artcle_title}>
            파라미터 별로 구분되어 자동으로 저장!
          </p>
          <div className={styles.right_box}>
            <p className={styles.m_text_right}>
              파라미터 별로 구분되어 자동으로 저장!
            </p>
            <div className={styles.list_utm_box}>
              {utmdata.map((utm, idx) => (
                <div key={idx}>
                  <div className={styles.get_utm}>
                    <p className={styles.item_name}>{utm.itemName}</p>
                    <div className={styles.items_style}>
                      {show && <p className={styles.any}> {utm.item}</p>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
