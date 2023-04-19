"use client"

import React, { Dispatch, SetStateAction, useEffect, useState } from "react"
import { MainTableType } from "./TableData"
import { useDispatch, useSelector } from "react-redux"
import { getUTMs } from "src/util/async/api"
import Link from "next/link"

import blackFilterImg from "public/assets/b_filter.png"
import Image from "next/image"

import { OutputModal } from "./OutputModal"
import { DeleteModal } from "./DeleteModal"
import { AddUtmModal } from "../sidebar/AddUtmModal"
import { EditModal } from "./MainMemoModal"
import BtnAlert from "@/src/common/button/Alert"
import { CopyButton } from "@/src/common/button/CopyButton"

import axios from "axios"
import styles from "./main.module.css"
import Tooltip from "@mui/material/Tooltip"
import { rankItem } from "@tanstack/match-sorter-utils"
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  getSortedRowModel,
  FilterFn,
  ColumnDef,
  Table,
} from "@tanstack/react-table"
import { getCookie, removeCookie } from "src/util/async/Cookie"
import { useRouter } from "next/navigation"
import { DebouncedInput, IndeterminateCheckbox } from "./MainTableFunction"
import { addTable, dataTable, selectTable } from "@/src/redux/slice/addslice"

const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the itemRank info
  addMeta({
    itemRank,
  })

  // Return if the item should be filtered in/out
  return itemRank.passed
}

let defaultData: Array<MainTableType> = []
let dData: Array<MainTableType> = []
type MainTableProps = {
  setTable: Dispatch<SetStateAction<Table<MainTableType> | null>>
  del: boolean
  filter: boolean

const MainTable: React.FC<MainTableProps> = ({ setTable, del, filter }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<Array<MainTableType>>([])
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState("")
  // const [del, setDel] = useState(false)
  const [inputValue, setInputValue] = useState("")
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const isOpen = useSelector((state: any) => state.add.isOpen)
  const router = useRouter()
  const dispatch = useDispatch()
  const select = useSelector((state: any) => state.add.select)
  // const getData = async () => {
  //   const res: any = await getUTMs()
  //   setData(res.data)
  //   dData = res.data
  // }

  const accessToken = getCookie("access_token")
  const refreshToken = getCookie("refresh_token")

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${accessToken}`,
    "X-Refresh-Token": `Bearer ${refreshToken}`,
    "Cache-Control": "no-cache, no-store, must-revalidate",
    Pragma: "no-store",
    Expires: "0",
  }
  const getData = async () => {
    axios
      .get(`${process.env.NEXT_PUBLIC_API}utms`, {
        headers,
        timeout: 10000,
      })
      .then((res) => {
        setData(res.data)
        dispatch(dataTable(res.data))
      })
      .catch((error) => {
        removeCookie("access_token")
        removeCookie("refresh_token")
        router.push("/login")
        console.log(error)
      })
  }
  useEffect(() => {
    try {
      getData()
    } catch (err) {
      router.replace("/")
    }
  }, [show, isOpen])

  useEffect(() => {
    setTimeout(() => {
      getData()
    }, 500)
  }, [del])

  useEffect(() => {
    if (defaultData.length === 0 || !defaultData) {
      setData([])
    }
    if (defaultData.length !== 0) {
      setData(defaultData)
    }
  }, [defaultData.length])

  const columns = React.useMemo<ColumnDef<MainTableType>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <IndeterminateCheckbox
            {...{
              checked: table.getIsAllRowsSelected(),
              indeterminate: table.getIsSomeRowsSelected(),
              onChange: table.getToggleAllRowsSelectedHandler(),
            }}
          />
        ),
        cell: ({ row }) => (
          <div className={styles.input_box}>
            <IndeterminateCheckbox
              {...{
                checked: row.getIsSelected(),
                disabled: !row.getCanSelect(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
            />
          </div>
        ),
      },
      {
        header: "생성일자",
        id: "created_at_filter",
        accessorKey: "created_at_filter",

        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 80,
      },
      {
        header: "URL",
        id: "utm_url",
        accessorKey: "utm_url",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 150,
      },

      {
        header: "소스",
        id: "utm_source_name",
        accessorKey: "utm_source_name",

        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 110,
      },
      {
        header: "미디움",
        id: "utm_medium_name",
        accessorKey: "utm_medium_name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 110,
      },
      {
        header: "캠페인 이름",
        id: "utm_campaign_name",
        accessorKey: "utm_campaign_name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 260,
      },
      {
        header: "캠페인 ID",
        id: "utm_campaign_id",
        accessorKey: "utm_campaign_id",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 150,
      },
      {
        header: "캠페인 텀",
        id: "utm_term",
        accessorKey: "utm_term",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 110,
      },
      {
        header: "캠페인 콘텐츠",
        id: "utm_content",
        accessorKey: "utm_content",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 110,
      },
      {
        header: "메모",
        id: "utm_memo",
        accessorKey: "utm_memo",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 150,
      },
      {
        header: "UTM",
        id: "full_url",
        accessorKey: "full_url",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 150,
      },
      {
        header: "Short URL",
        id: "shorten_url",
        accessorKey: "shorten_url",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 100,
      },
      {
        header: "클릭 수",
        id: "click_count",
        accessorKey: "click_count",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 120,
      },
    ],
    []
  )
  const table = useReactTable({
    data,
    columns,
    state: {
      rowSelection,
      columnFilters,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableRowSelection: true,
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
  })

  useEffect(() => {
    if (table !== null) {
      setTable(table)
    }
  }, [table])

  useEffect(() => {
    dispatch(selectTable(rowSelection))
  }, [rowSelection])

  useEffect(() => {
    setRowSelection(select)
  }, [select])

  return (
    <div className={styles.main_wrap}>
      <div className={styles.table_scroll}>
        <table
          className={styles.table}
          {...{
            style: {
              width: table.getCenterTotalSize(),
            },
          }}
        >
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <th
                      key={header.id}
                      {...{
                        colSpan: header.colSpan,
                        style: {
                          width:
                            header.column.id === "select"
                              ? 80
                              : header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            className={styles.btn_input_Box}
                            {...{
                              style: {
                                height: "30px",
                                display: "flex",
                                alignItems: "center",
                              },

                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                          </div>
                          {filter && header.column.id === "select" && (
                            <div className={styles.header_filter_box}>
                              <Image
                                src={blackFilterImg}
                                alt="filter"
                                width={25}
                                height={25}
                              />
                            </div>
                          )}
                        </>
                      )}
                      {filter && header.column.id !== "select" && (
                        <div
                          className={styles.filter_box}
                          {...{
                            style: {
                              width: "280px",
                            },

                          }}
                        >
                          {header.column.getCanFilter() &&
                          header.column.id !== "select" ? (
                            <Filter column={header.column} table={table} />
                          ) : null}
                        </div>
                      )}
                    </th>
                  )
                })}
              </tr>
            ))}
          </thead>
          {data.length === 0 && (
            <div className={styles.no_data}>
              <div className={styles.no_data_item}>
                <p>등록된 UTM이 없어요.</p>
                <Link href={"/createutm"}>
                  <button>UTM 생성하기</button>
                </Link>
              </div>
            </div>
          )}
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        key={cell.id}
                        {...{
                          style: {
                            width:
                              cell.column.id === "select"
                                ? 80
                                : cell.column.getSize(),
                          },
                        }}
                      >
                        {cell.column.id === "utm_url" && (
                          <Tooltip title={`${cell.getValue()}`}>
                            <div
                              className={styles.td_box}
                              style={{
                                cursor: "pointer",
                              }}
                              onClick={() =>
                                window.open(
                                  `${cell.getValue()}`,
                                  "_blank",
                                  "noopener,noreferrer"
                                )
                              }
                            >{`${cell.getValue()}`}</div>
                          </Tooltip>
                        )}
                        {cell.column.id === "utm_memo" && (
                          <Tooltip title={"메모 수정하기"}>
                            <div
                              id={cell.id}
                              style={{
                                cursor: "pointer",
                                fontSize: "0.7rem",
                              }}
                              onClick={(e: any) => {
                                setTarget(e.target?.id)
                                setShow(true)
                                setInputValue(`${cell.getValue()}`)
                              }}
                            >{`${cell.getValue()}`}</div>
                          </Tooltip>
                        )}
                        {cell.column.id === "select" &&
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        {cell.column.id === "full_url" && (
                          <CopyButton text={`${cell.getValue()}`}></CopyButton>
                        )}
                        {cell.column.id === "shorten_url" && (
                          <CopyButton text={`${cell.getValue()}`}></CopyButton>
                        )}
                        {cell.column.id === "click_count" && (
                          <Tooltip title="shorten URL 클릭 수입니다.">
                            <div
                              className={styles.td_box}
                            >{`${cell.getValue()}`}</div>
                          </Tooltip>
                        )}
                        {cell.column.id !== "utm_memo" &&
                          cell.column.id !== "utm_url" &&
                          cell.column.id !== "select" &&
                          cell.column.id !== "full_url" &&
                          cell.column.id !== "shorten_url" &&
                          cell.column.id !== "click_count" && (
                            <Tooltip title={`${cell.getValue()}`}>
                              <div
                                className={
                                  styles.td_box
                                }>{`${cell.getValue()}`}</div>
                            </Tooltip>
                          )}
                    </td>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

const Filter = ({ column, table }: any) => {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()
  const [startDate, setStartDate] = React.useState<string | number>()
  const [isOpen, setIsOpen] = React.useState(false)

  React.useEffect(() => {
    if (isOpen) {
      defaultData = dData
      column.setFilterValue((old: Array<string>) => console.log(old))
    }
  }, [isOpen])

  //날짜 두 개 받아서 사이 값 구하기
  function getDatesStartToLast(startDate: any, lastDate: any) {
    const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)

    if (!(regex.test(startDate) && regex.test(lastDate)))
      return "Not Date Format"

    let result: (string | number | Date)[] = []

    const curDate = new Date(startDate)

    while (curDate <= new Date(lastDate)) {
      result.push(curDate.toISOString().split("T")[0].toString())
      curDate.setDate(curDate.getDate() + 1)
    }

    defaultData = dData.filter((date) =>
      result.includes(date.created_at_filter)
    )

    column.setFilterValue((old: Array<string>) => console.log(old))
  }

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return (
    <div>
      {column.id === "created_at_filter" && (
        <>
          {isOpen && (
            <div className={styles.dialog}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DebouncedInput
                  type='date'
                  value={(columnFilterValue ?? "") as string}
                  onChange={(value) => {
                    setStartDate(value)
                  }}
                  list={column.id + "list"}
                />
                <DebouncedInput
                  type='date'
                  value={(columnFilterValue ?? "") as string}
                  onChange={(value) => getDatesStartToLast(startDate, value)}
                  list={column.id + "list"}
                />
                <button
                  className={styles.dialog_button}
                  onClick={() => setIsOpen(false)}>
                  X
                </button>
              </div>
            </div>
          )}
          <input
            type='text'
            className={styles.search_input}
            placeholder='기간 선택'
            onFocus={() => {
              setIsOpen(true)
              defaultData = dData
            }}></input>
        </>
      )}

      {column.id !== "created_at_filter" && (
        <>
          <datalist id={column.id + "list"}>
            {sortedUniqueValues.map((value: any) => (
              <option value={value} key={value} />
            ))}
          </datalist>
          <DebouncedInput
            className={styles.search_input}
            type='text'
            value={(columnFilterValue ?? "") as string}
            onChange={(value) => column.setFilterValue(value)}
            placeholder={`검색 (${column.getFacetedUniqueValues().size})`}
            list={column.id + "list"}
          />
        </>
      )}
    </div>
  )
}

export default MainTable
