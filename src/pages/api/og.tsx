import Image from "next/image"
import ogimg from "./og-image.png"
import { ImageResponse } from "@vercel/og"

export const config = {
  runtime: "edge",
}

export default async function handler() {
  return new ImageResponse(
    (
      <div
        style={{
          backgroundColor: "black",
          backgroundSize: "150px 150px",
          height: "100%",
          width: "100%",
          display: "flex",
          textAlign: "center",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          flexWrap: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            justifyItems: "center",
          }}
        >
          <Image
            style={{ objectFit: "cover", objectPosition: "center" }}
            alt="Vercel"
            height={200}
            src={"https://utm.works/og.png"}
            // style={{ margin: "0 30px" }}
            width={232}
          />
        </div>
        <div
          style={{
            fontSize: 60,
            fontStyle: "normal",
            letterSpacing: "-0.025em",
            color: "white",
            marginTop: 30,
            padding: "0 120px",
            lineHeight: 1.4,
            whiteSpace: "pre-wrap",
          }}
        ></div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}
