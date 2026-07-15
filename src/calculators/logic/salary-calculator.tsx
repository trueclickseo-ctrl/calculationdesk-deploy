'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Salary Calculator converts wages and salary figures across different time increments (hourly, daily, weekly, bi-weekly, monthly, and annually) based on work hours and days.`,
  formula: `Salary translations normalize all frequencies to an annual base, then divide by corresponding period counts:

**1. Define Annual Base ($A$):**
- From Hourly ($H$):
  $$A = H \\times \\text{Hours/Week} \\times 52$$
- From Monthly ($M$):
  $$A = M \\times 12$$

**2. Divide Across Frequencies:**
- Weekly:
  $$\\text{Weekly} = \\frac{A}{52}$$
- Bi-weekly:
  $$\\text{Bi-weekly} = \\frac{A}{26}$$
- Daily:
  $$\\text{Daily} = \\frac{A}{52 \\times \\text{Days/Week}}$$`,
  example: `**Convert a $25/hour wage to salary equivalents (40 hrs/week, 5 days/week):**
- Hourly = $25.
- Annual = 25 × 40 × 52 = **$52,000**.
- Monthly = 52,000 / 12 = **$4,333.33**.
- Weekly = 52,000 / 52 = **$1,000.00**.
- Daily = 1,000 / 5 = **$200.00**.`,
  faqs: [
    {
      q: 'How many work hours are in a standard year?',
      a: 'A standard full-time work year of 40 hours per week for 52 weeks consists of 2,080 hours.',
    },
    {
      q: 'What is the difference between bi-weekly and semi-monthly?',
      a: 'Bi-weekly means you are paid every two weeks (26 times a year). Semi-monthly means you are paid twice a month (24 times a year, e.g. on the 15th and 30th).',
    },
    {
      q: 'Does this calculator include tax deductions?',
      a: 'No. This calculator converts gross salary amounts before any payroll taxes or insurance premiums are deducted.',
    },
  ],
};

type Period = 'hourly' | 'daily' | 'weekly' | 'biweekly' | 'semimonthly' | 'monthly' | 'annually';

export default function SalaryCalculator() {
  const [amount, setAmount] = useState<number>(50000);
  const [period, setPeriod] = useState<Period>('annually');
  const [hoursPerWeek, setHoursPerWeek] = useState<number>(40);
  const [daysPerWeek, setDaysPerWeek] = useState<number>(5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setAmount(50000);
    setPeriod('annually');
    setHoursPerWeek(40);
    setDaysPerWeek(5);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(amount) && amount >= 0 &&
                  !isNaN(hoursPerWeek) && hoursPerWeek > 0 && hoursPerWeek <= 168 &&
                  !isNaN(daysPerWeek) && daysPerWeek > 0 && daysPerWeek <= 7;

  if (isValid) {
    let annual = 0;
    if (period === 'hourly') {
      annual = amount * hoursPerWeek * 52;
    } else if (period === 'daily') {
      annual = amount * daysPerWeek * 52;
    } else if (period === 'weekly') {
      annual = amount * 52;
    } else if (period === 'biweekly') {
      annual = amount * 26;
    } else if (period === 'semimonthly') {
      annual = amount * 24;
    } else if (period === 'monthly') {
      annual = amount * 12;
    } else {
      annual = amount;
    }

    results = {
      annually: annual,
      monthly: annual / 12,
      semimonthly: annual / 24,
      biweekly: annual / 26,
      weekly: annual / 52,
      daily: annual / (52 * daysPerWeek),
      hourly: annual / (52 * hoursPerWeek),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (amount < 0 || isNaN(amount)) newErrors.amount = 'Salary amount cannot be negative';
    if (hoursPerWeek <= 0 || hoursPerWeek > 168 || isNaN(hoursPerWeek)) newErrors.hoursPerWeek = 'Hours per week must be between 1 and 168';
    if (daysPerWeek <= 0 || daysPerWeek > 7 || isNaN(daysPerWeek)) newErrors.daysPerWeek = 'Days per week must be between 1 and 7';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Wage Parameters</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="salary-amount" className="block text-sm font-semibold text-foreground/80 mb-2">Salary / Wage Amount ($)</label>
              <div className="flex gap-2">
                <input
                  id="salary-amount"
                  type="number"
                  value={amount}
                  onChange={(e) => { setAmount(Number(e.target.value)); setErrors({}); }}
                  className="flex-1 py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                <select
                  value={period}
                  onChange={(e) => { setPeriod(e.target.value as Period); setErrors({}); }}
                  className="w-32 py-3 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  <option value="hourly">Hourly</option>
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="biweekly">Bi-weekly</option>
                  <option value="semimonthly">Semi-monthly</option>
                  <option value="monthly">Monthly</option>
                  <option value="annually">Annually</option>
                </select>
              </div>
              {errors.amount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.amount}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="hours-week" className="block text-sm font-semibold text-foreground/80 mb-2">Hours / Week</label>
                <input
                  id="hours-week"
                  type="number"
                  value={hoursPerWeek}
                  onChange={(e) => { setHoursPerWeek(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.hoursPerWeek && <p className="text-xs text-red-500 mt-1 font-medium">{errors.hoursPerWeek}</p>}
              </div>

              <div>
                <label htmlFor="days-week" className="block text-sm font-semibold text-foreground/80 mb-2">Days / Week</label>
                <input
                  id="days-week"
                  type="number"
                  value={daysPerWeek}
                  onChange={(e) => { setDaysPerWeek(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.daysPerWeek && <p className="text-xs text-red-500 mt-1 font-medium">{errors.daysPerWeek}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Equivalents
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center justify-center gap-1.5 border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"
              >
                <RefreshCw className="h-4 w-4" />
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Salary Equivalents</h2>

            {results ? (
              <div className="space-y-3.5">
                <div className="flex justify-between items-center rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="text-xs font-bold text-primary uppercase font-mono">Annual Salary</span>
                  <span className="text-2xl font-extrabold text-primary">
                    ${results.annually.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Monthly:</span>
                    <span className="text-foreground font-bold">
                      ${results.monthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Semi-monthly:</span>
                    <span className="text-foreground font-bold">
                      ${results.semimonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Bi-weekly:</span>
                    <span className="text-foreground font-bold">
                      ${results.biweekly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Weekly:</span>
                    <span className="text-foreground font-bold">
                      ${results.weekly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Daily:</span>
                    <span className="text-foreground font-bold">
                      ${results.daily.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                    <span className="text-foreground/50">Hourly Rate:</span>
                    <span className="text-foreground font-bold">
                      ${results.hourly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / hr
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter wages for translation.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
