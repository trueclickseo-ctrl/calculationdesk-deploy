'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Solve buffer solution pH using acid-dissociation constants.',
  formula: '$$\\text{pH} = pKa + \\log_{10}\\left(\\frac{[A^{-}]}{[HA]}\\right)$$',
  example: 'pKa = 4.76, [A-] = 0.1 M, [HA] = 0.1 M yields pH = 4.76.',
  faqs: [{ q: 'What is a buffer solution?', a: 'A solution that resists changes in pH when small quantities of an acid or a base are added.' }]
};

export default function HendersonHasselbalchCalculator() {
  const [pka, setPka] = useState<number>(4.76);
  const [base, setBase] = useState<number>(0.1);
  const [acid, setAcid] = useState<number>(0.1);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setPka(4.76); setBase(0.1); setAcid(0.1); setResult(null); };
  const handleCalculate = () => { setResult(pka + Math.log10(base / acid)); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Buffer Properties</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">pKa</label>
              <input type="number" step="0.01" value={pka} onChange={e => setPka(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Base [A-] (M)</label>
                <input type="number" step="0.01" value={base} onChange={e => setBase(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Acid [HA] (M)</label>
                <input type="number" step="0.01" value={acid} onChange={e => setAcid(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Buffer pH</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Resulting pH</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(3)}</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter buffer details.</div>
          )}
        </div>
      </div>
    </div>
  );
}