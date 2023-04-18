"use client"
import React, { useEffect, useState } from "react"
import { PlusSideNav } from "./PlusSideNav"
import { SlimSideNav } from "./SlimSideNav"
import styles from "./styles.module.css"
import { usePathname } from "next/navigation"
import { Provider } from "react-redux"
import store from "src/redux/store/store"

export const SideNav = () => {
  const [plusSide, setPlusSide] = useState(true)
  const [side, setSide] = useState(false)
  const path = usePathname()

  useEffect(() => {
    if (path === "/main" || path === "/createutm" || path === "/userinfo") {
      setSide(true)
    } else {
      setSide(false)
    }
  }, [path, side])

  useEffect(() => {
    window.addEventListener("resize", () => {
      if (window.innerWidth < 1528) {
        setPlusSide(false)
      } else if (window.innerWidth >= 1528) {
        setPlusSide(true)
      }
    })
  }, [])

  useEffect(() => {
    if (window.innerWidth < 750) {
      setPlusSide(false)
    }
  }, [plusSide])

  return (
    <div>
      <Provider store={store}>
        {side && plusSide && <PlusSideNav setSide={setPlusSide} side={side} />}
        {side && !plusSide && <SlimSideNav setSide={setPlusSide} side={side} />}
      </Provider>
    </div>
  )
}
