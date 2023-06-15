import React from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import Link from "next/link";
import { copyright } from "public/assets/img";

export default function HomeEight() {
  return (
    <section className={styles.l_section_eight}>
      <article>
        <div className={styles.e_cards}>
          <h1>Contact Us</h1>
          <p>Uwreckcar@gmail.com</p>
          <Link prefetch={false} href="https://open.kakao.com/o/sbK3Rfaf" target="_blank">
            카카오톡 문의하기
          </Link>
        </div>
        <div className={styles.e_cards}>
          <h1>About 유렉카</h1>
          <Link
            prefetch={false}
            href="https://unexpected-ceder-0b7.notion.site/11f8741947a441e5822fd8723ef48492"
            target="_blank"
          >
            공지사항
          </Link>
          <Link
            prefetch={false}
            href="https://unexpected-ceder-0b7.notion.site/0a3db0d8103f4be2855a23186fc1b5e3"
            target="_blank"
          >
            이용 가이드
          </Link>
          <div className={styles.button_box}></div>
        </div>
        <div className={styles.e_cards}>
          <h1>Privacy & Terms</h1>
          <Link
            prefetch={false}
            href="https://unexpected-ceder-0b7.notion.site/567d742a0cac4441991e88ac540c659e"
            target="_blank"
          >
            개인정보처리방침{" "}
          </Link>

          <Link
            prefetch={false}
            href="https://unexpected-ceder-0b7.notion.site/567d742a0cac4441991e88ac540c659e"
            target="_blank"
          >
            이용약관
          </Link>
        </div>
      </article>
      <div className={styles.e_line}>
        <Image src={copyright} alt="copyright" width={168} height={15} />
      </div>
    </section>
  );
}
