'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Convert mechanical horsepower ratings to electrical amperes.',
  formula: '$$\\text{Amps} = \\frac{\\text{HP} \\times 746}{\\text{Volts} \\times \\text{Efficiency}}$$',
  example: '1 HP motor at 120V with 80% efficiency requires ~7.8 Amps.',
  faqs: [{ q: 'How many watts is 1 HP?', a: 'Exactly 746 electrical watts.' }]
};

export default function HpToAmps() {
  const [hp, setHp] = useState<number>(1);
  const [volts, setVolts] = useState<number>(120);
  const [eff, setEff] = useState<number>(80);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setHp(1); setVolts(120); setEff(80); setResult(null); };
  const handleCalculate = () => { setResult((hp * 746) / (volts * (eff / 100))); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Motor Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Horsepower (HP)</label>
              <input type="number" value={hp} onChange={e => setHp(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Voltage (V)</label>
                <input type="number" value={volts} onChange={e => setVolts(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Efficiency (%)</label>
                <input type="number" value={eff} onChange={e => setEff(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Electrical Current Load</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Current Demand</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} Amps</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter motor parameters.</div>
          )}
        </div>
      </div>
    </div>
  );
}