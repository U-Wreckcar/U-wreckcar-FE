import React from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { m_section_one_two, sub_child, copyright } from "public/assets/img";
import { six, create, f_search, out } from "public/assets/gif";
import {
  sub_img,
  seven_img,
  bg_six_one,
  bg_six_two,
  bg_two_left,
  bg_two_right,
  bg_six_three,
  seven_sub_img,
  bg_one_illust,
  seven_button,
} from "public/assets/render/index";

export default function HomeSeven() {
  return (
    <div>
      {" "}
      <section className={styles.section_seven}>
        <article>
          <h1>지금 바로 시작해보세요!</h1>
          <Image className={styles.seven_first_img} src={seven_img} alt="Img" />
          <Image className={styles.seven_sub_img} src={seven_sub_img} alt="Img" />
          <Link prefetch={false} className={styles.origin_seven_button} href={"/login"}>
            <Image id="start_btn" className={styles.seven_button_img} src={seven_button} alt="img" />
          </Link>
          <Link prefetch={false} href={"/webonly"}>
            <button className={styles.m_seven_button}>더 많은 기능 보러가기</button>
          </Link>
        </article>
      </section>
    </div>
  );
}
