'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Seconds to Hours Converter is a specialized conversion tool designed to calculate how many hours are in a given number of seconds. Chemists, athletes, physicists, and system administrators utilize this converter to translate tiny units of time into standard hours for better reporting and readability. Converting highly granular durations into hours helps in analyzing long-term system logs, workout sessions, and chemical reactions.',
  formula: `To convert seconds to hours, divide the total number of seconds by 3,600:

$$\\text{Hours} = \\frac{\\text{Seconds}}{3,600}$$

This formula works because there are exactly 60 seconds in one minute, and exactly 60 minutes in one hour. Therefore, multiplying these two factors gives 3,600 seconds in a single hour (60 × 60 = 3,600). Dividing any duration in seconds by 3,600 yields the equivalent duration in hours. Knowing how many seconds in an hour makes manual math straightforward.`,
  example: `Let's look at a seconds to hours calculation example. Suppose a runner completes a marathon in exactly 12,600 seconds.

1. Identify the input seconds: $S = 12,600$ seconds.
2. Apply the conversion formula:
   $$\\text{Hours} = \\frac{12,600}{3,600}$$
3. Divide 12,600 by 3,600:
   $$\\text{Hours} = 3.5$$

Thus, 12,600 seconds is equivalent to exactly 3.5 hours (or 3 hours and 30 minutes).`,
  faqs: [
    {
      q: 'How many seconds are in one hour?',
      a: 'There are exactly 3,600 seconds in a standard hour. This is calculated by multiplying 60 seconds (in one minute) by 60 minutes (in one hour).',
    },
    {
      q: 'How do you convert seconds to hours manually?',
      a: 'To convert seconds to hours manually, divide the total number of seconds by 3,600. For instance, if you have 7,200 seconds, dividing by 3,600 results in exactly 2 hours.',
    },
    {
      q: 'What is the formula for converting seconds to hours?',
      a: 'The standard formula is Hours = Seconds / 3,600. If you want hours, minutes, and seconds separated, you can use remainder division (modulo arithmetic).',
    },
    {
      q: 'What is 1,000 seconds in hours?',
      a: 'Dividing 1,000 seconds by 3,600 yields approximately 0.2778 hours, which is equal to 16 minutes and 40 seconds.',
    },
    {
      q: 'Why is the metric system of time based on 60?',
      a: 'The use of base 60 (sexagesimal system) for measuring time dates back to ancient Sumerians and Babylonians around 2000 BCE, who chose 60 because it has many divisors (1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, and 60).',
    },
  ],
};

export default function Convertersecondstohours() {
  const [val, setVal] = useState<number>(3600);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVal(3600); setResult(null); };
  const handleCalculate = () => {
    setResult(val / 3600);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Unit</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Time in Seconds</label>
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
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(4)} Hours</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter value to convert.</div>
          )}
        </div>
      </div>
    </div>
  );
}
