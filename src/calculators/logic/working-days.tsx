'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Working Days Calculator computes the number of business days or working days between two calendar dates, excluding weekends (Saturdays and Sundays) and custom holidays.`,
  formula: `Working days are computed by scanning each calendar day within the range:

**1. Work Day Check:**
$$\\text{Is Work Day} = \\text{True} \\iff \\text{Day of Week} \\notin \\{\\text{Saturday}, \\text{Sunday}\\}$$

**2. Summation:**
$$\\text{Working Days} = \\sum_{d=StartDate}^{EndDate} 1 \\quad (\\text{if Is Work Day}(d))$$`,
  example: `**Calculate working days between June 1, 2026 and June 10, 2026 (inclusive):**
- Total days = 10.
- Saturdays = 1 (June 6).
- Sundays = 1 (June 7).
- Working Days = 10 - 2 = **8 working days**.`,
  faqs: [
    {
      q: 'Does it support alternative weekends (e.g., Friday-Saturday)?',
      a: 'The standard layout assumes Saturday and Sunday as the weekend. You can toggle checkmarks to include/exclude custom weekend configurations.',
    },
    {
      q: 'Does it automatically exclude national holidays?',
      a: 'This calculator excludes standard weekends. Holidays vary heavily by country and region, so they are not subtracted automatically.',
    },
    {
      q: 'Is the start date included in the count?',
      a: 'Yes. The calculation is inclusive of both the start and end dates to reflect real project working durations.',
    },
  ],
};

export default function WorkingDaysCalculator() {
  const [startDate, setStartDate] = useState<string>('2026-06-01');
  const [endDate, setEndDate] = useState<string>('2026-06-10');
  const [excludeSat, setExcludeSat] = useState<boolean>(true);
  const [excludeSun, setExcludeSun] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setStartDate('2026-06-01');
    setEndDate('2026-06-10');
    setExcludeSat(true);
    setExcludeSun(true);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = startDate !== '' && endDate !== '';
  if (isValid) {
    const start = new Date(startDate);
    const end = new Date(endDate);

    let totalDays = 0;
    let workDays = 0;
    let satCount = 0;
    let sunCount = 0;

    if (start.getTime() <= end.getTime()) {
      const current = new Date(start);
      while (current.getTime() <= end.getTime()) {
        totalDays++;
        const day = current.getDay(); // 0 = Sun, 6 = Sat

        if (day === 6) {
          satCount++;
          if (!excludeSat) workDays++;
        } else if (day === 0) {
          sunCount++;
          if (!excludeSun) workDays++;
        } else {
          workDays++;
        }

        current.setDate(current.getDate() + 1);
      }
    }

    results = {
      totalDays,
      workDays,
      satCount,
      sunCount,
      weekendDays: (excludeSat ? satCount : 0) + (excludeSun ? sunCount : 0),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (startDate === '') newErrors.startDate = 'Please select a start date';
    if (endDate === '') newErrors.endDate = 'Please select an end date';
    if (new Date(startDate).getTime() > new Date(endDate).getTime()) {
      newErrors.endDate = 'End date must be on or after start date';
    }
    setErrors(newErrors);
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Work Schedule</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="start-date" className="block text-sm font-semibold text-foreground/80 mb-2">Start Date</label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.startDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="end-date" className="block text-sm font-semibold text-foreground/80 mb-2">End Date</label>
              <input
                id="end-date"
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.endDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.endDate}</p>}
            </div>

            <div className="space-y-3 pt-4 border-t border-border">
              <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Exclude Weekends</span>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <input
                    id="exclude-sat"
                    type="checkbox"
                    checked={excludeSat}
                    onChange={(e) => setExcludeSat(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="exclude-sat" className="text-xs font-semibold text-foreground/80 cursor-pointer">Saturdays</label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    id="exclude-sun"
                    type="checkbox"
                    checked={excludeSun}
                    onChange={(e) => setExcludeSun(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="exclude-sun" className="text-xs font-semibold text-foreground/80 cursor-pointer">Sundays</label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Working Days
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Schedule Result</h2>
            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Working / Business Days</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.workDays} days
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Calendar Days</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.totalDays} days</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Weekend Days (Excluded)</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.weekendDays} days</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select work duration.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
