import Image from "next/image";
import styles from "./main.module.css";

import not_sheet from "public/assets/img/sheet.png";
import not_excel from "public/assets/img/execel.png";

import active_sheet from "public/assets/img/blue_sheet.png";
import active_excel from "public/assets/img/blue_excel.png";

import b_close from "public/assets/img/b_close.png";
import { useEffect, useState } from "react";

import Axios from "src/util/async/intercepter";
import { Alert, AlertTitle, CircularProgress } from "@mui/material";
import Modal from "@/src/common/type/Modal";

import { BlueButton } from "@/src/common/button/blue_button/BlueButton";

import { delSelectTable } from "@/src/redux/slice/addslice";
import { useAppDispatch } from "@/src/util/reduxType/type";
import { CustomStyles, MainTableType } from "./TableData";
import axios from "axios";
import { getCookie } from "@/src/util/async/Cookie";

type OutputModalType = {
  isOpen: boolean;
  onRequestClose: () => void;
  style: CustomStyles;
  dataList: MainTableType[];
};
export const OutputModal: React.FC<OutputModalType> = ({ isOpen, onRequestClose, style, dataList }) => {
  const [sheet, setSheet] = useState(false);
  const [excel, setExcel] = useState(false);
  const [alert, setAlert] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useAppDispatch();

  async function onClickPopHandler() {
    if (excel) {
      try {
        setLoading(true);
        const response = await Axios.post(
          "utms/excel",
          { data: dataList },
          {
            responseType: "blob",
          }
        );
        console.log(response.data);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const a = document.createElement("a");
        a.href = url;
        const timestamp = new Date(Date.now()).toISOString().slice(0, 10);
        a.download = `${timestamp}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
        onRequestClose();
        setLoading(false);
        dispatch(delSelectTable());
      } catch (error) {
        setLoading(false);
        setAlert(true);
        console.error("download error", error);
      }
    }

    if (sheet) {
      try {
        setLoading(true);
        const refresh_token = getCookie("refresh_token");
        const headers = {
          "X-Refresh-Token": `Bearer ${refresh_token}`,
        };
        const response = await axios.post(
          "https://c91d-14-6-160-238.ngrok-free.app/api/utms/csv",
          { data: dataList },
          {
            headers,
            // responseType: "blob",
          }
        );
        console.log(response);
        // const response = await getData("export/sheet/csv")
        const url = window.URL.createObjectURL(new Blob([response.data.data], { type: "text/csv" }));
        const a = document.createElement("a");
        a.href = url;
        const timestamp = new Date(Date.now()).toISOString().slice(0, 10);
        a.download = `${timestamp}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
        onRequestClose();
        setLoading(false);
        dispatch(delSelectTable());
      } catch (error) {
        setLoading(false);
        setAlert(true);
        console.error("download error", error);
      }
    }
  }

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false);
      }, 3000);
    }
  }, [alert]);

  useEffect(() => {
    if (excel) {
      setSheet(false);
    }
    if (sheet) {
      setExcel(false);
    }
  }, [excel, sheet]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div className={styles.dialogBox} {...(isOpen && true ? { open: true } : {})} id="favDialog">
        <div className={styles.header}>
          <div className={styles.title_box_out}>
            <span className={styles.title}>UTM 추출하기</span>
          </div>
          <div className={styles.cancleBtn_box}>
            <button title="button" className={styles.cancleBtn} onClick={onRequestClose}>
              <Image src={b_close} alt="close_img" width={24} height={24} />
            </button>
          </div>
        </div>
        <div className={styles.contents}>
          <div className={styles.col_box}>
            <div>
              <p>{dataList?.length}개의 UTM이 선택되었습니다.</p>
              <p>UTM 데이터를 보낼 툴을 선택해주세요</p>
              {sheet && <span className={styles.noti_span}>다운로드 되는 csv 파일을 스프레드시트로 열어 주세요</span>}
            </div>
            <div className={styles.img_box}>
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
                  <Image width={150} height={100} alt="outputmodal" src={not_sheet} onClick={() => setSheet(!sheet)} />
                )}
              </div>

              <div onClick={() => setExcel(true)} className={styles.img_box_img}>
                {excel ? (
                  <Image width={150} height={100} alt="outputmodal" src={active_excel} />
                ) : (
                  <Image width={150} height={100} alt="outputmodal" src={not_excel} />
                )}
              </div>
            </div>
          </div>
        </div>
        {alert && (
          <Alert severity="warning">
            <AlertTitle>Warning</AlertTitle>
            <strong>추출을 실패했습니다!</strong>
            다시 시도해주세요
          </Alert>
        )}
        <div className={styles.bottom}>
          {loading ? (
            <button className={styles.modal_button_loading} title="button" value="default">
              <CircularProgress disableShrink size={15} />
            </button>
          ) : (
            <BlueButton text={"추출하기"} clickEvent={onClickPopHandler} size={"sm"} color={"full"} types={"button"} />
          )}
        </div>
      </div>
    </Modal>
  );
};
