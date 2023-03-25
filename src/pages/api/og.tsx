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
          backgroundImage: `url("https://utm.works/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fogimg.0b843f68.png&w=1920&q=75")`,
          backgroundPosition: "center",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          color: "white",
          width: "100%",
          height: "100%",
        }}></div>
    ),
    {
      width: 1900,
      height: 950,
    }
  )
}
