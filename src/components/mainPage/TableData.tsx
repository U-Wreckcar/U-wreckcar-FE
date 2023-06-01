import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { IndeterminateCheckbox } from "./MainTableFunction";
import styles from "./main.module.css";

export type MainTableType = {
  _id: string;
  createdAt: string;
  url: string;
  // user_utm_source_id:any;
  campaignId: string;
  utm_source_name: string;
  // user_utm_medium_id:any;
  medium: string;
  campaignName: string;
  term: string;
  content: string;
  memo: string;
  fullUrl: string;
  shortenUrl: string;
  clickCount: number;
};

export type CustomStyles = {
  content: {
    top: string;
    left: string;
    right: string;
    bottom: string;
    marginRight: string;
    transform: string;
    padding: number;
  };
};

export const columns: ColumnDef<MainTableType>[] = [
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
    id: "createdAt",
    accessorKey: "createdAt",

    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 80,
  },
  {
    header: "URL",
    id: "url",
    accessorKey: "url",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 150,
  },

  {
    header: "소스",
    id: "source",
    accessorKey: "source",

    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 110,
  },
  {
    header: "미디움",
    id: "medium",
    accessorKey: "medium",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 110,
  },
  {
    header: "캠페인 이름",
    id: "campaignName",
    accessorKey: "campaignName",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 260,
  },
  {
    header: "캠페인 ID",
    id: "campaignId",
    accessorKey: "campaignId",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 150,
  },
  {
    header: "캠페인 텀",
    id: "term",
    accessorKey: "term",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 110,
  },
  {
    header: "캠페인 콘텐츠",
    id: "content",
    accessorKey: "content",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 110,
  },
  {
    header: "메모",
    id: "memo",
    accessorKey: "memo",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 150,
  },
  {
    header: "UTM",
    id: "fullUrl",
    accessorKey: "fullUrl",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 150,
  },
  {
    header: "Short URL",
    id: "shortenUrl",
    accessorKey: "shortenUrl",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 100,
  },
  {
    header: "클릭 수",
    id: "clickCount",
    accessorKey: "clickCount",
    cell: (info) => info.getValue(),
    footer: (props) => props.column.id,
    minSize: 120,
  },
];
