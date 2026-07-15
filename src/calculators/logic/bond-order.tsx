'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Determine covalent bond order from bonding and antibonding electrons.',
  formula: '$$\\text{Bond Order} = 0.5 \\times (Bonding - Antibonding)$$',
  example: '8 bonding and 2 antibonding electrons yields a bond order of 3 (Triple Bond).',
  faqs: [{ q: 'What does a bond order of 0 mean?', a: 'A bond order of 0 indicates that the molecule is unstable and cannot exist (e.g. Helium dimer).' }]
};

export default function BondOrderCalculator() {
  const [bond, setBond] = useState<number>(8);
  const [anti, setAnti] = useState<number>(2);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setBond(8); setAnti(2); setResult(null); };
  const handleCalculate = () => { setResult(0.5 * (bond - anti)); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Molecular Electrons</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Bonding Electrons</label>
              <input type="number" value={bond} onChange={e => setBond(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Antibonding Electrons</label>
              <input type="number" value={anti} onChange={e => setAnti(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Covalent Bond Order</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Bond Order</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(1)}</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter molecular electrons.</div>
          )}
        </div>
      </div>
    </div>
  );
}