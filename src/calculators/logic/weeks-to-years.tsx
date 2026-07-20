'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Weeks to Years Converter is a simple utility designed to translate weeks into their equivalent values in calendar years. Financial planners, project coordinators, and expectant parents use this converter to monitor timelines over extended periods. Converting shorter-term week durations into years provides a broader perspective on timelines and project lifecycles.',
  formula: `To convert weeks to years, divide the number of weeks by the average number of weeks in a year:

$$\\text{Years} = \\frac{\\text{Weeks}}{52.1775}$$

While a non-leap calendar year has exactly 52 weeks and 1 day (or 52.14 weeks), the astronomical calendar average accounting for leap years is approximately 52.1775 weeks per year. Using this standard constant ensures high accuracy for long-term calculations spanning multiple years or decades. Knowing how many weeks in a year is standard, but this formula refines the conversion.`,
  example: `Let's look at a weeks to years calculation example. Suppose you want to convert 150 weeks into years.

1. Identify the input weeks: $W = 150$.
2. Apply the conversion formula:
   $$\\text{Years} = \\frac{150}{52.1775}$$
3. Divide 150 by 52.1775:
   $$\\text{Years} \\approx 2.875$$

Thus, 150 weeks is approximately equivalent to 2.875 years (or roughly 2 years, 10 months, and 2 weeks).`,
  faqs: [
    {
      q: 'How many weeks are in a standard year?',
      a: 'A standard calendar year has 365 days, which translates to exactly 52 weeks and 1 day. A leap year has 366 days, which is exactly 52 weeks and 2 days.',
    },
    {
      q: 'Why is the denominator 52.1775 instead of exactly 52?',
      a: 'A year is not exactly 52 weeks. Since there are 365.2425 days in an average Gregorian calendar year (accounting for leap year rules), dividing this by 7 days per week yields approximately 52.1775 weeks.',
    },
    {
      q: 'How do you convert years to weeks?',
      a: 'To convert years to weeks, multiply the number of years by the conversion factor of 52.1775. For example, 3 years is equal to 3 × 52.1775 ≈ 156.53 weeks.',
    },
    {
      q: 'What is 52 weeks in years?',
      a: 'Under standard calendar terms, 52 weeks is slightly less than one full year because 52 × 7 = 364 days, which is 1 day short of a standard 365-day year.',
    },
    {
      q: 'How do pregnancy weeks relate to years?',
      a: 'Pregnancy is typically tracked in weeks (normally 40 weeks). 40 weeks translates to approximately 0.77 years, or roughly 9 calendar months.',
    },
  ],
};

export default function Converterweekstoyears() {
  const [val, setVal] = useState<number>(104);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVal(104); setResult(null); };
  const handleCalculate = () => {
    setResult(val / 52.1775);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Unit</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Duration in Weeks</label>
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
