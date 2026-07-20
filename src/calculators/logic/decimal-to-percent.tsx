'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Convert base-10 decimals to percentage values.',
  formula: '$$\\text{Percent} = \\text{Decimal} \\times 100$$',
  example: '0.85 converts to 85.0%.',
  faqs: [{ q: 'What is percent?', a: 'Parts per hundred.' }]
};

export default function DecimalToPercent() {
  const [val, setVal] = useState<number>(0.85);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVal(0.85); setResult(null); };
  const handleCalculate = () => { setResult(val * 100); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Decimal</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Decimal Value</label>
              <input type="number" step="0.01" value={val} onChange={e => { setVal(Number(e.target.value)); setResult(null); }} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Percentage Value</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Resulting Percent</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)}%</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter decimal.</div>
          )}
        </div>
      </div>
    </div>
  );
}