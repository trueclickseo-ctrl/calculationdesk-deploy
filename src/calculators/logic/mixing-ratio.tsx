'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Calculate mixing ratios for two-part solutions (e.g. fuels, epoxies, sanitizers).',
  formula: '$$\\text{Part A} = \\text{Total} \\times \\frac{\\text{Ratio A}}{\\text{Ratio A} + \\text{Ratio B}}$$',
  example: 'Mixing 50:1 fuel for a 5 Liter tank needs 0.098 L of oil and 4.902 L of gas.',
  faqs: [{ q: 'What is a 50:1 mixing ratio?', a: 'For every 50 parts of gasoline, add 1 part of two-stroke engine oil.' }]
};

export default function MixingRatioCalculator() {
  const [total, setTotal] = useState<number>(5);
  const [partA, setPartA] = useState<number>(50);
  const [partB, setPartB] = useState<number>(1);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setTotal(5); setPartA(50); setPartB(1); setResult(null); };
  const handleCalculate = () => {
    const sum = partA + partB;
    setResult({
      volA: total * (partA / sum),
      volB: total * (partB / sum)
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Mixing Setup</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Total Output Volume</label>
              <input type="number" value={total} onChange={e => setTotal(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Ratio Part A</label>
                <input type="number" value={partA} onChange={e => setPartA(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Ratio Part B</label>
                <input type="number" value={partB} onChange={e => setPartB(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve Proportions</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Component Proportions</h2>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Part A Quantity</span>
                <span className="block text-2xl font-bold text-primary mt-1">{result.volA.toFixed(3)} units</span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Part B Quantity</span>
                <span className="block text-2xl font-bold text-foreground/80 mt-1">{result.volB.toFixed(3)} units</span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter mixing variables.</div>
          )}
        </div>
      </div>
    </div>
  );
}