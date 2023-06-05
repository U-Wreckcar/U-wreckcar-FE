import Modal from "@/src/common/type/Modal";
import React, { ChangeEvent, useCallback, useRef, useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import { ModalType } from "./AddUtmModal";
import Axios from "src/util/async/intercepter";

import styles from "./ExcelAddModal.module.css";
import helpImg from "public/assets/img/blue_help.png";
import helpMsgImg from "public/assets/img/excel_help.png";
import downloader from "public/assets/img/e_download.png";
import drag from "public/assets/img/e_drag.png";
import dragBox from "public/assets/img/e_drag_box.png";
import dragging from "public/assets/img/e_is_drag.png";
import folder from "public/assets/img/e_icons.png";
import { BlueButton } from "@/src/common/button/blue_button/BlueButton";
interface IFileTypes {
  id: number;
  object: File;
}

export const ExcelAddModal: React.FC<ModalType> = ({ isOpen, onRequestClose, style }) => {
  const [helpMsg, setHelpMsg] = useState(false);
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [files, setFiles] = useState<IFileTypes[]>([]);

  const dragRef = useRef<HTMLLabelElement | null>(null);
  const fileId = useRef<number>(0);
  const fileRef = useRef<HTMLInputElement>(null);
  const fileDownRef = useRef<HTMLAnchorElement>(null);

  const handleDownload = () => {
    fileDownRef.current?.click();
  };

  //11
  const tsfn = (e: FormEvent) => {
    e.preventDefault();
    const xlsx = files[0]?.object.name.split(".").pop()?.toLowerCase();
    if (xlsx !== "xlsx") {
      alert("확장자를 확인해주세요!");
    } else if (xlsx === "xlsx") {
      if (fileRef.current?.files?.length !== 0) {
        const fileDate = fileRef.current?.files;
        const formData = new FormData();
        // @ts-ignore
        Array.from(fileDate).forEach((el: any) => {
          formData.append("files", el);
        });
        asyncfile(formData);
      } else if (fileRef.current?.files?.length === 0) {
        const formData = new FormData();
        // @ts-ignore
        console.log(files[0]);
        formData.append("files", files[0].object);

        asyncfile(formData);
      }
    }
  };

  async function asyncfile(data: any) {
    try {
      const res = await Axios.post("utms/file-import", data);
      console.log(res);
      if (res.data.result.success) {
        onRequestClose();
      } else if (!res.data.result.success) {
        alert("파일 양식을 다시 확인해주세요!");
      }
    } catch (err) {
      alert("파일을 다시 올려주세요!");
    }
  }
  //111
  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = [];
      let tempFiles: IFileTypes[] = files;

      if (e.dataTransfer?.files) {
        selectFiles = e.dataTransfer.files;
      } else if (e.target.files) {
        selectFiles = e.target.files;
      }
      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file,
          },
        ];
      }
      setFiles(tempFiles);
    },
    [files]
  );

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    setIsDragging(false);
  }, []);

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault();
    e.stopPropagation();

    // if (e.dataTransfer!.files) {
    setIsDragging(true);
    // }
  }, []);

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault();
      e.stopPropagation();

      onChangeFiles(e);
      setIsDragging(false);
    },
    [onChangeFiles]
  );

  useEffect(() => {
    if (files.length > 1) {
      setFiles([]);
    }
  }, [files]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <form className={styles.add_modal}>
        <label
          ref={dragRef}
          htmlFor="fileUpload"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e: any) => handleDrop(e)}
        >
          <div className={styles.title_box}>
            <h1>엑셀파일로 추가하기</h1>
            <Image
              src={helpImg}
              alt=""
              width={16}
              height={16}
              onMouseEnter={() => setHelpMsg(true)}
              onMouseLeave={() => setHelpMsg(false)}
            />
          </div>
          {helpMsg && <Image className={styles.help_msg_img} src={helpMsgImg} alt="" width={300} height={140} />}
          <div className={styles.sub_title}>
            <span>
              유렉카 엑셀 양식에 맞춰 UTM 리스트 파일을 등록하면
              <br></br>
              자동으로 파라미터 값이 분류되어 추가됩니다.
            </span>
          </div>
          <div className={styles.modal_footer_box}>
            <div>
              <a
                ref={fileDownRef}
                href="https://velog.velcdn.com/images/mython/post/cbd0ccf9-e0c0-4ffc-9b1b-2462d3200dfb/image.xlsx"
                download="filename.txt"
                style={{ display: "none" }}
              ></a>
              <Image onClick={handleDownload} src={downloader} alt="" width={86} height={28} />
            </div>
            <div className={styles.footer_drag_box}>
              <input
                ref={fileRef}
                type="file"
                id="fileUpload"
                style={{ display: "none" }}
                multiple={false}
                onChange={onChangeFiles}
              />
              {files.length !== 0 &&
                files.map((file: IFileTypes) => {
                  const {
                    id,
                    object: { name },
                  } = file;

                  return (
                    <div key={id}>
                      <Image src={dragBox} alt="" width={730} height={60} />
                      <div className={styles.drag_container}>
                        <Image className={styles.drag_folder} src={folder} alt="" width={24} height={24} />
                        <div className={styles.drag_name}>{name}</div>
                      </div>
                    </div>
                  );
                })}
              {files.length === 0 && isDragging && <Image src={dragging} alt="" width={730} height={60} />}
              {files.length === 0 && !isDragging && (
                <>
                  <Image src={dragBox} alt="" width={730} height={60} />
                  <Image
                    className={styles.footer_drag_box_content}
                    onDoubleClick={onChangeFiles}
                    src={drag}
                    alt=""
                    width={300}
                    height={24}
                  />
                </>
              )}
            </div>
            <button type="button" id="add_btn" className={styles.add_button} onClick={tsfn}>
              추가하기
            </button>
          </div>
        </label>
      </form>
    </Modal>
  );
};
