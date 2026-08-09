'use client';
import React, { useState } from 'react';
import { Layers } from 'lucide-react';

function monthlyPayment(principal: number, ratePct: number, years: number) {
  const r = ratePct / 100 / 12;
  const n = years * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

export default function DebtConsolidationCalculator() {
  const [balances, setBalances] = useState('8000,5000,3000');
  const [rates, setRates] = useState('22,18,24');
  const [newRate, setNewRate] = useState(12);
  const [newTermYears, setNewTermYears] = useState(4);
  const [result, setResult] = useState<{ totalDebt: number; oldMonthly: number; newMonthly: number } | null>(null);

  const calculate = () => {
    const bals = balances.split(',').map(Number);
    const rts = rates.split(',').map(Number);
    if (bals.length !== rts.length || bals.length === 0) return;
    const totalDebt = bals.reduce((a, b) => a + b, 0);
    // approximate current combined monthly payment assuming each paid off over the same new term for comparison
    const oldMonthly = bals.reduce((acc, b, i) => acc + monthlyPayment(b, rts[i], newTermYears), 0);
    const newMonthly = monthlyPayment(totalDebt, newRate, newTermYears);
    setResult({
      totalDebt: Math.round(totalDebt * 100) / 100,
      oldMonthly: Math.round(oldMonthly * 100) / 100,
      newMonthly: Math.round(newMonthly * 100) / 100,
    });
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Layers className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Debt Consolidation Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="text" value={balances} onChange={e => setBalances(e.target.value)} placeholder="Debt balances (comma separated, $)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="text" value={rates} onChange={e => setRates(e.target.value)} placeholder="Interest rate per debt (comma separated, %)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={newRate} onChange={e => setNewRate(Number(e.target.value))} placeholder="Consolidation Loan Rate (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={newTermYears} onChange={e => setNewTermYears(Number(e.target.value))} placeholder="Consolidation Loan Term (years)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Compare Payments</button>
        {result !== null && (
          <div className="text-sm font-bold text-primary text-center space-y-1">
            <p>Total Debt: ${result.totalDebt.toLocaleString()}</p>
            <p>Combined Payments (same term, current rates): ${result.oldMonthly}</p>
            <p>Consolidated Monthly Payment: ${result.newMonthly}</p>
          </div>
        )}
      </div>
    </div>
  );
}
