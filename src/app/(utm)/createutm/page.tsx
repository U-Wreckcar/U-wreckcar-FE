"use client"
import React, { useEffect, useState } from "react"
import { CreateUTM } from "components/createPage/CreateUTM"
import { CreateCopyBox } from "components/createPage/CreateCopyBox"
import styles from "./createutm.module.css"
import Link from "next/link"

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
          <p>UTM은 한번에 5개까지 생성할 수 있습니다.</p>
          {/* <div className={styles.hlep_text}>
            ❓ UTM 생성을 어떻게 해야할 지 모르겠다면
            <Link
              href={
                "https://unexpected-ceder-0b7.notion.site/0a3db0d8103f4be2855a23186fc1b5e3"
              }
              target='_blank'>
              {" "}
              가이드보기{" "}
            </Link>
          </div> */}
          <CreateUTM setResUTM={setResUTM} resUTM={resUTM} />
          <CreateCopyBox resUTM={resUTM} />
        </div>
      )}
    </>
  )
}
