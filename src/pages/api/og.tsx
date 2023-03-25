import Image from "next/image"
import ogimg from "./og-image.png"
import { ImageResponse } from "@vercel/og"

export const config = {
  runtime: "edge",
}

export default function () {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundImage: `url("https://utm.works/api/og1200.png")`,
          backgroundPosition: "center",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          color: "white",
          width: "1200",
          height: "630",
        }}></div>
    ),
    {
      width: 1900,
      height: 950,
    }
  )
}
