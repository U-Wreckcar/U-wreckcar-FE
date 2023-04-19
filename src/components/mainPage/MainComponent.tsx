"use client"

import React from "react"
import { Provider } from "react-redux"
import MainPageComponent from "./MainPage"
import store from "@/src/redux/store/store"

export const MainComponent = () => {
  return (
    <Provider store={store}>
      <MainPageComponent />
    </Provider>
  )
}
