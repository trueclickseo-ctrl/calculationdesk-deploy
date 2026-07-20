'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Home Loan Calculator estimates the monthly mortgage payments (EMI) you will owe on a home purchase. It considers the property value, the initial down payment, the bank interest rate, and the loan tenure, helping you budget your home buying capacity.`,
  formula: `The home loan EMI is calculated using the standard reducing balance loan formula:

$$EMI = P \\times r \\times \\frac{(1 + r)^N}{(1 + r)^N - 1}$$

Where:
- **P** is the loan principal amount (Property Value minus Down Payment).
- **r** is the monthly interest rate ($R / 12 / 100$).
- **N** is the repayment duration in months ($T \\times 12$).`,
  example: `Suppose you buy a property valued at $400,000, put down $80,000 as a down payment (20%), and take a 30-year home loan at 6.5% interest.

1. Loan Principal (P) = $400,000 - $80,000 = $320,000.
2. Monthly Interest (r) = 6.5% / 12 / 100 = 0.005417.
3. Total Months (N) = 30 × 12 = 360.
4. Calculate EMI:
   $$EMI = 320,000 \\times 0.005417 \\times \\frac{(1.005417)^{360}}{(1.005417)^{360} - 1} \\approx \\$2,022.62 \\text{ / month}$$
5. Total Repayment = $2,022.62 × 360 = $728,143.20.
6. Total Interest = $728,143.20 - $320,000 = $408,143.20.`,
  faqs: [
    {
      q: 'What is a typical down payment for a home loan?',
      a: 'Most mortgage lenders require a down payment of at least 10% to 20% of the property value. A larger down payment reduces your monthly EMI and helps you avoid extra mortgage insurance fees.',
    },
    {
      q: 'Does home loan EMI include property tax or insurance?',
      a: 'This calculator computes the principal and interest EMI. Real-life bank payments may also bundle monthly escrow amounts for property taxes, homeowners insurance, or private mortgage insurance (PMI).',
    },
    {
      q: 'Can I pay off my home loan early?',
      a: 'Yes. Most lenders allow prepayments or foreclosure, which reduces your principal balance early and saves you significant interest cost over the remaining tenure.',
    },
  ],
};

export default function HomeLoanCalculator() {
  const [propertyValue, setPropertyValue] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [interestRate, setInterestRate] = useState<number>(6.5);
  const [tenure, setTenure] = useState<number>(20);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = propertyValue > 0 && downPayment >= 0 && downPayment < propertyValue &&
                  interestRate > 0 && interestRate <= 100 && tenure > 0 && tenure <= 50;

  let results = null;
  if (isValid) {
    const P = propertyValue - downPayment;
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
    const downPaymentPercent = (downPayment / propertyValue) * 100;

    results = {
      loanAmount: P,
      emi,
      totalPayment,
      totalInterest,
      principalPercent,
      interestPercent,
      downPaymentPercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (propertyValue <= 0) newErrors.propertyValue = 'Property value must be greater than zero';
    if (downPayment < 0 || downPayment >= propertyValue) newErrors.downPayment = 'Down payment must be less than property value';
    if (interestRate <= 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0.1% and 100%';
    if (tenure <= 0 || tenure > 50) newErrors.tenure = 'Tenure must be between 1 and 50 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setPropertyValue(300000);
    setDownPayment(60000);
    setInterestRate(6.5);
    setTenure(20);
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
          <h2 className="text-xl font-bold text-foreground mb-6">Home Loan Details</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="property-value" className="block text-sm font-semibold text-foreground/80 mb-2">
                Property Purchase Price
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

            <div>
              <label htmlFor="down-payment" className="block text-sm font-semibold text-foreground/80 mb-2">
                Down Payment Amount
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="down-payment"
                  type="number"
                  value={downPayment || ''}
                  onChange={(e) => setDownPayment(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                {results ? `Ratio: ${results.downPaymentPercent.toFixed(1)}% of property cost` : ''}
              </span>
              {errors.downPayment && <p className="text-xs text-red-500 mt-1 font-medium">{errors.downPayment}</p>}
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
                Calculate Mortgage
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
            <h2 className="text-xl font-bold text-foreground mb-6">Mortgage Projections</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Monthly Mortgage EMI
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      ${results.emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Loan Principal Amount
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.loanAmount.toLocaleString()}
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
