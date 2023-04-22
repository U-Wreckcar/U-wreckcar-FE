import React, { Dispatch, SetStateAction } from "react";
import styles from "./UserModal.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeCookie } from "src/util/async/Cookie";
import Image from "next/image";
import user from "public/assets/img/h_user_icon.png";
import logout from "public/assets/img/h_logout_icon.png";
type propsType = {
   setModal: Dispatch<SetStateAction<boolean>>;
   modal: boolean;
};
const UserModal: React.FC<propsType> = ({ setModal, modal }) => {
   const router = useRouter();
   const logOut = () => {
      removeCookie("access_token");
      removeCookie("refresh_token");

      router.push("/");
      setModal(!modal);
   };

   const windowSize = window.innerWidth - 300;

   return (
      <>
         <div
            className={styles.containel}
            onClick={() => {
               setModal(false);
            }}
         >
            <div className={styles.section}>
               <dialog className={styles.dialog_containel} style={{ left: `${windowSize}px` }}>
                  <Link className={styles.links} href={"/userinfo"}>
                     <div className={styles.links_user}>
                        <Image
                           onClick={() => {
                              setModal(!modal);
                           }}
                           className={styles.links_user_box}
                           src={user}
                           alt=""
                           width={24}
                           height={24}
                        />
                        <p>개인정보 관리</p>
                     </div>
                  </Link>
                  <div
                     onClick={() => {
                        logOut();
                        // router.push("/")
                        // setModal(!modal)
                     }}
                     className={styles.links_logout}
                  >
                     <Image className={styles.links_logout_box} src={logout} alt="" width={24} height={24} />
                     <p>로그아웃</p>
                  </div>
               </dialog>
            </div>
         </div>
      </>
   );
};
export default UserModal;
