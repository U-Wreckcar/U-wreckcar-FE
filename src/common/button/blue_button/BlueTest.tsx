import React, { Attributes } from "react"
import styles from "./BlueButton.module.css"

type ButtonSize = "sm" | "md" | "login" | "email"
type ButtonType = "button" | "submit" | "reset"
type ButtonColor = "tp" | "full"
interface PropsType {
  text: string
  color: ButtonColor
  size: ButtonSize
  types: ButtonType
  disabled?: boolean
  confirmFN?: () => void
  typeEvent?: (e: any) => void
}

export const BlueTest: React.FC<PropsType> = (props) => {
  const { text, confirmFN, typeEvent, types, disabled, size, color } = props

  return (
    <button
      className={`${styles.blue_button_style} ${styles[size]} ${styles[color]}`}
      onClick={confirmFN ? confirmFN : typeEvent}
      type={types}
      disabled={disabled}>
      {text}
    </button>
  )
}
