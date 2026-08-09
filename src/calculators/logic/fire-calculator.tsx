'use client';
import React, { useState } from 'react';
import { Flame } from 'lucide-react';

export default function FireCalculator() {
  const [annualExpenses, setAnnualExpenses] = useState(40000);
  const [withdrawalRate, setWithdrawalRate] = useState(4);
  const [currentSavings, setCurrentSavings] = useState(50000);
  const [annualSavings, setAnnualSavings] = useState(20000);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [result, setResult] = useState<{ fireNumber: number; years: number } | null>(null);

  const calculate = () => {
    if (withdrawalRate <= 0) return;
    const fireNumber = annualExpenses / (withdrawalRate / 100);
    const r = annualReturn / 100;
    let balance = currentSavings;
    let years = 0;
    while (balance < fireNumber && years < 100) {
      balance = balance * (1 + r) + annualSavings;
      years++;
    }
    setResult({ fireNumber: Math.round(fireNumber), years });
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Flame className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">FIRE Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={annualExpenses} onChange={e => setAnnualExpenses(Number(e.target.value))} placeholder="Annual Expenses in Retirement ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={withdrawalRate} onChange={e => setWithdrawalRate(Number(e.target.value))} placeholder="Safe Withdrawal Rate (%, commonly 4)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={currentSavings} onChange={e => setCurrentSavings(Number(e.target.value))} placeholder="Current Investments ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={annualSavings} onChange={e => setAnnualSavings(Number(e.target.value))} placeholder="Annual Savings/Investing ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))} placeholder="Expected Annual Return (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate FIRE Number</button>
        {result !== null && (
          <div className="text-sm font-bold text-primary text-center space-y-1">
            <p>FIRE Number: ${result.fireNumber.toLocaleString()}</p>
            <p>Years to Reach It: {result.years}</p>
          </div>
        )}
      </div>
    </div>
  );
}
