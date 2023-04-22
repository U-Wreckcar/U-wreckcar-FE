"use client";
import Image from "next/image";
import React from "react";
import notfoundpage from "public/assets/img/notfoundpage.png";
import { useRouter } from "next/router";
import Link from "next/link";
export default function NotFoundCompo() {
   const router = useRouter();
   const goBack = () => {
      router.back();
   };
   return (
      <>
         <h2> Not Found</h2>
         <h2 onClick={goBack}>새로고침 해주세요</h2>
         <Link href={"/login"}>
            <Image src={notfoundpage} alt="button" width={250} height={50} />
         </Link>
      </>
   );
}
