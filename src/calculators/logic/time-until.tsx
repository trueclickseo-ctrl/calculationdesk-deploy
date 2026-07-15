'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Time Until Calculator computes the exact countdown duration in years, months, weeks, and days until a target future event or date.`,
  formula: `Time intervals are calculated by taking differences of datetime timestamps:

$$\\text{Total Days} = \\frac{\\text{Target Date} - \\text{Current Date}}{86,400,000}$$
Total days are then broken down into complete years, months, weeks, and remaining days.`,
  example: `**Calculate time until December 25th of the current year (starting from August 1st):**
- Duration = **4 months and 24 days** (or 146 days total).`,
  faqs: [
    {
      q: 'Does this factor in leap years?',
      a: 'Yes, it tracks specific calendar month and year structures, automatically accounting for 29-day Februaries.',
    },
    {
      q: 'Can I calculate time elapsed in the past?',
      a: 'This calculator is designed for future countdowns. If you select a past date, it will show a duration of 0 days.',
    },
  ],
};

export default function TimeUntilCalculator() {
  const [targetDate, setTargetDate] = useState<string>('');
  const [result, setResult] = useState<{
    years: number;
    months: number;
    weeks: number;
    days: number;
    totalDays: number;
  } | null>(null);

  const handleReset = () => {
    setTargetDate('');
    setResult(null);
  };

  const handleCalculate = () => {
    if (!targetDate) return;
    const now = new Date();
    now.setHours(0, 0, 0, 0);

    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);

    const diffTime = target.getTime() - now.getTime();
    if (diffTime < 0) {
      setResult({ years: 0, months: 0, weeks: 0, days: 0, totalDays: 0 });
      return;
    }

    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Calculate years, months, days accurately
    let years = target.getFullYear() - now.getFullYear();
    let months = target.getMonth() - now.getMonth();
    let days = target.getDate() - now.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonth = new Date(target.getFullYear(), target.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }

    const weeks = Math.floor(totalDays / 7);

    setResult({
      years,
      months,
      weeks,
      days,
      totalDays,
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Countdown Target</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="target-date-input" className="block text-sm font-semibold text-foreground/80 mb-2">Target Future Date</label>
              <input
                id="target-date-input"
                type="date"
                value={targetDate}
                onChange={(e) => { setTargetDate(e.target.value); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Countdown
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
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6 font-bold">Time Remaining</h2>

          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Total Remaining Days</span>
                <span className="block text-3xl font-extrabold text-primary mt-2">
                  {result.totalDays.toLocaleString()} Days
                </span>
              </div>

              <div className="rounded-xl bg-background p-4 border border-border space-y-2.5 text-xs font-semibold">
                <div className="flex justify-between items-center">
                  <span className="text-foreground/50">Years:</span>
                  <span className="text-foreground font-bold">{result.years} years</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/50">Months:</span>
                  <span className="text-foreground font-bold">{result.months} months</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground/50">Weeks:</span>
                  <span className="text-foreground font-bold">{result.weeks} weeks</span>
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-border/40">
                  <span className="text-foreground/50">Remaining Days:</span>
                  <span className="text-foreground font-bold">{result.days} days</span>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select target date.</div>
          )}
        </div>
      </div>
    </div>
  );
}
