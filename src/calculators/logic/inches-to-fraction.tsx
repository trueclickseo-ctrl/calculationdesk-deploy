'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Inches to Fraction Converter translates decimal inches into nearest fractional measurements.',
  formula: '$$\\text{Fractional Part} = \\text{round}(\\text{Decimal} \\times \\text{Precision})$$',
  example: '0.625 inches to fraction is 5/8.',
  faqs: [
    { q: 'What precision is supported?', a: 'It supports 1/8, 1/16, 1/32, and 1/64 inches.' }
  ]
};

export default function InchesFractionCalculator() {
  const [val, setVal] = useState<number>(0.625);
  const [prec, setPrec] = useState<number>(16);
  const [result, setResult] = useState<string>('5/8');

  const handleReset = () => { setVal(0.625); setPrec(16); setResult('5/8'); };
  const gcd = (a: number, b: number): number => b ? gcd(b, a % b) : a;

  const handleCalculate = () => {
    const whole = Math.floor(val);
    const dec = val - whole;
    const numerator = Math.round(dec * prec);
    if (numerator === 0) {
      setResult(whole.toString());
      return;
    }
    if (numerator === prec) {
      setResult((whole + 1).toString());
      return;
    }
    const divisor = gcd(numerator, prec);
    const n = numerator / divisor;
    const d = prec / divisor;
    setResult(whole > 0 ? `${whole} ${n}/${d}` : `${n}/${d}`);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Inches</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Decimal Inches</label>
              <input type="number" step="0.001" value={val} onChange={e => setVal(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2 font-medium">Precision</label>
              <select value={prec} onChange={e => setPrec(Number(e.target.value))} className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer">
                <option value="8">Nearest 1/8 inch</option>
                <option value="16">Nearest 1/16 inch</option>
                <option value="32">Nearest 1/32 inch</option>
                <option value="64">Nearest 1/64 inch</option>
              </select>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Fractional Value</h2>
          <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
            <span className="block text-[10px] font-bold text-foreground/50 uppercase font-mono">Resulting Measurement</span>
            <span className="block text-4xl font-extrabold text-primary mt-2">{result} inches</span>
          </div>
        </div>
      </div>
    </div>
  );
}