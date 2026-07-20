'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Days to Months Converter is a utility designed to convert durations of time from days into average calendar months. Tenants, landlords, subscription services, and project managers use this tool to calculate rental terms, project milestones, and trial period durations. Translating days into months simplifies long-term schedule comprehension and billing cycle planning.',
  formula: `To convert days to months, divide the total number of days by the average length of a month:

$$\\text{Months} = \\frac{\\text{Days}}{30.437}$$

Since calendar months vary in length (28, 29, 30, or 31 days), this tool utilizes the average length of a month in a Gregorian calendar year, which is approximately 30.437 days (365.2425 days divided by 12 months). Using this standard coefficient provides consistent and reliable conversions over any duration. Knowing how many days in a month is useful, but this average formula ensures precision.`,
  example: `Let's look at a days to months calculation example. Suppose you have an agreement that lasts for exactly 180 days.

1. Identify the input days: $D = 180$.
2. Apply the conversion formula:
   $$\\text{Months} = \\frac{180}{30.437}$$
3. Divide 180 by 30.437:
   $$\\text{Months} \\approx 5.914$$

Thus, 180 days is approximately equivalent to 5.91 months (or almost 6 full months).`,
  faqs: [
    {
      q: 'How many days are in a standard month?',
      a: 'A calendar month has no fixed number of days; it can have 28, 29, 30, or 31 days. For standard mathematical calculations, 30 days is frequently used as a simplified average.',
    },
    {
      q: 'Why does this converter divide by 30.437 instead of 30?',
      a: 'Dividing by 30.437 accounts for the full calendar structure across a 365-day year, including leap years. Over long periods, dividing by 30 would result in significant mathematical errors.',
    },
    {
      q: 'How do you convert months back into days?',
      a: 'To convert months back to days, multiply the number of months by the conversion factor of 30.437. For example, 3 months equals 3 × 30.437 ≈ 91.31 days.',
    },
    {
      q: 'What is 90 days in months?',
      a: 'Dividing 90 days by 30.437 yields approximately 2.957 months, which is extremely close to 3 full calendar months.',
    },
    {
      q: 'How many days are in a leap year month?',
      a: 'In a leap year, February has 29 days instead of the standard 28. All other eleven months maintain their standard lengths of 30 or 31 days.',
    },
  ],
};

export default function Converterdaystomonths() {
  const [val, setVal] = useState<number>(90);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVal(90); setResult(null); };
  const handleCalculate = () => {
    setResult(val / 30.437);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Unit</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Time in Days</label>
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
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} Months</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter value to convert.</div>
          )}
        </div>
      </div>
    </div>
  );
}
