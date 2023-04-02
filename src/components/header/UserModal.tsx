import React, { Dispatch, SetStateAction } from "react"
import styles from "./UserModal.module.css"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { removeCookie } from "@/util/async/Cookie"
type propsType = {
  setModal: Dispatch<SetStateAction<boolean>>
  modal: boolean
}
const UserModal: React.FC<propsType> = ({ setModal, modal }) => {
  const router = useRouter()
  const logOut = () => {
    removeCookie("access_token")
    removeCookie("refresh_token")

    router.push("/")
    setModal(!modal)
  }
  return (
    <>
      <div
        className={styles.containel}
        onClick={() => {
          setModal(false)
        }}></div>
      <dialog className={styles.dialog_containel}>
        <Link className={styles.links} href={"/userinfo"}>
          <div
            className={styles.links_box}
            onClick={() => {
              setModal(!modal)
            }}>
            개인정보 관리
          </div>
        </Link>
        <div
          className={styles.links_box}
          onClick={() => {
            logOut()
          }}>
          로그아웃
        </div>
      </dialog>
    </>
  )
}
export default UserModal
