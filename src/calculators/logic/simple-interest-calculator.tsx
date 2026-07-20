'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Simple Interest Calculator is a fundamental financial utility designed to compute the interest accrued on a principal sum over a specific time period. Unlike compound interest, simple interest is calculated solely as a percentage of the original principal amount, meaning the interest earned does not compound over successive terms. This calculator supports custom time intervals in years, months, or days, making it ideal for short-term loans, basic savings accounts, and promissory notes. You can review core interest concepts and calculators on official economic and financial portals: the [US Securities and Exchange Commission (SEC)](https://www.sec.gov), the [Securities and Exchange Board of India (SEBI)](https://www.sebi.gov.in), the [European Securities and Markets Authority (ESMA)](https://www.esma.europa.eu), the [Financial Conduct Authority (FCA)](https://www.fca.org.uk), the [Securities and Exchange Commission of Pakistan (SECP)](https://www.secp.gov.pk), the [Bangladesh Securities and Exchange Commission (BSEC)](https://sec.gov.bd), and the [Capital Markets Board of Turkey (SPK)](https://www.spk.gov.tr).',
  formula: `Simple interest calculations apply a direct multiplier based on principal, rate, and tenure:

1. **Simple Interest (I)**:
   $$I = P \\times \\left(\\frac{R}{100}\\right) \\times t$$
   Where:
   - $P$ is the principal investment or loan amount.
   - $R$ is the annual simple interest rate.
   - $t$ is the tenure expressed as a fraction of a year.

2. **Tenure Fraction ($t$)**:
   - If tenure is in Years: $t = \\text{Tenure}$
   - If tenure is in Months: $t = \\frac{\\text{Tenure}}{12}$
   - If tenure is in Days: $t = \\frac{\\text{Tenure}}{365}$

3. **Maturity Amount (A)**:
   $$A = P + I$$`,
  example: `Let's analyze a simple interest calculation example. Suppose you deposit $10,000 for 18 months at an annual simple interest rate of 6%.

1. **Principal (P)** = $10,000.
2. **Interest Rate (R)** = 6%.
3. **Tenure (t)** = 18 months, which equals:
   $$t = \\frac{18}{12} = 1.5 \\text{ years}$$

4. **Interest Earned (I)**:
   $$I = 10,000 \\times 0.06 \\times 1.5 = \\text{S}900$$

5. **Maturity Value (A)**:
   $$A = 10,000 + 900 = \\text{S}10,900$$

At the end of the 18-month tenure, the total amount payable is $10,900, comprising the $10,000 principal and $900 in simple interest.`,
  faqs: [
    {
      q: 'What is the main difference between simple and compound interest?',
      a: 'Simple interest is calculated only on the initial principal amount throughout the tenure. Compound interest is calculated on the principal plus any accumulated interest from prior periods, leading to exponential growth.',
    },
    {
      q: 'Under what circumstances is simple interest commonly used?',
      a: 'Simple interest is typically used for short-term financial instruments, car loans, personal loans, certificates of deposit (CD) with fixed monthly payouts, and standard retail bank savings accounts.',
    },
    {
      q: 'Does simple interest earn more than compound interest?',
      a: 'No. For any interest rate and tenure greater than one compounding period, compound interest will always yield higher returns than simple interest because of the compounding effect.',
    },
    {
      q: 'How is tenure in days calculated?',
      a: 'When you select tenure in days, the calculator divides the number of days by 365 to determine the exact fraction of a year ($t$), which represents standard bank interest day-count conventions.',
    },
    {
      q: 'Are simple interest earnings taxable?',
      a: 'Yes, interest income earned from simple interest loans or savings deposits is generally treated as taxable income under local tax regulations and must be reported on tax returns.',
    },
  ],
};

export default function SimpleInterestCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [principal, setPrincipal] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(6);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months' | 'days'>('years');

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

  const isValid = principal > 0 && interestRate > 0 && tenure > 0 && 
                  (tenureType === 'years' ? tenure <= 50 : tenureType === 'months' ? tenure <= 600 : tenure <= 18250);

  let results = null;
  if (isValid) {
    const P = principal;
    const R = interestRate;
    let t = tenure;

    if (tenureType === 'months') {
      t = tenure / 12;
    } else if (tenureType === 'days') {
      t = tenure / 365;
    }

    const interestEarned = P * (R / 100) * t;
    const maturityValue = P + interestEarned;

    results = {
      interestEarned,
      maturityValue,
      principalPct: (P / maturityValue) * 100,
      interestPct: (interestEarned / maturityValue) * 100,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (principal <= 0) newErrors.principal = 'Principal must be greater than zero';
    if (interestRate <= 0) newErrors.interestRate = 'Interest rate must be greater than zero';
    if (tenure <= 0) newErrors.tenure = 'Tenure must be greater than zero';
    if (tenureType === 'years' && tenure > 50) newErrors.tenure = 'Max tenure is 50 years';
    if (tenureType === 'months' && tenure > 600) newErrors.tenure = 'Max tenure is 600 months';
    if (tenureType === 'days' && tenure > 18250) newErrors.tenure = 'Max tenure is 18,250 days';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setPrincipal(10000);
    setInterestRate(6);
    setTenure(5);
    setTenureType('years');
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
            <h2 className="text-xl font-bold text-foreground">Interest Settings</h2>
            
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
              <label htmlFor="principal-amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                Investment / Loan Principal
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="principal-amount"
                  type="number"
                  value={principal || ''}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent text-foreground"
                />
              </div>
              {errors.principal && <p className="text-xs text-red-500 mt-1 font-medium">{errors.principal}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="interest-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Interest Rate (% p.a.)
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

              <div>
                <label htmlFor="tenure" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Time Period
                </label>
                <div className="flex gap-2">
                  <div className="relative flex-1 rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                    <input
                      id="tenure"
                      type="number"
                      value={tenure || ''}
                      onChange={(e) => setTenure(Number(e.target.value))}
                      className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent text-foreground"
                    />
                  </div>
                  <select
                    value={tenureType}
                    onChange={(e) => setTenureType(e.target.value as any)}
                    className="block py-2 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground outline-none"
                  >
                    <option value="years">Years</option>
                    <option value="months">Months</option>
                    <option value="days">Days</option>
                  </select>
                </div>
                {errors.tenure && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tenure}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Simple Interest
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
            <h2 className="text-xl font-bold text-foreground mb-6">Accrued Wealth Summary</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-3.5">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                      Expected Maturity Value
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {currencySymbols[currency]}{results.maturityValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      Principal:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{principal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50 flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-emerald-500" />
                      Simple Interest:
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.interestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50">Calculation Term:</span>
                    <span className="font-bold text-foreground">{tenure} {tenureType}</span>
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
                Enter details to view projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
