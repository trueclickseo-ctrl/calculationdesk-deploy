'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Months to Years Converter is a simple time-conversion utility designed to calculate the equivalent number of calendar years from a given period in months. Parents tracking child milestones, lease holders, human resource officers calculating work experience, and financial analysts use this tool to translate shorter monthly counts into clear year representations.',
  formula: `To convert months to years, divide the total number of months by 12:

$$\\text{Years} = \\frac{\\text{Months}}{12}$$

This formula works because a standard calendar year is defined as having exactly 12 months. Dividing any monthly figure by 12 scales the time duration up to the yearly unit. Knowing how to convert months to years helps in planning contracts and timelines.`,
  example: `Let's look at a months to years conversion example. Suppose a contract is signed for a duration of exactly 45 months.

1. Identify the input months: $M = 45$.
2. Apply the conversion formula:
   $$\\text{Years} = \\frac{45}{12}$$
3. Divide 45 by 12:
   $$\\text{Years} = 3.75$$

Thus, 45 months is equivalent to exactly 3.75 years (or 3 years and 9 months).`,
  faqs: [
    {
      q: 'How many months are in a standard year?',
      a: 'There are exactly 12 months in a standard calendar year. This structure is used globally across the Gregorian calendar system.',
    },
    {
      q: 'How do you convert months to years manually?',
      a: 'To convert months to years manually, divide the total months by 12. The quotient represents the whole years, and the remainder represents the remaining months. For example, 15 months is 1 year (12 months) and 3 months.',
    },
    {
      q: 'What is 18 months in years?',
      a: 'Dividing 18 by 12 results in exactly 1.5 years, which is equivalent to 1 year and 6 months (or one and a half years).',
    },
    {
      q: 'Does this conversion change in leap years?',
      a: 'No. While leap years add one day to February (resulting in 366 days in that year), a year always contains exactly 12 months. The mathematical conversion factor remains exactly 12.',
    },
    {
      q: 'Why is time tracked in months for young children?',
      a: 'Young children develop extremely rapidly. Tracking their age in months (e.g., 18 months, 24 months) provides a more precise representation of their growth milestones than tracking in years.',
    },
  ],
};

export default function Convertermonthstoyears() {
  const [val, setVal] = useState<number>(18);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVal(18); setResult(null); };
  const handleCalculate = () => {
    setResult(val / 12);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Unit</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Time in Months</label>
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
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} Years</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter value to convert.</div>
          )}
        </div>
      </div>
    </div>
  );
}
