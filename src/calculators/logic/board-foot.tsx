'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find standard volumetric lumber metrics in board feet.',
  formula: '$$\\text{Board Feet} = \\frac{\\text{Thickness (in)} \\times \\text{Width (in)} \\times \\text{Length (ft)}}{12}$$',
  example: 'A 2x4 board 8 feet long contains 5.33 board feet.',
  faqs: [{ q: 'What is a board foot?', a: 'A standard US volumetric lumber unit equivalent to a 12x12x1 inch board.' }]
};

export default function BoardFoot() {
  const [thick, setThick] = useState<number>(2);
  const [width, setWidth] = useState<number>(4);
  const [len, setLen] = useState<number>(8);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setThick(2); setWidth(4); setLen(8); setResult(null); };
  const handleCalculate = () => { setResult((thick * width * len) / 12); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Lumber Specs</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[10px] font-bold text-foreground/80 mb-2 uppercase text-center">Thick (in)</label>
                <input type="number" value={thick} onChange={e => setThick(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-foreground/80 mb-2 uppercase text-center">Width (in)</label>
                <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-[10px] font-bold text-foreground/80 mb-2 uppercase text-center">Len (ft)</label>
                <input type="number" value={len} onChange={e => setLen(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve FBM</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Lumber Volumetric Size</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Board Feet</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} FBM</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter lumber specs.</div>
          )}
        </div>
      </div>
    </div>
  );
}