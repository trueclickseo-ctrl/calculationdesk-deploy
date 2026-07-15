'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Ideal Weight Calculator estimates your healthy body weight range based on your height, gender, and clinical models including the Devine, Robinson, Miller, and Hamwi equations, alongside the standard World Health Organization (WHO) BMI ranges.`,
  formula: `Ideal body weight (IBW) is computed using standard clinical formulas (where $x$ represents height in inches over 5 feet, i.e., $x = \\text{Height in inches} - 60$):

**1. Devine Formula (1974):**
- Men:
  $$IBW = 50.0 + 2.3 \\times x \\text{ (kg)}$$
- Women:
  $$IBW = 45.5 + 2.3 \\times x \\text{ (kg)}$$

**2. Robinson Formula (1983):**
- Men:
  $$IBW = 52.0 + 1.9 \\times x \\text{ (kg)}$$
- Women:
  $$IBW = 49.0 + 1.7 \\times x \\text{ (kg)}$$

**3. Miller Formula (1983):**
- Men:
  $$IBW = 56.2 + 1.41 \\times x \\text{ (kg)}$$
- Women:
  $$IBW = 53.1 + 1.36 \\times x \\text{ (kg)}$$

**4. Hamwi Formula (1964):**
- Men:
  $$IBW = 48.0 + 2.7 \\times x \\text{ (kg)}$$
- Women:
  $$IBW = 45.5 + 2.2 \\times x \\text{ (kg)}$$`,
  example: `**Calculate ideal weight for a 178 cm (approx. 70 inches) tall male:**
- Inches over 5 feet (60 inches) = 70 - 60 = 10.
- Devine Formula = 50.0 + 2.3(10) = **73.0 kg** (approx. 160.9 lbs).
- Robinson Formula = 52.0 + 1.9(10) = **71.0 kg** (approx. 156.5 lbs).`,
  faqs: [
    {
      q: 'Why are there multiple ideal weight formulas?',
      a: 'Different researchers created models for specific medical contexts. The Devine formula was initially designed to calculate medication dosages, but it became a general health reference. The Robinson and Miller models were developed later as refinements.',
    },
    {
      q: 'What if I am under 5 feet tall?',
      a: 'For heights under 5 feet, the calculator applies a proportional reduction of 1.5% to 2% per inch under 60 inches to keep calculations anatomically sound.',
    },
    {
      q: 'How does BMI relate to ideal weight?',
      a: 'The World Health Organization defines a healthy BMI range between 18.5 and 24.9. This calculator displays your healthy weight bounds alongside the formulas to show the full clinical range.',
    },
  ],
};

type Gender = 'male' | 'female';
type System = 'metric' | 'imperial';

export default function IdealWeightCalculator() {
  const [system, setSystem] = useState<System>('metric');
  const [gender, setGender] = useState<Gender>('male');

  // Metric states
  const [heightCm, setHeightCm] = useState<number>(175);

  // Imperial states
  const [heightFt, setHeightFt] = useState<number>(5);
  const [heightIn, setHeightIn] = useState<number>(9);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setSystem('metric');
    setGender( 'male');
    setHeightCm(175);
    setHeightFt(5);
    setHeightIn(9);
    setErrors({});
  };

  // Convert height to inches and cm
  const hCm = system === 'metric' ? heightCm : (heightFt * 12 + heightIn) * 2.54;
  const hIn = hCm / 2.54;

  const isValid = hCm > 0;

  let results = null;
  if (isValid) {
    const inchesOver5 = Math.max(0, hIn - 60);

    // If height is under 5 feet (60 inches) we borrow backwards
    const under5Correction = hIn < 60 ? (hIn - 60) : 0;
    const factor = hIn < 60 ? under5Correction : inchesOver5;

    // Devine
    const devine = gender === 'male'
      ? 50.0 + 2.3 * factor
      : 45.5 + 2.3 * factor;

    // Robinson
    const robinson = gender === 'male'
      ? 52.0 + 1.9 * factor
      : 49.0 + 1.7 * factor;

    // Miller
    const miller = gender === 'male'
      ? 56.2 + 1.41 * factor
      : 53.1 + 1.36 * factor;

    // Hamwi
    const hamwi = gender === 'male'
      ? 48.0 + 2.7 * factor
      : 45.5 + 2.2 * factor;

    // BMI range (18.5 - 25.0)
    const heightM = hCm / 100;
    const bmiMin = 18.5 * (heightM * heightM);
    const bmiMax = 25.0 * (heightM * heightM);

    results = {
      devine: Math.max(0, devine),
      robinson: Math.max(0, robinson),
      miller: Math.max(0, miller),
      hamwi: Math.max(0, hamwi),
      bmiMin,
      bmiMax,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (system === 'metric') {
      if (heightCm <= 0) newErrors.height = 'Height must be greater than zero';
    } else {
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
          <h2 className="text-xl font-bold text-foreground mb-6">Physique Height</h2>

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
                Solve Ideal Weight
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
            <h2 className="text-xl font-bold text-foreground mb-6">Weight Estimates Comparison</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Clinical Devine Formula</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {formatWeight(results.devine)}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Robinson Formula</span>
                    <span className="block text-base font-bold text-foreground mt-1">{formatWeight(results.robinson)}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Miller Formula</span>
                    <span className="block text-base font-bold text-foreground mt-1">{formatWeight(results.miller)}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase">Hamwi Formula</span>
                    <span className="block text-base font-bold text-foreground mt-1">{formatWeight(results.hamwi)}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase">Healthy BMI Weight Range</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {formatWeight(results.bmiMin)} – {formatWeight(results.bmiMax)}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter height parameters.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
