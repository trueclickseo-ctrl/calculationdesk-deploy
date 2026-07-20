'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find weight-adjusted averages for group percentage datasets.',
  formula: '$$\\text{Average Percent} = \\frac{\\sum (\\text{Percent}_i \\times \\text{Weight}_i)}{\\sum \\text{Weight}_i}$$',
  example: '80% (weight 1) and 90% (weight 2) has a weighted average of 86.67%.',
  faqs: [{ q: 'Why use a weighted percentage average?', a: 'It accounts for sample sizes differences, giving accurate combined metrics.' }]
};

export default function AveragePercentage() {
  const [p1, setP1] = useState<number>(80);
  const [w1, setW1] = useState<number>(1);
  const [p2, setP2] = useState<number>(90);
  const [w2, setW2] = useState<number>(2);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setP1(80); setW1(1); setP2(90); setW2(2); setResult(null); };
  const handleCalculate = () => {
    setResult(((p1 * w1) + (p2 * w2)) / (w1 + w2));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Percentage Weights</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Group 1 (%)</label>
                <input type="number" value={p1} onChange={e => setP1(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Weight 1</label>
                <input type="number" value={w1} onChange={e => setW1(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Group 2 (%)</label>
                <input type="number" value={p2} onChange={e => setP2(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Weight 2</label>
                <input type="number" value={w2} onChange={e => setW2(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Weighted Average</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Weighted Mean</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)}%</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter percentages and weights.</div>
          )}
        </div>
      </div>
    </div>
  );
}