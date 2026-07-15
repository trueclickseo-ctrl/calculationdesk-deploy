'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Odds Calculator converts raw probability percentages into standard gambling formats—such as American, Decimal, Fractional odds—and ratios in favor or against.`,
  formula: `Odds relationships map ratios of success to failure:

**1. Odds in Favor:**
$$\\text{Odds In Favor} = \\frac{P}{1 - P}$$
Expressed as a ratio ($N : D$).

**2. Odds Against:**
$$\\text{Odds Against} = \\frac{1 - P}{P}$$
Expressed as a ratio ($D : N$).

**3. Decimal Odds ($D$):**
$$D = \\frac{1}{P}$$`,
  example: `**Convert 25% probability ($P = 0.25$) to all odds formats:**
- Odds in favor = 0.25 / 0.75 = 1/3 (expressed as **1 to 3**).
- Odds against = 0.75 / 0.25 = 3/1 (expressed as **3 to 1**).
- Decimal odds = 1 / 0.25 = **4.00**.
- Fractional odds = **3/1**.
- American odds = **+300**.`,
  faqs: [
    {
      q: 'What is the difference between "odds in favor" and "odds against"?',
      a: 'Odds in favor compares the likelihood of the event happening to the likelihood of it not happening (Success:Failure). Odds against compares the likelihood of failure to success (Failure:Success). Standard gambling lines are usually presented as odds against.',
    },
    {
      q: 'How do American positive odds differ from negative odds?',
      a: 'Positive American odds (+300) indicate the profit earned on a $100 wager. Negative American odds (-150) indicate the amount you must wager to make a $100 profit.',
    },
    {
      q: 'How do you convert decimal odds to fractional odds?',
      a: 'Subtract 1 from the decimal odds and convert it to a fraction. For example, decimal odds of 2.50 becomes 1.50, which is represented fractionally as 3/2.',
    },
  ],
};

export default function OddsCalculator() {
  const [prob, setProb] = useState<number>(25); // %
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setProb(25);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(prob) && prob > 0 && prob < 100;

  // Simple GCD helper to format fractional ratios
  const gcd = (a: number, b: number): number => {
    return b ? gcd(b, a % b) : a;
  };

  if (isValid) {
    const p = prob / 100;
    
    // Ratios in favor & against
    const num = Math.round(prob * 100);
    const den = Math.round((100 - prob) * 100);
    const divisor = gcd(num, den);
    
    const favNum = num / divisor;
    const favDen = den / divisor;

    // Decimal odds
    const dec = 1 / p;

    // American odds
    let american = 0;
    if (p >= 0.5) {
      american = -Math.round((p / (1 - p)) * 100);
    } else {
      american = Math.round(((1 - p) / p) * 100);
    }

    results = {
      favRatio: `${favNum} to ${favDen}`,
      againstRatio: `${favDen} to ${favNum}`,
      decimal: dec,
      american: american > 0 ? `+${american}` : `${american}`,
      fractional: `${favDen}/${favNum}`,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (prob <= 0 || prob >= 100 || isNaN(prob)) {
      newErrors.prob = 'Probability must be strictly between 0% and 100%';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Probability Value</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="prob-percentage" className="block text-sm font-semibold text-foreground/80 mb-2">Winning Probability (%)</label>
              <input
                id="prob-percentage"
                type="number"
                step="0.1"
                value={prob}
                onChange={(e) => { setProb(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.prob && <p className="text-xs text-red-500 mt-1 font-medium">{errors.prob}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Odds
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
            <h2 className="text-xl font-bold text-foreground mb-6">Odds Conversions</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <span className="block text-[10px] font-bold text-foreground/50 uppercase">Odds in Favor</span>
                      <span className="block text-lg font-extrabold text-primary mt-1">{results.favRatio}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] font-bold text-foreground/50 uppercase">Odds Against</span>
                      <span className="block text-lg font-extrabold text-primary mt-1">{results.againstRatio}</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">American Line</span>
                    <span className="block text-sm font-bold text-foreground mt-1 truncate">{results.american}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">Decimal Odds</span>
                    <span className="block text-sm font-bold text-foreground mt-1 truncate">{results.decimal.toFixed(2)}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">Fractional Odds</span>
                    <span className="block text-sm font-bold text-foreground mt-1 truncate">{results.fractional}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter winning probability.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
