'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Solve rate constants as dependencies of temperature and activation energy.',
  formula: '$$k = A \\times e^{-\\frac{E_a}{R \\times T}}$$',
  example: 'A = 1e11, Ea = 50,000 J/mol, T = 298K yields k ~ 177.2 s^-1.',
  faqs: [{ q: 'What is R in the equation?', a: 'R is the universal gas constant, equal to 8.3144 J / (mol*K).' }]
};

export default function ArrheniusCalculator() {
  const [a, setA] = useState<number>(100000000000);
  const [ea, setEa] = useState<number>(50000); // J/mol
  const [t, setT] = useState<number>(298); // Kelvin
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setA(100000000000); setEa(50000); setT(298); setResult(null); };
  const handleCalculate = () => {
    const k = a * Math.exp(-ea / (8.3144 * t));
    setResult(k);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Equation Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Pre-exponential factor (A)</label>
              <input type="number" value={a} onChange={e => setA(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Activation Ea (J/mol)</label>
                <input type="number" value={ea} onChange={e => setEa(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Temperature (K)</label>
                <input type="number" value={t} onChange={e => setT(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Rate Constant</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Reaction rate (k)</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toExponential(4)} s^-1</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter variables.</div>
          )}
        </div>
      </div>
    </div>
  );
}