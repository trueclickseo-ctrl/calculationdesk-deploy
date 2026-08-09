'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Cattle per Acre Calculator estimates recommended pasture stocking rates and total head of cattle allowed based on grass forage yield and grazing timelines.`,
  formula: `Stocking calculations balance pasture growth with animal consumption:

**1. Daily Forage Needed per Animal ($F_{daily}$, in lbs):**
$$F_{daily} = \\text{Cow Weight} \\times \\left(\\frac{\\text{Consumption \\%}}{100}\\right)$$

**2. Total Forage Available ($F_{total}$, in lbs):**
$$F_{total} = \\text{Pasture Size (acres)} \\times \\text{Forage Yield (lbs/acre)}$$

**3. Maximum Stocking Capacity (Cows):**
$$\\text{Stocking Capacity} = \\frac{F_{total}}{F_{daily} \\times \\text{Grazing Duration (days)}}$$`,
  example: `**Size a stocking rate for a 50-acre pasture yielding 3,000 lbs/acre of forage, for 1,200 lb cows eating 2.5% daily, grazing for 90 days:**
- Daily intake = 1,200 × 0.025 = 30 lbs/day.
- Total consumption per cow = 30 × 90 = 2,700 lbs.
- Total pasture forage = 50 × 3,000 = 150,000 lbs.
- Max Cattle = 150,000 / 2,700 = **55 Head of Cattle** (approx 1.1 cows per acre).`,
  faqs: [
    {
      q: 'What is a typical stocking rate for beef cattle?',
      a: 'Stocking rates vary drastically by climate and grass type. In fertile regions, it can be 1–2 acres per cow, while in dry, arid western ranges, it can exceed 30–100 acres per cow.',
    },
    {
      q: 'What is the "take half, leave half" rule?',
      a: 'This is a standard conservation rule. To maintain pasture health, you should only plan to feed cattle 50% of the standing forage. The other 50% must remain to allow the grass to photosynthesize and regrow.',
    },
    {
      q: 'How does rotational grazing affect stocking rates?',
      a: 'Rotational grazing divides pastures into smaller paddocks, allowing grass to rest and regrow. It can increase pasture yield by 30% to 50%, effectively boosting the number of cattle you can stock.',
    },
  ],
};

export default function CattlePerAcreCalculator() {
  const [area, setArea] = useState<number>(50);
  const [yieldLbs, setYieldLbs] = useState<number>(3000);
  const [weight, setWeight] = useState<number>(1200);
  const [consumption, setConsumption] = useState<number>(2.5); // % of body weight
  const [days, setDays] = useState<number>(90);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setArea(50);
    setYieldLbs(3000);
    setWeight(1200);
    setConsumption(2.5);
    setDays(90);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(area) && area > 0 &&
                  !isNaN(yieldLbs) && yieldLbs > 0 &&
                  !isNaN(weight) && weight > 0 &&
                  !isNaN(consumption) && consumption > 0 &&
                  !isNaN(days) && days > 0;

  if (isValid) {
    // Implementing 50% use factor (take half, leave half) as standard safe pasture management
    const totalForage = area * yieldLbs;
    const availableForage = totalForage * 0.5; // 50% usable forage

    const dailyForagePerCow = weight * (consumption / 100);
    const totalForagePerCow = dailyForagePerCow * days;

    const maxCattle = Math.floor(availableForage / totalForagePerCow);
    const stockingRate = maxCattle > 0 ? area / maxCattle : 0;

    results = {
      totalForage,
      availableForage,
      dailyForagePerCow,
      totalForagePerCow,
      maxCattle,
      stockingRate,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (area <= 0 || isNaN(area)) newErrors.area = 'Pasture area must be greater than zero';
    if (yieldLbs <= 0 || isNaN(yieldLbs)) newErrors.yieldLbs = 'Forage yield must be greater than zero';
    if (weight <= 0 || isNaN(weight)) newErrors.weight = 'Animal weight must be greater than zero';
    if (consumption <= 0 || isNaN(consumption)) newErrors.consumption = 'Consumption must be greater than zero';
    if (days <= 0 || isNaN(days)) newErrors.days = 'Grazing days must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Pasture & Herd Setup</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pasture-size-val" className="block text-sm font-semibold text-foreground/80 mb-2">Pasture (acres)</label>
                <input
                  id="pasture-size-val"
                  type="number"
                  value={area}
                  onChange={(e) => { setArea(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.area && <p className="text-xs text-red-500 mt-1 font-medium">{errors.area}</p>}
              </div>

              <div>
                <label htmlFor="pasture-yield-val" className="block text-sm font-semibold text-foreground/80 mb-2">Yield (lbs/acre)</label>
                <input
                  id="pasture-yield-val"
                  type="number"
                  value={yieldLbs}
                  onChange={(e) => { setYieldLbs(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.yieldLbs && <p className="text-xs text-red-500 mt-1 font-medium">{errors.yieldLbs}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2">
                <label htmlFor="cow-weight-val" className="block text-sm font-semibold text-foreground/80 mb-2">Avg Cow Weight (lbs)</label>
                <input
                  id="cow-weight-val"
                  type="number"
                  value={weight}
                  onChange={(e) => { setWeight(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.weight && <p className="text-xs text-red-500 mt-1 font-medium">{errors.weight}</p>}
              </div>

              <div>
                <label htmlFor="cow-intake-val" className="block text-sm font-semibold text-foreground/80 mb-2">Eat (%)</label>
                <input
                  id="cow-intake-val"
                  type="number"
                  step="0.1"
                  value={consumption}
                  onChange={(e) => { setConsumption(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center"
                />
                {errors.consumption && <p className="text-xs text-red-500 mt-1 font-medium">{errors.consumption}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="graze-duration-val" className="block text-sm font-semibold text-foreground/80 mb-2">Grazing Duration (days)</label>
              <input
                id="graze-duration-val"
                type="number"
                value={days}
                onChange={(e) => { setDays(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.days && <p className="text-xs text-red-500 mt-1 font-medium">{errors.days}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Stocking
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
            <h2 className="text-xl font-bold text-foreground mb-6">Stocking Forecast</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Estimated Herd Capacity</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.maxCattle} Head of Cattle
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    ≈ {results.stockingRate.toFixed(2)} acres per cow (using default 50% usable-forage assumption)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Pasture Forage</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.totalForage.toLocaleString()} lbs</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">50% Usable Forage</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.availableForage.toLocaleString()} lbs</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter pasture pasture parameters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
