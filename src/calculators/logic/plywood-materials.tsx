'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find standard 4x8 sheet plywood counts to cover surface areas.',
  formula: '$$\\text{Sheets} = \\frac{\\text{Area (sq ft)}}{32}$$ (adjusted for waste factors).',
  example: 'Subfloor covering 320 sq ft with 10% waste buffer needs exactly 11 sheets.',
  faqs: [{ q: 'What is standard plywood sheet size?', a: 'Standard builder sheets are 4 by 8 feet, covering exactly 32 square feet.' }]
};

export default function PlywoodSheets() {
  const [area, setArea] = useState<number>(320);
  const [waste, setWaste] = useState<number>(10);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setArea(320); setWaste(10); setResult(null); };
  const handleCalculate = () => {
    const raw = area / 32;
    setResult(Math.ceil(raw * (1 + waste / 100)));
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Subfloor Specs</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Total Surface Area (sq ft)</label>
              <input type="number" value={area} onChange={e => setArea(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Waste Buffer (%)</label>
              <input type="number" value={waste} onChange={e => setWaste(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Sheets Required</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Standard 4x8 Sheets</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result} Sheets</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter coverage area.</div>
          )}
        </div>
      </div>
    </div>
  );
}