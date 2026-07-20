'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Determine reaction rate constants for first order reactions.',
  formula: '$$k = \\frac{\\ln(2)}{t_{1/2}}$$',
  example: 'A half life of 60 seconds yields k ~ 0.01155 s^-1.',
  faqs: [{ q: 'What is a first order reaction?', a: 'A reaction where rate depends linearly on only one reactant concentration.' }]
};

export default function RateConstantCalculator() {
  const [t, setT] = useState<number>(60);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setT(60); setResult(null); };
  const handleCalculate = () => { setResult(Math.log(2) / t); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Reaction Half-Life</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Half Life (seconds)</label>
              <input type="number" value={t} onChange={e => setT(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Rate Constant</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">First-Order k</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(6)} s^-1</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter half life.</div>
          )}
        </div>
      </div>
    </div>
  );
}