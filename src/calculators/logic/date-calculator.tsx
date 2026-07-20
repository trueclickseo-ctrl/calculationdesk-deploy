'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Date Calculator is a temporal utility designed to measure the exact difference between two dates or add/subtract intervals (days, weeks, months, years) from a starting reference date.`,
  formula: `Date math relies on calendar epoch timestamps and leap year adjustments:

**1. Difference in Total Days:**
$$\\text{Days} = \\frac{\\text{End Timestamp} - \\text{Start Timestamp}}{1000 \\times 60 \\times 60 \\times 24}$$

**2. Date Offset Addition:**
$$\\text{New Date} = \\text{Start Date} + \\text{Interval (Days/Weeks/Months/Years)}$$`,
  example: `**1. Calculate difference between Jan 1, 2026 and Jan 15, 2026:**
- Epoch difference = 14 days.
- Output: **14 days** (or 2 weeks).

**2. Add 3 months to January 15, 2026:**
- Output: **April 15, 2026** (using standard calendar leap offset).`,
  faqs: [
    {
      q: 'Does this calculator account for leap years?',
      a: 'Yes. The calculator uses JavaScript standard Date objects, which automatically handle leap years, differing month lengths (28, 30, or 31 days), and daylight savings offsets.',
    },
    {
      q: 'How many days are in a standard calendar year?',
      a: 'A standard year has 365 days. Leap years occur every 4 years (with some exceptions) and contain 366 days, adding an extra day (February 29).',
    },
    {
      q: 'How do you calculate weeks between two dates?',
      a: 'Divide the total number of days difference by 7. Any remaining days represent fractional weeks (e.g., 9 days is 1 week and 2 days).',
    },
  ],
};

type DateTab = 'difference' | 'offset';
type OffsetUnit = 'days' | 'weeks' | 'months' | 'years';

export default function DateCalculator() {
  const [activeTab, setActiveTab] = useState<DateTab>('difference');

  // Difference inputs
  const [startDate, setStartDate] = useState<string>('2026-01-01');
  const [endDate, setEndDate] = useState<string>('2026-01-15');

  // Offset inputs
  const [refDate, setRefDate] = useState<string>('2026-01-15');
  const [offsetOp, setOffsetOp] = useState<'add' | 'subtract'>('add');
  const [offsetValue, setOffsetValue] = useState<number>(3);
  const [offsetUnit, setOffsetUnit] = useState<OffsetUnit>('months');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setStartDate('2026-01-01');
    setEndDate('2026-01-15');
    setRefDate('2026-01-15');
    setOffsetOp('add');
    setOffsetValue(3);
    setOffsetUnit('months');
    setErrors({});
  };

  // Computations
  let diffResults = null;
  const isDiffValid = startDate !== '' && endDate !== '';
  if (activeTab === 'difference' && isDiffValid) {
    const sDate = new Date(startDate);
    const eDate = new Date(endDate);
    
    // time difference in ms
    const diffTime = eDate.getTime() - sDate.getTime();
    const totalDays = Math.round(diffTime / (1000 * 60 * 60 * 24));
    
    const weeks = Math.trunc(Math.abs(totalDays) / 7);
    const remainingDays = Math.abs(totalDays) % 7;

    diffResults = {
      totalDays,
      weeks,
      remainingDays,
    };
  }

  let offsetResults = null;
  const isOffsetValid = refDate !== '' && !isNaN(offsetValue);
  if (activeTab === 'offset' && isOffsetValid) {
    const date = new Date(refDate);
    const multiplier = offsetOp === 'add' ? 1 : -1;

    switch (offsetUnit) {
      case 'days':
        date.setDate(date.getDate() + offsetValue * multiplier);
        break;
      case 'weeks':
        date.setDate(date.getDate() + offsetValue * 7 * multiplier);
        break;
      case 'months':
        date.setMonth(date.getMonth() + offsetValue * multiplier);
        break;
      case 'years':
        date.setFullYear(date.getFullYear() + offsetValue * multiplier);
        break;
      default:
        break;
    }

    offsetResults = {
      finalDate: date.toDateString(),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (activeTab === 'difference') {
      if (startDate === '') newErrors.startDate = 'Please select a start date';
      if (endDate === '') newErrors.endDate = 'Please select an end date';
    } else {
      if (refDate === '') newErrors.refDate = 'Please select a reference date';
      if (isNaN(offsetValue) || offsetValue < 0) newErrors.offsetValue = 'Please enter a valid interval value';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Calendar Details</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setActiveTab('difference'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === 'difference'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Time Between Dates
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('offset'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === 'offset'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Add / Subtract Date
            </button>
          </div>

          <div className="space-y-5">
            {activeTab === 'difference' && (
              <div className="space-y-4">
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
              </div>
            )}

            {activeTab === 'offset' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="ref-date" className="block text-sm font-semibold text-foreground/80 mb-2">Reference Date</label>
                  <input
                    id="ref-date"
                    type="date"
                    value={refDate}
                    onChange={(e) => { setRefDate(e.target.value); setErrors({}); }}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.refDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.refDate}</p>}
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="offset-op" className="block text-[10px] font-semibold text-foreground/60 mb-1">Action</label>
                    <select
                      id="offset-op"
                      value={offsetOp}
                      onChange={(e) => setOffsetOp(e.target.value as 'add' | 'subtract')}
                      className="block w-full py-2 px-2 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    >
                      <option value="add">Add (+)</option>
                      <option value="subtract">Subtract (-)</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="offset-val" className="block text-[10px] font-semibold text-foreground/60 mb-1">Value</label>
                    <input
                      id="offset-val"
                      type="number"
                      value={offsetValue}
                      onChange={(e) => setOffsetValue(Number(e.target.value))}
                      className="block w-full py-1.5 px-2 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                    {errors.offsetValue && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.offsetValue}</p>}
                  </div>

                  <div>
                    <label htmlFor="offset-unit" className="block text-[10px] font-semibold text-foreground/60 mb-1">Unit</label>
                    <select
                      id="offset-unit"
                      value={offsetUnit}
                      onChange={(e) => setOffsetUnit(e.target.value as OffsetUnit)}
                      className="block w-full py-2 px-2 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    >
                      <option value="days">Days</option>
                      <option value="weeks">Weeks</option>
                      <option value="months">Months</option>
                      <option value="years">Years</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Date
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
            <h2 className="text-xl font-bold text-foreground mb-6">Calendar Result</h2>

            {activeTab === 'difference' && (
              diffResults ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Total Days Difference</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {diffResults.totalDays.toLocaleString()} days
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Weeks breakdown</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {diffResults.weeks} weeks and {diffResults.remainingDays} days
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select start and end dates.</div>
              )
            )}

            {activeTab === 'offset' && (
              offsetResults ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Calculated Date Target</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {offsetResults.finalDate}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select date parameters.</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
