'use client';

import React, { useState } from 'react';
import { RefreshCw, AlertTriangle } from 'lucide-react';

export const seoData = {
  whatIs: `A Loan Eligibility Calculator determines the maximum loan amount a bank or financial institution is likely to lend you. It is based primarily on your net monthly salary, your existing monthly debt obligations (EMIs), and the bank's maximum Fixed Obligations to Income Ratio (FOIR), which represents the percentage of income a borrower can safely allocate to repaying debts.`,
  formula: `The maximum borrowable loan principal is calculated using a two-step formula:

**1. Maximum EMI Capability:**
$$\\text{Max EMI} = \\left(\\text{Net Monthly Salary} \\times \\frac{\\text{FOIR}}{100}\\right) - \\text{Existing Monthly EMIs}$$

**2. Maximum Approved Loan Principal (Reversing the EMI formula):**
$$\\text{Max Loan Amount} = \\text{Max EMI} \\times \\frac{(1 + r)^N - 1}{r \\times (1 + r)^N}$$

Where:
- **r** is the monthly interest rate ($R / 12 / 100$).
- **N** is the tenure in months ($T \\times 12$).
- **FOIR** is the bank's ceiling ratio (commonly 50% for standard incomes).`,
  example: `Suppose an applicant earns a net salary of $10,000 monthly, pays $1,500 in existing EMIs, has a FOIR cap of 50%, and seeks a 20-year loan at 7.5% interest.

1. Max EMI Capability = ($10,000 × 50%) - $1,500 = $3,500 per month.
2. Monthly Interest (r) = 7.5% / 12 / 100 = 0.00625.
3. Total Months (N) = 240.
4. Calculate Max Loan Amount:
   $$\\text{Max Loan} = 3,500 \\times \\frac{(1.00625)^{240} - 1}{0.00625 \\times (1.00625)^{240}} \\approx \\$434,166$$
5. The maximum home or personal loan this applicant qualifies for is **$434,166**.`,
  faqs: [
    {
      q: 'What is FOIR in loan eligibility?',
      a: 'FOIR stands for Fixed Obligations to Income Ratio. It is a metric banks use to verify how much of your monthly income is already committed to fixed expenses (like rent and active loans). Banks usually limit your total obligations (including the new loan EMI) to 40%–60% of your net income.',
    },
    {
      q: 'How can I increase my loan eligibility?',
      a: 'You can increase eligibility by: (1) paying off existing short-term debts to free up monthly cash flows, (2) adding a co-applicant (spouse or family member) to pool income, or (3) extending the loan tenure (which lowers the EMI, allowing a larger principal).',
    },
    {
      q: 'Does a credit score affect loan eligibility?',
      a: 'Yes. A higher credit score (750+) indicates low risk, making banks more likely to offer you the maximum FOIR limit and discount interest rates, directly boosting your borrowing potential.',
    },
  ],
};

export default function LoanEligibilityCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState<number>(10000);
  const [existingEmi, setExistingEmi] = useState<number>(1500);
  const [interestRate, setInterestRate] = useState<number>(7.5);
  const [tenure, setTenure] = useState<number>(20);
  const [foir, setFoir] = useState<number>(50);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = monthlyIncome > 0 && existingEmi >= 0 && interestRate > 0 && interestRate <= 100 && 
                  tenure > 0 && tenure <= 50 && foir > 0 && foir <= 100;

  let results = null;
  if (isValid) {
    const maxEmiAllowed = (monthlyIncome * (foir / 100)) - existingEmi;

    let maxLoanAmount = 0;
    if (maxEmiAllowed > 0) {
      const r = interestRate / 12 / 100;
      const N = tenure * 12;
      
      if (r === 0) {
        maxLoanAmount = maxEmiAllowed * N;
      } else {
        maxLoanAmount = maxEmiAllowed * ((Math.pow(1 + r, N) - 1) / (r * Math.pow(1 + r, N)));
      }
    }

    results = {
      maxEmiAllowed: Math.max(0, maxEmiAllowed),
      maxLoanAmount: Math.max(0, maxLoanAmount),
      debtRatio: ((existingEmi + Math.max(0, maxEmiAllowed)) / monthlyIncome) * 100,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (monthlyIncome <= 0) newErrors.monthlyIncome = 'Net monthly income must be greater than zero';
    if (existingEmi < 0) newErrors.existingEmi = 'Existing EMIs cannot be negative';
    if (interestRate <= 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0.1% and 100%';
    if (tenure <= 0 || tenure > 50) newErrors.tenure = 'Tenure must be between 1 and 50 years';
    if (foir <= 0 || foir > 100) newErrors.foir = 'FOIR limit must be between 1% and 100%';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setMonthlyIncome(10000);
    setExistingEmi(1500);
    setInterestRate(7.5);
    setTenure(20);
    setFoir(50);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Financial profile</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="monthly-income" className="block text-sm font-semibold text-foreground/80 mb-2">
                Net Monthly Income (Take-home)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="monthly-income"
                  type="number"
                  value={monthlyIncome || ''}
                  onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.monthlyIncome && <p className="text-xs text-red-500 mt-1 font-medium">{errors.monthlyIncome}</p>}
            </div>

            <div>
              <label htmlFor="existing-emi" className="block text-sm font-semibold text-foreground/80 mb-2">
                Existing Monthly Obligations (EMIs, Rent)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="existing-emi"
                  type="number"
                  value={existingEmi || ''}
                  onChange={(e) => setExistingEmi(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.existingEmi && <p className="text-xs text-red-500 mt-1 font-medium">{errors.existingEmi}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="interest-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Expected Rate (p.a.)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="interest-rate"
                    type="number"
                    step="0.1"
                    value={interestRate || ''}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.interestRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.interestRate}</p>}
              </div>

              <div>
                <label htmlFor="tenure" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Duration (years)
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
              <label htmlFor="foir" className="block text-sm font-semibold text-foreground/80 mb-2">
                Max FOIR Limit (Bank Standard)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  %
                </div>
                <input
                  id="foir"
                  type="number"
                  value={foir || ''}
                  onChange={(e) => setFoir(Number(e.target.value))}
                  className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              <span className="block text-[9px] text-foreground/40 mt-1 font-semibold">Standard banks cap FOIR at 50% for safety</span>
              {errors.foir && <p className="text-xs text-red-500 mt-1 font-medium">{errors.foir}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Eligibility
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
            <h2 className="text-xl font-bold text-foreground mb-6">Eligible Borrowing Capacity</h2>
            {results ? (
              <div className="space-y-5">
                {results.maxEmiAllowed === 0 && (
                  <div className="flex items-start gap-2.5 rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-red-600 dark:text-red-500">
                    <AlertTriangle className="h-5 w-5 shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-bold text-sm">Obligations Exceed Income Limit</h4>
                      <p className="text-xs font-medium opacity-90 mt-1">
                        Your active monthly obligations (${existingEmi.toLocaleString()}) are higher than your maximum bank repayment budget (${(monthlyIncome * foir / 100).toLocaleString()}). You do not qualify for additional loans at this stage.
                      </p>
                    </div>
                  </div>
                )}

                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Maximum Eligible Loan Amount
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    ${results.maxLoanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Max Monthly EMI Allowed
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.maxEmiAllowed.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Existing Obligations Ratio
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {((existingEmi / monthlyIncome) * 100).toFixed(0)}% of income
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Income Buffer Remaining
                  </span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    ${Math.max(0, monthlyIncome - existingEmi - results.maxEmiAllowed).toLocaleString()}
                  </span>
                  <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                    Uncommitted monthly buffer after all projected loan costs.
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter income and debt details to calculate eligibility.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
