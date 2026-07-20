'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Lawn Mowing Cost Calculator estimates total service billing charges and time requirements based on lawn acreage and machinery speed.`,
  formula: `Mowing job estimations combine property sizes and operating rates:

**1. Mowing Duration ($T$, in hours):**
$$T = \\frac{\\text{Area (acres)}}{\\text{Speed (acres/hour)}}$$

**2. Hourly Service Cost ($C_{hourly}$):**
$$C_{hourly} = T \\times \\text{Hourly Rate}$$

**3. Flat Rate Cost ($C_{flat}$):**
$$C_{flat} = \\text{Area (sq ft)} \\times \\text{Rate per Sq Ft}$$`,
  example: `**Calculate mowing cost for a 2-acre lawn at a speed of 1.5 acres/hour, billed at $60/hour:**
- Mowing Duration $T$ = 2 / 1.5 = **1.33 hours** (80 minutes).
- Mowing Cost = 1.33 × $60 = **$80.00**.`,
  faqs: [
    {
      q: 'How fast can different mowers cut grass?',
      a: 'Push mowers cut about 0.2–0.5 acres per hour. Residential riding mowers average 1.0–1.5 acres per hour, while commercial zero-turn mowers can exceed 2.0–3.0 acres per hour.',
    },
    {
      q: 'What is the average price of professional lawn mowing?',
      a: 'Average prices range from $50 to $100 per hour, or a flat charge of $40–$80 per half-acre, depending on region, slope, and obstacles.',
    },
    {
      q: 'Should I charge by the hour or by square footage?',
      a: 'Most lawn service companies estimate by square footage or acreage to guarantee profit margins, but bill according to hourly labor goals.',
    },
  ],
};

export default function LawnMowingCostCalculator() {
  const [area, setArea] = useState<number>(1);
  const [unit, setUnit] = useState<string>('acres');
  const [speed, setSpeed] = useState<number>(1.2); // acres per hour
  const [hourlyRate, setHourlyRate] = useState<number>(50);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setArea(1);
    setUnit('acres');
    setSpeed(1.2);
    setHourlyRate(50);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(area) && area > 0 &&
                  !isNaN(speed) && speed > 0 &&
                  !isNaN(hourlyRate) && hourlyRate >= 0;

  if (isValid) {
    const acres = unit === 'acres' ? area : area / 43560;
    const hours = acres / speed;
    const minutes = hours * 60;
    const cost = hours * hourlyRate;

    results = {
      acres,
      hours,
      minutes,
      cost,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (area <= 0 || isNaN(area)) newErrors.area = 'Lawn area must be greater than zero';
    if (speed <= 0 || isNaN(speed)) newErrors.speed = 'Mowing speed must be greater than zero';
    if (hourlyRate < 0 || isNaN(hourlyRate)) newErrors.rate = 'Hourly rate cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Lawn & Rate Setup</h2>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="lawn-area-val" className="block text-sm font-semibold text-foreground/80 mb-2">Lawn Size</label>
                <input
                  id="lawn-area-val"
                  type="number"
                  value={area}
                  onChange={(e) => { setArea(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>
              <div>
                <label htmlFor="area-units" className="block text-sm font-semibold text-foreground/80 mb-2">Unit</label>
                <select
                  id="area-units"
                  value={unit}
                  onChange={(e) => { setUnit(e.target.value); setErrors({}); }}
                  className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  <option value="acres">Acres</option>
                  <option value="sqft">Square Feet</option>
                </select>
              </div>
            </div>
            {errors.area && <p className="text-xs text-red-500 mt-1 font-medium">{errors.area}</p>}

            <div>
              <label htmlFor="mower-speed-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Mowing Speed (acres/hour)</label>
              <input
                id="mower-speed-rate"
                type="number"
                step="0.1"
                value={speed}
                onChange={(e) => { setSpeed(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.speed && <p className="text-xs text-red-500 mt-1 font-medium">{errors.speed}</p>}
            </div>

            <div>
              <label htmlFor="mow-hourly-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Billing Rate ($ / hour)</label>
              <input
                id="mow-hourly-rate"
                type="number"
                value={hourlyRate}
                onChange={(e) => { setHourlyRate(Number(e.target.value)); setErrors({}); }}
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
                Solve Cost
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
            <h2 className="text-xl font-bold text-foreground mb-6">Mowing Quotation</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Estimated Mowing Cost</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    ${results.cost.toFixed(2)}
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Based on {results.acres.toFixed(2)} acres total
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Estimated Time Needed:</span>
                  <span className="text-foreground font-bold">
                    {Math.floor(results.hours)}h {Math.round(results.minutes % 60)}m
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter lawn parameters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
