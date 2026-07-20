'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Fixed Deposit (FD) is a financial instrument provided by banks or non-banking financial companies (NBFCs) which provides investors a higher rate of interest than a regular savings account, until a given maturity date. FDs compound interest periodically (usually monthly, quarterly, or yearly), lock in your rate for the entire term, and pay out the total balance upon maturity.`,
  formula: `The mathematical formula used to calculate FD maturity amount is:

$$A = P \\times \\left(1 + \\frac{r}{n \\times 100}\\right)^{n \\times t}$$

Where:
- **A** is the maturity amount.
- **P** is the principal investment amount.
- **r** is the annual rate of interest.
- **n** is the number of times interest is compounded per year (e.g., 4 for quarterly, 12 for monthly, 1 for yearly).
- **t** is the tenure in years.`,
  example: `Suppose you invest a principal of $10,000 (P) at a 7% annual interest rate (r) compounded quarterly (n = 4) for 5 years (t = 5).

1. Annual rate = 7% = 0.07.
2. Compounds per year (n) = 4.
3. Compute maturity amount (A):
   $$A = 10,000 \\times \\left(1 + \\frac{7}{400}\\right)^{4 \\times 5}$$
   $$A = 10,000 \\times \\left(1 + 0.0175\\right)^{20}$$
   $$A = 10,000 \\times (1.0175)^{20} \\approx \\$14,147.78$$
4. Interest Earned = $14,147.78 - $10,000 = $4,147.78.`,
  faqs: [
    {
      q: 'Which compounding frequency offers the highest interest returns?',
      a: 'Monthly compounding yields slightly higher returns than quarterly, half-yearly, or yearly frequencies because the interest is reinvested more frequently.',
    },
    {
      q: 'Can I withdraw money from a Fixed Deposit before maturity?',
      a: 'Yes, most banks allow premature withdrawal, but it usually attracts a penalty fee and a lower effective interest rate than initially agreed.',
    },
    {
      q: 'Are Fixed Deposit returns taxed?',
      a: 'Yes. In many jurisdictions, the interest earned from fixed deposits is treated as taxable income, subject to tax regulations and local tax brackets.',
    },
  ],
};

export default function FdCalculator() {
  const [principal, setPrincipal] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  const [compounding, setCompounding] = useState<'monthly' | 'quarterly' | 'half-yearly' | 'yearly'>('quarterly');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = principal > 0 && interestRate > 0 && interestRate <= 100 && tenure > 0 && 
                  (tenureType === 'years' ? tenure <= 50 : tenure <= 600);

  let results = null;
  if (isValid) {
    const P = principal;
    const r = interestRate;
    const t = tenureType === 'years' ? tenure : tenure / 12;

    let n = 4; // default quarterly
    if (compounding === 'monthly') n = 12;
    else if (compounding === 'half-yearly') n = 2;
    else if (compounding === 'yearly') n = 1;

    const maturityAmount = P * Math.pow(1 + r / (n * 100), n * t);
    const estInterest = Math.max(0, maturityAmount - P);

    const principalPercent = (P / maturityAmount) * 100;
    const interestPercent = (estInterest / maturityAmount) * 100;

    results = {
      maturityAmount,
      estInterest,
      principalPercent,
      interestPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (principal <= 0) newErrors.principal = 'Investment principal must be greater than zero';
    if (interestRate <= 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0.1% and 100%';
    if (tenure <= 0) newErrors.tenure = 'Tenure must be greater than zero';
    if (tenureType === 'years' && tenure > 50) newErrors.tenure = 'Max tenure is 50 years';
    if (tenureType === 'months' && tenure > 600) newErrors.tenure = 'Max tenure is 600 months';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setPrincipal(100000);
    setInterestRate(6.5);
    setTenure(5);
    setTenureType('years');
    setCompounding('quarterly');
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
          <h2 className="text-xl font-bold text-foreground mb-6">FD Investment Plan</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="principal" className="block text-sm font-semibold text-foreground/80 mb-2">
                Investment Principal
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="principal"
                  type="number"
                  value={principal || ''}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.principal && <p className="text-xs text-red-500 mt-1 font-medium">{errors.principal}</p>}
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
                Tenure
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1 rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="tenure"
                    type="number"
                    value={tenure || ''}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                <div className="flex rounded-xl border border-border bg-background p-1.5 gap-1 select-none">
                  <button
                    type="button"
                    onClick={() => { setTenureType('years'); if (errors.tenure) setErrors({}); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      tenureType === 'years'
                        ? 'bg-primary text-white'
                        : 'text-foreground/75 hover:bg-border'
                    }`}
                  >
                    Years
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTenureType('months'); if (errors.tenure) setErrors({}); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      tenureType === 'months'
                        ? 'bg-primary text-white'
                        : 'text-foreground/75 hover:bg-border'
                    }`}
                  >
                    Months
                  </button>
                </div>
              </div>
              {errors.tenure && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tenure}</p>}
            </div>

            <div>
              <span className="block text-sm font-semibold text-foreground/80 mb-2">Compounding Frequency</span>
              <div className="grid grid-cols-2 gap-2">
                {(['monthly', 'quarterly', 'half-yearly', 'yearly'] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setCompounding(freq)}
                    className={`py-2 px-3 rounded-xl border text-xs font-bold capitalize transition-all cursor-pointer text-center ${
                      compounding === freq
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-background hover:bg-border text-foreground/70'
                    }`}
                  >
                    {freq.replace('-', ' ')}
                  </button>
                ))}
              </div>
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
            <h2 className="text-xl font-bold text-foreground mb-6">Maturity Returns</h2>
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
                      Invested Principal
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${principal.toLocaleString()}
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
