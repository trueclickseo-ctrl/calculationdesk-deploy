'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Retirement Calculator is a comprehensive financial planning tool designed to estimate how much wealth you need to accumulate before you stop working. It accounts for inflation, current lifestyle costs, life expectancy, and different expected return rates before and after retirement, giving you a precise monthly savings target today.`,
  formula: `Retirement planning involves a two-stage compound interest calculation:

**1. Future Expense Adjustment (due to inflation):**
$$E_{\\text{retirement}} = E_{\\text{current}} \\times (1 + f)^{Y_{\\text{pre}}}$$

**2. Inflation-Adjusted Return Rate Post-Retirement:**
$$r_{\\text{real}} = \\frac{1 + r_{\\text{post}}}{1 + f} - 1$$

**3. Total Corpus Target (Annuity due model during retirement years):**
$$\\text{Corpus} = (E_{\\text{retirement}} \\times 12) \\times \\frac{1 - (1 + r_{\\text{real}})^{-Y_{\\text{post}}}}{r_{\\text{real}}} \\times (1 + r_{\\text{real}})$$

**4. Monthly Savings Required (Future value of annuity):**
$$\\text{Monthly Savings} = \\frac{\\text{Corpus} \\times i_{\\text{pre}}}{(1 + i_{\\text{pre}})^{n_{\\text{pre}}} - 1}$$

Where:
- **E_current** is your current monthly expenses.
- **Y_pre** is the years left until retirement (Retirement Age - Current Age).
- **Y_post** is the years spent in retirement (Life Expectancy - Retirement Age).
- **f** is the inflation rate.
- **r_post** is the expected annual return rate during retirement.
- **i_pre** is the monthly return rate pre-retirement ($r_{\\text{pre}} / 12 / 100$).
- **n_pre** is the total months to retirement ($Y_{\\text{pre}} \\times 12$).`,
  example: `Suppose a 30-year-old investor spends $4,000 monthly, expects to retire at 60, has a life expectancy of 85, expects a 6% inflation rate, 12% returns pre-retirement, and 8% returns post-retirement.

1. Years to retirement = 30 years. Years in retirement = 25 years.
2. Monthly expenses at age 60 (inflation-adjusted) ≈ $22,974 per month ($275,688/year).
3. Inflation-adjusted real return post-retirement = (1.08 / 1.06) - 1 ≈ 1.887%.
4. Target corpus required at age 60 ≈ $5,655,000.
5. Monthly savings required today to build this corpus ≈ $1,610 per month.`,
  faqs: [
    {
      q: 'Why does the return rate change post-retirement?',
      a: 'Post-retirement portfolios typically shift from aggressive equity funds to conservative debt instruments (like bonds or fixed income) to guarantee security. Consequently, the expected return rate is usually modeled lower than the pre-retirement growth rate.',
    },
    {
      q: 'How does inflation affect my retirement corpus?',
      a: 'Inflation is the greatest threat to retirement. A 6% inflation rate doubles prices every 12 years, meaning you will need a significantly larger nominal sum in the future to maintain your current lifestyle.',
    },
    {
      q: 'What if I want to retire earlier?',
      a: 'Retiring early decreases the compounding time for your savings (pre-retirement years) and increases the number of years you must live on your savings (post-retirement years), requiring a much higher monthly savings rate.',
    },
  ],
};

export default function RetirementCalculator() {
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(4000);
  const [inflationRate, setInflationRate] = useState<number>(6);
  const [preReturn, setPreReturn] = useState<number>(12);
  const [postReturn, setPostReturn] = useState<number>(8);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = currentAge >= 18 && retirementAge > currentAge && lifeExpectancy > retirementAge &&
                  monthlyExpenses > 0 && inflationRate >= 0 && inflationRate <= 50 &&
                  preReturn >= 0 && preReturn <= 100 && postReturn >= 0 && postReturn <= 100;

  let results = null;
  if (isValid) {
    const Y_pre = retirementAge - currentAge;
    const Y_post = lifeExpectancy - retirementAge;
    
    // Future monthly expense adjusted for inflation
    const expensesAtRetirement = monthlyExpenses * Math.pow(1 + inflationRate / 100, Y_pre);
    const annualExpensesAtRetirement = expensesAtRetirement * 12;

    // Inflation-adjusted return rate post-retirement (real return)
    const realReturn = (1 + postReturn / 100) / (1 + inflationRate / 100) - 1;

    // Corpus required (present value of annuity due over Y_post years at realReturn)
    let targetCorpus = 0;
    if (realReturn === 0) {
      targetCorpus = annualExpensesAtRetirement * Y_post;
    } else {
      targetCorpus = annualExpensesAtRetirement * 
        ((1 - Math.pow(1 + realReturn, -Y_post)) / realReturn) * (1 + realReturn);
    }

    // Monthly savings required pre-retirement (Future value of monthly annuity)
    const n_pre = Y_pre * 12;
    const i_pre = preReturn / 12 / 100;
    let monthlySavings = 0;

    if (i_pre === 0) {
      monthlySavings = targetCorpus / n_pre;
    } else {
      monthlySavings = (targetCorpus * i_pre) / (Math.pow(1 + i_pre, n_pre) - 1);
    }

    results = {
      yearsToRetire: Y_pre,
      yearsInRetirement: Y_post,
      expensesAtRetirement,
      targetCorpus,
      monthlySavings,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (currentAge < 18 || currentAge >= 100) newErrors.currentAge = 'Current age must be between 18 and 99';
    if (retirementAge <= currentAge) newErrors.retirementAge = 'Retirement age must be greater than current age';
    if (lifeExpectancy <= retirementAge) newErrors.lifeExpectancy = 'Life expectancy must be greater than retirement age';
    if (monthlyExpenses <= 0) newErrors.monthlyExpenses = 'Monthly expenses must be greater than zero';
    if (inflationRate < 0 || inflationRate > 50) newErrors.inflationRate = 'Inflation rate must be between 0% and 50%';
    if (preReturn < 0 || preReturn > 100) newErrors.preReturn = 'Pre-retirement return must be between 0% and 100%';
    if (postReturn < 0 || postReturn > 100) newErrors.postReturn = 'Post-retirement return must be between 0% and 100%';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setCurrentAge(30);
    setRetirementAge(60);
    setLifeExpectancy(85);
    setMonthlyExpenses(4000);
    setInflationRate(6);
    setPreReturn(12);
    setPostReturn(8);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Retirement Goals</h2>
          
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="current-age" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Current Age
                </label>
                <div className="relative rounded-lg border border-border bg-background focus-within:border-primary transition-all">
                  <input
                    id="current-age"
                    type="number"
                    value={currentAge || ''}
                    onChange={(e) => setCurrentAge(Number(e.target.value))}
                    className="block w-full py-2 px-3 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.currentAge && <p className="text-[10px] text-red-500 mt-1">{errors.currentAge}</p>}
              </div>

              <div>
                <label htmlFor="retirement-age" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Retire Age
                </label>
                <div className="relative rounded-lg border border-border bg-background focus-within:border-primary transition-all">
                  <input
                    id="retirement-age"
                    type="number"
                    value={retirementAge || ''}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="block w-full py-2 px-3 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.retirementAge && <p className="text-[10px] text-red-500 mt-1">{errors.retirementAge}</p>}
              </div>

              <div>
                <label htmlFor="life-expectancy" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Life Expect
                </label>
                <div className="relative rounded-lg border border-border bg-background focus-within:border-primary transition-all">
                  <input
                    id="life-expectancy"
                    type="number"
                    value={lifeExpectancy || ''}
                    onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                    className="block w-full py-2 px-3 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.lifeExpectancy && <p className="text-[10px] text-red-500 mt-1">{errors.lifeExpectancy}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="monthly-expenses" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Current Monthly Expenses
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    $
                  </div>
                  <input
                    id="monthly-expenses"
                    type="number"
                    value={monthlyExpenses || ''}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.monthlyExpenses && <p className="text-xs text-red-500 mt-1 font-medium">{errors.monthlyExpenses}</p>}
              </div>

              <div>
                <label htmlFor="inflation-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Expected Inflation
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="inflation-rate"
                    type="number"
                    step="0.1"
                    value={inflationRate || ''}
                    onChange={(e) => setInflationRate(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.inflationRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.inflationRate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="pre-return" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Return Pre-Retirement
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="pre-return"
                    type="number"
                    step="0.1"
                    value={preReturn || ''}
                    onChange={(e) => setPreReturn(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.preReturn && <p className="text-xs text-red-500 mt-1 font-medium">{errors.preReturn}</p>}
              </div>

              <div>
                <label htmlFor="post-return" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Return Post-Retirement
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="post-return"
                    type="number"
                    step="0.1"
                    value={postReturn || ''}
                    onChange={(e) => setPostReturn(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.postReturn && <p className="text-xs text-red-500 mt-1 font-medium">{errors.postReturn}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate Plan
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
            <h2 className="text-xl font-bold text-foreground mb-6">Your Retirement Blueprint</h2>
            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Total Retirement Corpus Needed
                  </span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    ${results.targetCorpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                    To fund {results.yearsInRetirement} years in retirement based on inflation-adjusted expense.
                  </span>
                </div>

                <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Required Monthly Savings Today
                  </span>
                  <span className="block text-xl font-extrabold text-accent mt-1">
                    ${results.monthlySavings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                  <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                    Invested monthly at {preReturn}% expected return for the next {results.yearsToRetire} years.
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between">
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Inflation-adjusted Monthly Expense at Age {retirementAge}
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.expensesAtRetirement.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Years to Accumulate
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      {results.yearsToRetire} years
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view retirement blueprint.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
