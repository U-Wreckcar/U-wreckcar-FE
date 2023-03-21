import React, {
  Dispatch,
  SetStateAction,
  HTMLProps,
  useMemo,
  useEffect,
  useState,
  useRef,
} from "react"
import { MainTableType } from "./TableData"
import { getUTMs } from "util/async/api"
import { CopyButton } from "../../shared/button/CopyButton"
import Tooltip from "@mui/material/Tooltip"
import Link from "next/link"
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
  getPaginationRowModel,
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
import { OutputModal } from "./OutputModal"
import { DeleteModal } from "./DeleteModal"
import { AddUtmModal } from "../sidebar/AddUtmModal"
import Image from "next/image"

import plusImg from "assets/plus.png"
import filterImg from "assets/filter.png"
import { EditModal } from "./MainMemoModal"
import { getCookie } from "@/util/async/Cookie"
import { redirect, useRouter } from "next/navigation"

export type MainTableProps = {
  setSummary: Dispatch<SetStateAction<boolean>>
}

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

export const MainBtnTable: React.FC<MainTableProps> = ({ setSummary }) => {
  const [rowSelection, setRowSelection] = useState({})
  const [data, setData] = useState<Array<MainTableType>>([
    {
      created_at_filter: "2023-03-21",
      full_url:
        "https://www.naver.com?utm_source=bbb&utm_medium=cccc&utm_campaign=ddd",
      shorten_url: "https://cutt.ly/F4xsxJK",
      utm_campaign_id: "aaa",
      utm_campaign_name: "ddd",
      utm_content: null,
      utm_id: 50,
      utm_medium_name: "cccc",
      utm_memo: null,
      utm_source_name: "bbb",
      utm_term: null,
      utm_url: "www.naver.com",
    },
  ])
  const [show, setShow] = useState(false)
  const [target, setTarget] = useState("")
  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>("onChange")
  const [removeModal, setRemoveModal] = useState(false)
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const input_ref = useRef<HTMLInputElement>(null)
  const textarea_ref = useRef<HTMLTextAreaElement>(null)
  const [output, setOutput] = useState(false)
  const [outputLength, setOutputLength] = useState<Array<MainTableType>>([])
  const [del, setDel] = useState(false)
  const [delLength, setDelLength] = useState<Array<MainTableType>>([])
  const [plus, setPlus] = useState(false)
  const [filter, setFilter] = useState(false)

  const [inputValue, setInputValue] = useState("")

  const getData = async () => {
    const res = await getUTMs()
    setData(res.data)
  }

  useEffect(() => {
    getData()
  }, [del, output, show, plus])

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
        header: "URL",
        id: "utm_url",
        accessorKey: "utm_url",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 130,
      },
      {
        header: "소스",
        id: "utm_source_name",
        accessorKey: "utm_source_name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 175,
      },
      {
        header: "미디움",
        id: "utm_medium_name",
        accessorKey: "utm_medium_name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 175,
      },
      {
        header: "캠페인 이름",
        id: "utm_campaign_name",
        accessorKey: "utm_campaign_name",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 290,
      },
      {
        header: "메모",
        id: "utm_memo",
        accessorKey: "utm_memo",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 620,
      },
      {
        header: "UTM",
        id: "full_url",
        accessorKey: "full_url",
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 120,
      },
      {
        header: "Shorten URL",
        id: "shorten_url",
        accessorKey: "shorten_url",
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
  //페이지 이동
  const moveUrl = (url: string) => {
    window.open(`https://${url}`, "_blank", "noopener,noreferrer")
  }
  return (
    <>
      <div className={styles.container}>
        <div className={styles.btn_box}>
          <div>
            <h1>내 UTM</h1>
            <h4>{data.length}개의 UTM이 쌓여 있어요!</h4>
          </div>
          <div className={styles.buttons_box}>
            <button
              className={styles.data_btn}
              onClick={() => setSummary(true)}
            >
              데이터 상세보기
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
                maxWidth: table.getCenterTotalSize(),
              },
            }}
          >
            <thead className={styles.th}>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        key={header.id}
                        className={styles.table_title_th}
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
                                    width: "630px",
                                  },
                                }}
                              >
                                {header.column.getCanFilter() ? (
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
                          className={styles.td}
                          {...{
                            style: {
                              width:
                                cell.column.id === "select"
                                  ? 80
                                  : cell.column.getSize(),
                            },
                          }}
                        >
                          {cell.column.id === "full_url" && (
                            <CopyButton
                              text={`${cell.getValue()}`}
                            ></CopyButton>
                          )}
                          {cell.column.id === "shorten_url" && (
                            <CopyButton
                              text={`${cell.getValue()}`}
                            ></CopyButton>
                          )}
                          {cell.column.id === "utm_url" && (
                            <Tooltip title={`${cell.getValue()}`}>
                              <button
                                onClick={() => moveUrl(`${cell.getValue()}`)}
                                className={styles.url_button}
                              >
                                url 연결
                              </button>
                            </Tooltip>
                          )}

                          {cell.column.id === "utm_memo" && (
                            <Tooltip title={"메모 수정하기"}>
                              <div
                                id={cell.id}
                                className={styles.memo_td}
                                onClick={(e: any) => {
                                  setTarget(e.target?.id)
                                  setShow(true)
                                  setInputValue(`${cell.getValue()}`)
                                }}
                              >{`${cell.getValue()}`}</div>
                            </Tooltip>
                          )}

                          {cell.column.id !== "utm_memo" &&
                            cell.column.id !== "utm_url" &&
                            cell.column.id !== "full_url" &&
                            cell.column.id !== "shorten_url" &&
                            flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
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
    </>
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

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === "number"
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  )

  return typeof firstValue === "number" ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[0] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? "")}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? "")}
          value={(columnFilterValue as [number, number])?.[1] ?? ""}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ""
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
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
        list={column.id + "list"}
      />
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
