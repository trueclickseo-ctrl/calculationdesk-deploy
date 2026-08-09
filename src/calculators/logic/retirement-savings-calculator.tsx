'use client';
import React, { useState } from 'react';
import { Umbrella } from 'lucide-react';

export default function RetirementSavingsCalculator() {
  const [current, setCurrent] = useState(50000);
  const [monthlyContrib, setMonthlyContrib] = useState(800);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [years, setYears] = useState(30);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const r = annualReturn / 100 / 12;
    const n = years * 12;
    const fv1 = current * Math.pow(1 + r, n);
    const fv2 = r > 0 ? monthlyContrib * ((Math.pow(1 + r, n) - 1) / r) : monthlyContrib * n;
    setResult(Math.round((fv1 + fv2) * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Umbrella className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Retirement Savings Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} placeholder="Current Savings ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={monthlyContrib} onChange={e => setMonthlyContrib(Number(e.target.value))} placeholder="Monthly Contribution ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))} placeholder="Expected Annual Return (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} placeholder="Years Until Retirement" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Projected Savings</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Projected Savings: ${result.toLocaleString()}</p>}
      </div>
    </div>
  );
}
