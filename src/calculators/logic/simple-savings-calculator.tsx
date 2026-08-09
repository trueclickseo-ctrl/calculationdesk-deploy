'use client';
import React, { useState } from 'react';
import { Wallet } from 'lucide-react';

export default function SimpleSavingsCalculator() {
  const [principal, setPrincipal] = useState(10000);
  const [rate, setRate] = useState(4);
  const [years, setYears] = useState(10);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const r = rate / 100;
    const n = 12;
    const fv = principal * Math.pow(1 + r / n, n * years);
    setResult(Math.round(fv * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Wallet className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Simple Savings Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={principal} onChange={e => setPrincipal(Number(e.target.value))} placeholder="Initial Deposit ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} placeholder="Annual Interest Rate (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} placeholder="Years" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Future Value</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Future Value: ${result.toLocaleString()}</p>}
      </div>
    </div>
  );
}
