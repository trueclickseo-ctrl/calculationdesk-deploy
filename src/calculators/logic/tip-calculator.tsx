'use client';
import React, { useState } from 'react';
import { Receipt } from 'lucide-react';

export default function TipCalculator() {
  const [bill, setBill] = useState(85.5);
  const [tipPct, setTipPct] = useState(18);
  const [people, setPeople] = useState(4);
  const [result, setResult] = useState<{ tip: number; total: number; perPerson: number } | null>(null);

  const calculate = () => {
    if (people <= 0) return;
    const tip = bill * (tipPct / 100);
    const total = bill + tip;
    const perPerson = total / people;
    setResult({
      tip: Math.round(tip * 100) / 100,
      total: Math.round(total * 100) / 100,
      perPerson: Math.round(perPerson * 100) / 100,
    });
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Receipt className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Tip Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={bill} onChange={e => setBill(Number(e.target.value))} placeholder="Bill Amount ($)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={tipPct} onChange={e => setTipPct(Number(e.target.value))} placeholder="Tip Percentage (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={people} onChange={e => setPeople(Number(e.target.value))} placeholder="Split Between (# people)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Tip</button>
        {result !== null && (
          <div className="text-sm font-bold text-primary text-center space-y-1">
            <p>Tip: ${result.tip} — Total: ${result.total}</p>
            <p>Per Person: ${result.perPerson}</p>
          </div>
        )}
      </div>
    </div>
  );
}
