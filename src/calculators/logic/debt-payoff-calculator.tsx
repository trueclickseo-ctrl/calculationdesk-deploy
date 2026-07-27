'use client';
import React, { useState } from 'react';
import { TrendingDown } from 'lucide-react';

export default function DebtPayoffCalculator() {
  const [balance, setBalance] = useState(10000);
  const [rate, setRate] = useState(18);
  const [payment, setPayment] = useState(300);
  const [months, setMonths] = useState<number | null>(null);

  const calculate = () => {
    const monthlyRate = (rate / 100) / 12;
    if (payment <= balance * monthlyRate) {
      alert("Payment is too low to cover interest.");
      return;
    }
    const count = -Math.log(1 - (balance * monthlyRate) / payment) / Math.log(1 + monthlyRate);
    setMonths(Math.ceil(count));
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <TrendingDown className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Debt Payoff Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={balance} onChange={e => setBalance(Number(e.target.value))} placeholder="Debt Balance" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} placeholder="Interest Rate (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={payment} onChange={e => setPayment(Number(e.target.value))} placeholder="Monthly Payment" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Months</button>
        {months !== null && <p className="text-sm font-bold text-primary text-center">Months to payoff: {months}</p>}
      </div>
    </div>
  );
}