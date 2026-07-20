'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Simulate microbusiness margins and profits using classic recipe models.',
  formula: '$$\\text{Cost per Cup} = \\text{Ingredients Cost} \\times \\text{Recipe Ratios}$$',
  example: 'Making 100 cups with $15 in materials, selling at $0.50/cup yields $35 profit.',
  faqs: [{ q: 'What is break-even pricing?', a: 'The minimum sales price required per cup to completely cover ingredients expenses.' }]
};

export default function LemonadeStand() {
  const [cups, setCups] = useState<number>(100);
  const [cost, setCost] = useState<number>(15);
  const [price, setPrice] = useState<number>(0.5);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setCups(100); setCost(15); setPrice(0.5); setResult(null); };
  const handleCalculate = () => {
    const revenue = cups * price;
    const profit = revenue - cost;
    setResult({ revenue, profit });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Stand Operations</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Total Cups Sold</label>
              <input type="number" value={cups} onChange={e => setCups(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Ingredients Cost ($)</label>
                <input type="number" value={cost} onChange={e => setCost(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Price per Cup ($)</label>
                <input type="number" step="0.05" value={price} onChange={e => setPrice(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Financial Statement</h2>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Net Profit / Loss</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">\$${result.profit.toFixed(2)}</span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Gross Revenue</span>
                <span className="block text-2xl font-bold text-foreground/80 mt-1">\$${result.revenue.toFixed(2)}</span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter simulation settings.</div>
          )}
        </div>
      </div>
    </div>
  );
}