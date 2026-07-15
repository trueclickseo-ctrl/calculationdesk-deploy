'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find Greatest Common Factors (GCF) and Least Common Multiples (LCM) for integer pairs.',
  formula: 'Euclidean GCD algorithmic iterations.',
  example: 'GCF for 24 and 36 is 12.',
  faqs: [{ q: 'What is GCF?', a: 'The largest positive integer that divides two or more integers without remainders.' }]
};

export default function GcfCalculator() {
  const [numA, setNumA] = useState<number>(24);
  const [numB, setNumB] = useState<number>(36);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setNumA(24); setNumB(36); setResult(null); };
  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;

  const handleCalculate = () => {
    const factor = gcd(numA, numB);
    const lcm = (numA * numB) / factor;
    setResult({ factor, lcm });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Integer Setup</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Number A</label>
              <input type="number" value={numA} onChange={e => setNumA(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Number B</label>
              <input type="number" value={numB} onChange={e => setNumB(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve GCF</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Factors Result</h2>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Greatest Common Factor (GCF)</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">{result.factor}</span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Least Common Multiple (LCM)</span>
                <span className="block text-2xl font-bold text-foreground/80 mt-1">{result.lcm}</span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter two numbers.</div>
          )}
        </div>
      </div>
    </div>
  );
}