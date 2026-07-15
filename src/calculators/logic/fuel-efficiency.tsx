'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Fuel Efficiency Converter translates fuel consumption figures across Miles per Gallon (US & Imperial MPG), Liters per 100 Kilometers (L/100km), and Kilometers per Liter (km/L).`,
  formula: `Fuel conversions convert inputs to a base of Liters per 100 Kilometers (L/100km):

**1. Convert to L/100km Base ($B$):**
- From MPG (US):
  $$B = \\frac{235.215}{\\text{MPG}_{\\text{US}}}$$
- From MPG (UK):
  $$B = \\frac{282.481}{\\text{MPG}_{\\text{UK}}}$$
- From km/L:
  $$B = \\frac{100}{\\text{km/L}}$$

**2. Solve Target Metrics:**
- km/L:
  $$\\text{km/L} = \\frac{100}{B}$$`,
  example: `**Convert 30 MPG (US) to L/100km:**
- Output = 235.215 / 30 = **7.84 L/100km**.`,
  faqs: [
    {
      q: 'Why are US MPG and UK MPG different?',
      a: 'The US liquid gallon is smaller (approx. 3.785 liters) than the UK Imperial gallon (approx. 4.546 liters). Consequently, UK MPG values are about 20% higher than US MPG values for the same physical fuel efficiency.',
    },
    {
      q: 'What does a lower L/100km value mean?',
      a: 'Liters per 100 Kilometers measures fuel consumption. A lower number means the vehicle uses less fuel to travel the same distance, indicating higher fuel efficiency.',
    },
    {
      q: 'How do you convert km/L to L/100km?',
      a: 'Simply divide 100 by the km/L value (e.g., 10 km/L equals 100 / 10 = 10 L/100km).',
    },
  ],
};

interface FuelUnit {
  name: string;
  key: string;
}

const FUEL_UNITS: FuelUnit[] = [
  { name: 'Miles per Gallon (US MPG)', key: 'MPG_US' },
  { name: 'Miles per Gallon (UK MPG)', key: 'MPG_UK' },
  { name: 'Liters per 100 km (L/100km)', key: 'L100KM' },
  { name: 'Kilometers per Liter (km/L)', key: 'KML' },
];

export default function FuelEfficiencyConverter() {
  const [value, setValue] = useState<number>(25);
  const [fromUnit, setFromUnit] = useState<string>('MPG_US');
  const [toUnit, setToUnit] = useState<string>('L100KM');

  const handleReset = () => {
    setValue(25);
    setFromUnit('MPG_US');
    setToUnit('L100KM');
  };

  const fromObj = FUEL_UNITS.find((u) => u.key === fromUnit) || FUEL_UNITS[0];
  const toObj = FUEL_UNITS.find((u) => u.key === toUnit) || FUEL_UNITS[2];

  // Convert input value to base L/100km
  const convertToBaseL100 = (val: number, unit: string): number => {
    if (val <= 0) return 0;
    if (unit === 'L100KM') return val;
    if (unit === 'MPG_US') return 235.214583 / val;
    if (unit === 'MPG_UK') return 282.4809363 / val;
    if (unit === 'KML') return 100 / val;
    return 0;
  };

  // Convert base L/100km to target unit
  const convertFromBaseL100 = (base: number, unit: string): number => {
    if (base <= 0) return 0;
    if (unit === 'L100KM') return base;
    if (unit === 'MPG_US') return 235.214583 / base;
    if (unit === 'MPG_UK') return 282.4809363 / base;
    if (unit === 'KML') return 100 / base;
    return 0;
  };

  const baseL100 = convertToBaseL100(value, fromUnit);
  const convertedVal = convertFromBaseL100(baseL100, toUnit);

  // Equivalencies
  const gridResults = FUEL_UNITS.map((u) => ({
    ...u,
    val: convertFromBaseL100(baseL100, u.key),
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Efficiency</h2>

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
                  {FUEL_UNITS.map((u) => (
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
                  {FUEL_UNITS.map((u) => (
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
                  {value.toLocaleString(undefined, { maximumFractionDigits: 4 })} {fromObj.key} = {convertedVal.toLocaleString(undefined, { maximumFractionDigits: 4 })} {toObj.key}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">All Equivalencies</span>
                <div className="grid grid-cols-2 gap-3">
                  {gridResults.map((u) => (
                    <div key={u.key} className="rounded-lg bg-background p-3 border border-border text-center">
                      <span className="block text-[10px] font-bold text-foreground/50 uppercase">{u.name}</span>
                      <span className="block text-base font-bold text-foreground mt-1 truncate" title={u.val.toString()}>
                        {u.val.toLocaleString(undefined, { maximumFractionDigits: 3 })}
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
