'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Age Difference Calculator determines the exact calendar time gap between the birthdays of two individuals, displaying the difference in years, months, days, weeks, or total days.`,
  formula: `Age gaps are computed using full calendar boundary comparison:

**1. Absolute Days Difference:**
$$\\text{Total Days} = \\frac{|\\text{Birth Date 1} - \\text{Birth Date 2}|}{1000 \\times 60 \\times 60 \\times 24}$$

**2. Calendar Breakdown (Y/M/D):**
- Compare years, months, and days progressively, borrowing days from previous months when boundaries overflow.`,
  example: `**Compare birthdays Jan 15, 1995 and Mar 20, 1998:**
- Age gap = **3 years, 2 months, and 5 days**.
- Total days difference = **1,160 days**.`,
  faqs: [
    {
      q: 'Who is considered older?',
      a: 'The individual with the earlier birth date is older. For example, someone born in 1995 is older than someone born in 1998.',
    },
    {
      q: 'Does this calculator support same-day birthdays?',
      a: 'Yes. If both dates are identical, the age difference will be reported as exactly 0 days.',
    },
    {
      q: 'How does it handle different month lengths when calculating months?',
      a: 'It utilizes standard calendar adjustments. When calculating boundaries, it references the exact number of days in each specific month involved to ensure day-accurate accuracy.',
    },
  ],
};

export default function AgeDifferenceCalculator() {
  const [date1, setDate1] = useState<string>('1995-01-15');
  const [date2, setDate2] = useState<string>('1998-03-20');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setDate1('1995-01-15');
    setDate2('1998-03-20');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = date1 !== '' && date2 !== '';
  if (isValid) {
    const d1 = new Date(date1);
    const d2 = new Date(date2);

    let olderDate = d1;
    let youngerDate = d2;
    let olderName = 'Person 1';
    let youngerName = 'Person 2';

    if (d1.getTime() > d2.getTime()) {
      olderDate = d2;
      youngerDate = d1;
      olderName = 'Person 2';
      youngerName = 'Person 1';
    }

    const diffTime = Math.abs(d2.getTime() - d1.getTime());
    const totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

    // Calendar Difference
    let years = youngerDate.getFullYear() - olderDate.getFullYear();
    let months = youngerDate.getMonth() - olderDate.getMonth();
    let days = youngerDate.getDate() - olderDate.getDate();

    if (days < 0) {
      // borrow from previous month
      months--;
      const prevMonth = new Date(youngerDate.getFullYear(), youngerDate.getMonth(), 0);
      days += prevMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    results = {
      olderName,
      youngerName,
      totalDays,
      weeks: Math.trunc(totalDays / 7),
      remainingDays: totalDays % 7,
      years,
      months,
      days,
      isSame: d1.getTime() === d2.getTime(),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (date1 === '') newErrors.date1 = 'Please enter birth date for Person 1';
    if (date2 === '') newErrors.date2 = 'Please enter birth date for Person 2';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Birthdays</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="date1" className="block text-sm font-semibold text-foreground/80 mb-2">Person 1 Date of Birth</label>
              <input
                id="date1"
                type="date"
                value={date1}
                onChange={(e) => { setDate1(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.date1 && <p className="text-xs text-red-500 mt-1 font-medium">{errors.date1}</p>}
            </div>

            <div>
              <label htmlFor="date2" className="block text-sm font-semibold text-foreground/80 mb-2">Person 2 Date of Birth</label>
              <input
                id="date2"
                type="date"
                value={date2}
                onChange={(e) => { setDate2(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.date2 && <p className="text-xs text-red-500 mt-1 font-medium">{errors.date2}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Age Gap
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
            <h2 className="text-xl font-bold text-foreground mb-6">Age Comparison</h2>

            {results ? (
              <div className="space-y-4">
                {results.isSame ? (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-600 dark:text-emerald-500 text-sm font-bold text-center">
                    Both individuals share the exact same birthday!
                  </div>
                ) : (
                  <>
                    <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                      <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Older Individual</span>
                      <span className="block text-xl font-extrabold text-primary mt-1">
                        {results.olderName} is older.
                      </span>
                    </div>

                    <div className="rounded-xl bg-background p-4 border border-border">
                      <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Age Difference (Calendar)</span>
                      <span className="block text-lg font-bold text-foreground mt-1">
                        {results.years} years, {results.months} months, and {results.days} days
                      </span>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-background p-4 border border-border">
                        <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Days Gap</span>
                        <span className="block text-base font-bold text-foreground mt-1">{results.totalDays.toLocaleString()} days</span>
                      </div>
                      <div className="rounded-xl bg-background p-4 border border-border">
                        <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Weeks Gap</span>
                        <span className="block text-base font-bold text-foreground mt-1">{results.weeks} weeks</span>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter birth dates.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
