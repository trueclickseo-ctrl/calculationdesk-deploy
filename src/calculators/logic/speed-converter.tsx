'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Speed Converter translates velocity figures between metric and imperial scales, including kilometers per hour (km/h), miles per hour (mph), meters per second (m/s), knots, and Mach speeds.`,
  formula: `Speed translations scale inputs to a base meters per second ($V$) value:

- Value in Meters per Second ($V$):
  $$V = \\text{Input} \\times \\text{Factor}_{\\text{from}}$$

- Converted Value:
  $$\\text{Output} = \\frac{V}{\\text{Factor}_{\\text{to}}}$$`,
  example: `**Convert 60 miles per hour to kilometers per hour:**
- 1 mph = 0.44704 m/s. 60 mph = 26.8224 m/s.
- 1 km/h = 0.277778 m/s (1 / 3.6).
- Output = 26.8224 / 0.277778 = **96.56 km/h**.`,
  faqs: [
    {
      q: 'What is a Knot?',
      a: 'A knot is a unit of speed equal to one nautical mile per hour, which is exactly 1.852 km/h (approximately 1.151 mph). It is widely used in maritime navigation and meteorology.',
    },
    {
      q: 'What is Mach Speed?',
      a: 'Mach is a relative speed unit comparing an object\'s velocity to the local speed of sound. Mach 1 represents the speed of sound, which is approximately 343 meters per second (1,225 km/h or 761 mph) in dry air at 20°C.',
    },
    {
      q: 'How do you convert m/s to km/h?',
      a: 'To convert meters per second to kilometers per hour, simply multiply the velocity value by 3.6.',
    },
  ],
};

const SPEED_UNITS = [
  { name: 'Meters per Second (m/s)', key: 'm/s', factor: 1 },
  { name: 'Kilometers per Hour (km/h)', key: 'km/h', factor: 0.27777777777778 },
  { name: 'Miles per Hour (mph)', key: 'mph', factor: 0.44704 },
  { name: 'Knot (kn)', key: 'kn', factor: 0.51444444444444 },
  { name: 'Mach (M)', key: 'Mach', factor: 343 },
];

export default function SpeedConverter() {
  const [value, setValue] = useState<number>(60);
  const [fromUnit, setFromUnit] = useState<string>('mph');
  const [toUnit, setToUnit] = useState<string>('km/h');

  const handleReset = () => {
    setValue(60);
    setFromUnit('mph');
    setToUnit('km/h');
  };

  const fromObj = SPEED_UNITS.find((u) => u.key === fromUnit) || SPEED_UNITS[2];
  const toObj = SPEED_UNITS.find((u) => u.key === toUnit) || SPEED_UNITS[1];

  // Convert
  const mpsVal = value * fromObj.factor;
  const convertedVal = mpsVal / toObj.factor;

  // Equivalencies
  const gridResults = SPEED_UNITS.map((u) => ({
    ...u,
    val: mpsVal / u.factor,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Speed</h2>

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
                  {SPEED_UNITS.map((u) => (
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
                  {SPEED_UNITS.map((u) => (
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
