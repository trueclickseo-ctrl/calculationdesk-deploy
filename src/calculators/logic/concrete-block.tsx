'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find standard concrete blocks needed to lay walls.',
  formula: '$$\\text{Blocks} = \\frac{\\text{Wall Area (sq ft)}}{0.888}$$ (representing standard 8x16 inch face area plus mortar).',
  example: 'A wall 10 ft long and 8 ft high (80 sq ft) needs ~90 blocks.',
  faqs: [{ q: 'What is standard block face area?', a: 'Standard 8x8x16 block has a face of 8x16 inches, which matches 0.888 square feet.' }]
};

export default function ConcreteBlock() {
  const [len, setLen] = useState<number>(10);
  const [height, setHeight] = useState<number>(8);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setLen(10); setHeight(8); setResult(null); };
  const handleCalculate = () => { setResult(Math.ceil((len * height) / 0.8888)); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Wall Dimensions</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Wall Length (feet)</label>
              <input type="number" value={len} onChange={e => setLen(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Wall Height (feet)</label>
              <input type="number" value={height} onChange={e => setHeight(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Blocks Required</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Standard 8x8x16 Blocks</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result} Blocks</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter wall dimensions.</div>
          )}
        </div>
      </div>
    </div>
  );
}