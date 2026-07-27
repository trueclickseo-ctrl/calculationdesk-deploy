'use client';
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function ZScoreCalculator() {
  const [val, setVal] = useState(85);
  const [mean, setMean] = useState(70);
  const [std, setStd] = useState(10);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (std === 0) return;
    setResult(Math.round(((val - mean) / std) * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Z-Score Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={val} onChange={e => setVal(Number(e.target.value))} placeholder="Observed Value" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={mean} onChange={e => setMean(Number(e.target.value))} placeholder="Mean" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={std} onChange={e => setStd(Number(e.target.value))} placeholder="Standard Deviation" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Z-Score</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Z-Score: {result}</p>}
      </div>
    </div>
  );
}