'use client';
import React, { useState } from 'react';
import { Home } from 'lucide-react';

function monthlyPayment(principal: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export default function MortgageRefinanceCalculator() {
  const [balance, setBalance] = useState(300000);
  const [oldRate, setOldRate] = useState(6.5);
  const [newRate, setNewRate] = useState(5.5);
  const [years, setYears] = useState(25);
  const [closingCosts, setClosingCosts] = useState(4000);
  const [result, setResult] = useState<{ oldPmt: number; newPmt: number; savings: number; breakeven: number } | null>(null);

  const calculate = () => {
    const oldPmt = monthlyPayment(balance, oldRate, years);
    const newPmt = monthlyPayment(balance, newRate, years);
    const savings = oldPmt - newPmt;
    const breakeven = savings > 0 ? closingCosts / savings : Infinity;
    setResult({
      oldPmt: Math.round(oldPmt * 100) / 100,
      newPmt: Math.round(newPmt * 100) / 100,
      savings: Math.round(savings * 100) / 100,
      breakeven: Math.round(breakeven * 10) / 10,
    });
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Home className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Mortgage Refinance Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={balance} onChange={e => setBalance(Number(e.target.value))} placeholder="Remaining Loan Balance" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={oldRate} onChange={e => setOldRate(Number(e.target.value))} placeholder="Current Interest Rate (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={newRate} onChange={e => setNewRate(Number(e.target.value))} placeholder="New Interest Rate (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} placeholder="Remaining/New Term (years)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={closingCosts} onChange={e => setClosingCosts(Number(e.target.value))} placeholder="Refinance Closing Costs ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Refinance Savings</button>
        {result !== null && (
          <div className="text-sm font-bold text-primary text-center space-y-1">
            <p>Old Payment: ${result.oldPmt} → New Payment: ${result.newPmt}</p>
            <p>Monthly Savings: ${result.savings}</p>
            <p>Breakeven: {isFinite(result.breakeven) ? `${result.breakeven} months` : 'N/A (no savings)'}</p>
          </div>
        )}
      </div>
    </div>
  );
}
