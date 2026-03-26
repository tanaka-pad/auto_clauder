"use client";

import { Smartphone } from "@/lib/loadSpecs";

interface FilterPanelProps {
  data: Smartphone[];
  filters: {
    brand: string;
    os: string;
    carrier: string;
    support5g: string;
    minRam: string;
    minBattery: string;
    search: string;
  };
  onChange: (key: string, value: string) => void;
}

export function FilterPanel({ data, filters, onChange }: FilterPanelProps) {
  const brands = Array.from(new Set(data.map((d) => d.brand))).sort();
  const carriers = Array.from(new Set(data.map((d) => d.carrier))).sort();

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-4 mb-4 grid grid-cols-2 md:grid-cols-4 gap-3">
      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          キーワード検索
        </label>
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange("search", e.target.value)}
          placeholder="機種名・CPUなど"
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        />
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          メーカー
        </label>
        <select
          value={filters.brand}
          onChange={(e) => onChange("brand", e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">すべて</option>
          {brands.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          OS
        </label>
        <select
          value={filters.os}
          onChange={(e) => onChange("os", e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">すべて</option>
          <option value="Android">Android</option>
          <option value="iOS">iOS</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          キャリア
        </label>
        <select
          value={filters.carrier}
          onChange={(e) => onChange("carrier", e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">すべて</option>
          {carriers.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          5G対応
        </label>
        <select
          value={filters.support5g}
          onChange={(e) => onChange("support5g", e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">すべて</option>
          <option value="true">対応</option>
          <option value="false">非対応</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          最小RAM (GB)
        </label>
        <select
          value={filters.minRam}
          onChange={(e) => onChange("minRam", e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">指定なし</option>
          <option value="4">4GB以上</option>
          <option value="6">6GB以上</option>
          <option value="8">8GB以上</option>
          <option value="12">12GB以上</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-medium text-gray-600 mb-1">
          最小バッテリー (mAh)
        </label>
        <select
          value={filters.minBattery}
          onChange={(e) => onChange("minBattery", e.target.value)}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
        >
          <option value="">指定なし</option>
          <option value="4000">4000mAh以上</option>
          <option value="4500">4500mAh以上</option>
          <option value="5000">5000mAh以上</option>
        </select>
      </div>

      <div className="flex items-end">
        <button
          onClick={() => {
            onChange("search", "");
            onChange("brand", "");
            onChange("os", "");
            onChange("carrier", "");
            onChange("support5g", "");
            onChange("minRam", "");
            onChange("minBattery", "");
          }}
          className="w-full border border-gray-300 rounded px-2 py-1 text-sm text-gray-600 hover:bg-gray-50"
        >
          リセット
        </button>
      </div>
    </div>
  );
}
