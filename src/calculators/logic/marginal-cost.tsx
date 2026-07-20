'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find marginal cost modifications for producing additional output units.',
  formula: '$$\\text{Marginal Cost} = \\frac{\\Delta \\text{Total Cost}}{\\Delta \\text{Quantity}}$$',
  example: 'Change in cost of $500 for 100 additional units yields marginal cost of $5.00 per unit.',
  faqs: [{ q: 'What is marginal cost?', a: 'The incremental cost incurred when producing one additional unit of a product.' }]
};

export default function MarginalCost() {
  const [cost, setCost] = useState<number>(500);
  const [qty, setQty] = useState<number>(100);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setCost(500); setQty(100); setResult(null); };
  const handleCalculate = () => { setResult(cost / qty); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Production Cost Changes</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Change in Cost ($)</label>
              <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Change in Quantity</label>
              <input type="number" value={qty} onChange={e => setQty(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Marginal Cost</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Marginal Cost per Unit</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">\$${result.toFixed(2)}</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter cost changes.</div>
          )}
        </div>
      </div>
    </div>
  );
}