'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Time Unit Converter provides calculations between various increments of duration, ranging from milliseconds and seconds up to weeks, months, and calendar years.`,
  formula: `Time conversions normalize duration values to a base unit (seconds):

- Value in Seconds ($S$):
  $$S = \\text{Input} \\times \\text{Factor}_{\\text{from}}$$

- Converted Value:
  $$\\text{Output} = \\frac{S}{\\text{Factor}_{\\text{to}}}$$`,
  example: `**Convert 3 days into minutes:**
- 1 day = 86,400 seconds. 3 days = 259,200 seconds.
- 1 minute = 60 seconds.
- Output = 259,200 / 60 = **4,320 minutes**.`,
  faqs: [
    {
      q: 'How many weeks are in a standard calendar year?',
      a: 'A standard calendar year of 365 days contains exactly 52 weeks and 1 day (or 52.14 weeks). Leap years of 366 days contain 52 weeks and 2 days.',
    },
    {
      q: 'How is a month defined for time conversions?',
      a: 'Since months vary between 28 and 31 days, standard calculators use the mean calendar month length of approximately 30.44 days (365.25 days / 12 months) for conversion.',
    },
    {
      q: 'What is a millisecond?',
      a: 'A millisecond (ms) is a metric unit of time equal to one-thousandth of a second (10⁻³ seconds).',
    },
  ],
};

const TIME_UNITS = [
  { name: 'Millisecond (ms)', key: 'ms', factor: 0.001 },
  { name: 'Second (s)', key: 's', factor: 1 },
  { name: 'Minute (min)', key: 'min', factor: 60 },
  { name: 'Hour (h)', key: 'h', factor: 3600 },
  { name: 'Day (d)', key: 'd', factor: 86400 },
  { name: 'Week (wk)', key: 'wk', factor: 604800 },
  { name: 'Month (mo)', key: 'mo', factor: 2629743.83 }, // 30.436875 days
  { name: 'Year (yr)', key: 'yr', factor: 31536000 }, // 365 days
];

export default function TimeUnitConverter() {
  const [value, setValue] = useState<number>(24);
  const [fromUnit, setFromUnit] = useState<string>('h');
  const [toUnit, setToUnit] = useState<string>('min');

  const handleReset = () => {
    setValue(24);
    setFromUnit('h');
    setToUnit('min');
  };

  const fromObj = TIME_UNITS.find((u) => u.key === fromUnit) || TIME_UNITS[3];
  const toObj = TIME_UNITS.find((u) => u.key === toUnit) || TIME_UNITS[2];

  // Convert
  const secondsVal = value * fromObj.factor;
  const convertedVal = secondsVal / toObj.factor;

  // Equivalencies
  const gridResults = TIME_UNITS.map((u) => ({
    ...u,
    val: secondsVal / u.factor,
  }));

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Time</h2>

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
                  {TIME_UNITS.map((u) => (
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
                  {TIME_UNITS.map((u) => (
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
