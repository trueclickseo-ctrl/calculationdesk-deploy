'use client';
import React, { useState } from 'react';
import { Users } from 'lucide-react';

export default function AgeDifferenceCalculator() {
  const [date1, setDate1] = useState('1990-05-15');
  const [date2, setDate2] = useState('2026-08-09');
  const [result, setResult] = useState<string>('');

  const calculate = () => {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return;
    if (d2 < d1) { const t = d1; d1 = d2; d2 = t; }

    let years = d2.getFullYear() - d1.getFullYear();
    let months = d2.getMonth() - d1.getMonth();
    let days = d2.getDate() - d1.getDate();

    if (days < 0) {
      months -= 1;
      const prevMonthLastDay = new Date(d2.getFullYear(), d2.getMonth(), 0).getDate();
      days += prevMonthLastDay;
    }
    if (months < 0) {
      years -= 1;
      months += 12;
    }
    setResult(`${years} years, ${months} months, ${days} days`);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Users className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Age Difference Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="date" value={date1} onChange={e => setDate1(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="date" value={date2} onChange={e => setDate2(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Age Difference</button>
        {result && <p className="text-sm font-bold text-primary text-center">{result}</p>}
      </div>
    </div>
  );
}
