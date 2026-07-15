'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find final values after percentage escalations.',
  formula: '$$\\text{Final} = \\text{Original} \\times \\left(1 + \\frac{\\text{Increase \%}}{100}\\right)$$',
  example: 'Starting with $100 and adding a 15% increase yields a final value of $115.',
  faqs: [{ q: 'What is a markup?', a: 'The amount added to a cost price to determine selling price, often calculated as a percentage increase.' }]
};

export default function PercentageIncrease() {
  const [val, setVal] = useState<number>(100);
  const [inc, setInc] = useState<number>(15);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVal(100); setInc(15); setResult(null); };
  const handleCalculate = () => { setResult(val * (1 + inc / 100)); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6 font-bold">Base settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Original Value</label>
              <input type="number" value={val} onChange={e => { setVal(Number(e.target.value)); setResult(null); }} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Percentage Increase (%)</label>
              <input type="number" value={inc} onChange={e => { setInc(Number(e.target.value)); setResult(null); }} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6 font-bold">Escalated Value</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Final Amount</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)}</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter base settings.</div>
          )}
        </div>
      </div>
    </div>
  );
}
