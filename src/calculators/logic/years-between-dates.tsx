'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Years Between Two Dates calculator measures precise calendar years, months, and day durations separating any two historical dates.`,
  formula: `Date subtraction calculates standard calendar progressions:

$$\\text{Years} = \\text{Year}_{end} - \\text{Year}_{start} \\quad (\\text{adjusted for months/days})$$`,
  example: `**Calculate time between January 15, 2020 and April 20, 2023:**
- Duration = **3 years, 3 months, and 5 days**.`,
  faqs: [
    {
      q: 'How does it count leap years?',
      a: 'The calculator checks every year in the range and counts how many contain a February 29th, giving the exact count of leap years passed.',
    },
    {
      q: 'Does it count the starting day?',
      a: 'By default, date spans measure the difference between dates (excluding the starting day). If you want to include both the start and end dates as active days, add 1 day to the final count.',
    },
  ],
};

export default function YearsBetweenDatesCalculator() {
  const [start, setStart] = useState<string>('2020-01-01');
  const [end, setEnd] = useState<string>('2026-01-01');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    years: number;
    months: number;
    days: number;
    totalDays: number;
    leapYears: number;
  } | null>(null);

  const handleReset = () => {
    setStart('2020-01-01');
    setEnd('2026-01-01');
    setErrors({});
    setResult(null);
  };

  const isLeapYear = (y: number): boolean => {
    return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;
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
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate years, months, days
    let years = second.getFullYear() - first.getFullYear();
    let months = second.getMonth() - first.getMonth();
    let days = second.getDate() - first.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(second.getFullYear(), second.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    // Count leap years
    let leapYears = 0;
    for (let y = first.getFullYear(); y <= second.getFullYear(); y++) {
      if (isLeapYear(y)) {
        // Check if February 29 lies inside range
        const feb29 = new Date(y, 1, 29);
        if (feb29 >= first && feb29 <= second) {
          leapYears++;
        }
      }
    }

    setResult({
      years,
      months,
      days,
      totalDays,
      leapYears,
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
              <label htmlFor="start-date-val" className="block text-sm font-semibold text-foreground/80 mb-2">Start Date</label>
              <input
                id="start-date-val"
                type="date"
                value={start}
                onChange={(e) => { setStart(e.target.value); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="end-date-val" className="block text-sm font-semibold text-foreground/80 mb-2">End Date</label>
              <input
                id="end-date-val"
                type="date"
                value={end}
                onChange={(e) => { setEnd(e.target.value); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
            </div>
            {errors.date && <p className="text-xs text-red-500 mt-1 font-medium">{errors.date}</p>}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Duration
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
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono font-bold">Total Duration</span>
                  <span className="block text-xl md:text-2xl font-extrabold text-primary mt-2">
                    {result.years} Years, {result.months} Months, {result.days} Days
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Days</span>
                    <span className="block text-base font-bold text-foreground mt-1">{result.totalDays.toLocaleString()} days</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider font-mono">Leap Years Passed</span>
                    <span className="block text-base font-bold text-foreground mt-1">{result.leapYears} leap years</span>
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
