'use client';

import React, { useState } from 'react';
import { RefreshCw, CheckCircle2, AlertCircle } from 'lucide-react';

export const seoData = {
  whatIs: `The Attendance Calculator (Bunk Planner) is a college utility designed to manage class attendance rates. It estimates your current percentage and tells you exactly how many consecutive future classes you must attend to reach a target threshold (e.g., 75% or 85%), or how many upcoming classes you can safely skip (bunk) without falling below your goal.`,
  formula: `The attendance planner calculations depend on whether you are above or below your target:

**1. Current Attendance Percentage:**
$$\\text{Current \\%} = \\left(\\frac{P}{T}\\right) \\times 100$$

**2. Consecutive Classes to Attend (if below target):**
$$A_{\\text{required}} = \\lceil \\frac{D \\times T - 100 \\times P}{100 - D} \\rceil$$

**3. Safe Classes to Skip/Bunk (if above target):**
$$B_{\\text{safe}} = \\lfloor \\frac{100 \\times P - D \\times T}{D} \\rfloor$$

Where:
- **P** is the number of present classes.
- **T** is the total number of scheduled classes.
- **D** is your desired target attendance percentage.`,
  example: `Suppose you have attended 35 out of 50 classes (70% attendance) and your target is 75%.

1. Current = (35 / 50) × 100 = 70%.
2. Since 70% < 75%, we calculate required future classes:
   $$A_{\\text{required}} = \\lceil \\frac{75 \\times 50 - 100 \\times 35}{100 - 75} \\rceil$$
   $$A_{\\text{required}} = \\lceil \\frac{3750 - 3500}{25} \\rceil = \\lceil \\frac{250}{25} \\rceil = 10$$
3. You must attend **10 consecutive classes** to reach exactly 75% attendance.`,
  faqs: [
    {
      q: 'Why is there a minimum attendance requirement in colleges?',
      a: 'Universities enforce attendance policies (typically 75% or 80%) to ensure classroom engagement and consistent learning, making it a prerequisite to sit for end-semester exams.',
    },
    {
      q: 'What if my target attendance is 100%?',
      a: 'If you have already missed even one class, it is mathematically impossible to reach a 100% attendance rate again, as the ratio can only approach 100% asymptotically.',
    },
    {
      q: 'Does this calculator support different subjects?',
      a: 'Yes. You can run the calculation for each subject individually by entering that subject\'s present and total lecture counts.',
    },
  ],
};

export default function AttendanceCalculator() {
  const [present, setPresent] = useState<number>(35);
  const [total, setTotal] = useState<number>(50);
  const [target, setTarget] = useState<number>(75);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = total > 0 && present >= 0 && present <= total && target > 0 && target < 100;

  let results = null;
  if (isValid) {
    const currentPercent = (present / total) * 100;
    
    let bunkSafe = 0;
    let attendRequired = 0;

    if (currentPercent >= target) {
      bunkSafe = Math.floor((100 * present - target * total) / target);
    } else {
      attendRequired = Math.ceil((target * total - 100 * present) / (100 - target));
    }

    results = {
      currentPercent,
      bunkSafe: Math.max(0, bunkSafe),
      attendRequired: Math.max(0, attendRequired),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (total <= 0) newErrors.total = 'Total classes must be greater than zero';
    if (present < 0 || present > total) newErrors.present = 'Present classes must be between 0 and total classes';
    if (target <= 0 || target >= 100) newErrors.target = 'Target attendance must be between 1% and 99%';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setPresent(35);
    setTotal(50);
    setTarget(75);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Attendance Tracker</h2>
          
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="present-classes" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Classes Attended
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="present-classes"
                    type="number"
                    value={present || ''}
                    onChange={(e) => setPresent(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.present && <p className="text-xs text-red-500 mt-1 font-medium">{errors.present}</p>}
              </div>

              <div>
                <label htmlFor="total-classes" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Total Classes Held
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="total-classes"
                    type="number"
                    value={total || ''}
                    onChange={(e) => setTotal(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.total && <p className="text-xs text-red-500 mt-1 font-medium">{errors.total}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="target-pct" className="block text-sm font-semibold text-foreground/80 mb-2">
                Desired Attendance Goal
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  %
                </div>
                <input
                  id="target-pct"
                  type="number"
                  value={target || ''}
                  onChange={(e) => setTarget(Number(e.target.value))}
                  className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.target && <p className="text-xs text-red-500 mt-1 font-medium">{errors.target}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Analyze Status
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Attendance Summary</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Current Attendance Rate
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.currentPercent.toFixed(1)}%
                  </span>
                </div>

                {results.currentPercent >= target ? (
                  <div className="flex items-start gap-2.5 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-600 dark:text-emerald-500">
                    <CheckCircle2 className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Attendance is on Track!</h4>
                      <p className="text-xs font-medium opacity-90 mt-1">
                        You can safely bunk (skip) up to <strong className="font-extrabold text-sm">{results.bunkSafe}</strong> classes consecutively without falling below your {target}% target.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-amber-600 dark:text-amber-500">
                    <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Below Attendance Target</h4>
                      <p className="text-xs font-medium opacity-90 mt-1">
                        You need to attend next <strong className="font-extrabold text-sm">{results.attendRequired}</strong> classes consecutively to bring your rate back up to your {target}% target.
                      </p>
                    </div>
                  </div>
                )}

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Desired Threshold Target
                  </span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    {target}%
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view attendance statistics.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
