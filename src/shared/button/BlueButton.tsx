import React from "react"
import styles from "./BlueButton.module.css"

type propsType = {
  text: string
  x: number
  y: number
  types?: any
  disabled?: boolean
  confirmFN?: () => void
}

export const BlueButton: React.FC<propsType> = (props) => {
  const { text, confirmFN, types, disabled, x, y } = props

  return (
    <button
      className={styles.blue_button_style}
      style={{ width: `${x}px`, height: `${y}px` }}
      onClick={confirmFN}
      type={types}
      disabled={disabled}>
      {text}
    </button>
  )
}
