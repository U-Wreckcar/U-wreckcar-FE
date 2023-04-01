import axios from "axios"
import { getCookie } from "./Cookie"
import Cookies from "universal-cookie"
const cookiess = new Cookies()

console.log("엑시오스쿠키", cookiess.get("token"))
console.log(getCookie)
const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Refresh-Token": `Bearer ${cookiess.get("token")}`,
    "Cache-Control": "no-cache, no-store, must-revalidate",
  },
})

export const setClientHeaders = (token: string) => {
  instance.interceptors.request.use(async function (config: any) {
    console.log("setClient", token)
    config.headers["X-Refresh-Token"] = `Bearer ${token}`
    return config
  })
}

export default instance
