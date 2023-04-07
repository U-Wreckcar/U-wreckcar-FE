import React, { FormEvent, useRef, useState } from "react"
import Axios from "util/async/axiosConfig"
import { styled } from "@mui/material/styles"
import Typography from "@mui/material/Typography"
import Tooltip, { TooltipProps, tooltipClasses } from "@mui/material/Tooltip"
import { ExcelAddModal } from "@/components/sidebar/ExcelAddModal"

export default function testp() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [excel, setExcel] = useState(false)
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
      })
      asyncfile(fileDate)
    }
  }
  const asyncfile = async (formdata: any) => {
    const res = await Axios.post("utms/importdata", formdata)
    console.log(res)
  }

  // const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  //   <Tooltip {...props} classes={{ popper: className }} />
  // ))(({ theme }) => ({
  //   [`& .${tooltipClasses.tooltip}`]: {
  //     backgroundColor: "#f5f5f9",
  //     color: "rgba(0, 0, 0, 0.87)",
  //     maxWidth: 220,
  //     fontSize: theme.typography.pxToRem(12),
  //     border: "1px solid #dadde9",
  //   },
  // }))

  // const customStyles = {
  //   content: {
  //     top: "55%",
  //     left: "50%",
  //     right: "auto",
  //     bottom: "auto",
  //     marginRight: "-50%",
  //     transform: "translate(-50%, -50%)",
  //     padding: 0,
  //   },
  // }

  return (
    <form>
      {/* {excel && (
        <ExcelAddModal
          isOpen={excel}
          onRequestClose={() => setExcel(false)}
          style={customStyles}
        />
      )}
      <HtmlTooltip
        title={
          <React.Fragment>
            <Typography color="inherit">Tooltip with HTML</Typography>
            <p>{"하하"}</p> <b>{"하하"}</b> <u>{"amazing content"}</u>.{" "}
            {"It's very engaging. Right?"}
          </React.Fragment>
        }
      >
        <button onClick={() => setExcel(true)}>HTML</button>
      </HtmlTooltip> */}
      <input ref={fileRef} type='file' />
      <button onClick={tsfn}>추출하기</button>
    </form>
  )
}
