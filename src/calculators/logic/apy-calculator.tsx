'use client';
import React, { useState } from 'react';
import { Percent } from 'lucide-react';

export default function ApyCalculator() {
  const [rate, setRate] = useState(5);
  const [periods, setPeriods] = useState(12);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const r = rate / 100;
    const apy = (Math.pow(1 + r / periods, periods) - 1) * 100;
    setResult(Math.round(apy * 10000) / 10000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Percent className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">APY Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} placeholder="Nominal Interest Rate (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <select value={periods} onChange={e => setPeriods(Number(e.target.value))} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm">
          <option value={1}>Annually (1x/year)</option>
          <option value={2}>Semi-annually (2x/year)</option>
          <option value={4}>Quarterly (4x/year)</option>
          <option value={12}>Monthly (12x/year)</option>
          <option value={365}>Daily (365x/year)</option>
        </select>
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate APY</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">APY: {result}%</p>}
      </div>
    </div>
  );
}
