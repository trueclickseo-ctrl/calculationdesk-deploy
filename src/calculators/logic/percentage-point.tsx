'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find absolute difference percentage changes separating two percent metrics.',
  formula: '$$\\text{Percentage Points} = \\text{Percent B} - \\text{Percent A}$$',
  example: 'Growth from 10% to 15% is a 5 percentage point increase (or a 50% relative increase).',
  faqs: [{ q: 'What is the difference between percent and percentage point?', a: 'Percentage point measures the simple arithmetic difference between two percentages, while percent measures relative change.' }]
};

export default function PercentagePoint() {
  const [a, setA] = useState<number>(10);
  const [b, setB] = useState<number>(15);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setA(10); setB(15); setResult(null); };
  const handleCalculate = () => {
    setResult({
      diff: b - a,
      rel: ((b - a) / a) * 100
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Percentage Stats</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">First Percentage (%)</label>
              <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Second Percentage (%)</label>
              <input type="number" value={b} onChange={e => setB(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6 font-bold">Calculation Breakdown</h2>
            {result ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Percentage Points Gap</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {result.diff.toFixed(2)} pp
                  </span>
                </div>
                <div className="rounded-xl bg-background p-4 border border-border text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Relative Change</span>
                  <span className="block text-xl font-bold text-foreground/80 mt-1">
                    {result.rel.toFixed(1)}% change
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter percentages.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}