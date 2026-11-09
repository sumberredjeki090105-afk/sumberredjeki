import React, { useState, useMemo, useEffect, useRef } from 'react';

// ============================================================================
// MESIN SINKRONISASI CLOUD MULTI-PERANGKAT (ZERO-DEPENDENCY UNTUK VITE & VERCEL)
// Tidak butuh `npm install firebase` — langsung jalan di vite.new/react & Vercel!
// ============================================================================
const CLOUD_TOPIC_SYNC = 'wsr_cibiru_sync_v16_stream';
const CLOUD_KV_URL = 'https://keyvalue.immanuel.co/api/KeyVal';
const CLOUD_KV_APP_KEY = '49f9p2x8'; // Kunci ruang penyimpanan publik Warkop

// ============================================================================
// LOGO RESMI WARKOP SUMBER REDJEKI (生计来源) - RUKO RAOSEUN CIBIRU BANDUNG
// ============================================================================
const DEFAULT_WARKOP_LOGO = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 500" width="100%" height="100%">
  <rect width="800" height="500" fill="#FCFBF9"/>
  <rect x="44" y="36" width="712" height="428" fill="none" stroke="#8B1E1E" stroke-width="5"/>
  <text x="400" y="165" text-anchor="middle" fill="#0B224C" font-family="Georgia, 'Times New Roman', serif" font-weight="900" font-size="60" letter-spacing="3">WARKOP</text>
  <text x="400" y="255" text-anchor="middle" fill="#D11919" font-family="Georgia, 'Times New Roman', serif" font-weight="900" font-size="64" letter-spacing="1.5">SUMBER REDJEKI</text>
  <text x="400" y="335" text-anchor="middle" fill="#0B224C" font-family="'Microsoft YaHei', 'SimHei', sans-serif" font-weight="700" font-size="44" letter-spacing="6">生计来源</text>
  <text x="400" y="410" text-anchor="middle" fill="#8B1E1E" font-family="Georgia, 'Times New Roman', serif" font-weight="600" font-size="22" letter-spacing="3">RUKO RAOSEUN - CIBIRU - BANDUNG</text>
</svg>
`)}`;

// ============================================================================
// MASTER DATA 50 MENU & BAHAN BAKU DARI HPP WARKOP FIX.XLSX + BAHAN DAPUR
// ============================================================================
const INITIAL_INVENTORY = [
  // --- A. MENU RACIKAN / CAMPURAN (OTOMATIS POTONG STOK BAHAN BAKU) ---
  {
    id: 'm-1',
    no: 1,
    name: 'Nasi Telor',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 3100,
    cost: 3100,
    price: 10000,
    profit: 6900,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
    ],
  },
  {
    id: 'm-2',
    no: 2,
    name: 'Nasi Telor Sosis',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 4100,
    cost: 4100,
    price: 12000,
    profit: 7900,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
      { ingredientId: 'b-sosis', qty: 1 },
    ],
  },
  {
    id: 'm-3',
    no: 3,
    name: 'Nasi Telor Kornet',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 5500,
    cost: 5500,
    price: 14000,
    profit: 8500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
      { ingredientId: 'b-kornet', qty: 1 },
    ],
  },
  {
    id: 'm-4',
    no: 4,
    name: 'Nasi Omlet (1/2 Mie)',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 6000,
    cost: 6000,
    price: 13000,
    profit: 7000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
      { ingredientId: 'm-17', qty: 0.5 },
    ],
  },
  {
    id: 'm-5',
    no: 5,
    name: 'Nasi Omlet Sosis',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 7000,
    cost: 7000,
    price: 14000,
    profit: 7000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
      { ingredientId: 'm-17', qty: 0.5 },
      { ingredientId: 'b-sosis', qty: 1 },
    ],
  },
  {
    id: 'm-6',
    no: 6,
    name: 'Nasi Omlet Nugget',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 7500,
    cost: 7500,
    price: 14000,
    profit: 6500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
      { ingredientId: 'm-17', qty: 0.5 },
      { ingredientId: 'b-nugget', qty: 1 },
    ],
  },
  {
    id: 'm-7',
    no: 7,
    name: 'Nasi Orak Arik',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 4000,
    cost: 4000,
    price: 11000,
    profit: 7000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
    ],
  },
  {
    id: 'm-8',
    no: 8,
    name: 'Nasi Orak Arik Telor',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 5000,
    cost: 5000,
    price: 13000,
    profit: 8000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 2 },
    ],
  },
  {
    id: 'm-9',
    no: 9,
    name: 'Nasi Orak Arik Sosis',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 5500,
    cost: 5500,
    price: 13000,
    profit: 7500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
      { ingredientId: 'b-sosis', qty: 1 },
    ],
  },
  {
    id: 'm-10',
    no: 10,
    name: 'Nasi Orak Arik Kornet',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 6000,
    cost: 6000,
    price: 14000,
    profit: 8000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
      { ingredientId: 'b-kornet', qty: 1 },
    ],
  },
  {
    id: 'm-11',
    no: 11,
    name: 'Nasi Orak Arik Omlet',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 8000,
    cost: 8000,
    price: 14000,
    profit: 6000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 2 },
      { ingredientId: 'm-17', qty: 0.5 },
    ],
  },
  {
    id: 'm-12',
    no: 12,
    name: 'Nasi Orak Arik Nugget',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 5500,
    cost: 5500,
    price: 14000,
    profit: 8500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
      { ingredientId: 'b-nugget', qty: 1 },
    ],
  },
  {
    id: 'm-13',
    no: 13,
    name: 'Nasi Goreng Telor',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 4000,
    cost: 4000,
    price: 13000,
    profit: 9000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
    ],
  },
  {
    id: 'm-14',
    no: 14,
    name: 'Nasi Goreng Sosis',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 4000,
    cost: 4000,
    price: 13000,
    profit: 9000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-sosis', qty: 1 },
    ],
  },
  {
    id: 'm-15',
    no: 15,
    name: 'Nasi Goreng Nugget',
    category: 'Menu Nasi (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 4500,
    cost: 4500,
    price: 13000,
    profit: 8500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'b-nasi', qty: 1 },
      { ingredientId: 'b-nugget', qty: 1 },
    ],
  },
  {
    id: 'm-18',
    no: 18,
    name: 'Indomie Telor',
    category: 'Menu Mie (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 4500,
    cost: 4500,
    price: 10000,
    profit: 5500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'm-17', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
    ],
  },
  {
    id: 'm-19',
    no: 19,
    name: 'Indomie Sosis',
    category: 'Menu Mie (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 4000,
    cost: 4000,
    price: 12000,
    profit: 8000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'm-17', qty: 1 },
      { ingredientId: 'b-sosis', qty: 1 },
    ],
  },
  {
    id: 'm-20',
    no: 20,
    name: 'Indomie Kornet',
    category: 'Menu Mie (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 5500,
    cost: 5500,
    price: 12000,
    profit: 6500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'm-17', qty: 1 },
      { ingredientId: 'b-kornet', qty: 1 },
    ],
  },
  {
    id: 'm-21',
    no: 21,
    name: 'Indomie Special',
    category: 'Menu Mie (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 7500,
    cost: 7500,
    price: 15000,
    profit: 7500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'm-17', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
      { ingredientId: 'b-kornet', qty: 1 },
    ],
  },
  {
    id: 'm-22',
    no: 22,
    name: 'Mie Nyemek',
    category: 'Menu Mie (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 5500,
    cost: 5500,
    price: 11000,
    profit: 5500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'm-16', qty: 1 },
      { ingredientId: 'b-telor', qty: 1 },
    ],
  },
  {
    id: 'm-23',
    no: 23,
    name: 'Indomie Cuankie',
    category: 'Menu Mie (Racikan)',
    unit: 'Porsi',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 7000,
    cost: 7000,
    price: 15000,
    profit: 8000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [{ ingredientId: 'm-16', qty: 1 }],
  },
  {
    id: 'm-28',
    no: 28,
    name: 'Es Teh Manis',
    category: 'Minuman Racikan',
    unit: 'Gelas',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 1000,
    cost: 1000,
    price: 5000,
    profit: 4000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-49',
    no: 49,
    name: 'Extra Joss Susu (JOSU)',
    category: 'Minuman Racikan',
    unit: 'Gelas',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 2700,
    cost: 2700,
    price: 7000,
    profit: 4300,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'm-47', qty: 1 },
      { ingredientId: 'm-29', qty: 1 },
    ],
  },
  {
    id: 'm-50',
    no: 50,
    name: 'Kukubima Susu (KUSU)',
    category: 'Minuman Racikan',
    unit: 'Gelas',
    isMenuCombo: true,
    packCost: 0,
    baseUnitCost: 2700,
    cost: 2700,
    price: 7000,
    profit: 4300,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 0,
    targetStock: 0,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [
      { ingredientId: 'm-48', qty: 1 },
      { ingredientId: 'm-29', qty: 1 },
    ],
  },

  // --- B. STOK FISIK ETALASE & BAHAN BAKU DAPUR (ADA STOK AWAL & STOK AKHIR) ---
  {
    id: 'm-16',
    no: 16,
    name: 'Indomie Kuah',
    category: 'Stok Mie & Makanan',
    unit: 'Bungkus',
    isMenuCombo: false,
    packCost: 114000,
    baseUnitCost: 2850,
    cost: 3000,
    price: 7000,
    profit: 4000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 10,
    targetStock: 40,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-17',
    no: 17,
    name: 'Indomie Goreng',
    category: 'Stok Mie & Makanan',
    unit: 'Bungkus',
    isMenuCombo: false,
    packCost: 118500,
    baseUnitCost: 2963,
    cost: 3000,
    price: 7000,
    profit: 4000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 10,
    targetStock: 40,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-24',
    no: 24,
    name: 'Pempek',
    category: 'Cemilan & Gorengan',
    unit: 'Porsi',
    isMenuCombo: false,
    packCost: 0,
    baseUnitCost: 0,
    cost: 0,
    price: 15000,
    profit: 15000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-25',
    no: 25,
    name: 'Kentang Goreng',
    category: 'Cemilan & Gorengan',
    unit: 'Porsi',
    isMenuCombo: false,
    packCost: 0,
    baseUnitCost: 0,
    cost: 0,
    price: 8000,
    profit: 8000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-26',
    no: 26,
    name: 'Sosis Goreng (Per 4 Pcs)',
    category: 'Cemilan & Gorengan',
    unit: 'Porsi',
    isMenuCombo: false,
    packCost: 16000,
    baseUnitCost: 667,
    cost: 2700,
    price: 8000,
    profit: 5300,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 24,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-27',
    no: 27,
    name: 'Otak Otak (Per 4 Pcs)',
    category: 'Cemilan & Gorengan',
    unit: 'Porsi',
    isMenuCombo: false,
    packCost: 5000,
    baseUnitCost: 0,
    cost: 0,
    price: 8000,
    profit: 8000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-29',
    no: 29,
    name: 'Susu Bendera Putih',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 8500,
    baseUnitCost: 1417,
    cost: 1500,
    price: 5000,
    profit: 3500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 6,
    targetStock: 24,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-30',
    no: 30,
    name: 'Susu Bendera Coklat',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 8500,
    baseUnitCost: 1417,
    cost: 1500,
    price: 5000,
    profit: 3500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 6,
    targetStock: 24,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-31',
    no: 31,
    name: 'Energen',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 20500,
    baseUnitCost: 2050,
    cost: 2200,
    price: 6000,
    profit: 3800,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-32',
    no: 32,
    name: 'Dancow Coklat',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 37000,
    baseUnitCost: 3700,
    cost: 3800,
    price: 8000,
    profit: 4200,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-33',
    no: 33,
    name: 'Dancow Putih',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 37000,
    baseUnitCost: 3700,
    cost: 3800,
    price: 8000,
    profit: 4200,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-34',
    no: 34,
    name: 'Milo',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 19500,
    baseUnitCost: 1950,
    cost: 2100,
    price: 7000,
    profit: 4900,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-35',
    no: 35,
    name: 'Hillo',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 21000,
    baseUnitCost: 2100,
    cost: 2200,
    price: 7000,
    profit: 4800,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-36',
    no: 36,
    name: 'Benk Benk Drink',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 23000,
    baseUnitCost: 2300,
    cost: 2400,
    price: 7000,
    profit: 4600,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-37',
    no: 37,
    name: 'Chocolatos',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 21000,
    baseUnitCost: 2100,
    cost: 2200,
    price: 7000,
    profit: 4800,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-38',
    no: 38,
    name: 'Good Day',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 15000,
    baseUnitCost: 1500,
    cost: 1600,
    price: 5000,
    profit: 3400,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-39',
    no: 39,
    name: 'Good Day Freeze',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 23000,
    baseUnitCost: 2300,
    cost: 2400,
    price: 7000,
    profit: 4600,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-40',
    no: 40,
    name: 'ABC Klepon',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 21000,
    baseUnitCost: 2100,
    cost: 2200,
    price: 7000,
    profit: 4800,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-41',
    no: 41,
    name: 'Kapal Api Mix',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 17000,
    baseUnitCost: 1700,
    cost: 1800,
    price: 5000,
    profit: 3200,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-42',
    no: 42,
    name: 'Indocafe Coffeemix',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 22000,
    baseUnitCost: 2200,
    cost: 2300,
    price: 5000,
    profit: 2700,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-43',
    no: 43,
    name: 'Kopi ABC',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 17000,
    baseUnitCost: 1700,
    cost: 1800,
    price: 5000,
    profit: 3200,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-44',
    no: 44,
    name: 'Nutrisari',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 14500,
    baseUnitCost: 1450,
    cost: 1550,
    price: 5000,
    profit: 3450,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-45',
    no: 45,
    name: 'Maxtea Teh Tarik',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 23000,
    baseUnitCost: 2300,
    cost: 2400,
    price: 6000,
    profit: 3600,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-46',
    no: 46,
    name: 'Maxtea Lemon Tea',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 15000,
    baseUnitCost: 1500,
    cost: 1600,
    price: 6000,
    profit: 4400,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-47',
    no: 47,
    name: 'Extra Joss (Murni/Saset)',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 14500,
    baseUnitCost: 1209,
    cost: 1300,
    price: 6000,
    profit: 4700,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 6,
    targetStock: 24,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'm-48',
    no: 48,
    name: 'Kukubima (Murni/Saset)',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 7500,
    baseUnitCost: 1250,
    cost: 1350,
    price: 6000,
    profit: 4650,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 6,
    targetStock: 24,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },

  // --- C. BAHAN BAKU DAPUR (DIPOTONG OTOMATIS OLEH MENU NASI/MIE RACIKAN) ---
  {
    id: 'b-nasi',
    no: 51,
    name: 'Beras / Nasi Putih (Porsi Dapur)',
    category: 'Bahan Baku Dapur',
    unit: 'Porsi',
    isMenuCombo: false,
     isRawIngredientOnly: true,
    packCost: 75000,
    baseUnitCost: 1500,
    cost: 1500,
    price: 4000,
    profit: 2500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 10,
    targetStock: 50,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'b-telor',
    no: 52,
    name: 'Telur Ayam Mentah (Bahan Dapur)',
    category: 'Bahan Baku Dapur',
    unit: 'Butir',
    isMenuCombo: false,
    isRawIngredientOnly: true,
    packCost: 48000,
    baseUnitCost: 1600,
    cost: 1600,
    price: 3000,
    profit: 1400,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 10,
    targetStock: 30,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'b-sosis',
    no: 53,
    name: 'Sosis Satuan (Bahan Campuran)',
    category: 'Bahan Baku Dapur',
    unit: 'Pcs',
    isMenuCombo: false,
    isRawIngredientOnly: true,
    packCost: 16000,
    baseUnitCost: 667,
    cost: 1000,
    price: 2000,
    profit: 1000,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 8,
    targetStock: 24,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'b-kornet',
    no: 54,
    name: 'Kornet Sapi (Takaran Porsi)',
    category: 'Bahan Baku Dapur',
    unit: 'Porsi',
    isMenuCombo: false,
    isRawIngredientOnly: true,
    packCost: 24000,
    baseUnitCost: 2400,
    cost: 2400,
    price: 4000,
    profit: 1600,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
  {
    id: 'b-nugget',
    no: 55,
    name: 'Nugget Ayam (Takaran Porsi)',
    category: 'Bahan Baku Dapur',
    unit: 'Porsi',
    isMenuCombo: false,
    isRawIngredientOnly: true,
    packCost: 25000,
    baseUnitCost: 1500,
    cost: 1500,
    price: 3000,
    profit: 1500,
    soldToday: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockIn: 0,
    stockWaste: 0,
    stockEnd: 0,
    recipe: [],
  },
];

const INITIAL_SINKING_FUNDS = [
  {
    id: 'sf-ruko',
    name: 'Tabungan Sewa Ruko Raoseun Cibiru',
    dailyDeposit: 50000,
    targetMonthly: 1500000,
  },
  {
    id: 'sf-listrik',
    name: 'Listrik Token, Air & Wi-Fi Warkop',
    dailyDeposit: 25000,
    targetMonthly: 750000,
  },
  {
    id: 'sf-alat',
    name: 'Cadangan Peremajaan Alat Dapur & Kasir',
    dailyDeposit: 10000,
    targetMonthly: 300000,
  },
];

const INITIAL_WORKERS = [
  { id: 'w-tatan', name: 'Tatan', role: 'Kasir & Barista Shift Pagi', dailyRate: 0, bonusShift: 0 },
  { id: 'w-rian', name: 'Rian', role: 'Kasir & Dapur Shift Malam', dailyRate: 0, bonusShift: 0 },
];

const formatRp = (num) => {
  const n = Math.round(Number(num) || 0);
  return 'Rp ' + n.toLocaleString('id-ID');
};

const formatQty = (num) => {
  const n = Number(num) || 0;
  return Number.isInteger(n) ? String(n) : n.toFixed(1).replace('.0', '');
};

// ============================================================================
// KOMPONEN UTAMA APLIKASI WARKOP SUMBER REDJEKI
// ============================================================================
export default function App() {
  const STORAGE_KEY = 'wsr_v15_realtime_cloud_master';
  const STORE_DOC_ID = 'SUMBER-REDJEKI-CIBIRU';

  const clientDeviceId = useRef(
    'DEV-' + Math.random().toString(36).substring(2, 8).toUpperCase()
  );
  const deviceLabel = useMemo(() => {
    if (typeof navigator === 'undefined') return 'Perangkat';
    const ua = navigator.userAgent || '';
    const isMobile = /Android|iPhone|iPad|Mobile/i.test(ua);
    return isMobile ? '📱 HP Kasir/Owner' : '💻 Laptop/PC';
  }, []);

  const loadSaved = () => {
    try {
      const raw =
        localStorage.getItem(STORAGE_KEY) ||
        localStorage.getItem('wsr_v14_realtime_cloud_master') ||
        localStorage.getItem('wsr_v13_combo_bom_master');
      if (!raw) return null;
      return JSON.parse(raw);
    } catch (e) {
      return null;
    }
  };

  const saved = useMemo(() => loadSaved(), []);

  // State Cloud Sync Real-Time (Bebas Paket Eksternal)
  const [lastSyncedAt, setLastSyncedAt] = useState('');
  const [lastUpdatedByDevice, setLastUpdatedByDevice] = useState('Lokal');
  const isApplyingRemoteUpdate = useRef(false);
  const lastAppliedTimestamp = useRef(saved?.updatedAt || 0);
  const syncDebounceTimer = useRef(null);

  // State Utama
  const [portalMode, setPortalMode] = useState('pekerja'); // 'pekerja' | 'owner'
  const [ownerAuthenticated, setOwnerAuthenticated] = useState(false);
  const [pinInput, setPinInput] = useState('');
  const [ownerPin, setOwnerPin] = useState(saved?.ownerPin || '1234');
  const [ownerRecoveryWord, setOwnerRecoveryWord] = useState(saved?.ownerRecoveryWord || 'RAOSEUN');
  const [ownerTab, setOwnerTab] = useState('audit'); // 'audit' | 'gudang' | 'pekerja' | 'labarugi'

  // Modal Ubah Sandi Owner
  const [showChangePinModal, setShowChangePinModal] = useState(false);
  const [oldPinField, setOldPinField] = useState('');
  const [newPinField, setNewPinField] = useState('');
  const [confirmPinField, setConfirmPinField] = useState('');
  const [recoveryWordField, setRecoveryWordField] = useState('');
  const [useRecoveryMode, setUseRecoveryMode] = useState(false);
  const [pinModalMessage, setPinModalMessage] = useState({ type: '', text: '' });

  // Shift & Pekerja
  const todayStr = new Date().toISOString().slice(0, 10);
  const [selectedDate, setSelectedDate] = useState(saved?.selectedDate || todayStr);
  const [selectedShift, setSelectedShift] = useState(saved?.selectedShift || 'Shift 1 (Pagi)');
  const [workers, setWorkers] = useState(saved?.workers || INITIAL_WORKERS);
  const [activeWorkerId, setActiveWorkerId] = useState(saved?.activeWorkerId || 'w-tatan');
  const [newWorkerName, setNewWorkerName] = useState('');
  const [newWorkerRole, setNewWorkerRole] = useState('Kasir & Barista');
  const [newWorkerRate, setNewWorkerRate] = useState(0);

  // Inventaris & Pencarian
  const [inventory, setInventory] = useState(saved?.inventory || INITIAL_INVENTORY);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [mobileViewMode, setMobileViewMode] = useState('cards'); // 'cards' | 'table'

  // Modal Tambah/Edit Barang & Resep Otomatis (Khusus Owner)
  const [showItemModal, setShowItemModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [itemForm, setItemForm] = useState({
    name: '',
    category: 'Minuman Saset (Etalase)',
    unit: 'Saset',
    isMenuCombo: false,
    packCost: 0,
    baseUnitCost: 0,
    cost: 0,
    price: 0,
    warehouseStock: 0,
    minStock: 5,
    targetStock: 20,
    stockStart: 0,
    stockEnd: 0,
    recipe: [],
  });

  // Laci Kasir & Belanja Harian
  const [openingCash, setOpeningCash] = useState(saved?.openingCash ?? 0);
  const [actualDrawerCash, setActualDrawerCash] = useState(saved?.actualDrawerCash ?? 0);
  const [qrisMutation, setQrisMutation] = useState(saved?.qrisMutation ?? 0);
  const [expenses, setExpenses] = useState(saved?.expenses || []);
  const [expenseDesc, setExpenseDesc] = useState('');
  const [expenseAmount, setExpenseAmount] = useState('');

  // Log Segel Stok Awal & Riwayat Shift
  const [tamperLogs, setTamperLogs] = useState(saved?.tamperLogs || []);
  const [tamperModalItem, setTamperModalItem] = useState(null);
  const [newStartValue, setNewStartValue] = useState(0);
  const [tamperReason, setTamperReason] = useState('');
  const [shiftHistory, setShiftHistory] = useState(saved?.shiftHistory || []);
  const [attendanceLogs, setAttendanceLogs] = useState(saved?.attendanceLogs || []);
  const [sinkingFunds, setSinkingFunds] = useState(() => {
    if (
      Array.isArray(saved?.sinkingFunds) &&
      saved.sinkingFunds.length > 0 &&
      saved.sinkingFunds.some((sf) => Number(sf.targetMonthly) > 0)
    ) {
      return saved.sinkingFunds.map((sf) => ({
        ...sf,
        dailyDeposit:
          sf.dailyDeposit !== undefined
            ? Number(sf.dailyDeposit)
            : Math.round((Number(sf.targetMonthly) || 0) / 30),
        targetMonthly: Number(sf.targetMonthly) || 0,
      }));
    }
    return INITIAL_SINKING_FUNDS;
  });
  const [monthlyRent, setMonthlyRent] = useState(saved?.monthlyRent ?? 0);

  // Google Sheets Webhook & Cloud Sync
  const [gsWebhookUrl, setGsWebhookUrl] = useState(saved?.gsWebhookUrl || '');
  const [showCloudModal, setShowCloudModal] = useState(false);
  const [cloudStatus, setCloudStatus] = useState('Menghubungkan Cloud...');
  const [toastMsg, setToastMsg] = useState('');
  const [customLogo, setCustomLogo] = useState(saved?.customLogo || DEFAULT_WARKOP_LOGO);
  const logoInputRef = useRef(null);

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 4200);
  };

  const activeWorker = useMemo(() => {
    return (
      workers.find((w) => w.id === activeWorkerId) ||
      workers[0] || { id: 'w-1', name: 'Pekerja' }
    );
  }, [workers, activeWorkerId]);

  const applyRemoteSnapshot = (remoteData, sourceLabel = 'Cloud') => {
    if (!remoteData || typeof remoteData !== 'object') return;
    isApplyingRemoteUpdate.current = true;
    try {
      if (remoteData.ownerPin) setOwnerPin(remoteData.ownerPin);
      if (remoteData.ownerRecoveryWord) setOwnerRecoveryWord(remoteData.ownerRecoveryWord);
      if (remoteData.selectedDate) setSelectedDate(remoteData.selectedDate);
      if (remoteData.selectedShift) setSelectedShift(remoteData.selectedShift);
      if (Array.isArray(remoteData.workers) && remoteData.workers.length > 0) {
        setWorkers(remoteData.workers);
      }
      if (remoteData.activeWorkerId) setActiveWorkerId(remoteData.activeWorkerId);
      if (remoteData.inventoryJson) {
        try {
          const parsedInv = JSON.parse(remoteData.inventoryJson);
          if (Array.isArray(parsedInv) && parsedInv.length > 0) setInventory(parsedInv);
        } catch (e) {
          // ignore
        }
      } else if (Array.isArray(remoteData.inventory) && remoteData.inventory.length > 0) {
        setInventory(remoteData.inventory);
      }
      if (remoteData.openingCash !== undefined) setOpeningCash(Number(remoteData.openingCash) || 0);
      if (remoteData.actualDrawerCash !== undefined) {
        setActualDrawerCash(Number(remoteData.actualDrawerCash) || 0);
      }
      if (remoteData.qrisMutation !== undefined) setQrisMutation(Number(remoteData.qrisMutation) || 0);
      if (Array.isArray(remoteData.expenses)) setExpenses(remoteData.expenses);
      if (Array.isArray(remoteData.tamperLogs)) setTamperLogs(remoteData.tamperLogs);
      if (Array.isArray(remoteData.shiftHistory)) setShiftHistory(remoteData.shiftHistory);
      if (Array.isArray(remoteData.attendanceLogs)) setAttendanceLogs(remoteData.attendanceLogs);
      if (Array.isArray(remoteData.sinkingFunds)) setSinkingFunds(remoteData.sinkingFunds);
      if (remoteData.monthlyRent !== undefined) setMonthlyRent(Number(remoteData.monthlyRent) || 0);
      if (remoteData.gsWebhookUrl !== undefined) setGsWebhookUrl(remoteData.gsWebhookUrl);

      const ts = Number(remoteData.updatedAt) || Date.now();
      lastAppliedTimestamp.current = ts;
      setLastSyncedAt(new Date(ts).toLocaleTimeString('id-ID'));
      setLastUpdatedByDevice(remoteData.updatedByDevice || sourceLabel);
    } finally {
      setTimeout(() => {
        isApplyingRemoteUpdate.current = false;
      }, 350);
    }
  };

  // ============================================================================
  // LISTENER CLOUD REAL-TIME ANTAR-HP & LAPTOP (SSE + FETCH TANPA LIBRARY LUAR)
  // ============================================================================
  const buildCompactCloudPacket = (customTimestamp = Date.now()) => {
    // Kompresi data stok yang berubah agar ringan dikirim lintas HP & Laptop
    const compactInv = inventory.map((i) => ({
      id: i.id,
      name: i.name,
      category: i.category,
      unit: i.unit,
      isMenuCombo: i.isMenuCombo,
      isRawIngredientOnly: i.isRawIngredientOnly,
      packCost: i.packCost,
      baseUnitCost: i.baseUnitCost,
      cost: i.cost,
      price: i.price,
      soldToday: i.soldToday,
      warehouseStock: i.warehouseStock,
      minStock: i.minStock,
      targetStock: i.targetStock,
      stockStart: i.stockStart,
      stockIn: i.stockIn,
      stockWaste: i.stockWaste,
      stockEnd: i.stockEnd,
      recipe: i.recipe,
    }));

    return {
      ownerPin,
      ownerRecoveryWord,
      selectedDate,
      selectedShift,
      workers,
      activeWorkerId,
      inventory: compactInv,
      openingCash: Number(openingCash) || 0,
      actualDrawerCash: Number(actualDrawerCash) || 0,
      qrisMutation: Number(qrisMutation) || 0,
      expenses,
      tamperLogs: tamperLogs.slice(0, 15),
      shiftHistory: shiftHistory.slice(0, 30),
      attendanceLogs: attendanceLogs.slice(0, 35),
      sinkingFunds,
      monthlyRent: Number(monthlyRent) || 0,
      gsWebhookUrl,
      senderId: clientDeviceId.current,
      updatedByDevice: `${deviceLabel} (${activeWorker.name})`,
      updatedAt: customTimestamp,
    };
  };

  useEffect(() => {
    setCloudStatus('Real-Time Cloud Aktif');
    let es = null;
    try {
      es = new EventSource(`https://ntfy.sh/${CLOUD_TOPIC_SYNC}/sse`);
      es.onmessage = (event) => {
        try {
          const wrapper = JSON.parse(event.data);
          if (!wrapper || !wrapper.message) return;
          const data = JSON.parse(wrapper.message);
          if (!data || data.senderId === clientDeviceId.current) return;
          const remoteTs = Number(data.updatedAt) || 0;
          if (remoteTs > lastAppliedTimestamp.current) {
            applyRemoteSnapshot(data, data.updatedByDevice || 'Perangkat Lain');
            setCloudStatus('Real-Time Cloud Aktif');
          }
        } catch (err) {
          // ignore
        }
      };
    } catch (e) {
      // ignore
    }
    return () => {
      if (es) es.close();
    };
  }, []);

  useEffect(() => {
    const nowTs = Date.now();
    const localPayload = {
      ownerPin,
      ownerRecoveryWord,
      selectedDate,
      selectedShift,
      workers,
      activeWorkerId,
      inventory,
      openingCash,
      actualDrawerCash,
      qrisMutation,
      expenses,
      tamperLogs,
      shiftHistory,
      attendanceLogs,
      sinkingFunds,
      monthlyRent,
      gsWebhookUrl,
      customLogo,
      updatedAt: nowTs,
    };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(localPayload));
    } catch (e) {
      // ignore
    }

    if (isApplyingRemoteUpdate.current) return;

    if (syncDebounceTimer.current) clearTimeout(syncDebounceTimer.current);
    syncDebounceTimer.current = setTimeout(async () => {
      try {
        lastAppliedTimestamp.current = nowTs;
        const packet = buildCompactCloudPacket(nowTs);
        await fetch(`https://ntfy.sh/${CLOUD_TOPIC_SYNC}`, {
          method: 'POST',
          body: JSON.stringify(packet),
        });
        setLastSyncedAt(new Date(nowTs).toLocaleTimeString('id-ID'));
        setLastUpdatedByDevice(`${deviceLabel}`);
        setCloudStatus('Real-Time Cloud Aktif');
      } catch (e) {
        // ignore
      }
    }, 600);

    return () => {
      if (syncDebounceTimer.current) clearTimeout(syncDebounceTimer.current);
    };
  }, [
    ownerPin,
    ownerRecoveryWord,
    selectedDate,
    selectedShift,
    workers,
    activeWorkerId,
    inventory,
    openingCash,
    actualDrawerCash,
    qrisMutation,
    expenses,
    tamperLogs,
    shiftHistory,
    attendanceLogs,
    sinkingFunds,
    monthlyRent,
    gsWebhookUrl,
    customLogo,
  ]);

  // ============================================================================
  // PERHITUNGAN STOK OPNAME, RESEP OTOMATIS (AUTO-BOM), HPP, OMZET & KEUNTUNGAN
  // ============================================================================
  const calculatedInventory = useMemo(() => {
    // 1. Hitung berapa banyak tiap bahan baku tersedot oleh Menu Racikan (Auto-BOM)
    const recipeUsageMap = {};
    const recipeDetailMap = {};

    inventory.forEach((item) => {
      if (item.isMenuCombo && Number(item.soldToday) > 0 && Array.isArray(item.recipe)) {
        const comboSold = Number(item.soldToday) || 0;
        item.recipe.forEach((r) => {
          if (!r.ingredientId) return;
          const usedQty = comboSold * (Number(r.qty) || 0);
          if (usedQty > 0) {
            recipeUsageMap[r.ingredientId] = (recipeUsageMap[r.ingredientId] || 0) + usedQty;
            if (!recipeDetailMap[r.ingredientId]) recipeDetailMap[r.ingredientId] = [];
            recipeDetailMap[r.ingredientId].push(`${formatQty(usedQty)} (${item.name})`);
          }
        });
      }
    });

    // 2. Kalkulasi baris per barang
    return inventory.map((item) => {
      const usedInCombo = Number(recipeUsageMap[item.id] || 0);
      const comboNotes = recipeDetailMap[item.id] || [];

      if (item.isMenuCombo) {
        const sold = Math.max(0, Number(item.soldToday) || 0);
        const revenue = sold * (Number(item.price) || 0);
        const hppTotal = sold * (Number(item.cost) || 0);
        const grossProfit = revenue - hppTotal;
        return {
          ...item,
          usedInCombo: 0,
          comboNotes: [],
          totalAvailable: 0,
          directSold: sold,
          sold,
          revenue,
          hppTotal,
          grossProfit,
          isNegativeAnomaly: false,
        };
      }

      const start = Number(item.stockStart) || 0;
      const stockIn = Number(item.stockIn) || 0;
      const waste = Number(item.stockWaste) || 0;
      const end = Number(item.stockEnd) || 0;
      const totalAvailable = start + stockIn - waste;

      // Sisa stok setelah dipakai oleh menu racikan & sisa fisik akhir
      const rawConsumed = totalAvailable - end;
      const directSold = Math.max(0, rawConsumed - usedInCombo);
      const isNegativeAnomaly = rawConsumed < 0;

      // Bahan dapur murni (seperti beras/telur mentah) tidak dihitung omzet langsung kecuali terjual terpisah
      const revenue = item.isRawIngredientOnly ? 0 : directSold * (Number(item.price) || 0);
      const hppTotal = item.isRawIngredientOnly ? 0 : directSold * (Number(item.cost) || 0);
      const grossProfit = revenue - hppTotal;

      return {
        ...item,
        usedInCombo,
        comboNotes,
        totalAvailable,
        directSold,
        sold: directSold,
        revenue,
        hppTotal,
        grossProfit,
        isNegativeAnomaly,
      };
    });
  }, [inventory]);

  const categories = useMemo(() => {
    const set = new Set(['Semua']);
    inventory.forEach((i) => set.add(i.category));
    return Array.from(set);
  }, [inventory]);

  const filteredInventory = useMemo(() => {
    return calculatedInventory.filter((item) => {
      const matchCat = selectedCategory === 'Semua' || item.category === selectedCategory;
      const matchSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchSearch;
    });
  }, [calculatedInventory, selectedCategory, searchQuery]);

  const comboMenuList = useMemo(
    () => filteredInventory.filter((i) => i.isMenuCombo),
    [filteredInventory]
  );

  const physicalStockList = useMemo(
    () => filteredInventory.filter((i) => !i.isMenuCombo),
    [filteredInventory]
  );

  const shiftTotals = useMemo(() => {
    const totalOmzet = calculatedInventory.reduce((acc, i) => acc + i.revenue, 0);
    const totalHPP = calculatedInventory.reduce((acc, i) => acc + i.hppTotal, 0);
    const grossProfit = totalOmzet - totalHPP;
    const totalExpenses = expenses.reduce((acc, e) => acc + (Number(e.amount) || 0), 0);
    const cashSales = Math.max(0, totalOmzet - (Number(qrisMutation) || 0));
    const expectedCashInDrawer = (Number(openingCash) || 0) + cashSales - totalExpenses;
    const cashVariance = (Number(actualDrawerCash) || 0) - expectedCashInDrawer;
    const vaultDeposit = Math.max(0, (Number(actualDrawerCash) || 0) - (Number(openingCash) || 0));

    // Tambahan rincian khusus untuk penjelasan Laba Rugi Owner
    const comboOmzet = calculatedInventory
      .filter((i) => i.isMenuCombo)
      .reduce((acc, i) => acc + i.revenue, 0);
    const comboHPP = calculatedInventory
      .filter((i) => i.isMenuCombo)
      .reduce((acc, i) => acc + i.hppTotal, 0);
    const physicalOmzet = calculatedInventory
      .filter((i) => !i.isMenuCombo)
      .reduce((acc, i) => acc + i.revenue, 0);
    const physicalHPP = calculatedInventory
      .filter((i) => !i.isMenuCombo)
      .reduce((acc, i) => acc + i.hppTotal, 0);

    // Estimasi beban harian (Sewa Ruko Bulanan / 30 hari & Sinking Fund Bulanan / 30 hari)
    const dailyRentAllocation = Math.round((Number(monthlyRent) || 0) / 30);
    const totalMonthlySinking = sinkingFunds.reduce(
      (acc, sf) => acc + (Number(sf.targetMonthly) || 0),
      0
    );
    const dailySinkingAllocation = Math.round(totalMonthlySinking / 30);
    const currentShiftWage = Number(activeWorker?.dailyRate) || 0;

    // Akumulasi seluruh riwayat shift yang sudah ditutup + shift berjalan
    const historyOmzet = shiftHistory.reduce((acc, h) => acc + (Number(h.totalOmzet) || 0), 0);
    const historyHPP = shiftHistory.reduce((acc, h) => acc + (Number(h.totalHPP) || 0), 0);
    const historyExpenses = shiftHistory.reduce(
      (acc, h) => acc + (Number(h.totalExpenses) || 0),
      0
    );
    const historyWages = attendanceLogs.reduce((acc, a) => acc + (Number(a.dailyRate) || 0), 0);

    // Rekapitulasi Pembukuan 1 Bulan Full (30 Hari) - Gabungan Riwayat + Shift Berjalan
    const monthlyTotalOmzet = historyOmzet + totalOmzet;
    const monthlyTotalHPP = historyHPP + totalHPP;
    const monthlyGrossProfit = monthlyTotalOmzet - monthlyTotalHPP;
    const monthlyPettyCash = historyExpenses + totalExpenses;
    const monthlyTotalWages = historyWages + currentShiftWage;
    const monthlyFixedAndSinking = (Number(monthlyRent) || 0) + totalMonthlySinking;
    const monthlyTotalAllExpenses =
      monthlyPettyCash + monthlyTotalWages + monthlyFixedAndSinking;
    const monthlyNetProfit = monthlyGrossProfit - monthlyTotalAllExpenses;

    const totalOperationalOut =
      totalExpenses + currentShiftWage + dailyRentAllocation + dailySinkingAllocation;
    const netProfitShift = grossProfit - totalOperationalOut;

    return {
      totalOmzet,
      totalHPP,
      grossProfit,
      totalExpenses,
      cashSales,
      expectedCashInDrawer,
      cashVariance,
      vaultDeposit,
      comboOmzet,
      comboHPP,
      physicalOmzet,
      physicalHPP,
      dailyRentAllocation,
      totalMonthlySinking,
      dailySinkingAllocation,
      currentShiftWage,
      totalOperationalOut,
      netProfitShift,
      historyOmzet,
      historyHPP,
      historyExpenses,
      historyWages,
      monthlyTotalOmzet,
      monthlyTotalHPP,
      monthlyGrossProfit,
      monthlyPettyCash,
      monthlyTotalWages,
      monthlyFixedAndSinking,
      monthlyTotalAllExpenses,
      monthlyNetProfit,
    };
  }, [
    calculatedInventory,
    expenses,
    qrisMutation,
    openingCash,
    actualDrawerCash,
    monthlyRent,
    sinkingFunds,
    activeWorker,
    shiftHistory,
    attendanceLogs,
  ]);

  // Radar Stok Menipis & Kalkulator Estimasi Belanja Kulakan Owner
  const lowStockReport = useMemo(() => {
    const items = calculatedInventory
      .filter((i) => !i.isMenuCombo && (Number(i.minStock) || 0) > 0)
      .map((i) => {
        const currentTotalStock = (Number(i.stockEnd) || 0) + (Number(i.warehouseStock) || 0);
        const minS = Number(i.minStock) || 5;
        const targetS = Math.max(minS + 5, Number(i.targetStock) || 20);
        const isLow = currentTotalStock <= minS;
        const restockQty = isLow ? Math.max(1, targetS - currentTotalStock) : 0;
        const unitCost = Number(i.cost) || Number(i.baseUnitCost) || 0;
        const estRestockCost = restockQty * unitCost;
        const estPackCost = Number(i.packCost) || estRestockCost;
        return {
          ...i,
          currentTotalStock,
          isLow,
          restockQty,
          unitCost,
          estRestockCost,
          estPackCost,
        };
      })
      .filter((i) => i.isLow);

    const totalEstUnitSpend = items.reduce((sum, i) => sum + i.estRestockCost, 0);
    const totalEstPackSpend = items.reduce(
      (sum, i) => sum + (i.packCost > 0 ? i.packCost : i.estRestockCost),
      0
    );

    return { items, totalEstUnitSpend, totalEstPackSpend };
  }, [calculatedInventory]);

  // ============================================================================
  // SINKRONISASI CLOUD ANTAR-HP & HANDLER OPERASIONAL
  // ============================================================================
  const pushToCloud = async (manualNotify = false) => {
    try {
      setCloudStatus('Menyinkronkan...');
      const nowTs = Date.now();
      lastAppliedTimestamp.current = nowTs;
      const packet = buildCompactCloudPacket(nowTs);

      await fetch(`https://ntfy.sh/${CLOUD_TOPIC_SYNC}`, {
        method: 'POST',
        body: JSON.stringify(packet),
      });

      setLastSyncedAt(new Date(nowTs).toLocaleTimeString('id-ID'));
      setLastUpdatedByDevice(`${deviceLabel} (${activeWorker.name})`);
      setCloudStatus('Real-Time Cloud Aktif');
      if (manualNotify) {
        showToast('☁️ Data dari perangkat ini berhasil dikirim & disamakan ke semua HP & Laptop!');
      }
    } catch (e) {
      setCloudStatus('Lokal Aktif');
      if (manualNotify) {
        showToast('⚠️ Tersimpan di memori perangkat. Pastikan internet aktif untuk sinkronisasi.');
      }
    }
  };

  const pullFromCloudNow = async () => {
    try {
      setCloudStatus('Menarik Data...');
      const res = await fetch(`https://ntfy.sh/${CLOUD_TOPIC_SYNC}/json?poll=1&since=24h`);
      const text = await res.text();
      const lines = text
        .trim()
        .split('\n')
        .filter(Boolean);

      let latestPacket = null;
      for (let i = lines.length - 1; i >= 0; i--) {
        try {
          const wrapper = JSON.parse(lines[i]);
          if (wrapper && wrapper.message) {
            const parsed = JSON.parse(wrapper.message);
            if (parsed && parsed.inventory) {
              latestPacket = parsed;
              break;
            }
          }
        } catch (err) {
          // lanjut baris sebelumnya
        }
      }

      if (latestPacket) {
        applyRemoteSnapshot(latestPacket, latestPacket.updatedByDevice || 'Server Cloud');
        setCloudStatus('Real-Time Cloud Aktif');
        showToast('✅ Berhasil menarik data terbaru dari Cloud ke perangkat ini!');
      } else {
        await pushToCloud(false);
        showToast('☁️ Server Cloud siap digunakan! Data perangkat ini telah dijadikan acuan.');
      }
    } catch (e) {
      setCloudStatus('Real-Time Cloud Aktif');
      showToast('⚠️ Gagal menarik data dari Cloud, periksa koneksi internet.');
    }
  };

  // Update Penjualan Menu Racikan (+1 / -1 / Input Manual) + Potong Fisik Otomatis
  const handleComboSoldChange = (id, nextVal) => {
    const cleanVal = Math.max(0, Number(nextVal) || 0);
    setInventory((prev) => {
      const targetCombo = prev.find((i) => i.id === id);
      if (!targetCombo) return prev;
      const oldSold = Number(targetCombo.soldToday) || 0;
      const deltaSold = cleanVal - oldSold;

      // Hitung pengurangan pada stok akhir bahan baku fisik
      const ingredientDeltaMap = {};
      if (Array.isArray(targetCombo.recipe) && deltaSold !== 0) {
        targetCombo.recipe.forEach((r) => {
          if (r.ingredientId) {
            ingredientDeltaMap[r.ingredientId] =
              (ingredientDeltaMap[r.ingredientId] || 0) + deltaSold * (Number(r.qty) || 0);
          }
        });
      }

      return prev.map((item) => {
        if (item.id === id) {
          return { ...item, soldToday: cleanVal };
        }
        if (ingredientDeltaMap[item.id]) {
          const currentEnd = Number(item.stockEnd) || 0;
          const nextEnd = Math.max(0, Number((currentEnd - ingredientDeltaMap[item.id]).toFixed(2)));
          return { ...item, stockEnd: nextEnd };
        }
        return item;
      });
    });
  };

  // Update Stok Fisik (Stok Masuk, Rusak/Jatah, Stok Akhir)
  const handlePhysicalStockChange = (id, field, val) => {
    const num = Math.max(0, Number(val) || 0);
    setInventory((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: num } : item))
    );
  };

  // Buka Segel Stok Awal (Wajib Alasan & Masuk Log Audit Owner)
  const handleOpenTamperModal = (item) => {
    setTamperModalItem(item);
    setNewStartValue(item.stockStart);
    setTamperReason('');
  };

  const handleConfirmTamperStock = (e) => {
    e.preventDefault();
    if (!tamperModalItem) return;
    if (!tamperReason.trim()) {
      showToast('⚠️ Wajib isi alasan koreksi stok awal untuk audit Owner!');
      return;
    }
    const oldVal = Number(tamperModalItem.stockStart) || 0;
    const newVal = Math.max(0, Number(newStartValue) || 0);

    setInventory((prev) =>
      prev.map((i) =>
        i.id === tamperModalItem.id
          ? {
              ...i,
              stockStart: newVal,
              stockEnd: newVal + (Number(i.stockIn) || 0) - (Number(i.stockWaste) || 0),
            }
          : i
      )
    );

    const newLog = {
      id: 'log-' + Date.now(),
      timestamp: new Date().toLocaleString('id-ID'),
      date: selectedDate,
      shift: selectedShift,
      workerName: activeWorker.name,
      itemName: tamperModalItem.name,
      oldStart: oldVal,
      newStart: newVal,
      reason: tamperReason.trim(),
    };
    setTamperLogs((prev) => [newLog, ...prev]);
    setTamperModalItem(null);
    showToast('⚠️ Koreksi Stok Awal tercatat di Radar Audit Owner!');
  };

  // Tambah & Hapus Pengeluaran Laci Kasir
  const handleAddExpense = (e) => {
    e.preventDefault();
    const amt = Number(expenseAmount) || 0;
    if (!expenseDesc.trim() || amt <= 0) {
      showToast('⚠️ Isi keterangan dan nominal belanja dengan benar!');
      return;
    }
    setExpenses((prev) => [
      ...prev,
      {
        id: 'exp-' + Date.now(),
        desc: expenseDesc.trim(),
        amount: amt,
        time: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      },
    ]);
    setExpenseDesc('');
    setExpenseAmount('');
  };

  const handleRemoveExpense = (id) => {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  };

  // ============================================================================
  // GENERATOR LAPORAN RESMI PDF / WORD & AUTO-ADVANCE TANGGAL SHIFT
  // ============================================================================
  const buildShiftReportHTML = () => {
    const soldItems = calculatedInventory.filter((i) => i.sold > 0 || i.usedInCombo > 0);
    const rowsHtml = soldItems
      .map(
        (item, idx) => `
        <tr>
          <td style="border:1px solid #cbd5e1;padding:6px;text-align:center;">${idx + 1}</td>
          <td style="border:1px solid #cbd5e1;padding:6px;"><b>${item.name}</b><br/><small>${item.category}</small></td>
          <td style="border:1px solid #cbd5e1;padding:6px;text-align:center;">${item.isMenuCombo ? 'Menu Racikan' : formatQty(item.stockStart)}</td>
          <td style="border:1px solid #cbd5e1;padding:6px;text-align:center;">${item.isMenuCombo ? '-' : formatQty(item.stockEnd)}</td>
          <td style="border:1px solid #cbd5e1;padding:6px;text-align:center;"><b>${formatQty(item.sold)} ${item.unit}</b>${item.usedInCombo > 0 ? `<br/><small>(+Dipakai Racikan: ${formatQty(item.usedInCombo)})</small>` : ''}</td>
          <td style="border:1px solid #cbd5e1;padding:6px;text-align:right;">${formatRp(item.price)}</td>
          <td style="border:1px solid #cbd5e1;padding:6px;text-align:right;"><b>${formatRp(item.revenue)}</b></td>
        </tr>`
      )
      .join('');

    const expRowsHtml =
      expenses.length > 0
        ? expenses
            .map(
              (e, idx) => `
          <tr>
            <td style="border:1px solid #cbd5e1;padding:5px;text-align:center;">${idx + 1}</td>
            <td style="border:1px solid #cbd5e1;padding:5px;">${e.desc} (${e.time})</td>
            <td style="border:1px solid #cbd5e1;padding:5px;text-align:right;">${formatRp(e.amount)}</td>
          </tr>`
            )
            .join('')
        : `<tr><td colspan="3" style="border:1px solid #cbd5e1;padding:6px;text-align:center;">Tidak ada pengeluaran kas laci</td></tr>`;

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8" />
        <title>Laporan Shift Warkop Sumber Redjeki - ${selectedDate}</title>
        <style>
          body { font-family: Arial, sans-serif; color: #1e293b; padding: 20px; }
          .header-box { border: 3px solid #8B1E1E; padding: 14px; text-align: center; margin-bottom: 16px; background: #FCFBF9; }
          .title-navy { color: #0B224C; font-size: 20px; font-weight: 900; letter-spacing: 2px; margin: 0; }
          .title-red { color: #D11919; font-size: 24px; font-weight: 900; margin: 4px 0; }
          .subtitle { color: #8B1E1E; font-size: 11px; font-weight: bold; letter-spacing: 1.5px; }
          table { width: 100%; border-collapse: collapse; margin-top: 10px; font-size: 12px; }
          th { background: #0f172a; color: #ffffff; padding: 7px; border: 1px solid #334155; }
          .summary-box { margin-top: 14px; border: 2px solid #0f172a; padding: 12px; background: #f8fafc; }
        </style>
      </head>
      <body>
        <div class="header-box">
          <div class="title-navy">WARKOP</div>
          <div class="title-red">SUMBER REDJEKI (生计来源)</div>
          <div class="subtitle">RUKO RAOSEUN - CIBIRU - BANDUNG</div>
        </div>
        <p style="font-size:12px;">
          <b>Tanggal Operasional:</b> ${selectedDate} &nbsp;|&nbsp;
          <b>Shift:</b> ${selectedShift} &nbsp;|&nbsp;
          <b>Penjaga Kasir:</b> ${activeWorker.name}
        </p>
        <h3>1. Rincian Penjualan & Stok Opname</h3>
        <table>
          <thead>
            <tr>
              <th>No</th>
              <th>Nama Menu / Barang</th>
              <th>Stok Awal</th>
              <th>Stok Akhir</th>
              <th>Terjual</th>
              <th>Harga Jual</th>
              <th>Subtotal Omzet</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml || '<tr><td colspan="7" style="text-align:center;padding:10px;">Belum ada item terjual</td></tr>'}
          </tbody>
        </table>
        <h3>2. Rincian Belanja Harian Kasir (Petty Cash)</h3>
        <table>
          <thead>
            <tr><th>No</th><th>Keterangan Belanja</th><th>Nominal</th></tr>
          </thead>
          <tbody>${expRowsHtml}</tbody>
        </table>
        <div class="summary-box">
          <p><b>Total Omzet Penjualan:</b> ${formatRp(shiftTotals.totalOmzet)}</p>
          <p><b>Mutasi QRIS (Non-Tunai):</b> ${formatRp(qrisMutation)}</p>
          <p><b>Total Belanja Kasir:</b> ${formatRp(shiftTotals.totalExpenses)}</p>
          <p><b>Modal Kembalian Laci:</b> ${formatRp(openingCash)}</p>
          <p><b>Uang Tunai Aktual di Laci:</b> ${formatRp(actualDrawerCash)}</p>
          <p><b>Selisih Kasir:</b> ${formatRp(shiftTotals.cashVariance)}</p>
          <p style="font-size:15px;color:#047857;"><b>WAJIB SETOR KE BRANKAS OWNER: ${formatRp(shiftTotals.vaultDeposit)}</b></p>
        </div>
      </body>
      </html>
    `;
  };

  // Kunci Shift, Simpan Riwayat, Rollover Stok Akhir -> Stok Awal & Majukan Tanggal Otomatis
  const finalizeShiftAndRollover = () => {
    const newRecord = {
      id: 'sh-' + Date.now(),
      date: selectedDate,
      shift: selectedShift,
      workerId: activeWorker.id,
      workerName: activeWorker.name,
      totalOmzet: shiftTotals.totalOmzet,
      totalHPP: shiftTotals.totalHPP,
      grossProfit: shiftTotals.grossProfit,
      totalExpenses: shiftTotals.totalExpenses,
      qrisMutation: Number(qrisMutation) || 0,
      cashVariance: shiftTotals.cashVariance,
      vaultDeposit: shiftTotals.vaultDeposit,
      createdAt: new Date().toLocaleString('id-ID'),
    };

    setShiftHistory((prev) => [newRecord, ...prev]);
    setAttendanceLogs((prev) => [
      {
        id: 'att-' + Date.now(),
        date: selectedDate,
        shift: selectedShift,
        workerId: activeWorker.id,
        workerName: activeWorker.name,
        dailyRate: Number(activeWorker.dailyRate) || 0,
      },
      ...prev,
    ]);

    // Rollover Stok Akhir jadi Stok Awal shift berikutnya & reset soldToday
    setInventory((prev) =>
      prev.map((item) => {
        if (item.isMenuCombo) {
          return { ...item, soldToday: 0 };
        }
        const nextStart = Number(item.stockEnd) || 0;
        return {
          ...item,
          stockStart: nextStart,
          stockIn: 0,
          stockWaste: 0,
          stockEnd: nextStart,
        };
      })
    );

    setExpenses([]);
    setQrisMutation(0);
    setActualDrawerCash(openingCash);

    // Ganti Shift / Tanggal Otomatis
    if (selectedShift.includes('Shift 1')) {
      setSelectedShift('Shift 2 (Malam)');
      showToast('✅ Shift 1 Selesai! Otomatis pindah ke Shift 2 (Malam) & Stok Awal terkunci.');
    } else {
      const curr = new Date(selectedDate + 'T00:00:00');
      curr.setDate(curr.getDate() + 1);
      const nextDateStr = curr.toISOString().slice(0, 10);
      setSelectedDate(nextDateStr);
      setSelectedShift('Shift 1 (Pagi)');
      showToast(`✅ Tutup Buku Selesai! Tanggal otomatis maju ke ${nextDateStr} (Shift 1).`);
    }
  };

  const handleDownloadWordReport = () => {
    const html = buildShiftReportHTML();
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Laporan-Shift-Warkop-${selectedDate}-${selectedShift.replace(/\s+/g, '')}.doc`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast('📄 Dokumen Word (.doc) berhasil diunduh!');
  };

  const handleDownloadPdfAndCloseShift = () => {
    const html = buildShiftReportHTML();
    const printWin = window.open('', '_blank', 'width=850,height=900');
    if (printWin) {
      printWin.document.open();
      printWin.document.write(html);
      printWin.document.close();
      printWin.focus();
      setTimeout(() => {
        printWin.print();
      }, 400);
    } else {
      handleDownloadWordReport();
    }
    finalizeShiftAndRollover();
  };

  const handleSharePdfToWhatsApp = async () => {
    const html = buildShiftReportHTML();
    const fileName = `Laporan-Warkop-${selectedDate}-${activeWorker.name}.doc`;
    const blob = new Blob(['\ufeff', html], { type: 'application/msword' });
    const file = new File([blob], fileName, { type: 'application/msword' });

    if (navigator.canShare && navigator.canShare({ files: [file] })) {
      try {
        await navigator.share({
          title: `Laporan Shift Warkop Sumber Redjeki (${selectedDate})`,
          text: `Laporan Tutup Shift ${selectedShift} (${activeWorker.name}) - Setoran Brankas: ${formatRp(shiftTotals.vaultDeposit)}`,
          files: [file],
        });
        finalizeShiftAndRollover();
        return;
      } catch (err) {
        // fallback ke unduh langsung
      }
    }

    handleDownloadWordReport();
    finalizeShiftAndRollover();
  };

  // ============================================================================
  // HANDLER KHUSUS OWNER (LOGIN, UBAH PIN, EDIT BARANG & RESEP, RESET 0)
  // ============================================================================
  const handleOwnerLogin = (e) => {
    e.preventDefault();
    if (pinInput === ownerPin) {
      setOwnerAuthenticated(true);
      setPinInput('');
      showToast('👑 Selamat datang di Portal Owner Warkop Sumber Redjeki!');
    } else {
      showToast('❌ PIN Owner salah! Hanya Owner yang dapat membuka halaman ini.');
    }
  };

  const handleSaveNewOwnerPin = (e) => {
    e.preventDefault();
    if (useRecoveryMode) {
      if (recoveryWordField.trim().toUpperCase() !== ownerRecoveryWord.toUpperCase()) {
        setPinModalMessage({ type: 'error', text: 'Kata kunci pemulihan rahasia salah!' });
        return;
      }
    } else if (oldPinField !== ownerPin) {
      setPinModalMessage({ type: 'error', text: 'Sandi/PIN Owner lama tidak sesuai!' });
      return;
    }

    if (!newPinField || newPinField.length < 4) {
      setPinModalMessage({ type: 'error', text: 'Sandi baru minimal 4 karakter/angka!' });
      return;
    }
    if (newPinField !== confirmPinField) {
      setPinModalMessage({ type: 'error', text: 'Konfirmasi sandi baru tidak cocok!' });
      return;
    }

    setOwnerPin(newPinField);
    setShowChangePinModal(false);
    setOldPinField('');
    setNewPinField('');
    setConfirmPinField('');
    setPinModalMessage({ type: '', text: '' });
    showToast('🔐 Sandi / PIN Khusus Owner berhasil diperbarui!');
  };

  // Buka Modal Tambah / Edit Barang & Resep (Hanya Owner)
  const openAddItemModal = () => {
    setEditingItem(null);
    setItemForm({
      name: '',
      category: 'Minuman Saset (Etalase)',
      unit: 'Saset',
      isMenuCombo: false,
      packCost: 0,
      baseUnitCost: 0,
      cost: 0,
      price: 0,
      warehouseStock: 0,
      minStock: 5,
      targetStock: 20,
      stockStart: 0,
      stockEnd: 0,
      recipe: [],
    });
    setShowItemModal(true);
  };

  const openEditItemModal = (item) => {
    setEditingItem(item);
    setItemForm({
      name: item.name,
      category: item.category,
      unit: item.unit || 'Porsi',
      isMenuCombo: Boolean(item.isMenuCombo),
      packCost: Number(item.packCost) || 0,
      baseUnitCost: Number(item.baseUnitCost) || 0,
      cost: Number(item.cost) || 0,
      price: Number(item.price) || 0,
      warehouseStock: Number(item.warehouseStock) || 0,
      minStock: Number(item.minStock) || 0,
      targetStock: Number(item.targetStock) || 20,
      stockStart: Number(item.stockStart) || 0,
      stockEnd: Number(item.stockEnd) || 0,
      recipe: Array.isArray(item.recipe) ? item.recipe.map((r) => ({ ...r })) : [],
    });
    setShowItemModal(true);
  };

  const handleSaveItemModal = (e) => {
    e.preventDefault();
    if (!itemForm.name.trim()) {
      showToast('⚠️ Nama menu/barang tidak boleh kosong!');
      return;
    }

    const cleanRecipe = Array.isArray(itemForm.recipe)
      ? itemForm.recipe
          .filter((r) => r.ingredientId && Number(r.qty) > 0)
          .map((r) => ({ ingredientId: r.ingredientId, qty: Number(r.qty) || 0 }))
      : [];

    const costVal = Number(itemForm.cost) || 0;
    const priceVal = Number(itemForm.price) || 0;

    if (editingItem) {
      setInventory((prev) =>
        prev.map((i) =>
          i.id === editingItem.id
            ? {
                ...i,
                name: itemForm.name.trim(),
                category: itemForm.category,
                unit: itemForm.unit,
                isMenuCombo: Boolean(itemForm.isMenuCombo),
                packCost: Number(itemForm.packCost) || 0,
                baseUnitCost: Number(itemForm.baseUnitCost) || costVal,
                cost: costVal,
                price: priceVal,
                profit: priceVal - costVal,
                warehouseStock: Number(itemForm.warehouseStock) || 0,
                minStock: Number(itemForm.minStock) || 0,
                targetStock: Number(itemForm.targetStock) || 0,
                stockStart: Number(itemForm.stockStart) || 0,
                stockEnd: Number(itemForm.stockEnd) || 0,
                recipe: cleanRecipe,
              }
            : i
        )
      );
      showToast(`✅ "${itemForm.name}" & Resep Otomatis berhasil diperbarui!`);
    } else {
      const newItem = {
        id: 'item-' + Date.now(),
        no: inventory.length + 1,
        name: itemForm.name.trim(),
        category: itemForm.category,
        unit: itemForm.unit || 'Porsi',
        isMenuCombo: Boolean(itemForm.isMenuCombo),
        packCost: Number(itemForm.packCost) || 0,
        baseUnitCost: Number(itemForm.baseUnitCost) || costVal,
        cost: costVal,
        price: priceVal,
        profit: priceVal - costVal,
        soldToday: 0,
        warehouseStock: Number(itemForm.warehouseStock) || 0,
        minStock: Number(itemForm.minStock) || 5,
        targetStock: Number(itemForm.targetStock) || 20,
        stockStart: Number(itemForm.stockStart) || 0,
        stockIn: 0,
        stockWaste: 0,
        stockEnd: Number(itemForm.stockEnd) || Number(itemForm.stockStart) || 0,
        recipe: cleanRecipe,
      };
      setInventory((prev) => [...prev, newItem]);
      showToast(`✅ Barang baru "${newItem.name}" berhasil ditambahkan!`);
    }

    setShowItemModal(false);
  };

  const handleDeleteItem = (id, name) => {
    setInventory((prev) => prev.filter((i) => i.id !== id));
    showToast(`🗑️ "${name}" telah dihapus dari daftar inventaris.`);
  };

  const handleZeroOutAllStock = () => {
    setInventory((prev) =>
      prev.map((i) => ({
        ...i,
        soldToday: 0,
        warehouseStock: 0,
        stockStart: 0,
        stockIn: 0,
        stockWaste: 0,
        stockEnd: 0,
      }))
    );
    setOpeningCash(0);
    setActualDrawerCash(0);
    setQrisMutation(0);
    setExpenses([]);
    showToast('🔄 Semua angka Stok Awal, Stok Akhir, dan Kas Laci berhasil di-0-kan!');
  };

  const handleLoadHppFixCatalog = () => {
    setInventory(INITIAL_INVENTORY);
    showToast('📊 Katalog 50 HPP Warkop Fix + Resep Otomatis berhasil dimuat ulang!');
  };

  const handleCopyShoppingListToWA = () => {
    if (lowStockReport.items.length === 0) {
      showToast('✅ Semua stok masih aman di atas batas minimum!');
      return;
    }
    const lines = lowStockReport.items.map(
      (i, idx) =>
        `${idx + 1}. ${i.name} (Sisa: ${formatQty(i.currentTotalStock)} ${i.unit}) -> Beli +${formatQty(i.restockQty)} ${i.unit} = ${formatRp(i.estRestockCost)}${i.packCost > 0 ? ` [Grosir: ${formatRp(i.packCost)}]` : ''}`
    );
    const text = `*DAFTAR KULAKAN STOK MENIPIS WARKOP SUMBER REDJEKI (${selectedDate})*\n\n${lines.join('\n')}\n\n*Estimasi Belanja Satuan (HPP):* ${formatRp(lowStockReport.totalEstUnitSpend)}\n*Estimasi Belanja Grosir (Dus/Renceng):* ${formatRp(lowStockReport.totalEstPackSpend)}`;
    navigator.clipboard.writeText(text);
    showToast('📲 Daftar belanja & estimasi biaya berhasil disalin ke WhatsApp!');
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setCustomLogo(reader.result);
        showToast('🖼️ Logo Warkop berhasil diperbarui!');
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 pb-24">
      {/* NOTIFIKASI TOAST MELAYANG */}
      {toastMsg && (
        <div className="fixed top-4 right-4 z-50 max-w-sm bg-amber-500 text-stone-950 font-extrabold px-4 py-3 rounded-2xl shadow-2xl border-2 border-stone-900 text-xs sm:text-sm animate-bounce">
          {toastMsg}
        </div>
      )}

      {/* ========================================================================
          HEADER UTAMA WARKOP SUMBER REDJEKI (DENGAN LOGO RESMI)
         ======================================================================== */}
      <header className="sticky top-0 z-30 bg-stone-900/95 backdrop-blur border-b border-stone-800 px-3 py-2.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* LOGO & NAMA TOKO */}
          <div className="flex items-center gap-3">
            <div
              onClick={() => logoInputRef.current?.click()}
              className="w-20 h-13 sm:w-24 sm:h-14 rounded-xl overflow-hidden border-2 border-red-800 bg-stone-50 flex-shrink-0 cursor-pointer shadow-md hover:scale-105 transition"
              title="Klik untuk mengganti logo"
            >
              <img
                src={customLogo || DEFAULT_WARKOP_LOGO}
                alt="Warkop Sumber Redjeki"
                className="w-full h-full object-contain"
              />
              <input
                ref={logoInputRef}
                type="file"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm sm:text-lg font-black tracking-tight text-amber-400">
                  WARKOP SUMBER REDJEKI
                </h1>
                <span className="text-xs font-bold text-red-400 bg-red-950/60 border border-red-800/60 px-2 py-0.5 rounded-full">
                  生计来源
                </span>
              </div>
              <p className="text-[11px] text-stone-400 font-medium">
                Ruko Raoseun - Cibiru - Bandung • Siklus Stok Terkunci & Cloud Real-Time
              </p>
            </div>
          </div>

          {/* TOMBOL SINKRONISASI CLOUD & SWITCH PORTAL */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => pullFromCloudNow()}
              className="px-2.5 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 text-cyan-300 text-xs font-bold flex items-center gap-1"
              title="Tarik data paling baru dari Laptop / HP lain"
            >
              <span>📥 Tarik Data Cloud</span>
            </button>

            <button
              type="button"
              onClick={() => pushToCloud(true)}
              className="px-2.5 py-1.5 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/50 text-amber-300 text-xs font-bold flex items-center gap-1"
              title="Kirim data dari layar ini ke semua HP & Laptop"
            >
              <span>☁️ Kirim ke Semua HP</span>
            </button>

            <button
              type="button"
              onClick={() => setShowCloudModal(true)}
              className="px-2.5 py-1.5 rounded-lg bg-emerald-900/50 hover:bg-emerald-800/60 border border-emerald-600/50 text-emerald-300 text-xs font-semibold flex items-center gap-1"
            >
              <span>🟢 {cloudStatus}</span>
              {lastSyncedAt && <span className="text-[10px] text-emerald-200">({lastSyncedAt})</span>}
            </button>

            <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-700">
              <button
                type="button"
                onClick={() => setPortalMode('pekerja')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition ${
                  portalMode === 'pekerja'
                    ? 'bg-amber-500 text-stone-950 shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                👨‍🍳 Kasir HP
              </button>
              <button
                type="button"
                onClick={() => setPortalMode('owner')}
                className={`px-3 py-1.5 rounded-lg text-xs font-extrabold transition ${
                  portalMode === 'owner'
                    ? 'bg-red-600 text-white shadow'
                    : 'text-stone-400 hover:text-stone-200'
                }`}
              >
                👑 Owner / Admin
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 pt-4 space-y-6">
        {/* ======================================================================
            MODE 1: PORTAL PEKERJA / KASIR (1 HALAMAN MEMANJANG KE BAWAH)
           ====================================================================== */}
        {portalMode === 'pekerja' && (
          <div className="space-y-6">
            {/* BAR IDENTITAS SHIFT & PENJAGA KASIR */}
            <section className="bg-stone-900 border border-stone-800 rounded-2xl p-4 shadow-lg">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 mb-1">
                    📅 Tanggal Operasional
                  </label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 mb-1">
                    ⏰ Shift Kerja
                  </label>
                  <select
                    value={selectedShift}
                    onChange={(e) => setSelectedShift(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-stone-100"
                  >
                    <option value="Shift 1 (Pagi)">Shift 1 (Pagi)</option>
                    <option value="Shift 2 (Malam)">Shift 2 (Malam)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-stone-400 mb-1">
                    👨‍🍳 Nama Penjaga Kasir
                  </label>
                  <select
                    value={activeWorkerId}
                    onChange={(e) => setActiveWorkerId(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs sm:text-sm font-bold text-emerald-300"
                  >
                    {workers.map((w) => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.role})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </section>

            {/* ==================================================================
                BAGIAN 1: STOK OPNAME & PENJUALAN MENU RACIKAN (TANPA HPP/UNTUNG)
               ================================================================== */}
            <section className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-800 pb-3">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    Bagian 1 dari 3 • Alur Kasir Berderet ke Bawah
                  </span>
                  <h2 className="text-base sm:text-lg font-black text-stone-100 mt-1">
                    📦 Pencatatan Menu Racikan & Stok Opname Etalase
                  </h2>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] text-stone-400 bg-stone-950 px-2.5 py-1 rounded-lg border border-stone-800">
                    🔒 Nama & Harga Dikunci Owner
                  </span>
                  <div className="flex bg-stone-950 p-1 rounded-xl border border-stone-800">
                    <button
                      type="button"
                      onClick={() => setMobileViewMode('cards')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        mobileViewMode === 'cards'
                          ? 'bg-amber-500 text-stone-950'
                          : 'text-stone-400'
                      }`}
                    >
                      📱 Kartu HP
                    </button>
                    <button
                      type="button"
                      onClick={() => setMobileViewMode('table')}
                      className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                        mobileViewMode === 'table'
                          ? 'bg-amber-500 text-stone-950'
                          : 'text-stone-400'
                      }`}
                    >
                      💻 Tabel
                    </button>
                  </div>
                </div>
              </div>

              {/* FILTER KATEGORI & CARI MENU */}
              <div className="flex flex-col sm:flex-row gap-2">
                <input
                  type="text"
                  placeholder="🔍 Cari menu nasi, mie, josu, kopi, susu..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 bg-stone-950 border border-stone-700 rounded-xl px-3.5 py-2 text-xs sm:text-sm text-stone-100"
                />
                <div className="flex gap-1.5 overflow-x-auto pb-1">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition ${
                        selectedCategory === cat
                          ? 'bg-amber-500 text-stone-950'
                          : 'bg-stone-950 text-stone-400 border border-stone-800'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* SUB-BAGIAN 1A: MENU RACIKAN / CAMPURAN (KLIK +1 LAKU, OTOMATIS POTONG BAHAN BAKU) */}
              {comboMenuList.length > 0 && (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between bg-amber-950/30 border border-amber-700/40 rounded-xl px-3.5 py-2">
                    <div>
                      <h3 className="text-xs sm:text-sm font-extrabold text-amber-300">
                        🍳 A. Menu Masakan & Minuman Campuran (Tanpa Hitung Stok Awal/Akhir)
                      </h3>
                      <p className="text-[11px] text-stone-300">
                        Cukup tekan <b>+1 Laku</b> setiap ada pesanan (seperti Nasi Telor Kornet, Omlet, Indomie Telor, Josu). Stok bahan baku di bawah akan terpotong otomatis!
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
                    {comboMenuList.map((item) => (
                      <div
                        key={item.id}
                        className="bg-stone-950 border border-stone-800 rounded-xl p-3 flex flex-col justify-between gap-2"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded">
                              {item.category}
                            </span>
                            <h4 className="text-sm font-extrabold text-stone-100 mt-1">
                              {item.name}
                            </h4>
                            <p className="text-xs font-bold text-emerald-400">
                              Harga Jual: {formatRp(item.price)} / {item.unit}
                            </p>
                          </div>
                          <div className="text-right">
                            <span className="text-[10px] text-stone-400 block">Omzet Menu</span>
                            <span className="text-xs font-black text-amber-300">
                              {formatRp(item.revenue)}
                            </span>
                          </div>
                        </div>

                        {/* Info Resep Otomatis */}
                        {Array.isArray(item.recipe) && item.recipe.length > 0 && (
                          <div className="text-[10px] text-stone-400 bg-stone-900/90 px-2.5 py-1 rounded-lg border border-stone-800">
                            🔄 Auto-Potong:{' '}
                            {item.recipe
                              .map((r) => {
                                const ing = inventory.find((x) => x.id === r.ingredientId);
                                return ing ? `${formatQty(r.qty)} ${ing.name}` : '';
                              })
                              .filter(Boolean)
                              .join(' + ')}
                          </div>
                        )}

                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-stone-800/80">
                          <button
                            type="button"
                            onClick={() =>
                              handleComboSoldChange(item.id, Math.max(0, (item.soldToday || 0) - 1))
                            }
                            className="w-10 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-black text-base"
                          >
                            -
                          </button>
                          <div className="flex-1 text-center">
                            <span className="text-[10px] text-stone-400 block">Terjual Hari Ini</span>
                            <input
                              type="number"
                              min="0"
                              step="1"
                              value={item.soldToday}
                              onChange={(e) => handleComboSoldChange(item.id, e.target.value)}
                              className="w-20 text-center bg-stone-900 border border-stone-700 rounded-lg py-1 text-sm font-black text-amber-300"
                            />
                          </div>
                          <button
                            type="button"
                            onClick={() => handleComboSoldChange(item.id, (item.soldToday || 0) + 1)}
                            className="px-3.5 h-9 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow"
                          >
                            +1 Laku
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* SUB-BAGIAN 1B: STOK FISIK ETALASE & BAHAN DAPUR (ADA STOK AWAL TERKUNCI & STOK AKHIR) */}
              <div className="space-y-2.5 pt-2">
                <div className="bg-cyan-950/30 border border-cyan-700/40 rounded-xl px-3.5 py-2">
                  <h3 className="text-xs sm:text-sm font-extrabold text-cyan-300">
                    📦 B. Stok Opname Barang Fisik Etalase & Bahan Baku Dapur
                  </h3>
                  <p className="text-[11px] text-stone-300">
                    Hitung sisa fisik di rak saat tutup shift lalu isi di kolom <b>Stok Akhir Fisik</b>. Barang yang dipakai untuk Menu Racikan di atas sudah otomatis dikurangi!
                  </p>
                </div>

                {mobileViewMode === 'cards' ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {physicalStockList.map((item) => (
                      <div
                        key={item.id}
                        className={`rounded-2xl p-3.5 border space-y-2.5 ${
                          item.isNegativeAnomaly
                            ? 'bg-red-950/30 border-red-500'
                            : 'bg-stone-950 border-stone-800'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-stone-800 text-stone-300">
                              {item.category}
                            </span>
                            <h4 className="text-sm font-extrabold text-stone-100 mt-1">
                              {item.name}
                            </h4>
                            <p className="text-xs font-bold text-amber-400">
                              {item.isRawIngredientOnly
                                ? `Bahan Baku Dapur (${item.unit})`
                                : `Harga Jual: ${formatRp(item.price)} / ${item.unit}`}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => handleOpenTamperModal(item)}
                            className="px-2 py-1 rounded-lg bg-stone-900 border border-stone-700 text-[11px] font-bold text-stone-300 hover:border-amber-500"
                            title="Koreksi Stok Awal (Masuk Log Audit Owner)"
                          >
                            🔒 Awal: {formatQty(item.stockStart)}
                          </button>
                        </div>

                        {item.usedInCombo > 0 && (
                          <div className="text-[11px] bg-cyan-950/50 border border-cyan-700/50 text-cyan-200 px-2.5 py-1.5 rounded-xl">
                            🔄 Terpakai di Menu Racikan: <b>{formatQty(item.usedInCombo)} {item.unit}</b>
                            <div className="text-[10px] text-cyan-300/80">
                              ({item.comboNotes.join(', ')})
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-stone-900 p-2 rounded-xl border border-stone-800">
                            <label className="block text-[10px] text-stone-400">
                              + Masuk Gudang
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              value={item.stockIn}
                              onChange={(e) =>
                                handlePhysicalStockChange(item.id, 'stockIn', e.target.value)
                              }
                              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-2 py-1 font-bold text-emerald-300 mt-0.5"
                            />
                          </div>
                          <div className="bg-stone-900 p-2 rounded-xl border border-stone-800">
                            <label className="block text-[10px] text-stone-400">
                              Rusak / Jatah
                            </label>
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              value={item.stockWaste}
                              onChange={(e) =>
                                handlePhysicalStockChange(item.id, 'stockWaste', e.target.value)
                              }
                              className="w-full bg-stone-950 border border-stone-700 rounded-lg px-2 py-1 font-bold text-rose-300 mt-0.5"
                            />
                          </div>
                        </div>

                        {/* KONTROL STOK AKHIR FISIK RAMAH LAYAR HP */}
                        <div className="bg-stone-900/90 p-2.5 rounded-xl border border-amber-500/40">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-[11px] font-extrabold text-amber-300">
                              👉 Sisa Stok Akhir Fisik ({item.unit})
                            </span>
                            <span className="text-[11px] font-bold text-stone-400">
                              Total Tersedia: {formatQty(item.totalAvailable)}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() =>
                                handlePhysicalStockChange(
                                  item.id,
                                  'stockEnd',
                                  Math.max(0, (Number(item.stockEnd) || 0) - 1)
                                )
                              }
                              className="w-10 h-9 rounded-xl bg-stone-800 hover:bg-stone-700 text-white font-black"
                            >
                              -1
                            </button>
                            <input
                              type="number"
                              min="0"
                              step="0.5"
                              value={item.stockEnd}
                              onChange={(e) =>
                                handlePhysicalStockChange(item.id, 'stockEnd', e.target.value)
                              }
                              className="flex-1 text-center bg-stone-950 border border-amber-500/60 rounded-xl py-1.5 text-sm font-black text-amber-300"
                            />
                            <button
                              type="button"
                              onClick={() =>
                                handlePhysicalStockChange(
                                  item.id,
                                  'stockEnd',
                                  (Number(item.stockEnd) || 0) + 1
                                )
                              }
                              className="w-10 h-9 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black"
                            >
                              +1
                            </button>
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs pt-1 border-t border-stone-800">
                          <span>
                            Terjual Murni:{' '}
                            <b className="text-emerald-400">
                              {formatQty(item.directSold)} {item.unit}
                            </b>
                          </span>
                          {!item.isRawIngredientOnly && (
                            <span className="font-black text-amber-300">
                              {formatRp(item.revenue)}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="overflow-x-auto rounded-xl border border-stone-800">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-stone-950 text-stone-300 uppercase">
                        <tr>
                          <th className="p-2.5">Barang</th>
                          <th className="p-2.5 text-right">Harga Jual</th>
                          <th className="p-2.5 text-center">Stok Awal 🔒</th>
                          <th className="p-2.5 text-center">+ Masuk</th>
                          <th className="p-2.5 text-center">Rusak</th>
                          <th className="p-2.5 text-center">Dipakai Racikan</th>
                          <th className="p-2.5 text-center">Stok Akhir</th>
                          <th className="p-2.5 text-center">Laku Murni</th>
                          <th className="p-2.5 text-right">Omzet</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-stone-800">
                        {physicalStockList.map((item) => (
                          <tr key={item.id} className="hover:bg-stone-950/60">
                            <td className="p-2.5 font-bold">
                              {item.name}
                              <div className="text-[10px] text-stone-400">{item.category}</div>
                            </td>
                            <td className="p-2.5 text-right font-semibold text-amber-300">
                              {item.isRawIngredientOnly ? '-' : formatRp(item.price)}
                            </td>
                            <td className="p-2.5 text-center">
                              <button
                                type="button"
                                onClick={() => handleOpenTamperModal(item)}
                                className="px-2 py-1 rounded bg-stone-800 text-stone-200 font-bold"
                              >
                                🔒 {formatQty(item.stockStart)}
                              </button>
                            </td>
                            <td className="p-2.5 text-center">
                              <input
                                type="number"
                                min="0"
                                step="0.5"
                                value={item.stockIn}
                                onChange={(e) =>
                                  handlePhysicalStockChange(item.id, 'stockIn', e.target.value)
                                }
                                className="w-16 text-center bg-stone-950 border border-stone-700 rounded py-1"
                              />
                            </td>
                            <td className="p-2.5 text-center">
                              <input
                                type="number"
                                min="0"
                                step="0.5"
                                value={item.stockWaste}
                                onChange={(e) =>
                                  handlePhysicalStockChange(item.id, 'stockWaste', e.target.value)
                                }
                                className="w-16 text-center bg-stone-950 border border-stone-700 rounded py-1"
                              />
                            </td>
                            <td className="p-2.5 text-center font-bold text-cyan-300">
                              {formatQty(item.usedInCombo)}
                            </td>
                            <td className="p-2.5 text-center">
                              <input
                                type="number"
                                min="0"
                                step="0.5"
                                value={item.stockEnd}
                                onChange={(e) =>
                                  handlePhysicalStockChange(item.id, 'stockEnd', e.target.value)
                                }
                                className="w-20 text-center bg-stone-950 border border-amber-500 rounded py-1 font-extrabold text-amber-300"
                              />
                            </td>
                            <td className="p-2.5 text-center font-extrabold text-emerald-400">
                              {formatQty(item.directSold)} {item.unit}
                            </td>
                            <td className="p-2.5 text-right font-extrabold text-amber-300">
                              {item.isRawIngredientOnly ? '-' : formatRp(item.revenue)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </section>

            {/* ==================================================================
                BAGIAN 2: REKONSILIASI LACI KASIR & BELANJA HARIAN (BERDERET KE BAWAH)
               ================================================================== */}
            <section className="bg-stone-900 border border-stone-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-lg">
              <div>
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                  Bagian 2 dari 3 • Rekonsiliasi Kas & Belanja Dapur
                </span>
                <h2 className="text-base sm:text-lg font-black text-stone-100 mt-1">
                  💵 Hitung Uang Laci Kasir, QRIS & Catatan Belanja Harian
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* INPUT LACI KASIR */}
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-3">
                  <h3 className="text-xs font-extrabold uppercase text-amber-400">
                    A. Uang Tunai Laci & Mutasi QRIS
                  </h3>
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">
                      Modal Awal Laci (Uang Kembalian)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={openingCash}
                      onChange={(e) => setOpeningCash(Number(e.target.value) || 0)}
                      className="w-full bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-sm font-bold text-stone-200"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-stone-400 mb-1">
                      Total Mutasi QRIS / Transfer Shift Ini (Rp)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={qrisMutation}
                      onChange={(e) => setQrisMutation(Number(e.target.value) || 0)}
                      className="w-full bg-stone-900 border border-cyan-700/60 rounded-xl px-3 py-2 text-sm font-bold text-cyan-300"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-amber-300 font-bold mb-1">
                      👉 Total Uang Tunai Fisik di Laci Saat Tutup Shift (Rp)
                    </label>
                    <input
                      type="number"
                      min="0"
                      value={actualDrawerCash}
                      onChange={(e) => setActualDrawerCash(Number(e.target.value) || 0)}
                      className="w-full bg-stone-900 border-2 border-amber-500 rounded-xl px-3 py-2.5 text-base font-black text-amber-300"
                    />
                  </div>

                  <div className="pt-2 border-t border-stone-800 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-stone-400">Total Omzet Penjualan Barang:</span>
                      <b className="text-stone-100">{formatRp(shiftTotals.totalOmzet)}</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Seharusnya Tunai di Laci:</span>
                      <b className="text-stone-200">{formatRp(shiftTotals.expectedCashInDrawer)}</b>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-stone-400">Selisih Kasir (Kurang/Lebih):</span>
                      <b
                        className={
                          shiftTotals.cashVariance < 0 ? 'text-rose-400' : 'text-emerald-400'
                        }
                      >
                        {formatRp(shiftTotals.cashVariance)}
                      </b>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-stone-800 text-sm">
                      <span className="font-extrabold text-emerald-400">
                        Wajib Setor Tunai ke Brankas:
                      </span>
                      <b className="font-black text-emerald-300">
                        {formatRp(shiftTotals.vaultDeposit)}
                      </b>
                    </div>
                  </div>
                </div>

                {/* CATATAN BELANJA HARIAN (PETTY CASH) */}
                <div className="bg-stone-950 border border-stone-800 rounded-2xl p-4 space-y-3">
                  <h3 className="text-xs font-extrabold uppercase text-rose-400">
                    B. Catatan Belanja Dadakan dari Laci Kasir (Es Batu, Gas, Kresek, dll)
                  </h3>
                  <form onSubmit={handleAddExpense} className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      placeholder="Nama belanja (mis: Es Batu 2 Bal)"
                      value={expenseDesc}
                      onChange={(e) => setExpenseDesc(e.target.value)}
                      className="flex-1 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs"
                    />
                    <input
                      type="number"
                      placeholder="Nominal Rp"
                      value={expenseAmount}
                      onChange={(e) => setExpenseAmount(e.target.value)}
                      className="w-full sm:w-36 bg-stone-900 border border-stone-700 rounded-xl px-3 py-2 text-xs font-bold"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs"
                    >
                      + Catat
                    </button>
                  </form>

                  <div className="space-y-1.5 max-h-48 overflow-y-auto">
                    {expenses.length === 0 ? (
                      <p className="text-xs text-stone-500 italic py-4 text-center">
                        Belum ada pengeluaran kas laci pada shift ini.
                      </p>
                    ) : (
                      expenses.map((exp) => (
                        <div
                          key={exp.id}
                          className="flex items-center justify-between bg-stone-900 px-3 py-2 rounded-xl border border-stone-800 text-xs"
                        >
                          <div>
                            <span className="font-bold text-stone-200">{exp.desc}</span>
                            <span className="text-[10px] text-stone-500 ml-2">({exp.time})</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-rose-400">{formatRp(exp.amount)}</span>
                            <button
                              type="button"
                              onClick={() => handleRemoveExpense(exp.id)}
                              className="text-stone-500 hover:text-rose-400 font-bold"
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="flex justify-between pt-2 border-t border-stone-800 text-xs font-bold">
                    <span className="text-stone-400">Total Belanja Kasir:</span>
                    <span className="text-rose-400">{formatRp(shiftTotals.totalExpenses)}</span>
                  </div>
                </div>
              </div>
            </section>

            {/* ==================================================================
                BAGIAN 3: DOWNLOAD LAPORAN PDF/WORD & SHARE KE WA + GANTI TANGGAL OTOMATIS
               ================================================================== */}
            <section className="bg-gradient-to-br from-stone-900 via-stone-900 to-emerald-950/40 border-2 border-emerald-600/60 rounded-2xl p-4 sm:p-6 space-y-4 shadow-xl">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                    Bagian 3 dari 3 • Penutupan Shift & Kunci Stok Otomatis
                  </span>
                  <h2 className="text-base sm:text-xl font-black text-white mt-1">
                    📑 Unduh & Bagikan Dokumen Laporan Resmi (PDF / Word) ke Grup WA
                  </h2>
                  <p className="text-xs text-stone-300 mt-0.5">
                    Begitu tombol di bawah ditekan, <b>Stok Akhir otomatis dikunci menjadi Stok Awal shift berikutnya</b> dan tanggal/shift maju otomatis.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleDownloadPdfAndCloseShift}
                  className="py-3.5 px-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2"
                >
                  <span>📥 Download PDF & Kunci Shift</span>
                </button>

                <button
                  type="button"
                  onClick={handleSharePdfToWhatsApp}
                  className="py-3.5 px-4 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-lg flex items-center justify-center gap-2"
                >
                  <span>📲 Bagikan File Laporan ke Grup WA</span>
                </button>

                <button
                  type="button"
                  onClick={handleDownloadWordReport}
                  className="py-3.5 px-4 rounded-2xl bg-stone-800 hover:bg-stone-700 border border-stone-600 text-stone-100 font-bold text-xs sm:text-sm flex items-center justify-center gap-2"
                >
                  <span>📄 Download Format Word (.doc)</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ======================================================================
            MODE 2: PORTAL OWNER / ADMIN (DIKUNCI SANDI PIN KHUSUS OWNER)
           ====================================================================== */}
        {portalMode === 'owner' && (
          <div className="space-y-6">
            {!ownerAuthenticated ? (
              <div className="max-w-md mx-auto bg-stone-900 border-2 border-red-800/80 rounded-2xl p-6 space-y-5 shadow-2xl mt-6">
                <div className="w-48 h-28 mx-auto rounded-xl overflow-hidden border-2 border-red-800 bg-stone-50 p-1">
                  <img
                    src={customLogo || DEFAULT_WARKOP_LOGO}
                    alt="Warkop Sumber Redjeki"
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="text-center space-y-1">
                  <h2 className="text-lg font-black text-amber-400">
                    🔐 Portal Khusus Owner / Admin
                  </h2>
                  <p className="text-xs text-stone-400">
                    Masukkan Sandi / PIN Owner untuk mengakses HPP, Keuntungan, Edit Resep, Radar Stok Menipis & Laporan Laba Rugi.
                  </p>
                </div>

                <form onSubmit={handleOwnerLogin} className="space-y-3">
                  <input
                    type="password"
                    placeholder="Masukkan Sandi / PIN Owner..."
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    className="w-full text-center bg-stone-950 border border-stone-700 rounded-xl px-4 py-3 text-base font-black tracking-widest text-amber-300"
                  />
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-black text-sm shadow-lg"
                  >
                    🔓 Buka Dashboard Owner
                  </button>
                </form>

                <div className="pt-3 border-t border-stone-800 text-center">
                  <button
                    type="button"
                    onClick={() => {
                      setShowChangePinModal(true);
                      setPinModalMessage({ type: '', text: '' });
                    }}
                    className="text-xs font-bold text-amber-400 hover:underline"
                  >
                    🔑 Ubah Sandi / Lupa PIN Khusus Owner
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* BAR ATAS DASHBOARD OWNER */}
                <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-base sm:text-lg font-black text-amber-400">
                      👑 Ruang Kendali Owner — Warkop Sumber Redjeki (生计来源)
                    </h2>
                    <p className="text-xs text-stone-400">
                      Seluruh HPP, Margin Keuntungan, Edit Resep Otomatis, dan Kalkulator Belanja hanya terlihat oleh Anda.
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setCustomLogo(DEFAULT_WARKOP_LOGO);
                        showToast('🖼️ Logo dikembalikan ke Logo Resmi Warkop Sumber Redjeki!');
                      }}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-xs font-bold text-stone-200"
                    >
                      🖼️ Reset Logo Resmi
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowChangePinModal(true);
                        setPinModalMessage({ type: '', text: '' });
                      }}
                      className="px-3 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/50 text-amber-300 text-xs font-bold"
                    >
                      🔑 Ubah Sandi Owner
                    </button>
                    <button
                      type="button"
                      onClick={() => setOwnerAuthenticated(false)}
                      className="px-3 py-1.5 rounded-xl bg-rose-600/20 border border-rose-500/40 text-rose-300 text-xs font-bold"
                    >
                      🔒 Kunci Kembali
                    </button>
                  </div>
                </div>

                {/* BANNER PERINGATAN STOK MENIPIS & ESTIMASI RUPIAH BELANJA KULAKAN OWNER */}
                <div className="bg-gradient-to-r from-amber-950/60 via-stone-900 to-red-950/50 border-2 border-amber-500/60 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <span className="text-[11px] font-extrabold uppercase px-2.5 py-0.5 rounded-full bg-amber-500 text-stone-950">
                        🛒 Radar Stok Menipis & Estimasi Modal Kulakan Owner
                      </span>
                      <h3 className="text-sm sm:text-base font-black text-white mt-1">
                        {lowStockReport.items.length > 0
                          ? `Ada ${lowStockReport.items.length} Barang yang Stoknya Menipis / Habis!`
                          : 'Semua Stok Barang di Atas Batas Aman'}
                      </h3>
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={handleCopyShoppingListToWA}
                        className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow"
                      >
                        📲 Salin Daftar Belanja ke WA
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-stone-950/90 border border-amber-500/40 rounded-xl p-3">
                      <span className="text-[11px] text-stone-400 block">
                        Estimasi Uang Belanja (Sesuai Kebutuhan Unit HPP)
                      </span>
                      <span className="text-lg sm:text-xl font-black text-amber-300">
                        {formatRp(lowStockReport.totalEstUnitSpend)}
                      </span>
                    </div>
                    <div className="bg-stone-950/90 border border-cyan-500/40 rounded-xl p-3">
                      <span className="text-[11px] text-stone-400 block">
                        Estimasi Belanja Grosir Penuh (Per Dus / Renceng / Pak)
                      </span>
                      <span className="text-lg sm:text-xl font-black text-cyan-300">
                        {formatRp(lowStockReport.totalEstPackSpend)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* NAVIGASI TAB OWNER (PERSIS SEPERTI GAMBAR) */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                  {[
                    { id: 'audit', label: '1. Radar Audit &\nBelanja Kulakan' },
                    { id: 'gudang', label: '2. Master 50 HPP\nWarkop Fix & Gudang' },
                    { id: 'pekerja', label: '3. Custom Pekerja, Gaji\n& Absensi' },
                    { id: 'labarugi', label: '4. Pembukuan 1 Bulan\n& Sinking Fund' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setOwnerTab(t.id)}
                      className={`py-3.5 px-4 rounded-2xl text-xs sm:text-sm font-extrabold text-left whitespace-pre-line leading-snug transition ${
                        ownerTab === t.id
                          ? 'bg-red-800/90 text-white border-2 border-amber-400 shadow-lg'
                          : 'bg-stone-900/90 text-stone-400 border border-stone-800 hover:text-stone-200'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* TAB 1: AUDIT SEGEL STOK AWAL & RINCIAN BELANJA STOK MENIPIS */}
                {ownerTab === 'audit' && (
                  <div className="space-y-5">
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-2xl">
                        <span className="text-[11px] text-stone-400">Omzet Shift Berjalan</span>
                        <div className="text-base sm:text-lg font-black text-amber-300 mt-1">
                          {formatRp(shiftTotals.totalOmzet)}
                        </div>
                      </div>
                      <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-2xl">
                        <span className="text-[11px] text-stone-400">Total Modal HPP</span>
                        <div className="text-base sm:text-lg font-black text-rose-300 mt-1">
                          {formatRp(shiftTotals.totalHPP)}
                        </div>
                      </div>
                      <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-2xl">
                        <span className="text-[11px] text-stone-400">Laba Kotor (Margin)</span>
                        <div className="text-base sm:text-lg font-black text-emerald-400 mt-1">
                          {formatRp(shiftTotals.grossProfit)}
                        </div>
                      </div>
                      <div className="bg-stone-900 border border-stone-800 p-3.5 rounded-2xl">
                        <span className="text-[11px] text-stone-400">Setoran Tunai Brankas</span>
                        <div className="text-base sm:text-lg font-black text-cyan-300 mt-1">
                          {formatRp(shiftTotals.vaultDeposit)}
                        </div>
                      </div>
                    </div>

                    {/* RINCIAN BARANG MENIPIS */}
                    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-3">
                      <h3 className="text-sm font-black text-amber-400">
                        🛒 Rincian Barang Menipis & Perkiraan Biaya Belanja
                      </h3>
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead className="bg-stone-950 text-stone-400">
                            <tr>
                              <th className="p-2">Nama Barang</th>
                              <th className="p-2 text-center">Sisa Stok</th>
                              <th className="p-2 text-center">Wajib Beli</th>
                              <th className="p-2 text-right">HPP Satuan</th>
                              <th className="p-2 text-right">Estimasi Eceran</th>
                              <th className="p-2 text-right">Harga Grosir (Dus/Renceng)</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-stone-800">
                            {lowStockReport.items.map((item) => (
                              <tr key={item.id}>
                                <td className="p-2 font-bold text-stone-200">{item.name}</td>
                                <td className="p-2 text-center text-rose-400 font-bold">
                                  {formatQty(item.currentTotalStock)} {item.unit}
                                </td>
                                <td className="p-2 text-center font-bold text-amber-300">
                                  +{formatQty(item.restockQty)} {item.unit}
                                </td>
                                <td className="p-2 text-right">{formatRp(item.unitCost)}</td>
                                <td className="p-2 text-right font-bold text-amber-300">
                                  {formatRp(item.estRestockCost)}
                                </td>
                                <td className="p-2 text-right font-bold text-cyan-300">
                                  {item.packCost > 0 ? formatRp(item.packCost) : formatRp(item.estRestockCost)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {/* LOG BUKA SEGEL STOK AWAL */}
                    <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-3">
                      <h3 className="text-sm font-black text-rose-400">
                        🚨 Radar Anti-Manipulasi (Log Perubahan Stok Awal oleh Kasir)
                      </h3>
                      {tamperLogs.length === 0 ? (
                        <p className="text-xs text-stone-400">
                          ✅ Aman! Belum ada kasir yang mengubah angka Stok Awal Terkunci.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {tamperLogs.map((log) => (
                            <div
                              key={log.id}
                              className="p-3 rounded-xl bg-rose-950/30 border border-rose-700/50 text-xs flex flex-wrap justify-between gap-2"
                            >
                              <div>
                                <b className="text-rose-300">{log.itemName}</b> diubah dari{' '}
                                <b>{log.oldStart}</b> menjadi <b>{log.newStart}</b> oleh{' '}
                                <b className="text-amber-300">{log.workerName}</b>
                                <div className="text-stone-300">Alasan: &ldquo;{log.reason}&rdquo;</div>
                              </div>
                              <span className="text-stone-400 text-[11px]">{log.timestamp}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* TAB 2: MASTER 50 HPP WARKOP FIX & EDIT RESEP OTOMATIS */}
                {ownerTab === 'gudang' && (
                  <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="text-sm sm:text-base font-black text-amber-400">
                          📦 Master 50 Menu & Bahan Baku (`HPP WARKOP FIX.xlsx`) + Editor Resep Otomatis
                        </h3>
                        <p className="text-xs text-stone-400">
                          Klik <b>✏️ Edit / Resep</b> untuk mengubah harga, HPP, atau mengatur takaran bahan baku (bisa diisi pecahan desimal seperti <b>0.5</b> bungkus mie untuk Omlet).
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <button
                          type="button"
                          onClick={openAddItemModal}
                          className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs"
                        >
                          + Tambah Menu / Barang
                        </button>
                        <button
                          type="button"
                          onClick={handleLoadHppFixCatalog}
                          className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white font-extrabold text-xs"
                        >
                          📊 Muat Ulang 50 HPP Fix
                        </button>
                        <button
                          type="button"
                          onClick={handleZeroOutAllStock}
                          className="px-3.5 py-2 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-extrabold text-xs"
                        >
                          🔄 0-kan Semua Stok
                        </button>
                      </div>
                    </div>

                    <div className="overflow-x-auto rounded-xl border border-stone-800">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-stone-950 text-stone-300">
                          <tr>
                            <th className="p-2.5">No</th>
                            <th className="p-2.5">Nama Menu / Barang</th>
                            <th className="p-2.5">Jenis & Resep Potong Stok</th>
                            <th className="p-2.5 text-right">Harga Grosir</th>
                            <th className="p-2.5 text-right">HPP Akhir</th>
                            <th className="p-2.5 text-right">Harga Jual</th>
                            <th className="p-2.5 text-right">Keuntungan</th>
                            <th className="p-2.5 text-center">Stok Awal</th>
                            <th className="p-2.5 text-center">Stok Akhir</th>
                            <th className="p-2.5 text-center">Aksi Owner</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-stone-800">
                          {calculatedInventory.map((item, idx) => (
                            <tr key={item.id} className="hover:bg-stone-950/60">
                              <td className="p-2.5 text-stone-400">{idx + 1}</td>
                              <td className="p-2.5 font-bold text-stone-100">
                                {item.name}
                                <div className="text-[10px] text-stone-400">{item.category}</div>
                              </td>
                              <td className="p-2.5">
                                {item.isMenuCombo ? (
                                  <div className="text-[11px] text-amber-300">
                                    🍳 Menu Racikan
                                    <div className="text-[10px] text-stone-400">
                                      {Array.isArray(item.recipe) && item.recipe.length > 0
                                        ? item.recipe
                                            .map((r) => {
                                              const ing = inventory.find(
                                                (x) => x.id === r.ingredientId
                                              );
                                              return ing
                                                ? `${formatQty(r.qty)} ${ing.name}`
                                                : '';
                                            })
                                            .filter(Boolean)
                                            .join(' + ')
                                        : 'Tanpa potong stok fisik'}
                                    </div>
                                  </div>
                                ) : (
                                  <span className="text-[11px] text-cyan-300">
                                    📦 Stok Fisik ({item.unit})
                                  </span>
                                )}
                              </td>
                              <td className="p-2.5 text-right text-stone-300">
                                {item.packCost > 0 ? formatRp(item.packCost) : '-'}
                              </td>
                              <td className="p-2.5 text-right font-semibold text-rose-300">
                                {formatRp(item.cost)}
                              </td>
                              <td className="p-2.5 text-right font-bold text-amber-300">
                                {formatRp(item.price)}
                              </td>
                              <td className="p-2.5 text-right font-extrabold text-emerald-400">
                                {formatRp((Number(item.price) || 0) - (Number(item.cost) || 0))}
                              </td>
                              <td className="p-2.5 text-center">
                                {item.isMenuCombo ? '-' : formatQty(item.stockStart)}
                              </td>
                              <td className="p-2.5 text-center">
                                {item.isMenuCombo ? '-' : formatQty(item.stockEnd)}
                              </td>
                              <td className="p-2.5 text-center">
                                <div className="flex items-center justify-center gap-1.5">
                                  <button
                                    type="button"
                                    onClick={() => openEditItemModal(item)}
                                    className="px-2.5 py-1 rounded-lg bg-amber-500/20 border border-amber-500/50 text-amber-300 font-bold"
                                  >
                                    ✏️ Edit / Resep
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => handleDeleteItem(item.id, item.name)}
                                    className="px-2 py-1 rounded-lg bg-rose-500/20 border border-rose-500/40 text-rose-300 font-bold"
                                  >
                                    🗑️
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* TAB 3: GAJI & ABSENSI PEKERJA */}
                {ownerTab === 'pekerja' && (
                  <div className="bg-stone-900 border border-stone-800 rounded-2xl p-4 space-y-4">
                    <h3 className="text-sm sm:text-base font-black text-amber-400">
                      👥 Manajemen Pekerja & Gaji Harian
                    </h3>
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        if (!newWorkerName.trim()) return;
                        setWorkers((prev) => [
                          ...prev,
                          {
                            id: 'w-' + Date.now(),
                            name: newWorkerName.trim(),
                            role: newWorkerRole,
                            dailyRate: Number(newWorkerRate) || 0,
                            bonusShift: 0,
                          },
                        ]);
                        setNewWorkerName('');
                        setNewWorkerRate(0);
                        showToast('✅ Pekerja baru berhasil ditambahkan!');
                      }}
                      className="grid grid-cols-1 sm:grid-cols-4 gap-2"
                    >
                      <input
                        type="text"
                        placeholder="Nama Pekerja..."
                        value={newWorkerName}
                        onChange={(e) => setNewWorkerName(e.target.value)}
                        className="bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs"
                      />
                      <input
                        type="text"
                        placeholder="Jabatan / Shift..."
                        value={newWorkerRole}
                        onChange={(e) => setNewWorkerRole(e.target.value)}
                        className="bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs"
                      />
                      <input
                        type="number"
                        placeholder="Gaji per Shift (Rp)"
                        value={newWorkerRate}
                        onChange={(e) => setNewWorkerRate(e.target.value)}
                        className="bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-xs"
                      />
                      <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold rounded-xl py-2 text-xs"
                      >
                        + Tambah Pekerja
                      </button>
                    </form>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {workers.map((w) => {
                        const shiftsCount = attendanceLogs.filter(
                          (a) => a.workerId === w.id
                        ).length;
                        const totalSalary = shiftsCount * (Number(w.dailyRate) || 0);
                        return (
                          <div
                            key={w.id}
                            className="bg-stone-950 border border-stone-800 rounded-xl p-3.5 flex items-center justify-between"
                          >
                            <div>
                              <div className="font-extrabold text-sm text-stone-100">{w.name}</div>
                              <div className="text-xs text-stone-400">{w.role}</div>
                              <div className="text-xs text-amber-300 mt-1">
                                Hadir: <b>{shiftsCount} Shift</b> • Total Gaji:{' '}
                                <b>{formatRp(totalSalary)}</b>
                              </div>
                            </div>
                            <div className="text-right space-y-1">
                              <label className="block text-[10px] text-stone-400">
                                Gaji / Shift (Rp)
                              </label>
                              <input
                                type="number"
                                min="0"
                                value={w.dailyRate}
                                onChange={(e) => {
                                  const val = Number(e.target.value) || 0;
                                  setWorkers((prev) =>
                                    prev.map((x) =>
                                      x.id === w.id ? { ...x, dailyRate: val } : x
                                    )
                                  );
                                }}
                                className="w-28 bg-stone-900 border border-stone-700 rounded-lg px-2 py-1 text-xs font-bold text-right text-emerald-300"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* TAB 4: PEMBUKUAN 1 BULAN & SINKING FUND (SIMPEL SESUAI GAMBAR) */}
                {ownerTab === 'labarugi' && (() => {
                  const monthlyOmzet = shiftTotals.historyOmzet + shiftTotals.totalOmzet;
                  const monthlyHPP = shiftTotals.historyHPP + shiftTotals.totalHPP;
                  const monthlyGrossProfit = monthlyOmzet - monthlyHPP;
                  const monthlyPettyCash =
                    shiftTotals.historyExpenses + shiftTotals.totalExpenses;
                  const monthlyWorkerWages =
                    shiftTotals.historyWages +
                    (shiftTotals.totalOmzet > 0 ? shiftTotals.currentShiftWage : 0);
                  const totalBebanRukoSinking =
                    (Number(monthlyRent) || 0) +
                    sinkingFunds.reduce(
                      (acc, sf) => acc + (Number(sf.targetMonthly) || 0),
                      0
                    );
                  const monthlyNetProfit =
                    monthlyGrossProfit -
                    monthlyPettyCash -
                    monthlyWorkerWages -
                    totalBebanRukoSinking;

                  return (
                    <div className="space-y-6">
                      {/* KARTU 1: PEMBUKUAN 1 BULAN FULL (30 HARI) & INTEGRASI GOOGLE SHEETS */}
                      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 sm:p-8 space-y-6 shadow-2xl">
                        <h3 className="text-lg sm:text-xl font-black text-white text-center flex items-center justify-center gap-2.5">
                          <span>📊</span>
                          <span>Pembukuan 1 Bulan Full (30 Hari) & Integrasi Google Sheets</span>
                        </h3>

                        <div className="bg-stone-950/90 border border-stone-800/90 rounded-2xl p-5 sm:p-6 space-y-3.5 text-xs sm:text-sm">
                          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                            <span className="text-stone-400 font-medium">
                              Total Pemasukan / Omzet:
                            </span>
                            <span className="font-black text-emerald-400">
                              {formatRp(monthlyOmzet)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                            <span className="text-stone-400 font-medium">
                              Total Modal HPP Bahan Baku:
                            </span>
                            <span className="font-black text-amber-400">
                              {formatRp(monthlyHPP)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                            <span className="text-stone-400 font-medium">
                              Laba Kotor (Gross Profit):
                            </span>
                            <span className="font-black text-white">
                              {formatRp(monthlyGrossProfit)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                            <span className="text-stone-400 font-medium">
                              Pengeluaran Kasir (Petty Cash):
                            </span>
                            <span className="font-black text-rose-500">
                              {formatRp(monthlyPettyCash)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                            <span className="text-stone-400 font-medium">
                              Total Gaji Pekerja:
                            </span>
                            <span className="font-black text-rose-500">
                              {formatRp(monthlyWorkerWages)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between border-b border-stone-800/80 pb-3">
                            <span className="text-stone-400 font-medium">
                              Total Beban Ruko, Listrik & Sinking Fund:
                            </span>
                            <span className="font-black text-rose-500">
                              {formatRp(totalBebanRukoSinking)}
                            </span>
                          </div>

                          <div className="flex items-center justify-between pt-2 text-sm sm:text-lg">
                            <span className="font-black text-amber-400 uppercase tracking-wide">
                              PROFIT BERSIH (NET PROFIT):
                            </span>
                            <span className="font-black text-emerald-400">
                              {formatRp(monthlyNetProfit)}
                            </span>
                          </div>
                        </div>

                        <div className="space-y-3 pt-1">
                          <label className="block text-center text-xs sm:text-sm text-stone-400">
                            URL Webhook Google Apps Script (Akhiran /exec):
                          </label>
                          <input
                            type="url"
                            placeholder="https://script.google.com/macros/s/.../exec"
                            value={gsWebhookUrl}
                            onChange={(e) => setGsWebhookUrl(e.target.value)}
                            className="w-full bg-stone-950 border border-stone-800 rounded-2xl px-4 py-3.5 text-xs sm:text-sm text-stone-200 focus:outline-none focus:border-emerald-500"
                          />
                          <button
                            type="button"
                            onClick={async () => {
                              if (gsWebhookUrl.trim()) {
                                try {
                                  await fetch(gsWebhookUrl.trim(), {
                                    method: 'POST',
                                    mode: 'no-cors',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({
                                      periode: selectedDate.slice(0, 7),
                                      tanggalTutup: selectedDate,
                                      totalOmzet: monthlyOmzet,
                                      totalHPP: monthlyHPP,
                                      labaKotor: monthlyGrossProfit,
                                      totalBelanjaKasir: monthlyPettyCash,
                                      totalGaji: monthlyWorkerWages,
                                      bebanSewaRuko: Number(monthlyRent) || 0,
                                      totalSinkingFund: totalBebanRukoSinking,
                                      totalPengeluaran:
                                        monthlyHPP +
                                        monthlyPettyCash +
                                        monthlyWorkerWages +
                                        totalBebanRukoSinking,
                                      profitBersih: monthlyNetProfit,
                                    }),
                                  });
                                  showToast(
                                    '🚀 Pembukuan 1 Bulan Full berhasil dikirim ke Google Sheets!'
                                  );
                                  return;
                                } catch (err) {
                                  // fallback unduh CSV jika gagal koneksi
                                }
                              }
                              const csvRows = [
                                ['Kategori Pembukuan 1 Bulan', 'Nominal (Rp)'],
                                ['Periode Bulan', selectedDate.slice(0, 7)],
                                ['Total Pemasukan / Omzet', monthlyOmzet],
                                ['Total Modal HPP Bahan Baku', monthlyHPP],
                                ['Laba Kotor (Gross Profit)', monthlyGrossProfit],
                                ['Pengeluaran Kasir (Petty Cash)', monthlyPettyCash],
                                ['Total Gaji Pekerja', monthlyWorkerWages],
                                [
                                  'Total Beban Ruko, Listrik & Sinking Fund',
                                  totalBebanRukoSinking,
                                ],
                                ['PROFIT BERSIH (NET PROFIT)', monthlyNetProfit],
                              ];
                              const csvString = csvRows.map((r) => r.join(',')).join('\n');
                              const blob = new Blob(['\ufeff' + csvString], {
                                type: 'text/csv;charset=utf-8;',
                              });
                              const url = URL.createObjectURL(blob);
                              const a = document.createElement('a');
                              a.href = url;
                              a.download = `Pembukuan-1-Bulan-Warkop-${selectedDate.slice(0, 7)}.csv`;
                              document.body.appendChild(a);
                              a.click();
                              document.body.removeChild(a);
                              URL.revokeObjectURL(url);
                              showToast(
                                '📊 File Pembukuan 1 Bulan (.csv untuk Excel/Google Sheets) berhasil diunduh!'
                              );
                            }}
                            className="w-full py-4 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs sm:text-sm shadow-lg transition flex items-center justify-center gap-2"
                          >
                            <span>🚀 Kirim / Unduh Pembukuan 1 Bulan Full ke Google Sheets</span>
                          </button>
                        </div>
                      </div>

                      {/* KARTU 2: CUSTOM TARGETAN SINKING FUND */}
                      <div className="bg-stone-900/90 border border-stone-800 rounded-3xl p-5 sm:p-8 space-y-5 shadow-2xl">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                          <h3 className="text-lg sm:text-xl font-black text-white flex items-center gap-2.5">
                            <span className="text-amber-400">🐖</span>
                            <span>Custom Targetan Sinking Fund</span>
                          </h3>
                          <button
                            type="button"
                            onClick={() => {
                              setSinkingFunds((prev) => [
                                ...prev,
                                {
                                  id: 'sf-' + Date.now(),
                                  name: 'Pos Sinking Fund Baru',
                                  dailyDeposit: 0,
                                  targetMonthly: 0,
                                },
                              ]);
                              showToast('✅ Pos Sinking Fund baru berhasil ditambahkan!');
                            }}
                            className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-600 text-white font-extrabold text-xs sm:text-sm shadow"
                          >
                            + Tambah Pos Baru
                          </button>
                        </div>

                        <div className="space-y-4">
                          {sinkingFunds.map((sf) => {
                            const dailyVal =
                              sf.dailyDeposit !== undefined
                                ? sf.dailyDeposit
                                : Math.round((Number(sf.targetMonthly) || 0) / 30);
                            return (
                              <div
                                key={sf.id}
                                className="bg-stone-950/90 border border-stone-800/90 rounded-2xl p-4 sm:p-5 space-y-3"
                              >
                                <div className="flex items-center justify-between gap-2">
                                  <input
                                    type="text"
                                    value={sf.name}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      setSinkingFunds((prev) =>
                                        prev.map((x) =>
                                          x.id === sf.id ? { ...x, name: val } : x
                                        )
                                      );
                                    }}
                                    className="flex-1 bg-transparent text-amber-400 font-extrabold text-xs sm:text-sm focus:outline-none focus:border-b focus:border-amber-500"
                                  />
                                  <button
                                    type="button"
                                    onClick={() =>
                                      setSinkingFunds((prev) =>
                                        prev.filter((x) => x.id !== sf.id)
                                      )
                                    }
                                    className="text-stone-500 hover:text-rose-400 transition p-1"
                                    title="Hapus Pos Sinking Fund"
                                  >
                                    🗑️
                                  </button>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="block text-center text-[11px] sm:text-xs text-stone-400 mb-1.5">
                                      Setoran / Hari (Rp)
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={dailyVal}
                                      onChange={(e) => {
                                        const d = Math.max(0, Number(e.target.value) || 0);
                                        setSinkingFunds((prev) =>
                                          prev.map((x) =>
                                            x.id === sf.id
                                              ? {
                                                  ...x,
                                                  dailyDeposit: d,
                                                  targetMonthly: d * 30,
                                                }
                                              : x
                                          )
                                        );
                                      }}
                                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-black text-white"
                                    />
                                  </div>

                                  <div>
                                    <label className="block text-center text-[11px] sm:text-xs text-stone-400 mb-1.5">
                                      Target Bulanan (Rp)
                                    </label>
                                    <input
                                      type="number"
                                      min="0"
                                      value={sf.targetMonthly}
                                      onChange={(e) => {
                                        const m = Math.max(0, Number(e.target.value) || 0);
                                        setSinkingFunds((prev) =>
                                          prev.map((x) =>
                                            x.id === sf.id
                                              ? {
                                                  ...x,
                                                  targetMonthly: m,
                                                  dailyDeposit: Math.round(m / 30),
                                                }
                                              : x
                                          )
                                        );
                                      }}
                                      className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-black text-emerald-400"
                                    />
                                  </div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        )}
      </main>

      {/* ========================================================================
          MODAL EDIT BARANG & RESEP OTOMATIS POTONG STOK (MENDUKUNG PECAHAN 0.5)
         ======================================================================== */}
      {showItemModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-amber-500/60 rounded-2xl max-w-xl w-full p-5 space-y-4 text-xs max-h-[92vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-black text-amber-400">
                {editingItem ? `✏️ Edit "${editingItem.name}" & Resep` : '+ Tambah Menu / Barang Baru'}
              </h3>
              <button
                type="button"
                onClick={() => setShowItemModal(false)}
                className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveItemModal} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-400 mb-1">Nama Menu / Barang</label>
                  <input
                    type="text"
                    value={itemForm.name}
                    onChange={(e) => setItemForm({ ...itemForm, name: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 font-bold text-stone-100"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Kategori</label>
                  <input
                    type="text"
                    value={itemForm.category}
                    onChange={(e) => setItemForm({ ...itemForm, category: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 font-bold text-stone-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                <div>
                  <label className="block text-stone-400 mb-1">Satuan</label>
                  <input
                    type="text"
                    value={itemForm.unit}
                    onChange={(e) => setItemForm({ ...itemForm, unit: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-stone-400 mb-1">Harga Grosir</label>
                  <input
                    type="number"
                    value={itemForm.packCost}
                    onChange={(e) => setItemForm({ ...itemForm, packCost: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 font-bold"
                  />
                </div>
                <div>
                  <label className="block text-rose-300 mb-1">HPP Akhir (Rp)</label>
                  <input
                    type="number"
                    value={itemForm.cost}
                    onChange={(e) => setItemForm({ ...itemForm, cost: e.target.value })}
                    className="w-full bg-stone-950 border border-rose-700 rounded-xl px-3 py-2 font-bold text-rose-300"
                  />
                </div>
                <div>
                  <label className="block text-amber-300 mb-1">Harga Jual (Rp)</label>
                  <input
                    type="number"
                    value={itemForm.price}
                    onChange={(e) => setItemForm({ ...itemForm, price: e.target.value })}
                    className="w-full bg-stone-950 border border-amber-500 rounded-xl px-3 py-2 font-bold text-amber-300"
                  />
                </div>
              </div>

              {/* TOGGLE MENU RACIKAN & RESEP POTONG STOK OTOMATIS */}
              <div className="p-3.5 rounded-xl bg-stone-950 border border-amber-500/40 space-y-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={itemForm.isMenuCombo}
                    onChange={(e) =>
                      setItemForm({ ...itemForm, isMenuCombo: e.target.checked })
                    }
                    className="w-4 h-4 accent-amber-500"
                  />
                  <span className="font-extrabold text-amber-300">
                    🍳 Apakah ini Menu Racikan / Campuran (Nasi Campur, Omlet, Josu)?
                  </span>
                </label>

                {itemForm.isMenuCombo ? (
                  <div className="space-y-2 pt-2 border-t border-stone-800">
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] text-stone-300 font-bold">
                        Resep Otomatis Potong Stok (Bisa isi desimal seperti <b>0.5</b> untuk 1/2 Mie Omlet):
                      </span>
                      <button
                        type="button"
                        onClick={() =>
                          setItemForm({
                            ...itemForm,
                            recipe: [
                              ...(itemForm.recipe || []),
                              { ingredientId: 'm-17', qty: 1 },
                            ],
                          })
                        }
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-bold text-[11px]"
                      >
                        + Tambah Bahan Resep
                      </button>
                    </div>

                    {(itemForm.recipe || []).map((r, rIdx) => (
                      <div key={rIdx} className="flex items-center gap-2">
                        <select
                          value={r.ingredientId}
                          onChange={(e) => {
                            const updated = [...itemForm.recipe];
                            updated[rIdx] = { ...updated[rIdx], ingredientId: e.target.value };
                            setItemForm({ ...itemForm, recipe: updated });
                          }}
                          className="flex-1 bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 text-xs"
                        >
                          {inventory
                            .filter((x) => !x.isMenuCombo)
                            .map((ing) => (
                              <option key={ing.id} value={ing.id}>
                                {ing.name} ({ing.unit})
                              </option>
                            ))}
                        </select>
                        <input
                          type="number"
                          step="0.25"
                          min="0.1"
                          value={r.qty}
                          onChange={(e) => {
                            const updated = [...itemForm.recipe];
                            updated[rIdx] = { ...updated[rIdx], qty: e.target.value };
                            setItemForm({ ...itemForm, recipe: updated });
                          }}
                          className="w-20 text-center bg-stone-900 border border-amber-500 rounded-lg py-1.5 font-extrabold text-amber-300"
                          title="Isi 0.5 untuk setengah bungkus"
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = itemForm.recipe.filter((_, i) => i !== rIdx);
                            setItemForm({ ...itemForm, recipe: updated });
                          }}
                          className="px-2.5 py-1.5 rounded-lg bg-rose-600/30 text-rose-300 font-bold"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-2 pt-2 border-t border-stone-800">
                    <div>
                      <label className="block text-stone-400 mb-1">Stok Awal Etalase</label>
                      <input
                        type="number"
                        step="0.5"
                        value={itemForm.stockStart}
                        onChange={(e) => setItemForm({ ...itemForm, stockStart: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Stok Akhir Fisik</label>
                      <input
                        type="number"
                        step="0.5"
                        value={itemForm.stockEnd}
                        onChange={(e) => setItemForm({ ...itemForm, stockEnd: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 font-bold"
                      />
                    </div>
                    <div>
                      <label className="block text-stone-400 mb-1">Batas Stok Tipis</label>
                      <input
                        type="number"
                        value={itemForm.minStock}
                        onChange={(e) => setItemForm({ ...itemForm, minStock: e.target.value })}
                        className="w-full bg-stone-900 border border-stone-700 rounded-lg px-2.5 py-1.5 font-bold"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowItemModal(false)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black"
                >
                  💾 Simpan Perubahan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================
          MODAL KOREKSI STOK AWAL TERKUNCI (WAJIB ALASAN AUDIT)
         ======================================================================== */}
      {tamperModalItem && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-stone-900 border-2 border-rose-500 rounded-2xl max-w-md w-full p-5 space-y-4 text-xs">
            <h3 className="text-base font-black text-rose-400">
              ⚠️ Buka Segel Stok Awal: {tamperModalItem.name}
            </h3>
            <p className="text-stone-300">
              Stok Awal dikunci otomatis dari Stok Akhir shift sebelumnya. Setiap perubahan akan langsung tercatat di <b>Radar Audit Owner</b>.
            </p>
            <form onSubmit={handleConfirmTamperStock} className="space-y-3">
              <div>
                <label className="block text-stone-400 mb-1">Angka Stok Awal Baru</label>
                <input
                  type="number"
                  step="0.5"
                  value={newStartValue}
                  onChange={(e) => setNewStartValue(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 text-sm font-black text-amber-300"
                />
              </div>
              <div>
                <label className="block text-stone-400 mb-1">
                  Alasan Perubahan (Wajib Diisi Jujur)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Selisih hitung shift malam / barang baru masuk..."
                  value={tamperReason}
                  onChange={(e) => setTamperReason(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2"
                />
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setTamperModalItem(null)}
                  className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-rose-600 text-white font-black"
                >
                  Simpan & Kirim Log ke Owner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================
          MODAL UBAH SANDI / PIN KHUSUS OWNER
         ======================================================================== */}
      {showChangePinModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-amber-500/60 rounded-2xl max-w-md w-full p-5 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-stone-800 pb-2">
              <h3 className="text-base font-black text-amber-400">
                🔐 Ubah Sandi / PIN Khusus Owner
              </h3>
              <button
                type="button"
                onClick={() => setShowChangePinModal(false)}
                className="px-2 py-1 rounded bg-stone-800 text-stone-300"
              >
                ✕
              </button>
            </div>

            {pinModalMessage.text && (
              <div className="p-2.5 rounded-xl bg-rose-950/60 border border-rose-600 text-rose-200 font-bold">
                {pinModalMessage.text}
              </div>
            )}

            <form onSubmit={handleSaveNewOwnerPin} className="space-y-3">
              {!useRecoveryMode ? (
                <div>
                  <label className="block text-stone-400 mb-1">Masukkan Sandi Owner Lama</label>
                  <input
                    type="password"
                    value={oldPinField}
                    onChange={(e) => setOldPinField(e.target.value)}
                    className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 font-bold"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-amber-300 mb-1">
                    Masukkan Kata Kunci Pemulihan Rahasia Owner
                  </label>
                  <input
                    type="text"
                    placeholder="Default: RAOSEUN"
                    value={recoveryWordField}
                    onChange={(e) => setRecoveryWordField(e.target.value)}
                    className="w-full bg-stone-950 border border-amber-500 rounded-xl px-3 py-2 font-bold"
                  />
                </div>
              )}

              <div>
                <label className="block text-stone-400 mb-1">Sandi / PIN Owner Baru</label>
                <input
                  type="password"
                  value={newPinField}
                  onChange={(e) => setNewPinField(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 font-bold"
                />
              </div>
              <div>
                <label className="block text-stone-400 mb-1">Ulangi Sandi / PIN Baru</label>
                <input
                  type="password"
                  value={confirmPinField}
                  onChange={(e) => setConfirmPinField(e.target.value)}
                  className="w-full bg-stone-950 border border-stone-700 rounded-xl px-3 py-2 font-bold"
                />
              </div>

              <div className="flex items-center justify-between pt-1">
                <button
                  type="button"
                  onClick={() => setUseRecoveryMode(!useRecoveryMode)}
                  className="text-amber-400 hover:underline font-bold"
                >
                  {useRecoveryMode ? 'Gunakan Sandi Lama' : 'Lupa Sandi Lama?'}
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-amber-500 text-stone-950 font-black"
                >
                  Simpan Sandi Baru
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================
          MODAL PANEL KONTROL SINKRONISASI CLOUD ANTAR-HP & PANDUAN DOMAIN
         ======================================================================== */}
      {showCloudModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-stone-900 border border-emerald-500/60 rounded-2xl max-w-2xl w-full p-5 space-y-4 text-xs max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-800 pb-3">
              <h3 className="text-base font-extrabold text-emerald-400">
                🌐 Panel Kontrol Sinkronisasi Real-Time (Laptop ↔ HP) & Panduan Domain
              </h3>
              <button
                type="button"
                onClick={() => setShowCloudModal(false)}
                className="px-2.5 py-1 rounded-lg bg-stone-800 text-stone-300 font-bold"
              >
                ✕
              </button>
            </div>

            <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-600/50 space-y-3">
              <div className="font-extrabold text-emerald-300 text-sm">
                🟢 Status: {cloudStatus} • Kode Toko: {STORE_DOC_ID}
              </div>
              <div className="text-[11px] text-stone-300">
                Update Terakhir: <b>{lastSyncedAt || 'Baru saja'}</b> oleh{' '}
                <b className="text-amber-300">{lastUpdatedByDevice}</b>
              </div>
              <p className="text-stone-300 leading-relaxed">
                Jika Anda baru saja mengubah data di <b>Laptop</b> tetapi di <b>HP</b> belum berubah, klik tombol <b>☁️ Kirim Data Layar Ini</b> di Laptop, lalu klik <b>📥 Tarik Data</b> di HP:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                <button
                  type="button"
                  onClick={() => pushToCloud(true)}
                  className="py-2.5 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-extrabold text-xs shadow"
                >
                  ☁️ Kirim Data Layar Ini Jadi Acuan Semua HP/Laptop
                </button>
                <button
                  type="button"
                  onClick={() => pullFromCloudNow()}
                  className="py-2.5 px-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-stone-950 font-extrabold text-xs shadow"
                >
                  📥 Paksa Tarik Data Terbaru dari Cloud ke Layar Ini
                </button>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800 space-y-2">
              <div className="font-extrabold text-amber-300">
                🚀 Cara Sambungkan ke Domain Gratis (`warkopsumberredjeki.vercel.app`) atau Domain Sendiri (`.com` / `.id`)
              </div>
              <ol className="list-decimal list-inside space-y-1.5 text-stone-300">
                <li>
                  Buka <b>https://vite.new/react</b> di laptop, ganti isi <b>src/App.jsx</b> dengan kode <b>WarkopPro.jsx</b> ini.
                </li>
                <li>
                  Tambahkan <code>&lt;script src=&quot;https://cdn.tailwindcss.com&quot;&gt;&lt;/script&gt;</code> di atas <code>&lt;/head&gt;</code> pada file <b>index.html</b>.
                </li>
                <li>
                  Klik <b>Connect Repository (GitHub)</b> lalu buka <b>https://vercel.com</b> ➔ <b>Add New Project</b> ➔ <b>Deploy</b>.
                </li>
                <li>
                  Untuk menyambungkan domain <b>.com / .id</b> sendiri, buka <b>Settings ➔ Domains</b> di Vercel, masukkan nama domain Anda, lalu arahkan <b>A Record (@)</b> ke <code>76.76.21.21</code> dan <b>CNAME (www)</b> ke <code>cname.vercel-dns.com</code>.
                </li>
              </ol>
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                type="button"
                onClick={() => {
                  pushToCloud(true);
                  setShowCloudModal(false);
                }}
                className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold"
              >
                ☁️ Sinkronkan Sekarang
              </button>
              <button
                type="button"
                onClick={() => setShowCloudModal(false)}
                className="px-4 py-2 rounded-xl bg-stone-800 text-stone-300 font-bold"
              >
                Tutup Panduan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}