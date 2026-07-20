'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Estimate total steel rebar lengths required for concrete slabs.',
  formula: 'Grid mesh density spacing division.',
  example: 'Slab 20 ft by 20 ft with 18-inch grid spacing fits ~580 feet of reinforcement rebar.',
  faqs: [{ q: 'What is standard overlap sizing?', a: 'Splices should overlap by 30 to 40 times the rebar diameter (typically 12-18 inches).' }]
};

export default function RebarCalculator() {
  const [len, setLen] = useState<number>(20);
  const [width, setWidth] = useState<number>(20);
  const [spacing, setSpacing] = useState<number>(18); // inches
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setLen(20); setWidth(20); setSpacing(18); setResult(null); };
  const handleCalculate = () => {
    const sp = spacing / 12;
    const linesX = Math.floor(len / sp) + 1;
    const linesY = Math.floor(width / sp) + 1;
    setResult((linesX * width) + (linesY * len));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Slab Reinforcement</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Length (feet)</label>
                <input type="number" value={len} onChange={e => setLen(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Width (feet)</label>
                <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Grid Spacing (inches)</label>
              <input type="number" value={spacing} onChange={e => setSpacing(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Steel Reinforcement</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Total Rebar Length</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{Math.round(result).toLocaleString()} Feet</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter slab dimensions.</div>
          )}
        </div>
      </div>
    </div>
  );
}