"use client"

import { useEffect, useState, lazy, Suspense } from "react"
import { Provider } from "react-redux"
import store from "@/redux/store/store"
import { useRouter } from "next/navigation"
import dynamic from "next/dynamic"
import { getCookie } from "@/util/async/Cookie"

const MainTable = dynamic(() => import("./MainTable"), { ssr: false })

export default function MainPageComponent() {
  const router = useRouter()

  const prefetchOptions = {
    hydrateOnMount: true,
  }

  useEffect(() => {
    router.prefetch("/main")
  }, [router])

  useEffect(() => {
    const cookie = getCookie("access_token")
    if (!cookie) {
      router.push("/login")
    }
  }, [])
  return (
    <div id='root'>
      <Provider store={store}>
        <MainTable />
      </Provider>
    </div>
  )
}
