'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find spacing layout configurations for guardrail stairs balusters.',
  formula: 'Standard spacing division equations keeping space under 4 inches.',
  example: 'A 96-inch rail with 1.5-inch balusters and 4-inch max spacing fits 17 balusters at ~3.75 inches spacing.',
  faqs: [{ q: 'What is the standard code limit?', a: 'Under the IRC, handrail balusters must be spaced close enough that a 4-inch sphere cannot pass between them.' }]
};

export default function BalusterSpacing() {
  const [rail, setRail] = useState<number>(96); // inches
  const [width, setWidth] = useState<number>(1.5); // inches
  const [maxSp, setMaxSp] = useState<number>(4);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setRail(96); setWidth(1.5); setMaxSp(4); setResult(null); };
  const handleCalculate = () => {
    const num = Math.ceil((rail - maxSp) / (width + maxSp));
    const spacing = (rail - (num * width)) / (num + 1);
    setResult({ num, spacing });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Rail Parameters</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Rail Length (inches)</label>
              <input type="number" value={rail} onChange={e => setRail(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Baluster Width (in)</label>
                <input type="number" step="0.25" value={width} onChange={e => setWidth(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Max Space (in)</label>
                <input type="number" value={maxSp} onChange={e => setMaxSp(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve Layout</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Spacing Layout</h2>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Balusters Needed</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">{result.num} Balusters</span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Exact Space Between</span>
                <span className="block text-2xl font-bold text-foreground/80 mt-1">{result.spacing.toFixed(3)} inches</span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter rail dimensions.</div>
          )}
        </div>
      </div>
    </div>
  );
}