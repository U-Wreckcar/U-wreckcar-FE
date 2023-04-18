"use client"
import React, { useEffect, useState } from "react"
import { BaseHeader } from "./BaseHeader"
import { RenderHeader } from "./RenderHeader"
import { usePathname } from "next/navigation"

export default function Header() {
  const [renderPath, setRenderPath] = useState(false)
  const [basePath, setBasePath] = useState(false)
  const pathName = usePathname()

  useEffect(() => {
    if (
      pathName === "/main" ||
      pathName === "/createutm" ||
      pathName === "/userinfo" ||
      pathName === "/auth"
    ) {
      setBasePath(true)
      setRenderPath(false)
    } else {
      setBasePath(false)
      setRenderPath(true)
    }
  }, [pathName, basePath, renderPath])

  return (
    <>
      {basePath && <BaseHeader pathName={pathName} />}
      {renderPath && <RenderHeader />}
    </>
  )
}
