'use client';
import React, { useState } from 'react';
import { TrendingUp } from 'lucide-react';

export default function StepUpSavingsCalculator() {
  const [initialMonthly, setInitialMonthly] = useState(500);
  const [stepUpPct, setStepUpPct] = useState(10);
  const [annualReturn, setAnnualReturn] = useState(8);
  const [years, setYears] = useState(20);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const r = annualReturn / 100 / 12;
    let balance = 0;
    let monthly = initialMonthly;
    for (let y = 0; y < years; y++) {
      for (let m = 0; m < 12; m++) {
        balance = balance * (1 + r) + monthly;
      }
      monthly *= (1 + stepUpPct / 100);
    }
    setResult(Math.round(balance * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <TrendingUp className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Step-Up Savings Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={initialMonthly} onChange={e => setInitialMonthly(Number(e.target.value))} placeholder="Starting Monthly Contribution ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={stepUpPct} onChange={e => setStepUpPct(Number(e.target.value))} placeholder="Annual Step-Up (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))} placeholder="Expected Annual Return (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} placeholder="Years" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Future Value</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Future Value: ${result.toLocaleString()}</p>}
      </div>
    </div>
  );
}
