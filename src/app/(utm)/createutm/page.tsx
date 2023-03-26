"use client"
import React, { useEffect, useState } from "react"
import { CreateUTM } from "components/createPage/CreateUTM"
import { CreateCopyBox } from "components/createPage/CreateCopyBox"
import styles from "./createutm.module.css"

export default function CreateUTMPage() {
  const [resUTM, setResUTM] = useState([])
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
  }, [])
  return (
    <>
      {isLoading && (
        <div className={styles.create_container}>
          <h1>새 UTM 생성하기</h1>
          <p>UTM은 최대 5개까지 생성할 수 있습니다.</p>
          <CreateUTM setResUTM={setResUTM} resUTM={resUTM} />
          <CreateCopyBox resUTM={resUTM} />
        </div>
      )}
    </>
  )
}
