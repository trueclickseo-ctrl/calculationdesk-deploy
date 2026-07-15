'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Implied Probability Calculator translates sports betting lines—including American Moneyline, Decimal, and Fractional odds—into implied win probabilities and potential payouts.`,
  formula: `Odds conversions to probability are determined by line types:

**1. American Odds (Moneyline):**
- Positive ($+$):
  $$\\text{Probability} = \\frac{100}{\\text{Odds} + 100} \\times 100$$
- Negative ($-$):
  $$\\text{Probability} = \\frac{|\\text{Odds}|}{|\\text{Odds}| + 100} \\times 100$$

**2. Decimal Odds ($D$):**
$$\\text{Probability} = \\frac{1}{D} \\times 100$$

**3. Fractional Odds ($N/D$):**
$$\\text{Probability} = \\frac{D}{N + D} \\times 100$$`,
  example: `**Convert American Odds of -150 to implied probability:**
- Negative formula: $150 / (150 + 100) = 150 / 250 = \\mathbf{60.00\\%}$.
- A $100 bet yields $66.67 profit, total payout $166.67.`,
  faqs: [
    {
      q: 'What is implied probability?',
      a: 'Implied probability is the likelihood of an event occurring as suggested by betting odds. It helps bettors identify value; if you believe the actual chance of winning is higher than the implied probability, it represents a good bet.',
    },
    {
      q: 'What is the "vigorish" or bookmaker margin?',
      a: 'The sum of implied probabilities for all outcomes in a game usually exceeds 100% (e.g. 104%). The extra 4% is the "vig" or "overround," which is the commission the sportsbook charges to take your bet.',
    },
    {
      q: 'How do decimal odds work?',
      a: 'Decimal odds represent the total return (stake + profit) for every $1 wagered. For example, decimal odds of 2.5 mean a $10 bet returns a total of $25 ($15 profit + $10 stake).',
    },
  ],
};

export default function ImpliedProbabilityCalculator() {
  const [oddsType, setOddsType] = useState<string>('american');
  const [americanOdds, setAmericanOdds] = useState<string>('-150');
  const [decimalOdds, setDecimalOdds] = useState<number>(1.67);
  const [fractionalNum, setFractionalNum] = useState<number>(2);
  const [fractionalDen, setFractionalDen] = useState<number>(3);
  const [betAmount, setBetAmount] = useState<number>(100);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setOddsType('american');
    setAmericanOdds('-150');
    setDecimalOdds(1.67);
    setFractionalNum(2);
    setFractionalDen(3);
    setBetAmount(100);
    setErrors({});
  };

  // Computations
  let results = null;
  let probability = 0;
  let profit = 0;

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (betAmount < 0 || isNaN(betAmount)) newErrors.bet = 'Wager must be positive';

    if (oddsType === 'american') {
      const val = Number(americanOdds);
      if (isNaN(val) || Math.abs(val) < 100) {
        newErrors.odds = 'American odds must be at least +100 or -100';
      }
    } else if (oddsType === 'decimal') {
      if (isNaN(decimalOdds) || decimalOdds <= 1) {
        newErrors.odds = 'Decimal odds must be greater than 1';
      }
    } else {
      if (isNaN(fractionalNum) || fractionalNum <= 0 || isNaN(fractionalDen) || fractionalDen <= 0) {
        newErrors.odds = 'Fractional parts must be positive integers';
      }
    }
    return newErrors;
  };

  const handleCalculate = () => {
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});
  };

  const hasErr = Object.keys(validate()).length > 0;

  if (!hasErr) {
    if (oddsType === 'american') {
      const odds = Number(americanOdds);
      if (odds > 0) {
        probability = 100 / (odds + 100);
        profit = betAmount * (odds / 100);
      } else {
        probability = Math.abs(odds) / (Math.abs(odds) + 100);
        profit = betAmount / (Math.abs(odds) / 100);
      }
    } else if (oddsType === 'decimal') {
      probability = 1 / decimalOdds;
      profit = betAmount * (decimalOdds - 1);
    } else {
      probability = fractionalDen / (fractionalNum + fractionalDen);
      profit = betAmount * (fractionalNum / fractionalDen);
    }

    results = {
      probability: probability * 100,
      profit,
      totalReturn: betAmount + profit,
    };
  }

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
          <h2 className="text-xl font-bold text-foreground mb-6">Odds Wager Setup</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="odds-format" className="block text-sm font-semibold text-foreground/80 mb-2">Odds Format</label>
              <select
                id="odds-format"
                value={oddsType}
                onChange={(e) => { setOddsType(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="american">American (+150 / -150)</option>
                <option value="decimal">Decimal (2.50)</option>
                <option value="fractional">Fractional (5/2)</option>
              </select>
            </div>

            {oddsType === 'american' && (
              <div>
                <label htmlFor="american-odds-val" className="block text-sm font-semibold text-foreground/80 mb-2">American Line</label>
                <input
                  id="american-odds-val"
                  type="text"
                  value={americanOdds}
                  onChange={(e) => { setAmericanOdds(e.target.value); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.odds && <p className="text-xs text-red-500 mt-1 font-medium">{errors.odds}</p>}
              </div>
            )}

            {oddsType === 'decimal' && (
              <div>
                <label htmlFor="decimal-odds-val" className="block text-sm font-semibold text-foreground/80 mb-2">Decimal Odds</label>
                <input
                  id="decimal-odds-val"
                  type="number"
                  step="0.01"
                  value={decimalOdds}
                  onChange={(e) => { setDecimalOdds(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.odds && <p className="text-xs text-red-500 mt-1 font-medium">{errors.odds}</p>}
              </div>
            )}

            {oddsType === 'fractional' && (
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Fractional Odds</label>
                <div className="flex items-center gap-3">
                  <input
                    aria-label="Numerator"
                    type="number"
                    value={fractionalNum}
                    onChange={(e) => { setFractionalNum(Number(e.target.value)); setErrors({}); }}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center"
                  />
                  <span className="text-foreground/50 font-bold">/</span>
                  <input
                    aria-label="Denominator"
                    type="number"
                    value={fractionalDen}
                    onChange={(e) => { setFractionalDen(Number(e.target.value)); setErrors({}); }}
                    className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center"
                  />
                </div>
                {errors.odds && <p className="text-xs text-red-500 mt-1 font-medium">{errors.odds}</p>}
              </div>
            )}

            <div>
              <label htmlFor="bet-size" className="block text-sm font-semibold text-foreground/80 mb-2">Wager Amount ($)</label>
              <input
                id="bet-size"
                type="number"
                value={betAmount}
                onChange={(e) => { setBetAmount(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.bet && <p className="text-xs text-red-500 mt-1 font-medium">{errors.bet}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Line
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
            <h2 className="text-xl font-bold text-foreground mb-6">Probability & Payouts</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Implied Win Probability</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.probability.toFixed(2)}%
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Equates to odds of {oddsType === 'american' ? americanOdds : oddsType === 'decimal' ? `${decimalOdds.toFixed(2)}` : `${fractionalNum}/${fractionalDen}`}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Potential Profit</span>
                    <span className="block text-base font-bold text-green-500 mt-1">${results.profit.toFixed(2)}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Return</span>
                    <span className="block text-base font-bold text-foreground mt-1">${results.totalReturn.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter odds values.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
