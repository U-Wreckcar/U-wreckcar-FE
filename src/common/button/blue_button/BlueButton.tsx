import React from "react";
import styles from "./BlueButton.module.css";
import localFont from "next/font/local";

type ButtonSize = "sm" | "md" | "login" | "email";
type ButtonType = "button" | "submit" | "reset";
type ButtonColor = "tp" | "full";
interface PropsType {
   text: string;
   color: ButtonColor;
   size: ButtonSize;
   types: ButtonType;
   disabled?: boolean;
   clickEvent?: () => void;
   typeEvent?: (e: any) => void;
}
// const pretendard = localFont({
//    src: "../../../../public/assets/font/Pretendard-Regular.ttf",
//    display: "swap",
// });
export const BlueButton: React.FC<PropsType> = (props) => {
   const { text, clickEvent, typeEvent, types, disabled, size, color } = props;

   return (
      <button
         className={`${styles.blue_button_style} ${styles[size]} ${styles[color]} `}
         onClick={clickEvent ? clickEvent : typeEvent}
         type={types}
         disabled={disabled}
      >
         {text}
      </button>
   );
};
