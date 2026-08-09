'use client';
import React, { useState } from 'react';
import { Briefcase } from 'lucide-react';

export default function BusinessDaysCalculator() {
  const [date1, setDate1] = useState('2026-01-01');
  const [date2, setDate2] = useState('2026-01-31');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    let d1 = new Date(date1);
    let d2 = new Date(date2);
    if (isNaN(d1.getTime()) || isNaN(d2.getTime())) return;
    if (d2 < d1) { const t = d1; d1 = d2; d2 = t; }

    let count = 0;
    const cur = new Date(d1);
    while (cur <= d2) {
      const day = cur.getDay();
      if (day !== 0 && day !== 6) count++;
      cur.setDate(cur.getDate() + 1);
    }
    setResult(count);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Briefcase className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Business Days Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="date" value={date1} onChange={e => setDate1(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="date" value={date2} onChange={e => setDate2(e.target.value)} className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Business Days</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Business Days (Mon-Fri): {result}</p>}
      </div>
    </div>
  );
}
