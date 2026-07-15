'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The 100 Day Calculator computes the exact calendar date 100 days in the future or past from any starting date.`,
  formula: `Date offsets are calculated by adding or subtracting days from a start timestamp:

$$\\text{Future Date} = \\text{Start Date} + 100 \\quad (\\text{days})$$
$$\\text{Past Date} = \\text{Start Date} - 100 \\quad (\\text{days})$$`,
  example: `**Find the date 100 days after January 1st:**
- Offset Date calculated automatically.`,
  faqs: [
    {
      q: 'Does this factor in leap years?',
      a: 'Yes. The calculation uses standard browser date objects which dynamically account for the varying lengths of months and leap year insertions.',
    },
    {
      q: 'What is this offset typically used for?',
      a: 'It is commonly used to track payment due dates, project delivery milestones, and standard contract windows.',
    },
  ],
};

export default function Days100Calculator() {
  const [startDate, setStartDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [result, setResult] = useState<{
    futureDate: string;
    pastDate: string;
  } | null>(null);

  const handleReset = () => {
    const today = new Date();
    setStartDate(today.toISOString().split('T')[0]);
    setResult(null);
  };

  const handleCalculate = () => {
    if (!startDate) return;
    const start = new Date(startDate);
    
    const future = new Date(start);
    future.setDate(start.getDate() + 100);

    const past = new Date(start);
    past.setDate(start.getDate() - 100);

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    setResult({
      futureDate: future.toLocaleDateString('en-US', options),
      pastDate: past.toLocaleDateString('en-US', options),
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Select Date</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="start-date-input" className="block text-sm font-semibold text-foreground/80 mb-2">Starting Date</label>
              <input
                id="start-date-input"
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Add / Subtract 100 Days
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
          <h2 className="text-xl font-bold text-foreground mb-6 font-bold">Calculation Result</h2>

          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">100 Days in the Future (+100)</span>
                <span className="block text-lg font-bold text-primary mt-1">{result.futureDate}</span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">100 Days in the Past (-100)</span>
                <span className="block text-lg font-bold text-foreground/70 mt-1">{result.pastDate}</span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select starting date.</div>
          )}
        </div>
      </div>
    </div>
  );
}
