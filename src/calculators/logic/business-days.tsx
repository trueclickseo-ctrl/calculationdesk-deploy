'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Business Days Calculator adds or subtracts a target number of business days (working days) to a starting date, automatically skipping weekends (Saturdays and Sundays) to determine the exact end date.`,
  formula: `The calculator steps day-by-day, evaluating if each calendar index constitutes a working day:

**1. Business Day Offset Algorithm:**
- Start at $Date = StartDate$.
- While $DaysCount > 0$:
  - Increment/decrement $Date$ by 1.
  - If $Date$ is not Saturday/Sunday:
    - Decrement $DaysCount$ by 1.
- End Date = $Date$.`,
  example: `**Add 5 business days to Friday, June 5, 2026:**
- Saturday, June 6 $\rightarrow$ skipped (weekend).
- Sunday, June 7 $\rightarrow$ skipped (weekend).
- Day 1: Monday, June 8.
- Day 2: Tuesday, June 9.
- Day 3: Wednesday, June 10.
- Day 4: Thursday, June 11.
- Day 5: Friday, June 12.
- Target End Date = **Friday, June 12, 2026**.`,
  faqs: [
    {
      q: 'Does it support subtracting business days?',
      a: 'Yes. You can select "Subtract" to step backward in time to identify project start dates or past work deadlines.',
    },
    {
      q: 'Can I include Saturdays in the working schedule?',
      a: 'Yes. You can toggle checkmarks to customize which days are treated as the weekend (e.g., only Sunday is the weekend).',
    },
    {
      q: 'How are national holidays handled?',
      a: 'Since holidays vary widely by local jurisdiction, this calculator skips standard weekends only. You will need to account for local holidays separately.',
    },
  ],
};

export default function BusinessDaysCalculator() {
  const [startDate, setStartDate] = useState<string>('2026-06-05');
  const [offsetOp, setOffsetOp] = useState<'add' | 'subtract'>('add');
  const [businessDays, setBusinessDays] = useState<number>(5);
  const [excludeSat, setExcludeSat] = useState<boolean>(true);
  const [excludeSun, setExcludeSun] = useState<boolean>(true);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setStartDate('2026-06-05');
    setOffsetOp('add');
    setBusinessDays(5);
    setExcludeSat(true);
    setExcludeSun(true);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = startDate !== '' && !isNaN(businessDays) && businessDays >= 0;
  if (isValid) {
    const start = new Date(startDate);
    const end = new Date(start);
    const multiplier = offsetOp === 'add' ? 1 : -1;

    let remainingDays = businessDays;
    let calendarDaysChecked = 0;

    while (remainingDays > 0) {
      end.setDate(end.getDate() + multiplier);
      calendarDaysChecked++;
      const day = end.getDay(); // 0 = Sun, 6 = Sat

      const isWeekend = (day === 6 && excludeSat) || (day === 0 && excludeSun);
      if (!isWeekend) {
        remainingDays--;
      }
    }

    results = {
      finalDate: end.toDateString(),
      calendarDaysChecked,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (startDate === '') newErrors.startDate = 'Please select a starting date';
    if (isNaN(businessDays) || businessDays < 0) newErrors.businessDays = 'Please enter a valid number of business days';
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="offset-op" className="block text-sm font-semibold text-foreground/80 mb-2">Action</label>
                <select
                  id="offset-op"
                  value={offsetOp}
                  onChange={(e) => setOffsetOp(e.target.value as 'add' | 'subtract')}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                >
                  <option value="add">Add (+)</option>
                  <option value="subtract">Subtract (-)</option>
                </select>
              </div>

              <div>
                <label htmlFor="business-days" className="block text-sm font-semibold text-foreground/80 mb-2">Business Days</label>
                <input
                  id="business-days"
                  type="number"
                  value={businessDays}
                  onChange={(e) => setBusinessDays(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.businessDays && <p className="text-xs text-red-500 mt-1 font-medium">{errors.businessDays}</p>}
              </div>
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
                Calculate Target Date
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
            <h2 className="text-xl font-bold text-foreground mb-6">Target Result</h2>
            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Calculated End Date</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.finalDate}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Calendar Days Traversed</span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    {results.calendarDaysChecked} calendar days
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select starting date and offset.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
