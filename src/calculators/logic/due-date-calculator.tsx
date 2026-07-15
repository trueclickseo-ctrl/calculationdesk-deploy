'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Pregnancy & Baby Due Date Calculator estimates the expected date of delivery (EDD) based on Last Menstrual Period (LMP), conception date, or IVF embryo transfer parameters. It details current gestational age progress and trimester milestones.`,
  formula: `Pregnancy timelines are calculated using standard clinical rules:

**1. Last Menstrual Period (LMP) Method (Naegele's Rule):**
$$\\text{Due Date} = \\text{First Day of LMP} + 280 \\text{ days} + (\\text{Cycle Length} - 28 \\text{ days})$$

**2. Conception Date Method:**
$$\\text{Due Date} = \\text{Conception Date} + 266 \\text{ days}$$

**3. IVF Embryo Transfer Method:**
- For 3-Day Embryo:
  $$\\text{Due Date} = \\text{Transfer Date} + 263 \\text{ days}$$
- For 5-Day Embryo:
  $$\\text{Due Date} = \\text{Transfer Date} + 261 \\text{ days}$$`,
  example: `**Calculate due date with LMP of January 1, 2026:**
- First Day of LMP = Jan 1, 2026.
- Standard 28-day cycle.
- Due Date = Jan 1, 2026 + 280 days = **October 8, 2026**.`,
  faqs: [
    {
      q: 'How accurate is the estimated due date?',
      a: 'The due date is an estimate. Only about 4% of babies are born exactly on their estimated due date. Most babies arrive within a window of 2 weeks before to 2 weeks after the target date.',
    },
    {
      q: 'What is gestational age?',
      a: 'Gestational age measures how far along the pregnancy is, calculated in weeks and days from the first day of the last menstrual period (LMP).',
    },
    {
      q: 'How are pregnancy trimesters divided?',
      a: 'The first trimester spans from week 1 to the end of week 12. The second trimester spans from week 13 to the end of week 26. The third trimester spans from week 27 to birth.',
    },
  ],
};

type DueTab = 'lmp' | 'conception' | 'ivf';

export default function DueDateCalculator() {
  const [activeTab, setActiveTab] = useState<DueTab>('lmp');

  // LMP inputs
  const [lmpDate, setLmpDate] = useState<string>('2026-01-01');
  const [cycleLength, setCycleLength] = useState<number>(28);

  // Conception inputs
  const [conceptionDate, setConceptionDate] = useState<string>('2026-01-15');

  // IVF inputs
  const [transferDate, setTransferDate] = useState<string>('2026-01-20');
  const [embryoType, setEmbryoType] = useState<string>('5day');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setLmpDate('2026-01-01');
    setCycleLength(28);
    setConceptionDate('2026-01-15');
    setTransferDate('2026-01-20');
    setEmbryoType('5day');
    setErrors({});
  };

  // Computations
  let results = null;
  const now = new Date();

  if (activeTab === 'lmp' && lmpDate !== '' && !isNaN(cycleLength)) {
    const start = new Date(lmpDate);
    const edd = new Date(start);
    // add 280 days, then adjust for cycle length
    edd.setDate(edd.getDate() + 280 + (cycleLength - 28));

    // calculate progress
    const diffTime = now.getTime() - start.getTime();
    const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeksProgress = Math.trunc(daysElapsed / 7);
    const daysProgress = daysElapsed % 7;

    const remainingDays = Math.ceil((edd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    let trimester = 'First Trimester';
    if (weeksProgress >= 27) {
      trimester = 'Third Trimester';
    } else if (weeksProgress >= 13) {
      trimester = 'Second Trimester';
    }

    results = {
      edd: edd.toDateString(),
      gestationalAge: `${weeksProgress} weeks, ${daysProgress} days`,
      remainingDays: remainingDays > 0 ? remainingDays : 0,
      trimester,
      isArrived: remainingDays <= 0,
    };
  } else if (activeTab === 'conception' && conceptionDate !== '') {
    const start = new Date(conceptionDate);
    const edd = new Date(start);
    edd.setDate(edd.getDate() + 266);

    const lmpEst = new Date(start);
    lmpEst.setDate(lmpEst.getDate() - 14);

    const diffTime = now.getTime() - lmpEst.getTime();
    const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeksProgress = Math.trunc(daysElapsed / 7);
    const daysProgress = daysElapsed % 7;

    const remainingDays = Math.ceil((edd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    let trimester = 'First Trimester';
    if (weeksProgress >= 27) {
      trimester = 'Third Trimester';
    } else if (weeksProgress >= 13) {
      trimester = 'Second Trimester';
    }

    results = {
      edd: edd.toDateString(),
      gestationalAge: `${weeksProgress} weeks, ${daysProgress} days`,
      remainingDays: remainingDays > 0 ? remainingDays : 0,
      trimester,
      isArrived: remainingDays <= 0,
    };
  } else if (activeTab === 'ivf' && transferDate !== '') {
    const start = new Date(transferDate);
    const edd = new Date(start);
    if (embryoType === '3day') {
      edd.setDate(edd.getDate() + 263);
    } else {
      edd.setDate(edd.getDate() + 261);
    }

    const lmpEst = new Date(start);
    lmpEst.setDate(lmpEst.getDate() - (embryoType === '3day' ? 17 : 19));

    const diffTime = now.getTime() - lmpEst.getTime();
    const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    const weeksProgress = Math.trunc(daysElapsed / 7);
    const daysProgress = daysElapsed % 7;

    const remainingDays = Math.ceil((edd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    let trimester = 'First Trimester';
    if (weeksProgress >= 27) {
      trimester = 'Third Trimester';
    } else if (weeksProgress >= 13) {
      trimester = 'Second Trimester';
    }

    results = {
      edd: edd.toDateString(),
      gestationalAge: `${weeksProgress} weeks, ${daysProgress} days`,
      remainingDays: remainingDays > 0 ? remainingDays : 0,
      trimester,
      isArrived: remainingDays <= 0,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (activeTab === 'lmp') {
      if (lmpDate === '') newErrors.lmpDate = 'Please select first day of LMP';
      if (isNaN(cycleLength) || cycleLength < 20 || cycleLength > 45) newErrors.cycleLength = 'Cycle length must be between 20 and 45 days';
    } else if (activeTab === 'conception') {
      if (conceptionDate === '') newErrors.conceptionDate = 'Please select conception date';
    } else {
      if (transferDate === '') newErrors.transferDate = 'Please select IVF transfer date';
    }
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Pregnancy Parameter</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            {[
              { id: 'lmp', label: 'Last Period (LMP)' },
              { id: 'conception', label: 'Conception Date' },
              { id: 'ivf', label: 'IVF Transfer' }
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => { setActiveTab(tab.id as DueTab); setErrors({}); }}
                className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  activeTab === tab.id
                    ? 'bg-primary text-white shadow-md shadow-primary/10'
                    : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="space-y-5">
            {activeTab === 'lmp' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="lmp-date" className="block text-sm font-semibold text-foreground/80 mb-2">First Day of Last Period</label>
                  <input
                    id="lmp-date"
                    type="date"
                    value={lmpDate}
                    onChange={(e) => { setLmpDate(e.target.value); setErrors({}); }}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.lmpDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.lmpDate}</p>}
                </div>

                <div>
                  <label htmlFor="cycle-len" className="block text-sm font-semibold text-foreground/80 mb-2">Average Cycle Length (Days)</label>
                  <input
                    id="cycle-len"
                    type="number"
                    value={cycleLength}
                    onChange={(e) => setCycleLength(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.cycleLength && <p className="text-xs text-red-500 mt-1 font-medium">{errors.cycleLength}</p>}
                </div>
              </div>
            )}

            {activeTab === 'conception' && (
              <div>
                <label htmlFor="conception-date" className="block text-sm font-semibold text-foreground/80 mb-2">Date of Conception</label>
                <input
                  id="conception-date"
                  type="date"
                  value={conceptionDate}
                  onChange={(e) => { setConceptionDate(e.target.value); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.conceptionDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.conceptionDate}</p>}
              </div>
            )}

            {activeTab === 'ivf' && (
              <div className="space-y-4">
                <div>
                  <label htmlFor="transfer-date" className="block text-sm font-semibold text-foreground/80 mb-2">IVF Embryo Transfer Date</label>
                  <input
                    id="transfer-date"
                    type="date"
                    value={transferDate}
                    onChange={(e) => { setTransferDate(e.target.value); setErrors({}); }}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.transferDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.transferDate}</p>}
                </div>

                <div>
                  <label htmlFor="embryo-type" className="block text-sm font-semibold text-foreground/80 mb-2">Embryo Type</label>
                  <select
                    id="embryo-type"
                    value={embryoType}
                    onChange={(e) => setEmbryoType(e.target.value)}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  >
                    <option value="5day">5-day Blastocyst Transfer</option>
                    <option value="3day">3-day Cleavage Stage Transfer</option>
                  </select>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Due Date
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
            <h2 className="text-xl font-bold text-foreground mb-6 font-mono">Pregnancy Breakdown</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Estimated Due Date (EDD)</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.edd}
                  </span>
                </div>

                {results.isArrived ? (
                  <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-600 dark:text-emerald-500 text-sm font-bold text-center">
                    Congratulations! The baby due date has been reached!
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="rounded-xl bg-background p-4 border border-border">
                        <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Gestational Age</span>
                        <span className="block text-sm font-bold text-foreground mt-1">{results.gestationalAge}</span>
                      </div>
                      <div className="rounded-xl bg-background p-4 border border-border">
                        <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Trimester</span>
                        <span className="block text-sm font-bold text-foreground mt-1">{results.trimester}</span>
                      </div>
                    </div>

                    <div className="rounded-xl bg-background p-4 border border-border">
                      <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Countdown to Birth</span>
                      <span className="block text-base font-bold text-foreground mt-1">{results.remainingDays.toLocaleString()} days left</span>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter pregnancy setup details.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
