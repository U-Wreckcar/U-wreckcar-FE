import axios from "axios"
import { getCookie } from "./Cookie"

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    "X-Refresh-Token": `Bearer ${getCookie("token")}`,
    "Cache-Control": "no-cache, no-store, must-revalidate",
  },
})

// export const setClientHeaders = (token: string) => {
//   instance.interceptors.request.use(async function (config: any) {
//     console.log("setClient", token)
//     config.headers["X-Refresh-Token"] = `Bearer ${token}`
//     return config
//   })
// }

export default instance
