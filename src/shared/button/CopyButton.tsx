'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import check from 'assets/icons.png';
import styles from './copy.module.css';

type CopyButtonProps = {
  text: string;
};

//style 속성 프롭스 no

export const CopyButton: React.FC<CopyButtonProps> = ({ text }) => {
  const [alert, setAlert] = useState(false);

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }, [alert]);

  const onClickCopyBtn = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setAlert(true);
      });
    }
  };
  return (
    <>
      {alert && (
        <div
          className={styles.alert}
          onClick={() => {
            setAlert(false);
          }}
        >
          <div className={styles.alert_left}>
            <Image src={check} width={25} height={25} alt="check" />
            <div className={styles.alert_text}>
              <h5>성공</h5> <p>UTM이 복사되었습니다!</p>
            </div>
          </div>
          <button>X</button>
        </div>
      )}
      <button className={styles.copy_button} onClick={onClickCopyBtn}>
        복사하기
      </button>
    </>
  );
};
