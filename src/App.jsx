import React, { useState, useMemo, useEffect, useRef } from 'react';

// ============================================================================
// KOMPONEN IKON SVG INTERNAL (BEBAS KONFLIK BUNDLER / FORWARDREF)
// ============================================================================
const SvgIcon = ({ className = 'w-4 h-4', children }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    {children}
  </svg>
);

const Coffee = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </SvgIcon>
);
const Package = ({ className }) => (
  <SvgIcon className={className}>
    <path d="m7.5 4.27 9 5.15" />
    <path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z" />
    <path d="m3.3 7 8.7 5 8.7-5" />
    <path d="M12 22V12" />
  </SvgIcon>
);
const Wallet = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1" />
    <path d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4" />
  </SvgIcon>
);
const ClipboardCheck = ({ className }) => (
  <SvgIcon className={className}>
    <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
    <path d="m9 14 2 2 4-4" />
  </SvgIcon>
);
const AlertTriangle = ({ className }) => (
  <SvgIcon className={className}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </SvgIcon>
);
const CheckCircle2 = ({ className }) => (
  <SvgIcon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="m9 12 2 2 4-4" />
  </SvgIcon>
);
const Plus = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M5 12h14" />
    <path d="M12 5v14" />
  </SvgIcon>
);
const Minus = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M5 12h14" />
  </SvgIcon>
);
const Trash2 = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M3 6h18" />
    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    <line x1="10" y1="11" x2="10" y2="17" />
    <line x1="14" y1="11" x2="14" y2="17" />
  </SvgIcon>
);
const Copy = ({ className }) => (
  <SvgIcon className={className}>
    <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
    <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
  </SvgIcon>
);
const RefreshCw = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
    <path d="M21 3v5h-5" />
    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
    <path d="M8 16H3v5" />
  </SvgIcon>
);
const TrendingUp = ({ className }) => (
  <SvgIcon className={className}>
    <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
    <polyline points="16 7 22 7 22 13" />
  </SvgIcon>
);
const ShieldAlert = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    <path d="M12 8v4" />
    <path d="M12 16h.01" />
  </SvgIcon>
);
const Lock = ({ className }) => (
  <SvgIcon className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </SvgIcon>
);
const Unlock = ({ className }) => (
  <SvgIcon className={className}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 9.9-1" />
  </SvgIcon>
);
const Upload = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </SvgIcon>
);
const FileText = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M10 9H8" />
    <path d="M16 13H8" />
    <path d="M16 17H8" />
  </SvgIcon>
);
const Users = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </SvgIcon>
);
const Warehouse = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
    <path d="M6 18h12" />
    <path d="M6 14h12" />
    <rect width="12" height="12" x="6" y="10" />
  </SvgIcon>
);
const BarChart3 = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M3 3v18h18" />
    <path d="M18 17V9" />
    <path d="M13 17V5" />
    <path d="M8 17v-3" />
  </SvgIcon>
);
const CheckCheck = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M18 6 7 17l-5-5" />
    <path d="m22 10-7.5 7.5L13 16" />
  </SvgIcon>
);
const Sparkles = ({ className }) => (
  <SvgIcon className={className}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </SvgIcon>
);
const Calendar = ({ className }) => (
  <SvgIcon className={className}>
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </SvgIcon>
);
const Edit3 = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </SvgIcon>
);
const UserCheck = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <polyline points="16 11 18 13 22 9" />
  </SvgIcon>
);
const Clock = ({ className }) => (
  <SvgIcon className={className}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </SvgIcon>
);
const Award = ({ className }) => (
  <SvgIcon className={className}>
    <circle cx="12" cy="8" r="6" />
    <path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" />
  </SvgIcon>
);
const Scale = ({ className }) => (
  <SvgIcon className={className}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </SvgIcon>
);
const History = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
    <path d="M12 7v5l4 2" />
  </SvgIcon>
);
const RotateCcw = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
    <path d="M3 3v5h5" />
  </SvgIcon>
);
const ArrowDownToLine = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M12 17V3" />
    <path d="m6 11 6 6 6-6" />
    <path d="M19 21H5" />
  </SvgIcon>
);
const Share2 = ({ className }) => (
  <SvgIcon className={className}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
  </SvgIcon>
);
const Smartphone = ({ className }) => (
  <SvgIcon className={className}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </SvgIcon>
);
const LayoutGrid = ({ className }) => (
  <SvgIcon className={className}>
    <rect width="7" height="7" x="3" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="3" rx="1" />
    <rect width="7" height="7" x="14" y="14" rx="1" />
    <rect width="7" height="7" x="3" y="14" rx="1" />
  </SvgIcon>
);
const Table = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M12 3v18" />
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <path d="M3 9h18" />
    <path d="M3 15h18" />
  </SvgIcon>
);
const FileDown = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M12 18v-6" />
    <path d="m9 15 3 3 3-3" />
  </SvgIcon>
);
const FileSpreadsheet = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
    <path d="M14 2v4a2 2 0 0 0 2 2h4" />
    <path d="M8 13h2" />
    <path d="M14 13h2" />
    <path d="M8 17h2" />
    <path d="M14 17h2" />
  </SvgIcon>
);
const Check = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M20 6 9 17l-5-5" />
  </SvgIcon>
);
const Globe = ({ className }) => (
  <SvgIcon className={className}>
    <circle cx="12" cy="12" r="10" />
    <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
    <path d="M2 12h20" />
  </SvgIcon>
);
const Monitor = ({ className }) => (
  <SvgIcon className={className}>
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
  </SvgIcon>
);
const Wifi = ({ className }) => (
  <SvgIcon className={className}>
    <path d="M12 20h.01" />
    <path d="M2 8.82a15 15 0 0 1 20 0" />
    <path d="M5 12.859a10 10 0 0 1 14 0" />
    <path d="M8.5 16.429a5 5 0 0 1 7 0" />
  </SvgIcon>
);
const WifiOff = ({ className }) => (
  <SvgIcon className={className}>
    <line x1="2" y1="2" x2="22" y2="22" />
    <path d="M8.5 16.429a5 5 0 0 1 7 0" />
    <path d="M2 8.82a15 15 0 0 1 4.17-2.65" />
    <path d="M10.66 5c4.01-.36 8.14.9 11.34 3.76" />
    <path d="M16.85 11.25a10 10 0 0 1 2.22 1.68" />
    <path d="M5 12.859a10 10 0 0 1 5.17-2.69" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </SvgIcon>
);

const INITIAL_INVENTORY = [
  {
    id: 'sat-1',
    name: 'Indomie Goreng Spesial',
    category: 'Satuan / Saset',
    unit: 'bungkus',
    priceSell: 10000,
    priceCost: 3100,
    supplierShare: 0,
    warehouseStock: 160,
    RestockUnit: '1 Dus (40 bks)',
    restockQty: 40,
    lockedInitialStock: 40,
    initialStock: 40,
    stockIn: 0,
    finalStock: 18,
    wasteOrStaff: 1,
    minStock: 15,
    lastTamperReason: '',
    lastTamperBy: '',
  },
  {
    id: 'sat-2',
    name: 'Indomie Soto / Ayam Bawang',
    category: 'Satuan / Saset',
    unit: 'bungkus',
    priceSell: 10000,
    priceCost: 3000,
    supplierShare: 0,
    warehouseStock: 120,
    RestockUnit: '1 Dus (40 bks)',
    restockQty: 40,
    lockedInitialStock: 35,
    initialStock: 35,
    stockIn: 0,
    finalStock: 20,
    wasteOrStaff: 0,
    minStock: 15,
    lastTamperReason: '',
    lastTamperBy: '',
  },
  {
    id: 'sat-3',
    name: 'Telur Ayam Negeri',
    category: 'Satuan / Saset',
    unit: 'butir',
    priceSell: 4000,
    priceCost: 2000,
    supplierShare: 0,
    warehouseStock: 90,
    RestockUnit: '1 Tray (30 btr)',
    restockQty: 30,
    lockedInitialStock: 30,
    initialStock: 30,
    stockIn: 0,
    finalStock: 9,
    wasteOrStaff: 1,
    minStock: 12,
    lastTamperReason: '',
    lastTamperBy: '',
  },
  {
    id: 'sat-4',
    name: 'Kopi Kapal Api Mix / Good Day',
    category: 'Satuan / Saset',
    unit: 'saset',
    priceSell: 5000,
    priceCost: 1500,
    supplierShare: 0,
    warehouseStock: 240,
    RestockUnit: '2 Renceng (20 sst)',
    restockQty: 20,
    lockedInitialStock: 50,
    initialStock: 50,
    stockIn: 0,
    finalStock: 22,
    wasteOrStaff: 2,
    minStock: 20,
    lastTamperReason: '',
    lastTamperBy: '',
  },
  {
    id: 'sat-5',
    name: 'Extra Joss / Kukubima (+Susu)',
    category: 'Satuan / Saset',
    unit: 'saset',
    priceSell: 7000,
    priceCost: 2200,
    supplierShare: 0,
    warehouseStock: 120,
    RestockUnit: '2 Pak (24 sst)',
    restockQty: 24,
    lockedInitialStock: 30,
    initialStock: 30,
    stockIn: 0,
    finalStock: 18,
    wasteOrStaff: 0,
    minStock: 10,
    lastTamperReason: '',
    lastTamperBy: '',
  },
  {
    id: 'sat-6',
    name: 'Rokok Gudang Garam Surya 12',
    category: 'Satuan / Saset',
    unit: 'bungkus',
    priceSell: 28000,
    priceCost: 24500,
    supplierShare: 0,
    warehouseStock: 20,
    RestockUnit: '1 Slop (10 bks)',
    restockQty: 10,
    lockedInitialStock: 12,
    initialStock: 12,
    stockIn: 0,
    finalStock: 5,
    wasteOrStaff: 0,
    minStock: 5,
    lastTamperReason: '',
    lastTamperBy: '',
  },
  {
    id: 'por-1',
    name: 'Beras Putih (Takaran Nasi 125gr)',
    category: 'Bahan Takaran Porsi',
    unit: 'porsi nasi',
    priceSell: 5000,
    priceCost: 1800,
    supplierShare: 0,
    warehouseStock: 160,
    RestockUnit: '2 Kg Beras (16 Porsi)',
    restockQty: 16,
    lockedInitialStock: 24,
    initialStock: 24,
    stockIn: 0,
    finalStock: 10,
    wasteOrStaff: 1,
    minStock: 8,
    conversionNote: '1 Kg Beras = 8 Porsi Nasi (Centong Takar)',
    lastTamperReason: '',
    lastTamperBy: '',
  },
  {
    id: 'por-2',
    name: 'Kornet Sapi Kaleng (Campuran Omelet)',
    category: 'Bahan Takaran Porsi',
    unit: 'porsi kornet',
    priceSell: 7000,
    priceCost: 3000,
    supplierShare: 0,
    warehouseStock: 60,
    RestockUnit: '2 Kaleng (12 Porsi)',
    restockQty: 12,
    lockedInitialStock: 18,
    initialStock: 18,
    stockIn: 0,
    finalStock: 9,
    wasteOrStaff: 0,
    minStock: 6,
    conversionNote: '1 Kaleng (340gr) = 6 Porsi Omelet',
    lastTamperReason: '',
    lastTamperBy: '',
  },
  {
    id: 'cur-1',
    name: 'Cup Plastik / Gelas Kertas (Kunci Minuman)',
    category: 'Kunci Bahan Curah',
    unit: 'cup',
    priceSell: 4000,
    priceCost: 1200,
    supplierShare: 0,
    warehouseStock: 500,
    RestockUnit: '1 Slop (50 cup)',
    restockQty: 50,
    lockedInitialStock: 100,
    initialStock: 100,
    stockIn: 0,
    finalStock: 65,
    wasteOrStaff: 1,
    minStock: 30,
    lastTamperReason: '',
    lastTamperBy: '',
  },
  {
    id: 'cur-2',
    name: 'Susu Kental Manis (SKM Putih/Cokelat)',
    category: 'Kunci Bahan Curah',
    unit: 'kaleng',
    priceSell: 0,
    priceCost: 12500,
    supplierShare: 0,
    warehouseStock: 48,
    RestockUnit: '6 Kaleng',
    restockQty: 6,
    lockedInitialStock: 8,
    initialStock: 8,
    stockIn: 0,
    finalStock: 5,
    wasteOrStaff: 0,
    minStock: 4,
    lastTamperReason: '',
    lastTamperBy: '',
  },
  {
    id: 'kon-1',
    name: 'Gorengan / Risol / Tahu Isi (Titipan)',
    category: 'Titipan (Konsinyasi)',
    unit: 'pcs',
    priceSell: 2000,
    priceCost: 0,
    supplierShare: 1500,
    warehouseStock: 0,
    RestockUnit: 'Drop Suplier (50 pcs)',
    restockQty: 50,
    lockedInitialStock: 60,
    initialStock: 60,
    stockIn: 0,
    finalStock: 12,
    wasteOrStaff: 0,
    minStock: 10,
    lastTamperReason: '',
    lastTamperBy: '',
  },
  {
    id: 'kon-2',
    name: 'Sate Telur Puyuh / Usus (Titipan)',
    category: 'Titipan (Konsinyasi)',
    unit: 'tusuk',
    priceSell: 3000,
    priceCost: 0,
    supplierShare: 2200,
    warehouseStock: 0,
    RestockUnit: 'Drop Suplier (30 tsk)',
    restockQty: 30,
    lockedInitialStock: 30,
    initialStock: 30,
    stockIn: 0,
    finalStock: 8,
    wasteOrStaff: 0,
    minStock: 5,
    lastTamperReason: '',
    lastTamperBy: '',
  },
];

const INITIAL_EXPENSES = [
  { id: 'exp-1', description: 'Beli Es Batu Kristal 2 Bal', amount: 20000, hasReceipt: true },
  { id: 'exp-2', description: 'Isi Ulang Air Galon (2 Galon)', amount: 12000, hasReceipt: true },
];

const INITIAL_WORKERS = [
  {
    id: 'wrk-1',
    name: 'Tatan',
    shiftDefault: 'Shift Siang (07:00 - 16:00)',
    baseSalary: 1200000,
    perShiftRate: 50000,
    mealAllowancePerShift: 15000,
    kasbon: 50000,
    phone: '0812-3456-7890',
  },
  {
    id: 'wrk-2',
    name: 'Rian Hidayat',
    shiftDefault: 'Shift Malam (18:00 - 03:00)',
    baseSalary: 1200000,
    perShiftRate: 55000,
    mealAllowancePerShift: 15000,
    kasbon: 100000,
    phone: '0813-9876-5432',
  },
];

const INITIAL_ATTENDANCE_LOGS = [
  {
    id: 'att-1',
    date: '2026-10-21',
    workerId: 'wrk-1',
    workerName: 'Tatan',
    shift: 'Shift Siang (07:00 - 16:00)',
    status: 'HADIR_NORMAL',
    shiftCredit: 1,
    note: 'Hadir tepat waktu jam 07:00 pagi',
    source: 'AUTO',
  },
  {
    id: 'att-2',
    date: '2026-10-20',
    workerId: 'wrk-2',
    workerName: 'Rian Hidayat',
    shift: 'Shift Malam (18:00 - 03:00)',
    status: 'HADIR_NORMAL',
    shiftCredit: 1,
    note: 'Otomatis dari Setoran Shift Malam',
    source: 'AUTO',
  },
  {
    id: 'att-3',
    date: '2026-10-20',
    workerId: 'wrk-1',
    workerName: 'Tatan',
    shift: 'Shift Siang (07:00 - 16:00)',
    status: 'LEMBUR_TUUR',
    shiftCredit: 2,
    note: 'Tuur / Gantikan shift tambahan',
    source: 'MANUAL',
  },
];

const INITIAL_SHIFT_HISTORY = [
  {
    id: 'hist-101',
    date: '2026-10-20',
    shift: 'Shift Malam (18:00 - 03:00)',
    workerCurrent: 'Rian Hidayat',
    workerNext: 'Tatan',
    totalOmzet: 865000,
    totalHpp: 382000,
    grossProfit: 483000,
    qrisAmount: 240000,
    expensesTotal: 35000,
    expectedDrawerCash: 740000,
    actualDrawerCash: 740000,
    discrepancy: 0,
    dropBoxEnvelope: 590000,
    netProfitShift: 408000,
    cupsUsed: 42,
    drinksRecorded: 42,
    staffMealsCount: 3,
    tamperedItemsCount: 0,
    verifiedByOwner: true,
    penaltyApplied: false,
    timestamp: '2026-10-21, 03:05 WIB',
  },
  {
    id: 'hist-102',
    date: '2026-10-20',
    shift: 'Shift Siang (07:00 - 16:00)',
    workerCurrent: 'Tatan',
    workerNext: 'Rian Hidayat',
    totalOmzet: 690000,
    totalHpp: 310000,
    grossProfit: 380000,
    qrisAmount: 190000,
    expensesTotal: 25000,
    expectedDrawerCash: 625000,
    actualDrawerCash: 590000,
    discrepancy: -35000,
    dropBoxEnvelope: 440000,
    netProfitShift: 315000,
    cupsUsed: 38,
    drinksRecorded: 31,
    staffMealsCount: 4,
    tamperedItemsCount: 0,
    verifiedByOwner: false,
    penaltyApplied: true,
    timestamp: '2026-10-20, 16:10 WIB',
  },
];

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(number || 0);
};

const cleanNumInput = (rawVal) => {
  if (rawVal === '' || rawVal === null || rawVal === undefined) return '';
  const str = String(rawVal).replace(/[^0-9]/g, '');
  if (str === '') return '';
  const stripped = str.replace(/^0+(?=\d)/, '');
  return Number(stripped);
};

const displayNum = (val) => (val === '' || val === null || val === undefined ? '' : val);

const selectAllOnFocus = (e) => e.target.select();

const getNextDateStr = (dateStr, daysToAdd = 1) => {
  try {
    const parts = (dateStr || '2026-10-21').split('-').map(Number);
    const d = new Date(parts[0], (parts[1] || 1) - 1, parts[2] || 1);
    d.setDate(d.getDate() + daysToAdd);
    const yyyy = d.getFullYear();
    const mm = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  } catch (e) {
    return dateStr;
  }
};

// ============================================================================
// GENERATOR PDF ASLI (.PDF) BERGAYA DOKUMEN WORD RESMI WARKOP SUMBER REDJEKI
// ============================================================================
const escapePdfText = (str) => {
  return String(str ?? '')
    .replace(/[^\x20-\x7E]/g, ' ')
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
};

const padText = (str, len, align = 'left') => {
  const clean = String(str ?? '').replace(/[^\x20-\x7E]/g, '');
  if (clean.length >= len) return clean.slice(0, len);
  const spaces = ' '.repeat(len - clean.length);
  return align === 'right' ? spaces + clean : align === 'center' ? ' '.repeat(Math.floor((len - clean.length) / 2)) + clean + ' '.repeat(Math.ceil((len - clean.length) / 2)) : clean + spaces;
};

const buildOfficialPdfBlob = ({
  title,
  subtitle,
  metaLines = [],
  sections = [],
  footerSignatures = [],
}) => {
  const pageWidth = 595.28; // A4 Portrait pt
  const pageHeight = 841.89;
  const marginX = 36;
  const contentWidth = pageWidth - marginX * 2;

  const ops = [];

  // Background kertas putih bersih
  ops.push('1 1 1 rg');
  ops.push(`0 0 ${pageWidth} ${pageHeight} re f`);

  // Bingkai Luar Kop Surat Merah Marun (#C81D11) & Navy (#12264B)
  ops.push('0.78 0.11 0.07 RG 2 w');
  ops.push(`${marginX - 6} 28 ${contentWidth + 12} ${pageHeight - 56} re S`);
  ops.push('0.07 0.15 0.29 RG 0.8 w');
  ops.push(`${marginX - 3} 31 ${contentWidth + 6} ${pageHeight - 62} re S`);

  // Header Kop Surat Warkop Sumber Redjeki
  ops.push('0.07 0.15 0.29 rg');
  ops.push(`${marginX} ${pageHeight - 96} ${contentWidth} 58 re f`);
  ops.push('0.78 0.11 0.07 rg');
  ops.push(`${marginX} ${pageHeight - 101} ${contentWidth} 5 re f`);

  // Teks Kop Surat
  ops.push('BT /F2 15 Tf 1 1 1 rg');
  ops.push(`${marginX + 14} ${pageHeight - 58} Td (${escapePdfText('WARKOP SUMBER REDJEKI - RUKO RAOSEUN CIBIRU')}) Tj ET`);
  ops.push('BT /F1 9 Tf 0.98 0.82 0.30 rg');
  ops.push(`${marginX + 14} ${pageHeight - 73} Td (${escapePdfText(title || 'DOKUMEN LAPORAN RESMI OPERASIONAL WARKOP')}) Tj ET`);
  ops.push('BT /F1 8 Tf 0.90 0.92 0.96 rg');
  ops.push(`${marginX + 14} ${pageHeight - 86} Td (${escapePdfText(subtitle || 'Ruko Raoseun - Cibiru - Bandung | Dokumen Resmi Word ke PDF')}) Tj ET`);

  let curY = pageHeight - 120;

  // Kotak Metadata Dokumen
  if (metaLines.length > 0) {
    const boxH = metaLines.length * 13 + 12;
    ops.push('0.96 0.96 0.94 rg');
    ops.push(`${marginX} ${curY - boxH + 8} ${contentWidth} ${boxH} re f`);
    ops.push('0.82 0.82 0.78 RG 0.6 w');
    ops.push(`${marginX} ${curY - boxH + 8} ${contentWidth} ${boxH} re S`);

    metaLines.forEach((line) => {
      ops.push('BT /F2 8.5 Tf 0.07 0.15 0.29 rg');
      ops.push(`${marginX + 10} ${curY - 4} Td (${escapePdfText(line)}) Tj ET`);
      curY -= 13;
    });
    curY -= 10;
  }

  // Render Setiap Seksi & Tabel
  sections.forEach((sec) => {
    if (curY < 110) return;
    // Judul Seksi
    ops.push('0.07 0.15 0.29 rg');
    ops.push(`${marginX} ${curY - 14} ${contentWidth} 16 re f`);
    ops.push('BT /F2 8.5 Tf 1 1 1 rg');
    ops.push(`${marginX + 8} ${curY - 10} Td (${escapePdfText(sec.heading)}) Tj ET`);
    curY -= 24;

    (sec.rows || []).forEach((row, idx) => {
      if (curY < 95) return;
      if (idx === 0 && sec.hasHeaderRow) {
        ops.push('0.91 0.93 0.96 rg');
        ops.push(`${marginX} ${curY - 3} ${contentWidth} 12 re f`);
        ops.push('BT /F3 7.4 Tf 0.07 0.15 0.29 rg');
      } else {
        if (idx % 2 === 1) {
          ops.push('0.98 0.98 0.97 rg');
          ops.push(`${marginX} ${curY - 3} ${contentWidth} 11.5 re f`);
        }
        ops.push('BT /F3 7.3 Tf 0.15 0.15 0.15 rg');
      }
      ops.push(`${marginX + 6} ${curY} Td (${escapePdfText(row)}) Tj ET`);
      curY -= 11.5;
    });

    curY -= 6;
  });

  // Kotak Tanda Tangan Resmi di Bagian Bawah
  if (footerSignatures.length > 0 && curY > 85) {
    const sigY = Math.min(curY - 8, 108);
    ops.push('0.78 0.11 0.07 RG 0.6 w');
    ops.push(`${marginX} ${sigY + 12} ${contentWidth} 0.5 re S`);

    const colW = contentWidth / footerSignatures.length;
    footerSignatures.forEach((sig, i) => {
      const xPos = marginX + i * colW + 12;
      ops.push('BT /F2 8 Tf 0.07 0.15 0.29 rg');
      ops.push(`${xPos} ${sigY} Td (${escapePdfText(sig.role)}) Tj ET`);
      ops.push('BT /F1 7.5 Tf 0.45 0.45 0.45 rg');
      ops.push(`${xPos} ${sigY - 28} Td (${escapePdfText('( Tanda Tangan & Terverifikasi )')}) Tj ET`);
      ops.push('BT /F2 8.5 Tf 0.07 0.15 0.29 rg');
      ops.push(`${xPos} ${sigY - 40} Td (${escapePdfText(sig.name)}) Tj ET`);
    });
  }

  // Footer Halaman
  ops.push('BT /F1 7 Tf 0.5 0.5 0.5 rg');
  ops.push(`${marginX} 36 Td (${escapePdfText('Dicetak otomatis dari Sistem Kasir & Stok Terkunci Warkop Sumber Redjeki - Ruko Raoseun Cibiru Bandung')}) Tj ET`);

  const contentStream = ops.join('\n');

  const objects = [];
  objects.push('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');
  objects.push('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');
  objects.push(
    `3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 4 0 R /F2 5 0 R /F3 6 0 R >> >> /Contents 7 0 R >>\nendobj\n`
  );
  objects.push('4 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>\nendobj\n');
  objects.push('5 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>\nendobj\n');
  objects.push('6 0 obj\n<< /Type /Font /Subtype /Type1 /BaseFont /Courier-Bold >>\nendobj\n');
  objects.push(
    `7 0 obj\n<< /Length ${contentStream.length} >>\nstream\n${contentStream}\nendstream\nendobj\n`
  );

  let pdfBody = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((obj) => {
    offsets.push(pdfBody.length);
    pdfBody += obj;
  });

  const xrefStart = pdfBody.length;
  pdfBody += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i <= objects.length; i++) {
    pdfBody += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdfBody += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefStart}\n%%EOF`;

  return new Blob([pdfBody], { type: 'application/pdf' });
};

export default function App() {
  const [deviceId] = useState(() => {
    try {
      const savedId = sessionStorage.getItem('warkop_sr_device_id');
      if (savedId) return savedId;
      const newId = 'DEV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
      sessionStorage.setItem('warkop_sr_device_id', newId);
      return newId;
    } catch (e) {
      return 'DEV-' + Math.random().toString(36).substring(2, 8).toUpperCase();
    }
  });
  const [user] = useState({ uid: 'WARKOP-ONLINE-SESSION-01' });
  const [cloudStatus, setCloudStatus] = useState('connecting'); // 'online' | 'syncing' | 'connecting' | 'local'
  const [lastCloudSync, setLastCloudSync] = useState('Menghubungkan...');
  const [storeSyncCode, setStoreSyncCode] = useState('SUMBER-REDJEKI-CIBIRU');
  const [showOnlineGuideModal, setShowOnlineGuideModal] = useState(false);
  const isRemoteUpdate = useRef(false);
  const lastAppliedTimestamp = useRef(0);

  const [portalMode, setPortalMode] = useState('pekerja');
  const [ownerUnlocked, setOwnerUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [ownerPin, setOwnerPin] = useState('1234');
  const [pinError, setPinError] = useState('');
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [oldPinInput, setOldPinInput] = useState('');
  const [newPinInput, setNewPinInput] = useState('');
  const [confirmPinInput, setConfirmPinInput] = useState('');
  const [changePinError, setChangePinError] = useState('');
  const [showPasswordText, setShowPasswordText] = useState(false);
  const [allowQuickDemoUnlock, setAllowQuickDemoUnlock] = useState(false);
  const [ownerRecoveryWord, setOwnerRecoveryWord] = useState('RAOSEUN');
  const [recoveryInput, setRecoveryInput] = useState('');
  const [useRecoveryMode, setUseRecoveryMode] = useState(false);

  const [workerViewStyle, setWorkerViewStyle] = useState('card'); // 'card' (HP) atau 'table'
  const [ownerTab, setOwnerTab] = useState('audit');
  const [lastGeneratedDocInfo, setLastGeneratedDocInfo] = useState(null);

  const [customLogoUrl, setCustomLogoUrl] = useState(null);

  const [shiftInfo, setShiftInfo] = useState({
    date: '2026-10-21',
    shift: 'Shift Siang (07:00 - 16:00)',
    workerCurrent: 'Tatan',
    workerNext: 'Rian Hidayat',
  });

  const [inventory, setInventory] = useState(INITIAL_INVENTORY);
  const [stockTamperLogs, setStockTamperLogs] = useState([]);
  const [tamperModalItem, setTamperModalItem] = useState(null);
  const [tamperNewValue, setTamperNewValue] = useState('');
  const [tamperReasonInput, setTamperReasonInput] = useState('');

  const [workers, setWorkers] = useState(INITIAL_WORKERS);
  const [shiftHistory, setShiftHistory] = useState(INITIAL_SHIFT_HISTORY);
  const [expenses, setExpenses] = useState(INITIAL_EXPENSES);
  const [attendanceLogs, setAttendanceLogs] = useState(INITIAL_ATTENDANCE_LOGS);

  const [showAddWorkerModal, setShowAddWorkerModal] = useState(false);
  const [newWorkerForm, setNewWorkerForm] = useState({
    name: '',
    shiftDefault: 'Shift Siang (07:00 - 16:00)',
    baseSalary: 1200000,
    perShiftRate: 50000,
    mealAllowancePerShift: 15000,
    kasbon: 0,
    phone: '',
  });

  const [newAttendanceForm, setNewAttendanceForm] = useState({
    date: '2026-10-21',
    workerId: INITIAL_WORKERS[0]?.id || 'wrk-1',
    shift: 'Shift Siang (07:00 - 16:00)',
    status: 'HADIR_NORMAL',
    note: '',
  });

  const [initialDrawerModal, setInitialDrawerModal] = useState(150000);
  const [qrisSales, setQrisSales] = useState(0);
  const [actualDrawerCash, setActualDrawerCash] = useState(571500);

  const [dailyQrisByDate, setDailyQrisByDate] = useState({
    '2026-10-20': 430000,
    '2026-10-21': 215000,
  });
  const [selectedReconDate, setSelectedReconDate] = useState('2026-10-21');
  const [workerQrisLogs, setWorkerQrisLogs] = useState([
    { id: 'wq-1', note: 'Meja 3 - Indomie Dobel + Kopi Susu', amount: 25000 },
    { id: 'wq-2', note: 'Bungkus - 2 Indomie Goreng + Es Teh', amount: 28000 },
  ]);
  const [newWorkerQrisNote, setNewWorkerQrisNote] = useState('');
  const [newWorkerQrisAmt, setNewWorkerQrisAmt] = useState('');

  const [sinkingFunds, setSinkingFunds] = useState([
    {
      id: 'sf-1',
      name: 'Tabungan Sewa Ruko Raoseun Cibiru',
      daily: 50000,
      targetDays: 30,
      collectedDays: 29,
    },
    {
      id: 'sf-2',
      name: 'Dana Listrik, Air & Wi-Fi Bulanan',
      daily: 20000,
      targetDays: 30,
      collectedDays: 29,
    },
    {
      id: 'sf-3',
      name: 'Cadangan Peremajaan Alat & Renovasi',
      daily: 10000,
      targetDays: 30,
      collectedDays: 29,
    },
  ]);
  const [showAddSfModal, setShowAddSfModal] = useState(false);
  const [newSfName, setNewSfName] = useState('');
  const [newSfDaily, setNewSfDaily] = useState('');
  const [newSfTargetDays, setNewSfTargetDays] = useState(30);

  const [autoDateMode, setAutoDateMode] = useState('ON_PROOF_SENT');
  const [currentShiftSaved, setCurrentShiftSaved] = useState(false);
  const [showAppsScriptModal, setShowAppsScriptModal] = useState(false);

  const [googleSheetsConfig, setGoogleSheetsConfig] = useState({
    webhookUrl: '',
    spreadsheetUrl: '',
    monthLabel: 'Oktober 2026',
    currentMonthDaysCount: 29,
    targetMonthDays: 30,
    autoSyncOnFullMonth: true,
    autoSyncDaily: false,
    lastSyncTime: '20 Okt 2026, 23:55 WIB',
    lastSyncStatus: 'Aktif — Menunggu Genap 30 Hari (1 Bulan Full)',
    monthlyArchives: [
      {
        id: 'arc-sep-2026',
        monthLabel: 'September 2026 (30 Hari Full)',
        closedDate: '2026-09-30',
        totalOmzet: 43250000,
        totalHpp: 19462500,
        grossProfit: 23787500,
        totalPettyCash: 1180000,
        totalPayroll: 5700000,
        totalRukoAndSinkingFund: 2400000,
        totalAllExpenses: 28742500,
        netProfit: 14507500,
        status: 'TERKIRIM OTOMATIS KE GOOGLE SHEETS',
      },
    ],
  });

  useEffect(() => {
    setNewAttendanceForm((prev) => ({
      ...prev,
      date: shiftInfo.date,
    }));
  }, [shiftInfo.date]);

  // ============================================================================
  // MESIN SINKRONISASI CLOUD LINTAS HP & LAPTOP (REAL-TIME MULTI-DEVICE SYNC)
  // ============================================================================
  const getCloudTopicName = (code) => {
    const clean = String(code || 'SUMBER-REDJEKI-CIBIRU')
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_');
    return `warkop_sr_cloud_v2_${clean}`;
  };

  const buildCompactCloudPayload = () => {
    const nowTs = Date.now();
    lastAppliedTimestamp.current = nowTs;
    return {
      v: 2,
      ts: nowTs,
      dev: deviceId,
      si: [shiftInfo.date, shiftInfo.shift, shiftInfo.workerCurrent, shiftInfo.workerNext],
      dr: [
        initialDrawerModal,
        qrisSales,
        actualDrawerCash,
        autoDateMode,
        currentShiftSaved ? 1 : 0,
      ],
      pin: [ownerPin, ownerRecoveryWord, allowQuickDemoUnlock ? 1 : 0],
      inv: inventory.map((it) => [
        it.id,
        it.lockedInitialStock,
        it.initialStock,
        it.stockIn,
        it.finalStock,
        it.wasteOrStaff,
        it.warehouseStock,
        it.priceSell,
        it.priceCost,
        it.lastTamperReason || '',
        it.lastTamperBy || '',
        it.name,
        it.category,
        it.unit,
        it.supplierShare || 0,
        it.minStock || 5,
        it.restockQty || 10,
      ]),
      exp: expenses.map((e) => [e.id, e.description, e.amount, e.hasReceipt ? 1 : 0]),
      wrk: workers.map((w) => [
        w.id,
        w.name,
        w.shiftDefault,
        w.baseSalary,
        w.perShiftRate,
        w.mealAllowancePerShift,
        w.kasbon,
        w.phone || '-',
      ]),
      qr: dailyQrisByDate,
      sf: sinkingFunds.map((s) => [s.id, s.name, s.daily, s.targetDays, s.collectedDays]),
      att: attendanceLogs
        .slice(0, 12)
        .map((a) => [
          a.id,
          a.date,
          a.workerId,
          a.workerName,
          a.shift,
          a.status,
          a.shiftCredit,
          a.note,
          a.source,
        ]),
      his: shiftHistory
        .slice(0, 8)
        .map((h) => [
          h.id,
          h.date,
          h.shift,
          h.workerCurrent,
          h.workerNext,
          h.totalOmzet,
          h.totalHpp,
          h.grossProfit,
          h.qrisAmount,
          h.expensesTotal,
          h.expectedDrawerCash,
          h.actualDrawerCash,
          h.discrepancy,
          h.dropBoxEnvelope,
          h.netProfitShift,
          h.verifiedByOwner ? 1 : 0,
          h.timestamp,
        ]),
      gs: [
        googleSheetsConfig.currentMonthDaysCount,
        googleSheetsConfig.targetMonthDays,
        googleSheetsConfig.lastSyncTime,
        googleSheetsConfig.lastSyncStatus,
      ],
    };
  };

  const applyCompactCloudPayload = (compact, fromSource = 'Cloud') => {
    if (!compact || compact.v !== 2) return false;
    if (compact.ts && compact.ts <= lastAppliedTimestamp.current) return false;

    isRemoteUpdate.current = true;
    if (compact.ts) lastAppliedTimestamp.current = compact.ts;

    if (Array.isArray(compact.si) && compact.si.length >= 4) {
      setShiftInfo({
        date: compact.si[0],
        shift: compact.si[1],
        workerCurrent: compact.si[2],
        workerNext: compact.si[3],
      });
    }

    if (Array.isArray(compact.dr)) {
      if (compact.dr[0] !== undefined) setInitialDrawerModal(compact.dr[0]);
      if (compact.dr[1] !== undefined) setQrisSales(compact.dr[1]);
      if (compact.dr[2] !== undefined) setActualDrawerCash(compact.dr[2]);
      if (compact.dr[3]) setAutoDateMode(compact.dr[3]);
      if (compact.dr[4] !== undefined) setCurrentShiftSaved(Boolean(compact.dr[4]));
    }

    if (Array.isArray(compact.pin)) {
      if (compact.pin[0]) setOwnerPin(String(compact.pin[0]));
      if (compact.pin[1]) setOwnerRecoveryWord(String(compact.pin[1]));
      if (compact.pin[2] !== undefined) setAllowQuickDemoUnlock(Boolean(compact.pin[2]));
    }

    if (Array.isArray(compact.inv)) {
      setInventory((prev) => {
        const prevMap = new Map(prev.map((item) => [item.id, item]));
        return compact.inv.map((row) => {
          const existing = prevMap.get(row[0]) || {};
          return {
            ...existing,
            id: row[0],
            lockedInitialStock: row[1],
            initialStock: row[2],
            stockIn: row[3],
            finalStock: row[4],
            wasteOrStaff: row[5],
            warehouseStock: row[6],
            priceSell: row[7],
            priceCost: row[8],
            lastTamperReason: row[9] || '',
            lastTamperBy: row[10] || '',
            name: row[11] || existing.name || 'Barang',
            category: row[12] || existing.category || 'Satuan / Saset',
            unit: row[13] || existing.unit || 'pcs',
            supplierShare: row[14] ?? existing.supplierShare ?? 0,
            minStock: row[15] ?? existing.minStock ?? 5,
            restockQty: row[16] ?? existing.restockQty ?? 10,
          };
        });
      });
    }

    if (Array.isArray(compact.exp)) {
      setExpenses(
        compact.exp.map((e) => ({
          id: e[0],
          description: e[1],
          amount: e[2],
          hasReceipt: Boolean(e[3]),
        }))
      );
    }

    if (Array.isArray(compact.wrk)) {
      setWorkers(
        compact.wrk.map((w) => ({
          id: w[0],
          name: w[1],
          shiftDefault: w[2],
          baseSalary: w[3],
          perShiftRate: w[4],
          mealAllowancePerShift: w[5],
          kasbon: w[6],
          phone: w[7] || '-',
        }))
      );
    }

    if (compact.qr && typeof compact.qr === 'object') {
      setDailyQrisByDate(compact.qr);
    }

    if (Array.isArray(compact.sf)) {
      setSinkingFunds(
        compact.sf.map((s) => ({
          id: s[0],
          name: s[1],
          daily: s[2],
          targetDays: s[3],
          collectedDays: s[4],
        }))
      );
    }

    if (Array.isArray(compact.att)) {
      setAttendanceLogs(
        compact.att.map((a) => ({
          id: a[0],
          date: a[1],
          workerId: a[2],
          workerName: a[3],
          shift: a[4],
          status: a[5],
          shiftCredit: a[6],
          note: a[7],
          source: a[8] || 'AUTO',
        }))
      );
    }

    if (Array.isArray(compact.his)) {
      setShiftHistory(
        compact.his.map((h) => ({
          id: h[0],
          date: h[1],
          shift: h[2],
          workerCurrent: h[3],
          workerNext: h[4],
          totalOmzet: h[5],
          totalHpp: h[6],
          grossProfit: h[7],
          qrisAmount: h[8],
          expensesTotal: h[9],
          expectedDrawerCash: h[10],
          actualDrawerCash: h[11],
          discrepancy: h[12],
          dropBoxEnvelope: h[13],
          netProfitShift: h[14],
          verifiedByOwner: Boolean(h[15]),
          timestamp: h[16],
        }))
      );
    }

    if (Array.isArray(compact.gs)) {
      setGoogleSheetsConfig((prev) => ({
        ...prev,
        currentMonthDaysCount: compact.gs[0] ?? prev.currentMonthDaysCount,
        targetMonthDays: compact.gs[1] ?? prev.targetMonthDays,
        lastSyncTime: compact.gs[2] || prev.lastSyncTime,
        lastSyncStatus: compact.gs[3] || prev.lastSyncStatus,
      }));
    }

    const timeNow = new Date().toLocaleTimeString('id-ID', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    setLastCloudSync(`${timeNow} WIB (${fromSource})`);
    setCloudStatus('online');

    setTimeout(() => {
      isRemoteUpdate.current = false;
    }, 350);
    return true;
  };

  // Fungsi Tarik Data Terbaru dari Cloud (Agar Semua HP Sama Persis)
  const pullLatestFromCloud = async (showNotification = false) => {
    const topic = getCloudTopicName(storeSyncCode);
    try {
      setCloudStatus('syncing');
      const res = await fetch(`https://ntfy.sh/${topic}/json?poll=1&since=24h`, {
        cache: 'no-store',
      });
      if (!res.ok) throw new Error('Cloud fetch failed');
      const text = await res.text();
      const lines = text
        .trim()
        .split('\n')
        .filter((l) => l.trim().length > 0);

      let latestCompact = null;
      for (let i = lines.length - 1; i >= 0; i--) {
        try {
          const evt = JSON.parse(lines[i]);
          if (evt && evt.event === 'message' && evt.message) {
            const parsedMsg = JSON.parse(evt.message);
            if (parsedMsg && parsedMsg.v === 2) {
              latestCompact = parsedMsg;
              break;
            }
          }
        } catch (err) {
          // Lanjutkan cek baris sebelumnya
        }
      }

      if (latestCompact) {
        const applied = applyCompactCloudPayload(latestCompact, 'HP Lain');
        if (showNotification) {
          showToast(
            applied
              ? '📲 Data terbaru dari HP lain berhasil ditarik & disamakan!'
              : '✅ Data di HP ini sudah paling baru (Sama dengan Cloud)!'
          );
        }
      } else {
        setCloudStatus('online');
        if (showNotification) {
          showToast('✅ Terhubung ke Cloud! Klik "Kirim ke Semua HP" untuk mengunggah data awal.');
        }
      }
    } catch (e) {
      setCloudStatus('local');
    }
  };

  // Fungsi Kirim Data ke Semua HP yang Memakai Kode Toko yang Sama
  const pushStateToCloud = async (showNotification = false) => {
    const topic = getCloudTopicName(storeSyncCode);
    try {
      setCloudStatus('syncing');
      const compactPayload = buildCompactCloudPayload();
      await fetch(`https://ntfy.sh/${topic}`, {
        method: 'POST',
        headers: {
          Title: `Sync Warkop Sumber Redjeki (${deviceId})`,
          Priority: 'default',
        },
        body: JSON.stringify(compactPayload),
      });
      const timeNow = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      });
      setLastCloudSync(`${timeNow} WIB`);
      setCloudStatus('online');
      if (showNotification) {
        showToast('☁️ Data berhasil dikirim ke Cloud! Semua HP & Laptop sekarang menampilkan data yang sama.');
      }
    } catch (e) {
      setCloudStatus('local');
    }
  };

  // 1. TARIK DATA AWAL & BUKA KONEKSI STREAM REAL-TIME ANTAR-HP (SSE + LOCALSTORAGE)
  useEffect(() => {
    const storageKey = `warkop_sr_online_${storeSyncCode}`;
    try {
      const savedRaw = localStorage.getItem(storageKey);
      if (savedRaw) {
        const data = JSON.parse(savedRaw);
        isRemoteUpdate.current = true;
        if (data.ts) lastAppliedTimestamp.current = data.ts;
        if (data.shiftInfo) setShiftInfo(data.shiftInfo);
        if (data.inventory) setInventory(data.inventory);
        if (data.stockTamperLogs) setStockTamperLogs(data.stockTamperLogs);
        if (data.workers) setWorkers(data.workers);
        if (data.shiftHistory) setShiftHistory(data.shiftHistory);
        if (data.expenses) setExpenses(data.expenses);
        if (data.attendanceLogs) setAttendanceLogs(data.attendanceLogs);
        if (data.initialDrawerModal !== undefined) setInitialDrawerModal(data.initialDrawerModal);
        if (data.qrisSales !== undefined) setQrisSales(data.qrisSales);
        if (data.actualDrawerCash !== undefined) setActualDrawerCash(data.actualDrawerCash);
        if (data.dailyQrisByDate) setDailyQrisByDate(data.dailyQrisByDate);
        if (data.workerQrisLogs) setWorkerQrisLogs(data.workerQrisLogs);
        if (data.sinkingFunds) setSinkingFunds(data.sinkingFunds);
        if (data.autoDateMode) setAutoDateMode(data.autoDateMode);
        if (data.googleSheetsConfig) setGoogleSheetsConfig(data.googleSheetsConfig);
        if (data.customLogoUrl !== undefined) setCustomLogoUrl(data.customLogoUrl);
        if (data.ownerPin) setOwnerPin(String(data.ownerPin));
        if (data.ownerRecoveryWord) setOwnerRecoveryWord(String(data.ownerRecoveryWord));
        if (data.allowQuickDemoUnlock !== undefined) {
          setAllowQuickDemoUnlock(Boolean(data.allowQuickDemoUnlock));
        }
        if (data.updatedAt) setLastCloudSync(data.updatedAt);
        setTimeout(() => {
          isRemoteUpdate.current = false;
        }, 200);
      }
    } catch (e) {
      console.error('Load local error:', e);
    }

    // Tarik data terbaru dari Server Cloud Antar-HP saat aplikasi dibuka
    pullLatestFromCloud(false);

    // Pasang pendengar Real-Time Server-Sent Events (SSE) agar begitu HP 1 ketik, HP 2 langsung berubah
    const topic = getCloudTopicName(storeSyncCode);
    let eventSource = null;
    try {
      eventSource = new EventSource(`https://ntfy.sh/${topic}/sse`);
      eventSource.onopen = () => {
        setCloudStatus('online');
      };
      eventSource.onmessage = (event) => {
        try {
          const evtData = JSON.parse(event.data);
          if (evtData && evtData.event === 'message' && evtData.message) {
            const incoming = JSON.parse(evtData.message);
            if (incoming && incoming.v === 2 && incoming.dev !== deviceId) {
              applyCompactCloudPayload(incoming, 'Live HP Lain');
            }
          }
        } catch (err) {
          // Abaikan pesan non-JSON
        }
      };
      eventSource.onerror = () => {
        // Jika jaringan seluler memutus SSE, polling periodik di bawah akan tetap menjaga sinkronisasi
      };
    } catch (err) {
      console.error('SSE init error:', err);
    }

    // Polling cadangan setiap 12 detik khusus untuk browser HP yang membatasi background stream
    const pollInterval = setInterval(() => {
      if (!isRemoteUpdate.current) {
        pullLatestFromCloud(false);
      }
    }, 12000);

    const handleStorageEvent = (e) => {
      if (e.key === storageKey && e.newValue) {
        try {
          const data = JSON.parse(e.newValue);
          isRemoteUpdate.current = true;
          if (data.ts) lastAppliedTimestamp.current = data.ts;
          if (data.shiftInfo) setShiftInfo(data.shiftInfo);
          if (data.inventory) setInventory(data.inventory);
          if (data.stockTamperLogs) setStockTamperLogs(data.stockTamperLogs);
          if (data.workers) setWorkers(data.workers);
          if (data.shiftHistory) setShiftHistory(data.shiftHistory);
          if (data.expenses) setExpenses(data.expenses);
          if (data.attendanceLogs) setAttendanceLogs(data.attendanceLogs);
          if (data.initialDrawerModal !== undefined) setInitialDrawerModal(data.initialDrawerModal);
          if (data.qrisSales !== undefined) setQrisSales(data.qrisSales);
          if (data.actualDrawerCash !== undefined) setActualDrawerCash(data.actualDrawerCash);
          if (data.dailyQrisByDate) setDailyQrisByDate(data.dailyQrisByDate);
          if (data.workerQrisLogs) setWorkerQrisLogs(data.workerQrisLogs);
          if (data.sinkingFunds) setSinkingFunds(data.sinkingFunds);
          if (data.autoDateMode) setAutoDateMode(data.autoDateMode);
          if (data.googleSheetsConfig) setGoogleSheetsConfig(data.googleSheetsConfig);
          if (data.customLogoUrl !== undefined) setCustomLogoUrl(data.customLogoUrl);
          if (data.ownerPin) setOwnerPin(String(data.ownerPin));
          if (data.ownerRecoveryWord) setOwnerRecoveryWord(String(data.ownerRecoveryWord));
          if (data.allowQuickDemoUnlock !== undefined) {
            setAllowQuickDemoUnlock(Boolean(data.allowQuickDemoUnlock));
          }
          if (data.updatedAt) setLastCloudSync(data.updatedAt);
          setTimeout(() => {
            isRemoteUpdate.current = false;
          }, 150);
        } catch (err) {
          console.error('Storage listener parse error:', err);
        }
      }
    };

    window.addEventListener('storage', handleStorageEvent);
    return () => {
      window.removeEventListener('storage', handleStorageEvent);
      clearInterval(pollInterval);
      if (eventSource) eventSource.close();
    };
  }, [storeSyncCode]);

  // 2. SIMPAN OTOMATIS KE MEMORI HP & KIRIM OTOMATIS KE SERVER CLOUD ANTAR-HP
  useEffect(() => {
    if (isRemoteUpdate.current) return;
    const storageKey = `warkop_sr_online_${storeSyncCode}`;
    const timer = setTimeout(() => {
      try {
        const nowTs = Date.now();
        lastAppliedTimestamp.current = nowTs;
        const timeNow = new Date().toLocaleTimeString('id-ID', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        });
        const payload = {
          ts: nowTs,
          shiftInfo,
          inventory,
          stockTamperLogs,
          workers,
          shiftHistory,
          expenses,
          attendanceLogs,
          initialDrawerModal,
          qrisSales,
          actualDrawerCash,
          dailyQrisByDate,
          workerQrisLogs,
          sinkingFunds,
          autoDateMode,
          googleSheetsConfig,
          customLogoUrl: customLogoUrl || null,
          ownerPin,
          ownerRecoveryWord,
          allowQuickDemoUnlock,
          updatedAt: `${timeNow} WIB`,
        };
        localStorage.setItem(storageKey, JSON.stringify(payload));
        pushStateToCloud(false);
      } catch (e) {
        console.error('Auto-save error:', e);
      }
    }, 850);
    return () => clearTimeout(timer);
  }, [
    storeSyncCode,
    shiftInfo,
    inventory,
    stockTamperLogs,
    workers,
    shiftHistory,
    expenses,
    attendanceLogs,
    initialDrawerModal,
    qrisSales,
    actualDrawerCash,
    dailyQrisByDate,
    workerQrisLogs,
    sinkingFunds,
    autoDateMode,
    googleSheetsConfig,
    customLogoUrl,
    ownerPin,
    ownerRecoveryWord,
    allowQuickDemoUnlock,
  ]);

  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [newExpDesc, setNewExpDesc] = useState('');
  const [newExpAmount, setNewExpAmount] = useState('');
  const [newExpReceipt, setNewExpReceipt] = useState(true);
  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'Satuan / Saset',
    unit: 'pcs',
    priceSell: '',
    priceCost: '',
    supplierShare: '',
    warehouseStock: 40,
    RestockUnit: '1 Paket',
    restockQty: 20,
    initialStock: '',
    minStock: 10,
  });

  const [toastMessage, setToastMessage] = useState('');
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3800);
  };

  const copyToClipboard = (text, onSuccess) => {
    try {
      const textArea = document.createElement('textarea');
      textArea.value = text;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '0';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      const ok = document.execCommand('copy');
      document.body.removeChild(textArea);
      if (ok && onSuccess) {
        onSuccess();
        return;
      }
    } catch (err) {
      // Fallback below
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          if (onSuccess) onSuccess();
        })
        .catch(() => {
          if (onSuccess) onSuccess();
        });
    } else if (onSuccess) {
      onSuccess();
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomLogoUrl(event.target?.result);
        showToast('Logo Warkop Sumber Redjeki berhasil diperbarui!');
      };
      reader.readAsDataURL(file);
    }
  };

  const calculatedInventory = useMemo(() => {
    return inventory.map((item) => {
      const lockedInit = Number(item.lockedInitialStock ?? item.initialStock ?? 0);
      const currentInit = Number(item.initialStock || 0);
      const tamperDiff = currentInit - lockedInit;
      const isTampered = tamperDiff !== 0;

      const totalAvailable = currentInit + Number(item.stockIn || 0);
      const totalOut = Number(item.finalStock || 0) + Number(item.wasteOrStaff || 0);
      const soldQty = totalAvailable - totalOut;
      const isInvalidNegative = soldQty < 0;
      const validSoldQty = Math.max(0, soldQty);

      const grossRevenue = validSoldQty * Number(item.priceSell || 0);
      const supplierPayout = validSoldQty * Number(item.supplierShare || 0);
      const cogs = validSoldQty * Number(item.priceCost || 0);
      const netRevenueWarkop = grossRevenue - supplierPayout;
      const grossProfit = netRevenueWarkop - cogs;
      const isLowStock = Number(item.finalStock || 0) <= Number(item.minStock || 0);

      return {
        ...item,
        lockedInit,
        tamperDiff,
        isTampered,
        totalAvailable,
        soldQty,
        validSoldQty,
        isInvalidNegative,
        grossRevenue,
        supplierPayout,
        cogs,
        netRevenueWarkop,
        grossProfit,
        isLowStock,
      };
    });
  }, [inventory]);

  const tamperedItemsList = useMemo(
    () => calculatedInventory.filter((i) => i.isTampered),
    [calculatedInventory]
  );

  const financialSummary = useMemo(() => {
    let totalOmzetStok = 0;
    let totalSetoranSuplier = 0;
    let totalHppBarangSendiri = 0;
    let totalGrossProfit = 0;
    let hasStockError = false;
    let lowStockItems = [];
    let totalStaffMealsQty = 0;
    let totalCupsSold = 0;
    let totalSachetsSold = 0;

    calculatedInventory.forEach((item) => {
      totalOmzetStok += item.grossRevenue;
      totalSetoranSuplier += item.supplierPayout;
      totalHppBarangSendiri += item.cogs;
      totalGrossProfit += item.grossProfit;
      totalStaffMealsQty += Number(item.wasteOrStaff || 0);

      if (item.id === 'cur-1') totalCupsSold += item.validSoldQty;
      if (item.id === 'sat-4' || item.id === 'sat-5') totalSachetsSold += item.validSoldQty;

      if (item.isInvalidNegative) hasStockError = true;
      if (item.isLowStock) lowStockItems.push(item);
    });

    const totalPettyCash = expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
    const totalWorkerQrisLogged = workerQrisLogs.reduce(
      (acc, curr) => acc + Number(curr.amount || 0),
      0
    );

    const netCashDepositedByWorker =
      Number(actualDrawerCash || 0) - Number(initialDrawerModal || 0);

    const impliedQrisFromCashGap = Math.max(
      0,
      totalOmzetStok - totalPettyCash - Math.max(0, netCashDepositedByWorker)
    );

    const cashSalesExpected = totalOmzetStok - Number(qrisSales || 0);
    const expectedDrawerCash =
      Number(initialDrawerModal || 0) + cashSalesExpected - totalPettyCash;

    const dropBoxEnvelopeAmount = Math.max(
      0,
      Number(actualDrawerCash || 0) - Number(initialDrawerModal || 0)
    );

    const cashDiscrepancy = Number(actualDrawerCash || 0) - expectedDrawerCash;

    const totalDailySinkingFund = sinkingFunds.reduce(
      (acc, curr) => acc + Number(curr.daily || 0),
      0
    );

    const totalHppDanSetoranSuplier = totalHppBarangSendiri + totalSetoranSuplier;
    const estimatedNetProfit = totalGrossProfit - totalPettyCash - totalDailySinkingFund;

    return {
      totalOmzetStok,
      totalSetoranSuplier,
      totalHppBarangSendiri,
      totalHppDanSetoranSuplier,
      totalGrossProfit,
      totalPettyCash,
      totalWorkerQrisLogged,
      netCashDepositedByWorker,
      impliedQrisFromCashGap,
      cashSalesExpected,
      expectedDrawerCash,
      dropBoxEnvelopeAmount,
      cashDiscrepancy,
      totalDailySinkingFund,
      estimatedNetProfit,
      hasStockError,
      lowStockItems,
      totalStaffMealsQty,
      totalCupsSold,
      totalSachetsSold,
    };
  }, [
    calculatedInventory,
    expenses,
    workerQrisLogs,
    initialDrawerModal,
    qrisSales,
    actualDrawerCash,
    sinkingFunds,
  ]);

  const ownerAnalytics = useMemo(() => {
    const activeDaysCount = Number(googleSheetsConfig.currentMonthDaysCount || 29);
    const allShiftsOmzet =
      shiftHistory.reduce((acc, s) => acc + s.totalOmzet, 0) + financialSummary.totalOmzetStok;
    const allShiftsHpp =
      shiftHistory.reduce((acc, s) => acc + s.totalHpp, 0) +
      financialSummary.totalHppDanSetoranSuplier;
    const allShiftsGrossProfit =
      shiftHistory.reduce((acc, s) => acc + s.grossProfit, 0) + financialSummary.totalGrossProfit;
    const allShiftsExpenses =
      shiftHistory.reduce((acc, s) => acc + s.expensesTotal, 0) + financialSummary.totalPettyCash;

    // Proyeksi / Akumulasi 1 Bulan Penuh (30 Hari) berdasarkan rata-rata shift berjalan
    const recordedShiftsCount = Math.max(1, shiftHistory.length + 1);
    const avgOmzetPerShift = allShiftsOmzet / recordedShiftsCount;
    const avgHppPerShift = allShiftsHpp / recordedShiftsCount;
    const avgPettyPerShift = allShiftsExpenses / recordedShiftsCount;

    const monthlyGrossOmzet = Math.round(avgOmzetPerShift * activeDaysCount * 2);
    const monthlyTotalHpp = Math.round(avgHppPerShift * activeDaysCount * 2);
    const monthlyGrossProfit = monthlyGrossOmzet - monthlyTotalHpp;
    const monthlyPettyCashTotal = Math.round(avgPettyPerShift * activeDaysCount * 2);

    const unverifiedEnvelopes = shiftHistory.filter((s) => !s.verifiedByOwner);
    const totalCashInSafeBox =
      unverifiedEnvelopes.reduce((acc, s) => acc + s.dropBoxEnvelope, 0) +
      financialSummary.dropBoxEnvelopeAmount;

    const workerReports = workers.map((w) => {
      const workerShifts = shiftHistory.filter((s) => s.workerCurrent === w.name);
      const isCurrentActive = shiftInfo.workerCurrent === w.name;

      const totalMinusFromHistory = workerShifts.reduce(
        (acc, s) => acc + (s.discrepancy < 0 ? Math.abs(s.discrepancy) : 0),
        0
      );

      const workerAttendance = attendanceLogs.filter(
        (a) => a.workerId === w.id || a.workerName.toLowerCase() === w.name.toLowerCase()
      );
      const hadirNormalDays = workerAttendance.filter((a) => a.status === 'HADIR_NORMAL').length;
      const lemburTuurDays = workerAttendance.filter((a) => a.status === 'LEMBUR_TUUR').length;
      const izinSakitDays = workerAttendance.filter((a) => a.status === 'IZIN_SAKIT').length;
      const alfaDays = workerAttendance.filter((a) => a.status === 'ALFA').length;

      // Untuk 1 bulan penuh, hitung total shift hadir dari log + hari berjalan
      const loggedShiftsCount = workerAttendance.reduce(
        (acc, a) => acc + Number(a.shiftCredit || 0),
        0
      );
      const totalShiftsMonth = Math.max(loggedShiftsCount, Math.round(activeDaysCount * 0.95));

      const shiftWagesEarned = totalShiftsMonth * Number(w.perShiftRate || 0);
      const mealAllowanceEarned = totalShiftsMonth * Number(w.mealAllowancePerShift || 0);
      const alfaPenalty = alfaDays * 50000;

      const grossEarnings =
        Number(w.baseSalary || 0) + shiftWagesEarned + mealAllowanceEarned;

      const takeHomePay = Math.max(
        0,
        grossEarnings - Number(w.kasbon || 0) - alfaPenalty
      );

      return {
        ...w,
        shiftsCount: workerShifts.length + (isCurrentActive ? 1 : 0),
        totalShiftsMonth,
        hadirNormalDays,
        lemburTuurDays,
        izinSakitDays,
        alfaDays,
        shiftWagesEarned,
        mealAllowanceEarned,
        alfaPenalty,
        grossEarnings,
        totalMinus: totalMinusFromHistory,
        takeHomePay,
      };
    });

    const totalPayrollExpense = workerReports.reduce((acc, w) => acc + w.grossEarnings, 0);
    const monthlySinkingFundAllocationsTotal = sinkingFunds.reduce(
      (acc, curr) => acc + Number(curr.daily || 0) * Number(curr.collectedDays || activeDaysCount),
      0
    );

    const totalMonthlyOpex =
      totalPayrollExpense + monthlySinkingFundAllocationsTotal + monthlyPettyCashTotal;
    const monthlyNetProfit = monthlyGrossProfit - totalMonthlyOpex;
    const hppPercent =
      monthlyGrossOmzet > 0 ? ((monthlyTotalHpp / monthlyGrossOmzet) * 100).toFixed(1) : 0;
    const netMarginPercent =
      monthlyGrossOmzet > 0 ? ((monthlyNetProfit / monthlyGrossOmzet) * 100).toFixed(1) : 0;

    return {
      allShiftsOmzet,
      allShiftsHpp,
      allShiftsGrossProfit,
      allShiftsExpenses,
      monthlyGrossOmzet,
      monthlyTotalHpp,
      monthlyGrossProfit,
      monthlyPettyCashTotal,
      unverifiedEnvelopes,
      totalCashInSafeBox,
      workerReports,
      totalPayrollExpense,
      monthlySinkingFundAllocationsTotal,
      totalMonthlyOpex,
      monthlyNetProfit,
      hppPercent,
      netMarginPercent,
    };
  }, [shiftHistory, financialSummary, workers, shiftInfo, sinkingFunds, attendanceLogs, googleSheetsConfig.currentMonthDaysCount]);

  const dailyReconciliationReport = useMemo(() => {
    const targetDate = selectedReconDate;
    const shiftsOnDate = shiftHistory.filter((s) => s.date === targetDate);
    const includeCurrentLiveShift = shiftInfo.date === targetDate;

    const totalOmzetBarangHarian =
      shiftsOnDate.reduce((acc, s) => acc + s.totalOmzet, 0) +
      (includeCurrentLiveShift ? financialSummary.totalOmzetStok : 0);

    const totalBelanjaNotaHarian =
      shiftsOnDate.reduce((acc, s) => acc + s.expensesTotal, 0) +
      (includeCurrentLiveShift ? financialSummary.totalPettyCash : 0);

    const totalSetoranTunaiAmplopHarian =
      shiftsOnDate.reduce((acc, s) => acc + s.dropBoxEnvelope, 0) +
      (includeCurrentLiveShift ? financialSummary.dropBoxEnvelopeAmount : 0);

    const actualQrisFromOwnerBank = Number(dailyQrisByDate[targetDate] || 0);

    const expectedQrisForZeroMinus = Math.max(
      0,
      totalOmzetBarangHarian - totalBelanjaNotaHarian - totalSetoranTunaiAmplopHarian
    );

    const totalUangMasukGabungan =
      totalSetoranTunaiAmplopHarian + actualQrisFromOwnerBank + totalBelanjaNotaHarian;

    const selisihHarian = totalUangMasukGabungan - totalOmzetBarangHarian;

    return {
      targetDate,
      shiftsCount: shiftsOnDate.length + (includeCurrentLiveShift ? 1 : 0),
      includeCurrentLiveShift,
      totalOmzetBarangHarian,
      totalBelanjaNotaHarian,
      totalSetoranTunaiAmplopHarian,
      actualQrisFromOwnerBank,
      expectedQrisForZeroMinus,
      totalUangMasukGabungan,
      selisihHarian,
    };
  }, [selectedReconDate, shiftHistory, shiftInfo.date, financialSummary, dailyQrisByDate]);

  const handleStockChange = (id, field, rawValue) => {
    if (field === 'initialStock') return;
    const cleaned = cleanNumInput(rawValue);
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: cleaned } : item))
    );
  };

  const handleStepStock = (id, field, delta) => {
    if (field === 'initialStock') return;
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const curr = Number(item[field] || 0);
        const nextVal = Math.max(0, curr + delta);
        return { ...item, [field]: nextVal };
      })
    );
  };

  const openCorrectionModal = (item) => {
    setTamperModalItem(item);
    setTamperNewValue(item.initialStock);
    setTamperReasonInput(item.lastTamperReason || '');
  };

  const handleConfirmTamperInitialStock = (e) => {
    e.preventDefault();
    if (!tamperModalItem) return;
    const newInitVal = Number(tamperNewValue || 0);
    const lockedVal = Number(
      tamperModalItem.lockedInitialStock ?? tamperModalItem.initialStock ?? 0
    );
    const diff = newInitVal - lockedVal;

    if (diff !== 0 && !tamperReasonInput.trim()) {
      showToast('⚠️ Wajib isi alasan kenapa mengubah Stok Awal yang sudah dikunci!');
      return;
    }

    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });

    setInventory((prev) =>
      prev.map((item) =>
        item.id === tamperModalItem.id
          ? {
              ...item,
              initialStock: newInitVal,
              lastTamperReason: diff === 0 ? '' : tamperReasonInput.trim(),
              lastTamperBy: diff === 0 ? '' : shiftInfo.workerCurrent,
            }
          : item
      )
    );

    if (diff !== 0) {
      const newLog = {
        id: `tmp-${Date.now()}`,
        timestamp: `${shiftInfo.date}, ${timeStr} WIB`,
        worker: shiftInfo.workerCurrent,
        shift: shiftInfo.shift,
        itemId: tamperModalItem.id,
        itemName: tamperModalItem.name,
        unit: tamperModalItem.unit,
        lockedStock: lockedVal,
        newInitialStock: newInitVal,
        diff,
        type: diff < 0 ? 'DIKURANGI' : 'DILEBIHKAN',
        financialImpact: Math.abs(diff) * Number(tamperModalItem.priceSell || 0),
        reason: tamperReasonInput.trim(),
        status: 'TERDETEKSI',
      };
      setStockTamperLogs((prev) => [newLog, ...prev]);
      showToast(
        `🚨 PERINGATAN: Perubahan Stok Awal ${tamperModalItem.name} (${diff > 0 ? `+${diff}` : diff} ${tamperModalItem.unit}) otomatis dilaporkan ke Owner!`
      );
    } else {
      showToast(`✅ Stok Awal ${tamperModalItem.name} dikembalikan sesuai kunci shift sebelumnya.`);
    }

    setTamperModalItem(null);
  };

  const handleRestoreLockedStock = (itemId) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              initialStock: Number(item.lockedInitialStock ?? item.initialStock ?? 0),
              lastTamperReason: '',
              lastTamperBy: '',
            }
          : item
      )
    );
    setStockTamperLogs((prev) =>
      prev.map((l) => (l.itemId === itemId ? { ...l, status: 'DIBATALKAN OWNER' } : l))
    );
    showToast('🔒 Stok Awal berhasil dikembalikan paksa ke angka kunci shift sebelumnya!');
  };

  const handleApproveTamperedStock = (itemId) => {
    setInventory((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? {
              ...item,
              lockedInitialStock: Number(item.initialStock || 0),
              lastTamperReason: '',
              lastTamperBy: '',
            }
          : item
      )
    );
    setStockTamperLogs((prev) =>
      prev.map((l) => (l.itemId === itemId ? { ...l, status: 'DISETUJUI OWNER' } : l))
    );
    showToast('✅ Koreksi stok awal disetujui Owner & dikunci sebagai patokan baru.');
  };

  const handleTransferFromWarehouse = (id, qtyToTransfer) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const availableWarehouse = Number(item.warehouseStock || 0);
        const actualTransfer =
          item.category === 'Titipan (Konsinyasi)'
            ? qtyToTransfer
            : Math.min(availableWarehouse, qtyToTransfer);

        if (actualTransfer <= 0 && item.category !== 'Titipan (Konsinyasi)') {
          showToast(`Stok Gudang Utama untuk ${item.name} habis! Silakan kulakan dulu.`);
          return item;
        }

        showToast(
          `+${actualTransfer} ${item.unit} ${item.name} diturunkan dari Gudang ke Etalase Kasir!`
        );
        return {
          ...item,
          warehouseStock:
            item.category === 'Titipan (Konsinyasi)'
              ? 0
              : availableWarehouse - actualTransfer,
          stockIn: Number(item.stockIn || 0) + actualTransfer,
          finalStock: Number(item.finalStock || 0) + actualTransfer,
        };
      })
    );
  };

  const handleAddWarehouseRestock = (id, qtyAdded) => {
    setInventory((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        showToast(`Stok Gudang Utama ${item.name} bertambah +${qtyAdded} ${item.unit}`);
        return {
          ...item,
          warehouseStock: Number(item.warehouseStock || 0) + qtyAdded,
        };
      })
    );
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpDesc.trim() || !newExpAmount) return;
    setExpenses((prev) => [
      ...prev,
      {
        id: `exp-${Date.now()}`,
        description: newExpDesc.trim(),
        amount: Number(newExpAmount),
        hasReceipt: newExpReceipt,
      },
    ]);
    setNewExpDesc('');
    setNewExpAmount('');
    setNewExpReceipt(true);
    showToast('Belanja kasir harian ditambahkan.');
  };

  const handleAddWorkerQrisLog = (e) => {
    e.preventDefault();
    if (!newWorkerQrisNote.trim() || !newWorkerQrisAmt) return;
    setWorkerQrisLogs((prev) => [
      ...prev,
      {
        id: `wq-${Date.now()}`,
        note: newWorkerQrisNote.trim(),
        amount: Number(newWorkerQrisAmt),
      },
    ]);
    setNewWorkerQrisNote('');
    setNewWorkerQrisAmt('');
    showToast('Catatan transaksi QRIS pelanggan ditambahkan.');
  };

  const handleRemoveWorkerQrisLog = (id) => {
    setWorkerQrisLogs((prev) => prev.filter((item) => item.id !== id));
  };

  const handleSaveDailyOwnerQris = (dateStr, rawAmt) => {
    const cleaned = cleanNumInput(rawAmt);
    setDailyQrisByDate((prev) => ({
      ...prev,
      [dateStr]: cleaned,
    }));
    if (shiftInfo.date === dateStr) {
      setQrisSales(cleaned === '' ? 0 : cleaned);
    }
  };

  const handleRemoveExpense = (id) => {
    setExpenses((prev) => prev.filter((exp) => exp.id !== id));
  };

  const handleUpdateSinkingFund = (id, field, rawVal) => {
    setSinkingFunds((prev) =>
      prev.map((sf) => {
        if (sf.id !== id) return sf;
        if (field === 'name') {
          return { ...sf, name: rawVal };
        }
        const cleaned = cleanNumInput(rawVal);
        if (field === 'monthlyTarget') {
          const days = Number(sf.targetDays || 30) || 30;
          const newDaily = cleaned === '' ? '' : Math.round(Number(cleaned) / days);
          return { ...sf, daily: newDaily };
        }
        return { ...sf, [field]: cleaned };
      })
    );
  };

  const handleDeleteSinkingFund = (id) => {
    setSinkingFunds((prev) => prev.filter((sf) => sf.id !== id));
    showToast('Pos Target Sinking Fund dihapus.');
  };

  const handleAddSinkingFund = (e) => {
    e.preventDefault();
    if (!newSfName.trim() || !newSfDaily) return;
    setSinkingFunds((prev) => [
      ...prev,
      {
        id: `sf-${Date.now()}`,
        name: newSfName.trim(),
        daily: Number(newSfDaily),
        targetDays: Number(newSfTargetDays) || 30,
        collectedDays: 1,
      },
    ]);
    setNewSfName('');
    setNewSfDaily('');
    setNewSfTargetDays(30);
    setShowAddSfModal(false);
    showToast(`Pos Target "${newSfName}" berhasil ditambahkan!`);
  };

  const handleUpdateWorkerField = (id, field, value) => {
    const oldWorker = workers.find((w) => w.id === id);
    const oldName = oldWorker?.name;

    setWorkers((prev) =>
      prev.map((w) => {
        if (w.id !== id) return w;
        if (field === 'name' || field === 'shiftDefault' || field === 'phone') {
          return { ...w, [field]: value };
        }
        return { ...w, [field]: cleanNumInput(value) };
      })
    );

    if (field === 'name' && oldName && value && oldName !== value) {
      setShiftInfo((prev) => ({
        ...prev,
        workerCurrent: prev.workerCurrent === oldName ? value : prev.workerCurrent,
        workerNext: prev.workerNext === oldName ? value : prev.workerNext,
      }));
      setAttendanceLogs((prev) =>
        prev.map((log) =>
          log.workerId === id || log.workerName === oldName
            ? { ...log, workerId: id, workerName: value }
            : log
        )
      );
      setShiftHistory((prev) =>
        prev.map((sh) => ({
          ...sh,
          workerCurrent: sh.workerCurrent === oldName ? value : sh.workerCurrent,
          workerNext: sh.workerNext === oldName ? value : sh.workerNext,
        }))
      );
    }
  };

  const handleAddNewWorker = (e) => {
    e.preventDefault();
    if (!newWorkerForm.name.trim()) return;
    const createdId = `wrk-${Date.now()}`;
    const created = {
      id: createdId,
      name: newWorkerForm.name.trim(),
      shiftDefault: newWorkerForm.shiftDefault,
      baseSalary: Number(newWorkerForm.baseSalary || 0),
      perShiftRate: Number(newWorkerForm.perShiftRate || 0),
      mealAllowancePerShift: Number(newWorkerForm.mealAllowancePerShift || 0),
      kasbon: Number(newWorkerForm.kasbon || 0),
      phone: newWorkerForm.phone.trim() || '-',
    };
    setWorkers((prev) => [...prev, created]);
    setNewAttendanceForm((prev) => ({ ...prev, workerId: createdId }));
    setNewWorkerForm({
      name: '',
      shiftDefault: 'Shift Siang (07:00 - 16:00)',
      baseSalary: 1200000,
      perShiftRate: 50000,
      mealAllowancePerShift: 15000,
      kasbon: 0,
      phone: '',
    });
    setShowAddWorkerModal(false);
    showToast(`Pekerja "${created.name}" berhasil ditambahkan!`);
  };

  const handleDeleteWorker = (id, name) => {
    if (workers.length <= 1) {
      showToast('Minimal harus ada 1 pekerja aktif di sistem.');
      return;
    }
    const remaining = workers.filter((w) => w.id !== id);
    setWorkers(remaining);
    if (newAttendanceForm.workerId === id && remaining[0]) {
      setNewAttendanceForm((prev) => ({ ...prev, workerId: remaining[0].id }));
    }
    showToast(`Data pekerja "${name}" dihapus.`);
  };

  const handleAddAttendance = (e) => {
    e.preventDefault();
    const selectedWorkerObj =
      workers.find((w) => w.id === newAttendanceForm.workerId) || workers[0];
    if (!selectedWorkerObj) return;

    let shiftCredit = 1;
    if (newAttendanceForm.status === 'LEMBUR_TUUR') shiftCredit = 2;
    if (newAttendanceForm.status === 'IZIN_SAKIT' || newAttendanceForm.status === 'ALFA') {
      shiftCredit = 0;
    }

    const newLog = {
      id: `att-${Date.now()}`,
      date: newAttendanceForm.date,
      workerId: selectedWorkerObj.id,
      workerName: selectedWorkerObj.name,
      shift: newAttendanceForm.shift,
      status: newAttendanceForm.status,
      shiftCredit,
      note:
        newAttendanceForm.note.trim() ||
        (newAttendanceForm.status === 'HADIR_NORMAL'
          ? 'Hadir Shift Normal'
          : newAttendanceForm.status === 'LEMBUR_TUUR'
          ? 'Tuur / Double Shift (2 Shift)'
          : newAttendanceForm.status === 'IZIN_SAKIT'
          ? 'Izin / Sakit'
          : 'Alfa / Tanpa Kabar'),
      source: 'MANUAL',
    };

    setAttendanceLogs((prev) => [newLog, ...prev]);
    setNewAttendanceForm((prev) => ({ ...prev, note: '' }));
    showToast(`Absensi ${selectedWorkerObj.name} (${newAttendanceForm.date}) berhasil dicatat!`);
  };

  const handleChangeAttendanceWorkerInRow = (attId, newWorkerId) => {
    const targetWorker = workers.find((w) => w.id === newWorkerId);
    if (!targetWorker) return;
    setAttendanceLogs((prev) =>
      prev.map((a) =>
        a.id === attId
          ? { ...a, workerId: targetWorker.id, workerName: targetWorker.name }
          : a
      )
    );
    showToast(`Nama pekerja pada baris absensi diubah menjadi ${targetWorker.name}.`);
  };

  const handleRemoveAttendance = (id) => {
    setAttendanceLogs((prev) => prev.filter((a) => a.id !== id));
    showToast('Catatan absensi dihapus.');
  };

  const generateWorkerPayslipWA = (w) => {
    return `*SLIP GAJI & REKAP ABSENSI PEKERJA*
*WARKOP SUMBER REDJEKI (生计来源)*
📍 _Ruko Raoseun - Cibiru - Bandung_
━━━━━━━━━━━━━━━━━━━━━━
👤 *Nama Pekerja:* ${w.name}
📅 *Periode:* ${googleSheetsConfig.monthLabel}
🕒 *Shift Utama:* ${w.shiftDefault}

*A. REKAP ABSENSI KEHADIRAN:*
• Hadir Normal: ${w.hadirNormalDays} Hari
• Lembur / Tuur Teman (2 Shift): ${w.lemburTuurDays} Kali
• Izin / Sakit: ${w.izinSakitDays} Hari
• Alfa (Tanpa Kabar): ${w.alfaDays} Hari
• *Total Shift Dihitung Gaji:* *${w.totalShiftsMonth} Shift*

*B. RINCIAN PENDAPATAN:*
• Gaji Pokok Tetap: ${formatRupiah(w.baseSalary)}
• Upah Per-Shift (${w.totalShiftsMonth} x ${formatRupiah(w.perShiftRate)}): ${formatRupiah(w.shiftWagesEarned)}
• Uang Makan (${w.totalShiftsMonth} x ${formatRupiah(w.mealAllowancePerShift)}): ${formatRupiah(w.mealAllowanceEarned)}
• *Total Pendapatan Kotor:* *${formatRupiah(w.grossEarnings)}*

*C. POTONGAN:*
• Potongan Kasbon: -${formatRupiah(w.kasbon)}
• Potongan Denda Alfa: -${formatRupiah(w.alfaPenalty)}
━━━━━━━━━━━━━━━━━━━━━━
💰 *GAJI BERSIH DITERIMA (THP): ${formatRupiah(w.takeHomePay)}*

Terima kasih atas kerja keras & kejujurannya di Warkop Sumber Redjeki! 🙏`;
  };

  const triggerSyncMonthlyToGoogleSheets = async (customDayCount = null, isAutoTrigger = false) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const daysCompleted = customDayCount ?? googleSheetsConfig.currentMonthDaysCount;

    const rukoFundObj =
      sinkingFunds.find((s) => s.name.toLowerCase().includes('ruko')) || sinkingFunds[0];
    const rukoMonthlyAmount = rukoFundObj
      ? Number(rukoFundObj.daily || 0) * Number(rukoFundObj.targetDays || 30)
      : 1500000;

    const monthlyPayload = {
      id: `arc-${Date.now()}`,
      monthLabel: `${googleSheetsConfig.monthLabel} (${daysCompleted} Hari Full)`,
      closedDate: shiftInfo.date,
      timestamp: `${shiftInfo.date}, ${timeStr} WIB`,
      totalOmzet: ownerAnalytics.monthlyGrossOmzet,
      totalHpp: ownerAnalytics.monthlyTotalHpp,
      grossProfit: ownerAnalytics.monthlyGrossProfit,
      totalPettyCash: ownerAnalytics.monthlyPettyCashTotal,
      totalPayroll: ownerAnalytics.totalPayrollExpense,
      rukoAllocation: rukoMonthlyAmount,
      totalRukoAndSinkingFund: ownerAnalytics.monthlySinkingFundAllocationsTotal,
      totalAllExpenses: ownerAnalytics.monthlyTotalHpp + ownerAnalytics.totalMonthlyOpex,
      netProfit: ownerAnalytics.monthlyNetProfit,
      workersSummary: ownerAnalytics.workerReports.map((w) => ({
        name: w.name,
        shifts: w.totalShiftsMonth,
        takeHomePay: w.takeHomePay,
      })),
      sinkingFundsSummary: sinkingFunds.map((sf) => ({
        name: sf.name,
        daily: sf.daily,
        monthlyTotal: Number(sf.daily || 0) * Number(sf.collectedDays || 30),
      })),
      status: googleSheetsConfig.webhookUrl
        ? 'TERKIRIM OTOMATIS KE WEBHOOK GOOGLE SHEETS'
        : 'TERCATAT DI ARSIP BULANAN & SIAP EKSPOR SHEETS',
    };

    if (googleSheetsConfig.webhookUrl && googleSheetsConfig.webhookUrl.startsWith('http')) {
      try {
        await fetch(googleSheetsConfig.webhookUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(monthlyPayload),
        });
      } catch (err) {
        console.error('Webhook Google Sheets error:', err);
      }
    }

    setGoogleSheetsConfig((prev) => ({
      ...prev,
      currentMonthDaysCount: daysCompleted,
      lastSyncTime: `${shiftInfo.date}, ${timeStr} WIB`,
      lastSyncStatus: isAutoTrigger
        ? `✅ OTOMATIS TUTUP BUKU 1 BULAN FULL (${daysCompleted} Hari) & TERKIRIM KE GOOGLE SHEETS`
        : `✅ Terkirim Manual ke Google Sheets (${shiftInfo.date}, ${timeStr} WIB)`,
      monthlyArchives: [monthlyPayload, ...(prev.monthlyArchives || [])],
    }));

    showToast(
      isAutoTrigger
        ? `🎉 GENAP 1 BULAN FULL (${daysCompleted} Hari)! Pembukuan Omzet, Gaji, Ruko & Profit Bersih otomatis direkap ke Google Sheets!`
        : `📊 Pembukuan 1 Bulan Full (${googleSheetsConfig.monthLabel}) berhasil disinkronkan ke Google Sheets!`
    );
  };

  const generateGoogleSheetsTSV = () => {
    const headers = [
      'Kategori Pembukuan Bulanan',
      'Keterangan Detail',
      'Periode',
      'Nominal Pemasukan (Rp)',
      'Nominal Pengeluaran (Rp)',
      'Saldo / Profit Bersih (Rp)',
    ].join('\t');

    const rows = [
      [
        '1. PEMASUKAN / OMZET KOTOR',
        'Total Penjualan Tunai + QRIS + Bagi Hasil Titipan (1 Bulan Full)',
        googleSheetsConfig.monthLabel,
        ownerAnalytics.monthlyGrossOmzet,
        0,
        ownerAnalytics.monthlyGrossOmzet,
      ].join('\t'),
      [
        '2. PENGELUARAN HPP BAHAN BAKU',
        'Modal Indomie, Kopi, Telur, Beras, Kornet, Rokok & Setoran Suplier',
        googleSheetsConfig.monthLabel,
        0,
        ownerAnalytics.monthlyTotalHpp,
        ownerAnalytics.monthlyGrossProfit,
      ].join('\t'),
      [
        '3. PENGELUARAN KASIR HARIAN (PETTY CASH)',
        'Akumulasi Belanja Es Batu, Air Galon, Gas LPG 3Kg & Operasional Kasir',
        googleSheetsConfig.monthLabel,
        0,
        ownerAnalytics.monthlyPettyCashTotal,
        ownerAnalytics.monthlyGrossProfit - ownerAnalytics.monthlyPettyCashTotal,
      ].join('\t'),
      ...ownerAnalytics.workerReports.map((w) =>
        [
          `4. PENGELUARAN GAJI PEKERJA (${w.name.toUpperCase()})`,
          `Gaji Pokok + ${w.totalShiftsMonth} Shift Hadir + Tunjangan Makan`,
          googleSheetsConfig.monthLabel,
          0,
          w.grossEarnings,
          '',
        ].join('\t')
      ),
      ...sinkingFunds.map((sf) =>
        [
          `5. BEBAN TETAP & RUKO (${sf.name.toUpperCase()})`,
          `Setoran ${formatRupiah(sf.daily)}/hari x ${sf.collectedDays} hari`,
          googleSheetsConfig.monthLabel,
          0,
          Number(sf.daily || 0) * Number(sf.collectedDays || 30),
          '',
        ].join('\t')
      ),
      [
        '6. TOTAL SELURUH PENGELUARAN 1 BULAN',
        'HPP Bahan Baku + Kasir Harian + Gaji Pekerja + Sewa Ruko & Listrik',
        googleSheetsConfig.monthLabel,
        0,
        ownerAnalytics.monthlyTotalHpp + ownerAnalytics.totalMonthlyOpex,
        '',
      ].join('\t'),
      [
        '7. PROFIT BERSIH OWNER (NET PROFIT 1 BULAN FULL)',
        `Net Profit Margin: ${ownerAnalytics.netMarginPercent}% dari Total Omzet`,
        googleSheetsConfig.monthLabel,
        ownerAnalytics.monthlyGrossOmzet,
        ownerAnalytics.monthlyTotalHpp + ownerAnalytics.totalMonthlyOpex,
        ownerAnalytics.monthlyNetProfit,
      ].join('\t'),
    ];

    return [headers, ...rows].join('\n');
  };

  const handleDownloadMonthlyCSV = () => {
    const tsv = generateGoogleSheetsTSV();
    const csvContent = tsv
      .split('\n')
      .map((line) =>
        line
          .split('\t')
          .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
          .join(',')
      )
      .join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute(
      'download',
      `Pembukuan_1_Bulan_Warkop_Sumber_Redjeki_${googleSheetsConfig.monthLabel.replace(/\s+/g, '_')}.csv`
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast('📥 File CSV Pembukuan 1 Bulan berhasil diunduh (Siap dibuka di Google Sheets)!');
  };

  const handleSaveShiftReport = () => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
    const estimatedQrisShift = financialSummary.impliedQrisFromCashGap;

    const expectedDrawerWithEstQris =
      Number(initialDrawerModal || 0) +
      (financialSummary.totalOmzetStok - estimatedQrisShift) -
      financialSummary.totalPettyCash;

    const shiftDiscrepancy = Number(actualDrawerCash || 0) - expectedDrawerWithEstQris;

    const newRecord = {
      id: `hist-${Date.now()}`,
      date: shiftInfo.date,
      shift: shiftInfo.shift,
      workerCurrent: shiftInfo.workerCurrent,
      workerNext: shiftInfo.workerNext,
      totalOmzet: financialSummary.totalOmzetStok,
      totalHpp: financialSummary.totalHppDanSetoranSuplier,
      grossProfit: financialSummary.totalGrossProfit,
      qrisAmount: estimatedQrisShift,
      expensesTotal: financialSummary.totalPettyCash,
      expectedDrawerCash: expectedDrawerWithEstQris,
      actualDrawerCash: Number(actualDrawerCash),
      discrepancy: shiftDiscrepancy,
      dropBoxEnvelope: financialSummary.dropBoxEnvelopeAmount,
      netProfitShift: financialSummary.estimatedNetProfit,
      cupsUsed: financialSummary.totalCupsSold,
      drinksRecorded: financialSummary.totalCupsSold,
      staffMealsCount: financialSummary.totalStaffMealsQty,
      tamperedItemsCount: tamperedItemsList.length,
      verifiedByOwner: false,
      penaltyApplied: shiftDiscrepancy < 0,
      timestamp: `${shiftInfo.date}, ${timeStr} WIB`,
    };
    setShiftHistory((prev) => [newRecord, ...prev]);

    const matchingWorkerObj = workers.find(
      (w) => w.name.toLowerCase() === shiftInfo.workerCurrent.toLowerCase()
    );

    const autoAtt = {
      id: `att-auto-${Date.now()}`,
      date: shiftInfo.date,
      workerId: matchingWorkerObj ? matchingWorkerObj.id : '',
      workerName: shiftInfo.workerCurrent,
      shift: shiftInfo.shift,
      status: 'HADIR_NORMAL',
      shiftCredit: 1,
      note: `Otomatis dari Setoran Shift (${timeStr} WIB)`,
      source: 'AUTO',
    };
    setAttendanceLogs((prev) => [autoAtt, ...prev]);
    setCurrentShiftSaved(true);

    showToast('✅ Laporan Shift & Absensi Gaji otomatis tercatat ke Owner!');
  };

  const handleRolloverToNextShift = (forceAdvanceDate = false) => {
    const oldDate = shiftInfo.date;
    const isNightShiftClosing = shiftInfo.shift === 'Shift Malam (18:00 - 03:00)';
    const shouldAdvanceDate =
      forceAdvanceDate ||
      autoDateMode === 'ON_PROOF_SENT' ||
      (autoDateMode === 'AFTER_NIGHT_SHIFT' && isNightShiftClosing);

    const nextDate = shouldAdvanceDate ? getNextDateStr(oldDate, 1) : oldDate;

    setInventory((prev) =>
      prev.map((item) => ({
        ...item,
        lockedInitialStock: Number(item.finalStock || 0),
        initialStock: Number(item.finalStock || 0),
        stockIn: 0,
        wasteOrStaff: 0,
        lastTamperReason: '',
        lastTamperBy: '',
      }))
    );

    setShiftInfo((prev) => ({
      ...prev,
      date: nextDate,
      workerCurrent: prev.workerNext,
      workerNext: prev.workerCurrent,
      shift:
        prev.shift === 'Shift Siang (07:00 - 16:00)'
          ? 'Shift Malam (18:00 - 03:00)'
          : 'Shift Siang (07:00 - 16:00)',
    }));

    setNewAttendanceForm((prev) => ({
      ...prev,
      date: nextDate,
    }));
    setSelectedReconDate(oldDate);
    setDailyQrisByDate((prev) => ({
      ...prev,
      [nextDate]: prev[nextDate] ?? 0,
    }));

    if (shouldAdvanceDate) {
      const nextMonthDayCount = Number(googleSheetsConfig.currentMonthDaysCount || 29) + 1;
      setSinkingFunds((prev) =>
        prev.map((sf) => ({
          ...sf,
          collectedDays: Number(sf.collectedDays || 0) + 1,
        }))
      );

      if (
        googleSheetsConfig.autoSyncOnFullMonth &&
        nextMonthDayCount >= Number(googleSheetsConfig.targetMonthDays || 30)
      ) {
        triggerSyncMonthlyToGoogleSheets(nextMonthDayCount, true);
      } else {
        setGoogleSheetsConfig((prev) => ({
          ...prev,
          currentMonthDaysCount: nextMonthDayCount,
        }));
      }
    }

    setExpenses([]);
    setQrisSales(0);
    setWorkerQrisLogs([]);
    setActualDrawerCash(initialDrawerModal);
    setCurrentShiftSaved(false);

    if (shouldAdvanceDate) {
      showToast(
        `📅 Tanggal otomatis berganti dari ${oldDate} ➔ ${nextDate}! Stok Awal, Absensi Gaji & Sinking Fund sudah disinkronkan.`
      );
    } else {
      showToast('🔒 Stok Akhir resmi DIKUNCI menjadi Stok Awal Shift berikutnya!');
    }
  };

  // ==========================================================================
  // PEMBUATAN FILE PDF & WORD (.DOC) LAPORAN TUTUP SHIFT RESMI
  // ==========================================================================
  const createShiftClosingPdfData = (customRecord = null) => {
    const recDate = customRecord ? customRecord.date : shiftInfo.date;
    const recShift = customRecord ? customRecord.shift : shiftInfo.shift;
    const recWorkerCurr = customRecord ? customRecord.workerCurrent : shiftInfo.workerCurrent;
    const recWorkerNext = customRecord ? customRecord.workerNext : shiftInfo.workerNext;
    const recOmzet = customRecord ? customRecord.totalOmzet : financialSummary.totalOmzetStok;
    const recPetty = customRecord ? customRecord.expensesTotal : financialSummary.totalPettyCash;
    const recActualCash = customRecord ? customRecord.actualDrawerCash : Number(actualDrawerCash || 0);
    const recDropBox = customRecord
      ? customRecord.dropBoxEnvelope
      : financialSummary.dropBoxEnvelopeAmount;
    const recQrisGap = customRecord
      ? customRecord.qrisAmount
      : financialSummary.impliedQrisFromCashGap;

    const tamperSummary =
      tamperedItemsList.length === 0
        ? '100% AMAN (Stok Awal Cocok Kunci Shift Sebelumnya)'
        : `PERINGATAN: ${tamperedItemsList.length} Barang Diubah Stok Awalnya`;

    const stockHeader =
      padText('NAMA BARANG', 28) +
      padText('AWAL', 7, 'right') +
      padText('MASUK', 7, 'right') +
      padText('AKHIR', 7, 'right') +
      padText('JATAH', 7, 'right') +
      padText('LAKU', 7, 'right') +
      padText('OMZET (RP)', 15, 'right');

    const stockRows = calculatedInventory.map((i) =>
      padText(i.name, 28) +
      padText(`${i.initialStock}`, 7, 'right') +
      padText(`${i.stockIn}`, 7, 'right') +
      padText(`${i.finalStock}`, 7, 'right') +
      padText(`${i.wasteOrStaff}`, 7, 'right') +
      padText(`${i.validSoldQty}`, 7, 'right') +
      padText(formatRupiah(i.grossRevenue), 15, 'right')
    );

    const kasirRows = [
      padText('1. Modal Kembalian Tetap di Laci Kasir', 46) +
        padText(formatRupiah(initialDrawerModal), 30, 'right'),
      padText('2. Total Omzet dari Barang Terjual', 46) +
        padText(formatRupiah(recOmzet), 30, 'right'),
      padText('3. Total Belanja Kasir Harian (Nota Petty Cash)', 46) +
        padText(formatRupiah(recPetty), 30, 'right'),
      padText('4. Uang Tunai Fisik Aktual di Laci Kasir', 46) +
        padText(formatRupiah(recActualCash), 30, 'right'),
      padText('5. SETORAN TUNAI WAJIB MASUK AMPLOP BRANKAS', 46) +
        padText(formatRupiah(recDropBox), 30, 'right'),
      padText('6. Sisa Tagihan Non-Tunai (Dicek di Mutasi QRIS Owner)', 46) +
        padText(formatRupiah(recQrisGap), 30, 'right'),
    ];

    const expenseRows =
      expenses.length > 0
        ? expenses.map(
            (e, idx) =>
              padText(`${idx + 1}. ${e.description} (${e.hasReceipt ? 'Ada Nota' : 'Tanpa Nota'})`, 50) +
              padText(formatRupiah(e.amount), 26, 'right')
          )
        : ['Tidak ada pengeluaran kasir harian pada shift ini.'];

    const blob = buildOfficialPdfBlob({
      title: 'DOKUMEN LAPORAN TUTUP SHIFT & SERAH TERIMA STOK TERKUNCI',
      subtitle: 'Format Dokumen Word ke PDF Resmi - Warkop Sumber Redjeki (Ruko Raoseun Cibiru)',
      metaLines: [
        `Tanggal Operasional : ${recDate}   |   Jadwal : ${recShift}`,
        `Penjaga Serah       : ${recWorkerCurr}   --->   Penjaga Terima : ${recWorkerNext}`,
        `Status Kunci Stok   : ${tamperSummary}`,
      ],
      sections: [
        {
          heading: 'A. REKONSILIASI KEUANGAN LACI KASIR & AMPLOP BRANKAS',
          hasHeaderRow: false,
          rows: kasirRows,
        },
        {
          heading: 'B. RINCIAN BELANJA HARIAN KASIR (PETTY CASH)',
          hasHeaderRow: false,
          rows: expenseRows,
        },
        {
          heading: 'C. TABEL STOK OPNAME ETALASE (STOK AKHIR DIKUNCI UNTUK SHIFT BERIKUTNYA)',
          hasHeaderRow: true,
          rows: [stockHeader, ...stockRows],
        },
      ],
      footerSignatures: [
        { role: 'Diserahkan Oleh (Shift Tutup)', name: recWorkerCurr },
        { role: 'Diterima Oleh (Shift Lanjut)', name: recWorkerNext },
        { role: 'Diverifikasi Owner / Admin', name: 'Owner Warkop Sumber Redjeki' },
      ],
    });

    const safeDate = String(recDate).replace(/[^0-9-]/g, '');
    const safeWorker = String(recWorkerCurr).replace(/\s+/g, '_');
    const fileName = `Laporan_Shift_Warkop_Sumber_Redjeki_${safeDate}_${safeWorker}.pdf`;

    return { blob, fileName, recDate, recWorkerCurr };
  };

  const handleDownloadShiftPdfAndAdvance = (shouldAdvance = true, customRecord = null) => {
    const { blob, fileName, recDate, recWorkerCurr } = createShiftClosingPdfData(customRecord);

    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);

    setLastGeneratedDocInfo({
      fileName,
      date: recDate,
      worker: recWorkerCurr,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    });

    if (shouldAdvance && !customRecord) {
      const nextDate = getNextDateStr(shiftInfo.date, 1);
      if (!currentShiftSaved) {
        handleSaveShiftReport();
      }
      handleRolloverToNextShift(true);
      showToast(
        `📥 File PDF (${fileName}) berhasil diunduh & Tanggal otomatis maju ke ${nextDate}!`
      );
    } else {
      showToast(`📥 File PDF (${fileName}) berhasil diunduh ke perangkat Anda!`);
    }
  };

  const handleShareShiftPdfToWA = async () => {
    const { blob, fileName, recDate, recWorkerCurr } = createShiftClosingPdfData(null);
    const nextDate = getNextDateStr(shiftInfo.date, 1);

    const pdfFile = new File([blob], fileName, { type: 'application/pdf' });

    setLastGeneratedDocInfo({
      fileName,
      date: recDate,
      worker: recWorkerCurr,
      time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
    });

    if (navigator.canShare && navigator.canShare({ files: [pdfFile] })) {
      try {
        await navigator.share({
          files: [pdfFile],
          title: `Laporan Shift Warkop Sumber Redjeki - ${recDate}`,
          text: `Berikut file PDF Laporan Tutup Shift Warkop Sumber Redjeki (${recDate} - ${recWorkerCurr}).`,
        });
        if (!currentShiftSaved) {
          handleSaveShiftReport();
        }
        handleRolloverToNextShift(true);
        showToast(
          `📲 File PDF dibagikan ke WA & Tanggal otomatis berganti ke ${nextDate}!`
        );
        return;
      } catch (err) {
        if (err && err.name === 'AbortError') return;
      }
    }

    // Fallback: Unduh PDF otomatis lalu buka grup/chat WhatsApp agar tinggal lampirkan file PDF
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);

    if (!currentShiftSaved) {
      handleSaveShiftReport();
    }
    handleRolloverToNextShift(true);

    const waBrief = encodeURIComponent(
      `📄 *DOKUMEN PDF LAPORAN TUTUP SHIFT — WARKOP SUMBER REDJEKI*\n📅 Tanggal: ${recDate}\n👤 Penjaga: ${recWorkerCurr}\n📎 File PDF *${fileName}* telah diunduh otomatis ke HP dan dilampirkan di bawah ini.`
    );
    window.open(`https://wa.me/?text=${waBrief}`, '_blank', 'noopener,noreferrer');
    showToast(
      `📥 PDF (${fileName}) terunduh & membuka WhatsApp! Lampirkan file PDF tersebut di Grup WA.`
    );
  };

  const handleDownloadWordDoc = () => {
    const htmlWord = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'>
      <head><meta charset='utf-8'><title>Laporan Shift Warkop Sumber Redjeki</title>
      <style>
        body { font-family: Arial, sans-serif; font-size: 11pt; color: #1e293b; }
        .kop { border: 3px solid #C81D11; padding: 12px; text-align: center; background: #12264B; color: #ffffff; margin-bottom: 14px; }
        .kop h1 { margin: 0; font-size: 16pt; letter-spacing: 1px; }
        .kop p { margin: 4px 0 0; font-size: 9.5pt; color: #fde68a; }
        table { width: 100%; border-collapse: collapse; margin-bottom: 14px; }
        th, td { border: 1px solid #94a3b8; padding: 6px 8px; font-size: 9.5pt; }
        th { background-color: #12264B; color: #ffffff; text-align: left; }
        .right { text-align: right; }
        .center { text-align: center; }
        .section-title { background: #f1f5f9; font-weight: bold; padding: 6px 10px; border-left: 5px solid #C81D11; margin: 12px 0 6px; }
      </style>
      </head>
      <body>
        <div class="kop">
          <h1>WARKOP SUMBER REDJEKI (生计来源)</h1>
          <p>RUKO RAOSEUN - CIBIRU - BANDUNG | DOKUMEN RESMI LAPORAN TUTUP SHIFT</p>
        </div>
        <p><strong>Tanggal:</strong> ${shiftInfo.date} &nbsp;|&nbsp; <strong>Shift:</strong> ${shiftInfo.shift} &nbsp;|&nbsp; <strong>Penjaga:</strong> ${shiftInfo.workerCurrent} &rarr; ${shiftInfo.workerNext}</p>
        <div class="section-title">A. REKONSILIASI KEUANGAN KASIR & AMPLOP BRANKAS</div>
        <table>
          <tr><th>Komponen Keuangan</th><th class="right">Nominal (Rp)</th></tr>
          <tr><td>1. Modal Kembalian Tetap di Laci</td><td class="right">${formatRupiah(initialDrawerModal)}</td></tr>
          <tr><td>2. Total Omzet Barang Terjual</td><td class="right"><strong>${formatRupiah(financialSummary.totalOmzetStok)}</strong></td></tr>
          <tr><td>3. Total Belanja Kasir Harian (Nota)</td><td class="right">${formatRupiah(financialSummary.totalPettyCash)}</td></tr>
          <tr><td>4. Uang Tunai Fisik Aktual di Laci</td><td class="right">${formatRupiah(actualDrawerCash)}</td></tr>
          <tr><td><strong>5. UANG TUNAI WAJIB MASUK AMPLOP BRANKAS</strong></td><td class="right"><strong>${formatRupiah(financialSummary.dropBoxEnvelopeAmount)}</strong></td></tr>
          <tr><td>6. Sisa Tagihan Non-Tunai (Wajib Cocok di QRIS Owner)</td><td class="right">${formatRupiah(financialSummary.impliedQrisFromCashGap)}</td></tr>
        </table>
        <div class="section-title">B. TABEL STOK OPNAME ETALASE (STOK AKHIR DIKUNCI UNTUK BESOK)</div>
        <table>
          <tr>
            <th>Nama Barang</th>
            <th class="center">Stok Awal (Kunci)</th>
            <th class="center">Masuk</th>
            <th class="center">Stok Akhir</th>
            <th class="center">Jatah/Rusak</th>
            <th class="center">Terjual</th>
            <th class="right">Omzet</th>
          </tr>
          ${calculatedInventory
            .map(
              (item) => `
            <tr>
              <td>${item.name}</td>
              <td class="center">${item.initialStock} ${item.unit}</td>
              <td class="center">${item.stockIn}</td>
              <td class="center"><strong>${item.finalStock} ${item.unit}</strong></td>
              <td class="center">${item.wasteOrStaff}</td>
              <td class="center"><strong>${item.validSoldQty}</strong></td>
              <td class="right">${formatRupiah(item.grossRevenue)}</td>
            </tr>`
            )
            .join('')}
        </table>
      </body></html>
    `;

    const blob = new Blob(['\ufeff', htmlWord], {
      type: 'application/msword;charset=utf-8',
    });
    const fileName = `Laporan_Word_Warkop_Sumber_Redjeki_${shiftInfo.date}_${shiftInfo.workerCurrent.replace(/\s+/g, '_')}.doc`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    showToast(`📄 Dokumen Word (${fileName}) berhasil diunduh!`);
  };

  const handleDownloadWorkerPayslipPdf = (w) => {
    const blob = buildOfficialPdfBlob({
      title: 'SLIP GAJI RESMI & REKAP ABSENSI KEHADIRAN PEKERJA',
      subtitle: `Periode: ${googleSheetsConfig.monthLabel} | Warkop Sumber Redjeki - Ruko Raoseun Cibiru`,
      metaLines: [
        `Nama Pekerja : ${w.name}   |   Shift Utama : ${w.shiftDefault}`,
        `Total Hadir  : ${w.totalShiftsMonth} Shift (Normal: ${w.hadirNormalDays} | Tuur/Lembur: ${w.lemburTuurDays} | Izin: ${w.izinSakitDays} | Alfa: ${w.alfaDays})`,
      ],
      sections: [
        {
          heading: 'RINCIAN PENDAPATAN & POTONGAN GAJI PEKERJA',
          hasHeaderRow: false,
          rows: [
            padText('1. Gaji Pokok Bulanan Tetap', 48) +
              padText(formatRupiah(w.baseSalary), 28, 'right'),
            padText(`2. Upah Kehadiran (${w.totalShiftsMonth} Shift x ${formatRupiah(w.perShiftRate)})`, 48) +
              padText(`+${formatRupiah(w.shiftWagesEarned)}`, 28, 'right'),
            padText(`3. Uang Makan (${w.totalShiftsMonth} Shift x ${formatRupiah(w.mealAllowancePerShift)})`, 48) +
              padText(`+${formatRupiah(w.mealAllowanceEarned)}`, 28, 'right'),
            padText('4. Total Pendapatan Kotor', 48) +
              padText(formatRupiah(w.grossEarnings), 28, 'right'),
            padText('5. Potongan Kasbon Aktif', 48) +
              padText(`-${formatRupiah(w.kasbon)}`, 28, 'right'),
            padText('6. Potongan Denda Alfa', 48) +
              padText(`-${formatRupiah(w.alfaPenalty)}`, 28, 'right'),
            padText('TOTAL GAJI BERSIH DITERIMA (TAKE HOME PAY)', 48) +
              padText(formatRupiah(w.takeHomePay), 28, 'right'),
          ],
        },
      ],
      footerSignatures: [
        { role: 'Penerima Gaji (Pekerja)', name: w.name },
        { role: 'Disetujui & Dibayarkan Oleh', name: 'Owner Warkop Sumber Redjeki' },
      ],
    });

    const fileName = `Slip_Gaji_PDF_${w.name.replace(/\s+/g, '_')}_${googleSheetsConfig.monthLabel.replace(/\s+/g, '_')}.pdf`;
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => URL.revokeObjectURL(url), 5000);
    showToast(`📥 Slip Gaji PDF (${w.name}) berhasil diunduh!`);
  };

  const handleVerifyEnvelope = (histId) => {
    setShiftHistory((prev) =>
      prev.map((s) => (s.id === histId ? { ...s, verifiedByOwner: true } : s))
    );
    showToast('Amplop Brankas berhasil diverifikasi & diterima Owner!');
  };

  const handleUnlockOwner = (e) => {
    e.preventDefault();
    if (pinInput === ownerPin) {
      setOwnerUnlocked(true);
      setPinError('');
      setPinInput('');
    } else {
      setPinError('Sandi / PIN Owner salah! Silakan coba lagi.');
    }
  };

  const handleChangeOwnerPin = (e) => {
    e.preventDefault();
    setChangePinError('');

    if (useRecoveryMode) {
      if (
        recoveryInput.trim().toUpperCase() !==
        String(ownerRecoveryWord || 'RAOSEUN').trim().toUpperCase()
      ) {
        setChangePinError('Kata Kunci Pemulihan Owner salah! Pekerja dilarang mengubah sandi.');
        return;
      }
    } else if (oldPinInput !== ownerPin) {
      setChangePinError('Sandi / PIN Owner lama salah! Hanya Owner yang bisa mengubah sandi.');
      return;
    }

    if (!newPinInput || newPinInput.trim().length < 4) {
      setChangePinError('Sandi / PIN baru minimal harus 4 karakter (bisa angka atau huruf)!');
      return;
    }
    if (newPinInput !== confirmPinInput) {
      setChangePinError('Konfirmasi Sandi / PIN baru tidak cocok!');
      return;
    }

    setOwnerPin(newPinInput.trim());
    setAllowQuickDemoUnlock(false);
    setOldPinInput('');
    setNewPinInput('');
    setConfirmPinInput('');
    setRecoveryInput('');
    setUseRecoveryMode(false);
    setShowChangePinModal(false);
    showToast('🔒 Sandi Khusus Owner berhasil diperbarui! Pekerja tidak dapat mengakses portal ini.');
  };

  const handleAddNewItem = (e) => {
    e.preventDefault();
    if (!newItem.name.trim()) return;
    const initVal = Number(newItem.initialStock) || 0;
    const created = {
      id: `item-${Date.now()}`,
      name: newItem.name.trim(),
      category: newItem.category,
      unit: newItem.unit || 'pcs',
      priceSell: Number(newItem.priceSell) || 0,
      priceCost: Number(newItem.priceCost) || 0,
      supplierShare: Number(newItem.supplierShare) || 0,
      warehouseStock: Number(newItem.warehouseStock) || 0,
      RestockUnit: newItem.RestockUnit || '1 Paket',
      restockQty: Number(newItem.restockQty) || 10,
      lockedInitialStock: initVal,
      initialStock: initVal,
      stockIn: 0,
      finalStock: initVal,
      wasteOrStaff: 0,
      minStock: Number(newItem.minStock) || 5,
      lastTamperReason: '',
      lastTamperBy: '',
    };
    setInventory((prev) => [...prev, created]);
    setShowAddItemModal(false);
    showToast(`Barang "${created.name}" berhasil ditambahkan!`);
  };

  const categories = [
    'Semua',
    'Satuan / Saset',
    'Bahan Takaran Porsi',
    'Kunci Bahan Curah',
    'Titipan (Konsinyasi)',
  ];

  const filteredInventory = useMemo(() => {
    if (selectedCategory === 'Semua') return calculatedInventory;
    return calculatedInventory.filter((item) => item.category === selectedCategory);
  }, [calculatedInventory, selectedCategory]);

  return (
    <div className="min-h-screen bg-stone-100 text-stone-800 flex flex-col font-sans pb-24 md:pb-8 overflow-x-hidden">
      {toastMessage && (
        <div className="fixed top-4 left-4 right-4 sm:left-auto sm:right-5 sm:max-w-md z-50 bg-[#12264B] text-white px-4 py-3 rounded-2xl shadow-2xl border-2 border-[#C81D11] flex items-center gap-2.5 text-xs sm:text-sm font-semibold">
          <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* MODAL PANDUAN & PENGATURAN PAKAI ONLINE DI DESKTOP & HP */}
      {showOnlineGuideModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-5 sm:p-6 shadow-2xl border-2 border-[#12264B] space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-900 text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                  <Globe className="w-3.5 h-3.5 text-emerald-600" /> Sistem Online Cloud Real-Time Aktif
                </span>
                <h3 className="font-black text-[#12264B] text-base sm:text-lg mt-1">
                  Cara Menggunakan Aplikasi Warkop Sumber Redjeki Secara Online (Desktop & HP)
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowOnlineGuideModal(false)}
                className="text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                Tutup [X]
              </button>
            </div>

            {/* Status Cloud & Kode Sinkronisasi Toko */}
            <div className="bg-[#12264B] text-white p-4 rounded-2xl border-l-8 border-emerald-400 space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-black text-emerald-300 uppercase">
                    Status Cloud Lintas HP:{' '}
                    {cloudStatus === 'online'
                      ? 'TERHUBUNG KE SEMUA HP & LAPTOP (REAL-TIME)'
                      : cloudStatus === 'syncing'
                      ? 'SEDANG MENYINKRONKAN ANTAR-HP...'
                      : 'MODE LOKAL (CEK KONEKSI INTERNET)'}
                  </span>
                </div>
                <span className="text-[11px] text-amber-300 font-bold">
                  Sinkron Terakhir: {lastCloudSync}
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-black/25 p-3 rounded-xl border border-white/15 text-xs">
                <div>
                  <label className="block text-[10px] font-bold text-amber-300 uppercase mb-1">
                    Kode Sinkronisasi Toko (Wajib Sama di Semua HP & Laptop):
                  </label>
                  <input
                    type="text"
                    value={storeSyncCode}
                    onChange={(e) =>
                      setStoreSyncCode(e.target.value.toUpperCase().replace(/\s+/g, '-'))
                    }
                    className="w-full px-2.5 py-1.5 rounded-lg bg-white text-[#12264B] font-black text-xs"
                  />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-stone-300 uppercase mb-1">
                    Aksi Paksa Sinkronisasi Antar-HP Sekarang:
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => pushStateToCloud(true)}
                      className="flex-1 py-1.5 px-2.5 bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black rounded-lg text-[11px]"
                    >
                      ☁️ Kirim ke Semua HP
                    </button>
                    <button
                      type="button"
                      onClick={() => pullLatestFromCloud(true)}
                      className="flex-1 py-1.5 px-2.5 bg-amber-400 hover:bg-amber-300 text-[#12264B] font-black rounded-lg text-[11px]"
                    >
                      🔄 Tarik dari HP Lain
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 3 Langkah Mudah Pakai di Desktop & HP */}
            <div className="space-y-3 text-xs text-stone-700">
              {/* CARA PALING GAMPANG (5 DETIK LANGSUNG ONLINE) */}
              <div className="p-4 rounded-xl bg-emerald-50 border-2 border-emerald-500 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="bg-emerald-600 text-white text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                    ⭐ CARA 1: PALING GAMPANG (5 DETIK LANGSUNG ONLINE TANPA DAFTAR)
                  </span>
                </div>
                <div className="font-black text-[#12264B] text-sm">
                  Cukup Pakai Tombol "Bagikan / Share" di Pojok Kanan Atas Layar Ini:
                </div>
                <ol className="list-decimal list-inside space-y-1.5 text-stone-700 leading-relaxed font-medium">
                  <li>
                    Lihat ke <strong>pojok kanan atas layar Anda sekarang</strong> (di atas kotak tampilan web ini), lalu klik tombol <strong>Bagikan / Share</strong> (ikon panah atau rantai link).
                  </li>
                  <li>
                    Klik <strong>"Buat Link Publik / Salin Link"</strong>, lalu kirimkan link tersebut ke <strong>WhatsApp HP Kasir (Tatan & Rian)</strong> dan buka juga di <strong>Laptop/PC Anda</strong>.
                  </li>
                  <li>
                    <strong>Selesai!</strong> Karena kode <strong>Cloud Antar-HP (<code>{storeSyncCode}</code>)</strong> sudah aktif di dalam web ini, saat pekerja mengubah angka di HP mereka, angka di HP Anda & Laptop akan <strong>ikut berubah otomatis secara online!</strong>
                  </li>
                </ol>
                <div className="pt-1 flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => pushStateToCloud(true)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white font-black px-3.5 py-2 rounded-xl text-xs shadow flex items-center gap-1.5"
                  >
                    <Wifi className="w-3.5 h-3.5" /> 📡 Tes Kirim Sinyal Online ke Semua HP Sekarang
                  </button>
                  <button
                    type="button"
                    onClick={() => pullLatestFromCloud(true)}
                    className="bg-[#12264B] hover:bg-[#1d3b70] text-amber-300 font-black px-3.5 py-2 rounded-xl text-xs shadow flex items-center gap-1.5"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> 🔄 Cek & Tarik Data dari HP Lain
                  </button>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-50 border border-stone-200 space-y-1">
                <div className="font-black text-[#12264B] text-sm flex items-center gap-1.5">
                  <Monitor className="w-4 h-4 text-[#C81D11]" />
                  Cara Pasang Ikon Aplikasi di Layar Desktop (PC / Laptop) & Layar Utama HP
                </div>
                <p className="leading-relaxed">
                  • <strong>Di Laptop/PC:</strong> Buka link online tadi di Google Chrome ➔ klik ikon <strong>Install App (ikon monitor kecil di ujung kanan kolom alamat link)</strong> agar muncul sebagai aplikasi di Desktop.<br />
                  • <strong>Di HP Android/iPhone:</strong> Buka link online tadi di Chrome/Safari ➔ klik <strong>Titik Tiga (⋮)</strong> di pojok kanan atas ➔ pilih <strong>"Tambahkan ke Layar Utama" (Add to Home Screen)</strong>.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-amber-50/90 border-2 border-[#C81D11] space-y-3">
                <div className="font-black text-[#8C1D18] text-sm flex items-center gap-1.5">
                  <Globe className="w-4 h-4 text-[#C81D11]" />
                  CARA 2: Buat Link Nama Sendiri (warkopsumberredjeki.vercel.app) — Gratis Selamanya
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
                  <div className="font-black text-[#12264B] text-xs uppercase">
                    🚀 Langkah 1: Siapkan Proyek Online Tanpa Install Aplikasi (2 Menit)
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-700 leading-relaxed">
                    <li>
                      Buka situs <strong><a href="https://vite.new/react" target="_blank" rel="noreferrer" className="text-[#C81D11] underline">https://vite.new/react</a></strong> di browser Chrome Laptop/PC Anda (ini akan membuka editor StackBlitz gratis).
                    </li>
                    <li>
                      Di daftar file sebelah kiri, klik file <strong><code>src/App.jsx</code></strong>, hapus seluruh isinya, lalu <strong>Tempel (Paste)</strong> seluruh kode dari file <strong><code>WarkopPro.jsx</code></strong> yang ada di sebelah kanan layar ini.
                    </li>
                    <li>
                      Masih di daftar file sebelah kiri, klik file <strong><code>index.html</code></strong>, lalu tempelkan 1 baris kode warna/desain (Tailwind CSS) ini tepat di atas tulisan <code>&lt;/head&gt;</code>:
                    </li>
                  </ol>
                  <div className="flex items-center justify-between gap-2 bg-stone-900 text-emerald-300 px-3 py-2 rounded-lg font-mono text-[11px]">
                    <span className="truncate">&lt;script src="https://cdn.tailwindcss.com"&gt;&lt;/script&gt;</span>
                    <button
                      type="button"
                      onClick={() =>
                        copyToClipboard(
                          '<script src="https://cdn.tailwindcss.com"></script>',
                          () => showToast('Kode Script Tailwind berhasil disalin!')
                        )
                      }
                      className="shrink-0 bg-amber-400 text-[#12264B] px-2.5 py-1 rounded font-sans font-black text-[10px]"
                    >
                      📋 Salin Kode
                    </button>
                  </div>
                </div>

                <div className="bg-white p-3 rounded-xl border border-amber-200 space-y-2">
                  <div className="font-black text-[#12264B] text-xs uppercase">
                    🌐 Langkah 2: Publikasikan Jadi warkopsumberredjeki.vercel.app
                  </div>
                  <ol className="list-decimal list-inside space-y-1.5 text-xs text-stone-700 leading-relaxed">
                    <li>
                      Di bagian atas layar StackBlitz tadi, klik tombol <strong>"Connect Repository"</strong> (ikon GitHub) ➔ masuk dengan akun <strong>GitHub.com</strong> (gratis) ➔ beri nama <code>warkopsumberredjeki</code> lalu klik <strong>Create & Push</strong>.
                    </li>
                    <li>
                      Buka <strong><a href="https://vercel.com" target="_blank" rel="noreferrer" className="text-[#C81D11] underline">https://vercel.com</a></strong> ➔ klik <strong>Sign Up / Login with GitHub</strong>.
                    </li>
                    <li>
                      Klik tombol <strong>"Add New..." ➔ "Project"</strong>, lalu pilih <code>warkopsumberredjeki</code> yang baru Anda buat dan klik <strong>Import</strong>.
                    </li>
                    <li>
                      Pada kolom <strong>Project Name</strong>, ketik: <strong><code>warkopsumberredjeki</code></strong> lalu klik tombol <strong>Deploy</strong>.
                    </li>
                    <li>
                      Tunggu 30 detik hingga muncul balon selamat! Link resmi Anda <strong><code>https://warkopsumberredjeki.vercel.app</code></strong> langsung aktif selamanya dan siap dibuka di Laptop Anda maupun HP Kasir!
                    </li>
                  </ol>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => setShowOnlineGuideModal(false)}
                className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-[#12264B] hover:bg-[#1c3b73]"
              >
                Mengerti & Lanjutkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL UBAH SANDI / PIN KHUSUS OWNER */}
      {showChangePinModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleChangeOwnerPin}
            className="bg-white rounded-2xl max-w-md w-full p-5 sm:p-6 shadow-2xl border-2 border-[#12264B] space-y-4 max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="inline-flex items-center gap-1 bg-amber-100 text-[#12264B] text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  <Lock className="w-3 h-3 text-[#C81D11]" /> Opsi Khusus Owner / Pemilik
                </span>
                <h3 className="font-black text-[#12264B] text-base mt-1">
                  Ubah Sandi / PIN Portal Owner
                </h3>
              </div>
              <button
                type="button"
                onClick={() => {
                  setShowChangePinModal(false);
                  setChangePinError('');
                  setUseRecoveryMode(false);
                }}
                className="text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                Tutup [X]
              </button>
            </div>

            <div className="bg-stone-50 border border-stone-200 rounded-xl p-3 text-xs text-stone-600 leading-relaxed">
              Fitur ini <strong>dikunci khusus untuk Owner</strong>. Pekerja kasir tidak bisa mengubah sandi karena wajib memverifikasi <strong>Sandi Lama Owner</strong> terlebih dahulu.
            </div>

            <div className="space-y-3">
              {!useRecoveryMode ? (
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-stone-700">
                      1. Masukkan Sandi / PIN Owner Saat Ini (Sandi Lama)
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setUseRecoveryMode(true);
                        setChangePinError('');
                      }}
                      className="text-[11px] font-bold text-[#C81D11] hover:underline"
                    >
                      Lupa Sandi Lama?
                    </button>
                  </div>
                  <input
                    type={showPasswordText ? 'text' : 'password'}
                    required
                    placeholder="Ketik sandi lama Owner (awal: 1234)..."
                    value={oldPinInput}
                    onChange={(e) => setOldPinInput(e.target.value)}
                    className="w-full px-3.5 py-2.5 border-2 border-stone-300 focus:border-[#12264B] rounded-xl text-sm font-bold focus:outline-none"
                  />
                </div>
              ) : (
                <div className="bg-amber-50 p-3 rounded-xl border border-amber-300 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-black text-[#8C1D18]">
                      1. Kata Kunci Pemulihan Khusus Owner
                    </label>
                    <button
                      type="button"
                      onClick={() => {
                        setUseRecoveryMode(false);
                        setChangePinError('');
                      }}
                      className="text-[11px] font-bold text-[#12264B] underline"
                    >
                      Pakai Sandi Lama
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Masukkan Kata Kunci Rahasia Owner..."
                    value={recoveryInput}
                    onChange={(e) => setRecoveryInput(e.target.value)}
                    className="w-full px-3 py-2 bg-white border-2 border-[#C81D11] rounded-xl text-xs font-black uppercase"
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  2. Sandi / PIN Owner Baru (Minimal 4 Karakter)
                </label>
                <input
                  type={showPasswordText ? 'text' : 'password'}
                  required
                  placeholder="Ketik sandi / PIN baru khusus Owner..."
                  value={newPinInput}
                  onChange={(e) => setNewPinInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-2 border-[#12264B] rounded-xl text-sm font-black text-[#12264B] focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  3. Ulangi / Konfirmasi Sandi Owner Baru
                </label>
                <input
                  type={showPasswordText ? 'text' : 'password'}
                  required
                  placeholder="Ketik ulang sandi baru..."
                  value={confirmPinInput}
                  onChange={(e) => setConfirmPinInput(e.target.value)}
                  className="w-full px-3.5 py-2.5 border-2 border-[#12264B] rounded-xl text-sm font-black text-[#12264B] focus:outline-none"
                />
              </div>

              {ownerUnlocked && (
                <div className="pt-2 border-t border-stone-200">
                  <label className="block text-[11px] font-bold text-stone-600 mb-1">
                    Kata Kunci Pemulihan Rahasia Owner (Jika Lupa Sandi):
                  </label>
                  <input
                    type="text"
                    value={ownerRecoveryWord}
                    onChange={(e) => setOwnerRecoveryWord(e.target.value.toUpperCase())}
                    placeholder="Contoh: RAOSEUN"
                    className="w-full px-3 py-1.5 bg-stone-50 border border-stone-300 rounded-lg text-xs font-black text-[#12264B] uppercase"
                  />
                </div>
              )}

              <div className="flex items-center justify-between pt-1">
                <label className="inline-flex items-center gap-2 text-xs font-bold text-stone-600 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={showPasswordText}
                    onChange={(e) => setShowPasswordText(e.target.checked)}
                    className="rounded border-stone-300"
                  />
                  <span>Tampilkan teks sandi</span>
                </label>
              </div>
            </div>

            {changePinError && (
              <div className="bg-rose-50 border border-rose-300 text-rose-700 px-3 py-2 rounded-xl text-xs font-bold text-center">
                ⚠️ {changePinError}
              </div>
            )}

            <div className="flex justify-end gap-2 pt-2 border-t">
              <button
                type="button"
                onClick={() => {
                  setShowChangePinModal(false);
                  setChangePinError('');
                  setUseRecoveryMode(false);
                }}
                className="px-4 py-2.5 rounded-xl text-xs font-bold text-stone-600 bg-stone-100 hover:bg-stone-200"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-xl text-xs font-black text-white bg-[#C81D11] hover:bg-[#a6170d] shadow"
              >
                💾 Simpan Sandi Owner Baru
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL KOREKSI STOK AWAL YANG TERKUNCI */}
      {tamperModalItem && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <form
            onSubmit={handleConfirmTamperInitialStock}
            className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border-2 border-[#C81D11] space-y-4"
          >
            <div className="flex items-start justify-between border-b pb-3">
              <div>
                <span className="inline-flex items-center gap-1 bg-rose-100 text-[#C81D11] text-[10px] font-black px-2 py-0.5 rounded uppercase">
                  <Lock className="w-3 h-3" /> Sistem Anti-Manipulasi Stok Akhir
                </span>
                <h3 className="font-black text-[#12264B] text-base mt-1">
                  Ubah Stok Awal Terkunci: {tamperModalItem.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setTamperModalItem(null)}
                className="text-xs font-bold text-stone-400 hover:text-stone-700"
              >
                Tutup [X]
              </button>
            </div>

            <div className="bg-amber-50 border border-amber-300 rounded-xl p-3 text-xs text-amber-950 space-y-1">
              <p className="font-bold">
                🔒 Stok Akhir Shift Sebelumnya (Kunci Resmi):{' '}
                <span className="text-sm font-black text-[#12264B]">
                  {tamperModalItem.lockedInitialStock ?? tamperModalItem.initialStock}{' '}
                  {tamperModalItem.unit}
                </span>
              </p>
              <p className="text-[11px] leading-relaxed">
                Jika Anda mengurangi atau melebihkan angka ini, sistem akan langsung mengirimkan{' '}
                <strong>Peringatan Merah (Otak-Atik Stok)</strong> ke Portal Owner beserta selisih rupiahnya!
              </p>
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Stok Fisik Aktual yang Anda Hitung Sekarang ({tamperModalItem.unit})
              </label>
              <input
                type="number"
                required
                value={displayNum(tamperNewValue)}
                onFocus={selectAllOnFocus}
                onChange={(e) => setTamperNewValue(cleanNumInput(e.target.value))}
                className="w-full px-3 py-2.5 border-2 border-[#12264B] rounded-xl text-base font-black text-center"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-stone-700 mb-1">
                Alasan Mengubah Stok Awal (Wajib Diisi Jujur)
              </label>
              <input
                type="text"
                required
                placeholder="Contoh: Shift malam lupa catat 2 bungkus / barang pecah..."
                value={tamperReasonInput}
                onChange={(e) => setTamperReasonInput(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-xl text-xs"
              />
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setTamperModalItem(null)}
                className="px-4 py-2 rounded-xl text-xs font-bold text-stone-600 bg-stone-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-black text-white bg-[#C81D11] hover:bg-[#a6170d]"
              >
                Simpan & Laporkan ke Owner
              </button>
            </div>
          </form>
        </div>
      )}

      {/* MODAL TAMBAH BARANG BARU */}
      {showAddItemModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <form
            onSubmit={handleAddNewItem}
            className="bg-white rounded-2xl max-w-md w-full p-5 shadow-2xl border-2 border-[#12264B] space-y-3"
          >
            <div className="flex items-center justify-between border-b pb-2">
              <h3 className="font-black text-[#12264B] text-sm">Tambah Barang / Bahan Baku Baru</h3>
              <button
                type="button"
                onClick={() => setShowAddItemModal(false)}
                className="text-xs font-bold text-stone-400"
              >
                [X]
              </button>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Nama Barang / Bahan</label>
              <input
                type="text"
                required
                placeholder="Contoh: Beras Putih / Kornet Sapi / Teh Tarik"
                value={newItem.name}
                onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                className="w-full px-3 py-2 border rounded-xl text-xs"
              />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold mb-1">Kategori</label>
                <select
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="w-full px-2.5 py-2 border rounded-xl text-xs font-bold"
                >
                  <option value="Satuan / Saset">Satuan / Saset</option>
                  <option value="Bahan Takaran Porsi">Bahan Takaran Porsi</option>
                  <option value="Kunci Bahan Curah">Kunci Bahan Curah</option>
                  <option value="Titipan (Konsinyasi)">Titipan (Konsinyasi)</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Satuan Hitung</label>
                <input
                  type="text"
                  placeholder="bungkus / porsi / butir"
                  value={newItem.unit}
                  onChange={(e) => setNewItem({ ...newItem, unit: e.target.value })}
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <label className="block text-xs font-bold mb-1">Harga Jual (Rp)</label>
                <input
                  type="number"
                  value={displayNum(newItem.priceSell)}
                  onFocus={selectAllOnFocus}
                  onChange={(e) =>
                    setNewItem({ ...newItem, priceSell: cleanNumInput(e.target.value) })
                  }
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Modal HPP (Rp)</label>
                <input
                  type="number"
                  value={displayNum(newItem.priceCost)}
                  onFocus={selectAllOnFocus}
                  onChange={(e) =>
                    setNewItem({ ...newItem, priceCost: cleanNumInput(e.target.value) })
                  }
                  className="w-full px-3 py-2 border rounded-xl text-xs"
                />
              </div>
            </div>
            <div>
              <label className="block text-xs font-bold mb-1">Stok Awal Etalase (Dikunci)</label>
              <input
                type="number"
                value={displayNum(newItem.initialStock)}
                onFocus={selectAllOnFocus}
                onChange={(e) =>
                  setNewItem({ ...newItem, initialStock: cleanNumInput(e.target.value) })
                }
                className="w-full px-3 py-2 border rounded-xl text-xs font-bold"
              />
            </div>
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAddItemModal(false)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-stone-100"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-4 py-2 rounded-xl text-xs font-black text-white bg-[#12264B]"
              >
                Simpan Barang
              </button>
            </div>
          </form>
        </div>
      )}

      {/* TOP HEADER DENGAN LOGO WARKOP SUMBER REDJEKI (MOBILE OPTIMIZED) */}
      <header className="bg-[#12264B] text-white border-b-4 border-[#C81D11] shadow-lg sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 sm:py-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-2.5">
          <div className="flex items-center gap-3">
            {customLogoUrl ? (
              <div className="bg-white p-1 rounded-lg border-2 border-[#C81D11] shadow-md shrink-0">
                <img
                  src={customLogoUrl}
                  alt="Logo Warkop Sumber Redjeki"
                  className="h-11 sm:h-15 w-auto object-contain rounded"
                />
              </div>
            ) : (
              <div className="bg-white px-2.5 py-1 rounded-md border-2 border-[#8C1D18] shadow-md shrink-0 text-center select-none">
                <div className="border border-[#8C1D18] px-2 py-0.5">
                  <div className="text-[9px] sm:text-xs font-black tracking-widest text-[#12264B] leading-tight font-serif">
                    WARKOP
                  </div>
                  <div className="text-xs sm:text-base font-black tracking-wide text-[#C81D11] leading-tight font-serif">
                    SUMBER REDJEKI
                  </div>
                  <div className="text-[9px] sm:text-[11px] font-bold text-[#12264B] tracking-widest leading-tight">
                    生计来源
                  </div>
                  <div className="text-[6px] sm:text-[7px] font-semibold tracking-widest text-[#8C1D18] mt-0.5 uppercase">
                    RUKO RAOSEUN - CIBIRU - BANDUNG
                  </div>
                </div>
              </div>
            )}

            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <h1 className="text-sm sm:text-xl font-extrabold tracking-tight text-white truncate">
                  Warkop Sumber Redjeki <span className="text-amber-300 font-normal">(生计来源)</span>
                </h1>
              </div>
              <div className="mt-1 flex flex-wrap items-center gap-1.5">
                <label className="cursor-pointer inline-flex items-center gap-1 text-[10px] bg-white/10 hover:bg-white/20 text-amber-200 px-2 py-0.5 rounded transition border border-white/15">
                  <Upload className="w-3 h-3" />
                  <span>Ganti Logo</span>
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
                <button
                  type="button"
                  onClick={() => setShowOnlineGuideModal(true)}
                  className="inline-flex items-center gap-1.5 text-[10px] bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 font-bold px-2.5 py-0.5 rounded transition border border-emerald-400/40"
                >
                  {cloudStatus === 'online' || cloudStatus === 'syncing' ? (
                    <Wifi className="w-3 h-3 text-emerald-400" />
                  ) : (
                    <WifiOff className="w-3 h-3 text-amber-300" />
                  )}
                  <span>
                    {cloudStatus === 'syncing'
                      ? '⏳ Menyinkronkan Antar-HP...'
                      : cloudStatus === 'online'
                      ? `🟢 Cloud Antar-HP (${lastCloudSync})`
                      : '🌐 Mode Online Desktop & HP'}
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => pullLatestFromCloud(true)}
                  title="Tarik data terbaru yang diinput dari HP lain"
                  className="inline-flex items-center gap-1 text-[10px] bg-amber-400 hover:bg-amber-300 text-[#12264B] font-black px-2 py-0.5 rounded transition shadow-xs"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Samakan HP</span>
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2">
            {tamperedItemsList.length > 0 && (
              <div className="bg-rose-600 text-white px-2.5 py-1.5 rounded-xl text-[11px] font-black flex items-center gap-1 animate-pulse border border-white/40">
                <ShieldAlert className="w-3.5 h-3.5 shrink-0" />
                <span>{tamperedItemsList.length} Stok Diubah!</span>
              </div>
            )}
            <div className="bg-black/30 p-1 rounded-xl border border-white/15 flex items-center w-full sm:w-auto">
              <button
                onClick={() => setPortalMode('pekerja')}
                className={`flex-1 sm:flex-initial justify-center px-3 py-2 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 ${
                  portalMode === 'pekerja'
                    ? 'bg-amber-400 text-[#12264B] shadow'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" />
                <span>👨‍🍳 Kasir HP</span>
              </button>
              <button
                onClick={() => setPortalMode('owner')}
                className={`flex-1 sm:flex-initial justify-center px-3 py-2 rounded-lg text-xs font-extrabold transition flex items-center gap-1.5 ${
                  portalMode === 'owner'
                    ? 'bg-[#C81D11] text-white shadow'
                    : 'text-stone-300 hover:text-white'
                }`}
              >
                <Lock className="w-3.5 h-3.5" />
                <span>👑 Owner / Admin</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl w-full mx-auto px-3 sm:px-6 py-4 sm:py-6 flex-1 space-y-5">
        {portalMode === 'owner' ? (
          !ownerUnlocked ? (
            <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl border-2 border-[#12264B] overflow-hidden my-8">
              <div className="bg-[#12264B] text-white p-5 text-center border-b-4 border-[#C81D11]">
                <Lock className="w-10 h-10 text-amber-400 mx-auto mb-2" />
                <h2 className="text-lg font-black">Portal Khusus Owner / Admin</h2>
                <p className="text-xs text-stone-300 mt-1">
                  Warkop Sumber Redjeki — Ruko Raoseun Cibiru
                </p>
              </div>
              <form onSubmit={handleUnlockOwner} className="p-6 space-y-4">
                <div>
                  <label className="block text-xs font-bold text-stone-600 uppercase mb-1.5">
                    Masukkan Sandi / PIN Khusus Owner
                  </label>
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="••••••"
                    className="w-full px-4 py-3 text-center text-xl font-black tracking-widest border-2 border-stone-300 rounded-xl focus:outline-none focus:border-[#12264B]"
                  />
                  {pinError && (
                    <p className="text-xs text-rose-600 font-bold mt-1.5 text-center">{pinError}</p>
                  )}
                </div>
                <button
                  type="submit"
                  className="w-full py-3 bg-[#12264B] hover:bg-[#1a3566] text-white font-black rounded-xl text-sm transition shadow-md"
                >
                  🔓 Masuk Dashboard Owner
                </button>

                <div className="pt-3 border-t border-stone-200 flex flex-col gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setOldPinInput('');
                      setNewPinInput('');
                      setConfirmPinInput('');
                      setChangePinError('');
                      setUseRecoveryMode(false);
                      setShowChangePinModal(true);
                    }}
                    className="w-full py-2.5 bg-stone-100 hover:bg-stone-200 text-[#12264B] font-black rounded-xl text-xs border border-stone-300 transition flex items-center justify-center gap-1.5"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[#C81D11]" />
                    🔑 Ubah Sandi / PIN Khusus Owner
                  </button>
                  <p className="text-[10px] text-stone-400 text-center">
                    *Hanya Owner yang mengetahui sandi lama yang dapat mengubah sandi. Pekerja tidak memiliki akses.
                  </p>
                </div>
              </form>
            </div>
          ) : (
            <div className="space-y-6">
              {/* BANNER OWNER */}
              <div className="bg-gradient-to-r from-[#12264B] via-[#1a3363] to-[#4a1215] text-white rounded-2xl p-5 shadow-md flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-l-8 border-[#C81D11]">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400 text-[#12264B] text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                      OWNER CONTROL CENTER
                    </span>
                    <span className="text-xs text-amber-200 font-semibold">
                      • Terhubung Real-Time dengan Meja Kasir ({shiftInfo.workerCurrent})
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-black mt-1">
                    Dashboard Pemantauan Owner — Warkop Sumber Redjeki
                  </h2>
                </div>
                <div className="flex flex-wrap items-center gap-2 self-start lg:self-center">
                  <button
                    type="button"
                    onClick={() => {
                      setOldPinInput('');
                      setNewPinInput('');
                      setConfirmPinInput('');
                      setChangePinError('');
                      setShowChangePinModal(true);
                    }}
                    className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-[#12264B] rounded-xl text-xs font-black flex items-center gap-1.5 shadow"
                  >
                    <Edit3 className="w-3.5 h-3.5" /> 🔑 Ubah Sandi Owner
                  </button>
                  <button
                    type="button"
                    onClick={() => setOwnerUnlocked(false)}
                    className="px-3.5 py-2 bg-white/10 hover:bg-white/20 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-white/20"
                  >
                    <Lock className="w-3.5 h-3.5" /> Kunci Portal Owner
                  </button>
                </div>
              </div>

              {/* OWNER KPI SUMMARY */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">
                    Omzet Kotor (1 Bulan / {googleSheetsConfig.currentMonthDaysCount} Hr)
                  </span>
                  <div className="text-xl font-black text-[#12264B] mt-1">
                    {formatRupiah(ownerAnalytics.monthlyGrossOmzet)}
                  </div>
                  <div className="text-[11px] text-emerald-700 font-bold mt-1">
                    Laba Kotor: {formatRupiah(ownerAnalytics.monthlyGrossProfit)}
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">
                    Uang di Brankas Drop-Box
                  </span>
                  <div className="text-xl font-black text-[#C81D11] mt-1">
                    {formatRupiah(ownerAnalytics.totalCashInSafeBox)}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    Menunggu diambil & diverifikasi Owner
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">
                    Status Kunci Stok Berantai
                  </span>
                  <div
                    className={`text-lg font-black mt-1 ${
                      tamperedItemsList.length > 0 ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {tamperedItemsList.length > 0
                      ? `🚨 ${tamperedItemsList.length} Barang Diubah`
                      : '🔒 100% Aman Terkunci'}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    Stok Akhir = Stok Awal Shift Berikutnya
                  </div>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
                  <span className="text-[11px] font-bold text-stone-500 uppercase">
                    Estimasi Profit Bersih Bulanan
                  </span>
                  <div className="text-xl font-black text-emerald-700 mt-1">
                    {formatRupiah(ownerAnalytics.monthlyNetProfit)}
                  </div>
                  <div className="text-[11px] text-stone-500 mt-1">
                    Margin Bersih: {ownerAnalytics.netMarginPercent}% dari Omzet
                  </div>
                </div>
              </div>

              {/* OWNER TAB NAVIGATION (DESKTOP TAB BAR + MOBILE BOTTOM BAR) */}
              <div className="hidden md:flex flex-wrap gap-2 bg-white p-2 rounded-2xl shadow-xs border border-stone-200">
                {[
                  { id: 'audit', label: '1. Audit Stok, QRIS & PDF Shift', icon: ShieldAlert },
                  { id: 'gudang', label: '2. Gudang Utama & Kunci Stok', icon: Warehouse },
                  { id: 'pekerja', label: '3. Gaji, Absensi & Slip PDF', icon: Users },
                  {
                    id: 'labarugi',
                    label: '4. Pembukuan 1 Bulan & Sheets',
                    icon: BarChart3,
                  },
                ].map((t) => {
                  const IconObj = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setOwnerTab(t.id)}
                      className={`flex-1 min-w-[200px] py-2.5 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition ${
                        ownerTab === t.id
                          ? 'bg-[#12264B] text-white shadow'
                          : 'text-stone-600 hover:bg-stone-100'
                      }`}
                    >
                      <IconObj className="w-4 h-4" />
                      <span>{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* MOBILE STICKY BOTTOM NAV UNTUK OWNER */}
              <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#12264B] border-t-2 border-[#C81D11] px-2 py-1.5 grid grid-cols-4 gap-1 shadow-2xl">
                {[
                  { id: 'audit', label: 'Audit & QRIS', icon: ShieldAlert },
                  { id: 'gudang', label: 'Gudang', icon: Warehouse },
                  { id: 'pekerja', label: 'Gaji & Absen', icon: Users },
                  { id: 'labarugi', label: 'Buku Bulanan', icon: BarChart3 },
                ].map((t) => {
                  const IconObj = t.icon;
                  return (
                    <button
                      key={t.id}
                      onClick={() => setOwnerTab(t.id)}
                      className={`py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-1 text-[10px] font-black transition ${
                        ownerTab === t.id
                          ? 'bg-amber-400 text-[#12264B]'
                          : 'text-stone-300'
                      }`}
                    >
                      <IconObj className="w-4 h-4" />
                      <span className="truncate">{t.label}</span>
                    </button>
                  );
                })}
              </div>

              {/* OWNER TAB 1: AUDIT STOK BERANTAI, REKONSILIASI QRIS & ARSIP PDF SHIFT */}
              {ownerTab === 'audit' && (
                <div className="space-y-5">
                  <div
                    className={`rounded-2xl p-4 sm:p-5 border-2 shadow-sm space-y-4 ${
                      tamperedItemsList.length > 0
                        ? 'bg-rose-50 border-rose-500'
                        : 'bg-emerald-50/70 border-emerald-400'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-stone-200/80 pb-3">
                      <div>
                        <span
                          className={`text-[10px] font-black px-2.5 py-0.5 rounded uppercase ${
                            tamperedItemsList.length > 0
                              ? 'bg-rose-600 text-white'
                              : 'bg-emerald-700 text-white'
                          }`}
                        >
                          🔒 Chain-of-Custody Stock Lock (Anti-Bohong Stok Akhir)
                        </span>
                        <h3 className="text-base font-black text-[#12264B] mt-1">
                          Radar Deteksi Otak-Atik Stok Akhir Kemarin vs. Stok Awal Hari Ini
                        </h3>
                      </div>
                    </div>

                    {tamperedItemsList.length === 0 ? (
                      <div className="bg-white rounded-xl p-4 border border-emerald-200 flex items-center gap-3 text-xs text-emerald-950 font-semibold">
                        <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                        <div>
                          <strong>AMAN 100%:</strong> Seluruh angka <strong>Stok Awal</strong> pada shift{' '}
                          <strong>{shiftInfo.workerCurrent}</strong> sama persis dengan{' '}
                          <strong>Stok Akhir</strong> yang ditinggalkan shift sebelumnya.
                        </div>
                      </div>
                    ) : (
                      <div className="overflow-x-auto bg-white rounded-xl border border-rose-300">
                        <table className="w-full text-left border-collapse text-xs">
                          <thead>
                            <tr className="bg-rose-900 text-white uppercase text-[10px]">
                              <th className="py-2.5 px-3">Barang yang Diubah</th>
                              <th className="py-2.5 px-3 text-center">Stok Akhir Kemarin (Kunci)</th>
                              <th className="py-2.5 px-3 text-center">Stok Awal Diinput Pekerja</th>
                              <th className="py-2.5 px-3 text-center">Status & Selisih</th>
                              <th className="py-2.5 px-3">Alasan Pekerja</th>
                              <th className="py-2.5 px-3 text-center">Tindakan Owner</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-rose-100">
                            {tamperedItemsList.map((item) => (
                              <tr key={item.id} className="bg-rose-50/40">
                                <td className="py-2.5 px-3 font-black text-[#12264B]">
                                  {item.name}
                                </td>
                                <td className="py-2.5 px-3 text-center font-bold">
                                  🔒 {item.lockedInit} {item.unit}
                                </td>
                                <td className="py-2.5 px-3 text-center font-black text-rose-700">
                                  {item.initialStock} {item.unit}
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <span className="px-2 py-0.5 rounded font-black text-[10px] bg-rose-600 text-white">
                                    {item.tamperDiff < 0
                                      ? `DIKURANGI ${item.tamperDiff}`
                                      : `DILEBIHKAN +${item.tamperDiff}`}{' '}
                                    {item.unit}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 italic text-stone-700">
                                  "{item.lastTamperReason || 'Tidak menulis alasan'}" (Oleh:{' '}
                                  {item.lastTamperBy || shiftInfo.workerCurrent})
                                </td>
                                <td className="py-2.5 px-3 text-center">
                                  <div className="flex items-center justify-center gap-1.5">
                                    <button
                                      onClick={() => handleRestoreLockedStock(item.id)}
                                      className="bg-[#12264B] text-white px-2.5 py-1 rounded-lg text-[11px] font-bold flex items-center gap-1"
                                    >
                                      <RotateCcw className="w-3 h-3" /> Kembalikan ke Kunci
                                    </button>
                                    <button
                                      onClick={() => handleApproveTamperedStock(item.id)}
                                      className="bg-emerald-600 text-white px-2.5 py-1 rounded-lg text-[11px] font-bold"
                                    >
                                      Setujui
                                    </button>
                                  </div>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                  {/* REKONSILIASI QRIS PER TANGGAL */}
                  <div className="bg-gradient-to-br from-[#12264B] to-[#1d386e] text-white rounded-2xl p-5 shadow-md border-2 border-amber-400/70 space-y-4">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-white/15 pb-3">
                      <div>
                        <span className="bg-amber-400 text-[#12264B] text-[10px] font-black px-2 py-0.5 rounded uppercase">
                          Rekonsiliasi QRIS Per Tanggal (Owner Only)
                        </span>
                        <h3 className="text-base sm:text-lg font-black mt-1">
                          Input Total Mutasi QRIS Harian (Gabungan Shift Siang + Shift Malam)
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 bg-black/30 p-2 rounded-xl border border-white/15">
                        <Calendar className="w-4 h-4 text-amber-300" />
                        <span className="text-xs font-bold text-stone-200">Pilih Tanggal:</span>
                        <input
                          type="date"
                          value={selectedReconDate}
                          onChange={(e) => setSelectedReconDate(e.target.value)}
                          className="bg-white text-[#12264B] font-black text-xs px-2.5 py-1.5 rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-center">
                      <div className="lg:col-span-5 bg-white text-stone-800 p-4 rounded-xl border-2 border-amber-400 space-y-2">
                        <label className="block text-xs font-black text-[#12264B] uppercase">
                          📥 Total Pendapatan QRIS Tanggal {selectedReconDate}
                        </label>
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            value={displayNum(dailyQrisByDate[selectedReconDate] ?? '')}
                            onFocus={selectAllOnFocus}
                            placeholder="Ketik total mutasi QRIS..."
                            onChange={(e) =>
                              handleSaveDailyOwnerQris(selectedReconDate, e.target.value)
                            }
                            className="w-full px-3 py-2.5 text-lg font-black text-[#12264B] bg-amber-50/60 border-2 border-[#12264B] rounded-xl"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              showToast(
                                `Data QRIS Tanggal ${selectedReconDate} sebesar ${formatRupiah(
                                  dailyQrisByDate[selectedReconDate] || 0
                                )} berhasil direkonsiliasi!`
                              )
                            }
                            className="shrink-0 bg-[#C81D11] hover:bg-[#a3160c] text-white font-black text-xs px-3.5 py-3 rounded-xl shadow"
                          >
                            Cocokkan
                          </button>
                        </div>
                      </div>

                      <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
                        <div className="bg-white/10 p-3 rounded-xl border border-white/15">
                          <div className="text-[10px] text-stone-300 uppercase font-bold">
                            1. Omzet Stok ({dailyReconciliationReport.shiftsCount} Shift)
                          </div>
                          <div className="text-sm font-black text-white mt-1">
                            {formatRupiah(dailyReconciliationReport.totalOmzetBarangHarian)}
                          </div>
                        </div>
                        <div className="bg-white/10 p-3 rounded-xl border border-white/15">
                          <div className="text-[10px] text-stone-300 uppercase font-bold">
                            2. Uang Tunai Brankas
                          </div>
                          <div className="text-sm font-black text-amber-300 mt-1">
                            {formatRupiah(dailyReconciliationReport.totalSetoranTunaiAmplopHarian)}
                          </div>
                        </div>
                        <div className="bg-white/10 p-3 rounded-xl border border-white/15">
                          <div className="text-[10px] text-stone-300 uppercase font-bold">
                            3. Belanja Nota + QRIS
                          </div>
                          <div className="text-sm font-black text-sky-300 mt-1">
                            {formatRupiah(
                              dailyReconciliationReport.totalBelanjaNotaHarian +
                                dailyReconciliationReport.actualQrisFromOwnerBank
                            )}
                          </div>
                        </div>
                        <div
                          className={`p-3 rounded-xl border-2 ${
                            dailyReconciliationReport.selisihHarian === 0
                              ? 'bg-emerald-600/40 border-emerald-400'
                              : dailyReconciliationReport.selisihHarian < 0
                              ? 'bg-rose-600/50 border-rose-300'
                              : 'bg-amber-500/30 border-amber-300'
                          }`}
                        >
                          <div className="text-[10px] text-white uppercase font-black">
                            4. Hasil Audit Tanggal Ini
                          </div>
                          <div className="text-sm font-black text-white mt-1">
                            {dailyReconciliationReport.selisihHarian === 0
                              ? '✅ PAS / KLOP'
                              : `${
                                  dailyReconciliationReport.selisihHarian > 0 ? '+' : ''
                                }${formatRupiah(dailyReconciliationReport.selisihHarian)}`}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* DAFTAR VERIFIKASI AMPLOP BRANKAS & UNDUH PDF PER SHIFT */}
                  <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                    <div className="p-4 bg-[#12264B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-black text-sm flex items-center gap-2">
                          <FileDown className="w-4 h-4 text-amber-400" />
                          Riwayat Setoran Amplop Brankas & Unduh PDF Laporan Shift
                        </h3>
                        <p className="text-xs text-stone-300">
                          Owner dapat memverifikasi amplop brankas dan mengunduh ulang PDF laporan tiap shift kapan saja.
                        </p>
                      </div>
                    </div>
                    <div className="p-3 sm:p-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                      {shiftHistory.map((sh) => (
                        <div
                          key={sh.id}
                          className="p-4 rounded-xl border-2 border-stone-200 bg-stone-50/70 flex flex-col justify-between gap-3"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <span className="text-[10px] font-black uppercase bg-[#12264B] text-amber-300 px-2 py-0.5 rounded">
                                {sh.date} • {sh.shift}
                              </span>
                              <h4 className="font-black text-sm text-[#12264B] mt-1">
                                Penjaga: {sh.workerCurrent} ➔ Oper: {sh.workerNext}
                              </h4>
                            </div>
                            <span
                              className={`text-[10px] font-black px-2 py-1 rounded-lg ${
                                sh.verifiedByOwner
                                  ? 'bg-emerald-100 text-emerald-800'
                                  : 'bg-amber-100 text-amber-900'
                              }`}
                            >
                              {sh.verifiedByOwner ? '✅ Amplop Diverifikasi' : '⏳ Di Dalam Brankas'}
                            </span>
                          </div>

                          <div className="grid grid-cols-3 gap-2 bg-white p-2.5 rounded-xl border text-xs">
                            <div>
                              <div className="text-[10px] text-stone-500">Omzet Barang</div>
                              <div className="font-black text-[#12264B]">
                                {formatRupiah(sh.totalOmzet)}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-stone-500">Amplop Brankas</div>
                              <div className="font-black text-[#C81D11]">
                                {formatRupiah(sh.dropBoxEnvelope)}
                              </div>
                            </div>
                            <div>
                              <div className="text-[10px] text-stone-500">Belanja Nota</div>
                              <div className="font-bold text-stone-700">
                                {formatRupiah(sh.expensesTotal)}
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-wrap items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleDownloadShiftPdfAndAdvance(false, sh)}
                              className="flex-1 py-2 px-3 bg-[#12264B] hover:bg-[#1b386b] text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5"
                            >
                              <FileDown className="w-3.5 h-3.5 text-amber-300" />
                              📥 Download PDF Shift
                            </button>
                            {!sh.verifiedByOwner && (
                              <button
                                type="button"
                                onClick={() => handleVerifyEnvelope(sh.id)}
                                className="flex-1 py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white font-black rounded-xl text-xs flex items-center justify-center gap-1"
                              >
                                <Check className="w-3.5 h-3.5" /> Terima Amplop
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* OWNER TAB 2: GUDANG UTAMA */}
              {ownerTab === 'gudang' && (
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                  <div className="p-4 bg-[#12264B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-sm flex items-center gap-2">
                        <Warehouse className="w-4 h-4 text-amber-400" />
                        Kontrol Gudang Utama (Terkunci Owner) & Master HPP
                      </h3>
                      <p className="text-xs text-stone-300">
                        Turunkan stok dari Gudang Utama ke Etalase Kasir dan kelola harga modal HPP.
                      </p>
                    </div>
                    <button
                      onClick={() => setShowAddItemModal(true)}
                      className="bg-amber-400 text-[#12264B] px-3 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 self-start sm:self-center"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Barang Baru
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-stone-100 text-stone-600 border-b uppercase text-[10px]">
                          <th className="py-3 px-4">Nama Barang</th>
                          <th className="py-3 px-3 text-right">Harga Jual</th>
                          <th className="py-3 px-3 text-right">Modal HPP</th>
                          <th className="py-3 px-3 text-center bg-amber-50 text-amber-900">
                            Stok Gudang Owner
                          </th>
                          <th className="py-3 px-3 text-center bg-blue-50 text-blue-900">
                            🔒 Stok Awal Etalase
                          </th>
                          <th className="py-3 px-3 text-center">Sisa Etalase Kasir</th>
                          <th className="py-3 px-4 text-center">Turunkan Stok ke Etalase</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {calculatedInventory.map((item) => (
                          <tr key={item.id} className="hover:bg-stone-50">
                            <td className="py-3 px-4">
                              <div className="font-bold text-[#12264B]">{item.name}</div>
                              <div className="text-[10px] text-stone-500">{item.category}</div>
                            </td>
                            <td className="py-3 px-3 text-right font-semibold">
                              {formatRupiah(item.priceSell)}
                            </td>
                            <td className="py-3 px-3 text-right font-bold text-rose-800">
                              {formatRupiah(item.priceCost || item.supplierShare)}
                            </td>
                            <td className="py-3 px-3 text-center bg-amber-50/50">
                              {item.category === 'Titipan (Konsinyasi)' ? (
                                <span className="text-[11px] text-stone-400 italic">
                                  Suplier Harian
                                </span>
                              ) : (
                                <div className="flex items-center justify-center gap-1.5">
                                  <span className="font-black text-sm text-amber-900">
                                    {item.warehouseStock} {item.unit}
                                  </span>
                                  <button
                                    onClick={() =>
                                      handleAddWarehouseRestock(item.id, item.restockQty)
                                    }
                                    className="bg-amber-200 hover:bg-amber-300 text-amber-950 px-1.5 py-0.5 rounded text-[10px] font-bold"
                                  >
                                    +Beli
                                  </button>
                                </div>
                              )}
                            </td>
                            <td className="py-3 px-3 text-center bg-blue-50/40 font-black text-[#12264B]">
                              🔒 {item.lockedInit} {item.unit}
                            </td>
                            <td className="py-3 px-3 text-center font-black">
                              {item.finalStock} {item.unit}
                            </td>
                            <td className="py-3 px-4 text-center">
                              <button
                                onClick={() =>
                                  handleTransferFromWarehouse(item.id, item.restockQty)
                                }
                                className="bg-[#12264B] hover:bg-[#1e3c75] text-white px-3 py-1.5 rounded-lg text-[11px] font-bold transition shadow-xs"
                              >
                                +{item.restockQty} {item.unit} ke Etalase
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* OWNER TAB 3: GAJI PEKERJA & ABSENSI */}
              {ownerTab === 'pekerja' && (
                <div className="space-y-6">
                  <div className="bg-white rounded-2xl p-4 sm:p-5 border border-stone-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <span className="bg-[#12264B] text-amber-300 text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                        Manajemen SDM, Gaji & Absensi Warkop
                      </span>
                      <h3 className="text-base sm:text-lg font-black text-[#12264B] mt-1">
                        Custom Nama Pekerja, Skema Gaji & Buku Absensi Kehadiran
                      </h3>
                    </div>
                    <button
                      onClick={() => setShowAddWorkerModal(true)}
                      className="bg-[#C81D11] hover:bg-[#a6170d] text-white font-black text-xs px-4 py-2.5 rounded-xl shadow flex items-center gap-1.5 self-start sm:self-center shrink-0"
                    >
                      <Plus className="w-4 h-4" /> + Tambah Pekerja Baru
                    </button>
                  </div>

                  {showAddWorkerModal && (
                    <div className="bg-amber-50/90 border-2 border-[#12264B] rounded-2xl p-5 shadow-md space-y-4">
                      <div className="flex items-center justify-between border-b border-amber-200 pb-2">
                        <h4 className="font-black text-sm text-[#12264B]">
                          Tambah Pekerja / Penjaga Shift Baru
                        </h4>
                        <button
                          onClick={() => setShowAddWorkerModal(false)}
                          className="text-xs text-stone-500 font-bold"
                        >
                          Tutup [X]
                        </button>
                      </div>
                      <form
                        onSubmit={handleAddNewWorker}
                        className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-6 gap-3"
                      >
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                            Nama Pekerja
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="Contoh: Deden"
                            value={newWorkerForm.name}
                            onChange={(e) =>
                              setNewWorkerForm({ ...newWorkerForm, name: e.target.value })
                            }
                            className="w-full px-3 py-2 bg-white border rounded-xl text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                            Shift Default
                          </label>
                          <select
                            value={newWorkerForm.shiftDefault}
                            onChange={(e) =>
                              setNewWorkerForm({ ...newWorkerForm, shiftDefault: e.target.value })
                            }
                            className="w-full px-2.5 py-2 bg-white border rounded-xl text-xs font-bold"
                          >
                            <option value="Shift Siang (07:00 - 16:00)">
                              Shift Siang (07:00 - 16:00)
                            </option>
                            <option value="Shift Malam (18:00 - 03:00)">
                              Shift Malam (18:00 - 03:00)
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                            Gaji Pokok (Rp)
                          </label>
                          <input
                            type="number"
                            value={displayNum(newWorkerForm.baseSalary)}
                            onFocus={selectAllOnFocus}
                            onChange={(e) =>
                              setNewWorkerForm({
                                ...newWorkerForm,
                                baseSalary: cleanNumInput(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2 bg-white border rounded-xl text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                            Upah / Shift (Rp)
                          </label>
                          <input
                            type="number"
                            value={displayNum(newWorkerForm.perShiftRate)}
                            onFocus={selectAllOnFocus}
                            onChange={(e) =>
                              setNewWorkerForm({
                                ...newWorkerForm,
                                perShiftRate: cleanNumInput(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2 bg-white border rounded-xl text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                            Uang Makan / Shift
                          </label>
                          <input
                            type="number"
                            value={displayNum(newWorkerForm.mealAllowancePerShift)}
                            onFocus={selectAllOnFocus}
                            onChange={(e) =>
                              setNewWorkerForm({
                                ...newWorkerForm,
                                mealAllowancePerShift: cleanNumInput(e.target.value),
                              })
                            }
                            className="w-full px-3 py-2 bg-white border rounded-xl text-xs font-bold"
                          />
                        </div>
                        <div className="flex items-end">
                          <button
                            type="submit"
                            className="w-full py-2 bg-[#12264B] text-white font-black rounded-xl text-xs"
                          >
                            Simpan Pekerja
                          </button>
                        </div>
                      </form>
                    </div>
                  )}

                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
                    {ownerAnalytics.workerReports.map((w) => (
                      <div
                        key={w.id}
                        className="bg-white rounded-2xl shadow-sm border-2 border-stone-200 p-5 space-y-4"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-2 border-b pb-3">
                          <div className="flex-1 min-w-[200px]">
                            <label className="block text-[10px] font-bold text-stone-400 uppercase">
                              Edit Nama Pekerja:
                            </label>
                            <div className="flex items-center gap-2 mt-0.5">
                              <input
                                type="text"
                                value={w.name}
                                onChange={(e) =>
                                  handleUpdateWorkerField(w.id, 'name', e.target.value)
                                }
                                className="px-2.5 py-1.5 border-2 border-stone-300 focus:border-[#12264B] rounded-xl font-black text-base text-[#12264B] w-full"
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteWorker(w.id, w.name)}
                                className="p-2 text-stone-400 hover:text-rose-600 rounded-lg border border-stone-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="bg-emerald-100 text-emerald-900 font-black px-2.5 py-1 rounded-full text-xs">
                              Hadir: {w.totalShiftsMonth} Shift
                            </span>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 bg-stone-50 p-3 rounded-xl border border-stone-200 text-xs">
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500">
                              Gaji Pokok (Rp)
                            </label>
                            <input
                              type="number"
                              value={displayNum(w.baseSalary)}
                              onFocus={selectAllOnFocus}
                              onChange={(e) =>
                                handleUpdateWorkerField(w.id, 'baseSalary', e.target.value)
                              }
                              className="w-full mt-1 px-2 py-1.5 bg-white border rounded-lg font-black text-[#12264B]"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500">
                              Upah / Shift (Rp)
                            </label>
                            <input
                              type="number"
                              value={displayNum(w.perShiftRate)}
                              onFocus={selectAllOnFocus}
                              onChange={(e) =>
                                handleUpdateWorkerField(w.id, 'perShiftRate', e.target.value)
                              }
                              className="w-full mt-1 px-2 py-1.5 bg-white border rounded-lg font-black text-emerald-700"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500">
                              Makan / Shift (Rp)
                            </label>
                            <input
                              type="number"
                              value={displayNum(w.mealAllowancePerShift)}
                              onFocus={selectAllOnFocus}
                              onChange={(e) =>
                                handleUpdateWorkerField(
                                  w.id,
                                  'mealAllowancePerShift',
                                  e.target.value
                                )
                              }
                              className="w-full mt-1 px-2 py-1.5 bg-white border rounded-lg font-black text-sky-700"
                            />
                          </div>
                          <div>
                            <label className="block text-[10px] font-bold text-stone-500">
                              Kasbon Aktif (Rp)
                            </label>
                            <input
                              type="number"
                              value={displayNum(w.kasbon)}
                              onFocus={selectAllOnFocus}
                              onChange={(e) =>
                                handleUpdateWorkerField(w.id, 'kasbon', e.target.value)
                              }
                              className="w-full mt-1 px-2 py-1.5 bg-white border rounded-lg font-black text-amber-800"
                            />
                          </div>
                        </div>

                        <div className="space-y-1.5 text-xs bg-stone-100/80 p-3.5 rounded-xl">
                          <div className="flex justify-between">
                            <span className="text-stone-600">Gaji Pokok Tetap:</span>
                            <span className="font-bold">{formatRupiah(w.baseSalary)}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-600">
                              Upah Kehadiran ({w.totalShiftsMonth} shift ×{' '}
                              {formatRupiah(w.perShiftRate)}):
                            </span>
                            <span className="font-bold text-emerald-700">
                              +{formatRupiah(w.shiftWagesEarned)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-600">
                              Tunjangan Makan ({w.totalShiftsMonth} shift ×{' '}
                              {formatRupiah(w.mealAllowancePerShift)}):
                            </span>
                            <span className="font-bold text-sky-700">
                              +{formatRupiah(w.mealAllowanceEarned)}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-stone-600">Potongan Kasbon & Alfa:</span>
                            <span className="font-bold text-rose-600">
                              -{formatRupiah(Number(w.kasbon || 0) + w.alfaPenalty)}
                            </span>
                          </div>
                          <div className="border-t border-stone-300 pt-2 flex justify-between text-sm font-black text-[#12264B]">
                            <span>Total Gaji Bersih (Take Home Pay):</span>
                            <span className="text-base">{formatRupiah(w.takeHomePay)}</span>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          <button
                            type="button"
                            onClick={() => handleDownloadWorkerPayslipPdf(w)}
                            className="w-full py-2.5 bg-[#C81D11] hover:bg-[#a6170d] text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                          >
                            <FileDown className="w-4 h-4 text-amber-200" />
                            📥 Download Slip Gaji PDF ({w.name})
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(generateWorkerPayslipWA(w), () =>
                                showToast(`Slip Gaji & Rekap Absensi ${w.name} berhasil disalin!`)
                              )
                            }
                            className="w-full py-2.5 bg-[#12264B] hover:bg-[#1d3b70] text-white font-black rounded-xl text-xs flex items-center justify-center gap-1.5 shadow"
                          >
                            <Copy className="w-3.5 h-3.5 text-amber-300" />
                            📲 Salin Ringkasan Slip WA
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* BUKU ABSENSI KEHADIRAN */}
                  <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                    <div className="p-4 bg-[#12264B] text-white flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <h3 className="font-bold text-sm flex items-center gap-2">
                          <UserCheck className="w-4 h-4 text-amber-400" />
                          Buku Absensi Kehadiran & Lembur / Tuur Shift (Tanggal Otomatis Sinkron)
                        </h3>
                      </div>
                    </div>

                    <div className="p-4 bg-stone-50 border-b border-stone-200">
                      <form
                        onSubmit={handleAddAttendance}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-2.5 items-end"
                      >
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                            Tanggal (Sinkron)
                          </label>
                          <input
                            type="date"
                            required
                            value={newAttendanceForm.date}
                            onChange={(e) =>
                              setNewAttendanceForm({ ...newAttendanceForm, date: e.target.value })
                            }
                            className="w-full px-2.5 py-2 bg-white border rounded-xl text-xs font-bold"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                            Pekerja
                          </label>
                          <select
                            value={newAttendanceForm.workerId}
                            onChange={(e) =>
                              setNewAttendanceForm({
                                ...newAttendanceForm,
                                workerId: e.target.value,
                              })
                            }
                            className="w-full px-2.5 py-2 bg-white border rounded-xl text-xs font-bold text-[#12264B]"
                          >
                            {workers.map((w) => (
                              <option key={w.id} value={w.id}>
                                {w.name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                            Jadwal Shift
                          </label>
                          <select
                            value={newAttendanceForm.shift}
                            onChange={(e) =>
                              setNewAttendanceForm({ ...newAttendanceForm, shift: e.target.value })
                            }
                            className="w-full px-2.5 py-2 bg-white border rounded-xl text-xs font-bold"
                          >
                            <option value="Shift Siang (07:00 - 16:00)">
                              Shift Siang (07:00 - 16:00)
                            </option>
                            <option value="Shift Malam (18:00 - 03:00)">
                              Shift Malam (18:00 - 03:00)
                            </option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                            Status Kehadiran
                          </label>
                          <select
                            value={newAttendanceForm.status}
                            onChange={(e) =>
                              setNewAttendanceForm({
                                ...newAttendanceForm,
                                status: e.target.value,
                              })
                            }
                            className="w-full px-2.5 py-2 bg-white border rounded-xl text-xs font-black text-[#12264B]"
                          >
                            <option value="HADIR_NORMAL">✅ Hadir Normal (1 Shift)</option>
                            <option value="LEMBUR_TUUR">🔥 Lembur / Tuur Teman (2 Shift)</option>
                            <option value="IZIN_SAKIT">🤒 Izin / Sakit (0 Shift)</option>
                            <option value="ALFA">❌ Alfa / Tanpa Kabar (Denda)</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-[10px] font-bold text-stone-600 uppercase mb-1">
                            Catatan
                          </label>
                          <input
                            type="text"
                            placeholder="Contoh: Gantikan shift..."
                            value={newAttendanceForm.note}
                            onChange={(e) =>
                              setNewAttendanceForm({ ...newAttendanceForm, note: e.target.value })
                            }
                            className="w-full px-2.5 py-2 bg-white border rounded-xl text-xs"
                          />
                        </div>
                        <button
                          type="submit"
                          className="w-full py-2 px-3 bg-[#C81D11] hover:bg-[#a6170d] text-white font-black rounded-xl text-xs shadow"
                        >
                          + Catat Absen
                        </button>
                      </form>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-stone-100 text-stone-600 border-b uppercase text-[10px]">
                            <th className="py-2.5 px-4">Tanggal</th>
                            <th className="py-2.5 px-3">Nama Pekerja</th>
                            <th className="py-2.5 px-3">Shift</th>
                            <th className="py-2.5 px-3 text-center">Status</th>
                            <th className="py-2.5 px-3 text-center">Kredit Gaji</th>
                            <th className="py-2.5 px-3">Keterangan</th>
                            <th className="py-2.5 px-3 text-center">Hapus</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                          {attendanceLogs.map((att) => {
                            const matchedWorker = workers.find(
                              (w) =>
                                w.id === att.workerId ||
                                w.name.toLowerCase() === (att.workerName || '').toLowerCase()
                            );
                            return (
                              <tr key={att.id} className="hover:bg-stone-50">
                                <td className="py-2.5 px-4 font-bold">{att.date}</td>
                                <td className="py-2.5 px-3 font-black text-[#12264B]">
                                  <select
                                    value={matchedWorker ? matchedWorker.id : ''}
                                    onChange={(e) =>
                                      handleChangeAttendanceWorkerInRow(att.id, e.target.value)
                                    }
                                    className="px-2 py-1 bg-stone-100 border border-stone-300 rounded-lg font-black text-xs text-[#12264B]"
                                  >
                                    {!matchedWorker && (
                                      <option value="">{att.workerName}</option>
                                    )}
                                    {workers.map((w) => (
                                      <option key={w.id} value={w.id}>
                                        {w.name}
                                      </option>
                                    ))}
                                  </select>
                                </td>
                                <td className="py-2.5 px-3 text-stone-600">{att.shift}</td>
                                <td className="py-2.5 px-3 text-center">
                                  <span className="bg-emerald-100 text-emerald-800 font-black px-2 py-0.5 rounded-full text-[10px]">
                                    {att.status}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-center font-black">
                                  +{att.shiftCredit} Shift
                                </td>
                                <td className="py-2.5 px-3 text-stone-600">{att.note}</td>
                                <td className="py-2.5 px-3 text-center">
                                  <button
                                    onClick={() => handleRemoveAttendance(att.id)}
                                    className="text-stone-400 hover:text-rose-600"
                                  >
                                    <Trash2 className="w-4 h-4 mx-auto" />
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* OWNER TAB 4: LABA RUGI, PEMBUKUAN 1 BULAN FULL & AUTO GOOGLE SHEETS */}
              {ownerTab === 'labarugi' && (
                <div className="space-y-6">
                  {showAppsScriptModal && (
                    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
                      <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl border-2 border-emerald-600 space-y-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between border-b pb-3">
                          <div>
                            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                              Integrasi Otomatis Tanpa Ribet
                            </span>
                            <h3 className="text-base font-black text-[#12264B] mt-1">
                              Cara Menghubungkan Auto-Sync ke Google Sheets Anda
                            </h3>
                          </div>
                          <button
                            onClick={() => setShowAppsScriptModal(false)}
                            className="text-xs font-bold text-stone-500"
                          >
                            Tutup [X]
                          </button>
                        </div>

                        <div className="text-xs text-stone-700 space-y-2 leading-relaxed">
                          <p className="font-bold text-[#12264B]">
                            Ikuti 3 langkah singkat ini (cukup dilakukan 1 kali saja):
                          </p>
                          <ol className="list-decimal list-inside space-y-1.5">
                            <li>
                              Buka <strong>Google Sheets</strong> baru di komputer/HP Anda, lalu klik menu{' '}
                              <strong>Extensions (Ekstensi) ➔ Apps Script</strong>.
                            </li>
                            <li>
                              Hapus kode bawaan, lalu <strong>Salin & Tempel kode di bawah ini</strong>:
                            </li>
                          </ol>
                        </div>

                        <pre className="bg-stone-900 text-emerald-300 p-3.5 rounded-xl text-[11px] font-mono overflow-x-auto">
{`function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = JSON.parse(e.postData.contents);
  
  if (sheet.getLastRow() === 0) {
    sheet.appendRow([
      "Waktu Kirim", "Periode Bulan", "Tanggal Tutup",
      "Total Omzet Pemasukan", "HPP Bahan Baku", "Laba Kotor",
      "Belanja Kasir (Petty Cash)", "Total Gaji Pekerja",
      "Beban Sewa Ruko", "Total Sinking Fund",
      "Total Semua Pengeluaran", "PROFIT BERSIH (NET PROFIT)"
    ]);
  }
  
  sheet.appendRow([
    data.timestamp, data.monthLabel, data.closedDate,
    data.totalOmzet, data.totalHpp, data.grossProfit,
    data.totalPettyCash, data.totalPayroll,
    data.rukoAllocation, data.totalRukoAndSinkingFund,
    data.totalAllExpenses, data.netProfit
  ]);
  
  return ContentService.createTextOutput("SUKSES");
}`}
                        </pre>

                        <div className="flex justify-end gap-2 pt-2 border-t">
                          <button
                            type="button"
                            onClick={() =>
                              copyToClipboard(
                                `function doPost(e) {\n  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();\n  var data = JSON.parse(e.postData.contents);\n  if (sheet.getLastRow() === 0) {\n    sheet.appendRow(["Waktu Kirim", "Periode Bulan", "Tanggal Tutup", "Total Omzet Pemasukan", "HPP Bahan Baku", "Laba Kotor", "Belanja Kasir (Petty Cash)", "Total Gaji Pekerja", "Beban Sewa Ruko", "Total Sinking Fund", "Total Semua Pengeluaran", "PROFIT BERSIH (NET PROFIT)"]);\n  }\n  sheet.appendRow([data.timestamp, data.monthLabel, data.closedDate, data.totalOmzet, data.totalHpp, data.grossProfit, data.totalPettyCash, data.totalPayroll, data.rukoAllocation, data.totalRukoAndSinkingFund, data.totalAllExpenses, data.netProfit]);\n  return ContentService.createTextOutput("SUKSES");\n}`,
                                () => showToast('Kode Google Apps Script berhasil disalin!')
                              )
                            }
                            className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold"
                          >
                            📋 Salin Kode Script
                          </button>
                          <button
                            type="button"
                            onClick={() => setShowAppsScriptModal(false)}
                            className="bg-stone-200 text-stone-700 px-4 py-2 rounded-xl text-xs font-bold"
                          >
                            Selesai
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PANEL UTAMA: INTEGRASI OTOMATIS GOOGLE SHEETS SAAT 1 BULAN FULL */}
                  <div className="bg-gradient-to-r from-emerald-950 via-[#12264B] to-emerald-950 text-white rounded-2xl p-5 shadow-lg border-2 border-emerald-400/60 space-y-4">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/15 pb-4">
                      <div className="space-y-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="bg-emerald-500 text-stone-950 text-[10px] font-black px-2.5 py-0.5 rounded uppercase">
                            📊 Auto-Sync Google Sheets (1 Bulan Full)
                          </span>
                          <span className="text-xs text-amber-300 font-bold">
                            Progress Bulan Ini: Hari ke-{googleSheetsConfig.currentMonthDaysCount} dari{' '}
                            {googleSheetsConfig.targetMonthDays} Hari
                          </span>
                        </div>
                        <h3 className="text-base sm:text-xl font-black">
                          Sistem Pembukuan Bulanan Otomatis ➔ Google Sheets
                        </h3>
                        <p className="text-xs text-stone-300 max-w-3xl">
                          Setiap kali tanggal operasional naik otomatis dan genap mencapai{' '}
                          <strong>1 Bulan Full ({googleSheetsConfig.targetMonthDays} Hari)</strong>, sistem otomatis merekap seluruh{' '}
                          <strong>Pemasukan, Omzet, HPP, Belanja Kasir, Gaji Pekerja, Sewa Ruko, hingga Profit Bersih</strong> dan mengirimkannya ke Google Sheets Anda.
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-2 shrink-0">
                        <button
                          onClick={() => triggerSyncMonthlyToGoogleSheets(30, true)}
                          className="bg-emerald-500 hover:bg-emerald-400 text-stone-950 font-black text-xs px-4 py-2.5 rounded-xl shadow-md flex items-center gap-1.5"
                        >
                          <Sparkles className="w-4 h-4" />
                          🚀 Kirim / Simulasikan Tutup 1 Bulan Full ke Google Sheets
                        </button>
                        <button
                          onClick={() => setShowAppsScriptModal(true)}
                          className="bg-white/15 hover:bg-white/25 text-white font-bold text-xs px-3.5 py-2.5 rounded-xl border border-white/20"
                        >
                          ⚙️ Cara Konek Webhook Sheets
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-3.5 items-center text-xs">
                      <div className="lg:col-span-5 space-y-1">
                        <label className="block text-[10px] font-bold text-emerald-300 uppercase">
                          URL Google Apps Script Web App (Opsional untuk Auto-Push Real-Time):
                        </label>
                        <input
                          type="text"
                          placeholder="https://script.google.com/macros/s/xxxxxx/exec"
                          value={googleSheetsConfig.webhookUrl}
                          onChange={(e) =>
                            setGoogleSheetsConfig({
                              ...googleSheetsConfig,
                              webhookUrl: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 bg-black/40 border border-white/20 rounded-xl text-white text-xs font-mono"
                        />
                      </div>

                      <div className="lg:col-span-3 space-y-1">
                        <label className="block text-[10px] font-bold text-amber-300 uppercase">
                          Status Auto-Sync Bulanan:
                        </label>
                        <div className="px-3 py-2 bg-black/30 rounded-xl border border-emerald-400/30 font-bold text-emerald-300 truncate">
                          {googleSheetsConfig.lastSyncStatus}
                        </div>
                      </div>

                      <div className="lg:col-span-4 flex flex-wrap gap-2">
                        <button
                          onClick={() =>
                            copyToClipboard(generateGoogleSheetsTSV(), () =>
                              showToast(
                                '📋 Tabel Pembukuan 1 Bulan Full disalin! Buka Google Sheets lalu tekan Ctrl+V.'
                              )
                            )
                          }
                          className="flex-1 bg-amber-400 hover:bg-amber-300 text-[#12264B] font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
                        >
                          <Copy className="w-4 h-4" />
                          Salin Tabel (Paste ke Sheets)
                        </button>
                        <button
                          onClick={handleDownloadMonthlyCSV}
                          className="flex-1 bg-white text-[#12264B] hover:bg-stone-100 font-black py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5"
                        >
                          <ArrowDownToLine className="w-4 h-4 text-[#C81D11]" />
                          Unduh .CSV Sheets
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* TABEL MASTER PEMBUKUAN 1 BULAN FULL */}
                  <div className="bg-white rounded-2xl shadow-sm border-2 border-[#12264B] p-5 space-y-4">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b pb-3">
                      <div>
                        <h3 className="font-black text-[#12264B] text-base flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#C81D11]" />
                          Tabel Master Pembukuan 1 Bulan Full ({googleSheetsConfig.monthLabel})
                        </h3>
                        <p className="text-xs text-stone-500">
                          Rekap lengkap Pemasukan, Omzet, HPP, Belanja Kasir, Gaji Pekerja, Sewa Ruko, dan Profit Bersih dalam format standar Google Sheets.
                        </p>
                      </div>
                      <span className="bg-emerald-100 text-emerald-900 text-xs font-black px-3 py-1 rounded-full">
                        Hari ke-{googleSheetsConfig.currentMonthDaysCount} /{' '}
                        {googleSheetsConfig.targetMonthDays} Hari
                      </span>
                    </div>

                    <div className="overflow-x-auto border rounded-xl">
                      <table className="w-full text-left border-collapse text-xs">
                        <thead>
                          <tr className="bg-[#12264B] text-white text-[11px] uppercase">
                            <th className="py-3 px-4">Pos Pembukuan Bulanan</th>
                            <th className="py-3 px-3">Keterangan Rincian</th>
                            <th className="py-3 px-3 text-right bg-emerald-900">
                              Pemasukan / Omzet (+)
                            </th>
                            <th className="py-3 px-3 text-right bg-rose-900">
                              Pengeluaran / Beban (-)
                            </th>
                            <th className="py-3 px-4 text-right bg-stone-900 text-amber-300">
                              Saldo / Laba
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-200">
                          <tr className="bg-emerald-50/40 font-bold">
                            <td className="py-3 px-4 text-[#12264B]">
                              1. Total Omzet Pemasukan Kotor
                            </td>
                            <td className="py-3 px-3 text-stone-600">
                              Penjualan Tunai Kasir + Mutasi QRIS + Bagi Hasil Titipan
                            </td>
                            <td className="py-3 px-3 text-right font-black text-emerald-700">
                              +{formatRupiah(ownerAnalytics.monthlyGrossOmzet)}
                            </td>
                            <td className="py-3 px-3 text-right text-stone-400">-</td>
                            <td className="py-3 px-4 text-right font-black text-stone-900">
                              {formatRupiah(ownerAnalytics.monthlyGrossOmzet)}
                            </td>
                          </tr>

                          <tr>
                            <td className="py-3 px-4 font-bold text-rose-900">
                              2. HPP Bahan Baku & Setoran Suplier
                            </td>
                            <td className="py-3 px-3 text-stone-600">
                              Modal Indomie, Telur, Kopi, Beras, Kornet, Rokok & Gorengan
                            </td>
                            <td className="py-3 px-3 text-right text-stone-400">-</td>
                            <td className="py-3 px-3 text-right font-black text-rose-700">
                              -{formatRupiah(ownerAnalytics.monthlyTotalHpp)}
                            </td>
                            <td className="py-3 px-4 text-right font-bold text-emerald-800">
                              Laba Kotor: {formatRupiah(ownerAnalytics.monthlyGrossProfit)}
                            </td>
                          </tr>

                          <tr>
                            <td className="py-3 px-4 font-bold text-rose-900">
                              3. Pengeluaran Kasir Harian (Petty Cash)
                            </td>
                            <td className="py-3 px-3 text-stone-600">
                              Akumulasi Belanja Es Batu, Galon, Gas LPG 3Kg & Nota Laci
                            </td>
                            <td className="py-3 px-3 text-right text-stone-400">-</td>
                            <td className="py-3 px-3 text-right font-bold text-rose-700">
                              -{formatRupiah(ownerAnalytics.monthlyPettyCashTotal)}
                            </td>
                            <td className="py-3 px-4 text-right text-stone-600">
                              {formatRupiah(
                                ownerAnalytics.monthlyGrossProfit -
                                  ownerAnalytics.monthlyPettyCashTotal
                              )}
                            </td>
                          </tr>

                          {ownerAnalytics.workerReports.map((w) => (
                            <tr key={w.id} className="bg-stone-50/70">
                              <td className="py-2.5 px-4 font-bold text-[#12264B]">
                                4. Pengeluaran Gaji Pekerja: {w.name}
                              </td>
                              <td className="py-2.5 px-3 text-stone-600">
                                Gaji Pokok ({formatRupiah(w.baseSalary)}) + {w.totalShiftsMonth}{' '}
                                Shift Hadir & Makan
                              </td>
                              <td className="py-2.5 px-3 text-right text-stone-400">-</td>
                              <td className="py-2.5 px-3 text-right font-bold text-rose-700">
                                -{formatRupiah(w.grossEarnings)}
                              </td>
                              <td className="py-2.5 px-4 text-right text-stone-500">
                                THP Bersih: {formatRupiah(w.takeHomePay)}
                              </td>
                            </tr>
                          ))}

                          {sinkingFunds.map((sf) => {
                            const totalSfMonth =
                              Number(sf.daily || 0) * Number(sf.collectedDays || 30);
                            return (
                              <tr key={sf.id} className="bg-amber-50/40">
                                <td className="py-2.5 px-4 font-bold text-[#7A2018]">
                                  5. Beban Ruko & Operasional: {sf.name}
                                </td>
                                <td className="py-2.5 px-3 text-stone-600">
                                  Setoran Harian {formatRupiah(sf.daily)} × {sf.collectedDays} Hari
                                </td>
                                <td className="py-2.5 px-3 text-right text-stone-400">-</td>
                                <td className="py-2.5 px-3 text-right font-bold text-rose-700">
                                  -{formatRupiah(totalSfMonth)}
                                </td>
                                <td className="py-2.5 px-4 text-right text-stone-500">
                                  Target 30 Hr: {formatRupiah(Number(sf.daily || 0) * 30)}
                                </td>
                              </tr>
                            );
                          })}

                          <tr className="bg-[#12264B] text-white font-black text-sm">
                            <td className="py-3.5 px-4 text-amber-300">
                              TOTAL PROFIT BERSIH 1 BULAN FULL (NET PROFIT)
                            </td>
                            <td className="py-3.5 px-3 text-xs text-stone-200">
                              Margin Bersih: {ownerAnalytics.netMarginPercent}% dari Omzet
                            </td>
                            <td className="py-3.5 px-3 text-right text-emerald-300">
                              +{formatRupiah(ownerAnalytics.monthlyGrossOmzet)}
                            </td>
                            <td className="py-3.5 px-3 text-right text-rose-300">
                              -
                              {formatRupiah(
                                ownerAnalytics.monthlyTotalHpp + ownerAnalytics.totalMonthlyOpex
                              )}
                            </td>
                            <td className="py-3.5 px-4 text-right text-lg text-emerald-400">
                              {formatRupiah(ownerAnalytics.monthlyNetProfit)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>

                    {/* CUSTOMIZE SINKING FUND RUKO & OPERASIONAL */}
                    <div className="pt-4 border-t border-stone-200 space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-black text-xs uppercase text-[#12264B]">
                          Customize Targetan Sinking Fund (Sewa Ruko Raoseun, Listrik & Alat)
                        </h4>
                        <button
                          type="button"
                          onClick={() => setShowAddSfModal(!showAddSfModal)}
                          className="bg-[#C81D11] text-white text-xs font-black px-3 py-1.5 rounded-xl"
                        >
                          + Tambah Target Baru
                        </button>
                      </div>

                      {showAddSfModal && (
                        <form
                          onSubmit={handleAddSinkingFund}
                          className="grid grid-cols-1 sm:grid-cols-4 gap-2.5 bg-stone-100 p-3 rounded-xl"
                        >
                          <input
                            type="text"
                            required
                            placeholder="Nama Pos (Misal: THR Pekerja)"
                            value={newSfName}
                            onChange={(e) => setNewSfName(e.target.value)}
                            className="px-3 py-2 bg-white border rounded-xl text-xs font-bold"
                          />
                          <input
                            type="number"
                            required
                            placeholder="Setoran / Hari (Rp)"
                            value={displayNum(newSfDaily)}
                            onFocus={selectAllOnFocus}
                            onChange={(e) => setNewSfDaily(cleanNumInput(e.target.value))}
                            className="px-3 py-2 bg-white border rounded-xl text-xs font-bold"
                          />
                          <input
                            type="number"
                            required
                            placeholder="Target Hari (30)"
                            value={displayNum(newSfTargetDays)}
                            onFocus={selectAllOnFocus}
                            onChange={(e) => setNewSfTargetDays(cleanNumInput(e.target.value))}
                            className="px-3 py-2 bg-white border rounded-xl text-xs font-bold"
                          />
                          <button
                            type="submit"
                            className="bg-[#12264B] text-white font-black rounded-xl text-xs py-2 px-3"
                          >
                            Simpan Target Baru
                          </button>
                        </form>
                      )}

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {sinkingFunds.map((sf) => (
                          <div
                            key={sf.id}
                            className="p-3.5 rounded-xl border border-stone-200 bg-stone-50 space-y-2 text-xs"
                          >
                            <div className="flex items-center justify-between gap-2">
                              <input
                                type="text"
                                value={sf.name}
                                onChange={(e) =>
                                  handleUpdateSinkingFund(sf.id, 'name', e.target.value)
                                }
                                className="font-black text-[#12264B] bg-white px-2 py-1 border rounded-lg w-full"
                              />
                              <button
                                type="button"
                                onClick={() => handleDeleteSinkingFund(sf.id)}
                                className="text-stone-400 hover:text-rose-600 p-1"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              <div>
                                <label className="block text-[10px] text-stone-500 font-bold">
                                  Setoran / Hari (Rp)
                                </label>
                                <input
                                  type="number"
                                  value={displayNum(sf.daily)}
                                  onFocus={selectAllOnFocus}
                                  onChange={(e) =>
                                    handleUpdateSinkingFund(sf.id, 'daily', e.target.value)
                                  }
                                  className="w-full mt-0.5 px-2 py-1 bg-white border rounded-lg font-black text-[#C81D11]"
                                />
                              </div>
                              <div>
                                <label className="block text-[10px] text-stone-500 font-bold">
                                  Hari Terkumpul
                                </label>
                                <input
                                  type="number"
                                  value={displayNum(sf.collectedDays)}
                                  onFocus={selectAllOnFocus}
                                  onChange={(e) =>
                                    handleUpdateSinkingFund(sf.id, 'collectedDays', e.target.value)
                                  }
                                  className="w-full mt-0.5 px-2 py-1 bg-white border rounded-lg font-black text-emerald-800"
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        ) : (
          <div className="space-y-5">
            {/* PANEL KONTROL SHIFT & PENJAGA DI ATAS HALAMAN KASIR HP */}
            <div className="bg-white rounded-2xl p-3.5 sm:p-4 shadow-xs border border-stone-200 grid grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                  📅 Tanggal Aktif (Otomatis)
                </label>
                <input
                  type="date"
                  value={shiftInfo.date}
                  onChange={(e) => setShiftInfo({ ...shiftInfo, date: e.target.value })}
                  className="w-full px-2.5 py-2 bg-stone-50 border rounded-xl font-black text-[#12264B]"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                  🕒 Jadwal Shift
                </label>
                <select
                  value={shiftInfo.shift}
                  onChange={(e) => setShiftInfo({ ...shiftInfo, shift: e.target.value })}
                  className="w-full px-2.5 py-2 bg-stone-50 border rounded-xl font-black text-[#12264B]"
                >
                  <option value="Shift Siang (07:00 - 16:00)">Shift Siang (07:00 - 16:00)</option>
                  <option value="Shift Malam (18:00 - 03:00)">Shift Malam (18:00 - 03:00)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                  👤 Penjaga Shift Sekarang
                </label>
                <select
                  value={shiftInfo.workerCurrent}
                  onChange={(e) => setShiftInfo({ ...shiftInfo, workerCurrent: e.target.value })}
                  className="w-full px-2.5 py-2 bg-amber-50 border-2 border-[#12264B] rounded-xl font-black text-[#12264B]"
                >
                  {workers.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                  🤝 Diserahkan ke Shift Berikutnya
                </label>
                <select
                  value={shiftInfo.workerNext}
                  onChange={(e) => setShiftInfo({ ...shiftInfo, workerNext: e.target.value })}
                  className="w-full px-2.5 py-2 bg-stone-50 border rounded-xl font-bold text-stone-700"
                >
                  {workers.map((w) => (
                    <option key={w.id} value={w.name}>
                      {w.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* ALUR SATU HALAMAN LURUS KE BAWAH (RAMAH JEMPOL HP) */}
            <div className="bg-amber-50 border-2 border-amber-300 rounded-2xl px-3.5 py-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="flex items-center gap-2 text-xs font-black text-[#12264B]">
                <Smartphone className="w-4 h-4 text-[#C81D11] shrink-0" />
                <span>
                  MODE KASIR HANDPHONE (1 HALAMAN LURUS KE BAWAH):
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 text-[11px] font-bold text-stone-700">
                <a
                  href="#bagian-stok"
                  className="bg-white px-2.5 py-1 rounded-lg border border-stone-200 hover:bg-stone-100"
                >
                  1. Stok Akhir
                </a>
                <span>➔</span>
                <a
                  href="#bagian-kasir"
                  className="bg-white px-2.5 py-1 rounded-lg border border-stone-200 hover:bg-stone-100"
                >
                  2. Uang Laci
                </a>
                <span>➔</span>
                <a
                  href="#bagian-dokumen-pdf"
                  className="bg-[#C81D11] text-white px-2.5 py-1 rounded-lg font-black"
                >
                  3. Download / Share PDF
                </a>
              </div>
            </div>

            {/* BAGIAN 1: STOK OPNAME ETALASE (DENGAN KARTU HP & TABEL) */}
            <section id="bagian-stok" className="space-y-3.5">
              <div className="bg-[#12264B] text-white p-3.5 sm:p-4 rounded-2xl border-l-8 border-amber-400 flex flex-col gap-3 shadow-sm">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="bg-amber-400 text-[#12264B] text-[10px] font-black px-2 py-0.5 rounded uppercase">
                      BAGIAN 1 DARI 3
                    </span>
                    <Lock className="w-4 h-4 text-amber-400" />
                    <span className="text-xs sm:text-sm font-black uppercase text-amber-300">
                      1. Stok Opname Etalase ({shiftInfo.date})
                    </span>
                  </div>

                  {/* PILIHAN MODE KARTU HP vs TABEL */}
                  <div className="bg-black/30 p-1 rounded-xl border border-white/15 flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => setWorkerViewStyle('card')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1 transition ${
                        workerViewStyle === 'card'
                          ? 'bg-amber-400 text-[#12264B]'
                          : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      <LayoutGrid className="w-3.5 h-3.5" />
                      <span>📱 Kartu HP</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setWorkerViewStyle('table')}
                      className={`px-2.5 py-1 rounded-lg text-[11px] font-black flex items-center gap-1 transition ${
                        workerViewStyle === 'table'
                          ? 'bg-amber-400 text-[#12264B]'
                          : 'text-stone-300 hover:text-white'
                      }`}
                    >
                      <Table className="w-3.5 h-3.5" />
                      <span>📋 Tabel</span>
                    </button>
                  </div>
                </div>

                {/* FILTER KATEGORI SCROLLABLE DI HP */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                        selectedCategory === cat
                          ? 'bg-amber-400 text-[#12264B] shadow'
                          : 'bg-white/10 text-stone-200 hover:bg-white/20'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {workerViewStyle === 'card' ? (
                /* TAMPILAN KARTU KHUSUS HANDPHONE (RAMAH JEMPOL & TANPA GESER SAMPING) */
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {filteredInventory.map((item) => (
                    <div
                      key={item.id}
                      className={`rounded-2xl p-3.5 border-2 shadow-xs transition space-y-3 ${
                        item.isTampered
                          ? 'bg-rose-50/90 border-rose-400'
                          : item.isInvalidNegative
                          ? 'bg-amber-50 border-amber-400'
                          : 'bg-white border-stone-200'
                      }`}
                    >
                      {/* Baris Atas: Nama Barang & Omzet */}
                      <div className="flex items-start justify-between gap-2 border-b border-stone-100 pb-2.5">
                        <div className="min-w-0">
                          <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded bg-stone-100 text-stone-600">
                            {item.category}
                          </span>
                          <h4 className="font-black text-[#12264B] text-sm mt-1 leading-snug">
                            {item.name}
                          </h4>
                          <div className="text-[11px] text-stone-500 font-semibold">
                            {item.priceSell > 0
                              ? `${formatRupiah(item.priceSell)} / ${item.unit}`
                              : `Kontrol Takaran (${item.unit})`}
                          </div>
                          {item.conversionNote && (
                            <div className="text-[10px] font-bold text-indigo-700 mt-0.5">
                              ⚖️ {item.conversionNote}
                            </div>
                          )}
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-[10px] font-bold text-stone-400 uppercase">
                            Terjual: {item.validSoldQty} {item.unit}
                          </div>
                          <div className="text-sm font-black text-emerald-700">
                            {formatRupiah(item.grossRevenue)}
                          </div>
                        </div>
                      </div>

                      {/* Info Stok Awal Terkunci */}
                      <div className="flex items-center justify-between bg-stone-100/90 px-3 py-2 rounded-xl text-xs">
                        <div className="flex items-center gap-1.5">
                          <Lock className="w-3.5 h-3.5 text-[#12264B]" />
                          <span className="font-bold text-stone-600">Stok Awal Terkunci:</span>
                          <span className="font-black text-[#12264B]">
                            {item.initialStock} {item.unit}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => openCorrectionModal(item)}
                          className="text-[11px] font-black text-[#C81D11] bg-rose-50 px-2 py-0.5 rounded-lg border border-rose-200"
                        >
                          ⚠️ Koreksi
                        </button>
                      </div>

                      {item.isTampered && (
                        <div className="bg-rose-600 text-white text-[11px] font-black px-2.5 py-1.5 rounded-xl flex items-center justify-between">
                          <span>
                            {item.tamperDiff < 0
                              ? `🚨 DIKURANGI (${item.tamperDiff} ${item.unit})`
                              : `⚠️ DILEBIHKAN (+${item.tamperDiff} ${item.unit})`}
                          </span>
                          <span>Kunci: {item.lockedInit}</span>
                        </div>
                      )}

                      {/* Input Utama: STOK AKHIR FISIK (Besar & Mudah Ditekan di HP) */}
                      <div className="bg-amber-50/80 border-2 border-[#12264B] rounded-xl p-2.5 space-y-1.5">
                        <div className="flex items-center justify-between">
                          <label className="text-[11px] font-black text-[#12264B] uppercase">
                            ✍️ Isi Stok Akhir Fisik ({item.unit})
                          </label>
                          {item.isLowStock && (
                            <span className="text-[10px] font-black bg-amber-300 text-amber-950 px-1.5 py-0.5 rounded">
                              Stok Tipis!
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => handleStepStock(item.id, 'finalStock', -1)}
                            className="w-11 h-11 rounded-xl bg-[#12264B] active:scale-95 text-white font-black flex items-center justify-center shadow"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <input
                            type="number"
                            inputMode="numeric"
                            min="0"
                            value={displayNum(item.finalStock)}
                            onFocus={selectAllOnFocus}
                            onChange={(e) =>
                              handleStockChange(item.id, 'finalStock', e.target.value)
                            }
                            className="flex-1 h-11 text-center font-black text-lg text-[#12264B] bg-white border-2 border-stone-300 rounded-xl focus:border-[#C81D11] focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={() => handleStepStock(item.id, 'finalStock', 1)}
                            className="w-11 h-11 rounded-xl bg-[#12264B] active:scale-95 text-white font-black flex items-center justify-center shadow"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Baris Bawah: Masuk Gudang & Jatah/Rusak */}
                      <div className="grid grid-cols-2 gap-2 pt-1 text-xs">
                        <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                            + Masuk Gudang
                          </label>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleStepStock(item.id, 'stockIn', -1)}
                              className="w-7 h-7 rounded-lg bg-stone-200 font-black text-stone-700"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              inputMode="numeric"
                              min="0"
                              value={displayNum(item.stockIn)}
                              onFocus={selectAllOnFocus}
                              onChange={(e) =>
                                handleStockChange(item.id, 'stockIn', e.target.value)
                              }
                              className="w-full text-center font-black py-1 bg-white border rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleStepStock(item.id, 'stockIn', 1)}
                              className="w-7 h-7 rounded-lg bg-stone-200 font-black text-stone-700"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        <div className="bg-stone-50 p-2 rounded-xl border border-stone-200">
                          <label className="block text-[10px] font-bold text-stone-500 uppercase mb-1">
                            Rusak / Jatah
                          </label>
                          <div className="flex items-center gap-1">
                            <button
                              type="button"
                              onClick={() => handleStepStock(item.id, 'wasteOrStaff', -1)}
                              className="w-7 h-7 rounded-lg bg-stone-200 font-black text-stone-700"
                            >
                              -
                            </button>
                            <input
                              type="number"
                              inputMode="numeric"
                              min="0"
                              value={displayNum(item.wasteOrStaff)}
                              onFocus={selectAllOnFocus}
                              onChange={(e) =>
                                handleStockChange(item.id, 'wasteOrStaff', e.target.value)
                              }
                              className="w-full text-center font-black py-1 bg-white border rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => handleStepStock(item.id, 'wasteOrStaff', 1)}
                              className="w-7 h-7 rounded-lg bg-stone-200 font-black text-stone-700"
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                /* TAMPILAN TABEL RINGKAS */
                <div className="bg-white rounded-2xl shadow-sm border border-stone-200 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse text-xs">
                      <thead>
                        <tr className="bg-[#12264B] text-white uppercase text-[10px]">
                          <th className="py-3 px-4">Nama Barang & Harga</th>
                          <th className="py-3 px-3 text-center bg-stone-900 text-amber-300">
                            🔒 Stok Awal (Kunci Shift Lalu)
                          </th>
                          <th className="py-3 px-3 text-center">+ Masuk Gudang</th>
                          <th className="py-3 px-3 text-center bg-amber-500/20 text-amber-200">
                            Stok Akhir Fisik (Wajib Isi)
                          </th>
                          <th className="py-3 px-3 text-center">Rusak / Jatah</th>
                          <th className="py-3 px-3 text-center">Terjual</th>
                          <th className="py-3 px-4 text-right">Omzet Barang</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-200">
                        {filteredInventory.map((item) => (
                          <tr
                            key={item.id}
                            className={`${
                              item.isTampered
                                ? 'bg-rose-50/70'
                                : item.isInvalidNegative
                                ? 'bg-amber-50'
                                : 'hover:bg-stone-50'
                            }`}
                          >
                            <td className="py-3 px-4">
                              <div className="font-black text-[#12264B] text-xs">{item.name}</div>
                              <div className="text-[11px] text-stone-500">
                                {item.priceSell > 0
                                  ? `${formatRupiah(item.priceSell)} / ${item.unit}`
                                  : `Bahan Kontrol (${item.unit})`}
                              </div>
                            </td>

                            <td className="py-3 px-3 text-center bg-stone-100/90">
                              <div className="flex flex-col items-center gap-1">
                                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-stone-200/80 font-black text-stone-800 text-xs">
                                  <Lock className="w-3 h-3 text-stone-600" />
                                  <span>
                                    {item.initialStock} {item.unit}
                                  </span>
                                </div>
                                <button
                                  type="button"
                                  onClick={() => openCorrectionModal(item)}
                                  className="text-[10px] font-bold text-[#C81D11] hover:underline"
                                >
                                  ⚠️ Koreksi Fisik
                                </button>
                              </div>
                            </td>

                            <td className="py-3 px-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={displayNum(item.stockIn)}
                                onFocus={selectAllOnFocus}
                                onChange={(e) =>
                                  handleStockChange(item.id, 'stockIn', e.target.value)
                                }
                                className="w-16 px-2 py-1.5 text-center font-bold border rounded-lg bg-white"
                              />
                            </td>

                            <td className="py-3 px-3 text-center bg-amber-50/60">
                              <input
                                type="number"
                                min="0"
                                value={displayNum(item.finalStock)}
                                onFocus={selectAllOnFocus}
                                onChange={(e) =>
                                  handleStockChange(item.id, 'finalStock', e.target.value)
                                }
                                className="w-20 px-2 py-1.5 text-center font-black text-sm border-2 border-[#12264B] rounded-xl bg-white text-[#12264B]"
                              />
                            </td>

                            <td className="py-3 px-3 text-center">
                              <input
                                type="number"
                                min="0"
                                value={displayNum(item.wasteOrStaff)}
                                onFocus={selectAllOnFocus}
                                onChange={(e) =>
                                  handleStockChange(item.id, 'wasteOrStaff', e.target.value)
                                }
                                className="w-16 px-2 py-1.5 text-center font-bold border rounded-lg bg-white"
                              />
                            </td>

                            <td className="py-3 px-3 text-center">
                              <span className="font-black text-sm text-[#12264B]">
                                {item.validSoldQty} {item.unit}
                              </span>
                            </td>

                            <td className="py-3 px-4 text-right font-black text-[#12264B]">
                              {formatRupiah(item.grossRevenue)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </section>

            {/* BAGIAN 2: REKONSILIASI LACI KASIR & BELANJA */}
            <section id="bagian-kasir" className="space-y-4 pt-2">
              <div className="bg-[#12264B] text-white p-4 rounded-2xl border-l-8 border-[#C81D11] flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-[#C81D11] text-white text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    BAGIAN 2 DARI 3
                  </span>
                  <Wallet className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs sm:text-sm font-black uppercase text-white">
                    2. Rekonsiliasi Laci Kasir & Belanja Harian (Tanggal: {shiftInfo.date})
                  </h3>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
                <div className="lg:col-span-7 bg-white rounded-2xl shadow-sm border border-stone-200 p-5 space-y-4">
                  <h3 className="font-black text-[#12264B] text-base border-b pb-3">
                    Rekonsiliasi Uang Tunai Laci Kasir (Tanggal: {shiftInfo.date})
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="p-3.5 rounded-xl bg-stone-50 border">
                      <label className="block text-[11px] font-bold text-stone-500 uppercase">
                        1. Modal Kembalian Tetap di Laci
                      </label>
                      <input
                        type="number"
                        value={displayNum(initialDrawerModal)}
                        onFocus={selectAllOnFocus}
                        onChange={(e) => setInitialDrawerModal(cleanNumInput(e.target.value))}
                        className="w-full mt-1.5 px-3 py-2 bg-white border rounded-xl font-black text-base text-[#12264B]"
                      />
                    </div>

                    <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-200">
                      <label className="block text-[11px] font-bold text-emerald-800 uppercase">
                        2. Total Omzet dari Stok Terjual
                      </label>
                      <div className="text-xl font-black text-emerald-900 mt-2">
                        {formatRupiah(financialSummary.totalOmzetStok)}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-sky-50 border border-sky-200">
                      <label className="block text-[11px] font-bold text-sky-900 uppercase">
                        3. Sisa Tagihan Non-Tunai (Otomatis Dicek di QRIS Owner)
                      </label>
                      <div className="text-lg font-black text-sky-900 mt-1">
                        {formatRupiah(financialSummary.impliedQrisFromCashGap)}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-amber-50 border-2 border-[#12264B]">
                      <label className="block text-[11px] font-black text-[#12264B] uppercase">
                        4. Total Uang Tunai Fisik Aktual di Laci
                      </label>
                      <input
                        type="number"
                        value={displayNum(actualDrawerCash)}
                        onFocus={selectAllOnFocus}
                        onChange={(e) => setActualDrawerCash(cleanNumInput(e.target.value))}
                        className="w-full mt-1.5 px-3 py-2 bg-white border-2 border-[#12264B] rounded-xl font-black text-base text-[#C81D11]"
                      />
                    </div>
                  </div>

                  <div className="bg-[#12264B] text-white p-4 rounded-xl flex items-center justify-between">
                    <div>
                      <div className="text-xs text-amber-300 font-bold uppercase">
                        Wajib Masuk Amplop Brankas Drop-Box Shift Ini:
                      </div>
                      <div className="text-[11px] text-stone-300">
                        Uang Aktual Laci ({formatRupiah(actualDrawerCash)}) - Modal Laci (
                        {formatRupiah(initialDrawerModal)})
                      </div>
                    </div>
                    <div className="text-xl font-black text-amber-300">
                      {formatRupiah(financialSummary.dropBoxEnvelopeAmount)}
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 bg-white rounded-2xl shadow-sm border border-stone-200 p-5 space-y-4">
                  <h3 className="font-black text-[#12264B] text-base border-b pb-3">
                    Belanja Kasir Harian / Petty Cash (Pakai Uang Laci)
                  </h3>
                  <form onSubmit={handleAddExpense} className="space-y-2.5">
                    <input
                      type="text"
                      placeholder="Contoh: Beli Es Batu / Isi Galon / Beli Telur Dadakan"
                      value={newExpDesc}
                      onChange={(e) => setNewExpDesc(e.target.value)}
                      className="w-full px-3 py-2 border rounded-xl text-xs"
                    />
                    <div className="flex gap-2">
                      <input
                        type="number"
                        placeholder="Nominal (Rp)"
                        value={displayNum(newExpAmount)}
                        onFocus={selectAllOnFocus}
                        onChange={(e) => setNewExpAmount(cleanNumInput(e.target.value))}
                        className="flex-1 px-3 py-2 border rounded-xl text-xs font-bold"
                      />
                      <button
                        type="submit"
                        className="bg-[#C81D11] text-white px-4 py-2 rounded-xl text-xs font-black"
                      >
                        + Catat
                      </button>
                    </div>
                  </form>

                  <div className="divide-y text-xs">
                    {expenses.map((exp) => (
                      <div key={exp.id} className="py-2 flex items-center justify-between">
                        <span>{exp.description}</span>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-rose-700">
                            {formatRupiah(exp.amount)}
                          </span>
                          <button
                            onClick={() => handleRemoveExpense(exp.id)}
                            className="text-stone-400 hover:text-rose-600"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* BAGIAN 3: DOKUMEN RESMI PENUTUPAN SHIFT (WORD KE PDF & BAGIKAN KE WA TANPA FORMAT CODING) */}
            <section id="bagian-dokumen-pdf" className="space-y-4 pt-2">
              <div className="bg-emerald-900 text-white p-4 rounded-2xl border-l-8 border-emerald-400 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-2">
                  <span className="bg-emerald-400 text-stone-950 text-[10px] font-black px-2 py-0.5 rounded uppercase">
                    BAGIAN 3 DARI 3 (PENUTUPAN SHIFT)
                  </span>
                  <FileDown className="w-4 h-4 text-emerald-300" />
                  <h3 className="text-xs sm:text-sm font-black uppercase text-white">
                    3. Unduh & Bagikan File PDF Laporan Tutup Shift (Auto Ganti Tanggal)
                  </h3>
                </div>
              </div>

              <div className="bg-white rounded-2xl shadow-md border-2 border-[#12264B] p-4 sm:p-6 space-y-5">
                {/* Kartu Pratinjau Identitas Dokumen PDF Resmi (Tanpa Teks Coding) */}
                <div className="bg-gradient-to-r from-[#12264B] to-[#1d396e] text-white rounded-2xl p-4 sm:p-5 border-2 border-[#C81D11] flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-3.5">
                    <div className="w-12 h-14 rounded-xl bg-white text-[#C81D11] flex flex-col items-center justify-center shrink-0 shadow-md border-2 border-[#C81D11]">
                      <FileText className="w-6 h-6" />
                      <span className="text-[9px] font-black uppercase tracking-tighter">
                        WORD ➔ PDF
                      </span>
                    </div>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="bg-amber-400 text-[#12264B] text-[10px] font-black px-2 py-0.5 rounded uppercase">
                          Dokumen Resmi Siap Unduh
                        </span>
                        <span className="text-xs text-emerald-300 font-bold">
                          • Otomatis Lanjut ke Tanggal {getNextDateStr(shiftInfo.date, 1)}
                        </span>
                      </div>
                      <h4 className="text-sm sm:text-base font-black text-white break-all">
                        Laporan_Shift_Warkop_Sumber_Redjeki_{shiftInfo.date}_{shiftInfo.workerCurrent.replace(/\s+/g, '_')}.pdf
                      </h4>
                      <p className="text-xs text-stone-200">
                        Berisi Kop Surat Resmi <strong>Warkop Sumber Redjeki (生计来源)</strong>, Tabel Stok Opname Terkunci, Rekonsiliasi Kasir, Nota Belanja Harian, dan Kolom Tanda Tangan Serah Terima Shift.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-black/25 p-3 rounded-xl border border-white/15 shrink-0 text-xs">
                    <div>
                      <div className="text-[10px] text-stone-300 uppercase">Total Omzet</div>
                      <div className="font-black text-amber-300">
                        {formatRupiah(financialSummary.totalOmzetStok)}
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] text-stone-300 uppercase">Amplop Brankas</div>
                      <div className="font-black text-emerald-300">
                        {formatRupiah(financialSummary.dropBoxEnvelopeAmount)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Tombol Utama Download PDF, Share PDF ke Grup WA & Download Word */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5">
                  <button
                    type="button"
                    onClick={() => handleDownloadShiftPdfAndAdvance(true, null)}
                    className="w-full py-4 px-4 bg-[#C81D11] hover:bg-[#a6170d] active:scale-[0.99] text-white font-black rounded-2xl text-xs sm:text-sm shadow-lg flex flex-col items-center justify-center gap-1.5 border-2 border-amber-300/40 transition"
                  >
                    <div className="flex items-center gap-2">
                      <FileDown className="w-5 h-5 text-amber-300 shrink-0" />
                      <span>📥 Download PDF & Kunci Shift</span>
                    </div>
                    <span className="text-[10px] font-semibold text-amber-100">
                      Unduh File .PDF + Otomatis Ganti ke {getNextDateStr(shiftInfo.date, 1)}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleShareShiftPdfToWA}
                    className="w-full py-4 px-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-black rounded-2xl text-xs sm:text-sm shadow-lg flex flex-col items-center justify-center gap-1.5 border-2 border-emerald-300/40 transition"
                  >
                    <div className="flex items-center gap-2">
                      <Share2 className="w-5 h-5 text-amber-200 shrink-0" />
                      <span>📲 Bagikan File PDF ke Grup WA</span>
                    </div>
                    <span className="text-[10px] font-semibold text-emerald-100">
                      Kirim Dokumen .PDF ke WhatsApp + Auto Ganti Tanggal
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDownloadWordDoc}
                    className="w-full py-4 px-4 bg-[#12264B] hover:bg-[#1b386b] active:scale-[0.99] text-white font-black rounded-2xl text-xs sm:text-sm shadow-md flex flex-col items-center justify-center gap-1.5 border border-stone-300 transition"
                  >
                    <div className="flex items-center gap-2">
                      <FileText className="w-5 h-5 text-amber-300 shrink-0" />
                      <span>📄 Download Format Word (.doc)</span>
                    </div>
                    <span className="text-[10px] font-semibold text-stone-300">
                      Buka di Aplikasi Microsoft Word Terlebih Dahulu
                    </span>
                  </button>
                </div>

                {lastGeneratedDocInfo && (
                  <div className="bg-emerald-50 border border-emerald-300 rounded-xl p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-emerald-950">
                    <div className="flex items-center gap-2 font-bold">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>
                        Dokumen terakhir berhasil dibuat: <strong>{lastGeneratedDocInfo.fileName}</strong> ({lastGeneratedDocInfo.time} WIB)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleDownloadShiftPdfAndAdvance(false, null)}
                      className="text-[#12264B] font-black underline self-start sm:self-center"
                    >
                      Unduh Ulang PDF
                    </button>
                  </div>
                )}
              </div>
            </section>

            {/* STICKY BOTTOM BAR KHUSUS HANDPHONE UNTUK PEKERJA KASIR */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#12264B] text-white border-t-2 border-[#C81D11] px-3 py-2 shadow-2xl flex items-center justify-between gap-2">
              <div className="min-w-0">
                <div className="text-[10px] text-amber-300 font-bold truncate">
                  Omzet: {formatRupiah(financialSummary.totalOmzetStok)}
                </div>
                <div className="text-xs font-black text-white truncate">
                  Brankas: {formatRupiah(financialSummary.dropBoxEnvelopeAmount)}
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0">
                <button
                  type="button"
                  onClick={() => handleDownloadShiftPdfAndAdvance(true, null)}
                  className="bg-[#C81D11] text-white px-3 py-2 rounded-xl text-[11px] font-black flex items-center gap-1 shadow"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>PDF</span>
                </button>
                <button
                  type="button"
                  onClick={handleShareShiftPdfToWA}
                  className="bg-emerald-600 text-white px-3 py-2 rounded-xl text-[11px] font-black flex items-center gap-1 shadow"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>Share WA</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}