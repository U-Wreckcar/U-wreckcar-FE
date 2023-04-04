"use client"
import LoginBox from "@/components/loginPage/LoginBox"
import styles from "./login.module.css"

const LoginPage = () => {
  return (
    <div className={styles.login_container}>
      <LoginBox />
    </div>
  )
}

export default LoginPage
