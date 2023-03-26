import React from "react"
import "./globals.css"
import { Provider } from "react-redux"
import localFont from "next/font/local"
import store from "@/redux/store/store"

/*
 * Type
 */
import type { AppProps } from "next/app"

const myFont = localFont({ src: "./PretendardVariable.woff2" })

export default function APP({ Component, pageProps }: AppProps) {
  return (
    <>
      <Provider store={store}>
        <main className={myFont.className}>
          <Component {...pageProps} />
        </main>
      </Provider>
    </>
  )
}
