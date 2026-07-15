'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Pressure Converter translates measurements between global pressure scales including Pascals (Pa), Kilopascals (kPa), Bar, PSI, Atmospheres (atm), and Torr.`,
  formula: `Pressure translations map values to a base unit of Pascals ($P$):

- Value in Pascals ($P$):
  $$P = \\text{Input} \\times \\text{Factor}_{\\text{from}}$$

- Converted Value:
  $$\\text{Output} = \\frac{P}{\\text{Factor}_{\\text{to}}}$$`,
  example: `**Convert 30 PSI to Bar:**
- 1 PSI = 6,894.757 Pascals. 30 PSI = 206,842.7 Pascals.
- 1 Bar = 100,000 Pascals.
- Output = 206,842.7 / 100,000 = **2.068 Bar**.`,
  faqs: [
    {
      q: 'What is Atmospheric Pressure?',
      a: 'Standard atmospheric pressure (1 atm) is the average air pressure at sea level on Earth. It is defined as exactly 101,325 Pascals (or 1.01325 bar / 14.696 psi).',
    },
    {
      q: 'What is PSI?',
      a: 'PSI stands for Pounds per Square Inch. It is an imperial unit of pressure measuring force per unit area, widely used in tire pressure gauges and hydraulic systems.',
    },
    {
      q: 'What is a Bar?',
      a: 'A bar is a metric unit of pressure defined as exactly 100,000 Pascals (100 kPa), which is very close to standard atmospheric pressure.',
    },
  ],
};

const PRESSURE_UNITS = [
  { name: 'Pascal (Pa)', key: 'Pa', factor: 1 },
  { name: 'Kilopascal (kPa)', key: 'kPa', factor: 1000 },
  { name: 'Bar', key: 'bar', factor: 100000 },
  { name: 'Pounds/Sq Inch (PSI)', key: 'psi', factor: 6894.757293168 },
  { name: 'Atmosphere (atm)', key: 'atm', factor: 101325 },
  { name: 'Torr (mmHg)', key: 'Torr', factor: 133.32236842105 },
];

export default function PressureConverter() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('atm');
  const [toUnit, setToUnit] = useState<string>('psi');

  const handleReset = () => {
    setValue(1);
    setFromUnit('atm');
    setToUnit('psi');
  };

  const fromObj = PRESSURE_UNITS.find((u) => u.key === fromUnit) || PRESSURE_UNITS[4];
  const toObj = PRESSURE_UNITS.find((u) => u.key === toUnit) || PRESSURE_UNITS[3];

  // Convert
  const pascalsVal = value * fromObj.factor;
  const convertedVal = pascalsVal / toObj.factor;

  // Equivalencies
  const gridResults = PRESSURE_UNITS.map((u) => ({
    ...u,
    val: pascalsVal / u.factor,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Pressure</h2>

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
                  {PRESSURE_UNITS.map((u) => (
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
                  {PRESSURE_UNITS.map((u) => (
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
