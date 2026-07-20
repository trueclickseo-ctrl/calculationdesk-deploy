'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Estimate rafter lengths and cuts for double-pitched gambrel roofs.',
  formula: 'Trigonometric right-triangle rafter calculation.',
  example: 'Span of 24 ft with lower pitch 12:12 and upper pitch 4:12.',
  faqs: [{ q: 'What is a gambrel roof?', a: 'A double-pitched roof design commonly used on barns to maximize attic storage volume.' }]
};

export default function GambrelRoof() {
  const [span, setSpan] = useState<number>(24);
  const [pitch1, setPitch1] = useState<number>(12); // Lower
  const [pitch2, setPitch2] = useState<number>(4); // Upper
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setSpan(24); setPitch1(12); setPitch2(4); setResult(null); };
  const handleCalculate = () => {
    // Estimate rafter lengths assuming standard symmetrical splits
    const runLower = span / 4;
    const riseLower = runLower * (pitch1 / 12);
    const rafterLower = Math.sqrt(runLower * runLower + riseLower * riseLower);

    const runUpper = span / 4;
    const riseUpper = runUpper * (pitch2 / 12);
    const rafterUpper = Math.sqrt(runUpper * runUpper + riseUpper * riseUpper);

    setResult({ rafterLower, rafterUpper });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Roof Span</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Total Roof Span (feet)</label>
              <input type="number" value={span} onChange={e => setSpan(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Lower Pitch (in/12)</label>
                <input type="number" value={pitch1} onChange={e => setPitch1(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Upper Pitch (in/12)</label>
                <input type="number" value={pitch2} onChange={e => setPitch2(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Framing Breakdown</h2>
          {result ? (
            <div className="space-y-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Lower Rafter Length</span>
                <span className="block text-2xl font-extrabold text-primary mt-1">{result.rafterLower.toFixed(2)} feet</span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border text-center">
                <span className="block text-xs font-bold text-foreground/50 uppercase">Upper Rafter Length</span>
                <span className="block text-2xl font-bold text-foreground/80 mt-1">{result.rafterUpper.toFixed(2)} feet</span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter roof dimensions.</div>
          )}
        </div>
      </div>
    </div>
  );
}