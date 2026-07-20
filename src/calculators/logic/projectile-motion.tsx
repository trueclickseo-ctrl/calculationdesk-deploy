'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find flight ranges and apex heights for launched projectiles.',
  formula: '$$\\text{Range} = \\frac{\\text{v}^2 \\times \\sin(2\\theta)}{\\text{g}}$$',
  example: 'Launch at 20 m/s at 45° angle travels ~40.8 meters distance.',
  faqs: [{ q: 'Does this count air friction?', a: 'It solves standard vacuum kinematics equations.' }]
};

export default function ProjectileMotion() {
  const [vel, setVel] = useState<number>(20);
  const [ang, setAng] = useState<number>(45);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setVel(20); setAng(45); setResult(null); };
  const handleCalculate = () => {
    const g = 9.80665;
    const rad = ang * Math.PI / 180;
    const range = (vel * vel * Math.sin(2 * rad)) / g;
    const height = (vel * vel * Math.sin(rad) * Math.sin(rad)) / (2 * g);
    setResult({ range, height });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Launch Setup</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Velocity (m/s)</label>
                <input type="number" value={vel} onChange={e => setVel(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Angle (Degrees)</label>
                <input type="number" value={ang} onChange={e => setAng(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Kinematic Trajectory</h2>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Horizontal Distance</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">{result.range.toFixed(2)} meters</span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Apex Peak Height</span>
                <span className="block text-2xl font-bold text-foreground/80 mt-1">{result.height.toFixed(2)} meters</span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter launch metrics.</div>
          )}
        </div>
      </div>
    </div>
  );
}