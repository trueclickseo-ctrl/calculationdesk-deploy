'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Personal Loan Calculator estimates your monthly equated installments (EMI) on unsecured personal loans. Personal loans are generally used for emergency expenses, debt consolidation, home renovations, or travel, and they usually carry fixed interest rates and shorter repayment periods compared to home mortgages.`,
  formula: `Personal loan EMIs are computed using the standard reducing interest loan equation:

$$EMI = P \\times r \\times \\frac{(1 + r)^N}{(1 + r)^N - 1}$$

Where:
- **P** is the loan principal amount.
- **r** is the monthly interest rate ($R / 12 / 100$).
- **N** is the tenure in months ($T \\times 12$).`,
  example: `Suppose you take a personal loan of $15,000 (P) at a 10.5% interest rate (R) for 3 years (T).

1. Monthly interest (r) = 10.5% / 12 / 100 = 0.00875.
2. Repayment months (N) = 3 × 12 = 36.
3. Calculate EMI:
   $$EMI = 15,000 \\times 0.00875 \\times \\frac{(1.00875)^{36}}{(1.00875)^{36} - 1} \\approx \\$487.52 \\text{ / month}$$
4. Total Repayment = $487.52 × 36 = $17,550.72.
5. Total Interest = $17,550.72 - $15,000 = $2,550.72.`,
  faqs: [
    {
      q: 'Why are personal loan interest rates higher than home loans?',
      a: 'Home loans are secured (backed by the property asset), which reduces the bank risk. Personal loans are unsecured (backed by no physical asset), meaning banks charge higher interest rates to cover potential defaults.',
    },
    {
      q: 'Can I use personal loans to consolidate credit card debts?',
      a: 'Yes. Replacing multiple high-interest credit card balances with a single lower-interest personal loan simplifies your budgeting and can save you thousands in interest charges.',
    },
    {
      q: 'What factors determine personal loan interest rates?',
      a: 'Your credit score, employment stability, monthly income level, and debt-to-income (DTI) ratio are the main factors banks assess to approve your interest rates.',
    },
  ],
};

export default function PersonalLoanCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(10000);
  const [interestRate, setInterestRate] = useState<number>(10.5);
  const [tenure, setTenure] = useState<number>(3);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = loanAmount > 0 && interestRate > 0 && interestRate <= 100 && tenure > 0 && tenure <= 15;

  let results = null;
  if (isValid) {
    const P = loanAmount;
    const r = interestRate / 12 / 100;
    const N = tenure * 12;

    let emi = 0;
    if (r === 0) {
      emi = P / N;
    } else {
      emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    }

    const totalPayment = emi * N;
    const totalInterest = totalPayment - P;

    const principalPercent = (P / totalPayment) * 100;
    const interestPercent = (totalInterest / totalPayment) * 100;

    results = {
      emi,
      totalPayment,
      totalInterest,
      principalPercent,
      interestPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (loanAmount <= 0) newErrors.loanAmount = 'Loan amount must be greater than zero';
    if (interestRate <= 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0.1% and 100%';
    if (tenure <= 0 || tenure > 15) newErrors.tenure = 'Tenure must be between 1 and 15 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setLoanAmount(10000);
    setInterestRate(10.5);
    setTenure(3);
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
          <h2 className="text-xl font-bold text-foreground mb-6">Personal Loan Setup</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="loan-amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                Loan Amount
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="loan-amount"
                  type="number"
                  value={loanAmount || ''}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.loanAmount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.loanAmount}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
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

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate EMI
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
            <h2 className="text-xl font-bold text-foreground mb-6">Repayment Summary</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Monthly EMI Payment
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      ${results.emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Repayment Cost
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.totalPayment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
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
                        Interest Cost
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
