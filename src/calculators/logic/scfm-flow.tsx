'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Convert actual cubic feet per minute (ACFM) to standard flow (SCFM).',
  formula: '$$SCFM = ACFM \\times \\frac{P_{actual} + 14.7}{14.7} \\times \\frac{520}{T_{actual} + 460}$$',
  example: '100 ACFM at 100 psig and 100°F is ~723 SCFM.',
  faqs: [{ q: 'What is SCFM?', a: 'Standard Cubic Feet per Minute, representing gas flow corrected to standard temperature and pressure.' }]
};

export default function ScfmCalculator() {
  const [acfm, setAcfm] = useState<number>(100);
  const [pres, setPres] = useState<number>(100);
  const [temp, setTemp] = useState<number>(100);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setAcfm(100); setPres(100); setTemp(100); setResult(null); };
  const handleCalculate = () => { setResult(acfm * ((pres + 14.696) / 14.696) * (519.67 / (temp + 459.67))); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Gas Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Flow Rate (ACFM)</label>
              <input type="number" value={acfm} onChange={e => setAcfm(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Pressure (psig)</label>
                <input type="number" value={pres} onChange={e => setPres(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Temp (°F)</label>
                <input type="number" value={temp} onChange={e => setTemp(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Standard Flow Rate</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Standard Flow</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(1)} SCFM</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter actual flow parameters.</div>
          )}
        </div>
      </div>
    </div>
  );
}