'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Estimate archery arrow velocities.',
  formula: 'IBO Speed adjusted for weights and draw lengths.',
  example: 'Bow rated 300 fps shooting a 400 grain arrow at 70 lbs has speed ~290 fps.',
  faqs: [{ q: 'What is IBO speed?', a: 'Standard rating measured using 70 lbs draw weight, 30 inch draw length, and 350 grain arrow.' }]
};

export default function ArrowSpeed() {
  const [ibo, setIbo] = useState<number>(300);
  const [weight, setWeight] = useState<number>(70);
  const [arrow, setArrow] = useState<number>(400);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setIbo(300); setWeight(70); setArrow(400); setResult(null); };
  const handleCalculate = () => {
    // simplified offset adjustment
    const grainDiff = arrow - (weight * 5);
    const penalty = grainDiff > 0 ? grainDiff / 3 : 0;
    setResult(ibo - penalty);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Archery Setup</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Bow IBO Rating (fps)</label>
              <input type="number" value={ibo} onChange={e => setIbo(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Draw Weight (lbs)</label>
                <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Arrow Weight (gr)</label>
                <input type="number" value={arrow} onChange={e => setArrow(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Estimated Flight Speed</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Arrow Velocity</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{Math.round(result)} FPS</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter bow settings.</div>
          )}
        </div>
      </div>
    </div>
  );
}