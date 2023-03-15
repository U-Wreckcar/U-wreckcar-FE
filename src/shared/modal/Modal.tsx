import React, { FC, useState } from 'react';
import styles from './modal.module.css';

type PropsType = {
  isCancle?: boolean;
  buttonName: string;
  cancleButtonName?: string;
  confirmButtonName: string;
  modalTitle: string;
  context?: string;
  contextSeconde: string;
  confirmButtonHanlder: () => void;
  childComponent?: any;
  x: number;
  y: number;
};

export const Modal: React.FC<PropsType> = ({
  isCancle,
  buttonName,
  cancleButtonName,
  confirmButtonName,
  context,
  contextSeconde,
  modalTitle,
  confirmButtonHanlder,
  childComponent,
  x,
  y,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const modalHandler = () => {
    setIsOpen(!isOpen);
  };
  return (
    <div className={styles.container}>
      <dialog
        className={styles.dialogBox}
        style={{ width: `${x}px`, height: `${y}px` }}
        {...(isOpen && true ? { open: true } : {})}
        id="favDialog"
      >
        <form method="dialog">
          <div className={styles.header}>
            <div className={styles.title_box}>
              <span className={styles.title}>{modalTitle}</span>
            </div>
            <div className={styles.cancleBtn}>
              <button value="cancel" onClick={modalHandler}>
                x
              </button>
            </div>
          </div>
          <div className={styles.contents}>
            <div>
              <h5>{context}</h5>
              <h5>{contextSeconde}</h5>
            </div>
            <div>{childComponent}</div>
          </div>
          <div className={styles.bottom}>
            <button
              className={styles.modal_button}
              id="confirmBtn"
              value="default"
              onClick={() => {
                setIsOpen(!isOpen);
                confirmButtonHanlder();
              }}
            >
              {confirmButtonName}
            </button>
          </div>
        </form>
      </dialog>
      <div>
        <button id="updateDetails" onClick={modalHandler}>
          {buttonName}
        </button>
      </div>
      <output aria-live="polite"></output>
    </div>
  );
};
