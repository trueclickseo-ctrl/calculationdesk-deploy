'use client';
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function DateDifferenceCalculator() {
  const [date1, setDate1] = useState('2026-01-01');
  const [date2, setDate2] = useState('2026-08-09');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return;
    const diffMs = Math.abs(d2.getTime() - d1.getTime());
    const days = Math.round(diffMs / (1000 * 60 * 60 * 24));
    const years = Math.floor(days / 365.25);
    const months = Math.floor((days % 365.25) / 30.44);
    const weeks = Math.floor(days / 7);
    setResult(`${days} days total (${years} years, ${months} months / ${weeks} weeks)`);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Date Difference Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="date" value={date1} onChange={e => setDate1(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="date" value={date2} onChange={e => setDate2(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Difference</button>
        {result && <p className="text-sm font-bold text-primary text-center">{result}</p>}
      </div>
    </div>
  );
}
