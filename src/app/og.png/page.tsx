import Image from "next/image"
import React from "react"
import ogimage from "assets/ogimage.png"
export default function OGImage() {
  return (
    <>
      <Image src={ogimage} alt='og-image' width={1200} height={630} />
    </>
  )
}
