'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Days Between Dates Calculator measures the exact duration between two dates. It provides the count of total days, weeks, months, or years, and can optionally include or exclude the end date in the sum.`,
  formula: `Date spans are computed using epoch milliseconds:

**1. Days count (exclusive of end day):**
$$\\text{Days} = \\frac{T_{\\text{End}} - T_{\\text{Start}}}{86,400,000}$$

**2. Days count (inclusive of end day):**
$$\\text{Days} = \\frac{T_{\\text{End}} - T_{\\text{Start}}}{86,400,000} + 1$$`,
  example: `**1. Days between June 1, 2026 and June 10, 2026 (Exclusive):**
- Result = **9 days**.

**2. Days between June 1, 2026 and June 10, 2026 (Inclusive):**
- Result = **10 days** (includes both start and end days).`,
  faqs: [
    {
      q: 'What is the difference between inclusive and exclusive counting?',
      a: 'Exclusive counting does not count the final day in the total count (e.g., from Monday to Tuesday is 1 day). Inclusive counting counts both the start and end days (e.g., from Monday to Tuesday is 2 calendar days).',
    },
    {
      q: 'How many days are in 6 months?',
      a: 'It varies depending on which months are selected. Months have 28, 29, 30, or 31 days. This calculator references the exact calendar months to output accurate, day-level results.',
    },
    {
      q: 'Does it calculate fractions of a week?',
      a: 'Yes. For example, a difference of 10 days is reported as 1 week and 3 days.',
    },
  ],
};

export default function DaysBetweenDates() {
  const [startDate, setStartDate] = useState<string>('2026-06-01');
  const [endDate, setEndDate] = useState<string>('2026-06-10');
  const [inclusive, setInclusive] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setStartDate('2026-06-01');
    setEndDate('2026-06-10');
    setInclusive(false);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = startDate !== '' && endDate !== '';
  if (isValid) {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);

    const diffTime = eDate.getTime() - sDate.getTime();
    let totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    if (inclusive) {
      totalDays = totalDays >= 0 ? totalDays + 1 : totalDays - 1;
    }

    const weeks = Math.trunc(Math.abs(totalDays) / 7);
    const remainingDays = Math.abs(totalDays) % 7;

    results = {
      totalDays,
      weeks,
      remainingDays,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (startDate === '') newErrors.startDate = 'Please choose a start date';
    if (endDate === '') newErrors.endDate = 'Please choose an end date';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Calendar Span</h2>

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

            <div className="flex items-center gap-2 py-2 border-t border-border pt-4">
              <input
                id="inclusive"
                type="checkbox"
                checked={inclusive}
                onChange={(e) => setInclusive(e.target.checked)}
                className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
              />
              <label htmlFor="inclusive" className="text-xs font-semibold text-foreground/80 cursor-pointer">
                Include end date in calculation (+1 day)
              </label>
            </div>

            <div className="flex gap-3 pt-2 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Days Span
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
            <h2 className="text-xl font-bold text-foreground mb-6">Duration Output</h2>
            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Total Span Duration</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.totalDays.toLocaleString()} days
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Weekly breakdown</span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    {results.weeks} weeks and {results.remainingDays} days
                  </span>
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
