import Modal from "@/app/Modal"
import React, {
  ChangeEvent,
  useCallback,
  useRef,
  useState,
  useEffect,
  FormEvent,
} from "react"
import Image from "next/image"
import { ModalType } from "./AddUtmModal"
import Axios from "util/async/axiosConfig"

import styles from "./ExcelAddModal.module.css"
import helpImg from "assets/blue_help.png"
import helpMsgImg from "assets/excel_help.png"
import downloader from "assets/e_download.png"
import drag from "assets/e_drag.png"
import dragBox from "assets/e_drag_box.png"
import dragging from "assets/e_is_drag.png"
import folder from "assets/e_icons.png"
import { BlueButton } from "@/shared/button/BlueButton"
interface IFileTypes {
  id: number
  object: File
}

export const ExcelAddModal: React.FC<ModalType> = ({
  isOpen,
  onRequestClose,
  style,
}) => {
  const [helpMsg, setHelpMsg] = useState(false)
  const [isDragging, setIsDragging] = useState<boolean>(false)
  const [files, setFiles] = useState<IFileTypes[]>([])

  const dragRef = useRef<HTMLLabelElement | null>(null)
  const fileId = useRef<number>(0)
  const fileRef = useRef<HTMLInputElement>(null)
  //11
  const tsfn = (e: FormEvent) => {
    e.preventDefault()
    if (fileRef.current) {
      console.log(fileRef.current.files)
      const fileDate = fileRef.current.files
      const formData = new FormData()
      // @ts-ignore
      Array.from(fileDate).forEach((el: any) => {
        formData.append("userfile", el)
      })
      asyncfile(fileDate)
    }
  }

  async function asyncfile(formdata: any) {
    try {
      const res = await Axios.post("utms/importdata", formdata)
      console.log(res)
      onRequestClose()
    } catch (err) {
      alert("파일을 다시 올려주세요!")
    }
  }
  //111
  const onChangeFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement> | any): void => {
      let selectFiles: File[] = []
      let tempFiles: IFileTypes[] = files

      if (e.dataTransfer?.files) {
        selectFiles = e.dataTransfer.files
      } else if (e.target.files) {
        selectFiles = e.target.files
      }

      for (const file of selectFiles) {
        tempFiles = [
          ...tempFiles,
          {
            id: fileId.current++,
            object: file,
          },
        ]
      }
      setFiles(tempFiles)
    },
    [files]
  )

  const handleDragIn = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()
  }, [])

  const handleDragOut = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    setIsDragging(false)
  }, [])

  const handleDragOver = useCallback((e: DragEvent): void => {
    e.preventDefault()
    e.stopPropagation()

    // if (e.dataTransfer!.files) {
    setIsDragging(true)
    // }
  }, [])

  const handleDrop = useCallback(
    (e: DragEvent): void => {
      e.preventDefault()
      e.stopPropagation()

      onChangeFiles(e)
      setIsDragging(false)
    },
    [onChangeFiles]
  )

  // const initDragEvents = useCallback((): void => {
  //   dragRef.current?.addEventListener("dragenter", handleDragIn)
  //   dragRef.current?.addEventListener("dragleave", handleDragOut)
  //   dragRef.current?.addEventListener("dragover", handleDragOver)
  //   dragRef.current?.addEventListener("drop", handleDrop)
  // }, [handleDragIn, handleDragOut, handleDragOver, handleDrop])

  // const resetDragEvents = useCallback((): void => {
  //   dragRef.current?.removeEventListener("dragenter", handleDragIn)
  //   dragRef.current?.removeEventListener("dragleave", handleDragOut)
  //   dragRef.current?.removeEventListener("dragover", handleDragOver)
  //   dragRef.current?.removeEventListener("drop", handleDrop)
  // }, [handleDragIn, handleDragOut, handleDragOver, handleDrop])

  // useEffect(() => {
  //   initDragEvents()

  //   return () => resetDragEvents()
  // }, [initDragEvents, resetDragEvents])

  useEffect(() => {
    if (files.length > 1) {
      setFiles([])
    }
  }, [files])

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} style={style}>
      <form className={styles.add_modal}>
        <label
          ref={dragRef}
          htmlFor='fileUpload'
          // onDragEnter={(e: any) => handleDragOver(e)}
          // onDragStart={(e: any) => handleDragIn(e)}
          // onDrop={(e: any) => handleDrop(e)}
        >
          <div className={styles.title_box}>
            <h1>엑셀파일로 추가하기</h1>
            <Image
              src={helpImg}
              alt=''
              width={16}
              height={16}
              onMouseEnter={() => setHelpMsg(true)}
              onMouseLeave={() => setHelpMsg(false)}
            />
          </div>
          {helpMsg && (
            <Image
              className={styles.help_msg_img}
              src={helpMsgImg}
              alt=''
              width={300}
              height={140}
            />
          )}
          <div className={styles.sub_title}>
            <span>
              유렉카 엑셀 양식에 맞춰 UTM 리스트 파일을 등록하면
              <br></br>
              자동으로 파라미터 값이 분류되어 추가됩니다.
            </span>
          </div>
          <div className={styles.modal_footer_box}>
            <div>
              {/* <Image src={downloader} alt="" width={86} height={28} /> */}
            </div>
            <div className={styles.footer_drag_box}>
              <input
                ref={fileRef}
                type='file'
                id='fileUpload'
                style={{ display: "none" }}
                multiple={false}
                onChange={onChangeFiles}
              />
              {files.length !== 0 &&
                files.map((file: IFileTypes) => {
                  const {
                    id,
                    object: { name },
                  } = file

                  return (
                    <div key={id}>
                      <Image src={dragBox} alt='' width={730} height={60} />
                      <div className={styles.drag_container}>
                        <Image
                          className={styles.drag_folder}
                          src={folder}
                          alt=''
                          width={24}
                          height={24}
                        />
                        <div className={styles.drag_name}>{name}</div>
                      </div>
                    </div>
                  )
                })}
              {files.length === 0 && isDragging && (
                <Image src={dragging} alt='' width={730} height={60} />
              )}
              {files.length === 0 && !isDragging && (
                <>
                  <Image src={dragBox} alt='' width={730} height={60} />
                  <Image
                    className={styles.footer_drag_box_content}
                    onDoubleClick={onChangeFiles}
                    src={drag}
                    alt=''
                    width={300}
                    height={24}
                  />
                </>
              )}
            </div>
            <button
              type='button'
              id='add_btn'
              className={styles.add_button}
              onClick={tsfn}>
              추가하기
            </button>
          </div>
        </label>
      </form>
    </Modal>
  )
}
