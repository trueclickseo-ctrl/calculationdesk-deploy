'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Loan Against Property (LAP) Calculator helps you determine the maximum loan principal you can borrow by pledging your residential, commercial, or industrial real estate asset as collateral. It estimates your maximum loan approval based on the property market value and the bank's Loan-to-Value (LTV) ratio limit.`,
  formula: `LAP calculations estimate your borrowing power and repayment EMIs:

$$\\text{Maximum Approved Loan Amount} = \\text{Property Value} \\times \\left(\\frac{\\text{LTV}}{100}\\right)$$
$$EMI = \\text{Loan Amount} \\times r \\times \\frac{(1 + r)^N}{(1 + r)^N - 1}$$

Where:
- **LTV** is the Loan-to-Value percentage (commonly 50% to 70% of market value).
- **r** is the monthly interest rate ($R / 12 / 100$).
- **N** is the tenure in months ($T \\times 12$).`,
  example: `Suppose you pledge a property valued at $500,000, and the lender offers a 60% LTV ratio at an 8.5% interest rate for a 15-year tenure.

1. Loan Principal (P) = $500,000 × 60% = $300,000.
2. Monthly Interest (r) = 8.5% / 12 / 100 = 0.007083.
3. Total Months (N) = 15 × 12 = 180.
4. Calculate Monthly EMI:
   $$EMI = 300,000 \\times 0.007083 \\times \\frac{(1.007083)^{180}}{(1.007083)^{180} - 1} \\approx \\$2,954.21 \\text{ / month}$$
5. Total Repayments = $2,954.21 × 180 = $531,757.80.
6. Total Interest Cost = $531,757.80 - $300,000 = $231,757.80.`,
  faqs: [
    {
      q: 'What is the LTV ratio limit for a Loan Against Property?',
      a: 'LTV (Loan-to-Value) limits generally range from 40% to 75% of the property market value, depending on whether the asset is residential (higher limits), commercial (medium limits), or vacant land (lower limits).',
    },
    {
      q: 'How does LAP differ from a home purchase loan?',
      a: 'A home purchase loan is taken to buy a new property, and the lender funds up to 80%-90% of the cost. A Loan Against Property (LAP) is taken by pledging a property you *already own* to unlock liquid cash for other business or personal purposes, with lower LTV limits (50%-70%).',
    },
    {
      q: 'Can I continue using my property after taking a LAP?',
      a: 'Yes. You retain full ownership, occupancy, and usage rights of the pledged property. The lender only holds the title deeds as collateral security until the loan is fully repaid.',
    },
  ],
};

export default function LoanAgainstProperty() {
  const [propertyValue, setPropertyValue] = useState<number>(500000);
  const [ltv, setLtv] = useState<number>(60);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [tenure, setTenure] = useState<number>(15);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = propertyValue > 0 && ltv > 0 && ltv <= 90 &&
                  interestRate > 0 && interestRate <= 100 && tenure > 0 && tenure <= 25;

  let results = null;
  if (isValid) {
    const loanAmount = propertyValue * (ltv / 100);
    const r = interestRate / 12 / 100;
    const N = tenure * 12;

    let emi = 0;
    if (r === 0) {
      emi = loanAmount / N;
    } else {
      emi = (loanAmount * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    }

    const totalPayment = emi * N;
    const totalInterest = totalPayment - loanAmount;

    const principalPercent = (loanAmount / totalPayment) * 100;
    const interestPercent = (totalInterest / totalPayment) * 100;
    const equityRemainingPercent = 100 - ltv;

    results = {
      loanAmount,
      emi,
      totalPayment,
      totalInterest,
      principalPercent,
      interestPercent,
      equityRemainingPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (propertyValue <= 0) newErrors.propertyValue = 'Property value must be greater than zero';
    if (ltv <= 0 || ltv > 90) newErrors.ltv = 'LTV ratio must be between 1% and 90%';
    if (interestRate <= 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0.1% and 100%';
    if (tenure <= 0 || tenure > 25) newErrors.tenure = 'Tenure must be between 1 and 25 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setPropertyValue(500000);
    setLtv(60);
    setInterestRate(8.5);
    setTenure(15);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Collateral Properties</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="property-value" className="block text-sm font-semibold text-foreground/80 mb-2">
                Property Market Value
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="property-value"
                  type="number"
                  value={propertyValue || ''}
                  onChange={(e) => setPropertyValue(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.propertyValue && <p className="text-xs text-red-500 mt-1 font-medium">{errors.propertyValue}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="ltv" className="block text-sm font-semibold text-foreground/80 mb-2">
                  LTV Ratio Limit
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="ltv"
                    type="number"
                    value={ltv || ''}
                    onChange={(e) => setLtv(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.ltv && <p className="text-xs text-red-500 mt-1 font-medium">{errors.ltv}</p>}
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
              <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">LAP loans generally have shorter terms (max 15-20 years)</span>
              {errors.tenure && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tenure}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate Payout
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
            <h2 className="text-xl font-bold text-foreground mb-6">Eligible Collateral Payout</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Eligible Loan Amount (approved principal)
                  </span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    ${results.loanAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Monthly Installment (EMI)
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Interest Payable
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Proportion bar */}
                <div className="pt-2">
                  <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-2">Collateral proportions</span>
                  <div className="h-4 w-full rounded-full bg-border overflow-hidden flex">
                    <div 
                      className="bg-primary h-full transition-all duration-500" 
                      style={{ width: `${ltv}%` }} 
                    />
                    <div 
                      className="bg-accent h-full transition-all duration-500" 
                      style={{ width: `${results.equityRemainingPercent}%` }} 
                    />
                  </div>
                  <div className="flex gap-4 mt-3 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-foreground/70">Approved Loan ({ltv}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-foreground/70">Pledged Asset Equity ({results.equityRemainingPercent.toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter property details to view loan capacity.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
