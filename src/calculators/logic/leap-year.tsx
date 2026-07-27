'use client';
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';

export default function LeapYearCalculator() {
  const [year, setYear] = useState<number>(2026);
  const [result, setResult] = useState<string>('');

  const check = () => {
    const isLeap = (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
    setResult(isLeap ? year + ' is a Leap Year (366 days).' : year + ' is a common year (365 days).');
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <Calendar className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Leap Year Checker</h2>
      </div>
      <div className="space-y-4">
        <input
          type="number"
          value={year}
          onChange={e => setYear(Number(e.target.value))}
          className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none"
        />
        <button onClick={check} className="w-full py-3 bg-primary text-white font-bold rounded-xl">
          Check Year
        </button>
        {result && <p className="text-sm font-bold text-primary text-center mt-4">{result}</p>}
      </div>
    </div>
  );
}