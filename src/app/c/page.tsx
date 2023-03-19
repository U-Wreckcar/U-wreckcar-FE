"use client";
import Mobile from "@/components/m_renderPage/Mobile";
import React, { useEffect } from "react";
// import { redirect } from 'next/navigation';

export default function Mobilepage() {
  // useEffect(() => {
  //   if (window.innerWidth > 400) {
  //     redirect('/');
  //   }
  // }, [window.innerWidth]);
  return (
    <div>
      <Mobile />
    </div>
  );
}
