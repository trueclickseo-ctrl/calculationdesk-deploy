'use client';
import React, { useState } from 'react';
import { Percent } from 'lucide-react';

export default function AutoLoanCalculator() {
  const [price, setPrice] = useState(25000);
  const [down, setDown] = useState(5000);
  const [rate, setRate] = useState(5.5);
  const [term, setTerm] = useState(60);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const principal = price - down;
    const monthlyRate = (rate / 100) / 12;
    const emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, term)) / (Math.pow(1 + monthlyRate, term) - 1);
    setResult(Math.round(emi * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Percent className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Auto Loan Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Vehicle Price" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={down} onChange={e => setDown(Number(e.target.value))} placeholder="Down Payment" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={rate} onChange={e => setRate(Number(e.target.value))} placeholder="Annual Interest Rate (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Payment</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Monthly Repayment: ${result}</p>}
      </div>
    </div>
  );
}