'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Calculate long division quotients and modulo remainders.',
  formula: '$$\\text{Dividend} = \\text{Divisor} \\times \\text{Quotient} + \\text{Remainder}$$',
  example: '17 divided by 5 yields quotient 3 with remainder 2.',
  faqs: [{ q: 'What is modulo?', a: 'An arithmetic operation solving for the remainder after integers division.' }]
};

export default function RemainderCalc() {
  const [divd, setDivd] = useState<number>(17);
  const [divs, setDivs] = useState<number>(5);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setDivd(17); setDivs(5); setResult(null); };
  const handleCalculate = () => {
    setResult({
      quot: Math.floor(divd / divs),
      rem: divd % divs
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Division</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Dividend</label>
              <input type="number" value={divd} onChange={e => setDivd(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Divisor</label>
              <input type="number" value={divs} onChange={e => setDivs(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Division Results</h2>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Remainder</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">{result.rem}</span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Quotient (Integer part)</span>
                <span className="block text-2xl font-bold text-foreground/80 mt-1">{result.quot}</span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter division details.</div>
          )}
        </div>
      </div>
    </div>
  );
}