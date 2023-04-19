import LoginBox from "src/components/loginPage/LoginBox"
import styles from "./login.module.css"

const LoginPage = () => {
  return (
    <div className={styles.login_container}>
      <LoginBox />
    </div>
  )
}

export default LoginPage
