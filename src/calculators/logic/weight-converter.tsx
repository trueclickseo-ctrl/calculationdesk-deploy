'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Weight & Mass Converter handles instant translation between metric and imperial weight units, including kilograms, grams, milligrams, pounds, ounces, stones, and tons.`,
  formula: `Weight conversions use grams ($G$) as a pivot base metric:

- Value in Grams ($G$):
  $$G = \\text{Input} \\times \\text{Factor}_{\\text{from}}$$

- Converted Value:
  $$\\text{Output} = \\frac{G}{\\text{Factor}_{\\text{to}}}$$`,
  example: `**Convert 10 pounds to kilograms:**
- 1 pound = 453.592 grams. 10 pounds = 4,535.92 grams.
- 1 kilogram = 1,000 grams.
- Output = 4,535.92 / 1,000 = **4.536 kg**.`,
  faqs: [
    {
      q: 'What is the base unit of mass in the metric system?',
      a: 'The kilogram (kg) is the base unit of mass in the International System of Units (SI).',
    },
    {
      q: 'How many ounces are in a pound?',
      a: 'There are exactly 16 ounces in one pound.',
    },
    {
      q: 'How many pounds are in a stone?',
      a: 'A stone is an imperial unit of mass equal to exactly 14 pounds.',
    },
  ],
};

const WEIGHT_UNITS = [
  { name: 'Milligram (mg)', key: 'mg', factor: 0.001 },
  { name: 'Gram (g)', key: 'g', factor: 1 },
  { name: 'Kilogram (kg)', key: 'kg', factor: 1000 },
  { name: 'Ounce (oz)', key: 'oz', factor: 28.349523125 },
  { name: 'Pound (lb)', key: 'lb', factor: 453.59237 },
  { name: 'Stone (st)', key: 'st', factor: 6350.29318 },
  { name: 'Tonne (t)', key: 't', factor: 1000000 },
];

export default function WeightConverter() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('kg');
  const [toUnit, setToUnit] = useState<string>('lb');

  const handleReset = () => {
    setValue(1);
    setFromUnit('kg');
    setToUnit('lb');
  };

  const fromObj = WEIGHT_UNITS.find((u) => u.key === fromUnit) || WEIGHT_UNITS[2];
  const toObj = WEIGHT_UNITS.find((u) => u.key === toUnit) || WEIGHT_UNITS[4];

  // Convert
  const gramsVal = value * fromObj.factor;
  const convertedVal = gramsVal / toObj.factor;

  // Equivalencies
  const gridResults = WEIGHT_UNITS.map((u) => ({
    ...u,
    val: gramsVal / u.factor,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Weight</h2>

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
                  {WEIGHT_UNITS.map((u) => (
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
                  {WEIGHT_UNITS.map((u) => (
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
