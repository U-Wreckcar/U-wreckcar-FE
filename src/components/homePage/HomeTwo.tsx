import React from "react";
import styles from "./Home.module.css";
import Image from "next/image";

import { bg_two_left, bg_two_right } from "public/assets/render/index";

export default function HomeTwo() {
  return (
    <div>
      <section className={styles.l_section_two}>
        <article>
          <div className={styles.text_box}>
            <p>1분 1초가 아쉬운 마케터 주목!</p>
            <h1>UTM 업무에 아직도 많은 시간을 낭비하고 있나요?</h1>
            <h2>유렉카가 여러분의 업무 시간들 줄여드릴게요!</h2>
          </div>
          <div className={styles.m_two_text_box}>
            {/* <p>1분 1초가 아쉬운 마케터 주목!</p> */}
            <h1>
              UTM 업무에 아직도 <br />
              많은 시간을 낭비하고 있나요?
            </h1>
            <h2>유렉카가 여러분의 업무 시간들 줄여드릴게요!</h2>
          </div>
        </article>
        <article>
          <div className={styles.section_two_img}>
            <Image src={bg_two_left} alt="Left_img" />
          </div>
          <div className={styles.section_two_img}>
            <Image src={bg_two_right} alt="Right_img" />
          </div>
        </article>
      </section>
    </div>
  );
}
