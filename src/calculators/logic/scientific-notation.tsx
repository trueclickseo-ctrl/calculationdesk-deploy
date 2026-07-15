'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Convert decimals into base-10 exponential representations.',
  formula: '$$N \\times 10^e$$',
  example: '0.00045 converts to 4.5 x 10^-4.',
  faqs: [{ q: 'Why use scientific notation?', a: 'It makes reading and calculating with very large or very small numbers much easier.' }]
};

export default function ScientificNotation() {
  const [val, setVal] = useState<number>(0.00045);
  const [result, setResult] = useState<string | null>(null);

  const handleReset = () => { setVal(0.00045); setResult(null); };
  const handleCalculate = () => { setResult(val.toExponential(4)); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Decimal Value</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Number</label>
              <input type="number" step="0.000001" value={val} onChange={e => { setVal(Number(e.target.value)); setResult(null); }} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Scientific Scale</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Scientific Notation</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result}</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter number to convert.</div>
          )}
        </div>
      </div>
    </div>
  );
}