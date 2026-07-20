'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Anniversary Calculator tracks time elapsed since a significant starting milestone (wedding, employment start, or custom relationship date) and estimates upcoming milestone dates (such as 1,000 days or annual anniversaries).`,
  formula: `Anniversary calculations apply chronological date offsets:

**1. Days elapsed:**
$$\\text{Days Elapsed} = \\frac{\\text{Current Date} - \\text{Start Date}}{86,400,000}$$

**2. Custom Milestones:**
$$\\text{Milestone Date} = \\text{Start Date} + N \\text{ days}$$`,
  example: `**Calculate milestones from a starting date of January 1, 2025:**
- 100-day milestone: April 11, 2025 (Past).
- 500-day milestone: May 16, 2026 (Future).
- 1000-day milestone: September 28, 2027 (Future).`,
  faqs: [
    {
      q: 'What is a "gigasecond" anniversary?',
      a: 'A gigasecond is 1 billion seconds (approximately 31.7 years). People sometimes celebrate their gigasecond birthday or anniversary as a fun mathematical milestone.',
    },
    {
      q: 'Does it calculate custom day targets?',
      a: 'Yes. It maps out standard milestone achievements (100, 500, 1000, 5000, 10000 days) alongside annual milestones (1-year, 5-year, etc.).',
    },
    {
      q: 'How does it calculate days remaining?',
      a: 'It subtracts the current timestamp from the milestone timestamp, dividing by $86,400,000$ to get remaining days.',
    },
  ],
};

interface Milestone {
  label: string;
  date: Date;
  status: 'past' | 'future';
  daysRemaining: number;
}

export default function AnniversaryCalculator() {
  const [startDate, setStartDate] = useState<string>('2025-01-01');
  const [type, setType] = useState<string>('Wedding');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setStartDate('2025-01-01');
    setType('Wedding');
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = startDate !== '';
  if (isValid) {
    const start = new Date(startDate);
    const now = new Date();
    
    // Elapsed time
    const diffTime = now.getTime() - start.getTime();
    const daysElapsed = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    // Next anniversary
    const currentYear = now.getFullYear();
    const nextAnniversary = new Date(start);
    nextAnniversary.setFullYear(currentYear);
    if (nextAnniversary.getTime() < now.getTime()) {
      nextAnniversary.setFullYear(currentYear + 1);
    }
    const daysToNextAnniversary = Math.ceil((nextAnniversary.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    const nextAnniversaryYears = nextAnniversary.getFullYear() - start.getFullYear();

    // Milestones setup
    const dayMilestones = [100, 500, 1000, 5000, 10000];
    const yearMilestones = [1, 5, 10, 25, 50];

    const milestonesList: Milestone[] = [];

    // Day milestones
    dayMilestones.forEach(days => {
      const mDate = new Date(start);
      mDate.setDate(mDate.getDate() + days);
      const isPast = mDate.getTime() < now.getTime();
      const remain = Math.ceil((mDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      milestonesList.push({
        label: `${days.toLocaleString()} Days`,
        date: mDate,
        status: isPast ? 'past' : 'future',
        daysRemaining: isPast ? 0 : remain,
      });
    });

    // Year milestones
    yearMilestones.forEach(years => {
      const mDate = new Date(start);
      mDate.setFullYear(mDate.getFullYear() + years);
      const isPast = mDate.getTime() < now.getTime();
      const remain = Math.ceil((mDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      milestonesList.push({
        label: `${years} Year${years > 1 ? 's' : ''}`,
        date: mDate,
        status: isPast ? 'past' : 'future',
        daysRemaining: isPast ? 0 : remain,
      });
    });

    // Sort milestones chronologically
    milestonesList.sort((a, b) => a.date.getTime() - b.date.getTime());

    results = {
      daysElapsed,
      nextAnniversaryDate: nextAnniversary.toDateString(),
      daysToNextAnniversary,
      nextAnniversaryYears,
      milestonesList,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (startDate === '') newErrors.startDate = 'Please select a starting date';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Milestone Details</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="start-date" className="block text-sm font-semibold text-foreground/80 mb-2">Anniversary Start Date</label>
              <input
                id="start-date"
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.startDate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.startDate}</p>}
            </div>

            <div>
              <label htmlFor="type-select" className="block text-sm font-semibold text-foreground/80 mb-2">Category</label>
              <select
                id="type-select"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              >
                <option value="Wedding">Wedding</option>
                <option value="Relationship">Relationship</option>
                <option value="Employment">Employment Start</option>
                <option value="Custom">Custom Event</option>
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Milestones
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
            <h2 className="text-xl font-bold text-foreground mb-6">Upcoming Milestones</h2>

            {results ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Days Elapsed Since Start</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {results.daysElapsed.toLocaleString()} days
                    </span>
                  </div>

                  <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Next Anniversary ({results.nextAnniversaryYears}y)</span>
                    <span className="block text-2xl font-extrabold text-accent mt-1">
                      {results.daysToNextAnniversary} days left
                    </span>
                    <span className="block text-[10px] text-foreground/45 mt-0.5 font-semibold">({results.nextAnniversaryDate})</span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-2 max-h-[220px] overflow-y-auto">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Milestones Timeline</span>
                  {results.milestonesList.map((m, idx) => (
                    <div key={idx} className="flex justify-between items-center text-xs font-semibold border-b border-border/40 pb-1.5 last:border-b-0">
                      <div>
                        <span className="text-foreground/70">{m.label}</span>
                        <span className="block text-[10px] text-foreground/40">{m.date.toDateString()}</span>
                      </div>
                      <div className="text-right">
                        {m.status === 'past' ? (
                          <span className="text-emerald-500 font-bold uppercase text-[9px] bg-emerald-500/10 px-2 py-0.5 rounded-md">Completed</span>
                        ) : (
                          <span className="text-foreground/60">{m.daysRemaining.toLocaleString()} days left</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select milestone setup.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
