'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Convert gross annual salaries to equivalent hourly pay rates.',
  formula: '$$\\text{Hourly Rate} = \\frac{\\text{Gross Salary}}{\\text{Hours per Week} \\times 52}$$',
  example: 'Annual salary of $52,000 at 40 hours per week is exactly $25.00/hour.',
  faqs: [{ q: 'Does this factor in taxes?', a: 'This calculates gross hourly pay before income tax deductions.' }]
};

export default function MoneyPerHour() {
  const [sal, setSal] = useState<number>(52000);
  const [hours, setHours] = useState<number>(40);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setSal(52000); setHours(40); setResult(null); };
  const handleCalculate = () => { setResult(sal / (hours * 52)); };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Salary Specifications</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Annual Gross Salary ($)</label>
              <input type="number" value={sal} onChange={e => setSal(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Work Hours per Week</label>
              <input type="number" value={hours} onChange={e => setHours(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Hourly Rate</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Gross Hourly Pay</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">\$${result.toFixed(2)} / hr</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter salary details.</div>
          )}
        </div>
      </div>
    </div>
  );
}