'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Solve classical linear momentum dynamics.',
  formula: '$$\\text{p} = \\text{mass} \\times \\text{velocity}$$',
  example: 'A 10 kg object moving at 5 m/s has a momentum of 50 kg·m/s.',
  faqs: [{ q: 'What is momentum?', a: 'A measurement of mass in motion; the product of mass and velocity.' }]
};

export default function MomentumCalculator() {
  const [mass, setMass] = useState<number>(10);
  const [vel, setVel] = useState<number>(5);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setMass(10); setVel(5); setResult(null); };
  const handleCalculate = () => { setResult(mass * vel); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Moving Body Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Mass (kg)</label>
              <input type="number" value={mass} onChange={e => setMass(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Velocity (m/s)</label>
              <input type="number" value={vel} onChange={e => setVel(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Linear Momentum</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Momentum (p)</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} kg·m/s</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter variables.</div>
          )}
        </div>
      </div>
    </div>
  );
}