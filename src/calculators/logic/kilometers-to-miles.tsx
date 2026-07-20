'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Kilometers to Miles Converter is an online distance converter that translates kilometers (km) into standard miles (mi). Runners, cyclists, road-trip travelers, and aviation professionals use this utility to switch between metric and imperial systems. Since different regions use different road signs and pacing metrics, converting kilometers to miles helps ensure clear communication and tracking.',
  formula: `To convert kilometers to miles, multiply the kilometer value by the international conversion factor of 0.621371:

$$\\text{Miles} = \\text{Kilometers} \\times 0.621371$$

This multiplier represents the proportion of a mile relative to a kilometer. Since a standard international mile is defined as exactly 1,609.344 meters, and a kilometer is exactly 1,000 meters, dividing 1,000 by 1,609.344 yields approximately 0.621371192. Knowing the convert kilometers to miles formula makes switching measurement systems easy.`,
  example: `Let's look at a kilometers to miles calculation example. Suppose you are running a 10k race (10 kilometers) and want to know the distance in miles.

1. Identify the input kilometers: $K = 10$.
2. Apply the conversion formula:
   $$\\text{Miles} = 10 \\times 0.621371$$
3. Perform the multiplication:
   $$\\text{Miles} = 6.21371$$

Thus, 10 kilometers is equivalent to approximately 6.21 miles.`,
  faqs: [
    {
      q: 'How many miles are in a kilometer?',
      a: 'There are approximately 0.621371 miles in one kilometer. Conversely, there are exactly 1.609344 kilometers in a standard international mile.',
    },
    {
      q: 'How do you convert kilometers to miles quickly in your head?',
      a: 'For a quick mental estimate, multiply the kilometers by 0.6. Alternatively, divide the kilometers by 8 and multiply by 5 (since 8 km is very close to 5 miles, a ratio of 1.6). For example, 80 km/h is roughly 80 / 8 × 5 = 50 mph.',
    },
    {
      q: 'Is a mile longer than a kilometer?',
      a: 'Yes. One mile is roughly 1.6 times longer than one kilometer. Specifically, 1 mile equals 1.609344 kilometers.',
    },
    {
      q: 'What is 5 kilometers in miles?',
      a: '5 kilometers (commonly referred to as a 5K run) is equal to approximately 3.1 miles. This is calculated by multiplying 5 by 0.621371.',
    },
    {
      q: 'Why do some countries use kilometers and others miles?',
      a: 'Most countries use kilometers as part of the metric system (SI) adopted globally. The United States, United Kingdom, Liberia, and Myanmar continue to use miles as their official unit for road speed limits and distance measurements.',
    },
  ],
};

export default function Converterkilometerstomiles() {
  const [val, setVal] = useState<number>(10);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVal(10); setResult(null); };
  const handleCalculate = () => {
    setResult(val * 0.621371192);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Unit</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Distance in Kilometers (km)</label>
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
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(3)} Miles (mi)</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter value to convert.</div>
          )}
        </div>
      </div>
    </div>
  );
}
