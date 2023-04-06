import React, { FormEvent, useRef } from "react"
import Axios from "util/async/axiosConfig"
export default function testp() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const fileRef = useRef<HTMLInputElement>(null)
  const tsfn = (e: FormEvent) => {
    e.preventDefault()
    if (fileRef.current) {
      console.log(fileRef.current.files)
      const fileDate = fileRef.current.files
      const formData = new FormData()
      // @ts-ignore
      Array.from(fileDate).forEach((el: any) => {
        formData.append("userfile", el)
        console.log("1")
      })
      asyncfile(fileDate)
    }
  }
  const asyncfile = async (formdata: any) => {
    const res = await Axios.post("utms/importdata", formdata)
    console.log(res)
  }
  return (
    <form>
      <input ref={fileRef} type='file' />
      <button onClick={tsfn}>추출하기</button>
    </form>
  )
}
