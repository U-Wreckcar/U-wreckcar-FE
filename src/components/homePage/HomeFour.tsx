import React from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import { f_search } from "public/assets/gif";
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

export default function HomeFour() {
  return (
    <section className={styles.l_section_four}>
      <article>
        <p className={styles.m_four_context}>
          생성 날짜, 파라미터값은 물론 메모까지! 원하는 요
          <br /> 소 입력과 동시에 필터링된 데이터가 보여집니다.
          <br />
          검색한 UTM 결과를 다양하게 활용해보세요.
        </p>
        <div className={styles.four_img}>
          <Image src={f_search} alt="Gif" />
        </div>
        <div className={styles.text_box}>
          <p className={styles.sub_title}>필요한 UTM만 바로바로 필터링</p>
          <h1>내가 원하는 UTM들만</h1>
          <h2>쏙쏙 뽑아보세요!</h2>
          <p className={styles.context}>
            생성 날짜, 파라미터값은 물론 메모까지!
            <br />
            원하는 요소 입력과 동시에 필터링된 데이터가 보여집니다.
            <br />
            검색한 UTM 결과를 다양하게 활용해보세요.
          </p>
        </div>
      </article>
    </section>
  );
}
