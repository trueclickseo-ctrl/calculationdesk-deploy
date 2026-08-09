'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find corporate valuations as outstanding stock multiplies current share price.',
  formula: '$$\\text{Market Cap} = \\text{Share Price} \\times \\text{Outstanding Shares}$$',
  example: 'Share price of $150 with 10 million shares yields a $1.5 billion valuation.',
  faqs: [{ q: 'What is large cap?', a: 'Companies with a market cap of $10 billion or more.' }]
};

export default function MarketCap() {
  const [price, setPrice] = useState<number>(150);
  const [shares, setShares] = useState<number>(10000000);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setPrice(150); setShares(10000000); setResult(null); };
  const handleCalculate = () => { setResult(price * shares); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Stock Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Current Share Price ($)</label>
              <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Outstanding Shares count</label>
              <input type="number" value={shares} onChange={e => setShares(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Corporate Valuation</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Market Cap Value</span>
              <span className="block text-3xl font-extrabold text-primary mt-2">${result.toLocaleString(undefined, {maximumFractionDigits: 2})}</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter stock metrics.</div>
          )}
        </div>
      </div>
    </div>
  );
}