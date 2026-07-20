'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Water Intake Calculator estimates your recommended daily water consumption volume to prevent dehydration. It adjusts baseline fluid requirements using body weight, daily exercise durations, and ambient climate temperatures.`,
  formula: `Fluid calculations scale with metabolic mass, physical activity, and sweat rate:

**1. Baseline Water Requirement:**
- Metric:
  $$\\text{Base (ml)} = \\text{Weight (kg)} \\times 35$$
- Imperial:
  $$\\text{Base (oz)} = \\text{Weight (lbs)} \\times 0.5$$

**2. Exercise Adjustment:**
- Add $350 \\text{ ml}$ ($12 \\text{ oz}$) for every 30 minutes of physical workout activity.

**3. Climate Temperature Adjustment:**
- Hot / Humid climate: Add $500 \\text{ ml}$ ($17 \\text{ oz}$).
- Moderate / Cold: No change.`,
  example: `**Calculate water intake for an 80 kg individual exercising 60 mins in a hot climate:**
- Base = 80 × 35 = 2800 ml.
- Exercise = (60 / 30) × 350 = 700 ml.
- Climate = 500 ml.
- Total Daily Water = 2800 + 700 + 500 = **4,000 ml** (4.0 Liters or approx. 17 cups).`,
  faqs: [
    {
      q: 'How many cups of water is 1 Liter?',
      a: 'One standard metric liter is approximately equal to 4.2 standard 8-ounce cups. So 3 Liters is about 12 to 13 cups.',
    },
    {
      q: 'Does tea or coffee count toward daily hydration?',
      a: 'Yes. Mildly caffeinated drinks and food items (like soup, fruits, and vegetables) contribute to your daily fluid intake. However, pure water remains the best hydration source.',
    },
    {
      q: 'What are the symptoms of mild dehydration?',
      a: 'Common early signs include dark-colored urine, dry mouth, fatigue, headaches, dizziness, and decreased urination frequency.',
    },
  ],
};

type System = 'metric' | 'imperial';
type Climate = 'cold' | 'moderate' | 'hot';

export default function WaterIntakeCalculator() {
  const [system, setSystem] = useState<System>('metric');
  const [weightKg, setWeightKg] = useState<number>(70);
  const [weightLbs, setWeightLbs] = useState<number>(154);
  const [exerciseMin, setExerciseMin] = useState<number>(30);
  const [climate, setClimate] = useState<Climate>('moderate');

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setSystem('metric');
    setWeightKg(70);
    setWeightLbs(154);
    setExerciseMin(30);
    setClimate('moderate');
    setErrors({});
  };

  const w = system === 'metric' ? weightKg : weightLbs;
  const isValid = !isNaN(w) && w > 0 && !isNaN(exerciseMin) && exerciseMin >= 0;

  let results = null;
  if (isValid) {
    let totalOz = 0;
    let totalMl = 0;

    if (system === 'metric') {
      const base = weightKg * 35;
      const exAdd = (exerciseMin / 30) * 350;
      const climAdd = climate === 'hot' ? 500 : 0;
      totalMl = base + exAdd + climAdd;
      totalOz = totalMl / 29.5735296; // convert to fl oz
    } else {
      const base = weightLbs * 0.5;
      const exAdd = (exerciseMin / 30) * 12;
      const climAdd = climate === 'hot' ? 17 : 0;
      totalOz = base + exAdd + climAdd;
      totalMl = totalOz * 29.5735296;
    }

    results = {
      ml: Math.round(totalMl),
      oz: Math.round(totalOz),
      liters: totalMl / 1000,
      cups: totalOz / 8,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (system === 'metric' && (weightKg <= 0 || isNaN(weightKg))) newErrors.weight = 'Weight must be greater than zero';
    if (system === 'imperial' && (weightLbs <= 0 || isNaN(weightLbs))) newErrors.weight = 'Weight must be greater than zero';
    if (exerciseMin < 0 || isNaN(exerciseMin)) newErrors.exerciseMin = 'Exercise minutes cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Hydration Inputs</h2>

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
              Metric (kg / ml)
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
              Imperial (lbs / oz)
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

              <div>
                <label htmlFor="exercise-min" className="block text-sm font-semibold text-foreground/80 mb-2">Daily Exercise (Mins)</label>
                <input
                  id="exercise-min"
                  type="number"
                  value={exerciseMin}
                  onChange={(e) => setExerciseMin(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.exerciseMin && <p className="text-xs text-red-500 mt-1 font-medium">{errors.exerciseMin}</p>}
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold text-foreground/80 mb-2">Climate Temperature</span>
              <div className="flex gap-2">
                {['cold', 'moderate', 'hot'].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setClimate(c as Climate)}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl border cursor-pointer capitalize transition-all ${
                      climate === c
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-background hover:bg-border text-foreground/70'
                    }`}
                  >
                    {c}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Hydration
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
            <h2 className="text-xl font-bold text-foreground mb-6">Daily Hydration Target</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Recommended Volume</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {system === 'metric' ? `${results.ml.toLocaleString()} ml` : `${results.oz.toLocaleString()} fl oz`}
                  </span>
                  <span className="block text-[10px] text-foreground/45 mt-0.5 font-semibold">
                    ({results.liters.toFixed(2)} Liters &nbsp;|&nbsp; {results.cups.toFixed(1)} standard cups)
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter physique and activity data.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
