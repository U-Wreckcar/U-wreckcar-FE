import React, { Attributes } from "react"
import styles from "./BlueButton.module.css"

type ButtonSizeIF = "sm" | "md"
type ButtonType = "button" | "submit" | "reset"

interface PropsType {
  text: string
  size: ButtonSizeIF
  types: ButtonType
  disabled?: boolean
  confirmFN?: () => void
  typeEvent?: (e: any) => void
}

export const BlueTest: React.FC<PropsType> = (props) => {
  const { text, confirmFN, typeEvent, types, disabled, size } = props

  return (
    <button
      className={`${styles.blue_button_style} ${styles[size]} `}
      onClick={confirmFN ? confirmFN : typeEvent}
      type={types}
      disabled={disabled}>
      {text}
    </button>
  )
}
