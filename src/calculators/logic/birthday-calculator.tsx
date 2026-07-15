'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Birthday Facts Calculator reveals unique stats and milestones about your life, including the weekday you were born, birthstone, countdown to your next birthday, and cumulative stats like estimated breath and heartbeat counts.`,
  formula: `Birthday metrics utilize calendars and physiological averages:

**1. Days Lived ($D$):**
$$D = \\text{Current Date} - \\text{Birth Date} \\quad (\\text{in days})$$

**2. Cumulative Estimates:**
- Total Heartbeats:
  $$\\text{Heartbeats} \\approx D \\times 1,440 \\text{ mins/day} \\times 70 \\text{ beats/min}$$
- Total Breaths:
  $$\\text{Breaths} \\approx D \\times 1,440 \\text{ mins/day} \\times 16 \\text{ breaths/min}$$`,
  example: `**Calculate stats for a person born on October 15, 1995 (inspected on Jan 1, 2026):**
- Days lived = 11,036 days.
- Weekday born = **Sunday**.
- Estimated heartbeats = 11,036 × 1,440 × 70 = **1.11 billion beats**.`,
  faqs: [
    {
      q: 'What is a birthstone?',
      a: 'A birthstone is a gemstone associated with the month of one\'s birth, historically believed to bring good luck, health, and protection.',
    },
    {
      q: 'How accurate are the breath and heartbeat estimates?',
      a: 'They are statistical estimates based on average resting adult rates: 70 heartbeats per minute and 16 breaths per minute. Actual individual figures vary with health, fitness, and activity levels.',
    },
    {
      q: 'How does the leap year affect calculation?',
      a: 'Our date calculations use native JavaScript date objects, which automatically account for leap years (containing 366 days instead of 365).',
    },
  ],
};

const BIRTHSTONES = [
  'Garnet (January)',
  'Amethyst (February)',
  'Aquamarine (March)',
  'Diamond (April)',
  'Emerald (May)',
  'Pearl / Alexandrite (June)',
  'Ruby (July)',
  'Peridot (August)',
  'Sapphire (September)',
  'Opal / Tourmaline (October)',
  'Topaz / Citrine (November)',
  'Turquoise / Zircon (December)',
];

const WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export default function BirthdayCalculator() {
  const [birthdate, setBirthdate] = useState<string>('1995-10-15');
  const [result, setResult] = useState<{
    weekdayBorn: string;
    birthstone: string;
    daysLived: number;
    hoursLived: number;
    heartbeats: number;
    breaths: number;
    nextBirthdayDays: number;
  } | null>(null);

  const handleReset = () => {
    setBirthdate('');
    setResult(null);
  };

  const handleCalculate = () => {
    if (!birthdate) return;

    const parts = birthdate.split('-');
    const dob = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const now = new Date();

    if (isNaN(dob.getTime())) return;

    // Days lived
    const diffMs = now.getTime() - dob.getTime();
    const daysLived = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const hoursLived = daysLived * 24;

    // Weekday born
    const weekdayBorn = WEEKDAYS[dob.getDay()];

    // Birthstone
    const birthstone = BIRTHSTONES[dob.getMonth()];

    // Heartbeats and breaths (70 bpm and 16 breaths/min)
    const heartbeats = daysLived * 1440 * 70;
    const breaths = daysLived * 1440 * 16;

    // Next Birthday Countdown
    const nextBday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
    if (nextBday.getTime() < now.getTime()) {
      nextBday.setFullYear(now.getFullYear() + 1);
    }
    const nextDiffMs = nextBday.getTime() - now.getTime();
    const nextBirthdayDays = Math.ceil(nextDiffMs / (1000 * 60 * 60 * 24));

    setResult({
      weekdayBorn,
      birthstone,
      daysLived,
      hoursLived,
      heartbeats,
      breaths,
      nextBirthdayDays,
    });
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
          <h2 className="text-xl font-bold text-foreground mb-6">Birthday Info</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="birth-date" className="block text-sm font-semibold text-foreground/80 mb-2">Select Birth Date</label>
              <input
                id="birth-date"
                type="date"
                value={birthdate}
                onChange={(e) => { setBirthdate(e.target.value); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Facts
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
            <h2 className="text-xl font-bold text-foreground mb-6">Fun Milestones</h2>

            {result ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Day of Week Born</span>
                    <span className="block text-xl font-extrabold text-primary mt-1">{result.weekdayBorn}</span>
                  </div>
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Birthstone</span>
                    <span className="block text-base font-bold text-primary mt-2">{result.birthstone}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Days Lived:</span>
                    <span className="text-foreground font-bold">{result.daysLived.toLocaleString()} days</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Hours Lived:</span>
                    <span className="text-foreground font-bold">{result.hoursLived.toLocaleString()} hours</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Est. Heartbeats:</span>
                    <span className="text-foreground font-bold">{result.heartbeats.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Est. Breaths Taken:</span>
                    <span className="text-foreground font-bold">{result.breaths.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                    <span className="text-foreground/50">Next Birthday:</span>
                    <span className="text-foreground font-bold">In {result.nextBirthdayDays} days</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select your birth date to calculate facts.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
