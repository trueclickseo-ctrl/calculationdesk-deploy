'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Number to Millions Converter is an online tool designed to convert large numbers into easily readable formats like Millions (M), Billions (B), and Trillions (T). Financial analysts, journalists, marketers, and researchers use this utility to simplify massive figures found in budgets, market reports, and scientific studies. Converting long strings of digits into scale-abbreviated versions makes them much easier to read and present in reports.',
  formula: `To convert a raw number to millions, billions, or trillions, divide the number by the corresponding scale factor:

$$\\text{Millions} = \\frac{\\text{Number}}{1,000,000}$$
$$\\text{Billions} = \\frac{\\text{Number}}{1,000,000,000}$$
$$\\text{Trillions} = \\frac{\\text{Number}}{1,000,000,000,000}$$

This calculation scales down large integers into small decimals. For example, dividing by 1,000,000 shifts the decimal point six places to the left, which is the standard conversion factor for millions. Understanding the convert numbers to millions formula helps in simplifying data visualization.`,
  example: `Let's look at a number to millions conversion example. Suppose you want to convert the number 42,500,000 into millions and billions.

1. Identify the input value: $N = 42,500,000$.
2. To convert to millions, apply the formula:
   $$\\text{Millions} = \\frac{42,500,000}{1,000,000} = 42.5\\text{ million}$$
3. To convert to billions, apply the formula:
   $$\\text{Billions} = \\frac{42,500,000}{1,000,000,000} = 0.0425\\text{ billion}$$

Thus, 42,500,000 equals exactly 42.5 million or 0.0425 billion.`,
  faqs: [
    {
      q: 'How many zeros are in a million?',
      a: 'A standard million contains exactly six zeros (1,000,000). A billion contains nine zeros (1,000,000,000) and a trillion contains twelve zeros (1,000,000,000,000) in the short scale numbering system.',
    },
    {
      q: 'What is the short scale vs long scale numbering system?',
      a: 'The short scale system (used in the US, UK, and modern finance) defines a billion as a thousand million ($10^9$) and a trillion as a million million ($10^{12}$). The long scale system (used historically in parts of Europe) defines a billion as a million million ($10^{12}$).',
    },
    {
      q: 'How do you write 1.5 million in full numbers?',
      a: 'To write 1.5 million in full digits, multiply 1.5 by 1,000,000, which equals 1,500,000.',
    },
    {
      q: 'Why is it helpful to convert numbers to millions?',
      a: 'Large numbers with many zeros are difficult for the human brain to process quickly and can lead to reading errors. Abbreviating them to millions or billions makes reports, presentations, and dashboards cleaner and more readable.',
    },
    {
      q: 'What is 100 million in billions?',
      a: '100 million is equivalent to exactly 0.1 billion. This is calculated by dividing 100,000,000 by 1,000,000,000.',
    },
  ],
};

export default function NumberMillionCalculator() {
  const [val, setVal] = useState<number>(1500000);
  const [result, setResult] = useState<any>({ mil: 1.5, bil: 0.0015, tril: 0.0000015 });

  const handleReset = () => { setVal(1500000); setResult({ mil: 1.5, bil: 0.0015, tril: 0.0000015 }); };

  const handleCalculate = () => {
    setResult({
      mil: val / 1000000,
      bil: val / 1000000000,
      tril: val / 1000000000000
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Input Number</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Number Value</label>
              <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve Scale</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-6">Scale breakdown</h2>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="rounded-xl bg-background p-3 border border-border">
              <span className="block text-[10px] font-bold text-foreground/50 uppercase">Millions</span>
              <span className="block text-sm font-bold text-foreground mt-1 truncate">{result.mil.toLocaleString(undefined, {maximumFractionDigits: 6})} M</span>
            </div>
            <div className="rounded-xl bg-background p-3 border border-border">
              <span className="block text-[10px] font-bold text-foreground/50 uppercase">Billions</span>
              <span className="block text-sm font-bold text-foreground mt-1 truncate">{result.bil.toLocaleString(undefined, {maximumFractionDigits: 9})} B</span>
            </div>
            <div className="rounded-xl bg-background p-3 border border-border">
              <span className="block text-[10px] font-bold text-foreground/50 uppercase">Trillions</span>
              <span className="block text-sm font-bold text-foreground mt-1 truncate">{result.tril.toLocaleString(undefined, {maximumFractionDigits: 12})} T</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}