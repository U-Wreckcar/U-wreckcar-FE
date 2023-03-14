import { Alert } from '@mui/material';
import React, { useState } from 'react';
import styles from './copybutton.module.css';

type CopyButtonProps = {
  style?: string;
  text: string;
};

export const CopyButton: React.FC<CopyButtonProps> = ({ style, text }) => {
  const [alert, setAlert] = useState(false);

  const onClickCopyBtn = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        setAlert(true);
        //alert('클립보드에 복사되었습니다.');
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
            <div className={styles.alert_icon}>⌵</div>
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
