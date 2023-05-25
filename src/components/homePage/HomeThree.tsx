import React from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import { create } from "public/assets/gif";
export default function HomeThree() {
  return (
    <section className={styles.section_three}>
      <article>
        <div className={styles.text_box}>
          <p className={styles.blue_text}>이미 만들어 둔 UTM을 1초만에 추가</p>
          <h1>다른 곳에서 생성했던 UTM들도</h1>
          <h2> 유렉카에서 관리해보세요!</h2>

          <p className={styles.content}>
            기존에 가지고 있던 UTM을 입력하면 파라미터 별로 자동 분류됩니다.
            <br /> 생성된 날짜와 간단한 메모를 추가로 기록하여
            <br />
            예전 데이터까지 유렉카에서 관리 해보세요.
          </p>
        </div>
        <div className={styles.three_img}>
          <Image src={create} alt="Gif" />
        </div>
        <p className={styles.m_content}>
          기존에 가지고 있던 UTM을 입력하면 파라미터 별
          <br />로 자동 분류됩니다. 생성된 날짜와 간단한 메모를 <br />
          추가로 기록하여 예전 데이터까지 유렉카에서 관리 <br />
          해보세요.
        </p>
      </article>
    </section>
  );
}
