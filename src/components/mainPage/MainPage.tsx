"use client"

import { useEffect, useState, lazy, Suspense } from "react"
import { Provider } from "react-redux"
import store from "@/redux/store/store"
import { useRouter } from "next/navigation"
import CircularUnderLoad from "../CircularUnderLoad"
import dynamic from "next/dynamic"

// const MainBtnTable = lazy(() => import("./MainBtnTable"))
// const MainTable = lazy(() => import("./MainTable"))
const MainBtnTable = dynamic(() => import("./MainBtnTable"), { ssr: false })
const MainTable = dynamic(() => import("./MainTable"), { ssr: false })

export default function MainPageComponent() {
  const [summary, setSummary] = useState(false)
  const router = useRouter()

  const prefetchOptions = {
    hydrateOnMount: true,
  }

  useEffect(() => {
    router.prefetch("/main")
  }, [router])

  return (
    <div id="root">
      <Provider store={store}>
        {summary ? (
          <Suspense
            fallback={
              <div>
                <CircularUnderLoad />
              </div>
            }
          >
            <MainTable setSummary={setSummary} />
          </Suspense>
        ) : (
          <Suspense
            fallback={
              <div>
                <CircularUnderLoad />
              </div>
            }
          >
            <MainBtnTable setSummary={setSummary} />
          </Suspense>
        )}
      </Provider>
    </div>
  )
}
