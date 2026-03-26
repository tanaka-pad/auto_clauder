"use client";

import { useEffect, useState } from "react";
import Papa from "papaparse";
import { Smartphone } from "@/lib/loadSpecs";
import { FilterPanel } from "@/components/FilterPanel";
import { SpecTable } from "@/components/SpecTable";

const INITIAL_FILTERS = {
  brand: "",
  os: "",
  carrier: "",
  support5g: "",
  minRam: "",
  minBattery: "",
  search: "",
};

export default function Home() {
  const [allData, setAllData] = useState<Smartphone[]>([]);
  const [filters, setFilters] = useState(INITIAL_FILTERS);

  useEffect(() => {
    fetch("/data/smartphones.csv")
      .then((res) => res.text())
      .then((csv) => {
        const result = Papa.parse<Record<string, string>>(csv, {
          header: true,
          skipEmptyLines: true,
        });
        const rows: Smartphone[] = result.data.map((row) => ({
          id: Number(row.id),
          brand: row.brand,
          model: row.model,
          carrier: row.carrier,
          release_year: Number(row.release_year),
          os: row.os,
          os_version: row.os_version,
          display_size: Number(row.display_size),
          display_resolution_w: Number(row.display_resolution_w),
          display_resolution_h: Number(row.display_resolution_h),
          cpu: row.cpu,
          ram_gb: Number(row.ram_gb),
          storage_gb: Number(row.storage_gb),
          battery_mah: Number(row.battery_mah),
          camera_main_mp: Number(row.camera_main_mp),
          camera_front_mp: Number(row.camera_front_mp),
          support_5g: row.support_5g === "true",
          support_nfc: row.support_nfc === "true",
          waterproof_ipx: row.waterproof_ipx,
        }));
        setAllData(rows);
      });
  }, []);

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const filtered = allData.filter((d) => {
    if (filters.brand && d.brand !== filters.brand) return false;
    if (filters.os && d.os !== filters.os) return false;
    if (filters.carrier && d.carrier !== filters.carrier) return false;
    if (filters.support5g !== "" && String(d.support_5g) !== filters.support5g)
      return false;
    if (filters.minRam && d.ram_gb < Number(filters.minRam)) return false;
    if (filters.minBattery && d.battery_mah < Number(filters.minBattery))
      return false;
    if (filters.search) {
      const q = filters.search.toLowerCase();
      if (
        !d.brand.toLowerCase().includes(q) &&
        !d.model.toLowerCase().includes(q) &&
        !d.cpu.toLowerCase().includes(q)
      )
        return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <h1 className="text-xl font-bold text-gray-900">
          国内スマートフォン スペック一覧
        </h1>
        <p className="text-sm text-gray-500 mt-0.5">
          国内販売端末のスペックを絞り込み・比較できます
        </p>
      </header>

      <main className="max-w-screen-xl mx-auto px-4 py-6">
        <FilterPanel
          data={allData}
          filters={filters}
          onChange={handleFilterChange}
        />

        <div className="text-sm text-gray-500 mb-2">
          {filtered.length} 件 / 全 {allData.length} 件
        </div>

        <SpecTable data={filtered} />

        <p className="text-xs text-gray-400 mt-4">
          ※ データは手動管理のサンプルです。最新情報は各メーカー・キャリアの公式サイトでご確認ください。
        </p>
      </main>
    </div>
  );
}
