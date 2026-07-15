'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `An Education Loan Calculator helps students and parents estimate the monthly payment (EMI) for study loans. It stands out by modeling the moratorium period (grace period during the course duration + 6 to 12 months post-studies), during which the borrower is not required to pay EMIs, though interest continues to accrue and is added to the loan principal before repayment starts.`,
  formula: `Education loan EMIs are computed using a two-stage reducing balance model:

**1. Moratorium Interest Accumulation:**
$$P_{\\text{adjusted}} = P \\times (1 + r)^{n_{\\text{moratorium}}}$$

**2. Standard EMI on Adjusted Principal:**
$$EMI = P_{\\text{adjusted}} \\times r \\times \\frac{(1 + r)^{N_{\\text{repay}}}}{(1 + r)^{N_{\\text{repay}}} - 1}$$

Where:
- **P** is the initial tuition/course fee loan amount.
- **P_adjusted** is the accumulated principal at the end of the moratorium.
- **r** is the monthly interest rate ($R / 12 / 100$).
- **n_moratorium** is the moratorium duration in months.
- **N_repay** is the active repayment duration in months ($T_{\\text{repay}} \\times 12$).`,
  example: `Suppose you borrow $40,000 for a course, with a 2-year moratorium period (grace period) at a 9% interest rate, followed by a 5-year active repayment tenure.

1. Monthly Interest (r) = 9% / 12 / 100 = 0.0075.
2. Moratorium months = 24.
3. Adjusted Principal (P_adjusted) at end of moratorium:
   $$P_{\\text{adjusted}} = 40,000 \\times (1.0075)^{24} \\approx \\$47,856.54$$
4. Repayment months (N_repay) = 5 × 12 = 60.
5. Calculate repayment EMI:
   $$EMI = 47,856.54 \\times 0.0075 \\times \\frac{(1.0075)^{60}}{(1.0075)^{60} - 1} \\approx \\$993.43 \\text{ / month}$$
6. Total Payments = $993.43 × 60 = $59,605.80.
7. Total Interest = $59,605.80 - $40,000 = $19,605.80.`,
  faqs: [
    {
      q: 'What is a moratorium period in student loans?',
      a: 'The moratorium is a "grace period" offered by lenders that lasts for the duration of the academic course plus an additional 6 to 12 months. You are not required to pay EMIs during this time, allowing you to focus on studies and secure employment.',
    },
    {
      q: 'Does interest accrue during the moratorium period?',
      a: 'Yes. Interest accumulates during the grace period. Unless you pay off the interest monthly (which some banks allow to get discount rates), it gets added to your principal, increasing your EMI burden.',
    },
    {
      q: 'Are education loans eligible for tax deductions?',
      a: 'In many countries (such as under Section 80E of the Income Tax Act in India), the interest paid on an education loan is fully tax-deductible for up to 8 years, providing substantial tax relief.',
    },
  ],
};

export default function EducationLoanCalculator() {
  const [courseFee, setCourseFee] = useState<number>(40000);
  const [interestRate, setInterestRate] = useState<number>(8.5);
  const [moratorium, setMoratorium] = useState<number>(2);
  const [repayTenure, setRepayTenure] = useState<number>(5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = courseFee > 0 && interestRate > 0 && interestRate <= 100 && 
                  moratorium >= 0 && moratorium <= 10 && repayTenure > 0 && repayTenure <= 20;

  let results = null;
  if (isValid) {
    const P = courseFee;
    const r = interestRate / 12 / 100;
    const n_mor = moratorium * 12;
    const N_rep = repayTenure * 12;

    // Adjusted Principal after moratorium compounding
    const adjustedPrincipal = P * Math.pow(1 + r, n_mor);
    const moratoriumInterest = adjustedPrincipal - P;

    let emi = 0;
    if (r === 0) {
      emi = adjustedPrincipal / N_rep;
    } else {
      emi = (adjustedPrincipal * r * Math.pow(1 + r, N_rep)) / (Math.pow(1 + r, N_rep) - 1);
    }

    const totalPayment = emi * N_rep;
    const totalInterest = totalPayment - P;

    const principalPercent = (P / totalPayment) * 100;
    const interestPercent = (totalInterest / totalPayment) * 100;

    results = {
      adjustedPrincipal,
      moratoriumInterest,
      emi,
      totalPayment,
      totalInterest,
      principalPercent,
      interestPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (courseFee <= 0) newErrors.courseFee = 'Course fee loan amount must be greater than zero';
    if (interestRate <= 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0.1% and 100%';
    if (moratorium < 0 || moratorium > 10) newErrors.moratorium = 'Moratorium period must be between 0 and 10 years';
    if (repayTenure <= 0 || repayTenure > 20) newErrors.repayTenure = 'Repayment tenure must be between 1 and 20 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setCourseFee(40000);
    setInterestRate(8.5);
    setMoratorium(2);
    setRepayTenure(5);
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
          <h2 className="text-xl font-bold text-foreground mb-6">Education Loan Details</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="course-fee" className="block text-sm font-semibold text-foreground/80 mb-2">
                Tuition / Course Fee Loan
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="course-fee"
                  type="number"
                  value={courseFee || ''}
                  onChange={(e) => setCourseFee(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.courseFee && <p className="text-xs text-red-500 mt-1 font-medium">{errors.courseFee}</p>}
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
                <label htmlFor="moratorium" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Moratorium (years)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="moratorium"
                    type="number"
                    value={moratorium || ''}
                    onChange={(e) => setMoratorium(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                <span className="block text-[9px] text-foreground/40 mt-1 font-semibold">Course study + grace period</span>
                {errors.moratorium && <p className="text-xs text-red-500 mt-1 font-medium">{errors.moratorium}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="repay-tenure" className="block text-sm font-semibold text-foreground/80 mb-2">
                Repayment Tenure (years)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <input
                  id="repay-tenure"
                  type="number"
                  value={repayTenure || ''}
                  onChange={(e) => setRepayTenure(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.repayTenure && <p className="text-xs text-red-500 mt-1 font-medium">{errors.repayTenure}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate Study EMI
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
            <h2 className="text-xl font-bold text-foreground mb-6">Payment Projections</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Monthly Post-Study EMI
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      ${results.emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Accumulated Moratorium Interest
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.moratoriumInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="block text-[10px] text-foreground/40 mt-0.5 font-semibold">
                      Adjusted Principal: ${results.adjustedPrincipal.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Interest (all terms)
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
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
