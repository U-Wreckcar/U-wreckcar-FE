"use client"

import MainPageComponent from "src/components/mainPage/MainPage"
import React from "react"
import { Provider } from "react-redux"
import store from "src/redux/store/store"

export default function MainPage() {
  return (
    <Provider store={store}>
      <MainPageComponent />
    </Provider>
  )
}
