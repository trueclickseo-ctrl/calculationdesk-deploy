'use client';
import React, { useState } from 'react';
import { ClipboardCheck } from 'lucide-react';

export default function FinalGradeCalculator() {
  const [scores, setScores] = useState('90,85');
  const [weights, setWeights] = useState('20,30');
  const [finalWeight, setFinalWeight] = useState(50);
  const [target, setTarget] = useState(88);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const s = scores.split(',').map(Number);
    const w = weights.split(',').map(Number);
    if (s.length !== w.length || s.length === 0 || finalWeight <= 0) return;
    const totalPts = s.reduce((acc, sc, i) => acc + sc * w[i], 0);
    const needed = (target * 100 - totalPts) / finalWeight;
    setResult(Math.round(needed * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <ClipboardCheck className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Final Grade Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="text" value={scores} onChange={e => setScores(e.target.value)} placeholder="Completed assignment scores (comma separated, %)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="text" value={weights} onChange={e => setWeights(e.target.value)} placeholder="Weight of each completed item (comma separated, %)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={finalWeight} onChange={e => setFinalWeight(Number(e.target.value))} placeholder="Final Exam Weight (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={target} onChange={e => setTarget(Number(e.target.value))} placeholder="Target Course Grade (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Final Exam Score Needed</button>
        {result !== null && (
          <p className="text-sm font-bold text-primary text-center">
            {result > 100 ? `Not achievable (would need ${result}%)` : `Score needed on final: ${result}%`}
          </p>
        )}
      </div>
    </div>
  );
}
