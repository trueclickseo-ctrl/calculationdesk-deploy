'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Days to Years Converter is a time-conversion tool designed to accurately translate durations measured in days into standard calendar years. Contract specialists, project managers, astrologers, and historians use this tool to calculate age durations, milestone completions, and long-term project schedules. By converting days into decimal years, you can get a clearer, normalized view of duration.',
  formula: `To convert days to years, divide the total number of days by the average number of days in a year:

$$\\text{Years} = \\frac{\\text{Days}}{365.2425}$$

Although a common calendar year contains exactly 365 days, a leap year occurs once every four years (with minor exceptions) and contains 366 days. To ensure precision over long epochs, scientists and calculators use the mean Gregorian year length of 365.2425 days. Knowing how to convert days to years formula helps in long-term date calculations.`,
  example: `Let's look at a days to years calculation example. Suppose you want to convert exactly 1,000 days into years.

1. Identify the input days: $D = 1,000$.
2. Apply the conversion formula:
   $$\\text{Years} = \\frac{1,000}{365.2425}$$
3. Divide 1,000 by 365.2425:
   $$\\text{Years} \\approx 2.7379$$

Thus, 1,000 days is equivalent to approximately 2.7379 years (or 2 years, 8 months, and 26 days).`,
  faqs: [
    {
      q: 'How many days are in a standard calendar year?',
      a: 'A standard calendar year contains 365 days. A leap year contains 366 days, with the extra day added to the end of February to align the calendar year with the solar year.',
    },
    {
      q: 'Why is the conversion factor 365.2425 instead of 365?',
      a: 'The solar year (the time it takes Earth to orbit the Sun) is roughly 365.2422 days. The Gregorian calendar system approximates this by using a leap year rule that averages out to exactly 365.2425 days per year.',
    },
    {
      q: 'How do you convert years back to days?',
      a: 'To convert years to days, multiply the number of years by 365.2425. For example, 5 years is equal to 5 × 365.2425 ≈ 1,826.21 days.',
    },
    {
      q: 'What is 500 days in years?',
      a: 'Dividing 500 by 365.2425 results in approximately 1.369 years, which is equivalent to 1 year, 4 months, and 13 days.',
    },
    {
      q: 'Do businesses use 360 days instead of 365 for calculations?',
      a: 'Yes. Some financial institutions and interest formulas utilize a conventional year of 360 days (known as the 30/360 day-count convention) to simplify calculations, but calendar conversions use the real average of 365.2425 days.',
    },
  ],
};

export default function Converterdaystoyears() {
  const [val, setVal] = useState<number>(365);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVal(365); setResult(null); };
  const handleCalculate = () => {
    setResult(val / 365.2425);
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
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(4)} Years</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter value to convert.</div>
          )}
        </div>
      </div>
    </div>
  );
}
