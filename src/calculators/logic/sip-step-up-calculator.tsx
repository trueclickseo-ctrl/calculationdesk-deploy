'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The SIP with Step Up Calculator is an advanced investment forecasting tool designed to estimate returns from a systematic investment plan (SIP) where the contribution amount increases annually. As your income increases over time, stepping up your monthly contributions allows you to accelerate wealth compounding. This calculator details your total invested capital, estimated gains, and final wealth accumulated. You can check investment guides on official regulatory sites: the [US Securities and Exchange Commission (SEC)](https://www.sec.gov) or the [Securities and Exchange Board of India (SEBI)](https://www.sebi.gov.in).',
  formula: `The Step Up SIP calculation models monthly compounding of recurring deposits with annual contribution growth:

1. **Annual Contribution Increase**:
   For each year $k$, the monthly contribution $P_k$ is calculated as:
   $$P_1 = \\text{Initial Monthly Investment}$$
   $$P_k = P_{k-1} \\times \\left(1 + \\frac{\\text{Step Up Percentage}}{100}\\right)$$

2. **Compounding Growth**:
   Within each year, the future value is computed month-by-month at the monthly rate $r$:
   $$r = \\frac{\\text{Expected Annual Return}}{12 \\times 100}$$
   $$\\text{Balance}_{m} = (\\text{Balance}_{m-1} + P_k) \\times (1 + r)$$

3. **Wealth Gained**:
   $$\\text{Estimated Returns} = \\text{Final Balance} - \\text{Total Invested Amount}$$`,
  example: `Let's analyze a step-up SIP example. Suppose you start a monthly SIP of $1,000, with an annual step-up of 10%, an expected rate of return of 12% per year, and an investment tenure of 10 years.

1. **Contributions Year-by-Year**:
   - Year 1: $1,000 monthly
   - Year 2: $1,100 monthly
   - Year 3: $1,210 monthly ... and so on, reaching $2,358 monthly by Year 10.
   - Total Principal Invested = $191,249.

2. **Accrued Wealth**:
   - Compounding at 12% annual return (1% monthly), the total maturity amount grows to $385,861.
   - Wealth Gained = $385,861 - $191,249 = $194,612.

By stepping up your investment by just 10% annually, your final corpus increases by more than 50% compared to a flat SIP.`,
  faqs: [
    {
      q: 'What is a Step Up SIP?',
      a: 'A Step Up SIP (or top-up SIP) is an investment strategy where you increase your monthly contribution amount by a fixed percentage or amount at regular intervals (typically once a year), helping you invest more as your earnings grow.',
    },
    {
      q: 'What is the benefit of a Step Up SIP over a regular SIP?',
      a: 'A Step Up SIP accelerates your wealth creation by harnessing the power of compounding on higher investment amounts. It helps you reach your financial goals much faster and matches your growing income over your career.',
    },
    {
      q: 'Can I choose a fixed amount instead of a percentage for Step Up?',
      a: 'Yes. While this calculator uses a percentage-based step-up (which scales naturally with salary percentage increases), you can easily calculate a fixed amount step-up by estimating the equivalent percentage growth of your monthly contributions.',
    },
    {
      q: 'What rate of return should I expect for a long-term SIP?',
      a: 'For long-term equity mutual fund investments (10+ years), investors typically project an average annual return rate of 10% to 15%. However, mutual fund returns are subject to market volatility and are not guaranteed.',
    },
    {
      q: 'Does this calculator factor in taxes or inflation?',
      a: 'No. This calculator provides nominal values before taxes (such as capital gains tax) or inflation adjustments. Factoring in inflation helps you estimate the actual purchasing power of your future wealth.',
    },
  ],
};

export default function StepUpSipCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [initialInvestment, setInitialInvestment] = useState<number>(5000);
  const [stepUpPercent, setStepUpPercent] = useState<number>(10);
  const [expectedReturn, setExpectedReturn] = useState<number>(12);
  const [timePeriod, setTimePeriod] = useState<number>(15);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const currencySymbols: Record<string, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    PKR: 'Rs',
    BDT: '৳',
    TRY: '₺',
  };

  const isValid = initialInvestment > 0 && stepUpPercent >= 0 && expectedReturn > 0 && timePeriod > 0 && timePeriod <= 40;

  let results = null;
  if (isValid) {
    let balance = 0;
    let totalInvested = 0;
    let currentMonthlyContribution = initialInvestment;
    const r = (expectedReturn / 100) / 12;

    for (let year = 1; year <= timePeriod; year++) {
      if (year > 1) {
        currentMonthlyContribution = currentMonthlyContribution * (1 + (stepUpPercent / 100));
      }

      for (let month = 1; month <= 12; month++) {
        totalInvested += currentMonthlyContribution;
        balance = (balance + currentMonthlyContribution) * (1 + r);
      }
    }

    const returnsEarned = Math.max(0, balance - totalInvested);

    const investedPct = (totalInvested / balance) * 100;
    const returnsPct = (returnsEarned / balance) * 100;

    results = {
      totalInvested,
      returnsEarned,
      totalValue: balance,
      investedPct,
      returnsPct,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (initialInvestment <= 0) newErrors.initialInvestment = 'Initial monthly investment must be greater than zero';
    if (stepUpPercent < 0) newErrors.stepUpPercent = 'Step up percentage cannot be negative';
    if (expectedReturn <= 0) newErrors.expectedReturn = 'Expected return rate must be greater than zero';
    if (timePeriod <= 0 || timePeriod > 40) newErrors.timePeriod = 'Tenure must be between 1 and 40 years';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setInitialInvestment(5000);
    setStepUpPercent(10);
    setExpectedReturn(12);
    setTimePeriod(15);
    setErrors({});
  };

  const radius = 45;
  const circ = 2 * Math.PI * radius;
  const investedDash = results ? (results.investedPct / 100) * circ : 0;
  const returnsDash = results ? (results.returnsPct / 100) * circ : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">SIP Details</h2>
            
            {/* Currency Select */}
            <div className="w-24">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="block w-full py-1.5 px-2 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none cursor-pointer"
              >
                <option value="USD">USD ($)</option>
                <option value="INR">INR (₹)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="PKR">PKR (Rs)</option>
                <option value="BDT">BDT (৳)</option>
                <option value="TRY">TRY (₺)</option>
              </select>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="initial-invest" className="block text-sm font-semibold text-foreground/80 mb-2">
                Initial Monthly Investment
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="initial-invest"
                  type="number"
                  value={initialInvestment || ''}
                  onChange={(e) => setInitialInvestment(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.initialInvestment && <p className="text-xs text-red-500 mt-1 font-medium">{errors.initialInvestment}</p>}
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="stepup-pct" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Annual Step Up (%)
                </label>
                <input
                  id="stepup-pct"
                  type="number"
                  value={stepUpPercent || ''}
                  onChange={(e) => setStepUpPercent(Number(e.target.value))}
                  className="block w-full py-3 px-3 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="exp-return" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Expected Return (%)
                </label>
                <input
                  id="exp-return"
                  type="number"
                  value={expectedReturn || ''}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="block w-full py-3 px-3 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="tenure-yrs" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Time Period (Years)
                </label>
                <input
                  id="tenure-yrs"
                  type="number"
                  value={timePeriod || ''}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="block w-full py-3 px-3 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>
            </div>
            {errors.timePeriod && <p className="text-xs text-red-500 mt-1 font-medium">{errors.timePeriod}</p>}

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate SIP Growth
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
            <h2 className="text-xl font-bold text-foreground mb-6">Maturity Projections</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-3.5">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                      Total Future Value
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {currencySymbols[currency]}{results.totalValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Invested Capital:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      Estimated Returns:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.returnsEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 110 110">
                      <circle
                        cx="55"
                        cy="55"
                        r={radius}
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      {investedDash > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeDasharray={`${investedDash} ${circ - investedDash}`}
                          strokeDashoffset="0"
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {returnsDash > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeDasharray={`${returnsDash} ${circ - returnsDash}`}
                          strokeDashoffset={-investedDash}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/40">
                        Yield Ratio
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {results.returnsPct.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter investment details to view projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
