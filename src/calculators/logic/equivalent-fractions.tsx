'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Generate lists of equivalent ratios fraction scales.',
  formula: '$$\\text{Equivalent} = \\frac{\\text{Numerator} \\times \\text{Multiplier}}{\\text{Denominator} \\times \\text{Multiplier}}$$',
  example: '1/2 is equivalent to 2/4, 3/6, and 4/8.',
  faqs: [{ q: 'What is an equivalent fraction?', a: 'Different fractions that represent the exact same decimal proportion.' }]
};

export default function EquivalentFractions() {
  const [num, setNum] = useState<number>(1);
  const [den, setDen] = useState<number>(2);
  const [result, setResult] = useState<string[] | null>(null);

  const handleReset = () => { setNum(1); setDen(2); setResult(null); };
  const handleCalculate = () => {
    const list = [2, 3, 4, 5].map(m => `${num * m}/${den * m}`);
    setResult(list);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Base Fraction</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Numerator</label>
              <input type="number" value={num} onChange={e => setNum(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Denominator</label>
              <input type="number" value={den} onChange={e => setDen(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Equivalent Fractions</h2>
          {result ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center space-y-2">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono mb-3">Equivalent list</span>
              <span className="block text-2xl font-bold text-primary">{result.join(', ')}</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter base fraction.</div>
          )}
        </div>
      </div>
    </div>
  );
}