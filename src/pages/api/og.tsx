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
          fontSize: 128,
          backgroundImage: `url("https://utm.works/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Fogimg.0b843f68.png&w=1920&q=75")`,
          backgroundPosition: "0% -20%",
          backgroundSize: "100%",
          backgroundRepeat: "no-repeat",
          color: "white",
          fontWeight: 900,
          width: "100%",
          height: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
        }}
      ></div>
    ),
    {
      width: 1200,
      height: 600,
    }
  )
}
