"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { getCookie } from "src/util/async/Cookie"
import { MainTableType } from "./TableData"
import { Alert, AlertTitle } from "@mui/material"
import styles from "./main.module.css"
import BtnAlert from "src/common/button/Alert"
import { OutputModal } from "./OutputModal"
import { DeleteModal } from "./DeleteModal"
import { AddUtmModal } from "../sidebar/AddUtmModal"
import { EditModal } from "./MainMemoModal"
import { customStyles } from "../loginPage/LoginModal"
import { delSelectTable } from "@/src/redux/slice/addslice"
import { Table } from "@tanstack/react-table"

import filterImg from "public/assets/filter.png"
import plusImg from "public/assets/plus.png"
import Image from "next/image"
import { useAppDispatch, useAppSelector } from "@/src/util/reduxType/type"

const MainTable = dynamic(() => import("./MainTable"), { ssr: false })

export default function MainPageComponent() {
  const [output, setOutput] = useState(false)
  const [table, setTable] = useState<Table<MainTableType> | null>(null)
  const [outputLength, setOutputLength] = useState<Array<MainTableType>>([])
  const [delLength, setDelLength] = useState<Array<MainTableType>>([])
  const [plus, setPlus] = useState(false)
  const [alert, setAlert] = useState(false)
  const [filter, setFilter] = useState(false)
  const [warningAlert, setWarningAlert] = useState(false)
  const [title, setTitle] = useState("")
  const [del, setDel] = useState(false)
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState("")
  const [inputValue, setInputValue] = useState("")

  const data = useAppSelector((state: any) => state.add.data)
  const rowSelection = useAppSelector((state: any) => state.add.select)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const prefetchOptions = {
    hydrateOnMount: true,
  }

  useEffect(() => {
    router.prefetch("/main")
  }, [router])

  useEffect(() => {
    const cookie = getCookie("refresh_token")
    if (!cookie) {
      router.push("/login")
    }
  }, [])

  //삭제하기
  const onClickDelBtn = () => {
    let id: Array<MainTableType> = []
    table
      ?.getSelectedRowModel()
      .flatRows.map((row: any) => id.push(row?.original))
    dispatch(delSelectTable())
    // setRowSelection({})
    if (id.length === 0) {
      setWarningAlert(true)
      // window.alert("삭제할 데이터를 선택해주세요")
    } else {
      setDel(true)
      setDelLength(id)
    }
  }

  //추출하기
  const onClickPopBtn = () => {
    const id: Array<MainTableType> = []
    table
      ?.getSelectedRowModel()
      .flatRows.map((row: any) => id.push(row?.original))
    if (id.length === 0) {
      setWarningAlert(true)
    } else {
      setOutput(true)
      setOutputLength(id)
    }
  }

  useEffect(() => {
    const id: Array<MainTableType> = []
    table
      ?.getSelectedRowModel()
      .flatRows.map((row: { original: MainTableType }) =>
        id.push(row?.original)
      )
    if (id.length === 0) {
      setTitle(`${data?.length}개의 UTM이 쌓여 있어요!`)
    } else if (id.length !== 0) {
      setTitle(`${id?.length}개의 UTM이 선택됐어요!`)
    }
  }, [rowSelection, data])

  useEffect(() => {
    if (alert) {
      setTimeout(() => {
        setAlert(false)
      }, 3000)
    }
  }, [alert])

  useEffect(() => {
    if (warningAlert) {
      setTimeout(() => {
        setWarningAlert(false)
      }, 3000)
    }
  }, [warningAlert])

  return (
    <div id="root">
      {warningAlert && (
        <Alert severity="warning">
          <AlertTitle>Warning</AlertTitle>
          선택된 데이터가 없습니다.
          <strong>데이터를 체크해주세요!</strong>
        </Alert>
      )}
      {alert && (
        <BtnAlert
          title={"성공"}
          contents={"UTM이 복사되었습니다!"}
          onClickEvent={setAlert}
        />
      )}
      <div className={styles.container}>
        <div className={styles.btn_box}>
          <div className={styles.title_box_d}>
            <h1>내 UTM</h1>
            <h4>{title}</h4>
          </div>
          <div className={styles.buttons_box}>
            <button
              id="export_btn"
              className={styles.button}
              onClick={onClickPopBtn}
            >
              추출하기
            </button>
            <OutputModal
              isOpen={output}
              onRequestClose={() => setOutput(false)}
              style={customStyles}
              dataList={outputLength}
            />
            <button className={styles.button} onClick={onClickDelBtn}>
              삭제하기
            </button>
            <DeleteModal
              isOpen={del}
              onRequestClose={() => setDel(false)}
              style={customStyles}
              data={delLength}
              // setRowSelection={setRowSelection}
            />
            <button
              className={styles.plus_button}
              onClick={() => {
                setFilter(!filter)
                dispatch(delSelectTable())
              }}
            >
              <Image src={filterImg} alt="filter" width={24} height={24} />
            </button>
            <button
              className={styles.plus_button}
              onClick={() => setPlus(true)}
            >
              <Image src={plusImg} alt="plus" width={24} height={24} />
            </button>
            <AddUtmModal
              isOpen={plus}
              onRequestClose={() => setPlus(false)}
              style={customStyles}
            />
          </div>
          <EditModal
            isOpen={show}
            onRequestClose={() => setShow(false)}
            style={customStyles}
            value={inputValue}
            table={table}
            index={target}
          />
        </div>
        <MainTable setTable={setTable} del={del} filter={filter} />
      </div>
    </div>
  )
}
