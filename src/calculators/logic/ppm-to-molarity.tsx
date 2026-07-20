'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Convert PPM (mg/L) concentrations to Molarity (mol/L).',
  formula: '$$\\text{Molarity} = \\frac{\\text{PPM}}{\\text{Molar Mass} \\times 1,000}$$',
  example: '400 PPM of NaOH (molar mass 40 g/mol) is 0.01 M.',
  faqs: [{ q: 'What is PPM?', a: 'Parts Per Million, equivalent to milligrams of solute per Liter of solution (mg/L).' }]
};

export default function PpmMolarityCalculator() {
  const [ppm, setPpm] = useState<number>(400);
  const [mass, setMass] = useState<number>(40);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setPpm(400); setMass(40); setResult(null); };
  const handleCalculate = () => { setResult(ppm / (mass * 1000)); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Chemical Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Concentration (PPM)</label>
              <input type="number" value={ppm} onChange={e => setPpm(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Solute Molar Mass (g/mol)</label>
              <input type="number" value={mass} onChange={e => setMass(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Chemical Molarity</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Molarity</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(6)} mol / L</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter PPM and molar mass.</div>
          )}
        </div>
      </div>
    </div>
  );
}