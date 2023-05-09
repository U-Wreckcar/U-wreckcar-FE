import React from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import { six, create, f_search, out } from "public/assets/gif";

export default function HomeFive() {
  return (
    <div>
      <section className={styles.l_section_five}>
        <article>
          <div className={styles.text_box}>
            <p className={styles.sub_title}>즉시 팀원에게 공유할 준비 완료</p>
            <h1>선택한 UTM만 추출하여</h1>
            <h2>저장해보세요</h2>
            <p className={styles.context}>
              필요한 UTM만 선택하여 내보내기!
              <br />
              선택된 데이터들을 저장하여 바로 팀원과 공유해보세요.
            </p>
          </div>
          <div className={styles.five_img}>
            <Image src={out} alt="Gif" />
          </div>
          <p className={styles.m_five_context}>
            필요한 UTM만 선택하여 내보내기!
            <br />
            선택된 데이터들을 저장하여 바로 팀원과 공유해보세요
          </p>
        </article>
      </section>
    </div>
  );
}
