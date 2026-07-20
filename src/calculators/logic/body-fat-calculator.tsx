'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Body Fat Calculator estimates your body fat percentage using the standard U.S. Navy circumference tape method. It takes measurements of your height, neck, waist, and hips (for females) to calculate body composition.`,
  formula: `Body fat estimates are calculated using logarithmic formulas (using measurements converted to inches):

**1. Male Formula:**
$$BF\\% = 86.010 \\times \\log_{10}(\\text{Waist} - \\text{Neck}) - 70.041 \\times \\log_{10}(\\text{Height}) + 36.76$$

**2. Female Formula:**
$$BF\\% = 163.205 \\times \\log_{10}(\\text{Waist} + \\text{Hip} - \\text{Neck}) - 97.684 \\times \\log_{10}(\\text{Height}) - 78.387$$`,
  example: `**Calculate body fat for a male: Height = 70 inches, Neck = 15 inches, Waist = 36 inches:**
- Waist - Neck = 21. Log10(21) ≈ 1.322.
- Log10(70) ≈ 1.845.
- BF% = 86.010(1.322) - 70.041(1.845) + 36.76 = 113.7 - 129.2 + 36.76 ≈ **21.26%**.`,
  faqs: [
    {
      q: 'How accurate is the U.S. Navy tape measure method?',
      a: 'The U.S. Navy tape method is a convenient and cost-effective estimator that usually falls within 3–4% of actual body fat percentages, making it a reliable tracking method for general fitness.',
    },
    {
      q: 'Why are different measurements required for males and females?',
      a: 'Men and women store body fat in different anatomical patterns. Men tend to store fat primarily around the abdominal region (waist), while women store fat in the hips, thighs, and lower torso.',
    },
    {
      q: 'What is a healthy body fat range?',
      a: 'Fitness ranges vary by gender. For men, a healthy range is typically 14–24%. For women, a healthy range is typically 21–31%. Lower percentages are common for athletes.',
    },
  ],
};

type Gender = 'male' | 'female';
type System = 'metric' | 'imperial';

export default function BodyFatCalculator() {
  const [system, setSystem] = useState<System>('metric');
  const [gender, setGender] = useState<Gender>('male');

  // Metric states
  const [heightCm, setHeightCm] = useState<number>(175);
  const [neckCm, setNeckCm] = useState<number>(38);
  const [waistCm, setWaistCm] = useState<number>(88);
  const [hipCm, setHipCm] = useState<number>(95);

  // Imperial states
  const [heightIn, setHeightIn] = useState<number>(70);
  const [neckIn, setNeckIn] = useState<number>(15);
  const [waistIn, setWaistIn] = useState<number>(35);
  const [hipIn, setHipIn] = useState<number>(38);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setSystem('metric');
    setGender('male');
    setHeightCm(175);
    setNeckCm(38);
    setWaistCm(88);
    setHipCm(95);
    setHeightIn(70);
    setNeckIn(15);
    setWaistIn(35);
    setHipIn(38);
    setErrors({});
  };

  // Convert inputs to inches for calculation
  const height = system === 'metric' ? heightCm / 2.54 : heightIn;
  const neck = system === 'metric' ? neckCm / 2.54 : neckIn;
  const waist = system === 'metric' ? waistCm / 2.54 : waistIn;
  const hip = system === 'metric' ? hipCm / 2.54 : hipIn;

  const isValid = height > 0 && neck > 0 && waist > 0 && (gender === 'female' ? hip > 0 : true);

  let results = null;
  if (isValid) {
    let bf = 0;
    if (gender === 'male') {
      if (waist - neck > 0) {
        bf = 86.01 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
      }
    } else {
      if (waist + hip - neck > 0) {
        bf = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
      }
    }

    // Determine category
    let category = 'Unknown';
    if (gender === 'male') {
      if (bf < 6) category = 'Essential Fat (2-5%)';
      else if (bf < 14) category = 'Athletes (6-13%)';
      else if (bf < 18) category = 'Fitness (14-17%)';
      else if (bf < 25) category = 'Acceptable (18-24%)';
      else category = 'Obese (25%+)';
    } else {
      if (bf < 14) category = 'Essential Fat (10-13%)';
      else if (bf < 21) category = 'Athletes (14-20%)';
      else if (bf < 25) category = 'Fitness (21-24%)';
      else if (bf < 32) category = 'Acceptable (25-31%)';
      else category = 'Obese (32%+)';
    }

    results = {
      bf: Math.max(0, bf),
      category,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (system === 'metric') {
      if (heightCm <= 0) newErrors.height = 'Height must be greater than zero';
      if (neckCm <= 0) newErrors.neck = 'Neck must be greater than zero';
      if (waistCm <= 0) newErrors.waist = 'Waist must be greater than zero';
      if (gender === 'female' && hipCm <= 0) newErrors.hip = 'Hip must be greater than zero';
      if (gender === 'male' && waistCm - neckCm <= 0) {
        newErrors.waist = 'Waist measurement must be larger than neck measurement';
      }
    } else {
      if (heightIn <= 0) newErrors.height = 'Height must be greater than zero';
      if (neckIn <= 0) newErrors.neck = 'Neck must be greater than zero';
      if (waistIn <= 0) newErrors.waist = 'Waist must be greater than zero';
      if (gender === 'female' && hipIn <= 0) newErrors.hip = 'Hip must be greater than zero';
      if (gender === 'male' && waistIn - neckIn <= 0) {
        newErrors.waist = 'Waist measurement must be larger than neck measurement';
      }
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
          <h2 className="text-xl font-bold text-foreground mb-6">Physique Tape Measures</h2>

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
              Metric (cm)
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
              Imperial (in)
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
                <>
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
                  <div>
                    <label htmlFor="neck-cm" className="block text-sm font-semibold text-foreground/80 mb-2">Neck (cm)</label>
                    <input
                      id="neck-cm"
                      type="number"
                      value={neckCm}
                      onChange={(e) => setNeckCm(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                    {errors.neck && <p className="text-xs text-red-500 mt-1 font-medium">{errors.neck}</p>}
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="height-in" className="block text-sm font-semibold text-foreground/80 mb-2">Height (in)</label>
                    <input
                      id="height-in"
                      type="number"
                      value={heightIn}
                      onChange={(e) => setHeightIn(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                    {errors.height && <p className="text-xs text-red-500 mt-1 font-medium">{errors.height}</p>}
                  </div>
                  <div>
                    <label htmlFor="neck-in" className="block text-sm font-semibold text-foreground/80 mb-2">Neck (in)</label>
                    <input
                      id="neck-in"
                      type="number"
                      value={neckIn}
                      onChange={(e) => setNeckIn(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                    {errors.neck && <p className="text-xs text-red-500 mt-1 font-medium">{errors.neck}</p>}
                  </div>
                </>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {system === 'metric' ? (
                <>
                  <div>
                    <label htmlFor="waist-cm" className="block text-sm font-semibold text-foreground/80 mb-2">Waist (cm)</label>
                    <input
                      id="waist-cm"
                      type="number"
                      value={waistCm}
                      onChange={(e) => setWaistCm(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                    {errors.waist && <p className="text-xs text-red-500 mt-1 font-medium">{errors.waist}</p>}
                  </div>
                  {gender === 'female' && (
                    <div>
                      <label htmlFor="hip-cm" className="block text-sm font-semibold text-foreground/80 mb-2">Hip (cm)</label>
                      <input
                        id="hip-cm"
                        type="number"
                        value={hipCm}
                        onChange={(e) => setHipCm(Number(e.target.value))}
                        className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                      />
                      {errors.hip && <p className="text-xs text-red-500 mt-1 font-medium">{errors.hip}</p>}
                    </div>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="waist-in" className="block text-sm font-semibold text-foreground/80 mb-2">Waist (in)</label>
                    <input
                      id="waist-in"
                      type="number"
                      value={waistIn}
                      onChange={(e) => setWaistIn(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                    />
                    {errors.waist && <p className="text-xs text-red-500 mt-1 font-medium">{errors.waist}</p>}
                  </div>
                  {gender === 'female' && (
                    <div>
                      <label htmlFor="hip-in" className="block text-sm font-semibold text-foreground/80 mb-2">Hip (in)</label>
                      <input
                        id="hip-in"
                        type="number"
                        value={hipIn}
                        onChange={(e) => setHipIn(Number(e.target.value))}
                        className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                      />
                      {errors.hip && <p className="text-xs text-red-500 mt-1 font-medium">{errors.hip}</p>}
                    </div>
                  )}
                </>
              )}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Composition
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
            <h2 className="text-xl font-bold text-foreground mb-6">Composition Output</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Estimated Body Fat Percentage</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.bf.toFixed(2)}%
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Fitness Classification</span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    {results.category}
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter tape measurements.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
