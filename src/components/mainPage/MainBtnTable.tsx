import React, {
  Dispatch,
  SetStateAction,
  HTMLProps,
  useMemo,
  useEffect,
  useState,
  useRef,
} from 'react';
import { MainTableType } from './TableData';
import { useGetUtm } from 'util/hooks/useAsync';
import { getUTMs } from 'util/async/api';
import { CopyButton } from '../../shared/button/CopyButton';
import Tooltip from '@mui/material/Tooltip';
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
} from '@tanstack/react-table';
import {
  RankingInfo,
  rankItem,
  compareItems,
} from '@tanstack/match-sorter-utils';
import styles from './main.module.css';
import { defaultDataList } from './TableData';
import { OutputModal } from './OutputModal';
import { DeleteModal } from './DeleteModal';
import { AddUtmModal } from '../sidebar/AddUtmModal';
import Image from 'next/image';

import plusImg from 'assets/plus.png';
import filterImg from 'assets/filter.png';

export type MainTableProps = {
  setSummary: Dispatch<SetStateAction<boolean>>;
};

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

export const MainBtnTable: React.FC<MainTableProps> = ({ setSummary }) => {
  const [rowSelection, setRowSelection] = useState({});
  const [data, setData] = useState<Array<MainTableType>>([...defaultDataList]);
  const [show, setShow] = useState(false);
  const [target, setTarget] = useState('');
  //const getUTMRes = useGetUtm(getUTMs);
  const [columnResizeMode, setColumnResizeMode] =
    useState<ColumnResizeMode>('onChange');
  const [removeModal, setRemoveModal] = useState(false);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const input_ref = useRef<HTMLInputElement>(null);
  const textarea_ref = useRef<HTMLTextAreaElement>(null);
  const [output, setOutput] = useState(false);
  const [outputLength, setOutputLength] = useState<Array<MainTableType>>([]);
  const [del, setDel] = useState(false);
  const [delLength, setDelLength] = useState<Array<MainTableType>>([]);
  const [plus, setPlus] = useState(false);
  const [filter, setFilter] = useState(false);

  // useEffect(() => {
  //   setData(getUTMRes.data);
  // }, [getUTMRes]);
  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
    },
  };
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
        header: 'URL',
        id: 'utm_url',
        accessorKey: 'utm_url',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 130,
      },
      {
        header: '소스',
        id: 'utm_source',
        accessorKey: 'utm_source',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 80,
      },
      {
        header: '미디움',
        id: 'utm_medium',
        accessorKey: 'utm_medium',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 80,
      },
      {
        header: '캠페인 이름',
        id: 'utm_campaign_name',
        accessorKey: 'utm_campaign_name',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 230,
      },
      {
        header: '메모',
        id: 'utm_memo',
        accessorKey: 'utm_memo',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 130,
      },
      {
        header: 'UTM',
        id: 'full_url',
        accessorKey: 'full_url',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 130,
      },
      {
        header: 'Shorten URL',
        id: 'shorten_url',
        accessorKey: 'shorten_url',
        cell: (info) => info.getValue(),
        footer: (props) => props.column.id,
        minSize: 80,
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

  //url 이동하기
  const moveUrl = (url: string) => {
    window.open(url, '_blank');
  };

  //수정하기
  const onClickEditButton = () => {
    const index = textarea_ref?.current?.id.split('_')[0];
    const filter = table
      .getGroupedRowModel()
      .flatRows.filter((row) => row.id === index)[0].original;
    console.log(filter.id);
    console.log(textarea_ref?.current?.value);
    setShow(false);
  };

  //삭제하기
  const onClickDelBtn = () => {
    let id: Array<MainTableType> = [];
    table.getSelectedRowModel().flatRows.map((row) => id.push(row?.original));
    if (id.length === 0) {
      alert('삭제할 데이터를 선택해주세요');
    } else {
      setDel(true);
      setDelLength(id);
    }
  };

  //추출하기
  const onClickPopBtn = () => {
    let id: Array<MainTableType> = [];
    table.getSelectedRowModel().flatRows.map((row) => id.push(row?.original));
    if (id.length === 0) {
      alert('추출할 데이터를 선택해주세요');
    } else {
      console.log(id);
      setOutput(true);
      setOutputLength(id);
    }
  };
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
            <button className={styles.button} onClick={onClickPopBtn}>
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
                        {...{
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
                                onClick:
                                  header.column.getToggleSortingHandler(),
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
                            {filter && (
                              <th>
                                {header.column.getCanFilter() ? (
                                  <div className={styles.filter_box}>
                                    <Filter
                                      column={header.column}
                                      table={table}
                                    />
                                  </div>
                                ) : null}
                              </th>
                            )}
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
                          key={cell.id}
                          className={styles.td}
                          {...{
                            style: {
                              width: cell.column.getSize(),
                            },
                          }}
                        >
                          {cell.column.id === 'full_url' && (
                            <CopyButton
                              text={`${cell.getValue()}`}
                            ></CopyButton>
                          )}
                          {cell.column.id === 'shorten_url' && (
                            <CopyButton
                              text={`${cell.getValue()}`}
                            ></CopyButton>
                          )}
                          {cell.column.id === 'utm_url' && (
                            <Tooltip title={`${cell.getValue()}`}>
                              <button
                                className={styles.url_button}
                                onClick={() => moveUrl(`${cell.getValue()}`)}
                              >
                                url 연결
                              </button>
                            </Tooltip>
                          )}
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
                                  onBlur={() => setShow(false)}
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
                            cell.column.id !== 'utm_url' &&
                            cell.column.id !== 'full_url' &&
                            cell.column.id !== 'shorten_url' &&
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
    </>
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

  const sortedUniqueValues = React.useMemo(
    () =>
      typeof firstValue === 'number'
        ? []
        : Array.from(column.getFacetedUniqueValues().keys()).sort(),
    [column.getFacetedUniqueValues()]
  );

  return typeof firstValue === 'number' ? (
    <div>
      <div className="flex space-x-2">
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[0] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [value, old?.[1]])
          }
          placeholder={`Min ${
            column.getFacetedMinMaxValues()?.[0]
              ? `(${column.getFacetedMinMaxValues()?.[0]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
        <DebouncedInput
          type="number"
          min={Number(column.getFacetedMinMaxValues()?.[0] ?? '')}
          max={Number(column.getFacetedMinMaxValues()?.[1] ?? '')}
          value={(columnFilterValue as [number, number])?.[1] ?? ''}
          onChange={(value) =>
            column.setFilterValue((old: [number, number]) => [old?.[0], value])
          }
          placeholder={`Max ${
            column.getFacetedMinMaxValues()?.[1]
              ? `(${column.getFacetedMinMaxValues()?.[1]})`
              : ''
          }`}
          className="w-24 border shadow rounded"
        />
      </div>
      <div className="h-1" />
    </div>
  ) : (
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
        placeholder={`검색 (${column.getFacetedUniqueValues().size})`}
        list={column.id + 'list'}
      />
      <div className="h-1" />
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
