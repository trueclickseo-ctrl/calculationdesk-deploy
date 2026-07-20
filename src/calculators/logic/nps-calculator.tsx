'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The National Pension System (NPS) is a voluntary, long-term retirement savings scheme designed to enable systematic savings during your working life. It is regulated by the Pension Fund Regulatory and Development Authority (PFRDA). Upon reaching age 60, subscribers can withdraw a portion of the corpus as a tax-free lump sum and must use the remaining portion to purchase an annuity to secure a regular monthly pension.`,
  formula: `NPS calculations estimate the accumulated retirement corpus using monthly compounding:

$$A = P \\times \\frac{(1 + i)^n - 1}{i} \\times (1 + i)$$

Where:
- **A** is the accumulated pension corpus at age 60.
- **P** is the monthly contribution.
- **i** is the monthly rate of return (annual return rate divided by 12, and then by 100).
- **n** is the total number of months of investment (calculated as: $(60 - \\text{Current Age}) \\times 12$).

From the accumulated corpus (**A**):
- **Annuity Value** = $A \\times \\left(\\frac{\\text{Annuity Percentage}}{100}\\right)$ (minimum 40% required).
- **Lump Sum Payout** = $A - \\text{Annuity Value}$ (maximum 60% allowed).
- **Estimated Monthly Pension** = $\\frac{\\text{Annuity Value} \\times \\text{Annuity Return Rate}}{12 \\times 100}$.`,
  example: `Suppose a 30-year-old investor contributes $5,000 every month, expects a 10% annual return, and plans to purchase a 40% annuity at a 6% annuity rate upon reaching age 60.

1. Years of investment = 60 - 30 = 30 years (n = 360 months).
2. Monthly rate of return (i) = 10% / 12 / 100 = 0.00833 per month.
3. Accumulated Corpus (A) ≈ $11,396,600.
4. Total Invested = $5,000 × 360 = $1,800,000.
5. Annuity Corpus (40%) = $11,396,600 × 0.40 = $4,558,640.
6. Lump Sum Payout (60%) = $11,396,600 × 0.60 = $6,837,960.
7. Estimated Monthly Pension = ($4,558,640 × 6%) / 12 / 100 ≈ $22,793 per month.`,
  faqs: [
    {
      q: 'What is the minimum annuity purchase percentage in NPS?',
      a: 'Upon reaching retirement (age 60), you must utilize at least 40% of the accumulated corpus to purchase an annuity (pension plan). You can choose to allocate up to 100% of the corpus for annuity.',
    },
    {
      q: 'Is NPS tax-exempt?',
      a: 'Yes, contributions up to local standard limits (such as Section 80CCD in India) are tax-deductible, and the 60% lump-sum withdrawal at retirement is completely tax-free.',
    },
    {
      q: 'Can I withdraw from NPS before age 60?',
      a: 'NPS is a retirement-focused lock-in account. Partial withdrawals are allowed only under specific emergency conditions (medical, education, home purchase) after holding the account for at least 3 years.',
    },
  ],
};

export default function NpsCalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState<number>(5000);
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [expectedRate, setExpectedRate] = useState<number>(10);
  const [annuityPercent, setAnnuityPercent] = useState<number>(40);
  const [annuityRate, setAnnuityRate] = useState<number>(6);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = monthlyContribution > 0 && currentAge >= 18 && currentAge < 60 && 
                  expectedRate > 0 && expectedRate <= 100 && 
                  annuityPercent >= 40 && annuityPercent <= 100 &&
                  annuityRate > 0 && annuityRate <= 100;

  let results = null;
  if (isValid) {
    const P = monthlyContribution;
    const years = 60 - currentAge;
    const n = years * 12;
    const i = expectedRate / 12 / 100;

    let accumulatedCorpus = 0;
    if (i === 0) {
      accumulatedCorpus = P * n;
    } else {
      accumulatedCorpus = P * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
    }

    const totalInvested = P * n;
    const estInterest = Math.max(0, accumulatedCorpus - totalInvested);

    const annuityValue = accumulatedCorpus * (annuityPercent / 100);
    const lumpSumValue = accumulatedCorpus - annuityValue;
    const monthlyPension = (annuityValue * (annuityRate / 100)) / 12;

    const investedPercent = (totalInvested / accumulatedCorpus) * 100;
    const interestPercent = (estInterest / accumulatedCorpus) * 100;

    results = {
      accumulatedCorpus,
      totalInvested,
      estInterest,
      annuityValue,
      lumpSumValue,
      monthlyPension,
      investedPercent,
      interestPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (monthlyContribution <= 0) newErrors.monthlyContribution = 'Contribution must be greater than zero';
    if (currentAge < 18 || currentAge >= 60) newErrors.currentAge = 'Age must be between 18 and 59';
    if (expectedRate <= 0 || expectedRate > 100) newErrors.expectedRate = 'Expected rate must be between 0.1% and 100%';
    if (annuityPercent < 40 || annuityPercent > 100) newErrors.annuityPercent = 'Annuity percentage must be between 40% and 100%';
    if (annuityRate <= 0 || annuityRate > 100) newErrors.annuityRate = 'Annuity rate must be between 0.1% and 100%';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setMonthlyContribution(5000);
    setCurrentAge(30);
    setExpectedRate(10);
    setAnnuityPercent(40);
    setAnnuityRate(6);
    setErrors({});
  };

  const radius = 50;
  const circ = 2 * Math.PI * radius;
  const investedStroke = results ? (results.investedPercent / 100) * circ : 0;

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">NPS Pension Calculation</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="monthly-contribution" className="block text-sm font-semibold text-foreground/80 mb-2">
                Monthly Contribution
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="monthly-contribution"
                  type="number"
                  value={monthlyContribution || ''}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.monthlyContribution && <p className="text-xs text-red-500 mt-1 font-medium">{errors.monthlyContribution}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="current-age" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Current Age (years)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="current-age"
                    type="number"
                    value={currentAge || ''}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.currentAge && <p className="text-xs text-red-500 mt-1 font-medium">{errors.currentAge}</p>}
              </div>
              <div>
                <label htmlFor="expected-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Expected Return Rate
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="expected-rate"
                    type="number"
                    step="0.1"
                    value={expectedRate || ''}
                    onChange={(e) => setExpectedRate(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.expectedRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.expectedRate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="annuity-percent" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Annuity to Buy
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="annuity-percent"
                    type="number"
                    value={annuityPercent || ''}
                    onChange={(e) => setAnnuityPercent(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                <span className="block text-[9px] text-foreground/40 mt-1 font-semibold">Min 40% required</span>
                {errors.annuityPercent && <p className="text-xs text-red-500 mt-1 font-medium">{errors.annuityPercent}</p>}
              </div>
              <div>
                <label htmlFor="annuity-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Annuity Return Rate
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="annuity-rate"
                    type="number"
                    step="0.1"
                    value={annuityRate || ''}
                    onChange={(e) => setAnnuityRate(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.annuityRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.annuityRate}</p>}
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
            <h2 className="text-xl font-bold text-foreground mb-6">Retirement Corpus Projections</h2>
            {results ? (
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Retirement Corpus
                    </span>
                    <span className="block text-xl font-extrabold text-primary mt-1">
                      ${results.accumulatedCorpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Est. Monthly Pension
                    </span>
                    <span className="block text-xl font-extrabold text-accent mt-1">
                      ${results.monthlyPension.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Lump Sum Payout ({100 - annuityPercent}%)
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.lumpSumValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Annuity Value ({annuityPercent}%)
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.annuityValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Invested Amount
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.totalInvested.toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Interest Wealth Earned
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.estInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-32 w-32">
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
                        strokeDashoffset={investedStroke}
                        className="transition-all duration-500 ease-out"
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/40">
                        Interest Gain
                      </span>
                      <span className="text-xs font-extrabold text-foreground">
                        {results.interestPercent.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view retirement forecasts.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
