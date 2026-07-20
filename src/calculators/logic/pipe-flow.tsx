'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Calculate GPM flow through cylindrical pipes.',
  formula: '$$\\text{Flow (GPM)} = \\text{Velocity (ft/s)} \\times 2.448 \\times \\text{Diameter (in)}^2$$',
  example: 'A 2-inch pipe flowing at 5 ft/s delivers ~49 GPM.',
  faqs: [{ q: 'What is GPM?', a: 'Gallons Per Minute, standard flow measure.' }]
};

export default function PipeFlow() {
  const [dia, setDia] = useState<number>(2);
  const [vel, setVel] = useState<number>(5);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setDia(2); setVel(5); setResult(null); };
  const handleCalculate = () => { setResult(vel * 2.448 * dia * dia); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Pipe Setup</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Inside Diameter (inches)</label>
              <input type="number" value={dia} onChange={e => setDia(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Flow Velocity (ft/s)</label>
              <input type="number" value={vel} onChange={e => setVel(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Pipe Flow Rate</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Discharge Flow</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(1)} GPM</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter variables.</div>
          )}
        </div>
      </div>
    </div>
  );
}