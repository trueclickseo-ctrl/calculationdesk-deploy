'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find rafter lengths for symmetrical gable roof trusses.',
  formula: '$$\\text{Rafter Length} = \\sqrt{(\\text{Span}/2)^2 + \\text{Rise}^2} + \\text{Overhang}$$',
  example: 'Span of 24 ft with a 4:12 pitch and 12-inch overhang requires ~13.65 ft rafter length.',
  faqs: [{ q: 'What is roof rise?', a: 'The vertical height of the truss apex from the wall plates, determined by pitch.' }]
};

export default function RoofTruss() {
  const [span, setSpan] = useState<number>(24);
  const [pitch, setPitch] = useState<number>(4); // in/12
  const [overhang, setOverhang] = useState<number>(12); // inches
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setSpan(24); setPitch(4); setOverhang(12); setResult(null); };
  const handleCalculate = () => {
    const run = span / 2;
    const rise = run * (pitch / 12);
    const rafter = Math.sqrt(run * run + rise * rise) + (overhang / 12);
    setResult(rafter);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Truss Span</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Building Width (Span, feet)</label>
              <input type="number" value={span} onChange={e => setSpan(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Pitch (in/12)</label>
                <input type="number" value={pitch} onChange={e => setPitch(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Overhang (inches)</label>
                <input type="number" value={overhang} onChange={e => setOverhang(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Truss Rafter Length</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Calculated Rafter Length</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} Feet</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter truss settings.</div>
          )}
        </div>
      </div>
    </div>
  );
}