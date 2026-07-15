'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Determine efficiency ratios in electrical systems.',
  formula: '$$\\text{Power Factor} = \\frac{\\text{Real Power (kW)}}{\\text{Apparent Power (kVA)}}$$',
  example: '8 kW real power and 10 kVA apparent power has a PF of 0.8.',
  faqs: [{ q: 'What is an ideal power factor?', a: 'A PF of 1.0 (unity) is ideal, indicating all electrical energy is converted to productive work.' }]
};

export default function PowerFactor() {
  const [kw, setKw] = useState<number>(8);
  const [kva, setKva] = useState<number>(10);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setKw(8); setKva(10); setResult(null); };
  const handleCalculate = () => { setResult(kw / kva); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Grid Loading</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Real Power (kW)</label>
              <input type="number" value={kw} onChange={e => setKw(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Apparent Power (kVA)</label>
              <input type="number" value={kva} onChange={e => setKva(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Electrical Power Factor</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Power Factor (PF)</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(3)}</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter grid metrics.</div>
          )}
        </div>
      </div>
    </div>
  );
}