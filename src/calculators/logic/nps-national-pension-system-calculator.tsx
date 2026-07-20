'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The NPS (National Pension System) Calculator is a retirement planning tool built to forecast the growth of your National Pension System account. It estimates your total accumulated corpus, details the split between the tax-free lump-sum withdrawal (up to 60%) and the required annuity purchase (minimum 40%), and projects your monthly pension payout. Savers use this planner to design their retirement portfolios and evaluate the tax-saving advantages under Section 80CCD. You can review official National Pension System guidelines and open accounts on the official [Pension Fund Regulatory and Development Authority (PFRDA) portal](https://www.pfrda.org.in).',
  formula: `The NPS calculator uses standard monthly compounding formulas for systematic investments:

1. **Total Accumulated Corpus (FV)**:
   $$\\text{Corpus} = P \\times \\frac{(1 + r)^n - 1}{r} \\times (1 + r) + C \\times (1 + r)^n$$
   Where:
   - $P$ is the monthly contribution amount.
   - $r$ is the monthly expected return rate:
     $$r = \\frac{\\text{Expected Annual Return}}{12 \\times 100}$$
   - $n$ is the total number of months:
     $$n = (\\text{Retirement Age} - \\text{Current Age}) \\times 12$$
   - $C$ is your current accumulated NPS balance.

2. **Lump Sum vs Annuity Split**:
   - **Annuity Corpus**:
     $$\\text{Annuity Corpus} = \\text{Total Corpus} \\times \\frac{\\text{Annuity Percentage}}{100}$$
     *(A statutory minimum of 40% is required to be reinvested into an annuity).*
   - **Lump Sum Corpus**:
     $$\\text{Lump Sum Corpus} = \\text{Total Corpus} - \\text{Annuity Corpus}$$

3. **Estimated Monthly Pension**:
   $$\\text{Monthly Pension} = \\frac{\\text{Annuity Corpus} \\times \\text{Expected Annuity Rate}}{12 \\times 100}$$`,
  example: `Let's analyze an NPS accumulation example. Suppose you are 25 years old and contribute ₹10,000 monthly until you retire at age 60 (35 years of contributions). You expect a 10% annual rate of return on your investment, plan to allocate 40% of your final corpus to an annuity, and expect a 6% annuity rate.

1. **Total Accrued Corpus**:
   - Total Invested Amount = ₹10,000 × 12 months × 35 years = ₹42,00,000.
   - Using the monthly compounding formula at 10% expected return, the total accumulated corpus grows to ₹3,82,82,768 (₹3.82 Crores).
   - Capital Gains Earned = ₹3,40,82,768.

2. **Statutory Splits (40% Annuity / 60% Lump Sum)**:
   - Reinvested Annuity Corpus (40%) = ₹1,53,13,107.
   - Tax-Free Lump Sum (60%) = ₹2,29,69,661.

3. **Pension Output**:
   - Estimated Monthly Pension = (₹1,53,13,107 × 6%) / 12 = ₹76,566 per month.

Thus, you retire with a cash lump sum of ₹2.29 Crores and a guaranteed lifelong pension of ₹76,566 per month.`,
  faqs: [
    {
      q: 'What is the minimum annuity percentage required in NPS?',
      a: 'Upon reaching retirement at age 60, you must use a minimum of 40% of the accumulated corpus to purchase a life annuity from an authorized provider. You can choose to allocate up to 100% of the corpus to annuity if you prefer a higher monthly pension.',
    },
    {
      q: 'Is the lump-sum withdrawal tax-free?',
      a: 'Yes. Up to 60% of the total accumulated NPS corpus can be withdrawn as a lump sum upon retirement, and the entire 60% is completely tax-free under Section 10(12A) of the Income Tax Act.',
    },
    {
      q: 'Can I withdraw my NPS corpus before age 60?',
      a: 'Yes, premature exit is allowed after 3 years, but with strict conditions: you can only withdraw up to 20% of the corpus as a lump sum, and the remaining 80% must be used to purchase an annuity. Partial withdrawals are allowed for specific events like medical emergencies, higher education, or home purchase.',
    },
    {
      q: 'What are the tax benefits of investing in NPS?',
      a: 'NPS offers tax deductions up to ₹1.5 Lakhs under Section 80C, plus an exclusive additional deduction of up to ₹50,000 under Section 80CCD(1B), bringing the total tax deduction limit to ₹2 Lakhs per financial year.',
    },
    {
      q: 'Can I choose how my NPS money is invested?',
      a: 'Yes. NPS offers two investment choices: Active Choice (where you decide the allocation between Equity, Corporate Bonds, Government Securities, and Alternative Assets up to certain limits) and Auto Choice (where the allocation is automatically rebalanced based on your age).',
    },
  ],
};

export default function NPSCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('INR');
  const [monthlyContribution, setMonthlyContribution] = useState<number>(10000);
  const [currentAge, setCurrentAge] = useState<number>(25);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [currentNpsBalance, setCurrentNpsBalance] = useState<number>(0);
  const [expectedReturn, setExpectedReturn] = useState<number>(10);
  const [annuityPercentage, setAnnuityPercentage] = useState<number>(40);
  const [annuityRate, setAnnuityRate] = useState<number>(6);

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

  const isValid = monthlyContribution >= 0 && currentAge >= 18 && retirementAge > currentAge && expectedReturn > 0 && annuityPercentage >= 40 && annuityPercentage <= 100 && annuityRate > 0;

  let results = null;
  if (isValid) {
    const yearsOfContrib = retirementAge - currentAge;
    const totalMonths = yearsOfContrib * 12;
    const r = (expectedReturn / 100) / 12;

    // Compounding Systematic Investment Plan formula
    let totalCorpus = 0;
    if (r > 0) {
      totalCorpus = monthlyContribution * ((Math.pow(1 + r, totalMonths) - 1) / r) * (1 + r) + currentNpsBalance * Math.pow(1 + r, totalMonths);
    } else {
      totalCorpus = (monthlyContribution * totalMonths) + currentNpsBalance;
    }

    const totalInvested = (monthlyContribution * totalMonths) + currentNpsBalance;
    const interestEarned = Math.max(0, totalCorpus - totalInvested);

    const annuityCorpus = totalCorpus * (annuityPercentage / 100);
    const lumpSumCorpus = totalCorpus - annuityCorpus;
    const monthlyPension = (annuityCorpus * (annuityRate / 100)) / 12;

    const lumpPct = ((lumpSumCorpus / totalCorpus) * 100);
    const annuityPct = ((annuityCorpus / totalCorpus) * 100);

    results = {
      totalCorpus,
      totalInvested,
      interestEarned,
      annuityCorpus,
      lumpSumCorpus,
      monthlyPension,
      yearsOfContrib,
      lumpPct,
      annuityPct,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (monthlyContribution < 0) newErrors.monthlyContribution = 'Contribution cannot be negative';
    if (currentAge < 18) newErrors.currentAge = 'Current age must be at least 18';
    if (retirementAge <= currentAge) newErrors.retirementAge = 'Retirement age must be greater than current age';
    if (annuityPercentage < 40 || annuityPercentage > 100) newErrors.annuityPercentage = 'Annuity percentage must be between 40% and 100%';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setMonthlyContribution(10000);
    setCurrentAge(25);
    setRetirementAge(60);
    setCurrentNpsBalance(0);
    setExpectedReturn(10);
    setAnnuityPercentage(40);
    setAnnuityRate(6);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Contribution Settings</h2>
            
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
              <label htmlFor="monthly-contrib" className="block text-sm font-semibold text-foreground/80 mb-2">
                Monthly Contribution
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="monthly-contrib"
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
                  Current Age
                </label>
                <input
                  id="current-age"
                  type="number"
                  value={currentAge || ''}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.currentAge && <p className="text-xs text-red-500 mt-1 font-medium">{errors.currentAge}</p>}
              </div>

              <div>
                <label htmlFor="retirement-age" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Retirement Age
                </label>
                <input
                  id="retirement-age"
                  type="number"
                  value={retirementAge || ''}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.retirementAge && <p className="text-xs text-red-500 mt-1 font-medium">{errors.retirementAge}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="nps-bal" className="block text-sm font-semibold text-foreground/80 mb-2">
                Current NPS Balance (If Any)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="nps-bal"
                  type="number"
                  value={currentNpsBalance || ''}
                  onChange={(e) => setCurrentNpsBalance(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="expected-return" className="block text-[11px] font-bold text-foreground/70 mb-1.5">
                  Expected Return (%)
                </label>
                <input
                  id="expected-return"
                  type="number"
                  step="0.1"
                  value={expectedReturn || ''}
                  onChange={(e) => setExpectedReturn(Number(e.target.value))}
                  className="block w-full py-2 px-3 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none"
                />
              </div>

              <div>
                <label htmlFor="annuity-pct" className="block text-[11px] font-bold text-foreground/70 mb-1.5">
                  Annuity Buy (%)
                </label>
                <input
                  id="annuity-pct"
                  type="number"
                  value={annuityPercentage || ''}
                  onChange={(e) => setAnnuityPercentage(Number(e.target.value))}
                  className="block w-full py-2 px-3 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none"
                />
                {errors.annuityPercentage && <p className="text-[9px] text-red-500 mt-1 font-semibold">{errors.annuityPercentage}</p>}
              </div>

              <div>
                <label htmlFor="annuity-rate" className="block text-[11px] font-bold text-foreground/70 mb-1.5">
                  Annuity Return (%)
                </label>
                <input
                  id="annuity-rate"
                  type="number"
                  step="0.1"
                  value={annuityRate || ''}
                  onChange={(e) => setAnnuityRate(Number(e.target.value))}
                  className="block w-full py-2 px-3 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Retirement Wealth
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
            <h2 className="text-xl font-bold text-foreground mb-6">NPS Maturity Projections</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Corpus Highlight */}
                <div className="rounded-xl bg-primary/5 p-5 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                    Total Accumulated Corpus
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1.5">
                    {currencySymbols[currency]}{results.totalCorpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Tax-Free Lump Sum (60%)
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {currencySymbols[currency]}{results.lumpSumCorpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Reinvested in Annuity ({results.annuityPct.toFixed(0)}%)
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {currencySymbols[currency]}{results.annuityCorpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Highlights Pension */}
                <div className="rounded-xl bg-emerald-500/5 p-4 border border-emerald-500/10 text-center">
                  <span className="block text-xs font-bold text-emerald-500/80 uppercase tracking-wider">
                    Projected Monthly Pension
                  </span>
                  <span className="block text-2xl font-extrabold text-emerald-500 mt-1">
                    {currencySymbols[currency]}{results.monthlyPension.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                {/* Sub details */}
                <div className="space-y-3">
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Total Invested Principal:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.totalInvested.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Interest / Growth Earned:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.interestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                {/* Graphical bar split */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Payout Distribution</h4>
                  <div className="w-full h-3 rounded-full bg-border overflow-hidden flex">
                    <div 
                      className="bg-primary h-full" 
                      style={{ width: `${results.lumpPct}%` }}
                      title="Lump Sum"
                    />
                    <div 
                      className="bg-emerald-500 h-full" 
                      style={{ width: `${results.annuityPct}%` }}
                      title="Annuity"
                    />
                  </div>
                  <div className="flex gap-4 mt-2 justify-center text-[10px] font-bold text-foreground/60">
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Tax-Free Lump Sum ({results.lumpPct.toFixed(0)}%)</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-emerald-500" /> Annuity Pension ({results.annuityPct.toFixed(0)}%)</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view retirement wealth projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
