import Cookies from "universal-cookie"

export const cookies = new Cookies()
export const setCookie = (name: string, value: string) => {
  return cookies.set(name, value)
}

export const getCookie = (name: string) => {
  console.log("쿠키파일", cookies.get("token"))

  return cookies.get(name)
}
console.log("쿠키공장", cookies.get("token"))
export const removeCookie = (name: string) => {
  return cookies.remove(name)
}
