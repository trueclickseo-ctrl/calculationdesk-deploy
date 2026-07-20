'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Basal Metabolic Rate (BMR) Calculator estimates the number of calories your body burns at rest to maintain basic physiological functions (like breathing, circulation, and cell production). It supports both the modern Mifflin-St Jeor equation and the revised Harris-Benedict formula.`,
  formula: `BMR formulas are tailored by gender, age, height, and weight:

**1. Mifflin-St Jeor Equation (Recommended):**
- Men:
  $$BMR = 10 \\times W + 6.25 \\times H - 5 \\times A + 5$$
- Women:
  $$BMR = 10 \\times W + 6.25 \\times H - 5 \\times A - 161$$

**2. Revised Harris-Benedict Equation:**
- Men:
  $$BMR = 13.397 \\times W + 4.799 \\times H - 5.677 \\times A + 88.362$$
- Women:
  $$BMR = 9.247 \\times W + 3.098 \\times H - 4.330 \\times A + 447.593$$

Where:
- **W** is weight in kilograms.
- **H** is height in centimeters.
- **A** is age in years.`,
  example: `**Calculate BMR for a 30-year-old male, 180 cm tall, weighing 80 kg:**
- Weight = 80 kg, Height = 180 cm, Age = 30.
- Mifflin-St Jeor BMR = 10(80) + 6.25(180) - 5(30) + 5 = 800 + 1125 - 150 + 5 = **1,780 calories/day**.`,
  faqs: [
    {
      q: 'What is Basal Metabolic Rate (BMR)?',
      a: 'BMR represents the minimum amount of energy (calories) required to keep your body functioning at complete rest in a temperate environment, with your digestive system inactive.',
    },
    {
      q: 'What is the difference between BMR and TDEE?',
      a: 'BMR is the energy spent at rest with zero activity. Total Daily Energy Expenditure (TDEE) accounts for BMR plus the energy expended during physical activities (working, exercising, walking) and digestion.',
    },
    {
      q: 'Which formula is more accurate?',
      a: 'The Mifflin-St Jeor formula is widely considered by clinical dietitians to be more accurate and is the current standard, whereas the older Harris-Benedict equation tends to slightly overestimate calorie requirements.',
    },
  ],
};

type Gender = 'male' | 'female';
type System = 'metric' | 'imperial';

export default function BmrCalculator() {
  const [system, setSystem] = useState<System>('metric');
  const [gender, setGender] = useState<Gender>('male');
  const [age, setAge] = useState<number>(25);

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
    setAge(25);
    setWeightKg(70);
    setHeightCm(175);
    setWeightLbs(154);
    setHeightFt(5);
    setHeightIn(9);
    setErrors({});
  };

  // Unit conversion helpers
  const w = system === 'metric' ? weightKg : weightLbs * 0.45359237;
  const h = system === 'metric' ? heightCm : (heightFt * 12 + heightIn) * 2.54;

  const isValid = !isNaN(w) && w > 0 && !isNaN(h) && h > 0 && !isNaN(age) && age > 0;

  let results = null;
  if (isValid) {
    // Mifflin-St Jeor
    const mifflin = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * age + 5
      : 10 * w + 6.25 * h - 5 * age - 161;

    // Harris-Benedict
    const harris = gender === 'male'
      ? 13.397 * w + 4.799 * h - 5.677 * age + 88.362
      : 9.247 * w + 3.098 * h - 4.330 * age + 447.593;

    results = {
      mifflin: Math.round(mifflin),
      harris: Math.round(harris),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (age <= 0 || isNaN(age)) newErrors.age = 'Age must be greater than zero';
    if (system === 'metric') {
      if (weightKg <= 0 || isNaN(weightKg)) newErrors.weight = 'Weight must be greater than zero';
      if (heightCm <= 0 || isNaN(heightCm)) newErrors.height = 'Height must be greater than zero';
    } else {
      if (weightLbs <= 0 || isNaN(weightLbs)) newErrors.weight = 'Weight must be greater than zero';
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
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
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
              <div>
                <label htmlFor="age-num" className="block text-sm font-semibold text-foreground/80 mb-2">Age (Years)</label>
                <input
                  id="age-num"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.age && <p className="text-xs text-red-500 mt-1 font-medium">{errors.age}</p>}
              </div>

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
            </div>

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
                <span className="block text-sm font-semibold text-foreground/80 mb-2">Height (feet & inches)</span>
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

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve BMR
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
            <h2 className="text-xl font-bold text-foreground mb-6">Daily Energy Base</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Mifflin-St Jeor BMR</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.mifflin.toLocaleString()} kcal / day
                  </span>
                </div>

                <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Revised Harris-Benedict BMR</span>
                  <span className="block text-2xl font-extrabold text-accent mt-1">
                    {results.harris.toLocaleString()} kcal / day
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter physique statistics.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
