'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Public Provident Fund (PPF) is a popular long-term tax-free savings scheme backed by the government. It has a minimum lock-in period of 15 years, with the option to extend in blocks of 5 years. PPF offers highly secure returns since it is government-guaranteed, and interest is compounded annually and declared quarterly by the ministry of finance.`,
  formula: `The maturity amount of PPF deposits made at the beginning of each year is calculated using the formula:

$$M = P \\times \\frac{(1 + i) \\times \\left((1 + i)^n - 1\\right)}{i}$$

Where:
- **M** is the maturity amount.
- **P** is the annual deposit amount.
- **i** is the annual rate of interest (divided by 100).
- **n** is the number of years (minimum 15, maximum 50).`,
  example: `Suppose you invest $150,000 every year (P) for the standard 15 years (n) at an annual interest rate of 7.1% (i = 0.071).

1. Interest rate (i) = 7.1% = 0.071.
2. Tenure (n) = 15.
3. Compute maturity amount (M):
   $$M = 150,000 \\times \\frac{1.071 \\times \\left((1.071)^{15} - 1\\right)}{0.071}$$
   $$M = 150,000 \\times \\frac{1.071 \\times (2.7845 - 1)}{0.071}$$
   $$M = 150,000 \\times \\frac{1.9112}{0.071} \\approx \\$4,036,440$$
4. Total Invested = $150,000 × 15 = $2,250,000.
5. Interest Earned = $4,036,440 - $2,250,000 = $1,786,440.`,
  faqs: [
    {
      q: 'What is the lock-in period for a PPF account?',
      a: 'A PPF account has a mandatory lock-in period of 15 years. Partial withdrawals are permitted from the 7th year onwards under specific terms.',
    },
    {
      q: 'Can I extend my PPF account after 15 years?',
      a: 'Yes. You can extend your PPF account indefinitely in blocks of 5 years at a time, with or without making additional yearly deposits.',
    },
    {
      q: 'Is there a limit on how much I can deposit in PPF?',
      a: 'Yes, in most government rules, the deposit limit ranges from a minimum of $500 to a maximum of $150,000 in a single financial year.',
    },
  ],
};

export default function PpfCalculator() {
  const [annualInvest, setAnnualInvest] = useState<number>(150000);
  const [interestRate, setInterestRate] = useState<number>(7.1);
  const [tenure, setTenure] = useState<number>(15);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = annualInvest > 0 && interestRate > 0 && interestRate <= 100 && tenure >= 15 && tenure <= 50;

  let results = null;
  if (isValid) {
    const P = annualInvest;
    const r = interestRate;
    const n = tenure;
    const i = r / 100;

    let maturityAmount = 0;
    if (i === 0) {
      maturityAmount = P * n;
    } else {
      maturityAmount = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    }

    const totalInvested = P * n;
    const estInterest = Math.max(0, maturityAmount - totalInvested);

    const principalPercent = (totalInvested / maturityAmount) * 100;
    const interestPercent = (estInterest / maturityAmount) * 100;

    results = {
      maturityAmount,
      totalInvested,
      estInterest,
      principalPercent,
      interestPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (annualInvest <= 0) newErrors.annualInvest = 'Annual investment must be greater than zero';
    if (interestRate <= 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0.1% and 100%';
    if (tenure < 15 || tenure > 50) newErrors.tenure = 'PPF tenure must be between 15 and 50 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setAnnualInvest(150000);
    setInterestRate(7.1);
    setTenure(15);
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
          <h2 className="text-xl font-bold text-foreground mb-6">PPF Long-Term Savings</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="annual-invest" className="block text-sm font-semibold text-foreground/80 mb-2">
                Yearly Investment Amount
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="annual-invest"
                  type="number"
                  value={annualInvest || ''}
                  onChange={(e) => setAnnualInvest(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.annualInvest && <p className="text-xs text-red-500 mt-1 font-medium">{errors.annualInvest}</p>}
            </div>

            <div>
              <label htmlFor="interest-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                Interest Rate (p.a.)
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
                Tenure (years)
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
              <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">PPF lock-in requires min. 15 years</span>
              {errors.tenure && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tenure}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate
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
            <h2 className="text-xl font-bold text-foreground mb-6">PPF Maturity Projections</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Expected Maturity Amount
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      ${results.maturityAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Invested Amount
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.totalInvested.toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Est. Interest Earned
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
                        Interest Gain
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
                Enter details to view projections.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
