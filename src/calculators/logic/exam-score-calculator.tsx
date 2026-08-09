'use client';
import React, { useState } from 'react';
import { PenLine } from 'lucide-react';

export default function ExamScoreCalculator() {
  const [current, setCurrent] = useState(75);
  const [weight, setWeight] = useState(40);
  const [target, setTarget] = useState(80);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    if (weight <= 0 || weight > 100) return;
    const w = weight / 100;
    const needed = (target - current * (1 - w)) / w;
    setResult(Math.round(needed * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <PenLine className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Exam Score Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} placeholder="Current Grade (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={weight} onChange={e => setWeight(Number(e.target.value))} placeholder="Exam Weight (% of overall grade)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} placeholder="Target Overall Grade (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Score Needed</button>
        {result !== null && (
          <p className="text-sm font-bold text-primary text-center">
            {result > 100 ? `Not achievable (would need ${result}%)` : result < 0 ? `Already guaranteed (needed ${result}%)` : `Score needed: ${result}%`}
          </p>
        )}
      </div>
    </div>
  );
}
