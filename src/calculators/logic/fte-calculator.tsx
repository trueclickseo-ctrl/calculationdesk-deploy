'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Convert part-time employee hours to full-time staffing counts.',
  formula: '$$\\text{FTE} = \\frac{\\text{Part-Time Hours per Week}}{\\text{Full-Time Standard (typically 40)}}$$',
  example: 'Staff working a combined 80 part-time hours equals exactly 2.0 FTE.',
  faqs: [{ q: 'Why is FTE useful?', a: 'Standardizes budget planning and headcount metrics across full and part-time teams.' }]
};

export default function FteCalculator() {
  const [hours, setHours] = useState<number>(80);
  const [std, setStd] = useState<number>(40);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setHours(80); setStd(40); setResult(null); };
  const handleCalculate = () => { setResult(hours / std); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Staffing Schedules</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Total Weekly Part-Time Hours</label>
              <input type="number" value={hours} onChange={e => setHours(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Full-Time Standard (Hours/Week)</label>
              <input type="number" value={std} onChange={e => setStd(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve FTE</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Staffing Capacity</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Full-Time Equivalent Staff</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} FTE</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter staffing hours.</div>
          )}
        </div>
      </div>
    </div>
  );
}