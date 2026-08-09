'use client';
import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

export default function WeightedGpaCalculator() {
  const [grades, setGrades] = useState('4.0,3.0,3.7,2.7');
  const [credits, setCredits] = useState('3,4,3,2');
  const [bonuses, setBonuses] = useState('1.0,0,0.5,0');
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const g = grades.split(',').map(Number);
    const c = credits.split(',').map(Number);
    const b = bonuses.split(',').map(Number);
    if (g.length !== c.length || g.length !== b.length || g.length === 0) return;
    const totalCredits = c.reduce((a, x) => a + x, 0);
    if (totalCredits === 0) return;
    const totalPoints = g.reduce((acc, gp, i) => acc + (gp + b[i]) * c[i], 0);
    setResult(Math.round((totalPoints / totalCredits) * 1000) / 1000);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <GraduationCap className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">Weighted GPA Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="text" value={grades} onChange={e => setGrades(e.target.value)} placeholder="Grade points per course (comma separated, e.g. 4.0,3.0,3.7)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="text" value={credits} onChange={e => setCredits(e.target.value)} placeholder="Credit hours per course (comma separated, e.g. 3,4,3)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="text" value={bonuses} onChange={e => setBonuses(e.target.value)} placeholder="Bonus points per course: 1.0 for AP/IB, 0.5 for Honors, 0 for regular" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Weighted GPA</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Weighted GPA: {result}</p>}
      </div>
    </div>
  );
}
