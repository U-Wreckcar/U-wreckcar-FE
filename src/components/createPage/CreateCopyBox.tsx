"use client";
import React from "react";
import styles from "./CreateCopyBox.module.css";
// import b_link from ".public/assets/b_link.png"
import b_link from "public/assets/img/b_link.png";
import Image from "next/image";
import { CreateCopyButton } from "./CreateCopyButton";

type PropsType = {
  resUTM: any;
};
export const CreateCopyBox: React.FC<PropsType> = ({ resUTM }) => {
  console.log(resUTM);
  return (
    <div className={styles.container_copy_box}>
      <div className={styles.copy_title}>
        <div className={styles.link_img_box}>
          <Image className={styles.link_img} src={b_link} alt="링크" />
        </div>
        <h3 className={styles.utm_url}>UTM URL</h3>
        <div className={styles.link_img_box}>
          <Image className={styles.link_img} src={b_link} alt="링크" />
        </div>
        <h3 className={styles.utm_shorten_url}>Shorten URL</h3>
      </div>
      <div>
        <div className={styles.list_container}>
          {resUTM?.map((i: any, idx: number) => (
            <div key={i.utm_id}>
              <div className={styles.list_box}>
                <div className={styles.copy_box_number}>{idx + 1}</div>
                <div className={styles.full_box}>
                  <div className={styles.copy_box_full}>
                    <div className={styles.full_utm}>
                      <div className={styles.text_full}>{i.fullUrl}</div>
                    </div>
                    <CreateCopyButton text={i.fullUrl} />
                  </div>
                </div>
                <div className={styles.short_box}>
                  <div className={styles.copy_box_short}>
                    <div className={styles.short_utm}>
                      <div className={styles.text_full}>{i.shortenUrl}</div>
                    </div>
                    <CreateCopyButton text={i.shortenUrl} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
