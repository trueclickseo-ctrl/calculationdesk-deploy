'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Dice Average Calculator computes probability distributions, standard deviations, and expected average rolls for any combination of dice and static modifiers.`,
  formula: `Dice statistics utilize expected outcomes of discrete uniform distributions:

**1. Average of a Single Die ($A_{single}$):**
$$A_{single} = \\frac{\\text{Sides} + 1}{2}$$

**2. Expected Average of $N$ Dice ($A_{total}$):**
$$A_{total} = N \\times A_{single} + \\text{Modifier}$$

**3. Standard Deviation ($\\sigma$):**
$$\\sigma = \\sqrt{N \\times \\frac{\\text{Sides}^2 - 1}{12}}$$`,
  example: `**Roll 4d6 (four 6-sided dice) with a +2 modifier:**
- Average of one 6-sided die = (6 + 1) / 2 = 3.5.
- Expected Average = 4 × 3.5 + 2 = **16.00**.
- Min possible = 4 + 2 = **6**. Max possible = 24 + 2 = **26**.
- Standard Deviation = \\(\\sqrt{4 \\times (35/12)} \\approx 3.416\\).`,
  faqs: [
    {
      q: 'What does standard deviation mean in dice rolling?',
      a: 'It indicates how much your rolls are expected to vary from the average. A higher standard deviation means rolls are widely spread out, while a lower one means rolls will cluster closer to the average.',
    },
    {
      q: 'Why does rolling more dice create a bell curve?',
      a: 'According to the Central Limit Theorem, as you roll more dice, the distribution of sum totals approaches a normal distribution (bell curve). The extreme ends (like rolling all 1s or all 6s) become statistically rare.',
    },
    {
      q: 'How are standard RPG dice classified?',
      a: 'Roleplaying games typically use standard polyhedral sets: d4, d6, d8, d10, d12, and d20, representing the number of faces on each die.',
    },
  ],
};

export default function DiceAverageCalculator() {
  const [diceCount, setDiceCount] = useState<number>(4);
  const [sides, setSides] = useState<number>(6);
  const [mod, setMod] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setDiceCount(4);
    setSides(6);
    setMod(0);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(diceCount) && diceCount > 0 &&
                  !isNaN(sides) && sides > 1 &&
                  !isNaN(mod);

  if (isValid) {
    const singleAverage = (sides + 1) / 2;
    const expectedAverage = diceCount * singleAverage + mod;
    
    const minRoll = diceCount + mod;
    const maxRoll = diceCount * sides + mod;

    const variance = diceCount * ((sides * sides - 1) / 12);
    const standardDeviation = Math.sqrt(variance);

    results = {
      expectedAverage,
      minRoll,
      maxRoll,
      standardDeviation,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (diceCount <= 0 || isNaN(diceCount)) newErrors.diceCount = 'Dice count must be greater than zero';
    if (sides <= 1 || isNaN(sides)) newErrors.sides = 'Dice must have at least 2 sides';
    if (isNaN(mod)) newErrors.mod = 'Modifier must be a number';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Dice Configuration</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="dice-count" className="block text-sm font-semibold text-foreground/80 mb-2">Number of Dice (N)</label>
              <input
                id="dice-count"
                type="number"
                value={diceCount}
                onChange={(e) => { setDiceCount(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.diceCount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.diceCount}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="dice-sides" className="block text-sm font-semibold text-foreground/80 mb-2">Sides per Die</label>
                <input
                  id="dice-sides"
                  type="number"
                  value={sides}
                  onChange={(e) => { setSides(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.sides && <p className="text-xs text-red-500 mt-1 font-medium">{errors.sides}</p>}
              </div>

              <div>
                <label htmlFor="constant-mod" className="block text-sm font-semibold text-foreground/80 mb-2">Modifier (+/-)</label>
                <input
                  id="constant-mod"
                  type="number"
                  value={mod}
                  onChange={(e) => { setMod(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.mod && <p className="text-xs text-red-500 mt-1 font-medium">{errors.mod}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Average
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
            <h2 className="text-xl font-bold text-foreground mb-6">Probability Metrics</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Expected Average Roll</span>
                  <span className="block text-4xl font-black text-primary mt-2">
                    {results.expectedAverage.toFixed(2)}
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Format: {diceCount}d{sides} {mod >= 0 ? `+ ${mod}` : `- ${Math.abs(mod)}`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Minimum Roll</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.minRoll}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Maximum Roll</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.maxRoll}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center text-xs font-semibold">
                  <span className="text-foreground/50">Standard Deviation (σ):</span>
                  <span className="text-foreground font-bold">{results.standardDeviation.toFixed(4)}</span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter dice configuration.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
