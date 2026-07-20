'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find relative centrifugal force values for separation speeds.',
  formula: '$$\\text{RCF (g)} = 1.118 \\times 10^{-5} \\times \\text{Radius (mm)} \\times \\text{RPM}^2$$',
  example: 'A centrifuge running at 3000 RPM with 100mm radius generates ~1006 g.',
  faqs: [{ q: 'Why choose RCF over RPM?', a: 'RCF accounts for rotor sizing, guaranteeing consistent separation physics across different centrifuges.' }]
};

export default function CentrifugeForce() {
  const [rpm, setRpm] = useState<number>(3000);
  const [radius, setRadius] = useState<number>(100);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setRpm(3000); setRadius(100); setResult(null); };
  const handleCalculate = () => { setResult(1.118e-5 * radius * rpm * rpm); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Rotor Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Rotor Radius (mm)</label>
              <input type="number" value={radius} onChange={e => setRadius(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Rotational Speed (RPM)</label>
              <input type="number" value={rpm} onChange={e => setRpm(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Centrifugal Force</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Relative Centrifugal Force</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{Math.round(result).toLocaleString()} × g</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter variables.</div>
          )}
        </div>
      </div>
    </div>
  );
}