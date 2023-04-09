import Cookies from "universal-cookie"

export const cookies = new Cookies()
export const setCookie = (name: string, value: string) => {
  return cookies.set(name, value)
}

export const getCookie = (name: string) => {
  return cookies.get(name)
}
export const removeCookie = (name: string) => {
  return cookies.remove(name)
}
// export const logOut = () => {
//   cookies.remove("refresh_token")
//   cookies.remove("access_token")
//   localStorage.removeItem("token")
// }
