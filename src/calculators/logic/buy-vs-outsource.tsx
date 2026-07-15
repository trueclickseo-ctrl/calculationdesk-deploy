'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find break-even operational points comparing in-house production to outsourcing.',
  formula: 'Break-even volume is determined by comparing fixed and variable costs.',
  example: 'In-house fixed cost of $5,000 and $10/unit variable cost is cheaper than outsourcing at $30/unit if volume exceeds 250 units.',
  faqs: [{ q: 'What is the break-even point?', a: 'The production volume where building in-house costs exactly matches outsourcing.' }]
};

export default function BuyVsOutsource() {
  const [fixed, setFixed] = useState<number>(5000);
  const [inhouseVar, setInhouseVar] = useState<number>(10);
  const [outPrice, setOutPrice] = useState<number>(30);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setFixed(5000); setInhouseVar(10); setOutPrice(30); setResult(null); };
  const handleCalculate = () => {
    // Break-even: Fixed + InHouseVar * Q = OutPrice * Q => Q = Fixed / (OutPrice - InHouseVar)
    const beQty = fixed / (outPrice - inhouseVar);
    setResult({ beQty });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Financial Options</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">In-House Fixed Cost ($)</label>
              <input type="number" value={fixed} onChange={e => setFixed(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">In-house variable ($/u)</label>
                <input type="number" value={inhouseVar} onChange={e => setInhouseVar(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Outsource Price ($/u)</label>
                <input type="number" value={outPrice} onChange={e => setOutPrice(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Break-Even Volume</h2>
          {result ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Spontaneity break-even unit count</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{Math.ceil(result.beQty)} Units</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter cost specs.</div>
          )}
        </div>
      </div>
    </div>
  );
}