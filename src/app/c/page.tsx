"use client";
import Mobile from "@/components/m_renderPage/Mobile";
import MobileErrorPage from "@/components/m_renderPage/MobileErrorPage";
import React, { useEffect } from "react";
// import { redirect } from "next/navigation";
// import { NextRequest, NextResponse, userAgent } from "next/server";
// import { request } from "http";

export default function Mobilepage() {
  // useEffect(() => {
  //   if (window.innerWidth > 400) {
  //     redirect("/");
  //   }
  // }, [window.innerWidth]);

  // const getUserScreen = (request: NextRequest) => {
  //   const url = request.nextUrl;
  //   const { device } = userAgent(request);
  //   console.log(device);
  // };

  return (
    <div>
      <Mobile />
    </div>
  );
}
