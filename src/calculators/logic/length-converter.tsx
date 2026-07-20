'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Length Converter provides instant conversion between metric and imperial distance units including meters, feet, inches, centimeters, kilometers, miles, and yards.`,
  formula: `Length conversions convert the input value to a base unit (meters) and then scale to the target unit:

- Value in Meters ($M$):
  $$M = \\text{Input} \\times \\text{Factor}_{\\text{from}}$$

- Converted Value:
  $$\\text{Output} = \\frac{M}{\\text{Factor}_{\\text{to}}}$$`,
  example: `**Convert 5 feet to centimeters:**
- 1 foot = 0.3048 meters. 5 feet = 1.524 meters.
- 1 centimeter = 0.01 meters.
- Output = 1.524 / 0.01 = **152.4 cm**.`,
  faqs: [
    {
      q: 'What is the base unit of length in the Metric System?',
      a: 'The meter (m) is the base unit of length in the International System of Units (SI).',
    },
    {
      q: 'How many feet are in a mile?',
      a: 'There are exactly 5,280 feet in one mile.',
    },
    {
      q: 'What is an inch defined as?',
      a: 'An inch is internationally defined as exactly 2.54 centimeters.',
    },
  ],
};

const LENGTH_UNITS = [
  { name: 'Millimeter (mm)', key: 'mm', factor: 0.001 },
  { name: 'Centimeter (cm)', key: 'cm', factor: 0.01 },
  { name: 'Meter (m)', key: 'm', factor: 1 },
  { name: 'Kilometer (km)', key: 'km', factor: 1000 },
  { name: 'Inch (in)', key: 'in', factor: 0.0254 },
  { name: 'Foot (ft)', key: 'ft', factor: 0.3048 },
  { name: 'Yard (yd)', key: 'yd', factor: 0.9144 },
  { name: 'Mile (mi)', key: 'mi', factor: 1609.344 },
];

export default function LengthConverter() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('m');
  const [toUnit, setToUnit] = useState<string>('ft');

  const handleReset = () => {
    setValue(1);
    setFromUnit('m');
    setToUnit('ft');
  };

  const fromObj = LENGTH_UNITS.find((u) => u.key === fromUnit) || LENGTH_UNITS[2];
  const toObj = LENGTH_UNITS.find((u) => u.key === toUnit) || LENGTH_UNITS[5];

  // Convert
  const metersVal = value * fromObj.factor;
  const convertedVal = metersVal / toObj.factor;

  // Conversion table data
  const gridResults = LENGTH_UNITS.map((u) => ({
    ...u,
    val: metersVal / u.factor,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Length</h2>

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
                  {LENGTH_UNITS.map((u) => (
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
                  {LENGTH_UNITS.map((u) => (
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
