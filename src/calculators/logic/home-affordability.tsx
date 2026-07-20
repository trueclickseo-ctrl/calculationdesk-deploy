'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Home Affordability Calculator estimates the maximum home purchase price you can afford based on your household income, down payment, monthly debts, and the Debt-to-Income (DTI) ratio.`,
  formula: `Affordability bounds are solved back from debt-to-income caps:

**1. Maximum Monthly Debt Allowed ($D_{max}$):**
$$D_{max} = \\frac{\\text{Annual Income}}{12} \\times \\left( \\frac{\\text{DTI Rate \\%}}{100} \\right)$$

**2. Maximum Monthly Housing (P&I) Budget ($M_{max}$):**
$$M_{max} = (D_{max} - \\text{Monthly Debts}) \\times 0.80$$
*(Assuming 20% allocated to taxes and insurance overhead)*

**3. Maximum Affordable Loan Principal ($P_{max}$):**
$$P_{max} = M_{max} \\times \\frac{(1+r)^n - 1}{r(1+r)^n}$$

**4. Maximum Affordable Property Price:**
$$\\text{Affordable Price} = P_{max} + \\text{Down Payment}$$`,
  example: `**Calculate affordability for $100,000 income, $500 monthly debts, $50,000 down payment, at 6% interest over 30 years (36% DTI):**
- $D_{max}$ = ($100,000 / 12) × 36% = $3,000/month.
- $M_{max}$ (Housing Budget) = ($3,000 - $500) × 0.80 = $2,000/month.
- Maximum Loan Principal ($P_{max}$) at 6% = $333,583.
- Maximum Property Price = $333,583 + $50,000 = **$383,583**.`,
  faqs: [
    {
      q: 'What is the Debt-to-Income (DTI) ratio?',
      a: 'The DTI ratio is the percentage of your gross monthly income that goes toward paying your monthly debts (credit cards, auto loans, student loans, mortgage). Lenders typically prefer a DTI ratio of 36% or less, with no more than 28% allocated to housing expenses.',
    },
    {
      q: 'Does a larger down payment increase affordability?',
      a: 'Yes, because every dollar added to your down payment directly increases your home purchasing power dollar-for-dollar without raising your loan balance or monthly mortgage payments.',
    },
    {
      q: 'What is the 28/36 rule?',
      a: 'A classic personal finance rule: you should spend no more than 28% of your gross monthly income on housing costs, and no more than 36% on total debt payments (housing + other debts).',
    },
  ],
};

export default function HomeAffordabilityCalculator() {
  const [income, setIncome] = useState<number>(100000);
  const [debts, setDebts] = useState<number>(500);
  const [downPayment, setDownPayment] = useState<number>(50000);
  const [rate, setRate] = useState<number>(6);
  const [term, setTerm] = useState<number>(30);
  const [dti, setDti] = useState<number>(36);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setIncome(100000);
    setDebts(500);
    setDownPayment(50000);
    setRate(6);
    setTerm(30);
    setDti(36);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(income) && income > 0 &&
                  !isNaN(debts) && debts >= 0 &&
                  !isNaN(downPayment) && downPayment >= 0 &&
                  !isNaN(rate) && rate > 0 &&
                  !isNaN(term) && term > 0 &&
                  !isNaN(dti) && dti > 0 && dti < 100;

  if (isValid) {
    const monthlyIncome = income / 12;
    const maxMonthlyDebt = monthlyIncome * (dti / 100);
    
    // Max monthly housing payment (P&I) assuming taxes/ins = 20%
    const maxHousingPayment = Math.max(0, (maxMonthlyDebt - debts) * 0.8);
    
    const monthlyRate = rate / 12 / 100;
    const numPayments = term * 12;

    const maxLoan = maxHousingPayment * (Math.pow(1 + monthlyRate, numPayments) - 1) / (monthlyRate * Math.pow(1 + monthlyRate, numPayments));
    const maxPrice = maxLoan + downPayment;

    results = {
      maxMonthlyDebt,
      maxHousingPayment,
      maxLoan,
      maxPrice,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (income <= 0 || isNaN(income)) newErrors.income = 'Annual income must be greater than zero';
    if (debts < 0 || isNaN(debts)) newErrors.debts = 'Monthly debts cannot be negative';
    if (downPayment < 0 || isNaN(downPayment)) newErrors.downPayment = 'Down payment cannot be negative';
    if (rate <= 0 || isNaN(rate)) newErrors.rate = 'Mortgage rate must be greater than zero';
    if (term <= 0 || isNaN(term)) newErrors.term = 'Term must be greater than zero';
    if (dti <= 0 || dti >= 100 || isNaN(dti)) newErrors.dti = 'DTI ratio must be between 1% and 99%';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Financial Capacity</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="annual-income" className="block text-sm font-semibold text-foreground/80 mb-2">Annual Household Income ($)</label>
              <input
                id="annual-income"
                type="number"
                value={income}
                onChange={(e) => { setIncome(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.income && <p className="text-xs text-red-500 mt-1 font-medium">{errors.income}</p>}
            </div>

            <div>
              <label htmlFor="monthly-debts" className="block text-sm font-semibold text-foreground/80 mb-2">Monthly Debt Payments ($)</label>
              <input
                id="monthly-debts"
                type="number"
                value={debts}
                onChange={(e) => { setDebts(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.debts && <p className="text-xs text-red-500 mt-1 font-medium">{errors.debts}</p>}
            </div>

            <div>
              <label htmlFor="down-payment" className="block text-sm font-semibold text-foreground/80 mb-2">Down Payment Savings ($)</label>
              <input
                id="down-payment"
                type="number"
                value={downPayment}
                onChange={(e) => { setDownPayment(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.downPayment && <p className="text-xs text-red-500 mt-1 font-medium">{errors.downPayment}</p>}
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="interest-rate" className="block text-xs font-bold text-foreground/75 mb-2">Rate (%)</label>
                <input
                  id="interest-rate"
                  type="number"
                  step="0.01"
                  value={rate}
                  onChange={(e) => { setRate(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-2 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="loan-term" className="block text-xs font-bold text-foreground/75 mb-2">Term (Yrs)</label>
                <input
                  id="loan-term"
                  type="number"
                  value={term}
                  onChange={(e) => { setTerm(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-2 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="dti-limit" className="block text-xs font-bold text-foreground/75 mb-2">DTI (%)</label>
                <input
                  id="dti-limit"
                  type="number"
                  value={dti}
                  onChange={(e) => { setDti(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-2 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Affordability
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
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Purchasing Capacity</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Maximum Affordable Price</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    ${results.maxPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Maximum Monthly P&I</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.maxHousingPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Maximum Borrowable Loan</span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.maxLoan.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter financial capacities.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
