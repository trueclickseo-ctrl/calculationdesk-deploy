'use client';
import React, { useState } from 'react';
import { HelpCircle } from 'lucide-react';

export default function ChiSquareCalculator() {
  const [obs, setObs] = useState('10,20,30');
  const [exp, setExp] = useState('15,15,30');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const arrObs = obs.split(',').map(Number);
    const arrExp = exp.split(',').map(Number);
    if (arrObs.length !== arrExp.length || arrObs.length === 0) return;
    const chiSquareVal = arrObs.reduce((acc, o, i) => {
      const e = arrExp[i];
      return acc + (e === 0 ? 0 : Math.pow(o - e, 2) / e);
    }, 0);
    setResult(Math.round(chiSquareVal * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <HelpCircle className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Chi-Square Goodness of Fit</h2>
      </div>
      <div className="space-y-4">
        <input type="text" value={obs} onChange={e => setObs(e.target.value)} placeholder="Observed values" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="text" value={exp} onChange={e => setExp(e.target.value)} placeholder="Expected values" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Chi-Square</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Chi-Square Value: {result}</p>}
      </div>
    </div>
  );
}