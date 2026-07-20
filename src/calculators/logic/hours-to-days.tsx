'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Hours to Days Converter is a utility designed to convert a duration of time measured in hours into standard calendar days. Professionals, students, project managers, and travelers use this tool to simplify schedule planning, project timelines, and shift duration estimations. By converting hours into days, you can easily grasp the duration of long tasks or events relative to the standard 24-hour cycle of a calendar day.',
  formula: `To convert hours to days, use the standard time conversion formula:

$$\\text{Days} = \\frac{\\text{Hours}}{24}$$

This formula works because a standard solar day is internationally defined as exactly 24 hours. Therefore, dividing the total hours by 24 yields the equivalent number of days. If the result has a remainder or decimal part, it represents a fraction of a day, which can be further converted back into hours or minutes. Knowing how to calculate hours to days is a fundamental skill in scheduling.`,
  example: `Let's walk through an hours to days calculation example. Suppose you have a task that takes exactly 78 hours to complete.

1. Identify the input hours: $H = 78$ hours.
2. Apply the conversion formula:
   $$\\text{Days} = \\frac{78}{24}$$
3. Divide 78 by 24:
   $$\\text{Days} = 3.25$$

Thus, 78 hours is equivalent to exactly 3.25 days (or 3 days and 6 hours).`,
  faqs: [
    {
      q: 'How many hours are in a calendar day?',
      a: 'A standard calendar day contains exactly 24 hours. This duration represents the approximate time it takes for Earth to complete one full rotation on its axis relative to the Sun.',
    },
    {
      q: 'How do you convert hours to days manually?',
      a: 'To convert hours to days manually, take the total number of hours and divide it by 24. For instance, if you have 48 hours, dividing 48 by 24 results in exactly 2 days.',
    },
    {
      q: 'Does this converter account for daylight saving time shifts?',
      a: 'This converter utilizes the standard mathematical definition where 1 day equals exactly 24 hours. It does not adjust for seasonal daylight saving time shifts, which may occasionally result in a 23-hour or 25-hour calendar day.',
    },
    {
      q: 'Why is a standard day defined as 24 hours?',
      a: 'The convention of dividing the day into 24 hours dates back to ancient Egyptians and Babylonians. They divided the daytime into 10 hours plus 2 twilight hours, and the nighttime into 12 hours, creating the 24-hour cycle we use today.',
    },
    {
      q: 'What is 100 hours in days?',
      a: 'To find how many days are in 100 hours, divide 100 by 24. The result is approximately 4.167 days, which is equal to 4 days, 4 hours, and 40 minutes.',
    },
  ],
};

export default function Converterhourstodays() {
  const [val, setVal] = useState<number>(72);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVal(72); setResult(null); };
  const handleCalculate = () => {
    setResult(val / 24);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Unit</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Time in Hours</label>
              <input type="number" value={val} onChange={e => { setVal(Number(e.target.value)); setResult(null); }} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Converted Value</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-[10px] font-bold text-foreground/50 uppercase font-mono">Resulting Amount</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} Days</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter value to convert.</div>
          )}
        </div>
      </div>
    </div>
  );
}
