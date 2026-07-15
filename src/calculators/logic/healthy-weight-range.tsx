'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Healthy Weight Calculator estimates your healthy body mass range based on the World Health Organization (WHO) BMI limits. If you provide your current weight, it also calculates the amount of weight you need to gain or lose to reach this range.`,
  formula: `Healthy weight bounds are solved using standard BMI limits (with height $H$ in meters):

**1. Lower Healthy Weight Limit (BMI = 18.5):**
$$\\text{Weight}_{\\text{min}} = 18.5 \\times H^2$$

**2. Upper Healthy Weight Limit (BMI = 24.9):**
$$\\text{Weight}_{\\text{max}} = 24.9 \\times H^2$$

**3. Body Mass Index (BMI):**
$$BMI = \\frac{\\text{Weight}}{\\text{Height}^2}$$`,
  example: `**Calculate healthy weight bounds for a 1.80 meter (180 cm) individual:**
- Min weight = 18.5 × 1.80² = **59.9 kg** (approx. 132.1 lbs).
- Max weight = 24.9 × 1.80² = **80.7 kg** (approx. 177.9 lbs).
- Healthy Weight Range = **59.9 kg to 80.7 kg**.`,
  faqs: [
    {
      q: 'What is a healthy BMI range?',
      a: 'A standard healthy BMI for adults ranges from 18.5 to 24.9. A BMI below 18.5 is considered underweight, 25 to 29.9 is overweight, and 30 or above is obese.',
    },
    {
      q: 'Are BMI ranges the same for men and women?',
      a: 'Yes, the WHO BMI classifications apply equally to adult men and women, regardless of gender, though body composition differences exist.',
    },
    {
      q: 'What are the limitations of BMI?',
      a: 'BMI only uses height and weight, so it does not distinguish between muscle mass and fat tissue. Athletes with high muscle mass may have an "overweight" or "obese" BMI despite having low body fat.',
    },
  ],
};

type System = 'metric' | 'imperial';

export default function HealthyWeightCalculator() {
  const [system, setSystem] = useState<System>('metric');

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
    const bmiMin = 18.5 * (heightM * heightM);
    const bmiMax = 24.9 * (heightM * heightM);

    const currentBmi = w / (heightM * heightM);

    let status = 'Normal Weight';
    let weightDiff = 0;
    let action = 'maintain';

    if (currentBmi < 18.5) {
      status = 'Underweight';
      weightDiff = bmiMin - w;
      action = 'gain';
    } else if (currentBmi >= 25 && currentBmi < 30) {
      status = 'Overweight';
      weightDiff = w - bmiMax;
      action = 'lose';
    } else if (currentBmi >= 30) {
      status = 'Obese';
      weightDiff = w - bmiMax;
      action = 'lose';
    }

    results = {
      bmiMin,
      bmiMax,
      currentBmi,
      status,
      weightDiff,
      action,
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

  const formatWeight = (kg: number) => {
    if (system === 'metric') {
      return `${kg.toFixed(1)} kg`;
    } else {
      const lbs = kg * 2.20462262;
      return `${lbs.toFixed(1)} lbs`;
    }
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Physique Data</h2>

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
                Solve Range
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
            <h2 className="text-xl font-bold text-foreground mb-6">Healthy weight bounds</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">WHO Recommended Weight Range</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {formatWeight(results.bmiMin)} – {formatWeight(results.bmiMax)}
                  </span>
                  <span className="block text-[10px] text-foreground/45 mt-0.5 font-semibold">
                    (Standard Healthy BMI Range: 18.5 – 24.9)
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Current BMI</span>
                    <span className="block text-lg font-bold text-foreground mt-1">{results.currentBmi.toFixed(1)}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Weight Status</span>
                    <span className="block text-lg font-bold text-foreground mt-1">{results.status}</span>
                  </div>
                </div>

                {results.weightDiff > 0 && (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs font-semibold flex justify-between items-center text-amber-700 dark:text-amber-500">
                    <span>Target change needed to reach normal BMI:</span>
                    <span className="font-extrabold">
                      {results.action === 'lose' ? 'Lose ' : 'Gain '} {formatWeight(results.weightDiff)}
                    </span>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter height & weight data.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
