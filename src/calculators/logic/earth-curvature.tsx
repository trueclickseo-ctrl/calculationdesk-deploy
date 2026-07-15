'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find distance drops due to Earth curvature.',
  formula: '$$\\text{Drop (in)} = 8 \\times \\text{Distance}^2$$',
  example: 'At 10 miles, the curvature drop is ~66.7 feet.',
  faqs: [{ q: 'Is atmospheric refraction considered?', a: 'This computes geometric curvature. True visibility includes ~8% refraction correction.' }]
};

export default function EarthCurvature() {
  const [dist, setDist] = useState<number>(10); // miles
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setDist(10); setResult(null); };
  const handleCalculate = () => { setResult((8 * dist * dist) / 12); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Observation Range</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Distance (Miles)</label>
              <input type="number" value={dist} onChange={e => setDist(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Curvature Drop</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Geometric Drop</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} Feet</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter distance.</div>
          )}
        </div>
      </div>
    </div>
  );
}