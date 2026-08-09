'use client';
import React, { useState } from 'react';
import { PiggyBank } from 'lucide-react';

export default function FourOhOneKCalculator() {
  const [current, setCurrent] = useState(20000);
  const [monthlyContrib, setMonthlyContrib] = useState(500);
  const [employerMatchPct, setEmployerMatchPct] = useState(50);
  const [annualReturn, setAnnualReturn] = useState(7);
  const [years, setYears] = useState(25);
  const [result, setResult] = useState<number | null>(null);

  const calculate = () => {
    const r = annualReturn / 100 / 12;
    const months = years * 12;
    const employerMonthly = monthlyContrib * (employerMatchPct / 100);
    const totalMonthly = monthlyContrib + employerMonthly;
    const fvCurrent = current * Math.pow(1 + r, months);
    const fvContrib = r > 0 ? totalMonthly * ((Math.pow(1 + r, months) - 1) / r) : totalMonthly * months;
    setResult(Math.round((fvCurrent + fvContrib) * 100) / 100);
  };

  return (
    <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        <PiggyBank className="h-6 w-6 text-primary" />
        <h2 className="text-lg font-bold text-foreground">401(k) Calculator</h2>
      </div>
      <div className="space-y-4">
        <input type="number" value={current} onChange={e => setCurrent(Number(e.target.value))} placeholder="Current 401(k) Balance" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={monthlyContrib} onChange={e => setMonthlyContrib(Number(e.target.value))} placeholder="Your Monthly Contribution" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={employerMatchPct} onChange={e => setEmployerMatchPct(Number(e.target.value))} placeholder="Employer Match (% of your contribution)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={annualReturn} onChange={e => setAnnualReturn(Number(e.target.value))} placeholder="Expected Annual Return (%)" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <input type="number" value={years} onChange={e => setYears(Number(e.target.value))} placeholder="Years Until Retirement" className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm" />
        <button onClick={calculate} className="w-full py-3 bg-primary text-white font-bold rounded-xl">Calculate Projected Balance</button>
        {result !== null && <p className="text-sm font-bold text-primary text-center">Projected Balance: ${result.toLocaleString()}</p>}
      </div>
    </div>
  );
}
