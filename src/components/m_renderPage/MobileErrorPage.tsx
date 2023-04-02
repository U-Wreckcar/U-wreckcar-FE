import React from "react"
import Image from "next/image"
import styles from "./mobile.module.css"
import msgImg from "assets/m_web.png"
import video from "assets/video/preview.mp4"
export default function MobileErrorPage() {
  return (
    <div className={styles.error_container}>
      <video
        className={styles.m_video}
        src='https://velog.velcdn.com/images/gcodaily/post/358c37f7-252a-44a6-a65a-374d030436a9/image.mp4'
        controls
        width='340'
        height='300'></video>
      <div>
        <Image src={msgImg} alt='error' width={320} height={160} />
        <h1>유렉카와 연결되었습니다!</h1>
        <p>
          유렉카는 웹 환경에 최적화 되어 있습니다
          <br></br>
          웹에서 다시 만나요!
        </p>
      </div>
    </div>
  )
}
