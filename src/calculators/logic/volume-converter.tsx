'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Volume Converter converts measurements between liquid and dry volumes, including liters, gallons, milliliters, fluid ounces, cups, tablespoons, pints, and cubic meters.`,
  formula: `Volume conversions normalize inputs to a base liter ($L$) value:

- Value in Liters ($L$):
  $$L = \\text{Input} \\times \\text{Factor}_{\\text{from}}$$

- Converted Value:
  $$\\text{Output} = \\frac{L}{\\text{Factor}_{\\text{to}}}$$`,
  example: `**Convert 1 US gallon to cups:**
- 1 US gallon = 3.78541 liters.
- 1 US cup = 0.236588 liters.
- Output = 3.78541 / 0.236588 = **16 cups**.`,
  faqs: [
    {
      q: 'How many cups are in a gallon?',
      a: 'There are exactly 16 US cups in a standard US liquid gallon.',
    },
    {
      q: 'What is the difference between US fluid ounces and Imperial fluid ounces?',
      a: 'A US fluid ounce is exactly 29.5735 ml, whereas an Imperial fluid ounce is slightly smaller at exactly 28.413 ml.',
    },
    {
      q: 'How many milliliters are in a teaspoon?',
      a: 'A standard US teaspoon (tsp) is equal to approximately 4.93 milliliters.',
    },
  ],
};

const VOLUME_UNITS = [
  { name: 'Milliliter (ml)', key: 'ml', factor: 0.001 },
  { name: 'Liter (l)', key: 'L', factor: 1 },
  { name: 'US Teaspoon (tsp)', key: 'tsp', factor: 0.00492892159375 },
  { name: 'US Tablespoon (tbsp)', key: 'tbsp', factor: 0.01478676478125 },
  { name: 'US Fluid Ounce (fl oz)', key: 'fl oz', factor: 0.0295735295625 },
  { name: 'US Cup (cup)', key: 'cup', factor: 0.2365882365 },
  { name: 'US Pint (pt)', key: 'pt', factor: 0.473176473 },
  { name: 'US Quart (qt)', key: 'qt', factor: 0.946352946 },
  { name: 'US Gallon (gal)', key: 'gal', factor: 3.785411784 },
  { name: 'Cubic Meter (m³)', key: 'm³', factor: 1000 },
  { name: 'Cubic Foot (ft³)', key: 'ft³', factor: 28.316846592 },
];

export default function VolumeConverter() {
  const [value, setValue] = useState<number>(1);
  const [fromUnit, setFromUnit] = useState<string>('L');
  const [toUnit, setToUnit] = useState<string>('gal');

  const handleReset = () => {
    setValue(1);
    setFromUnit('L');
    setToUnit('gal');
  };

  const fromObj = VOLUME_UNITS.find((u) => u.key === fromUnit) || VOLUME_UNITS[1];
  const toObj = VOLUME_UNITS.find((u) => u.key === toUnit) || VOLUME_UNITS[8];

  // Convert
  const litersVal = value * fromObj.factor;
  const convertedVal = litersVal / toObj.factor;

  // Equivalencies
  const gridResults = VOLUME_UNITS.map((u) => ({
    ...u,
    val: litersVal / u.factor,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Volume</h2>

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
                  {VOLUME_UNITS.map((u) => (
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
                  {VOLUME_UNITS.map((u) => (
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
