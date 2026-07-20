'use client';

import React, { useState } from 'react';
import { RefreshCw, ChevronDown, ChevronUp } from 'lucide-react';

export const seoData = {
  whatIs: 'The Advanced Retirement Corpus Goal Planner is a financial forecasting utility designed to compute the total retirement savings pool (corpus) required to sustain your lifestyle after you stop working. Unlike simple estimators, this calculator accounts for the compounding effect of inflation on monthly living expenses, post-retirement investment returns, and the drawdown period based on your projected life expectancy. By modeling these factors, you can set a realistic wealth goal and develop a sustainable long-term retirement withdrawal strategy. You can review standard pension rules on the [Pension Fund Regulatory and Development Authority website](https://www.pfrda.org.in).',
  formula: `The mathematical methodology used to determine the required retirement corpus combines inflation adjustments and real return annuity pricing:

1. **Expenses Adjusted for Inflation at Retirement**:
   $$\\text{Retire Expense} = \\text{Current Monthly Expense} \\times (1 + f)^{N_{\\text{pre}}}$$
   Where $f$ is the inflation rate and $N_{\\text{pre}}$ is the number of years until retirement (Retirement Age - Current Age).

2. **Real Rate of Return (Inflation-Adjusted)**:
   $$r_{\\text{real}} = \\frac{1 + R_{\\text{post}}}{1 + f} - 1$$
   Where $R_{\\text{post}}$ is the annual return rate earned on the corpus during retirement.

3. **Total Retirement Corpus Goal**:
   $$\\text{Corpus} = (\\text{Retire Expense} \\times 12) \\times \\frac{1 - (1 + r_{\\text{real}})^{-N_{\\text{post}}}}{r_{\\text{real}}} \\times (1 + r_{\\text{real}})$$
   Where $N_{\\text{post}}$ is the retirement duration (Life Expectancy - Retirement Age).

Note that if the real rate of return is exactly zero (return matches inflation), the corpus required is simply the annual expense multiplied by the number of years in retirement.`,
  example: `Let's analyze a retirement corpus calculation example. Suppose a 30-year-old plans to retire at age 60 and expects to live until age 80.

1. **Time Parameters**:
   - Years until retirement ($N_{\\text{pre}}$) = 60 - 30 = 30 years.
   - Years in retirement ($N_{\\text{post}}$) = 80 - 60 = 20 years.

2. **Inflation Adjustment**:
   - Current monthly expenses = $2,500.
   - Expected inflation rate = 6% per year.
   - Adjusted monthly expense at age 60:
     $$\\text{Retire Expense} = 2,500 \\times (1 + 0.06)^{30} \\approx \\$14,358.73$$
   - Annual expense at retirement = $14,358.73 × 12 = $172,304.76.

3. **Real Return Rate**:
   - Post-retirement return rate = 8% per year.
   - Real rate ($r_{\\text{real}}$) = (1 + 0.08) / (1 + 0.06) - 1 = 1.8868% per year.

4. **Corpus Goal Calculation**:
   - Applying the annuity due formula:
     $$\\text{Corpus} = 172,304.76 \\times \\frac{1 - (1 + 0.018868)^{-20}}{0.018868} \\times (1 + 0.018868) \\approx \\$2,900,433$$

Thus, a target corpus of approximately $2.9 million is required at age 60 to fund a 20-year retirement.`,
  faqs: [
    {
      q: 'Why is inflation crucial in retirement planning?',
      a: 'Inflation erodes the purchasing power of money over time. If inflation is 6%, the cost of goods doubles roughly every 12 years. If you do not account for inflation, your corpus will run out much faster than planned.',
    },
    {
      q: 'What is the Safe Withdrawal Rate (SWR)?',
      a: 'The Safe Withdrawal Rate is the percentage of your total corpus you can withdraw annually without risk of running out of money. The traditional rule of thumb is 4%, though younger retirees or high-inflation environments may require a lower rate of 3% to 3.5%.',
    },
    {
      q: 'What is the real rate of return?',
      a: 'The real rate of return is the nominal interest rate or investment return adjusted for inflation. It represents the actual growth in purchasing power. For instance, if your portfolio earns 8% and inflation is 5%, your real return is approximately 2.86%.',
    },
    {
      q: 'How does increasing life expectancy affect my goal?',
      a: 'A longer life expectancy increases the duration of your retirement drawdown. Each additional year in retirement requires a larger initial corpus, as the funds must sustain withdrawals and compound over a longer period.',
    },
    {
      q: 'What assets should I hold post-retirement?',
      a: 'Post-retirement portfolios typically shift from aggressive growth (equity) to a conservative, income-generating mix of debt, annuities, dividend-paying stocks, and government bonds to protect capital while matching inflation.',
    },
  ],
};

interface YearlyDrawdown {
  year: number;
  age: number;
  openingBalance: number;
  expenseWithdrawn: number;
  growthEarned: number;
  closingBalance: number;
}

export default function AdvancedRetirementPlanner() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [currentAge, setCurrentAge] = useState<number>(30);
  const [retirementAge, setRetirementAge] = useState<number>(60);
  const [lifeExpectancy, setLifeExpectancy] = useState<number>(85);
  const [monthlyExpense, setMonthlyExpense] = useState<number>(5000);
  const [inflationRate, setInflationRate] = useState<number>(6); // %
  const [returnRate, setReturnRate] = useState<number>(8); // %
  const [showSchedule, setShowSchedule] = useState<boolean>(false);
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

  const yearsToRetire = retirementAge - currentAge;
  const retirementDuration = lifeExpectancy - retirementAge;
  
  const isValid = currentAge > 0 && retirementAge > currentAge && lifeExpectancy > retirementAge &&
                  monthlyExpense > 0 && inflationRate >= 0 && returnRate >= 0;

  let results = null;
  if (isValid) {
    // 1. Inflation adjusted expense at retirement
    const inflationMultiplier = Math.pow(1 + inflationRate / 100, yearsToRetire);
    const adjustedMonthlyExpense = monthlyExpense * inflationMultiplier;
    const initialAnnualExpense = adjustedMonthlyExpense * 12;

    // 2. Real return rate (post-retirement return adjusted for inflation)
    const infDecimal = inflationRate / 100;
    const retDecimal = returnRate / 100;
    const realRate = (1 + retDecimal) / (1 + infDecimal) - 1;

    // 3. Compute Corpus using year-by-year cash flows (drawdown simulation)
    // To ensure balances end exactly at 0 at lifeExpectancy, we calculate the NPV of inflation-adjusted expenses.
    let targetCorpus = 0;
    const schedule: YearlyDrawdown[] = [];

    // Calculate NPV of Annuity Due where withdrawals grow with inflation and corpus grows with nominal returns.
    // Each year's withdrawal is at the beginning of the year.
    // Withdrawal for year t (1-indexed): W_t = InitialAnnualExpense * (1 + inflation)^ (t-1)
    // Discount factor to year 0 (retirement): D_t = 1 / (1 + return)^(t-1)
    // Since W_t / D_t simplifies to using the real rate: NPV = Sum (W_1 * (1 + realRate)^(-(t-1)))
    for (let t = 1; t <= retirementDuration; t++) {
      const discountFactor = Math.pow(1 + realRate, -(t - 1));
      targetCorpus += initialAnnualExpense * discountFactor;
    }

    // Run actual forward drawdown simulation
    let currentBalance = targetCorpus;
    for (let t = 1; t <= retirementDuration; t++) {
      const age = retirementAge + t - 1;
      const expenseWithdrawn = initialAnnualExpense * Math.pow(1 + inflationRate / 100, t - 1);
      
      // Beginning of year withdrawal
      const remainingCapital = Math.max(0, currentBalance - expenseWithdrawn);
      const growthEarned = remainingCapital * (returnRate / 100);
      const closingBalance = remainingCapital + growthEarned;

      schedule.push({
        year: t,
        age,
        openingBalance: currentBalance,
        expenseWithdrawn,
        growthEarned,
        closingBalance: Math.max(0, closingBalance),
      });

      currentBalance = closingBalance;
    }

    results = {
      adjustedMonthlyExpense,
      initialAnnualExpense,
      targetCorpus,
      schedule,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (currentAge <= 0) newErrors.currentAge = 'Age must be greater than zero';
    if (retirementAge <= currentAge) newErrors.retirementAge = 'Retirement age must be greater than current age';
    if (lifeExpectancy <= retirementAge) newErrors.lifeExpectancy = 'Life expectancy must exceed retirement age';
    if (monthlyExpense <= 0) newErrors.monthlyExpense = 'Expenses must be greater than zero';
    if (inflationRate < 0 || inflationRate > 25) newErrors.inflationRate = 'Inflation rate must be between 0% and 25%';
    if (returnRate < 0 || returnRate > 25) newErrors.returnRate = 'Returns rate must be between 0% and 25%';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setCurrentAge(30);
    setRetirementAge(60);
    setLifeExpectancy(85);
    setMonthlyExpense(50000);
    setInflationRate(6);
    setReturnRate(8);
    setErrors({});
    setShowSchedule(false);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Retirement Goal Inputs</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="currency-select" className="block text-sm font-semibold text-foreground/80 mb-2">
                Currency
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <select
                  id="currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="block w-full py-3 px-3 text-sm font-semibold rounded-xl bg-transparent text-foreground/80 outline-none cursor-pointer"
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

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="current-age" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Current Age
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
                <label htmlFor="retirement-age" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Retirement
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="retirement-age"
                    type="number"
                    value={retirementAge || ''}
                    onChange={(e) => setRetirementAge(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.retirementAge && <p className="text-xs text-red-500 mt-1 font-medium">{errors.retirementAge}</p>}
              </div>

              <div>
                <label htmlFor="life-expectancy" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Life Expect.
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="life-expectancy"
                    type="number"
                    value={lifeExpectancy || ''}
                    onChange={(e) => setLifeExpectancy(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.lifeExpectancy && <p className="text-xs text-red-500 mt-1 font-medium">{errors.lifeExpectancy}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="monthly-expense" className="block text-sm font-semibold text-foreground/80 mb-2">
                Current Monthly Living Expenses
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="monthly-expense"
                  type="number"
                  value={monthlyExpense || ''}
                  onChange={(e) => setMonthlyExpense(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.monthlyExpense && <p className="text-xs text-red-500 mt-1 font-medium">{errors.monthlyExpense}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
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
                    className="block w-full py-3 pl-4 pr-8 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.inflationRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.inflationRate}</p>}
              </div>

              <div>
                <label htmlFor="return-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Post-Retire Return
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="return-rate"
                    type="number"
                    step="0.1"
                    value={returnRate || ''}
                    onChange={(e) => setReturnRate(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-8 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.returnRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.returnRate}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Plan Corpus
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
            <h2 className="text-xl font-bold text-foreground mb-6">Retirement Corpus Projection</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-5 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                    Target Retirement Corpus Goal
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1.5">
                    {currencySymbols[currency]}{results.targetCorpus.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Inflation-Adjusted Monthly Expense
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {currencySymbols[currency]}{results.adjustedMonthlyExpense.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-[10px] text-foreground/40 block mt-1.5">
                      At retirement age {retirementAge} (in {yearsToRetire} years)
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      First Year Annual Expense
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {currencySymbols[currency]}{results.initialAnnualExpense.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-[10px] text-foreground/40 block mt-1.5">
                      To sustain {retirementDuration} years of retirement
                    </span>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => setShowSchedule(!showSchedule)}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline hover:text-secondary cursor-pointer"
                  >
                    {showSchedule ? <ChevronUp className="h-3.5 w-3.5" /> : <ChevronDown className="h-3.5 w-3.5" />}
                    {showSchedule ? 'Hide Year-by-Year Drawdown Table' : 'Show Year-by-Year Drawdown Table'}
                  </button>
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

      {/* Year-by-Year Schedule table */}
      {showSchedule && results && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm overflow-hidden transition-all duration-300">
          <h3 className="text-lg font-bold text-foreground mb-4">Corpus Drawdown Schedule</h3>
          <div className="overflow-x-auto max-h-96">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-border text-foreground/50 font-bold uppercase tracking-wider">
                  <th className="py-3 px-2">Year</th>
                  <th className="py-3 px-2">Age</th>
                  <th className="py-3 px-2">Opening Balance</th>
                  <th className="py-3 px-2">Annual Drawdown</th>
                  <th className="py-3 px-2">Growth (Nominal)</th>
                  <th className="py-3 px-2">Closing Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {results.schedule.map((row) => (
                  <tr key={row.year} className="hover:bg-foreground/[0.02] text-foreground/80">
                    <td className="py-2.5 px-2 font-medium">Year {row.year}</td>
                    <td className="py-2.5 px-2 font-semibold">Age {row.age}</td>
                    <td className="py-2.5 px-2">{currencySymbols[currency]}{row.openingBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="py-2.5 px-2 text-red-500 font-medium">-{currencySymbols[currency]}{row.expenseWithdrawn.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="py-2.5 px-2 text-green-600">+{currencySymbols[currency]}{row.growthEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                    <td className="py-2.5 px-2 font-bold">{currencySymbols[currency]}{row.closingBalance.toLocaleString(undefined, { maximumFractionDigits: 0 })}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
