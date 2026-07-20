'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Data Storage Converter translates digital file sizes between Bytes, Kilobytes, Megabytes, Gigabytes, Terabytes, and Petabytes, supporting both decimal (SI, base 1000) and binary (IEC, base 1024) formats.`,
  formula: `Data conversion translates values to a base unit of Bytes ($B$):

**1. Base Conversion (Bytes):**
$$B = \\text{Input} \\times \\text{Base}^{\\text{Exponent}}$$

**2. Solve Target Metrics:**
$$\\text{Output} = \\frac{B}{\\text{Base}^{\\text{Exponent}}}$$
Where:
- Decimal (SI) Base = $1,000$ (e.g. 1 KB = $10^3$ bytes).
- Binary (IEC) Base = $1,024$ (e.g. 1 KiB = $2^{10}$ bytes).`,
  example: `**Convert 5 Gigabytes (GB) to Megabytes (MB) in Decimal:**
- 5 GB = 5 × 1,000,000,000 bytes.
- Output = 5,000,000,000 / 1,000,000 = **5,000 MB**.`,
  faqs: [
    {
      q: 'What is the difference between decimal (SI) and binary (IEC) storage sizes?',
      a: 'Decimal (SI) uses powers of 1000 (1 KB = 1,000 bytes) and is standard for hard drive manufacturers. Binary (IEC) uses powers of 1024 (1 KiB = 1,024 bytes) and is used by operating systems like Windows, which explains why a 500 GB drive appears as roughly 465 GiB in Windows.',
    },
    {
      q: 'What are KiB, MiB, and GiB?',
      a: 'These are binary unit prefixes introduced by the IEC (International Electrotechnical Commission) to represent powers of 2 (Kibibyte, Mebibyte, Gibibyte) to distinguish them from metric powers of 10.',
    },
    {
      q: 'How many bytes are in a Megabyte?',
      a: 'In decimal, a Megabyte (MB) contains exactly 1,000,000 bytes. In binary, a Mebibyte (MiB) contains exactly 1,048,576 bytes.',
    },
  ],
};

type StorageMode = 'decimal' | 'binary';

const UNITS_DECIMAL = [
  { name: 'Byte (B)', key: 'B', exponent: 0 },
  { name: 'Kilobyte (KB)', key: 'KB', exponent: 1 },
  { name: 'Megabyte (MB)', key: 'MB', exponent: 2 },
  { name: 'Gigabyte (GB)', key: 'GB', exponent: 3 },
  { name: 'Terabyte (TB)', key: 'TB', exponent: 4 },
  { name: 'Petabyte (PB)', key: 'PB', exponent: 5 },
];

const UNITS_BINARY = [
  { name: 'Byte (B)', key: 'B', exponent: 0 },
  { name: 'Kibibyte (KiB)', key: 'KiB', exponent: 1 },
  { name: 'Mebibyte (MiB)', key: 'MiB', exponent: 2 },
  { name: 'Gibibyte (GiB)', key: 'GiB', exponent: 3 },
  { name: 'Tebibyte (TiB)', key: 'TiB', exponent: 4 },
  { name: 'Pebibyte (PiB)', key: 'PiB', exponent: 5 },
];

export default function DataStorageConverter() {
  const [value, setValue] = useState<number>(1);
  const [mode, setMode] = useState<StorageMode>('decimal');
  const [fromUnit, setFromUnit] = useState<string>('GB');
  const [toUnit, setToUnit] = useState<string>('MB');

  const handleReset = () => {
    setValue(1);
    setMode('decimal');
    setFromUnit('GB');
    setToUnit('MB');
  };

  const handleModeChange = (newMode: StorageMode) => {
    setMode(newMode);
    if (newMode === 'decimal') {
      setFromUnit('GB');
      setToUnit('MB');
    } else {
      setFromUnit('GiB');
      setToUnit('MiB');
    }
  };

  const units = mode === 'decimal' ? UNITS_DECIMAL : UNITS_BINARY;
  const base = mode === 'decimal' ? 1000 : 1024;

  const fromObj = units.find((u) => u.key === fromUnit) || units[3];
  const toObj = units.find((u) => u.key === toUnit) || units[2];

  // Convert to Bytes
  const bytesVal = value * Math.pow(base, fromObj.exponent);
  const convertedVal = bytesVal / Math.pow(base, toObj.exponent);

  // Equivalencies
  const gridResults = units.map((u) => ({
    ...u,
    val: bytesVal / Math.pow(base, u.exponent),
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Storage</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => handleModeChange('decimal')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                mode === 'decimal'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Decimal (Base 1000)
            </button>
            <button
              type="button"
              onClick={() => handleModeChange('binary')}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                mode === 'binary'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Binary (Base 1024)
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="convert-value" className="block text-sm font-semibold text-foreground/80 mb-2">Value to Convert</label>
              <input
                id="convert-value"
                type="number"
                value={value}
                onChange={(e) => setValue(Number(e.target.value))}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="from-unit" className="block text-sm font-semibold text-foreground/80 mb-2">From Unit</label>
                <select
                  id="from-unit"
                  value={fromUnit}
                  onChange={(e) => setFromUnit(e.target.value)}
                  className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  {units.map((u) => (
                    <option key={u.key} value={u.key}>{u.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="to-unit" className="block text-sm font-semibold text-foreground/80 mb-2">To Unit</label>
                <select
                  id="to-unit"
                  value={toUnit}
                  onChange={(e) => setToUnit(e.target.value)}
                  className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  {units.map((u) => (
                    <option key={u.key} value={u.key}>{u.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 inline-flex items-center justify-center gap-1.5 border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Conversion Result</h2>

            <div className="space-y-6">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Converted Output</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">
                  {value.toLocaleString(undefined, { maximumFractionDigits: 6 })} {fromObj.key} = {convertedVal.toLocaleString(undefined, { maximumFractionDigits: 6 })} {toObj.key}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">All Equivalencies</span>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {gridResults.map((u) => (
                    <div key={u.key} className="rounded-lg bg-background p-3 border border-border text-center">
                      <span className="block text-[10px] font-bold text-foreground/50 uppercase">{u.key}</span>
                      <span className="block text-sm font-bold text-foreground mt-0.5 truncate" title={u.val.toString()}>
                        {u.val.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
