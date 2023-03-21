"use client"
import React from "react"
import ReactModal from "react-modal"
import styles from "./AddUtmModal.module.css"
import { useForm } from "react-hook-form"
import { ExternalUTM } from "@/util/async/api"

export type ModalType = {
  isOpen: boolean
  onRequestClose: any
  style: any
}

type AddUTMType = {
  utm_url: string
  created_at: string
  memo: string
}

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
  } = useForm({ criteriaMode: "all", mode: "onChange" })

  const onSubmit = (data: any) => {
    ExternalUTM(data)
    console.log(data)
    onRequestClose()
  }

  return (
    <ReactModal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.add_modal}>
        <div className={styles.title_box}>
          <h1>기존 UTM 추가</h1>
        </div>

        <span className={styles.sub_title}>
          *기존의 UTM을 입력하면 파라미터 값이 분류됩니다
        </span>

        <div className={styles.modal_footer_box}>
          <div className={styles.modal_input_box}>
            <p>UTM</p>
            <input
              className={styles.modal_input}
              placeholder="UTM을 입력하세요."
              {...register("utm_url", {
                required: true,
              })}
            ></input>
          </div>
          <div className={styles.modal_footer}>
            <label>
              생성 날짜
              <input
                className={styles.modal_input_date}
                type="date"
                {...register("created_at", {
                  required: true,
                })}
              />
            </label>
            <label className={styles.memo_text}>
              메모
              <input
                className={styles.modal_input_memo}
                placeholder="메모를 입력하세요."
                {...register("memo", {
                  required: true,
                })}
              />
            </label>
          </div>
          <button
            id="add_btn"
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
  )
}
