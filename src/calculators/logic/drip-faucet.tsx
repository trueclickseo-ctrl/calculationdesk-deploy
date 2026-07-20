'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Drip Faucet Water Wastage Calculator estimates daily, monthly, and annual water wastage and utility financial losses resulting from leaking faucets.`,
  formula: `Water loss estimation uses average drop volumes ($0.25$ ml per drop):

**1. Water Loss per Minute ($V_{min}$):**
$$V_{min} = \\text{Drips/Min} \\times 0.25 \\quad (\\text{ml})$$

**2. Daily Water Loss ($V_{day}$):**
$$V_{day} = V_{min} \\times 1,440 \\quad (\\text{ml})$$
Converted to Liters ($V_{day} / 1,000$) or Gallons ($V_{day} \\times 0.000264172$).

**3. Cost of Wastage:**
$$\\text{Cost} = \\text{Gallons} \\times \\text{Utility Water Rate per Gallon}$$`,
  example: `**Calculate water wastage for 1 faucet dripping 20 times per minute, with a water rate of $0.01 per Gallon:**
- Daily volume = 20 × 0.25 ml × 1,440 = 7,200 ml (**7.2 Liters** or **1.90 Gallons**).
- Monthly volume = 1.90 Gallons × 30 = **57 Gallons**.
- Monthly Cost = 57 × $0.01 = **$0.57**.`,
  faqs: [
    {
      q: 'How much water is in a standard drip?',
      a: 'In plumbing calculations, a single water drop is standardized at approximately 0.25 milliliters (ml). Thus, it takes about 4,000 drips to waste one Liter of water.',
    },
    {
      q: 'Why should I repair a slow dripping faucet?',
      a: 'Even a slow leak (e.g. 10 drips per minute) wastes over 3.6 Liters of clean drinking water every day, totaling over 1,300 Liters (345 Gallons) wasted annually. Repairing it protects resources and prevents structural damage.',
    },
    {
      q: 'What is the average cost of residential water?',
      a: 'In the United States, public tap water costs about $0.004 per gallon (approx. $4 per 1,000 gallons). However, wastewater/sewage fees are often added, which double this rate.',
    },
  ],
};

export default function DripFaucetCalculator() {
  const [drips, setDrips] = useState<number>(10);
  const [faucets, setFaucets] = useState<number>(1);
  const [rate, setRate] = useState<number>(0.005); // $0.005 per Gallon
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setDrips(10);
    setFaucets(1);
    setRate(0.005);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(drips) && drips >= 0 &&
                  !isNaN(faucets) && faucets > 0 &&
                  !isNaN(rate) && rate >= 0;

  if (isValid) {
    const mlPerMinute = drips * faucets * 0.25;
    const mlPerDay = mlPerMinute * 1440;
    
    const litersPerDay = mlPerDay / 1000;
    const gallonsPerDay = mlPerDay * 0.000264172;

    const gallonsPerMonth = gallonsPerDay * 30.4;
    const litersPerMonth = litersPerDay * 30.4;

    const gallonsPerYear = gallonsPerDay * 365;
    const litersPerYear = litersPerDay * 365;

    const costPerDay = gallonsPerDay * rate;
    const costPerMonth = gallonsPerMonth * rate;
    const costPerYear = gallonsPerYear * rate;

    results = {
      litersPerDay,
      gallonsPerDay,
      litersPerMonth,
      gallonsPerMonth,
      litersPerYear,
      gallonsPerYear,
      costPerDay,
      costPerMonth,
      costPerYear,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (drips < 0 || isNaN(drips)) newErrors.drips = 'Drips per minute cannot be negative';
    if (faucets <= 0 || isNaN(faucets)) newErrors.faucets = 'Faucet count must be greater than zero';
    if (rate < 0 || isNaN(rate)) newErrors.rate = 'Water rate cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Leaky Faucet Specs</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="drips-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Drips per Minute (per Faucet)</label>
              <input
                id="drips-rate"
                type="number"
                value={drips}
                onChange={(e) => { setDrips(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.drips && <p className="text-xs text-red-500 mt-1 font-medium">{errors.drips}</p>}
            </div>

            <div>
              <label htmlFor="faucet-count" className="block text-sm font-semibold text-foreground/80 mb-2">Number of Leaking Faucets</label>
              <input
                id="faucet-count"
                type="number"
                value={faucets}
                onChange={(e) => { setFaucets(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.faucets && <p className="text-xs text-red-500 mt-1 font-medium">{errors.faucets}</p>}
            </div>

            <div>
              <label htmlFor="water-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Water Rate ($ per Gallon)</label>
              <input
                id="water-rate"
                type="number"
                step="0.0001"
                value={rate}
                onChange={(e) => { setRate(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.rate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.rate}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Wastage
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
            <h2 className="text-xl font-bold text-foreground mb-6">Wastage Summary</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Estimated Annual Water Loss</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {Math.round(results.litersPerYear).toLocaleString()} Liters / year
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Equivalent to {Math.round(results.gallonsPerYear).toLocaleString()} US Gallons
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">Daily Loss</span>
                    <span className="block text-xs font-bold text-foreground mt-1 truncate">
                      {results.litersPerDay.toFixed(1)} L ({results.gallonsPerDay.toFixed(1)} gal)
                    </span>
                    <span className="block text-[10px] text-red-500 font-bold mt-1">
                      ${results.costPerDay.toFixed(2)}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">Monthly Loss</span>
                    <span className="block text-xs font-bold text-foreground mt-1 truncate">
                      {results.litersPerMonth.toFixed(0)} L ({results.gallonsPerMonth.toFixed(0)} gal)
                    </span>
                    <span className="block text-[10px] text-red-500 font-bold mt-1">
                      ${results.costPerMonth.toFixed(2)}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">Annual Cost</span>
                    <span className="block text-xs font-bold text-foreground mt-1 truncate">
                      {results.litersPerYear.toFixed(0)} L ({results.gallonsPerYear.toFixed(0)} gal)
                    </span>
                    <span className="block text-[10px] text-red-500 font-bold mt-1">
                      ${results.costPerYear.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter leak specifications.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
