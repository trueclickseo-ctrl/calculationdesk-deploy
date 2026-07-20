'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find mass percentage composition of solute in a solution.',
  formula: '$$\\text{Mass Percent} = \\frac{\\text{Solute Mass}}{\\text{Solute Mass} + \\text{Solvent Mass}} \\times 100$$',
  example: '10g solute in 90g solvent yields a 10% mass percent solution.',
  faqs: [{ q: 'What is mass percent?', a: 'The ratio of solute mass to total solution mass, multiplied by 100.' }]
};

export default function MassPercentCalculator() {
  const [solute, setSolute] = useState<number>(10);
  const [solvent, setSolvent] = useState<number>(90);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setSolute(10); setSolvent(90); setResult(null); };
  const handleCalculate = () => { setResult((solute / (solute + solvent)) * 100); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Mass Setup</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Solute Mass (g)</label>
              <input type="number" value={solute} onChange={e => setSolute(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Solvent Mass (g)</label>
              <input type="number" value={solvent} onChange={e => setSolvent(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Mass Percentage</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Mass Percent</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)}%</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter mass settings.</div>
          )}
        </div>
      </div>
    </div>
  );
}