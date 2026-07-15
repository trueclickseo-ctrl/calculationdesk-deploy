'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Calorie Calculator estimates the daily energy requirements (in calories) your body needs to maintain, lose, or gain weight. It combines your Basal Metabolic Rate (BMR) with activity level factors to calculate your Total Daily Energy Expenditure (TDEE).`,
  formula: `Calorie budgets are based on BMR multiplied by activity factors:

**1. TDEE = BMR × Activity Factor:**
- Sedentary (little to no exercise): $1.200$
- Lightly active (light exercise 1–3 days/wk): $1.375$
- Moderately active (moderate exercise 3–5 days/wk): $1.550$
- Very active (hard exercise 6–7 days/wk): $1.725$
- Extra active (very hard exercise & physical job): $1.900$

**2. Target Budgets:**
- Maintenance: $\\text{TDEE}$
- Weight Loss: $\\text{TDEE} - 500 \\text{ kcal/day}$ (approx. 0.5 kg loss per week)
- Weight Gain: $\\text{TDEE} + 500 \\text{ kcal/day}$ (approx. 0.5 kg gain per week)`,
  example: `**Calculate calorie target for a sedentary female with BMR of 1,400 calories/day:**
- Activity factor = 1.2.
- Maintenance (TDEE) = 1,400 × 1.2 = **1,680 calories/day**.
- Weight Loss target = 1,680 - 500 = **1,180 calories/day**.`,
  faqs: [
    {
      q: 'What is a calorie deficit?',
      a: 'A calorie deficit is when you consume fewer calories than your TDEE, forcing your body to burn stored fat to meet its remaining energy demands, resulting in weight loss.',
    },
    {
      q: 'How many calories are in one pound of fat?',
      a: 'Approximately 3,500 calories. A daily deficit of 500 calories leads to a total weekly deficit of 3,500 calories, resulting in about 1 pound (0.45 kg) of fat loss per week.',
    },
    {
      q: 'What is the absolute minimum calorie intake suggested?',
      a: 'Generally, it is clinically recommended not to drop below 1,200 calories per day for women or 1,500 calories per day for men, unless under close medical supervision, to ensure adequate nutrient intake.',
    },
  ],
};

type Gender = 'male' | 'female';
type System = 'metric' | 'imperial';

interface ActivityLevel {
  value: number;
  label: string;
  desc: string;
}

const ACTIVITIES: ActivityLevel[] = [
  { value: 1.2, label: 'Sedentary', desc: 'Little or no exercise' },
  { value: 1.375, label: 'Lightly Active', desc: 'Light exercise 1-3 days/week' },
  { value: 1.55, label: 'Moderately Active', desc: 'Moderate exercise 3-5 days/week' },
  { value: 1.725, label: 'Very Active', desc: 'Hard exercise 6-7 days/week' },
  { value: 1.9, label: 'Extra Active', desc: 'Very hard exercise or physical job' }
];

export default function CalorieCalculator() {
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

  const [activity, setActivity] = useState<number>(1.2);

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
    setActivity(1.2);
    setErrors({});
  };

  // Convert helpers
  const w = system === 'metric' ? weightKg : weightLbs * 0.45359237;
  const h = system === 'metric' ? heightCm : (heightFt * 12 + heightIn) * 2.54;

  const isValid = !isNaN(w) && w > 0 && !isNaN(h) && h > 0 && !isNaN(age) && age > 0;

  let results = null;
  if (isValid) {
    const bmr = gender === 'male'
      ? 10 * w + 6.25 * h - 5 * age + 5
      : 10 * w + 6.25 * h - 5 * age - 161;

    const tdee = bmr * activity;

    results = {
      tdee: Math.round(tdee),
      loss: Math.round(tdee - 500),
      gain: Math.round(tdee + 500),
      bmr: Math.round(bmr),
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
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Physique & Activity</h2>

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
              <div>
                <span className="block text-xs font-semibold text-foreground/80 mb-2">Gender</span>
                <div className="flex gap-2">
                  {['male', 'female'].map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g as Gender)}
                      className={`flex-1 py-2 text-xs font-bold rounded-xl border cursor-pointer capitalize transition-all ${
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

              <div>
                <label htmlFor="age-num" className="block text-xs font-semibold text-foreground/80 mb-2">Age</label>
                <input
                  id="age-num"
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.age && <p className="text-xs text-red-500 mt-1 font-medium">{errors.age}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {system === 'metric' ? (
                <div>
                  <label htmlFor="weight-kg" className="block text-xs font-semibold text-foreground/80 mb-2">Weight (kg)</label>
                  <input
                    id="weight-kg"
                    type="number"
                    value={weightKg}
                    onChange={(e) => setWeightKg(Number(e.target.value))}
                    className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
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
                    className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.weight && <p className="text-xs text-red-500 mt-1 font-medium">{errors.weight}</p>}
                </div>
              )}

              {system === 'metric' ? (
                <div>
                  <label htmlFor="height-cm" className="block text-xs font-semibold text-foreground/80 mb-2">Height (cm)</label>
                  <input
                    id="height-cm"
                    type="number"
                    value={heightCm}
                    onChange={(e) => setHeightCm(Number(e.target.value))}
                    className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                  {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
                </div>
              ) : (
                <div>
                  <span className="block text-xs font-semibold text-foreground/80 mb-2">Height</span>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={heightFt}
                      onChange={(e) => setHeightFt(Number(e.target.value))}
                      className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                      placeholder="Ft"
                    />
                    <input
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="block w-full py-2 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                      placeholder="In"
                    />
                  </div>
                  {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
                </div>
              )}
            </div>

            <div>
              <label htmlFor="activity-select" className="block text-xs font-semibold text-foreground/80 mb-2">Activity Level</label>
              <select
                id="activity-select"
                value={activity}
                onChange={(e) => setActivity(Number(e.target.value))}
                className="block w-full py-2.5 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
              >
                {ACTIVITIES.map((act) => (
                  <option key={act.value} value={act.value}>
                    {act.label} ({act.desc})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Calories
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
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Daily Target Calories</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Weight Maintenance (TDEE)</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.tdee.toLocaleString()} kcal / day
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Weight Loss</span>
                    <span className="block text-base font-bold text-red-500 mt-1">
                      {results.loss.toLocaleString()} kcal
                    </span>
                    <span className="block text-[9px] text-foreground/45 mt-0.5">-500 kcal deficit</span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Weight Gain</span>
                    <span className="block text-base font-bold text-emerald-500 mt-1">
                      {results.gain.toLocaleString()} kcal
                    </span>
                    <span className="block text-[9px] text-foreground/45 mt-0.5">+500 kcal surplus</span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between">
                  <span className="text-xs font-semibold text-foreground/50 uppercase">Basal Metabolic Rate (BMR)</span>
                  <span className="text-sm font-bold text-foreground">{results.bmr.toLocaleString()} kcal</span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter physique parameters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
