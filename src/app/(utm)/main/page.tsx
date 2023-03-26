import MainPageComponent from "@/components/mainPage/MainPage"
import store from "@/redux/store/store"
import { Provider } from "react-redux"
import React from "react"

export default function MainPage() {
  return (
    <>
      {/* <Provider store={store}> */}
      <MainPageComponent />
      {/* </Provider> */}
    </>
  )
}
