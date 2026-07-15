'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Savings Goal Calculator helps you determine the fixed monthly contribution required to reach a specific financial target (such as a house down payment, a wedding, a car, or an emergency fund) within a desired time frame, taking compounding interest returns into account.`,
  formula: `The monthly savings required to reach a future value is calculated by rearranging the future value of an ordinary annuity equation:

$$P = \\frac{FV \\times i}{(1 + i)^n - 1}$$

Where:
- **P** is the monthly savings contribution required.
- **FV** is the target future value savings goal.
- **i** is the monthly rate of interest ($R / 12 / 100$).
- **n** is the total savings duration in months ($T \\times 12$).`,
  example: `Suppose you want to save $50,000 in 5 years, and your savings account offers an expected annual interest yield of 6%.

1. Target Goal (FV) = $50,000.
2. Monthly Interest (i) = 6% / 12 / 100 = 0.005.
3. Total Months (n) = 5 × 12 = 60.
4. Calculate Monthly Deposit (P):
   $$P = \\frac{50,000 \\times 0.005}{(1.005)^{60} - 1}$$
   $$P = \\frac{250}{1.34885 - 1} \\approx \\$716.64 \\text{ / month}$$
5. Total Principal Deposited = $716.64 × 60 = $42,998.40.
6. Compound Interest Earned = $50,000 - $42,998.40 = $7,001.60.`,
  faqs: [
    {
      q: 'Does inflation affect my savings goal?',
      a: 'Yes. If you are saving for a goal 10 years away, inflation will drive up prices, meaning your target price index might double. It is recommended to inflate your target goal value prior to planning.',
    },
    {
      q: 'Where should I invest my short-term savings goal capital?',
      a: 'For goals under 3 years, keep money in secure instruments like high-yield savings accounts, fixed deposits, or money market funds to avoid market volatility. For 5+ year terms, conservative mutual funds can offer better compound growth.',
    },
    {
      q: 'What is the advantage of compounding in savings goals?',
      a: 'Compounding does part of the heavy lifting. In our worked example, earning a 6% yield reduces the actual cash you have to deposit by **$7,000**, with the rest funded by compound interest.',
    },
  ],
};

export default function SavingsGoalCalculator() {
  const [targetGoal, setTargetGoal] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(6);
  const [tenure, setTenure] = useState<number>(5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = targetGoal > 0 && interestRate >= 0 && interestRate <= 100 && tenure > 0 && tenure <= 50;

  let results = null;
  if (isValid) {
    const FV = targetGoal;
    const r = interestRate;
    const t = tenure;
    const n = t * 12;
    const i = r / 12 / 100;

    let monthlyDeposit = 0;
    if (i === 0) {
      monthlyDeposit = FV / n;
    } else {
      monthlyDeposit = (FV * i) / (Math.pow(1 + i, n) - 1);
    }

    const totalInvested = monthlyDeposit * n;
    const estInterest = Math.max(0, FV - totalInvested);

    const principalPercent = (totalInvested / FV) * 100;
    const interestPercent = (estInterest / FV) * 100;

    results = {
      monthlyDeposit,
      totalInvested,
      estInterest,
      principalPercent,
      interestPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (targetGoal <= 0) newErrors.targetGoal = 'Target savings goal must be greater than zero';
    if (interestRate < 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0% and 100%';
    if (tenure <= 0 || tenure > 50) newErrors.tenure = 'Tenure must be between 1 and 50 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setTargetGoal(50000);
    setInterestRate(6);
    setTenure(5);
    setErrors({});
  };

  const radius = 50;
  const circ = 2 * Math.PI * radius;
  const principalStroke = results ? (results.principalPercent / 100) * circ : 0;

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Savings Goal</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="target-goal" className="block text-sm font-semibold text-foreground/80 mb-2">
                Target Goal Amount (Future value)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="target-goal"
                  type="number"
                  value={targetGoal || ''}
                  onChange={(e) => setTargetGoal(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.targetGoal && <p className="text-xs text-red-500 mt-1 font-medium">{errors.targetGoal}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="interest-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Expected Rate (p.a.)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="interest-rate"
                    type="number"
                    step="0.01"
                    value={interestRate || ''}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.interestRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.interestRate}</p>}
              </div>

              <div>
                <label htmlFor="tenure" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Duration (years)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="tenure"
                    type="number"
                    value={tenure || ''}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.tenure && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tenure}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate Target
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
            <h2 className="text-xl font-bold text-foreground mb-6">Savings Goal Summary</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Required Monthly Deposit
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      ${results.monthlyDeposit.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Cash Deposited
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Est. Interest Funding
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.estInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-44 w-44">
                    <svg className="h-full w-full transform -rotate-90" viewBox="0 0 120 120">
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="var(--primary)"
                        strokeWidth="12"
                      />
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="var(--accent)"
                        strokeWidth="12.5"
                        strokeDasharray={circ}
                        strokeDashoffset={principalStroke}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                        Interest contribution
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {results.interestPercent.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-4 mt-6 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-foreground/70">Principal ({results.principalPercent.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-foreground/70">Interest ({results.interestPercent.toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter target parameters to calculate monthly savings.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
