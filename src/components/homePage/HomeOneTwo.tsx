import React from "react";
import styles from "./Home.module.css";
import Image from "next/image";
import { sub_img } from "public/assets/render/index";
import { m_section_one_two, sub_child } from "public/assets/img";
export default function HomeOneTwo() {
  return (
    <div>
      <section className={styles.l_section_one_two}>
        <article>
          <Image className={styles.web_sub} src={sub_img} alt="Img" />
          <Image className={styles.m_sub} src={m_section_one_two} alt="Img" />
          <Image className={styles.sub_child} src={sub_child} alt="Img" width={1608} height={400} />
        </article>
      </section>
    </div>
  );
}
