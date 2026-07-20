'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Blood Volume Calculator estimates the total volume of blood in your body using the clinically recognized Nadler equations, which account for gender, height, and body mass.`,
  formula: `Blood volume (BV in Liters) is computed via Nadler's equations (with height $H$ in meters and weight $W$ in kg):

**1. Male Formula:**
$$BV = 0.3669 \\times H^3 + 0.03219 \\times W + 0.6041$$

**2. Female Formula:**
$$BV = 0.3561 \\times H^3 + 0.03308 \\times W + 0.1833$$`,
  example: `**Calculate blood volume for a male: Height = 175 cm (1.75 m), Weight = 70 kg:**
- BV = 0.3669(1.75³) + 0.03219(70) + 0.6041 = 0.3669(5.359) + 2.2533 + 0.6041 = 1.966 + 2.2533 + 0.6041 = **4.82 Liters**.`,
  faqs: [
    {
      q: 'Why does blood volume vary between men and women?',
      a: 'Adult males generally have lower body fat percentages and higher muscle mass percentages than females. Muscle tissue contains a higher volume of blood vessels than adipose (fat) tissue, leading to larger relative blood volume in males.',
    },
    {
      q: 'How much blood do standard blood donations draw?',
      a: 'A standard blood donation draws approximately 450 milliliters (0.45 Liters) of whole blood, which is about 8% to 10% of an average adult\'s total blood volume.',
    },
    {
      q: 'How does the body replace lost blood?',
      a: 'The plasma volume is typically replaced within 24 to 48 hours via water absorption. Red blood cells take longer, usually around 4 to 6 weeks, which is why donations are spaced out.',
    },
  ],
};

type Gender = 'male' | 'female';
type System = 'metric' | 'imperial';

export default function BloodVolumeCalculator() {
  const [system, setSystem] = useState<System>('metric');
  const [gender, setGender] = useState<Gender>('male');

  // Metric states
  const [weightKg, setWeightKg] = useState<number>(70);
  const [heightCm, setHeightCm] = useState<number>(175);

  // Imperial states
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setSystem('metric');
    setGender('male');
    setWeightKg(70);
    setHeightCm(175);
    setWeightLbs(154);
    setHeightFt(5);
    setHeightIn(9);
    setErrors({});
  };

  // Convert inputs to metric values for calculation
  const w = system === 'metric' ? weightKg : weightLbs * 0.45359237;
  const h = system === 'metric' ? heightCm : (heightFt * 12 + heightIn) * 2.54;

  const isValid = w > 0 && h > 0;

  let results = null;
  if (isValid) {
    const heightM = h / 100;
    
    // Nadler's Formula
    const bv = gender === 'male'
      ? 0.3669 * Math.pow(heightM, 3) + 0.03219 * w + 0.6041
      : 0.3561 * Math.pow(heightM, 3) + 0.03308 * w + 0.1833;

    const pints = bv * 2.11337642;

    results = {
      liters: bv,
      milliliters: bv * 1000,
      pints,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (system === 'metric') {
      if (weightKg <= 0) newErrors.weight = 'Weight must be greater than zero';
      if (heightCm <= 0) newErrors.height = 'Height must be greater than zero';
    } else {
      if (weightLbs <= 0) newErrors.weight = 'Weight must be greater than zero';
      if (heightFt < 0 || heightIn < 0 || isNaN(heightFt) || isNaN(heightIn)) newErrors.height = 'Height must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground">Physique Data</h2>

          <div className="flex gap-1.5 my-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setSystem('metric'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                system === 'metric'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Metric Units
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
              Imperial Units
            </button>
          </div>

          <div className="space-y-5">
            <div>
              <span className="block text-sm font-semibold text-foreground/80 mb-2">Gender</span>
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

            <div className="grid grid-cols-2 gap-4">
              {system === 'metric' ? (
                <div>
                  <label htmlFor="weight-kg" className="block text-sm font-semibold text-foreground/80 mb-2">Weight (kg)</label>
                  <input
                    id="weight-kg"
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.weight && <p className="text-xs text-red-500 mt-1 font-medium">{errors.weight}</p>}
                </div>
              ) : (
                <div>
                  <label htmlFor="weight-lbs" className="block text-sm font-semibold text-foreground/80 mb-2">Weight (lbs)</label>
                  <input
                    id="weight-lbs"
                    type="number"
                    value={weightLbs}
                    onChange={(e) => setWeightLbs(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.weight && <p className="text-xs text-red-500 mt-1 font-medium">{errors.weight}</p>}
                </div>
              )}

              {system === 'metric' ? (
                <div>
                  <label htmlFor="height-cm" className="block text-sm font-semibold text-foreground/80 mb-2">Height (cm)</label>
                  <input
                    id="height-cm"
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
                </div>
              ) : (
                <div>
                  <span className="block text-sm font-semibold text-foreground/80 mb-2">Height</span>
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                      placeholder="Ft"
                    />
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                      placeholder="In"
                    />
                  </div>
                  {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
                </div>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Blood Volume
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
            <h2 className="text-xl font-bold text-foreground mb-6">Volume Output</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Estimated Total Blood Volume</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.liters.toFixed(2)} Liters
                  </span>
                  <span className="block text-[10px] text-foreground/45 mt-0.5 font-semibold">
                    (Approx. {results.milliliters.toLocaleString(undefined, { maximumFractionDigits: 0 })} ml &nbsp;|&nbsp; {results.pints.toFixed(1)} US Pints)
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter stats to estimate blood volume.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
