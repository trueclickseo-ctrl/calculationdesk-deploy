'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Solve apparent electrical power requirements in kilovolt-amperes.',
  formula: '$$\\text{kVA} = \\frac{\\text{Volts} \\times \\text{Amperes}}{1,000}$$',
  example: '120V at 10A single-phase is 1.2 kVA.',
  faqs: [{ q: 'What is the three-phase formula?', a: 'kVA = (Volts * Amps * sqrt(3)) / 1000.' }]
};

export default function KvaCalculator() {
  const [volts, setVolts] = useState<number>(120);
  const [amps, setAmps] = useState<number>(10);
  const [phase, setPhase] = useState<string>('1');
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVolts(120); setAmps(10); setPhase('1'); setResult(null); };
  const handleCalculate = () => {
    const factor = phase === '3' ? Math.sqrt(3) : 1;
    setResult((volts * amps * factor) / 1000);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Electrical Setup</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Voltage (V)</label>
                <input type="number" value={volts} onChange={e => setVolts(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Current (A)</label>
                <input type="number" value={amps} onChange={e => setAmps(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Phase Setup</label>
              <select value={phase} onChange={e => setPhase(e.target.value)} className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer">
                <option value="1">Single Phase (1Ф)</option>
                <option value="3">Three Phase (3Ф)</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Electrical Capacity</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Apparent Power</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(3)} kVA</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter electrical settings.</div>
          )}
        </div>
      </div>
    </div>
  );
}