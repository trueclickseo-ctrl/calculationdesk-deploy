'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Ovulation Calculator predicts your upcoming fertile windows and peak ovulation dates. It calculates the ideal conception periods based on the first day of your last period and cycle duration lengths.`,
  formula: `Fertility calendars are computed using standard luteal phase estimations:

**1. Ovulation Date:**
$$\\text{Ovulation Date} = \\text{First Day of LMP} + (\\text{Cycle Length} - 14 \\text{ days})$$

**2. Fertile Window:**
- Spans 5 days before ovulation to 1 day after:
  $$\\text{Fertile Window} = [\\text{Ovulation} - 5 \\text{ days}, \\ \\text{Ovulation} + 1 \\text{ day}]$$`,
  example: `**Calculate fertile window for LMP of June 1, 2026 and a 28-day cycle:**
- Ovulation Date = June 1 + (28 - 14) = June 15, 2026.
- Fertile Window = June 10, 2026 to June 16, 2026.
- Peak fertility days = June 14 and June 15.`,
  faqs: [
    {
      q: 'How long does an egg survive after ovulation?',
      a: 'After ovulation, an egg remains viable for fertilization for approximately 12 to 24 hours. Sperm can survive inside the female reproductive tract for up to 5 days.',
    },
    {
      q: 'When is the best time to attempt conception?',
      a: 'The peak fertility window is during the 2 days leading up to ovulation and the day of ovulation itself.',
    },
    {
      q: 'What is the luteal phase?',
      a: 'The luteal phase is the second half of the menstrual cycle, starting after ovulation and ending when the next period begins. It typically lasts 14 days.',
    },
  ],
};

interface CycleEstimate {
  cycleNum: number;
  fertileStart: string;
  fertileEnd: string;
  ovulation: string;
  nextPeriod: string;
}

export default function OvulationCalculator() {
  const [lmpDate, setLmpDate] = useState<string>('2026-06-01');
  const [cycleLength, setCycleLength] = useState<number>(28);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setLmpDate('2026-06-01');
    setCycleLength(28);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = lmpDate !== '' && !isNaN(cycleLength) && cycleLength >= 20 && cycleLength <= 45;
  if (isValid) {
    const start = new Date(lmpDate);
    const estimates: CycleEstimate[] = [];

    for (let i = 0; i < 3; i++) {
      const cycleOffset = i * cycleLength;

      // Next Period Date
      const nextPeriod = new Date(start);
      nextPeriod.setDate(nextPeriod.getDate() + cycleOffset + cycleLength);

      // Ovulation Date
      const ovulation = new Date(start);
      ovulation.setDate(ovulation.getDate() + cycleOffset + (cycleLength - 14));

      // Fertile Window start (5 days before)
      const fertileStart = new Date(ovulation);
      fertileStart.setDate(fertileStart.getDate() - 5);

      // Fertile Window end (1 day after)
      const fertileEnd = new Date(ovulation);
      fertileEnd.setDate(fertileEnd.getDate() + 1);

      estimates.push({
        cycleNum: i + 1,
        fertileStart: fertileStart.toDateString(),
        fertileEnd: fertileEnd.toDateString(),
        ovulation: ovulation.toDateString(),
        nextPeriod: nextPeriod.toDateString(),
      });
    }

    results = {
      estimates,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (lmpDate === '') newErrors.lmpDate = 'Please select your last period date';
    if (isNaN(cycleLength) || cycleLength < 20 || cycleLength > 45) {
      newErrors.cycleLength = 'Average cycle length must be between 20 and 45 days';
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
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Fertility Cycle</h2>

          <div className="space-y-5">
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

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Track Fertility
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
            <h2 className="text-xl font-bold text-foreground mb-6">Fertility Projections</h2>

            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Next Peak Ovulation Date</span>
                  <span className="block text-xl font-extrabold text-primary mt-1">
                    {results.estimates[0].ovulation}
                  </span>
                  <span className="block text-[10px] text-foreground/45 mt-0.5 font-semibold">
                    Fertile window: {results.estimates[0].fertileStart} – {results.estimates[0].fertileEnd}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-3 max-h-[220px] overflow-y-auto">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-1">Subsequent 3 Cycles Calendar</span>
                  {results.estimates.map((est) => (
                    <div key={est.cycleNum} className="border-b border-border/40 pb-2.5 last:border-b-0 last:pb-0 text-xs font-semibold space-y-1">
                      <div className="text-primary font-bold">Cycle #{est.cycleNum}</div>
                      <div className="flex justify-between">
                        <span className="text-foreground/50">Fertility Window:</span>
                        <span className="text-foreground">{est.fertileStart} – {est.fertileEnd}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground/50">Ovulation Date:</span>
                        <span className="text-foreground">{est.ovulation}</span>
                      </div>
                      <div className="flex justify-between text-[10px] text-foreground/45 italic">
                        <span>Expected Next Period:</span>
                        <span>{est.nextPeriod}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select dates.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
