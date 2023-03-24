import React from "react"
import type { AppProps } from "next/app"
import { Hydrate } from "@tanstack/react-query"
import "./globals.css"
import localFont from "next/font/local"
import { useRouter } from "next/router"
import Head from "next/head"
import Script from "next/script"
import store from "@/redux/store/store"
import { Provider } from "react-redux"

const myFont = localFont({ src: "./PretendardVariable.woff2" })

export default function APP({ Component, pageProps }: AppProps) {
  // const ogImgPath = `${router.basePath}/og-image.png`;
  return (
    <>
      <Provider store={store}>
        {/* <Hydrate state={pageProps.dehydratedState}> */}
        <main className={myFont.className}>
          <Component {...pageProps} />
        </main>
        {/* </Hydrate> */}
      </Provider>
    </>
  )
}
