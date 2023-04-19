import axios, { AxiosAdapter } from "axios"
import { cacheAdapterEnhancer } from "axios-extensions"
import { getCookie } from "./Cookie"

const access_token = getCookie("access_token")
const refresh_token = getCookie("refresh_token")
const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_API,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${access_token}`,
    "X-Refresh-Token": `Bearer ${refresh_token}`,
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-store",
    Expires: "0",
  },
  adapter: cacheAdapterEnhancer(axios.defaults.adapter as AxiosAdapter),
})

export const setClientHeaders = (
  access_token: string,
  refresh_token: string
) => {
  console.log("hi")
  instance.interceptors.request.use(async function (config: any) {
    instance.defaults.headers.common.Authorization = `Bearer ${access_token}`
    instance.defaults.headers.common[
      "X-Refresh-Token"
    ] = `Bearer ${refresh_token}`
    return config
  })
}
export default instance
