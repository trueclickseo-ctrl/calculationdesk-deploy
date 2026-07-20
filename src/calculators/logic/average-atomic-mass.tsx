'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Compute weighted average atomic mass based on isotope abundance.',
  formula: '$$\\text{Weighted Mass} = \\sum (Mass_i \\times Abundance_i)$$',
  example: 'Carbon-12 (98.9% abundance) and Carbon-13 (1.1% abundance) averages ~12.011 amu.',
  faqs: [{ q: 'What is AMU?', a: 'Atomic Mass Unit, standard unit representing 1/12th the mass of Carbon-12.' }]
};

export default function AverageAtomicMassCalculator() {
  const [m1, setM1] = useState<number>(12);
  const [a1, setA1] = useState<number>(98.9);
  const [m2, setM2] = useState<number>(13.00335);
  const [a2, setA2] = useState<number>(1.1);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setM1(12); setA1(98.9); setM2(13.00335); setA2(1.1); setResult(null); };
  const handleCalculate = () => {
    setResult((m1 * a1 / 100) + (m2 * a2 / 100));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Isotope Abundances</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Iso 1 Mass (amu)</label>
                <input type="number" step="0.0001" value={m1} onChange={e => setM1(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Iso 1 Abundance (%)</label>
                <input type="number" value={a1} onChange={e => setA1(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Iso 2 Mass (amu)</label>
                <input type="number" step="0.0001" value={m2} onChange={e => setM2(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Iso 2 Abundance (%)</label>
                <input type="number" value={a2} onChange={e => setA2(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Weighted Atomic Mass</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Weighted Average</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(5)} amu</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter isotope details.</div>
          )}
        </div>
      </div>
    </div>
  );
}