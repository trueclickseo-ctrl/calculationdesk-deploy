'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Sukanya Samriddhi Yojana (SSY) Planner is a dedicated investment tool built to forecast savings under the government-backed girl child savings scheme in India. SSY offers high interest rates (currently 8.2% p.a.) coupled with sovereign safety and tax exemptions under Section 80C. This planner estimates the total maturity value at the end of the statutory 21-year period, factoring in a 15-year contribution term and the remaining 6 years of compound growth. You can verify rules and interest rates on the official [National Savings Institute portal of India](https://www.nsiindia.gov.in).',
  formula: `The SSY calculator runs a year-by-year compounding simulation over the 21-year maturity period:

1. **Contribution Phase (Years 1 to 15)**:
   Deposits are made annually. The balance at the end of each year $t$ compounds at the annual rate $R$:
   $$\\text{Balance}_t = (\\text{Balance}_{t-1} + P) \\times \\left(1 + \\frac{R}{100}\\right)$$
   Where:
   - $P$ is the yearly contribution (statutory limit of ₹250 to ₹1,50,000 per year).
   - $R$ is the annual interest rate (e.g., 8.2%).

2. **Growth Phase (Years 16 to 21)**:
   No new contributions are permitted. The balance continues to compound annually for the remaining 6 years:
   $$\\text{Balance}_t = \\text{Balance}_{t-1} \\times \\left(1 + \\frac{R}{100}\\right)$$

3. **Total Interest Earned**:
   $$\\text{Interest Earned} = \\text{Maturity Value} - (P \\times 15)$$`,
  example: `Let's analyze an SSY projection example. Suppose you open an account for your newborn daughter and invest ₹1,00,000 annually at the start of each year for the 15-year contribution period at an annual interest rate of 8.2%.

1. **Contribution Phase (Years 1 to 15)**:
   - You deposit ₹1,00,000 every year for 15 years.
   - Total Invested Principal = ₹15,00,000.
   - Using the annual compounding formula, the balance accumulates to ₹29,88,575 at the end of year 15.

2. **Maturity Phase (Years 16 to 21)**:
   - No deposits are made for the next 6 years.
   - The balance compounds from ₹29,88,575 to ₹47,94,847 by the end of year 21.

3. **Cumulative Gains**:
   - Total Maturity Amount = ₹47,94,847.
   - Total Interest Earned = ₹32,94,847.

At maturity, the account pays out a completely tax-free lump sum of ₹47,94,847 to your daughter.`,
  faqs: [
    {
      q: 'Who is eligible to open an SSY account?',
      a: 'The account can be opened by a parent or legal guardian for a girl child who is an Indian resident and under the age of 10 years at the time of account opening. A maximum of two accounts are allowed per family (three in case of twins/triplets).',
    },
    {
      q: 'What are the minimum and maximum annual deposit limits in SSY?',
      a: 'A minimum deposit of ₹250 and a maximum deposit of ₹1,50,000 must be made in a financial year. If you deposit more than ₹1.5 Lakhs, the excess amount does not earn any interest and can be withdrawn.',
    },
    {
      q: 'Can the money be withdrawn before 21 years?',
      a: 'Partial withdrawal of up to 50% of the accumulated balance is allowed for the girl child\'s higher education once she reaches the age of 18 or passes the 10th standard. The account can be closed prematurely only if the girl child gets married after turning 18.',
    },
    {
      q: 'Is the maturity amount tax-free?',
      a: 'Yes. Sukanya Samriddhi Yojana falls under the Exempt-Exempt-Exempt (EEE) category. Contributions qualify for Section 80C deductions, interest accrued is tax-free, and the final maturity amount is completely exempt from income tax.',
    },
    {
      q: 'What happens if I fail to make the minimum deposit of ₹250?',
      a: 'If the minimum annual deposit of ₹250 is not made, the account is deactivated. It can be regularized by paying a penalty fee of ₹50 per year of default along with the minimum deposit amount for each year.',
    },
  ],
};

export default function SsyCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('INR');
  const [yearlyContribution, setYearlyContribution] = useState<number>(50000);
  const [interestRate, setInterestRate] = useState<number>(8.2);
  const [childAge, setChildAge] = useState<number>(1);

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

  const limitExceeded = currency === 'INR' && yearlyContribution > 150000;
  const isValid = yearlyContribution > 0 && interestRate > 0 && childAge >= 0 && childAge <= 10;

  let results = null;
  if (isValid) {
    const P = yearlyContribution;
    const R = interestRate;

    let balance = 0;
    let totalInvested = 0;

    // 15 years contribution phase
    for (let year = 1; year <= 15; year++) {
      totalInvested += P;
      balance = (balance + P) * (1 + (R / 100));
    }

    // 6 years compounding-only growth phase (total 21 years)
    for (let year = 16; year <= 21; year++) {
      balance = balance * (1 + (R / 100));
    }

    const totalInterest = Math.max(0, balance - totalInvested);
    const maturityAge = 21 - childAge;

    results = {
      maturityValue: balance,
      totalInvested,
      totalInterest,
      maturityAge,
      principalPct: (totalInvested / balance) * 100,
      interestPct: (totalInterest / balance) * 100,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (yearlyContribution <= 0) newErrors.yearlyContribution = 'Yearly contribution must be greater than zero';
    if (interestRate <= 0) newErrors.interestRate = 'Interest rate must be greater than zero';
    if (childAge < 0 || childAge > 10) newErrors.childAge = 'Child age must be between 0 and 10';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setYearlyContribution(50000);
    setInterestRate(8.2);
    setChildAge(1);
    setErrors({});
  };

  const radius = 45;
  const circ = 2 * Math.PI * radius;
  const principalDash = results ? (results.principalPct / 100) * circ : 0;
  const interestDash = results ? (results.interestPct / 100) * circ : 0;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">SSY Settings</h2>
            
            {/* Currency Select */}
            <div className="w-24">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="block w-full py-1.5 px-2 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none cursor-pointer"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
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
              <label htmlFor="yearly-contrib" className="block text-sm font-semibold text-foreground/80 mb-2">
                Yearly Contribution Amount
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="yearly-contrib"
                  type="number"
                  value={yearlyContribution || ''}
                  onChange={(e) => setYearlyContribution(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent text-foreground"
                />
              </div>
              {limitExceeded && (
                <p className="text-xs text-amber-500 mt-1.5 font-semibold">
                  ⚠️ Note: Exceeds standard maximum limit of ₹1,50,000 per year.
                </p>
              )}
              {errors.yearlyContribution && <p className="text-xs text-red-500 mt-1 font-medium">{errors.yearlyContribution}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="child-age" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Girl Child Age (0-10)
                </label>
                <input
                  id="child-age"
                  type="number"
                  value={childAge || ''}
                  onChange={(e) => setChildAge(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.childAge && <p className="text-xs text-red-500 mt-1 font-medium">{errors.childAge}</p>}
              </div>

              <div>
                <label htmlFor="interest-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Interest Rate (%)
                </label>
                <input
                  id="interest-rate"
                  type="number"
                  step="0.05"
                  value={interestRate || ''}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.interestRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.interestRate}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Girl Child Savings
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
                      Expected Maturity Amount
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {currencySymbols[currency]}{results.maturityValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Total Principal:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      Interest Yield:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50">Maturity Duration:</span>
                    <span className="font-bold text-foreground">21 Years</span>
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
                      {principalDash > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#3b82f6"
                          strokeWidth="8"
                          strokeDasharray={`${principalDash} ${circ - principalDash}`}
                          strokeDashoffset="0"
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {interestDash > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#10b981"
                          strokeWidth="8"
                          strokeDasharray={`${interestDash} ${circ - interestDash}`}
                          strokeDashoffset={-principalDash}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/40">
                        Interest Ratio
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {results.interestPct.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view retirement projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
