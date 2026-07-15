'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Solve gravitational speeds and distances for falling objects.',
  formula: '$$\\text{Height (d)} = 0.5 \\times \\text{g} \\times \\text{t}^2$$',
  example: 'Falling for 3 seconds reaches speed ~29.4 m/s and travels ~44.1 meters.',
  faqs: [{ q: 'What is g?', a: 'Standard Earth acceleration due to gravity, roughly 9.80665 m/s².' }]
};

export default function FreeFall() {
  const [time, setTime] = useState<number>(3);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setTime(3); setResult(null); };
  const handleCalculate = () => {
    const g = 9.80665;
    setResult({
      vel: g * time,
      dist: 0.5 * g * time * time
    });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Drop Duration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Fall Time (seconds)</label>
              <input type="number" value={time} onChange={e => setTime(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Gravity Kinematics</h2>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Terminal Velocity</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">{result.vel.toFixed(2)} m / s</span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Distance Traveled</span>
                <span className="block text-2xl font-bold text-foreground/80 mt-1">{result.dist.toFixed(1)} meters</span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter time.</div>
          )}
        </div>
      </div>
    </div>
  );
}