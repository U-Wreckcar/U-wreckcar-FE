import React from "react"
import styles from "./styles.module.css"
import Link from "next/link"
import { useRouter } from "next/router"
import Image from "next/image"
import whitelogo from "assets/whitelogo.png"
export const RenderHeader = () => {
  const onClickNoti = () => {
    window.open(
      " https://unexpected-ceder-0b7.notion.site/11f8741947a441e5822fd8723ef48492",
      "_blank"
    )
  }

  const onClickGuide = () => {
    window.open(
      "https://unexpected-ceder-0b7.notion.site/0a3db0d8103f4be2855a23186fc1b5e3",
      "_blank"
    )
  }

  return (
    <nav className={styles.render_nav}>
      <div className={styles.render_nav_left}>
        <div className={styles.render_nav_left_img}>
          <Link href={"/"}>
            <Image src={whitelogo} alt="LOGO" width={108.15} height={40} />
          </Link>
        </div>
        <div className={styles.render_nav_left_noti} onClick={onClickNoti}>
          공지사항
        </div>
        <div className={styles.render_nav_left_guide} onClick={onClickGuide}>
          가이드
        </div>
      </div>
      <div className={styles.render_user_box}>
        <Link href={"/login"} as={"/login"}>
          <p id="render_login_btn">로그인</p>
        </Link>
        {/* <Link href={"/signup"} as={"/signup"}>
          <p id="render_login_btn">회원가입</p>
        </Link> */}
      </div>
    </nav>
  )
}
