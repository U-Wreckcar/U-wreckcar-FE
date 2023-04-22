"use client";
import React, { useState } from "react";
import Image from "next/image";
import b_close from "public/assets/img/b_close.png";
import check from "public/assets/img/icons.png";
import styles from "./createCopyButton.module.css";
type PropsType = {
   text: string;
};

export const CreateCopyButton: React.FC<PropsType> = ({ text }) => {
   const [alert, setAlert] = useState(false);

   const onClickCopyBtn = () => {
      if (navigator.clipboard) {
         navigator.clipboard.writeText(text).then(() => {
            setAlert(true);
         });
      }
   };
   setTimeout(() => {
      setAlert(false);
   }, 3000);
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
                  <Image className={styles.alert_icon} src={check} width={25} height={25} alt="check" />
                  <div className={styles.alert_text}>
                     <h5>성공</h5> <p>UTM이 복사되었습니다!</p>
                  </div>
               </div>
               <button>
                  <Image src={b_close} alt="X" width={20} height={20} />
               </button>
            </div>
         )}
         <button className={styles.copy_button} onClick={onClickCopyBtn}>
            복사하기
         </button>
      </>
   );
};
