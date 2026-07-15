'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Area Converter provides calculations between metric and imperial area metrics including square meters, square feet, square kilometers, acres, and hectares.`,
  formula: `Area conversions map the input dimension to a square meter ($S$) base:

- Value in Square Meters ($S$):
  $$S = \\text{Input} \\times \\text{Factor}_{\\text{from}}$$

- Converted Value:
  $$\\text{Output} = \\frac{S}{\\text{Factor}_{\\text{to}}}$$`,
  example: `**Convert 2 acres to square feet:**
- 1 acre = 4,046.856 square meters. 2 acres = 8,093.712 sq meters.
- 1 square foot = 0.092903 sq meters.
- Output = 8,093.712 / 0.092903 = **87,120 sq ft**.`,
  faqs: [
    {
      q: 'How many square feet are in an acre?',
      a: 'There are exactly 43,560 square feet in one acre.',
    },
    {
      q: 'What is a hectare?',
      a: 'A hectare (ha) is a metric unit of area equal to a square with 100-meter sides, totaling exactly 10,000 square meters.',
    },
    {
      q: 'What is the conversion between square miles and acres?',
      a: 'One square mile contains exactly 640 acres.',
    },
  ],
};

const AREA_UNITS = [
  { name: 'Sq Millimeter (mm²)', key: 'mm²', factor: 0.000001 },
  { name: 'Sq Centimeter (cm²)', key: 'cm²', factor: 0.0001 },
  { name: 'Sq Meter (m²)', key: 'm²', factor: 1 },
  { name: 'Sq Kilometer (km²)', key: 'km²', factor: 1000000 },
  { name: 'Sq Inch (in²)', key: 'in²', factor: 0.00064516 },
  { name: 'Sq Foot (ft²)', key: 'ft²', factor: 0.09290304 },
  { name: 'Sq Yard (yd²)', key: 'yd²', factor: 0.83612736 },
  { name: 'Sq Mile (mi²)', key: 'mi²', factor: 2589988.110336 },
  { name: 'Acre (ac)', key: 'ac', factor: 4046.8564224 },
  { name: 'Hectare (ha)', key: 'ha', factor: 10000 },
];

export default function AreaConverter() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('m²');
  const [toUnit, setToUnit] = useState<string>('ft²');

  const handleReset = () => {
    setValue(1);
    setFromUnit('m²');
    setToUnit('ft²');
  };

  const fromObj = AREA_UNITS.find((u) => u.key === fromUnit) || AREA_UNITS[2];
  const toObj = AREA_UNITS.find((u) => u.key === toUnit) || AREA_UNITS[5];

  // Convert
  const sqMetersVal = value * fromObj.factor;
  const convertedVal = sqMetersVal / toObj.factor;

  // Equivalencies
  const gridResults = AREA_UNITS.map((u) => ({
    ...u,
    val: sqMetersVal / u.factor,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Area</h2>

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
                  {AREA_UNITS.map((u) => (
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
                  {AREA_UNITS.map((u) => (
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
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
