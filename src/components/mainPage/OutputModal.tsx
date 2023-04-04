import Image from "next/image"
import styles from "./main.module.css"

import not_notion from "assets/notion.png"
import not_sheet from "assets/sheet.png"
import not_excel from "assets/execel.png"

import active_notion from "assets/blue_notion.png"
import active_sheet from "assets/blue_sheet.png"
import active_excel from "assets/blue_excel.png"

import b_close from "assets/b_close.png"
import { useEffect, useState } from "react"
import { getUTMNotion, getUTMSheet } from "@/util/async/api"

import Axios from "util/async/axiosConfig"
import { Alert, AlertTitle } from "@mui/material"
import Modal from "@/app/Modal"

type OutputModalType = {
  isOpen: boolean
  onRequestClose: any
  style: any
  data: any
}
export const OutputModal: React.FC<OutputModalType> = ({
  isOpen,
  onRequestClose,
  style,
  data,
}) => {
  const [notion, setNotion] = useState(false)
  const [sheet, setSheet] = useState(false)
  const [excel, setExcel] = useState(false)
  const [alert, setAlert] = useState(false)

  const mapdata = data.map((i: any) => i.utm_id)
  const onClickPopHandler = async () => {
    if (notion) {
      getUTMSheet(data)
      setAlert(true)
    }
    if (excel) {
      try {
        const response = await Axios.post(
          "utms/toxlsx",
          { data },
          { responseType: "blob" }
        )
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const a = document.createElement("a")
        a.href = url
        const timestamp = new Date(Date.now()).toISOString().slice(0, 10)
        a.download = `${timestamp}.xlsx`
        a.click()
        window.URL.revokeObjectURL(url)
        onRequestClose()
      } catch (error) {
        console.error("download error", error)
      }
    }

    if (sheet) {
      try {
        const response = await Axios.post("utms/export/sheet/csv", data, {
          responseType: "blob",
        })
        const url = window.URL.createObjectURL(new Blob([response.data]))
        const a = document.createElement("a")
        a.href = url
        const timestamp = new Date(Date.now()).toISOString().slice(0, 10)
        a.download = `${timestamp}.csv`
        a.click()
        window.URL.revokeObjectURL(url)
        onRequestClose()
      } catch (error) {
        console.error("download error", error)
      }
    }

    if (!notion && !excel && !sheet) {
      setAlert(true)
      onRequestClose()
    }
  }
  //
  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false)
      }, 3000)
    }
  }, [alert])

  useEffect(() => {
    if (notion) {
      setExcel(false)
      setSheet(false)
    }
    if (excel) {
      setNotion(false)
      setSheet(false)
    }
    if (sheet) {
      setNotion(false)
      setExcel(false)
    }
  }, [notion, excel, sheet])

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div
        className={styles.dialogBox}
        {...(isOpen && true ? { open: true } : {})}
        id="favDialog"
      >
        <div className={styles.header}>
          <div className={styles.title_box}>
            <span className={styles.title}>UTM 추출하기</span>
          </div>
          <div className={styles.cancleBtn_box}>
            <button className={styles.cancleBtn} onClick={onRequestClose}>
              <Image src={b_close} alt="close_img" width={24} height={24} />
            </button>
          </div>
        </div>
        <div className={styles.contents}>
          <div className={styles.col_box}>
            <div>
              <p>{data.length}개의 UTM이 선택되었습니다.</p>
              <p>UTM 데이터를 보낼 툴을 선택해주세요</p>
              {sheet && (
                <span className={styles.noti_span}>
                  다운로드 되는 csv 파일을 스프레드시트로 열어 주세요
                </span>
              )}
            </div>
            <div className={styles.img_box}>
              <div className={styles.img_box_img}>
                {notion ? (
                  <Image
                    width={150}
                    height={100}
                    alt="outputmodal"
                    src={active_notion}
                    onClick={() => setNotion(!notion)}
                  />
                ) : (
                  <Image
                    width={150}
                    height={100}
                    alt="outputmodal"
                    src={not_notion}
                    onClick={() => setNotion(!notion)}
                  />
                )}
              </div>
              <div className={styles.img_box_img}>
                {sheet ? (
                  <Image
                    width={150}
                    height={100}
                    alt="outputmodal"
                    src={active_sheet}
                    onClick={() => setSheet(!sheet)}
                  />
                ) : (
                  <Image
                    width={150}
                    height={100}
                    alt="outputmodal"
                    src={not_sheet}
                    onClick={() => setSheet(!sheet)}
                  />
                )}
              </div>

              <div
                onClick={() => setExcel(true)}
                className={styles.img_box_img}
              >
                {excel ? (
                  <Image
                    width={150}
                    height={100}
                    alt="outputmodal"
                    src={active_excel}
                  />
                ) : (
                  <Image
                    width={150}
                    height={100}
                    alt="outputmodal"
                    src={not_excel}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
        {alert && (
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            아직 개발 중입니다...! <strong>엑셀로 추출해보세요!</strong>
          </Alert>
        )}
        <div className={styles.bottom}>
          <button
            onClick={onClickPopHandler}
            className={styles.modal_button}
            value="default"
          >
            추출하기
          </button>
        </div>
      </div>
    </Modal>
  )
}
