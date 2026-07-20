'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find standard 2x4 framing studs required for wall lengths.',
  formula: '$$\\text{Studs} = \\frac{\\text{Wall Length (in)}}{\\text{Spacing (in)}} + 1$$ (plus corners adjustments).',
  example: 'A 50 ft wall with 16-inch OC spacing fits ~42 studs.',
  faqs: [{ q: 'What is OC spacing?', a: 'On Center spacing, standard layouts are 16 inches or 24 inches.' }]
};

export default function FramingCalculator() {
  const [len, setLen] = useState<number>(50); // ft
  const [spacing, setSpacing] = useState<number>(16); // in
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setLen(50); setSpacing(16); setResult(null); };
  const handleCalculate = () => {
    const raw = (len * 12) / spacing;
    // add corners and top plates estimation
    setResult(Math.ceil(raw + 4));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Wall Structure</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Wall Length (feet)</label>
              <input type="number" value={len} onChange={e => setLen(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Stud Spacing (inches OC)</label>
              <select value={spacing} onChange={e => setSpacing(Number(e.target.value))} className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer">
                <option value="16">16 inches On-Center</option>
                <option value="24">24 inches On-Center</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Studs Required</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Total Wall Studs</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result} Studs</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter wall specifications.</div>
          )}
        </div>
      </div>
    </div>
  );
}