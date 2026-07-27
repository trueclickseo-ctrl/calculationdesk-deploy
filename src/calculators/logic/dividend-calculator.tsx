'use client';
import React, { useState } from 'react';
import { DollarSign } from 'lucide-react';

export default function DividendCalculator() {
  const [shares, setShares] = useState(100);
  const [price, setPrice] = useState(50);
  const [yieldPct, setYieldPct] = useState(4);
  const [payout, setPayout] = useState<number | null>(null);

  const calculate = () => {
    const totalValue = shares * price;
    const annualDividend = totalValue * (yieldPct / 100);
    setPayout(annualDividend);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <DollarSign className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Dividend Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={shares} onChange={e => setShares(Number(e.target.value))} placeholder="Number of Shares" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} placeholder="Share Price" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={yieldPct} onChange={e => setYieldPct(Number(e.target.value))} placeholder="Dividend Yield (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Payout</button>
        {payout !== null && <p className="text-sm font-bold text-primary text-center">Annual Payout: ${payout}</p>}
      </div>
    </div>
  );
}