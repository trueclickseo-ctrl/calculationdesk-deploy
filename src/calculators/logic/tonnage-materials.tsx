'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find total material weight in short tons from volume and density.',
  formula: '$$\\text{Tonnage} = \\frac{\\text{Volume (cu ft)} \\times \\text{Density (lbs/cu ft)}}{2,000}$$',
  example: '100 cubic feet of dry sand (100 lbs/cu ft density) weighs 5.0 short tons.',
  faqs: [{ q: 'What is a short ton?', a: 'Standard US weight unit equal to exactly 2,000 pounds.' }]
};

export default function MaterialTonnage() {
  const [vol, setVol] = useState<number>(100);
  const [density, setDensity] = useState<number>(100);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVol(100); setDensity(100); setResult(null); };
  const handleCalculate = () => { setResult((vol * density) / 2000); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Material Specs</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Volume (cubic feet)</label>
              <input type="number" value={vol} onChange={e => setVol(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Bulk Density (lbs/cu ft)</label>
              <input type="number" value={density} onChange={e => setDensity(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Material Tonnage</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Total Weight</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} Tons</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter specs.</div>
          )}
        </div>
      </div>
    </div>
  );
}