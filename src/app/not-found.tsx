import Link from "next/link";
import Image from "next/image";
import styles from "./not-found.module.css";
import notfoundpage from "public/assets/img/notfoundpage.png";
export default function NotFound() {
  return (
    <>
      <div className={styles.container} style={{ textAlign: "center", marginTop: "250px" }}>
        <Link prefetch={false} href={"/login"}>
          <h2> 404 Not Found 잘못된 URL</h2>
          <h3>URL을 확인하세요 그리고 새로고침 해주세요</h3>
          <Image src={notfoundpage} alt="button" width={250} height={50} />
        </Link>
      </div>
    </>
  );
}
