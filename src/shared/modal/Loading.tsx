import CircularUnderLoad from "@/components/CircularUnderLoad"
import React from "react"
import ReactModal from "react-modal"
import styles from "./Loading.module.css"
import ProgressLoading from "./ProgressLoading"
type OutputModalType = {
  isOpen: boolean
  onRequestClose?: any
}
const Loading: React.FC<OutputModalType> = ({ isOpen, onRequestClose }) => {
  return (
    <div className={styles.container}>
      <ProgressLoading />
      <br />
      <p className={styles.text}>UTM 생성중..</p>
    </div>
  )
}

export default Loading
