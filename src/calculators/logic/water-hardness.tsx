'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Determine water hardness classification from calcium and magnesium mineral content.',
  formula: '$$\\text{Hardness (mg/L CaCO}_3\\text{)} = 2.497 \\times [Ca^{2+}] + 4.118 \\times [Mg^{2+}]$$',
  example: 'Ca = 50 mg/L, Mg = 10 mg/L yields ~166 mg/L CaCO3 (Hard).',
  faqs: [{ q: 'What is considered hard water?', a: '0-60 is soft, 61-120 is moderately hard, 121-180 is hard, and >180 mg/L CaCO3 is very hard.' }]
};

export default function WaterHardnessCalculator() {
  const [ca, setCa] = useState<number>(50);
  const [mg, setMg] = useState<number>(10);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setCa(50); setMg(10); setResult(null); };
  const handleCalculate = () => {
    const hardness = 2.497 * ca + 4.118 * mg;
    let label = 'Soft';
    if (hardness > 180) label = 'Very Hard';
    else if (hardness > 120) label = 'Hard';
    else if (hardness > 60) label = 'Moderately Hard';
    
    setResult({ hardness, label });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Mineral Concentration</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Calcium (Ca2+) mg/L</label>
              <input type="number" value={ca} onChange={e => setCa(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Magnesium (Mg2+) mg/L</label>
              <input type="number" value={mg} onChange={e => setMg(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Hardness Rating</h2>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Total CaCO3 Hardness</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">{result.hardness.toFixed(1)} mg/L</span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Classification</span>
                <span className="block text-2xl font-bold text-foreground/80 mt-1">{result.label}</span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter mineral concentrations.</div>
          )}
        </div>
      </div>
    </div>
  );
}