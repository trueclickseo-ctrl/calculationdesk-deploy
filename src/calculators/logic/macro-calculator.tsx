'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Macro Calculator divides a target daily calorie budget into custom distributions of protein, carbohydrates, and dietary fats. It supports classic dieting ratios including Balanced, Low-Carb, High-Protein, and Ketogenic.`,
  formula: `Macronutrient targets are solved using standard physiological energy densities:

**1. Energy Densities:**
- 1 gram of Protein = $4 \\text{ calories}$
- 1 gram of Carbohydrate = $4 \\text{ calories}$
- 1 gram of Fat = $9 \\text{ calories}$

**2. Formulas:**
$$P_{\\text{grams}} = \\frac{\\text{Calories} \\times P\\%}{4}$$
$$C_{\\text{grams}} = \\frac{\\text{Calories} \\times C\\%}{4}$$
$$F_{\\text{grams}} = \\frac{\\text{Calories} \\times F\\%}{9}$$`,
  example: `**Calculate macro breakdown for 2,000 calories on a Balanced diet (40% Carbs, 30% Protein, 30% Fat):**
- Protein: (2000 × 0.30) / 4 = **150g**.
- Carbs: (2000 × 0.40) / 4 = **200g**.
- Fat: (2000 × 0.30) / 9 = **67g**.`,
  faqs: [
    {
      q: 'What is a macro?',
      a: 'Macronutrients ("macros") are nutrients that the body needs in large amounts to function. The three primary macronutrients are carbohydrates, proteins, and fats.',
    },
    {
      q: 'Why are fats calculated with 9 calories instead of 4?',
      a: 'Fats are structurally more energy-dense than carbohydrates and proteins, yielding 9 calories of energy per gram instead of 4 calories.',
    },
    {
      q: 'Which macro split is best for fat loss?',
      a: 'While weight loss ultimately depends on a caloric deficit, a higher protein distribution (e.g., 35–40% protein) is often recommended to preserve lean muscle tissue while losing fat.',
    },
  ],
};

interface DietPreset {
  id: string;
  name: string;
  pPct: number; // protein %
  cPct: number; // carb %
  fPct: number; // fat %
}

const PRESETS: DietPreset[] = [
  { id: 'balanced', name: 'Balanced (30/40/30)', pPct: 30, cPct: 40, fPct: 30 },
  { id: 'lowcarb', name: 'Low Carb (40/25/35)', pPct: 40, cPct: 25, fPct: 35 },
  { id: 'highprotein', name: 'High Protein (40/30/30)', pPct: 40, cPct: 30, fPct: 30 },
  { id: 'keto', name: 'Ketogenic (25/5/70)', pPct: 25, cPct: 5, fPct: 70 }
];

export default function MacroCalculator() {
  const [calories, setCalories] = useState<number>(2000);
  const [presetId, setPresetId] = useState<string>('balanced');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setCalories(2000);
    setPresetId('balanced');
    setErrors({});
  };

  // Computations
  let results = null;
  const currentPreset = PRESETS.find(p => p.id === presetId);
  const isValid = !isNaN(calories) && calories > 0 && !!currentPreset;

  if (isValid) {
    const { pPct, cPct, fPct } = currentPreset;

    const pGrams = (calories * (pPct / 100)) / 4;
    const cGrams = (calories * (cPct / 100)) / 4;
    const fGrams = (calories * (fPct / 100)) / 9;

    results = {
      pGrams: Math.round(pGrams),
      cGrams: Math.round(cGrams),
      fGrams: Math.round(fGrams),
      pPct,
      cPct,
      fPct,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (isNaN(calories) || calories <= 0) newErrors.calories = 'Calorie target must be greater than zero';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Nutrition Profile</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="cal-target" className="block text-sm font-semibold text-foreground/80 mb-2">Daily Calorie Target (kcal)</label>
              <input
                id="cal-target"
                type="number"
                value={calories}
                onChange={(e) => { setCalories(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.calories && <p className="text-xs text-red-500 mt-1 font-medium">{errors.calories}</p>}
            </div>

            <div>
              <label htmlFor="diet-presets" className="block text-sm font-semibold text-foreground/80 mb-2">Diet Protocol Presets</label>
              <select
                id="diet-presets"
                value={presetId}
                onChange={(e) => setPresetId(e.target.value)}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              >
                {PRESETS.map((p) => (
                  <option key={p.id} value={p.id}>{p.name}</option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Macros
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
            <h2 className="text-xl font-bold text-foreground mb-6">Macronutrient Targets</h2>

            {results ? (
              <div className="space-y-5">
                <div className="grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-3xl font-extrabold text-primary">{results.pGrams}g</span>
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mt-1">Protein</span>
                    <span className="block text-[9px] text-foreground/40 font-semibold">({results.pPct}%)</span>
                  </div>

                  <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                    <span className="block text-3xl font-extrabold text-accent">{results.cGrams}g</span>
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider mt-1">Carbs</span>
                    <span className="block text-[9px] text-foreground/40 font-semibold">({results.cPct}%)</span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-3xl font-extrabold text-foreground">{results.fGrams}g</span>
                    <span className="block text-[10px] font-semibold text-foreground/50 uppercase tracking-wider mt-1">Fats</span>
                    <span className="block text-[9px] text-foreground/40 font-semibold">({results.fPct}%)</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t border-border/40">
                  <span className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider text-center">Energy Distribution</span>
                  <div className="flex h-4 overflow-hidden rounded-full bg-background border border-border">
                    <div style={{ width: `${results.pPct}%` }} className="bg-primary" title="Protein" />
                    <div style={{ width: `${results.cPct}%` }} className="bg-accent" title="Carbs" />
                    <div style={{ width: `${results.fPct}%` }} className="bg-foreground/50" title="Fat" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter daily calories.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
