import Image from "next/image"
import React from "react"
import og1200 from "assets/og1200.png"
export default function OGImage() {
  return (
    <>
      <Image src={og1200} alt='og-image' width={1200} height={630} />
    </>
  )
}
