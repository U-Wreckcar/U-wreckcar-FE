import React from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { six } from "public/assets/gif";
import { bg_six_one, bg_six_two, bg_six_three } from "public/assets/render/index";

export default function HomeSix() {
  return (
    <div>
      {" "}
      <section className={styles.l_section_six}>
        <article>
          <div className={styles.m_mobile_six}>
            <Image src={six} alt="IMG" />
          </div>
          <div className={styles.six_card_item}>
            <Image src={bg_six_one} alt="IMG" />
            <h2>
              여러개의 UTM을
              <br />한 번에 만들어보세요
            </h2>

            <p>
              추가하기 버튼 클릭 한 번으로
              <br /> 간편하게 UTM동시 생성!
            </p>
          </div>
          <div className={styles.six_card_item}>
            <Image src={bg_six_two} alt="IMG" />
            <h2>
              자주 쓰는 파라미터를
              <br />
              따로 관리해보세요
            </h2>
            <p>
              북마크 기능을 활용하여 <br />
              간편하고 빠르게 UTM 생성!
            </p>
          </div>
          <div className={styles.six_card_item}>
            <Image src={bg_six_three} alt="IMG" />
            <h2>
              Shorten UTM기능으로
              <br />긴 UTM 코드들을 간결하게
            </h2>
            <p>
              UTM 코드를 심은 URL을 <br />
              짧고 간편하게 공유해보세요!
            </p>
          </div>
        </article>
        <Link href={"/webonly"}>
          <button>더 많은 기능 보러가기</button>
        </Link>
      </section>
    </div>
  );
}
