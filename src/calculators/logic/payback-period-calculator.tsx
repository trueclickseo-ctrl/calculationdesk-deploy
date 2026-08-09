'use client';
import React, { useState } from 'react';
import { Clock3 } from 'lucide-react';

export default function PaybackPeriodCalculator() {
  const [investment, setInvestment] = useState(50000);
  const [annualCashFlow, setAnnualCashFlow] = useState(12000);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (annualCashFlow <= 0) return;
    setResult(Math.round((investment / annualCashFlow) * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Clock3 className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Payback Period Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={investment} onChange={e => setInvestment(Number(e.target.value))} placeholder="Initial Investment ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={annualCashFlow} onChange={e => setAnnualCashFlow(Number(e.target.value))} placeholder="Annual Net Cash Flow ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Payback Period</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Payback Period: {result} years</p>}
      </div>
    </div>
  );
}
