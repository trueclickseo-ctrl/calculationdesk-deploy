'use client';
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function MarginOfErrorCalculator() {
  const [confidence, setConfidence] = useState(95);
  const [sampleSize, setSampleSize] = useState(400);
  const [proportion, setProportion] = useState(50);
  const [result, setResult] = useState<number | null>(null);

  const zValues: Record<number, number> = { 90: 1.645, 95: 1.96, 99: 2.576 };

  const calculate = () => {
    const z = zValues[confidence] ?? 1.96;
    const p = proportion / 100;
    if (sampleSize <= 0) return;
    const moe = z * Math.sqrt((p * (1 - p)) / sampleSize) * 100;
    setResult(Math.round(moe * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Margin of Error Calculator</h2>
      </div>
      <div className="space-y-4">
        <select value={confidence} onChange={e => setConfidence(Number(e.target.value))} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm">
          <option value={90}>90% Confidence</option>
          <option value={95}>95% Confidence</option>
          <option value={99}>99% Confidence</option>
        </select>
        <input type="number" value={sampleSize} onChange={e => setSampleSize(Number(e.target.value))} placeholder="Sample Size" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={proportion} onChange={e => setProportion(Number(e.target.value))} placeholder="Sample Proportion (%, use 50 if unknown)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Margin of Error</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Margin of Error: ±{result}%</p>}
      </div>
    </div>
  );
}
