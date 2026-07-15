'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Number to Millions Converter translates large numbers to million, billion, or trillion representations.',
  formula: '$$\\text{Millions} = \\frac{\\text{Number}}{1,000,000}$$',
  example: '1,500,000 to millions is 1.50 million.',
  faqs: [
    { q: 'What formats are shown?', a: 'Millions, Billions, and Trillions.' }
  ]
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