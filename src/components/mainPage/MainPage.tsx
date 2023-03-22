"use client"
import { MainBtnTable } from "./MainBtnTable"
import { MainTable } from "./MainTable"
import { useState } from "react"

export default function MainPageComponent() {
  const [summary, setSummary] = useState(true)
  return (
    <>
      {summary ? (
        <MainBtnTable setSummary={setSummary} />
      ) : (
        <MainTable setSummary={setSummary} />
      )}
    </>
  )
}
