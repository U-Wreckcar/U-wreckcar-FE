"use client"
import React, { useEffect, useRef, useState } from "react"
import styles from "./AddUtmModal.module.css"
import { useForm } from "react-hook-form"
import { ExternalUTM } from "src/util/async/api"
import { useDispatch } from "react-redux"
import { addItem } from "src/redux/slice/addslice"
import Modal from "src/util/type/Modal"
import { ExcelAddModal } from "./ExcelAddModal"

export type ModalType = {
  isOpen: boolean
  onRequestClose: any
  style: any
}

type AddUTMType = {
  utm_url: string
  created_at: string | null
  memo: string | null
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
    setError,
    setValue,
  } = useForm({ criteriaMode: "all", mode: "onChange" })

  const dispatch = useDispatch()
  const [excel, setExcel] = useState(false)
  const onSubmit = async (data: any) => {
    try {
      const res = await ExternalUTM(data)
      onRequestClose()
      dispatch(addItem(isOpen))
    } catch (err) {
      setError(
        "utm_url",
        { message: "UTM을 확인해주세요" },
        { shouldFocus: true }
      )
    }
  }

  useEffect(() => {
    dispatch(addItem(isOpen))
    setValue("utm_url", "")
    setValue("created_at", "")
    setValue("memo", "")
    return () => setExcel(false)
  }, [isOpen])

  return (
    <>
      {excel ? (
        <ExcelAddModal
          isOpen={isOpen}
          onRequestClose={onRequestClose}
          style={style}
        />
      ) : (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
          <form onSubmit={handleSubmit(onSubmit)} className={styles.add_modal}>
            <div className={styles.title_box}>
              <h1>기존 UTM 추가</h1>
            </div>
            <span className={styles.sub_title}>
              *만드신 UTM을 넣으시면 파라미터 값이 분류되어 데이터에 저장됩니다
            </span>
            <div className={styles.modal_footer_box}>
              <div className={styles.error_box}>
                {errors?.utm_url && (
                  <span className={styles.error_utm}>
                    추가하실 UTM을 확인해주세요!
                  </span>
                )}
              </div>
              <div className={styles.modal_input_box}>
                <p>UTM</p>
                <input
                  className={styles.modal_input}
                  placeholder='(필수 입력) ex) https://www.abcd.com?utm_source=aaa&utm_medium=bbb&utm_campaign=ccc&utm_id=ddd'
                  {...register("utm_url", {
                    required: true,
                  })}></input>
              </div>
              <div className={styles.modal_footer}>
                <label className={styles.label_text}>
                  생성 날짜
                  <input
                    className={styles.modal_input_date}
                    type='date'
                    {...register("created_at", {
                      required: false,
                    })}
                  />
                </label>
                <label className={styles.label_text}>
                  메모
                  <input
                    className={styles.modal_input_memo}
                    placeholder='(선택 입력) UTM에 대한 메모를 남길 수 있습니다. 자유롭게 활용하세요.'
                    {...register("memo", {
                      required: false,
                      maxLength: 100,
                    })}
                  />
                </label>
              </div>
              <div className={styles.error_box_memo}>
                {errors.created_at && (
                  <span className={styles.error_utm}>
                    추가하실 UTM의 날짜를 입력해주세요!
                  </span>
                )}
              </div>
              <button
                type='button'
                className={styles.add_excel_button}
                onClick={() => setExcel(true)}>
                엑셀로 추가하기
              </button>
              <button
                id='add_btn'
                type='submit'
                disabled={isSubmitting}
                className={styles.add_button}>
                추가하기
              </button>
            </div>
          </form>
        </Modal>
      )}
    </>
  )
}
