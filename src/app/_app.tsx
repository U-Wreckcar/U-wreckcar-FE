import localFont from "next/font/local"
import store from "src/redux/store/store"
import { Provider } from "react-redux"

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
