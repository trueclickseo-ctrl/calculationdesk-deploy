'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `Simple Interest and Compound Interest are the two primary methods of calculating interest on a principal sum. Simple Interest is calculated solely as a percentage of the principal amount. Compound Interest is calculated on the initial principal as well as the accumulated interest of previous periods, representing "interest on interest" which accelerates wealth growth over time.`,
  formula: `The formulas used to compute interest returns are:

**Simple Interest (SI):**
$$\\text{SI} = P \\times R \\times T / 100$$
$$\\text{Total Maturity Amount} = P + \\text{SI}$$

**Compound Interest (CI):**
$$\\text{Total Maturity Amount (A)} = P \\times \\left(1 + \\frac{R}{n \\times 100}\\right)^{n \\times T}$$
$$\\text{CI} = A - P$$

Where:
- **P** is the principal investment amount.
- **R** is the annual interest rate (%).
- **T** is the time tenure in years.
- **n** is the number of compounding intervals per year (e.g., 4 for quarterly, 12 for monthly, 1 for yearly).`,
  example: `Suppose you invest $10,000 (P) at a 10% annual interest rate (R) for 5 years (T). For compound interest, assume quarterly compounding (n = 4).

**Simple Interest Calculation:**
1. SI = $10,000 × 10 × 5 / 100 = $5,000.
2. Maturity Value = $10,000 + $5,000 = $15,000.

**Compound Interest Calculation:**
1. Maturity Value (A) = $10,000 × (1 + 10 / 400)^{20} = $10,000 × (1.025)^{20} ≈ $16,386.16.
2. CI = $16,386.16 - $10,000 = $6,386.16.
3. Compound Interest yields an extra **$1,386.16** compared to simple interest.`,
  faqs: [
    {
      q: 'Which is better, simple or compound interest?',
      a: 'Compound interest is significantly better for saving and investing because it grows exponentially. However, for borrowing a loan, simple interest is better because your interest payments do not compound.',
    },
    {
      q: 'What does "interest compounding" mean?',
      a: 'Compounding means that the interest you earn in a period is added to the principal balance, and in the next period, you earn interest on both the principal and the interest previously earned.',
    },
    {
      q: 'How does tenure affect compound interest growth?',
      a: 'The longer the investment tenure, the more compound interest accelerates. In the early years, the difference between simple and compound interest is small, but over 20+ years, the compound returns dwarf simple returns.',
    },
  ],
};

export default function SimpleCompoundInterest() {
  const [principal, setPrincipal] = useState<number>(10000);
  const [rate, setRate] = useState<number>(8);
  const [tenure, setTenure] = useState<number>(5);
  const [compounding, setCompounding] = useState<'monthly' | 'quarterly' | 'half-yearly' | 'yearly'>('yearly');
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = principal > 0 && rate > 0 && rate <= 100 && tenure > 0 && tenure <= 50;

  let results = null;
  if (isValid) {
    const P = principal;
    const R = rate;
    const T = tenure;

    // Simple Interest
    const simpleInterest = (P * R * T) / 100;
    const simpleTotal = P + simpleInterest;

    // Compound Interest
    let n = 1;
    if (compounding === 'monthly') n = 12;
    else if (compounding === 'quarterly') n = 4;
    else if (compounding === 'half-yearly') n = 2;

    const compoundTotal = P * Math.pow(1 + R / (n * 100), n * T);
    const compoundInterest = Math.max(0, compoundTotal - P);
    const compoundDifference = Math.max(0, compoundTotal - simpleTotal);

    results = {
      simpleInterest,
      simpleTotal,
      compoundInterest,
      compoundTotal,
      compoundDifference,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (principal <= 0) newErrors.principal = 'Principal must be greater than zero';
    if (rate <= 0 || rate > 100) newErrors.rate = 'Rate must be between 0.1% and 100%';
    if (tenure <= 0 || tenure > 50) newErrors.tenure = 'Tenure must be between 1 and 50 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setPrincipal(10000);
    setRate(8);
    setTenure(5);
    setCompounding('yearly');
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Interest Setup</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="principal" className="block text-sm font-semibold text-foreground/80 mb-2">
                Principal Amount
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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Interest Rate (p.a.)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="rate"
                    type="number"
                    step="0.01"
                    value={rate || ''}
                    onChange={(e) => setRate(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.rate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.rate}</p>}
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
                {errors.tenure && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tenure}</p>}
              </div>
            </div>

            <div>
              <span className="block text-sm font-semibold text-foreground/80 mb-2">Compound Frequency</span>
              <div className="grid grid-cols-4 gap-2">
                {(['monthly', 'quarterly', 'half-yearly', 'yearly'] as const).map((freq) => (
                  <button
                    key={freq}
                    type="button"
                    onClick={() => setCompounding(freq)}
                    className={`py-2 px-1.5 rounded-xl border text-[10px] font-bold capitalize transition-all cursor-pointer text-center ${
                      compounding === freq
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-background hover:bg-border text-foreground/70'
                    }`}
                  >
                    {freq.split('-')[0]}
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
            <h2 className="text-xl font-bold text-foreground mb-6">Interest Comparison</h2>
            {results ? (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  {/* Simple Interest */}
                  <div className="rounded-xl border border-border bg-background p-4">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase tracking-wider">
                      Simple Interest Total
                    </span>
                    <span className="block text-xl font-extrabold text-foreground mt-1">
                      ${results.simpleTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                      (${results.simpleInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })} interest)
                    </span>
                  </div>
                  {/* Compound Interest */}
                  <div className="rounded-xl border border-primary/20 bg-primary/5 p-4">
                    <span className="block text-[10px] font-bold text-primary/80 uppercase tracking-wider">
                      Compound Interest Total
                    </span>
                    <span className="block text-xl font-extrabold text-primary mt-1">
                      ${results.compoundTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="block text-[10px] text-primary/70 mt-1 font-semibold">
                      (${results.compoundInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })} interest)
                    </span>
                  </div>
                </div>

                {results.compoundDifference > 0 && (
                  <div className="rounded-xl bg-emerald-500/5 border border-emerald-500/20 p-4 text-emerald-600 dark:text-emerald-500">
                    <span className="block text-xs font-bold uppercase tracking-wider">Compounding Benefit</span>
                    <p className="text-sm font-semibold mt-1">
                      Compounding earns you an extra <strong>${results.compoundDifference.toLocaleString(undefined, { maximumFractionDigits: 0 })}</strong> over {tenure} years compared to simple interest.
                    </p>
                  </div>
                )}

                {/* Simple vs Compound growth bar representation */}
                <div className="pt-2">
                  <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-2">Growth Comparison</span>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/60 mb-1">
                        <span>Simple Interest Return</span>
                        <span>${results.simpleTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                        <div className="bg-accent h-full rounded-full" style={{ width: '90%' }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-primary mb-1">
                        <span>Compound Interest Return</span>
                        <span>${results.compoundTotal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-border overflow-hidden">
                        <div 
                          className="bg-primary h-full rounded-full" 
                          style={{ width: `${(results.compoundTotal / results.simpleTotal) * 90}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter investment parameters to view comparative returns.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
