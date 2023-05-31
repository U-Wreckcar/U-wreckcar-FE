import Image from "next/image";
import styles from "./main.module.css";
import { useRef } from "react";
import { patchUTM } from "src/util/async/api";
import Modal from "@/src/common/type/Modal";
import { BlueButton } from "@/src/common/button/blue_button/BlueButton";
import { CustomStyles, MainTableType } from "./TableData";
import { Table } from "@tanstack/react-table";

type EditModalType = {
  isOpen: boolean;
  onRequestClose: () => void;
  style: CustomStyles;
  value: string;
  table: Table<MainTableType> | null;
  index: string;
};
export const EditModal: React.FC<EditModalType> = ({ isOpen, onRequestClose, style, value, table, index }) => {
  const textarea_ref = useRef<HTMLTextAreaElement>(null);
  //수정하기
  const onClickEditButton = () => {
    const id = index.split("_")[0];
    const filter =
      table && table.getGroupedRowModel().flatRows.filter((row) => row.index.toString() === id)[0].original;
    patchUTM({ _id: filter?._id, memo: textarea_ref?.current?.value });
    onRequestClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <div className={styles.del_dialogBox}>
        <div className={styles.header}>
          <div className={styles.title_box}>
            <span className={styles.title}>UTM 메모 수정하기</span>
          </div>
          <div className={styles.cancleBtn_box}>
            {/* <button className={styles.cancleBtn} onClick={onRequestClose}>
              <Image src={b_close} alt="close_img" width={24} height={24} />
            </button> */}
          </div>
        </div>
        <div className={styles.contents}>
          <div className={styles.col_box}>
            <textarea ref={textarea_ref} defaultValue={value} className={styles.main_area} maxLength={100} />
          </div>
        </div>
        <div className={styles.bottom}>
          <button onClick={onRequestClose} className={styles.modal_del_button} value="default">
            취소하기
          </button>
          {/* <button
            onClick={onClickEditButton}
            className={styles.modal_button}
            value='default'>
            수정하기
          </button> */}
          <BlueButton size={"sm"} color={"full"} clickEvent={onClickEditButton} text={"수정하기"} types={"button"} />
        </div>
      </div>
    </Modal>
  );
};
