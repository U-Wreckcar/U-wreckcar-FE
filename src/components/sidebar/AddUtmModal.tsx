'use client';
import React from 'react';
import ReactModal from 'react-modal';
import styles from './styles.module.css';
import { useForm } from 'react-hook-form';

export type ModalType = {
  isOpen: boolean;
  onRequestClose: any;
  style: any;
};

type AddUTMType = {
  utm_url: string;
  created_at: string;
  memo: string;
};

export const AddUtmModal: React.FC<ModalType> = ({
  isOpen,
  onRequestClose,
  style,
}) => {
  const {
    register,
    formState: { errors, isDirty, isSubmitting },
    handleSubmit,
    getValues,
  } = useForm({ criteriaMode: 'all', mode: 'onChange' });

  const onSubmit = (data: AddUTMType) => {
    console.log(data);
  };

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <form className={styles.add_modal} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>기존 UTM 추가</h1>
          <div className={styles.border_line}></div>
          <span>*기존의 UTM을 입력하면 파라미터 값이 분류됩니다</span>
        </div>
        <div className={styles.modal_footer_box}>
          <div className={styles.modal_input_box}>
            <p>UTM</p>
            <input
              className={styles.modal_input}
              placeholder="UTM을 입력하세요."
              {...register('utm_url', {
                required: true,
              })}
            ></input>
          </div>
          <div className={styles.modal_footer}>
            <p>생성 날짜</p>
            <input
              className={styles.modal_input_date}
              type="date"
              {...register('created_at', {
                required: true,
              })}
            ></input>
            <p>메모</p>
            <input
              className={styles.modal_input_memo}
              placeholder="메모를 입력하세요."
              {...register('memo', {
                required: true,
              })}
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.add_button}
            //onClick={onRequestClose}
          >
            추가하기
          </button>
        </div>
      </form>
    </ReactModal>
  );
};
