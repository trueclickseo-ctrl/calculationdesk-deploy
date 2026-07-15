'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Convert cooling capacity BTU units to air conditioning Tons.',
  formula: '$$\\text{Tons} = \\frac{\\text{BTUs}}{12,000}$$',
  example: 'A 24,000 BTU/hr system has a capacity of 2.0 Tons.',
  faqs: [{ q: 'What is a Ton of refrigeration?', a: 'Equivalent to the rate of heat transfer required to melt 1 short ton of ice in 24 hours (12,000 BTU/hr).' }]
};

export default function BtuToTons() {
  const [btu, setBtu] = useState<number>(24000);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setBtu(24000); setResult(null); };
  const handleCalculate = () => { setResult(btu / 12000); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Cooling Power</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">BTUs per Hour (BTU/hr)</label>
              <input type="number" value={btu} onChange={e => { setBtu(Number(e.target.value)); setResult(null); }} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">HVAC Cooling Capacity</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Tons of Cooling</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} Tons</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter BTUs.</div>
          )}
        </div>
      </div>
    </div>
  );
}