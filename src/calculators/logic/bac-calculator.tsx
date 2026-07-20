'use client';

import React, { useState } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export const seoData = {
  whatIs: `The Blood Alcohol Concentration (BAC) Calculator estimates your blood alcohol level over time based on drinks consumed, gender, body mass, and time elapsed. It uses the clinical Widmark equation to project impairment ranges.`,
  formula: `BAC is estimated using Widmark's formula adjusting for ethanol density and metabolic burn-off rates:

**1. Total Alcohol mass ($A$ in grams):**
$$A = \\text{Volume (ml)} \\times \\text{ABV (\\%)} \\times 0.8$$

**2. Widmark Formula:**
$$BAC_{\\text{raw}} = \\left( \\frac{A}{W \\times 1000 \\times r} \\right) \\times 100$$
Where:
- $W$ is weight in kilograms.
- $r$ is the gender-specific distribution factor:
  - Men: $0.68$
  - Women: $0.55$

**3. Metabolization Correction:**
$$BAC_{\\text{final}} = \\max(0, \\ BAC_{\\text{raw}} - 0.015 \\times T)$$
Where $T$ is time elapsed in hours since drinking started.`,
  example: `**Calculate BAC for an 80 kg male, drinking 3 beers (355ml at 5% ABV) over 2 hours:**
- Alcohol = 3 × 355 × 0.05 × 0.8 = 42.6 grams.
- Distribution factor $r = 0.68$.
- Raw BAC = (42.6 / (80 × 1000 × 0.68)) × 100 = (42.6 / 54400) × 100 ≈ 0.078%.
- Metabolized = 0.015 × 2 = 0.030%.
- Final BAC = 0.078% - 0.030% = **0.048%** (Mild impairment).`,
  faqs: [
    {
      q: 'What is the legal driving BAC limit?',
      a: 'In the United States, Canada, and the United Kingdom, the legal driving limit for adults over 21 is a BAC of 0.08%. In many European countries and Australia, the legal limit is lower at 0.05%.',
    },
    {
      q: 'How long does it take to sober up?',
      a: 'The human body metabolizes alcohol at a constant rate of approximately 0.015% BAC per hour. There is no way to speed up this process (e.g. through coffee, cold showers, or exercise).',
    },
    {
      q: 'What counts as "one standard drink"?',
      a: 'A standard drink contains 14 grams of pure alcohol. This is typically 12 oz of regular beer (5% ABV), 5 oz of table wine (12% ABV), or 1.5 oz of spirits/liquor (40% ABV).',
    },
  ],
};

type Gender = 'male' | 'female';
type System = 'metric' | 'imperial';

export default function BacCalculator() {
  const [system, setSystem] = useState<System>('metric');
  const [gender, setGender] = useState<Gender>('male');

  // Metric weight
  const [weightKg, setWeightKg] = useState<number>(70);
  // Imperial weight
  const [weightLbs, setWeightLbs] = useState<number>(154);

  const [beers, setBeers] = useState<number>(0);
  const [wines, setWines] = useState<number>(0);
  const [shots, setShots] = useState<number>(0);
  const [hours, setHours] = useState<number>(1);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setSystem('metric');
    setGender('male');
    setWeightKg(70);
    setWeightLbs(154);
    setBeers(0);
    setWines(0);
    setShots(0);
    setHours(1);
    setErrors({});
  };

  const w = system === 'metric' ? weightKg : weightLbs * 0.45359237;
  const isValid = w > 0 && !isNaN(hours) && hours >= 0;

  let results = null;
  if (isValid) {
    // Standard drinks math
    // 1 Beer = 355 ml @ 5% = 17.75 ml alcohol
    // 1 Wine = 148 ml @ 12% = 17.76 ml alcohol
    // 1 Shot = 44 ml @ 40% = 17.6 ml alcohol
    const totalVolAlcohol = (beers * 355 * 0.05) + (wines * 148 * 0.12) + (shots * 44 * 0.40);
    const alcoholGrams = totalVolAlcohol * 0.8;

    const r = gender === 'male' ? 0.68 : 0.55;
    
    // Widmark formula
    const rawBac = (alcoholGrams / (w * 1000 * r)) * 100;
    
    // Metabolization over time
    const finalBac = Math.max(0, rawBac - (0.015 * hours));

    // Determine status
    let status = 'Sober';
    let alertColor = 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
    if (finalBac > 0) {
      if (finalBac < 0.02) {
        status = 'Normal/No Impairment';
      } else if (finalBac < 0.05) {
        status = 'Mild Impairment';
        alertColor = 'text-teal-500 bg-teal-500/10 border-teal-500/20';
      } else if (finalBac < 0.08) {
        status = 'Moderate Impairment (Coordination Declining)';
        alertColor = 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      } else if (finalBac < 0.15) {
        status = 'Legally Impaired / Drunk';
        alertColor = 'text-orange-500 bg-orange-500/10 border-orange-500/20';
      } else {
        status = 'High Risk / Severe Impairment';
        alertColor = 'text-red-500 bg-red-500/10 border-red-500/20';
      }
    }

    results = {
      bac: finalBac,
      status,
      alertColor,
      isImpaired: finalBac >= 0.08,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (system === 'metric' && (weightKg <= 0 || isNaN(weightKg))) newErrors.weight = 'Weight must be greater than zero';
    if (system === 'imperial' && (weightLbs <= 0 || isNaN(weightLbs))) newErrors.weight = 'Weight must be greater than zero';
    if (hours < 0 || isNaN(hours)) newErrors.hours = 'Hours elapsed cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Drinks & Body Stats</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setSystem('metric'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                system === 'metric'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Metric
            </button>
            <button
              type="button"
              onClick={() => { setSystem('imperial'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                system === 'imperial'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Imperial
            </button>
          </div>

          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <span className="block text-xs font-semibold text-foreground/80 mb-2">Gender</span>
                <div className="flex gap-2">
                  {['male', 'female'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g as Gender)}
                      className={`flex-1 py-2.5 text-xs font-bold rounded-xl border cursor-pointer capitalize transition-all ${
                        gender === g
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border bg-background hover:bg-border text-foreground/70'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>

              {system === 'metric' ? (
                <div>
                  <label htmlFor="weight-kg" className="block text-xs font-semibold text-foreground/80 mb-2">Weight (kg)</label>
                  <input
                    id="weight-kg"
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="block w-full py-2.5 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.weight && <p className="text-xs text-red-500 mt-1 font-medium">{errors.weight}</p>}
                </div>
              ) : (
                <div>
                  <label htmlFor="weight-lbs" className="block text-xs font-semibold text-foreground/80 mb-2">Weight (lbs)</label>
                  <input
                    id="weight-lbs"
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="block w-full py-2.5 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.weight && <p className="text-xs text-red-500 mt-1 font-medium">{errors.weight}</p>}
                </div>
              )}
            </div>

            <div className="grid grid-cols-3 gap-3 border-t border-border/40 pt-4">
              <div>
                <label htmlFor="beers-count" className="block text-[10px] font-semibold text-foreground/80 mb-1.5">Beers (12oz, 5%)</label>
                <input
                  id="beers-count"
                  type="number"
                  value={beers}
                  onChange={(e) => setBeers(Math.max(0, Number(e.target.value)))}
                  className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/85"
                />
              </div>

              <div>
                <label htmlFor="wines-count" className="block text-[10px] font-semibold text-foreground/80 mb-1.5">Wine (5oz, 12%)</label>
                <input
                  id="wines-count"
                  type="number"
                  value={wines}
                  onChange={(e) => setWines(Math.max(0, Number(e.target.value)))}
                  className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/85"
                />
              </div>

              <div>
                <label htmlFor="shots-count" className="block text-[10px] font-semibold text-foreground/80 mb-1.5">Shots (1.5oz, 40%)</label>
                <input
                  id="shots-count"
                  type="number"
                  value={shots}
                  onChange={(e) => setShots(Math.max(0, Number(e.target.value)))}
                  className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/85"
                />
              </div>
            </div>

            <div>
              <label htmlFor="hours-elapsed" className="block text-xs font-semibold text-foreground/80 mb-2">Time Since First Drink (Hours)</label>
              <input
                id="hours-elapsed"
                type="number"
                value={hours}
                onChange={(e) => setHours(Number(e.target.value))}
                className="block w-full py-2.5 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.hours && <p className="text-xs text-red-500 mt-1 font-medium">{errors.hours}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve BAC
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
            <h2 className="text-xl font-bold text-foreground mb-6 font-mono">Impairment Output</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Estimated BAC Level</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.bac.toFixed(3)}%
                  </span>
                </div>

                <div className={`p-4 rounded-xl border flex gap-3 items-center ${results.alertColor}`}>
                  {results.isImpaired && <AlertTriangle className="h-5 w-5 shrink-0" />}
                  <div>
                    <span className="block text-xs font-bold uppercase tracking-wider">Status Classification</span>
                    <span className="block text-sm font-semibold mt-0.5">{results.status}</span>
                  </div>
                </div>

                {results.isImpaired && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-xs font-semibold text-red-500">
                    ⚠️ You are over the legal driving limit of 0.08% BAC. Do not drive or operate machinery.
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter drink and time parameters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
