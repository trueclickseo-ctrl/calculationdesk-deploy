'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find crushed limestone tons and yards needed for driveway subbases.',
  formula: '$$\\text{Cubic Yards} = \\frac{\\text{L (ft)} \\times \\text{W (ft)} \\times \\text{Depth (in) / 12}}{27}$$\\n$$\\text{Tons} = \\text{Cubic Yards} \\times 1.4$$',
  example: 'Driveway 50 ft long, 10 ft wide, 4 inches deep needs ~6.2 yards or 8.6 tons.',
  faqs: [{ q: 'What is limestone density?', a: 'Crushed limestone typically packs at ~1.4 tons per cubic yard.' }]
};

export default function LimestoneCalc() {
  const [len, setLen] = useState<number>(50);
  const [width, setWidth] = useState<number>(10);
  const [depth, setDepth] = useState<number>(4);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setLen(50); setWidth(10); setDepth(4); setResult(null); };
  const handleCalculate = () => {
    const yards = (len * width * (depth / 12)) / 27;
    setResult({ yards, tons: yards * 1.4 });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Slab Coverage</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Length (feet)</label>
              <input type="number" value={len} onChange={e => setLen(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Width (feet)</label>
                <input type="number" value={width} onChange={e => setWidth(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Depth (inches)</label>
                <input type="number" value={depth} onChange={e => setDepth(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Limestone Required</h2>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Weight Required</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">{result.tons.toFixed(1)} Tons</span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Volume Required</span>
                <span className="block text-2xl font-bold text-foreground/80 mt-1">{result.yards.toFixed(2)} Cubic Yards</span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter coverage area.</div>
          )}
        </div>
      </div>
    </div>
  );
}