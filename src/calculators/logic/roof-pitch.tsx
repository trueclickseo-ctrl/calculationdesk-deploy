'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find standard slope pitches and rafter angles.',
  formula: '$$\\text{Angle} = \\arctan\\left(\\frac{\\text{Rise (in)}}{\\text{12}}\\right) \\times \\frac{180}{\\pi}$$',
  example: 'A rise of 4 inches over 12 inches run gives a 4:12 pitch (18.4° angle).',
  faqs: [{ q: 'What is standard roof pitch format?', a: 'Rise in inches over a standardized 12-inch horizontal run (e.g. 4/12 or 8/12).' }]
};

export default function RoofPitch() {
  const [rise, setRise] = useState<number>(4);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setRise(4); setResult(null); };
  const handleCalculate = () => { setResult(Math.atan(rise / 12) * 180 / Math.PI); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Slope Profile</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Vertical Rise (inches per 12 in run)</label>
              <input type="number" value={rise} onChange={e => { setRise(Number(e.target.value)); setResult(null); }} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Truss Pitch Angle</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Slope Pitch Angle</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(1)}° Degrees</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter rise.</div>
          )}
        </div>
      </div>
    </div>
  );
}