import styles from "./Home.module.css";
import Image from "next/image";
import Link from "next/link";
import ChangeText from "../render/ChangeText";
import { bg_one_illust } from "public/assets/render/index";
export default function HomeOne() {
  return (
    <section className={styles.l_section_one}>
      <article>
        <div className={styles.text_box}>
          <ChangeText />
          <p>UTM 업무 1시간? 유렉카에서는 3분이면 OK</p>
          <Link className={styles.origin_free_btn} href={"/login"}>
            <button id="free_btn" className={styles.free_btn}>
              무료로 시작하기
            </button>
          </Link>
        </div>
        <Image className={styles.bg_one_illust} src={bg_one_illust} alt="Img" />
        <Link className={styles.m_free_btn} href={"/webonly"}>
          <button id="free_btn" className={styles.free_btn}>
            무료로 시작하기
          </button>
        </Link>
      </article>
    </section>
  );
}
