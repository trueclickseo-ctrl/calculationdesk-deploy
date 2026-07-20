'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Convert square footage coverages to cubic volume yards.',
  formula: '$$\\text{Cubic Yards} = \\frac{\\text{Area (sq ft)} \\times \\text{Depth (in) / 12}}{27}$$',
  example: 'Coverage of 500 sq ft at 4 inches depth needs ~6.17 cubic yards.',
  faqs: [{ q: 'How many cubic feet is 1 cubic yard?', a: 'Exactly 27 cubic feet.' }]
};

export default function SqftToCubicYards() {
  const [area, setArea] = useState<number>(500);
  const [depth, setDepth] = useState<number>(4);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setArea(500); setDepth(4); setResult(null); };
  const handleCalculate = () => { setResult((area * (depth / 12)) / 27); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Slab Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Surface Area (sq ft)</label>
              <input type="number" value={area} onChange={e => setArea(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Depth (inches)</label>
              <input type="number" value={depth} onChange={e => setDepth(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Cubic Volume Required</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Volume Quantity</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} Cubic Yards</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter coverage settings.</div>
          )}
        </div>
      </div>
    </div>
  );
}