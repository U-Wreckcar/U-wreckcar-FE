import Image from "next/image";
import React from "react";
import styles from "./404.module.css";
import notfoundpage from "public/assets/img/notfoundpage.png";
import NotFoundCompo from "../components/notFound/NotFoundCompo";
import Link from "next/link";
export default function NotFound() {
   // const router = useRouter();
   // const goBack = () => {
   //    router.back();
   // };
   return (
      <>
         <div className={styles.container} style={{ textAlign: "center", marginTop: "250px" }}>
            {/* <NotFoundCompo /> */}
            <h2> 404 Not Found 잘못된 URL</h2>
            <h3>URL을 확인하세요 그리고 새로고침 해주세요</h3>
            <Link href={"/login"}>{/* <Image src={notfoundpage} alt="button" width={250} height={50} /> */}</Link>
         </div>
      </>
   );
}
