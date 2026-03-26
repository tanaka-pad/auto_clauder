"use client";

import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  ColumnDef,
  SortingState,
} from "@tanstack/react-table";
import { useState } from "react";
import { Smartphone } from "@/lib/loadSpecs";

const columns: ColumnDef<Smartphone>[] = [
  {
    header: "メーカー",
    accessorKey: "brand",
    cell: (info) => (
      <span className="font-medium text-gray-800">{info.getValue<string>()}</span>
    ),
  },
  {
    header: "機種名",
    accessorKey: "model",
    cell: (info) => (
      <span className="font-semibold text-blue-700">{info.getValue<string>()}</span>
    ),
  },
  {
    header: "キャリア",
    accessorKey: "carrier",
  },
  {
    header: "発売年",
    accessorKey: "release_year",
  },
  {
    header: "OS",
    accessorKey: "os",
    cell: (info) => {
      const row = info.row.original;
      const color = row.os === "iOS" ? "bg-gray-100 text-gray-700" : "bg-green-100 text-green-800";
      return (
        <span className={`px-2 py-0.5 rounded text-xs font-medium ${color}`}>
          {row.os} {row.os_version}
        </span>
      );
    },
  },
  {
    header: "画面 (inch)",
    accessorKey: "display_size",
    cell: (info) => `${info.getValue<number>()} in`,
  },
  {
    header: "解像度",
    id: "resolution",
    accessorFn: (row) => `${row.display_resolution_w}×${row.display_resolution_h}`,
  },
  {
    header: "CPU",
    accessorKey: "cpu",
    cell: (info) => (
      <span className="text-xs text-gray-700">{info.getValue<string>()}</span>
    ),
  },
  {
    header: "RAM (GB)",
    accessorKey: "ram_gb",
  },
  {
    header: "ストレージ (GB)",
    accessorKey: "storage_gb",
  },
  {
    header: "バッテリー (mAh)",
    accessorKey: "battery_mah",
  },
  {
    header: "カメラ (MP)",
    id: "camera",
    accessorFn: (row) => row.camera_main_mp,
    cell: (info) => {
      const row = info.row.original;
      return `${row.camera_main_mp} / ${row.camera_front_mp}`;
    },
  },
  {
    header: "5G",
    accessorKey: "support_5g",
    cell: (info) =>
      info.getValue<boolean>() ? (
        <span className="text-green-600 font-bold">○</span>
      ) : (
        <span className="text-gray-400">−</span>
      ),
  },
  {
    header: "NFC",
    accessorKey: "support_nfc",
    cell: (info) =>
      info.getValue<boolean>() ? (
        <span className="text-green-600 font-bold">○</span>
      ) : (
        <span className="text-gray-400">−</span>
      ),
  },
  {
    header: "防水",
    accessorKey: "waterproof_ipx",
    cell: (info) => (
      <span className="text-xs">{info.getValue<string>()}</span>
    ),
  },
];

interface SpecTableProps {
  data: Smartphone[];
}

export function SpecTable({ data }: SpecTableProps) {
  const [sorting, setSorting] = useState<SortingState>([
    { id: "release_year", desc: true },
  ]);

  const table = useReactTable({
    data,
    columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b border-gray-200">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler()}
                  className="px-3 py-2 text-left text-xs font-semibold text-gray-600 whitespace-nowrap cursor-pointer select-none hover:bg-gray-100"
                >
                  {flexRender(header.column.columnDef.header, header.getContext())}
                  {header.column.getIsSorted() === "asc" && " ↑"}
                  {header.column.getIsSorted() === "desc" && " ↓"}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-100">
          {table.getRowModel().rows.map((row, i) => (
            <tr key={row.id} className={i % 2 === 0 ? "" : "bg-gray-50/50"}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-3 py-2 whitespace-nowrap text-gray-700">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      {data.length === 0 && (
        <div className="text-center py-10 text-gray-400">該当する機種がありません</div>
      )}
    </div>
  );
}
