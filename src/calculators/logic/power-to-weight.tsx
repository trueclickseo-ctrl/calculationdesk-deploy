'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Solve performance power weights for racing metrics.',
  formula: '$$\\text{Ratio} = \\frac{\\text{Horsepower}}{\\text{Weight (lbs)}}$$',
  example: 'A 300 hp car weighing 3000 lbs has a power-to-weight ratio of 0.10 hp/lb.',
  faqs: [{ q: 'Why does this ratio matter?', a: 'It dictates the acceleration dynamics of vehicles; higher values represent quicker speeds.' }]
};

export default function PowerToWeight() {
  const [hp, setHp] = useState<number>(300);
  const [weight, setWeight] = useState<number>(3000);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setHp(300); setWeight(3000); setResult(null); };
  const handleCalculate = () => { setResult(hp / weight); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Vehicle Performance</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Horsepower (HP)</label>
              <input type="number" value={hp} onChange={e => setHp(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Weight (Pounds, lbs)</label>
              <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Power / Weight Output</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Performance Metric</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(4)} hp / lb</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter specifications.</div>
          )}
        </div>
      </div>
    </div>
  );
}