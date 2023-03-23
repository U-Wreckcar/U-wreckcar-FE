'use client';
import React from 'react';
import { CopyButton } from 'shared/button/CopyButton';
import styles from './CreateCopyBox.module.css';
import b_link from 'assets/b_link.png';
import Image from 'next/image';
import { CreateCopyButton } from './CreateCopyButton';

type PropsType = {
  resUTM: any;
};
export const CreateCopyBox: React.FC<PropsType> = ({ resUTM }) => {
  return (
    <div className={styles.container_copy_box}>
      <div className={styles.copy_title}>
        <div className={styles.link_img_box}>
          <Image
            className={styles.link_img}
            src={b_link}
            alt='링크'
          />
        </div>
        <h3 className={styles.utm_url}>UTM URL</h3>
        <div className={styles.link_img_box}>
          <Image
            className={styles.link_img}
            src={b_link}
            alt='링크'
          />
        </div>
        <h3 className={styles.utm_shorten_url}>Shorten URL</h3>
      </div>
      <div>
        {resUTM?.map((i: any, idx: number) => (
          <div key={i.utm_id}>
            <div className={styles.list_box}>
              <div className={styles.copy_box_number}>{idx + 1}</div>
              <div className={styles.full_box}>
                <div className={styles.copy_box_full}>
                  <div className={styles.full_utm}>
                    <div className={styles.text_full}>{i.full_url}</div>
                  </div>
                  <CreateCopyButton text={i.full_url} />
                </div>
              </div>
              <div className={styles.short_box}>
                <div className={styles.copy_box_short}>
                  <div className={styles.short_utm}>
                    <div className={styles.text_full}>{i.shorten_url}</div>
                  </div>
                  <CreateCopyButton text={i.shorten_url} />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
