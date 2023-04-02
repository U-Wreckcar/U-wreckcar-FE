"use client"
import { MainBtnTable } from "./MainBtnTable"
import { MainTable } from "./MainTable"
import { useState } from "react"
import { Provider } from "react-redux"
import store from "@/redux/store/store"

export default function MainPageComponent() {
  const [summary, setSummary] = useState(false)

  return (
    <>
      <Provider store={store}>
        {summary ? (
          <MainTable setSummary={setSummary} />
        ) : (
          <MainBtnTable setSummary={setSummary} />
        )}
      </Provider>
    </>
  )
}
