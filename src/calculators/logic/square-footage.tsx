'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find standard flat surface area coordinates in square feet.',
  formula: '$$\\text{Area (sq ft)} = \\text{Length} \\times \\text{Width}$$',
  example: 'Room of 12 ft length and 10 ft width is 120 sq ft.',
  faqs: [{ q: 'How to calculate irregular rooms?', a: 'Split the area into standard rectangles, calculate each, and sum the results.' }]
};

export default function SquareFootage() {
  const [len, setLen] = useState<number>(12);
  const [width, setWidth] = useState<number>(10);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setLen(12); setWidth(10); setResult(null); };
  const handleCalculate = () => { setResult(len * width); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Room Details</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Length (feet)</label>
              <input type="number" value={len} onChange={e => setLen(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Width (feet)</label>
              <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve Area</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Flat Surface Area</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Calculated Area</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toLocaleString()} sq ft</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter dimensions.</div>
          )}
        </div>
      </div>
    </div>
  );
}