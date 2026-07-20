'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Solve total energy storage capabilities in Watt-hours.',
  formula: '$$\\text{Watt-hours} = \\text{Amp-hours} \\times \\text{Volts}$$',
  example: 'A 100 Ah battery at 12V stores 1200 Wh.',
  faqs: [{ q: 'Why is Wh important?', a: 'It measures the absolute energy capacity of batteries regardless of voltage differences.' }]
};

export default function WattHour() {
  const [ah, setAh] = useState<number>(100);
  const [volts, setVolts] = useState<number>(12);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setAh(100); setVolts(12); setResult(null); };
  const handleCalculate = () => { setResult(ah * volts); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Battery Ratings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Capacity (Amp-hours, Ah)</label>
              <input type="number" value={ah} onChange={e => setAh(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Voltage (Volts)</label>
              <input type="number" value={volts} onChange={e => setVolts(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Stored Energy</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Energy Capacity</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toLocaleString()} Wh</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter battery specifications.</div>
          )}
        </div>
      </div>
    </div>
  );
}