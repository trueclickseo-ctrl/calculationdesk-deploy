'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Temperature Converter provides instant scale translations between Celsius (°C), Fahrenheit (°F), and Kelvin (K).`,
  formula: `Temperature scales use distinct offset and multiplier calculations:

**1. Celsius to Fahrenheit:**
$$^{\\circ}\\text{F} = (^{\\circ}\\text{C} \\times 1.8) + 32$$

**2. Celsius to Kelvin:**
$$\\text{K} = ^{\\circ}\\text{C} + 273.15$$

**3. Fahrenheit to Celsius:**
$$^{\\circ}\\text{C} = \\frac{^{\\circ}\\text{F} - 32}{1.8}$$`,
  example: `**Convert 100°C to Fahrenheit:**
- F = (100 × 1.8) + 32 = 180 + 32 = **212°F**.`,
  faqs: [
    {
      q: 'What is Absolute Zero?',
      a: 'Absolute zero is the theoretical lowest temperature possible, where all thermodynamic activity stops. It is defined as 0 K or -273.15°C (-459.67°F).',
    },
    {
      q: 'Why does Kelvin not use a degree symbol?',
      a: 'Kelvin is an absolute scale based on energy. It is an absolute unit of measurement rather than a relative scale, so we refer to temperature values as "Kelvins" rather than "degrees Kelvin".',
    },
    {
      q: 'At what temperature are Celsius and Fahrenheit equal?',
      a: 'Celsius and Fahrenheit scales intersect at exactly -40° (i.e. -40°C = -40°F).',
    },
  ],
};

const TEMP_UNITS = [
  { name: 'Celsius (°C)', key: 'C' },
  { name: 'Fahrenheit (°F)', key: 'F' },
  { name: 'Kelvin (K)', key: 'K' },
];

export default function TemperatureConverter() {
  const [value, setValue] = useState<number>(25);
  const [fromUnit, setFromUnit] = useState<string>('C');
  const [toUnit, setToUnit] = useState<string>('F');

  const handleReset = () => {
    setValue(25);
    setFromUnit('C');
    setToUnit('F');
  };

  // Conversion logic
  const convertTemp = (val: number, from: string, to: string): number => {
    if (from === to) return val;

    // Convert to Celsius first
    let celsius = 0;
    if (from === 'C') {
      celsius = val;
    } else if (from === 'F') {
      celsius = (val - 32) / 1.8;
    } else {
      celsius = val - 273.15;
    }

    // Convert from Celsius to Target
    if (to === 'C') return celsius;
    if (to === 'F') return celsius * 1.8 + 32;
    return celsius + 273.15;
  };

  const convertedVal = convertTemp(value, fromUnit, toUnit);

  const gridResults = TEMP_UNITS.map((u) => ({
    ...u,
    val: convertTemp(value, fromUnit, u.key),
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Temperature</h2>

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
                  {TEMP_UNITS.map((u) => (
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
                  {TEMP_UNITS.map((u) => (
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
                  {value.toLocaleString(undefined, { maximumFractionDigits: 4 })}°{fromUnit} = {convertedVal.toLocaleString(undefined, { maximumFractionDigits: 4 })}°{toUnit === 'K' ? '' : toUnit}{toUnit === 'K' ? 'K' : ''}
                </span>
              </div>

              <div>
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">All Scales</span>
                <div className="grid grid-cols-3 gap-3">
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
