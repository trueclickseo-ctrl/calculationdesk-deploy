'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find gross margin returns on retail inventory investments.',
  formula: '$$\\text{GMROI} = \\frac{\\text{Gross Margin (\$)}}{\\text{Average Inventory Cost (\$)}}$$',
  example: 'Gross margin of $60,000 on average inventory of $30,000 yields GMROI of 2.0.',
  faqs: [{ q: 'What is a good GMROI score?', a: 'A GMROI of 1.0 or higher is standard, showing inventory makes more than it costs to store.' }]
};

export default function GmroiCalculator() {
  const [margin, setMargin] = useState<number>(60000);
  const [inv, setInv] = useState<number>(30000);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setMargin(60000); setInv(30000); setResult(null); };
  const handleCalculate = () => { setResult(margin / inv); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Retail Profits</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Gross Margin ($)</label>
              <input type="number" value={margin} onChange={e => setMargin(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Average Inventory Cost ($)</label>
              <input type="number" value={inv} onChange={e => setInv(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Inventory Efficiency</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">GMROI Ratio</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)}</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter retail values.</div>
          )}
        </div>
      </div>
    </div>
  );
}