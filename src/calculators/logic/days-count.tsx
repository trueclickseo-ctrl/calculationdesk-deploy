'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Number of Days Calculator counts the exact number of days between two calendar dates.`,
  formula: `Date subtraction calculates elapsed intervals:

$$\\text{Total Days} = \\frac{\\text{End Date} - \\text{Start Date}}{86,400,000}$$`,
  example: `**Calculate days between June 1st and June 15th:**
- Duration = **14 days** (or 15 days including the start day).`,
  faqs: [
    {
      q: 'Does it count both the start and end days?',
      a: 'Standard subtraction excludes the start day. If you want to include both days, toggle the option to include both days.',
    },
    {
      q: 'Does this calculator support past and future dates?',
      a: 'Yes, it computes absolute differences, so it works for past, present, and future ranges.',
    },
  ],
};

export default function DaysCountCalculator() {
  const [start, setStart] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [end, setEnd] = useState<string>(() => {
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    return nextWeek.toISOString().split('T')[0];
  });
  const [includeStart, setIncludeStart] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    totalDays: number;
    weeks: number;
    businessDays: number;
  } | null>(null);

  const handleReset = () => {
    const today = new Date();
    const nextWeek = new Date();
    nextWeek.setDate(nextWeek.getDate() + 7);
    setStart(today.toISOString().split('T')[0]);
    setEnd(nextWeek.toISOString().split('T')[0]);
    setIncludeStart(false);
    setErrors({});
    setResult(null);
  };

  const getBusinessDays = (first: Date, second: Date): number => {
    let count = 0;
    const cur = new Date(first);
    while (cur <= second) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) {
        count++;
      }
      cur.setDate(cur.getDate() + 1);
    }
    return count;
  };

  const handleCalculate = () => {
    if (!start || !end) {
      setErrors({ date: 'Please enter both dates' });
      return;
    }
    setErrors({});

    const d1 = new Date(start);
    const d2 = new Date(end);

    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
      setErrors({ date: 'Please enter valid dates' });
      return;
    }

    const first = d1 < d2 ? d1 : d2;
    const second = d1 < d2 ? d2 : d1;

    const diffTime = second.getTime() - first.getTime();
    let totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (includeStart) {
      totalDays += 1;
    }

    // calculate business days (mon-fri)
    const businessDays = getBusinessDays(first, second);

    setResult({
      totalDays,
      weeks: Math.floor(totalDays / 7),
      businessDays: includeStart ? businessDays : businessDays - (first.getDay() !== 0 && first.getDay() !== 6 ? 1 : 0),
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Select Dates</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="start-day-val" className="block text-sm font-semibold text-foreground/80 mb-2">Start Date</label>
              <input
                id="start-day-val"
                type="date"
                value={start}
                onChange={(e) => { setStart(e.target.value); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="end-day-val" className="block text-sm font-semibold text-foreground/80 mb-2">End Date</label>
              <input
                id="end-day-val"
                type="date"
                value={end}
                onChange={(e) => { setEnd(e.target.value); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
            </div>
            {errors.date && <p className="text-xs text-red-500 mt-1 font-medium">{errors.date}</p>}

            <div className="flex items-center gap-2 py-2">
              <input
                id="include-start-day"
                type="checkbox"
                checked={includeStart}
                onChange={(e) => { setIncludeStart(e.target.checked); setResult(null); }}
                className="rounded border-border text-primary focus:ring-primary h-4 w-4 cursor-pointer"
              />
              <label htmlFor="include-start-day" className="text-xs font-semibold text-foreground/80 cursor-pointer">
                Include starting day (+1 day)
              </label>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Days
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"
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
            <h2 className="text-xl font-bold text-foreground mb-6">Duration Results</h2>

            {result ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Total Calendar Days</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {result.totalDays.toLocaleString()} Days
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Business Days</span>
                    <span className="block text-base font-bold text-foreground mt-1">{result.businessDays.toLocaleString()} days</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Weeks</span>
                    <span className="block text-base font-bold text-foreground mt-1">{result.weeks.toFixed(1)} weeks</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select dates.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
