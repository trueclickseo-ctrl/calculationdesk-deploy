'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Evaluate performance changes between equivalent annual periods.',
  formula: '$$\\text{YoY Growth \%} = \\frac{\\text{Current Period} - \\text{Previous Period}}{\\text{Previous Period}} \\times 100$$',
  example: 'Revenue growing from $100k to $120k yields 20% YoY growth.',
  faqs: [{ q: 'Why is YoY growth important?', a: 'It eliminates seasonal biases, permitting realistic year-over-year operational trends evaluations.' }]
};

export default function YoYGrowth() {
  const [prev, setPrev] = useState<number>(100000);
  const [curr, setCurr] = useState<number>(120000);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setPrev(100000); setCurr(120000); setResult(null); };
  const handleCalculate = () => { setResult(((curr - prev) / prev) * 100); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Annual Revenue</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Previous Year Value ($)</label>
              <input type="number" value={prev} onChange={e => setPrev(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Current Year Value ($)</label>
              <input type="number" value={curr} onChange={e => setCurr(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">YoY Growth Rate</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Percentage Growth</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)}%</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter revenue values.</div>
          )}
        </div>
      </div>
    </div>
  );
}