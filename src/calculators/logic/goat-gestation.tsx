'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Goat Gestation Calculator projects kidding delivery dates for pregnant does based on mating or breeding dates.`,
  formula: `Gestation forecasting is modeled on average caprine pregnancy timelines:

**Expected Kidding Date:**
$$\\text{Kidding Date} = \\text{Breeding Date} + 150 \\quad (\\text{days})$$
*Typical gestation ranges from 145 to 155 days.*`,
  example: `**A doe bred on October 1st:**
- Expected Kidding Date (150 days later) = **February 28th** of the following year.`,
  faqs: [
    {
      q: 'How long is a goat pregnant?',
      a: 'The average gestation period for a goat is 150 days. Miniature breeds (like Nigerian Dwarfs) tend to kid slightly earlier (145 days), while larger breeds frequently go up to 152 days.',
    },
    {
      q: 'What are signs of kidding approaching in goats?',
      a: 'Typical signs include: filling udder (bagging up), dropping of the tailhead ligaments, nesting behaviors, restlessness, clear/white vaginal discharge, and pawing at the ground.',
    },
    {
      q: 'Can a goat deliver early or late?',
      a: 'Yes, kids delivered before day 142 are rarely viable (premature). Goats going past 155 days should be checked by a veterinarian.',
    },
  ],
};

export default function GoatGestationCalculator() {
  const [breedDate, setBreedDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    kiddingDate: string;
    rangeStart: string;
    rangeEnd: string;
    daysRemaining: number;
  } | null>(null);

  const handleReset = () => {
    const today = new Date();
    setBreedDate(today.toISOString().split('T')[0]);
    setErrors({});
    setResult(null);
  };

  const handleCalculate = () => {
    if (!breedDate) {
      setErrors({ date: 'Please choose a valid breeding date' });
      return;
    }
    setErrors({});

    const start = new Date(breedDate);
    if (isNaN(start.getTime())) {
      setErrors({ date: 'Please choose a valid breeding date' });
      return;
    }

    const kiddingDate = new Date(start);
    kiddingDate.setDate(start.getDate() + 150);

    const rangeStart = new Date(start);
    rangeStart.setDate(start.getDate() + 145);

    const rangeEnd = new Date(start);
    rangeEnd.setDate(start.getDate() + 155);

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const diffTime = kiddingDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    setResult({
      kiddingDate: kiddingDate.toLocaleDateString('en-US', options),
      rangeStart: rangeStart.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      rangeEnd: rangeEnd.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      daysRemaining: daysRemaining >= 0 ? daysRemaining : 0,
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
          <h2 className="text-xl font-bold text-foreground mb-6">Breeding Date</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="mating-date" className="block text-sm font-semibold text-foreground/80 mb-2">Breeding/Mating Date</label>
              <input
                id="mating-date"
                type="date"
                value={breedDate}
                onChange={(e) => { setBreedDate(e.target.value); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 cursor-pointer"
              />
              {errors.date && <p className="text-xs text-red-500 mt-1 font-medium">{errors.date}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Kidding Date
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
            <h2 className="text-xl font-bold text-foreground mb-6">Pregnancy Forecast</h2>

            {result ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Expected Kidding Date</span>
                  <span className="block text-xl md:text-2xl font-extrabold text-primary mt-2">
                    {result.kiddingDate}
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    {result.daysRemaining > 0 ? `${result.daysRemaining} days remaining` : 'Expected kidding date passed or today'}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Expected Delivery Range (145–155 Days):</span>
                  <span className="text-foreground font-bold">{result.rangeStart} to {result.rangeEnd}</span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Select mating date.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
