'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Pregnancy Calculator tracks gestational development week-by-week based on your last period. It maps trimesters, calculates the estimated conception date, and outputs baby size analogies (like fruit sizes).`,
  formula: `Pregnancy milestones are determined from the First Day of LMP:

**1. Gestational Age:**
$$\\text{Total Days} = \\text{Current Date} - \\text{LMP Date}$$
$$\\text{Gestational Weeks} = \\lfloor \\text{Total Days} / 7 \\rfloor, \\quad \\text{Days} = \\text{Total Days} \\% 7$$

**2. Conception Offset:**
$$\\text{Conception Date} = \\text{LMP Date} + 14 \\text{ days}$$`,
  example: `**Calculate timeline for LMP of January 1, 2026:**
- Current date: July 15, 2026 (195 days elapsed).
- Gestational Age = **27 weeks and 6 days** (Third Trimester).
- Baby size equivalent = **Eggplant** (approx. 36 cm).`,
  faqs: [
    {
      q: 'Why does pregnancy age start before conception?',
      a: 'Standard medical practice counts gestational age from the first day of your last menstrual period (LMP) because the exact date of conception is usually difficult to pinpoint.',
    },
    {
      q: 'How long does a typical pregnancy last?',
      a: 'A typical full-term pregnancy is considered to last 40 weeks (280 days) from the first day of the last period.',
    },
    {
      q: 'What is the "fetal size equivalent" scale?',
      a: 'It is a common educational tool comparing your baby\'s developmental length and weight to familiar fruits and vegetables at various weekly milestones.',
    },
  ],
};

interface Milestone {
  week: number;
  label: string;
  size: string;
  desc: string;
}

const MILESTONES: Milestone[] = [
  { week: 4, label: 'Implantation Stage', size: 'Poppy Seed', desc: 'The blastocyst implants in the uterine lining. Early cell division begins.' },
  { week: 8, label: 'Embryonic Stage', size: 'Raspberry', desc: 'Brain activity starts. Heart beats at about 150 times per minute.' },
  { week: 12, label: 'Trimester 1 Complete', size: 'Lime', desc: 'All major organ systems are formed. Fetal reflexes begin.' },
  { week: 16, label: 'Fetal Development', size: 'Avocado', desc: 'Eyes can move slowly, and the circulatory system is fully functioning.' },
  { week: 20, label: 'Halfway Milestone', size: 'Banana', desc: 'You may start to feel movements. Lanugo hair covers the skin.' },
  { week: 24, label: 'Viability Boundary', size: 'Cantaloupe', desc: 'Lungs start producing surfactant, helping the air sacs inflate.' },
  { week: 28, label: 'Trimester 2 Complete', size: 'Eggplant', desc: 'Eyes begin opening and closing. Brain waves are active.' },
  { week: 32, label: 'Growth Acceleration', size: 'Squash', desc: 'Bones are fully developed, though still soft and flexible.' },
  { week: 36, label: 'Early Term', size: 'Papaya', desc: 'Lungs are near maturity. The baby begins dropping lower.' },
  { week: 40, label: 'Estimated Due Date', size: 'Pumpkin', desc: 'Full term delivery target. The baby is ready to arrive.' }
];

export default function PregnancyCalculator() {
  const [lmpDate, setLmpDate] = useState<string>('2026-01-01');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setLmpDate('2026-01-01');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = lmpDate !== '';
  if (isValid) {
    const start = new Date(lmpDate);
    const now = new Date();

    const edd = new Date(start);
    edd.setDate(edd.getDate() + 280);

    const conception = new Date(start);
    conception.setDate(conception.getDate() + 14);

    const diffTime = now.getTime() - start.getTime();
    const totalDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    const weeksProgress = Math.trunc(totalDays / 7);
    const daysProgress = totalDays % 7;

    const remainingDays = Math.ceil((edd.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    let trimester = 'First Trimester';
    if (weeksProgress >= 27) {
      trimester = 'Third Trimester';
    } else if (weeksProgress >= 13) {
      trimester = 'Second Trimester';
    }

    // Find current baby size size comparison
    let currentMilestone = MILESTONES[0];
    MILESTONES.forEach(m => {
      if (weeksProgress >= m.week) {
        currentMilestone = m;
      }
    });

    results = {
      edd: edd.toDateString(),
      conception: conception.toDateString(),
      gestationalAge: `${weeksProgress} weeks, ${daysProgress} days`,
      trimester,
      remainingDays: Math.max(0, remainingDays),
      sizeComparison: currentMilestone.size,
      milestones: MILESTONES.map(m => {
        const date = new Date(start);
        date.setDate(date.getDate() + m.week * 7);
        return {
          ...m,
          dateString: date.toDateString(),
          isPast: date.getTime() < now.getTime(),
        };
      }),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (lmpDate === '') newErrors.lmpDate = 'Please select LMP starting date';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Pregnancy Date</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="lmp-date" className="block text-sm font-semibold text-foreground/80 mb-2">First Day of Last Period (LMP)</label>
              <input
                id="lmp-date"
                type="date"
                value={lmpDate}
                onChange={(e) => { setLmpDate(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.lmpDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.lmpDate}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Track pregnancy
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
            <h2 className="text-xl font-bold text-foreground mb-6">Gestational Progress</h2>

            {results ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Gestational Age</span>
                    <span className="block text-xl font-extrabold text-primary mt-1">
                      {results.gestationalAge}
                    </span>
                  </div>

                  <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Baby Size Analogy</span>
                    <span className="block text-xl font-extrabold text-accent mt-1">
                      {results.sizeComparison}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">Trimester</span>
                    <span className="block text-sm font-bold text-foreground mt-0.5">{results.trimester}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">Conception</span>
                    <span className="block text-xs font-bold text-foreground mt-1">{results.conception}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-[10px] font-semibold text-foreground/50 uppercase tracking-wider">Due Date</span>
                    <span className="block text-xs font-bold text-foreground mt-1">{results.edd}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-2 max-h-[220px] overflow-y-auto">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Developmental Timeline</span>
                  {results.milestones.map((m, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-semibold border-b border-border/40 pb-1.5 last:border-b-0">
                      <div>
                        <span className="text-foreground/70">Week {m.week}: {m.label} ({m.size})</span>
                        <span className="block text-[10px] text-foreground/45 mt-0.5">{m.desc}</span>
                      </div>
                      <div className="text-right">
                        {m.isPast ? (
                          <span className="text-emerald-500 font-bold uppercase text-[9px] bg-emerald-500/10 px-2 py-0.5 rounded-md">Completed</span>
                        ) : (
                          <span className="text-foreground/40 font-bold text-[9px] uppercase bg-border/40 px-2 py-0.5 rounded-md">Future</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select LMP date to view progress.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
