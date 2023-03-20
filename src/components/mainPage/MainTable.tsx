"use client"
import React, {
  HTMLProps,
  useMemo,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from "react"
import { MainTableType } from "./TableData"
// import { useGetUtm } from "util/hooks/useAsync";
import { getUTMs } from "util/async/api"
import Tooltip from "@mui/material/Tooltip"
import { MainTableProps } from "./MainBtnTable"

import {
  Table,
  Column,
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  ColumnResizeMode,
  getFilteredRowModel,
  ColumnFiltersState,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFacetedMinMaxValues,
  sortingFns,
  getSortedRowModel,
  FilterFn,
  SortingFn,
  FilterFns,
} from "@tanstack/react-table"

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils"
import styles from "./main.module.css"
import instance from "util/async/axiosConfig"
import { OutputModal } from "./OutputModal"
import { DeleteModal } from "./DeleteModal"
import { AddUtmModal } from "../sidebar/AddUtmModal"
import Image from "next/image"
import plusImg from "assets/plus.png"
import filterImg from "assets/filter.png"
import { EditModal } from "./MainMemoModal"
import { style } from "@mui/system"
import { redirect, usePathname, useSearchParams } from "next/navigation"
import Link from "next/link"
import { getCookie } from "@/util/async/Cookie"
declare module "@tanstack/table-core" {
  interface FilterFns {
    fuzzy: FilterFn<unknown>
  }
  interface FilterMeta {
    itemRank: RankingInfo
  }
}
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

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

let defaultData: Array<MainTableType> = []
export const MainTable: React.FC<MainTableProps> = ({ setSummary }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<Array<MainTableType>>([
    {
      created_at_filter: "2023-03-21",
      full_url:
        "https://www.naver.com?utm_source=bbb&utm_medium=cccc&utm_campaign=ddd&utm_term=cxxc",
      shorten_url: "https://cutt.ly/M4xu6ey",
      utm_campaign_id: "aaa",
      utm_campaign_name: "ddd",
      utm_content: null,
      utm_id: 48,
      utm_medium_name: "cccc",
      utm_memo: null,
      utm_source_name: "bbb",
      utm_term: "cxxc",
      utm_url: "www.naver.com",
    },
  ])
  const [target, setTarget] = useState("")
  const [show, setShow] = useState(false)
  const [output, setOutput] = useState(false)
  const [outputLength, setOutputLength] = useState<Array<MainTableType>>([])
  const [del, setDel] = useState(false)
  const [delLength, setDelLength] = useState<Array<MainTableType>>([])
  const [inputValue, setInputValue] = useState("")

  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>("onChange")
  const [removeModal, setRemoveModal] = useState(false)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [plus, setPlus] = useState(false)
  const [filter, setFilter] = useState(false)

  const getData = async () => {
    const res = await getUTMs()
    setData(res.data)
  }

  useEffect(() => {
    if (defaultData.length === 0) {
      getData()
    }
  }, [del, output])

  useEffect(() => {
    getData()
    if (defaultData.length !== 0) {
      setData(defaultData)
    }
  }, [defaultData, del, output])

  useEffect(() => {
    const cookie = getCookie("access_token")
    console.log(cookie)
    if (!cookie) {
      redirect("/login")
    }
  }, [])

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: 0,
    },
    overlay: {
      background: "#ffffff7f",
    },
  }
  const columns = useMemo<ColumnDef<MainTableType>[]>(
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
        header: "캠페인 ID",
        id: "utm_campaign_id",
        accessorKey: "utm_campaign_id",
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
        header: "Shorten URL",
        id: "shorten_url",
        accessorKey: "shorten_url",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 100,
      },
    ],
    []
  )

  const table = useReactTable({
    data,
    columns,
    columnResizeMode,
    state: {
      rowSelection,
      columnFilters,
    },
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    enableRowSelection: true, //enable row selection for all rows
    // enableRowSelection: row => row.original.age > 18, // or enable row selection conditionally per row
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    // getPaginationRowModel: getPaginationRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    debugTable: true,
    debugHeaders: true,
    debugColumns: false,
  })

  //삭제하기
  const onClickDelBtn = () => {
    let id: Array<MainTableType> = []
    table.getSelectedRowModel().flatRows.map((row) => id.push(row?.original))
    if (id.length === 0) {
      alert("삭제할 데이터를 선택해주세요")
    } else {
      setDel(true)
      setDelLength(id)
    }
  }

  //추출하기
  const onClickPopBtn = () => {
    let id: Array<MainTableType> = []
    table.getSelectedRowModel().flatRows.map((row) => id.push(row?.original))
    if (id.length === 0) {
      alert("추출할 데이터를 선택해주세요")
    } else {
      console.log(id)
      setOutput(true)
      setOutputLength(id)
    }
  }

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.btn_box}>
          <div className={styles.title_box_d}>
            <h1>내 UTM</h1>
            <h4>{data.length}개의 UTM이 쌓여 있어요!</h4>
          </div>
          <div className={styles.buttons_box}>
            <button
              className={styles.data_btn}
              onClick={() => setSummary(false)}
            >
              데이터 요약보기
            </button>
            <button
              id="export_btn"
              className={styles.button}
              onClick={onClickPopBtn}
            >
              추출하기
            </button>
            <OutputModal
              isOpen={output}
              onRequestClose={() => setOutput(false)}
              style={customStyles}
              data={outputLength}
            />
            <button className={styles.button} onClick={onClickDelBtn}>
              삭제하기
            </button>
            <DeleteModal
              isOpen={del}
              onRequestClose={() => setDel(false)}
              style={customStyles}
              data={delLength}
            />
            <button
              className={styles.plus_button}
              onClick={() => setFilter(!filter)}
            >
              <Image src={filterImg} alt="filter" width={24} height={24} />
            </button>
            <button
              className={styles.plus_button}
              onClick={() => setPlus(true)}
            >
              <Image src={plusImg} alt="plus" width={24} height={24} />
            </button>
            <AddUtmModal
              isOpen={plus}
              onRequestClose={() => setPlus(false)}
              style={customStyles}
            />
          </div>
          <EditModal
            isOpen={show}
            onRequestClose={() => setShow(false)}
            style={customStyles}
            value={inputValue}
            table={table}
            index={target}
          />
        </div>
        <div className={styles.table_scroll}>
          <div className="h-2" />
          <div className="h-4" />
          <div className="overflow-x-auto"></div>
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
                          // key: header.id,
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
                                  height: "50px",
                                  display: "flex",
                                  alignItems: "center",
                                },
                                // className: header.column.getCanSort()
                                //   ? 'cursor-pointer select-none'
                                //   : '',

                                onClick:
                                  header.column.getToggleSortingHandler(),
                              }}
                            >
                              {flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                            </div>
                            {filter && header.column.id !== "select" && (
                              <th
                                className={styles.filter_box}
                                {...{
                                  style: {
                                    width: "280px",
                                  },
                                }}
                              >
                                {header.column.getCanFilter() &&
                                header.column.id !== "select" ? (
                                  <Filter
                                    column={header.column}
                                    table={table}
                                  />
                                ) : null}
                              </th>
                            )}
                          </>
                        )}

                        {/* <div
                          {...{
                            onMouseDown: header.getResizeHandler(),
                            onTouchStart: header.getResizeHandler(),
                            className: `resizer ${
                              header.column.getIsResizing() ? 'isResizing' : ''
                            }`,
                            style: {
                              transform:
                                columnResizeMode === 'onEnd' &&
                                header.column.getIsResizing()
                                  ? `translateX(${
                                      table.getState().columnSizingInfo
                                        .deltaOffset
                                    }px)`
                                  : '',
                            },
                          }}
                        /> */}
                      </th>
                    )
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {data.length === 0 && (
                <div className={styles.no_data}>
                  <p>등록된 UTM이 없어요.</p>
                  <Link href={"/createutm"}>
                    <button>UTM 생성하기</button>
                  </Link>
                </div>
              )}
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
                          {cell.column.id === "utm_memo" && (
                            <Tooltip title={"메모 수정하기"}>
                              <div
                                id={cell.id}
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
                          {cell.column.id !== "utm_memo" &&
                            cell.column.id !== "select" && (
                              <Tooltip title={`${cell.getValue()}`}>
                                <div
                                  className={styles.td_box}
                                >{`${cell.getValue()}`}</div>
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
    </div>
  )
}

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>
  table: Table<any>
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id)

  const columnFilterValue = column.getFilterValue()
  const [startDate, setStartDate] = useState<string | number>()
  const [isOpen, setIsOpen] = useState(false)

  let data: Array<MainTableType> = []

  getUTMs().then((result) => (data = result.data))

  function getDatesStartToLast(startDate: any, lastDate: any) {
    const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)
    if (!(regex.test(startDate) && regex.test(lastDate)))
      return "Not Date Format"
    let result: (string | number | Date)[] = []
    const curDate = new Date(startDate)
    while (curDate <= new Date(lastDate)) {
      result.push(
        // curDate.toISOString().split("T")[0].toString().replace(/-/g, ".")
        curDate.toISOString().split("T")[0].toString()
      )
      curDate.setDate(curDate.getDate() + 1)
    }
    let dateList: any = []
    defaultData = data.filter((date) => result.includes(date.created_at_filter))
    defaultData.map((d) => dateList.push(d.created_at_filter))
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
    <>
      {column.id === "created_at_filter" && (
        <>
          {isOpen && (
            <div className={styles.dialog}>
              <div style={{ display: "flex", flexDirection: "column" }}>
                <DebouncedInput
                  type="date"
                  value={(columnFilterValue ?? "") as string}
                  onChange={(value) => {
                    setStartDate(value)
                  }}
                  list={column.id + "list"}
                />
                <DebouncedInput
                  type="date"
                  value={(columnFilterValue ?? "") as string}
                  onChange={(value) => getDatesStartToLast(startDate, value)}
                  list={column.id + "list"}
                />
                <button
                  className={styles.dialog_button}
                  onClick={() => setIsOpen(false)}
                >
                  X
                </button>
              </div>
            </div>
          )}
          <input
            type="text"
            className={styles.search_input}
            placeholder="기간 선택"
            onFocus={() => setIsOpen(true)}
          ></input>
        </>
      )}
      {column.id !== "created_at_filter" && (
        <>
          <datalist id={column.id + "list"}>
            {sortedUniqueValues.slice(0, 5000).map((value: any) => (
              <option value={value} key={value} />
            ))}
          </datalist>
          <DebouncedInput
            className={styles.search_input}
            type="text"
            value={(columnFilterValue ?? "") as string}
            onChange={(value) => column.setFilterValue(value)}
            placeholder={`검색 (${column.getFacetedUniqueValues().size})`}
          />
        </>
      )}
    </>
  )
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number
  onChange: (value: string | number) => void
  debounce?: number
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange">) {
  const [value, setValue] = React.useState(initialValue)

  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value)
    }, debounce)

    return () => clearTimeout(timeout)
  }, [value])

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  )
}
function IndeterminateCheckbox({
  indeterminate,
  className = "",
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!)

  useEffect(() => {
    if (typeof indeterminate === "boolean") {
      ref.current.indeterminate = !rest.checked && indeterminate
    }
  }, [ref, indeterminate])

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + " cursor-pointer"}
      {...rest}
    />
  )
}
