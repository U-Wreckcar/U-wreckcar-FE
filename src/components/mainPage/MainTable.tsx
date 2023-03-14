import React, {
  HTMLProps,
  useMemo,
  useEffect,
  useState,
  useRef,
  useImperativeHandle,
} from 'react';
import { MainTableType } from './TableData';
import { useGetUtm } from 'util/hooks/useAsync';
import { getUTMs } from 'util/async/api';
import { MainTableProps } from './MainBtnTable';
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
} from '@tanstack/react-table';

import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils';
import styles from './styles.module.css';
import instance from 'util/async/axiosConfig';

declare module '@tanstack/table-core' {
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}
const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value);

  // Store the itemRank info
  addMeta({
    itemRank,
  });

  // Return if the item should be filtered in/out
  return itemRank.passed;
};

const fuzzySort: SortingFn<any> = (rowA, rowB, columnId) => {
  let dir = 0;

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]?.itemRank!,
      rowB.columnFiltersMeta[columnId]?.itemRank!
    );
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir;
};

let defaultData: Array<MainTableType> = [];
export const MainTable: React.FC<MainTableProps> = ({ setSummary }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Array<MainTableType>>([]);
  const [target, setTarget] = useState('');
  const [show, setShow] = useState(false);
  const getUTMRes = useGetUtm(getUTMs);
  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>('onChange');
  const [removeModal, setRemoveModal] = useState(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const input_ref = useRef<HTMLInputElement>(null);
  const textarea_ref = useRef<HTMLTextAreaElement>(null);
  const [value, setValue] = useState('');
  useEffect(() => {
    if (defaultData.length === 0) {
      setData(getUTMRes.data);
    }
  }, [getUTMRes]);

  useEffect(() => {
    if (defaultData.length !== 0) {
      setData(defaultData);
    }
  }, [defaultData]);

  const columns = useMemo<ColumnDef<MainTableType>[]>(
    () => [
      {
        id: 'select',
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
        header: '생성일자',
        id: 'created_at',
        accessorKey: 'created_at',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        maxSize: 80,
      },
      {
        header: 'URL',
        id: 'utm_url',
        accessorKey: 'utm_url',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        maxSize: 130,
      },
      {
        header: '캠페인 ID',
        id: 'utm_campaign_id',
        accessorKey: 'utm_campaign_id',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        maxSize: 130,
      },
      {
        header: '소스',
        id: 'utm_source',
        accessorKey: 'utm_source',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        maxSize: 80,
      },
      {
        header: '미디움',
        id: 'utm_medium',
        accessorKey: 'utm_medium',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        maxSize: 80,
      },
      {
        header: '캠페인 이름',
        id: 'utm_campaign_name',
        accessorKey: 'utm_campaign_name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        maxSize: 230,
      },
      {
        header: '캠페인 텀',
        id: 'utm_term',
        accessorKey: 'utm_term',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        maxSize: 80,
      },
      {
        header: '캠페인 콘텐츠',
        id: 'utm_content',
        accessorKey: 'utm_content',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        maxSize: 90,
      },
      {
        header: '메모',
        id: 'utm_memo',
        accessorKey: 'utm_memo',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        maxSize: 130,
      },
      {
        header: 'UTM',
        id: 'full_url',
        accessorKey: 'full_url',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        maxSize: 130,
      },
      {
        header: 'Shorten URL',
        id: 'shorten_url',
        accessorKey: 'shorten_url',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        maxSize: 80,
      },
    ],
    []
  );

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
  });

  useEffect(() => {
    if (table.getState().columnFilters[0]?.id === 'fullName') {
      if (table.getState().sorting[0]?.id !== 'fullName') {
        table.setSorting([{ id: 'fullName', desc: false }]);
      }
    }
  }, [table.getState().columnFilters[0]?.id]);

  const onClickEditButton = () => {
    console.log(textarea_ref?.current?.value);
    setShow(false);
  };

  const onClickDelBtn = () => {
    let id: Array<MainTableType> = [];
    table.getSelectedRowModel().flatRows.map((row) => id.push(row?.original));
    if (id.length === 0) {
      alert('삭제할 데이터를 선택해주세요');
    } else {
    }
    console.log(id);
  };
  const onClickPopBtn = () => {
    let id: Array<MainTableType> = [];
    table.getSelectedRowModel().flatRows.map((row) => id.push(row?.original));
    if (id.length === 0) {
      alert('추출할 데이터를 선택해주세요');
    }
    console.log(id);
  };
  return (
    <div>
      <div className={styles.container}>
        <div className={styles.btn_box}>
          <button className={styles.data_btn} onClick={() => setSummary(false)}>
            데이터 요약보기
          </button>
          <button className={styles.button} onClick={onClickPopBtn}>
            추출하기
          </button>
          <button className={styles.button} onClick={onClickDelBtn}>
            삭제하기
          </button>
          <button className={styles.button}>필터</button>
        </div>
        <div className="h-2" />
        <div className="h-4" />
        <div className="overflow-x-auto"></div>
        <table
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
                      {...{
                        key: header.id,
                        colSpan: header.colSpan,
                        style: {
                          width: header.getSize(),
                        },
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <>
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer select-none'
                                : '',
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {{
                              asc: ' 🔼',
                              desc: ' 🔽',
                            }[header.column.getIsSorted() as string] ?? null}
                          </div>
                          {header.column.getCanFilter() ? (
                            <div>
                              <Filter column={header.column} table={table} />
                            </div>
                          ) : null}
                        </>
                      )}

                      <div
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
                      />
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => {
              return (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <td
                        {...{
                          key: cell.id,
                          style: {
                            width: cell.column.getSize(),
                          },
                        }}
                      >
                        {cell.column.id === 'utm_memo' && !show && (
                          <input
                            id={cell.id}
                            ref={input_ref}
                            style={{ border: 'none' }}
                            defaultValue={`${cell.getValue()}`}
                            onFocus={(e) => {
                              setTarget(e.target.id);
                              setShow(true);
                            }}
                          />
                        )}
                        {cell.column.id === 'utm_memo' &&
                          show &&
                          target === cell.id && (
                            <>
                              <textarea
                                ref={textarea_ref}
                                defaultValue={`${cell.getValue()}`}
                                onChange={(e) => setValue(e.target.value)}
                              />
                              <button
                                onClick={() => onClickEditButton()}
                                className={styles.copy_button}
                              >
                                수정하기
                              </button>
                            </>
                          )}
                        {cell.column.id === 'utm_memo' &&
                          show &&
                          target !== cell.id &&
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        {cell.column.id !== 'utm_memo' &&
                          flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

function Filter({
  column,
  table,
}: {
  column: Column<any, unknown>;
  table: Table<any>;
}) {
  const firstValue = table
    .getPreFilteredRowModel()
    .flatRows[0]?.getValue(column.id);

  const columnFilterValue = column.getFilterValue();
  const [startDate, setStartDate] = useState<string | number>();
  const [isOpen, setIsOpen] = useState(false);

  let data: Array<MainTableType> = [];
  instance('/utms').then((result) => (data = result.data));
  function getDatesStartToLast(startDate: any, lastDate: any) {
    const regex = RegExp(/^\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/);
    if (!(regex.test(startDate) && regex.test(lastDate)))
      return 'Not Date Format';
    let result: (string | number | Date)[] = [];
    const curDate = new Date(startDate);
    while (curDate <= new Date(lastDate)) {
      result.push(
        curDate.toISOString().split('T')[0].toString().replace(/-/g, '.')
      );
      curDate.setDate(curDate.getDate() + 1);
    }
    let dateList: any = [];
    defaultData = data.filter((date) => result.includes(date.created_at));
    defaultData.map((d) => dateList.push(d.created_at));
    column.setFilterValue((old: Array<string>) => console.log(old));
  }
  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return (
    <>
      {column.id === 'created_at' && (
        <>
          <input
            className={styles.search_input}
            placeholder="기간 선택하기"
            onFocus={() => setIsOpen(true)}
          ></input>
          <dialog
            className={styles.dialog}
            {...(isOpen && true ? { open: true } : {})}
          >
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <DebouncedInput
                type="date"
                value={(columnFilterValue ?? '') as string}
                onChange={(value) => {
                  setStartDate(value);
                }}
                list={column.id + 'list'}
              />
              <DebouncedInput
                type="date"
                value={(columnFilterValue ?? '') as string}
                onChange={(value) => getDatesStartToLast(startDate, value)}
                list={column.id + 'list'}
              />
              <button
                className={styles.dialog_button}
                onClick={() => setIsOpen(false)}
              >
                X
              </button>
            </div>
          </dialog>
        </>
      )}
      {column.id !== 'created_at' && (
        <>
          <datalist id={column.id + 'list'}>
            {sortedUniqueValues.slice(0, 5000).map((value: any) => (
              <option value={value} key={value} />
            ))}
          </datalist>
          <DebouncedInput
            className={styles.search_input}
            type="text"
            value={(columnFilterValue ?? '') as string}
            onChange={(value) => column.setFilterValue(value)}
            placeholder={`Search... (${column.getFacetedUniqueValues().size})`}
          />
          <div className="h-1" />
        </>
      )}
    </>
  );
}

// A debounced input react component
function DebouncedInput({
  value: initialValue,
  onChange,
  debounce = 500,
  ...props
}: {
  value: string | number;
  onChange: (value: string | number) => void;
  debounce?: number;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  const [value, setValue] = React.useState(initialValue);

  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      onChange(value);
    }, debounce);

    return () => clearTimeout(timeout);
  }, [value]);

  return (
    <input
      {...props}
      value={value}
      onChange={(e) => setValue(e.target.value)}
    />
  );
}
function IndeterminateCheckbox({
  indeterminate,
  className = '',
  ...rest
}: { indeterminate?: boolean } & HTMLProps<HTMLInputElement>) {
  const ref = useRef<HTMLInputElement>(null!);

  useEffect(() => {
    if (typeof indeterminate === 'boolean') {
      ref.current.indeterminate = !rest.checked && indeterminate;
    }
  }, [ref, indeterminate]);

  return (
    <input
      type="checkbox"
      ref={ref}
      className={className + ' cursor-pointer'}
      {...rest}
    />
  );
}
