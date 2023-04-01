import React from "react"
import Image from "next/image"
import styles from "./mobile.module.css"

import msgImg from "assets/m_web.png"

export default function MobileErrorPage() {
  return (
    <div className={styles.error_container}>
      <Image src={msgImg} alt="error" width={320} height={160} />
      <h1>유렉카와 연결되었습니다!</h1>
      <p>
        유렉카는 웹 환경에 최적화 되어 있습니다
        <br></br>
        웹에서 다시 만나요!
      </p>
      {/* <video src="../../assets/m_video.mp4"></video> */}
    </div>
  )
}
