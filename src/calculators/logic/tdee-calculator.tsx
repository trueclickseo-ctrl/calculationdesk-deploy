'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Total Daily Energy Expenditure (TDEE) Calculator determines the total number of calories your body burns per day based on your basal metabolism, physical activity frequency, and digestive thermal energy costs.`,
  formula: `TDEE combines BMR with activity adjustments and digestion thermic effect:

**1. Basal Metabolic Rate (BMR):**
- Computed via the Mifflin-St Jeor equation.

**2. TDEE = BMR × Activity Multiplier:**
- Sedentary: $1.2$
- Lightly Active: $1.375$
- Moderately Active: $1.55$
- Very Active: $1.725$
- Extra Active: $1.9$

**3. Metabolism Component Breakdown:**
- Basal Metabolism (BMR): $\\approx 70\\%$ of TDEE
- Thermic Effect of Food (TEF): $\\approx 10\\%$ of TDEE
- Physical Activity (PA): $\\approx 20\\%$ of TDEE`,
  example: `**Calculate TDEE for a moderately active male with BMR of 1,800 calories/day:**
- Activity factor = 1.55.
- TDEE = 1,800 × 1.55 = **2,790 calories/day**.
- Basal Metabolism component = 1,800 kcal (64.5%).
- Thermic digestion component (10%) ≈ 279 kcal.
- Physical activity component ≈ 711 kcal.`,
  faqs: [
    {
      q: 'What is Total Daily Energy Expenditure (TDEE)?',
      a: 'TDEE is the total energy in calories that you burn in a 24-hour day, including basal metabolism, exercise, daily movement, and digestion.',
    },
    {
      q: 'What is the Thermic Effect of Food (TEF)?',
      a: 'TEF is the energy required for digesting, absorbing, and storing nutrients from food. It typically accounts for about 10% of your daily calorie expenditure.',
    },
    {
      q: 'How does activity level affect TDEE?',
      a: 'The more active you are, the higher your TDEE will be. Choosing the correct activity level is key to establishing an accurate daily calorie budget.',
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

export default function TdeeCalculator() {
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

  const [activity, setActivity] = useState<number>(1.55); // Moderately Active default

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
    setActivity(1.55);
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

    // Components
    const tef = tdee * 0.10;
    const pa = tdee - bmr - tef;

    results = {
      tdee: Math.round(tdee),
      bmr: Math.round(bmr),
      tef: Math.round(tef),
      pa: Math.round(Math.max(0, pa)),
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
                Solve TDEE
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
            <h2 className="text-xl font-bold text-foreground mb-6 font-mono">TDEE Output</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Total Daily Energy Expenditure (TDEE)</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.tdee.toLocaleString()} kcal / day
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-2">
                  <span className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mb-2">Metabolic Components</span>
                  <div className="flex justify-between items-center text-xs font-semibold border-b border-border/40 pb-1.5 last:border-b-0 last:pb-0">
                    <span className="text-foreground/60">Basal Metabolism (BMR)</span>
                    <span className="text-foreground">{results.bmr.toLocaleString()} kcal</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold border-b border-border/40 pb-1.5 last:border-b-0 last:pb-0">
                    <span className="text-foreground/60">Thermic Effect of Food (TEF)</span>
                    <span className="text-foreground">{results.tef.toLocaleString()} kcal</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold border-b border-border/40 pb-1.5 last:border-b-0 last:pb-0">
                    <span className="text-foreground/60">Physical Activity (PA)</span>
                    <span className="text-foreground">{results.pa.toLocaleString()} kcal</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter stats to estimate TDEE.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
