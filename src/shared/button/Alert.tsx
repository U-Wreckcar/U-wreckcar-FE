import React, { Dispatch } from "react";
import Image from "next/image";
import check from "assets/icons.png";
import styles from "./copy.module.css";
import { SetState } from "immer/dist/internal";

type AlertType = {
  onClickEvent: any;
  title: string;
  contents: string;
};

export const Alert: React.FC<AlertType> = ({
  onClickEvent,
  title,
  contents,
}) => {
  return (
    <div
      className={styles.alert}
      onClick={() => {
        onClickEvent(false);
      }}
    >
      <div className={styles.alert_left}>
        <Image src={check} width={25} height={25} alt="check" />
        <div className={styles.alert_text}>
          <h5>{title}</h5> <p>{contents}</p>
        </div>
      </div>
      <button>X</button>
    </div>
  );
};
