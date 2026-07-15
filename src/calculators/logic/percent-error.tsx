'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find percentage differences separating experimental values from target values.',
  formula: '$$\\text{Percent Error} = \\frac{|\\text{Experimental} - \\text{Theoretical}|}{\\text{Theoretical}} \\times 100$$',
  example: 'Experimental value of 9.5 and theoretical value of 9.8 has a 3.06% error rate.',
  faqs: [{ q: 'What is percent error?', a: 'A measurement of precision gap between experimental test values and standard reference targets.' }]
};

export default function PercentError() {
  const [exp, setExp] = useState<number>(9.5);
  const [theo, setTheo] = useState<number>(9.8);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setExp(9.5); setTheo(9.8); setResult(null); };
  const handleCalculate = () => { setResult((Math.abs(exp - theo) / theo) * 100); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Experiment Results</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Experimental Value</label>
              <input type="number" value={exp} onChange={e => setExp(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Theoretical Value</label>
              <input type="number" value={theo} onChange={e => setTheo(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Percent Error</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Accuracy Gap</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)}%</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter experiment values.</div>
          )}
        </div>
      </div>
    </div>
  );
}