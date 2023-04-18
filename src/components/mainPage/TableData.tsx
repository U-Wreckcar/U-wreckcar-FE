import React from "react"
import { ColumnDef } from "@tanstack/react-table"
import { IndeterminateCheckbox } from "./MainTableFunction"
import styles from "./main.module.css"

export type MainTableType = {
  utm_id: number
  created_at_filter: string
  utm_url: string
  // user_utm_source_id:any;
  utm_campaign_id: string
  utm_source_name: string
  // user_utm_medium_id:any;
  utm_medium_name: string
  utm_campaign_name: string | null
  utm_term: string | null
  utm_content: string | null
  utm_memo: string | null
  full_url: string
  shorten_url: string
  click_count: number
}

// export const columns = React.useMemo<ColumnDef<MainTableType>[]>(() => {
//   return [
//     {
//       id: "select",
//       header: ({ table }) => (
//         <IndeterminateCheckbox
//           {...{
//             checked: table.getIsAllRowsSelected(),
//             indeterminate: table.getIsSomeRowsSelected(),
//             onChange: table.getToggleAllRowsSelectedHandler(),
//           }}
//         />
//       ),
//       cell: ({ row }) => (
//         <div className={styles.input_box}>
//           <IndeterminateCheckbox
//             {...{
//               checked: row.getIsSelected(),
//               disabled: !row.getCanSelect(),
//               indeterminate: row.getIsSomeSelected(),
//               onChange: row.getToggleSelectedHandler(),
//             }}
//           />
//         </div>
//       ),
//     },
//     {
//       header: "생성일자",
//       id: "created_at_filter",
//       accessorKey: "created_at_filter",

//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 80,
//     },
//     {
//       header: "URL",
//       id: "utm_url",
//       accessorKey: "utm_url",
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 150,
//     },

//     {
//       header: "소스",
//       id: "utm_source_name",
//       accessorKey: "utm_source_name",

//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 110,
//     },
//     {
//       header: "미디움",
//       id: "utm_medium_name",
//       accessorKey: "utm_medium_name",
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 110,
//     },
//     {
//       header: "캠페인 이름",
//       id: "utm_campaign_name",
//       accessorKey: "utm_campaign_name",
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 260,
//     },
//     {
//       header: "캠페인 ID",
//       id: "utm_campaign_id",
//       accessorKey: "utm_campaign_id",
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 150,
//     },
//     {
//       header: "캠페인 텀",
//       id: "utm_term",
//       accessorKey: "utm_term",
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 110,
//     },
//     {
//       header: "캠페인 콘텐츠",
//       id: "utm_content",
//       accessorKey: "utm_content",
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 110,
//     },
//     {
//       header: "메모",
//       id: "utm_memo",
//       accessorKey: "utm_memo",
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 150,
//     },
//     {
//       header: "UTM",
//       id: "full_url",
//       accessorKey: "full_url",
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 150,
//     },
//     {
//       header: "Short URL",
//       id: "shorten_url",
//       accessorKey: "shorten_url",
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 100,
//     },
//     {
//       header: "클릭 수",
//       id: "click_count",
//       accessorKey: "click_count",
//       cell: (info) => info.getValue(),
//       footer: (props) => props.column.id,
//       minSize: 120,
//     },
//   ]
// }, [])
