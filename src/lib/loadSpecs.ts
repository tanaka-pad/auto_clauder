export interface Smartphone {
  id: number;
  brand: string;
  model: string;
  carrier: string;
  release_year: number;
  os: string;
  os_version: string;
  display_size: number;
  display_resolution_w: number;
  display_resolution_h: number;
  cpu: string;
  ram_gb: number;
  storage_gb: number;
  battery_mah: number;
  camera_main_mp: number;
  camera_front_mp: number;
  support_5g: boolean;
  support_nfc: boolean;
  waterproof_ipx: string;
}
