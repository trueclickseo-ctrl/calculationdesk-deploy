'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find flight drag indexes for projectiles.',
  formula: '$$BC = \\frac{\\text{Mass (grains)}}{7000 \\times \\text{Caliber (in)}^2 \\times \\text{Form Factor}}$$',
  example: 'A 150 grain bullet of .308 caliber has a sectional density of ~0.226.',
  faqs: [{ q: 'What is a higher BC representative of?', a: 'Higher values slice wind better, dropping less over distances.' }]
};

export default function BallisticCoefficient() {
  const [mass, setMass] = useState<number>(150);
  const [cal, setCal] = useState<number>(0.308);
  const [form, setForm] = useState<number>(1.0);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setMass(150); setCal(0.308); setForm(1.0); setResult(null); };
  const handleCalculate = () => { setResult(mass / (7000 * cal * cal * form)); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Projectile Metrics</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Weight (Grains)</label>
              <input type="number" value={mass} onChange={e => setMass(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Caliber (inches)</label>
                <input type="number" step="0.001" value={cal} onChange={e => setCal(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Form Factor (i)</label>
                <input type="number" step="0.01" value={form} onChange={e => setForm(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Ballistic Index</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Ballistic Coefficient</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(3)}</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter variables.</div>
          )}
        </div>
      </div>
    </div>
  );
}