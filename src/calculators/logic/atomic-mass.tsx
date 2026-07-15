'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Sum isotopic weights to find chemical formula weights.',
  formula: '$$\\text{Molar Mass} = \\sum (Count_i \\times Mass_i)$$',
  example: 'Water (H2O) has 2 Hydrogen (1.008g) and 1 Oxygen (16.00g) summing to ~18.016 g/mol.',
  faqs: [{ q: 'What is molar mass?', a: 'The mass of one mole of a chemical substance, measured in grams per mole (g/mol).' }]
};

export default function AtomicMassCalculator() {
  const [hCount, setHCount] = useState<number>(2);
  const [oCount, setOCount] = useState<number>(1);
  const [cCount, setCCount] = useState<number>(0);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setHCount(2); setOCount(1); setCCount(0); setResult(null); };
  const handleCalculate = () => {
    // H = 1.008, O = 15.999, C = 12.011
    setResult((hCount * 1.008) + (oCount * 15.999) + (cCount * 12.011));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Formula Elements</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Hydrogen (H) Count</label>
              <input type="number" value={hCount} onChange={e => setHCount(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Oxygen (O) Count</label>
              <input type="number" value={oCount} onChange={e => setOCount(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Carbon (C) Count</label>
              <input type="number" value={cCount} onChange={e => setCCount(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve Molar Mass</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Molar Weight</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Estimated Weight</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(3)} g / mol</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter element counts.</div>
          )}
        </div>
      </div>
    </div>
  );
}