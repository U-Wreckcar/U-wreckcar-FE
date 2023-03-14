import React from 'react';
import ReactModal from 'react-modal';
import styles from './styles.module.css';

type ModalType = {
  isOpen: any;
  onRequestClose: any;
  style: any;
};

export const AddUtmModal: React.FC<ModalType> = ({
  isOpen,
  onRequestClose,
  style,
}) => {
  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div className={styles.add_modal}>
        <div>
          <h1>기존 UTM 추가</h1>
          <span>*기존의 UTM을 입력하면 파라미터 값이 분류됩니다</span>
        </div>
        <div>
          <input
            className={styles.modal_input}
            placeholder="*기존에 생성한 UTM 입력"
          ></input>
          <div className={styles.modal_footer}>
            <p>생성 날짜</p>
            <input className={styles.modal_input_date} type="date"></input>
            <p>메모</p>
            <input
              className={styles.modal_input_memo}
              placeholder="메모를 입력하세요."
            />
          </div>
          <button className={styles.add_button} onClick={onRequestClose}>
            추가하기
          </button>
        </div>
      </div>
    </ReactModal>
  );
};
