'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Credit Card EMI Calculator helps you understand the actual financial cost of converting outstanding credit card purchases or balances into monthly installments (EMIs). Credit card companies often market EMI conversions at seemingly low monthly rates, but processing fees, high interest rates, and local taxes can increase the overall cost significantly.`,
  formula: `Credit card EMI calculations model reducing balance interest alongside up-front setup charges:

$$EMI = P \\times r \\times \\frac{(1 + r)^N}{(1 + r)^N - 1}$$
$$\\text{Processing Fee Amount} = P \\times \\left(\\frac{F}{100}\\right)$$
$$\\text{Total Payable} = (EMI \\times N) + \\text{Processing Fee Amount}$$

Where:
- **P** is the purchase transaction amount to convert.
- **r** is the monthly credit card interest rate ($R / 12 / 100$).
- **N** is the tenure in months.
- **F** is the upfront processing fee percentage.`,
  example: `Suppose you convert a $5,000 credit card transaction into a 12-month EMI at a 15% annual interest rate, with a 1.5% processing fee.

1. Transaction Amount (P) = $5,000.
2. Monthly Interest (r) = 15% / 12 / 100 = 0.0125.
3. Tenure (N) = 12 months.
4. Calculate Monthly EMI:
   $$EMI = 5,000 \\times 0.0125 \\times \\frac{(1.0125)^{12}}{(1.0125)^{12} - 1} \\approx \\$451.29 \\text{ / month}$$
5. Upfront Processing Fee = $5,000 × 1.5% = $75.00.
6. Total Repayment (excluding fee) = $451.29 × 12 = $5,415.48.
7. Total Interest = $5,415.48 - $5,000 = $415.48.
8. Total Cost of Conversion (Interest + Fee) = $415.48 + $75 = $490.48.`,
  faqs: [
    {
      q: 'Do I still earn reward points if I convert a transaction to EMI?',
      a: 'Typically, most credit card issuers retract or cancel reward points, cashback benefits, or loyalty miles earned on a transaction once it is converted into monthly installments.',
    },
    {
      q: 'Can I foreclose a credit card EMI early?',
      a: 'Yes, most banks allow foreclosure, but they usually charge a prepayment penalty (often 2% to 3% of the outstanding principal balance) and do not refund the upfront processing fees.',
    },
    {
      q: 'Is credit card EMI interest higher than personal loans?',
      a: 'Yes. Credit card EMI interest rates generally range from 12% to 22% p.a., which is typically higher than standard unsecured personal loans (which range from 9% to 15% p.a.).',
    },
  ],
};

export default function CreditCardEmiCalculator() {
  const [amount, setAmount] = useState<number>(5000);
  const [interestRate, setInterestRate] = useState<number>(15);
  const [tenure, setTenure] = useState<number>(12);
  const [processingFee, setProcessingFee] = useState<number>(1.5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = amount > 0 && interestRate > 0 && interestRate <= 100 && 
                  tenure > 0 && tenure <= 48 && processingFee >= 0 && processingFee <= 10;

  let results = null;
  if (isValid) {
    const P = amount;
    const r = interestRate / 12 / 100;
    const N = tenure;

    let emi = 0;
    if (r === 0) {
      emi = P / N;
    } else {
      emi = (P * r * Math.pow(1 + r, N)) / (Math.pow(1 + r, N) - 1);
    }

    const feeAmount = P * (processingFee / 100);
    const totalEmiPayment = emi * N;
    const totalInterest = totalEmiPayment - P;
    const totalCost = totalEmiPayment + feeAmount;

    const basePercent = (P / totalCost) * 100;
    const interestPercent = (totalInterest / totalCost) * 100;
    const feePercent = (feeAmount / totalCost) * 100;

    results = {
      emi,
      feeAmount,
      totalInterest,
      totalCost,
      basePercent,
      interestPercent,
      feePercent,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (amount <= 0) newErrors.amount = 'Transaction amount must be greater than zero';
    if (interestRate <= 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0.1% and 100%';
    if (tenure <= 0 || tenure > 48) newErrors.tenure = 'Tenure must be between 1 and 48 months';
    if (processingFee < 0 || processingFee > 10) newErrors.processingFee = 'Processing fee must be between 0% and 10%';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setAmount(5000);
    setInterestRate(15);
    setTenure(12);
    setProcessingFee(1.5);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Card Transaction</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                Transaction Amount to Convert
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="amount"
                  type="number"
                  value={amount || ''}
                  onChange={(e) => setAmount(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.amount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.amount}</p>}
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
                  Tenure (months)
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
              <label htmlFor="processing-fee" className="block text-sm font-semibold text-foreground/80 mb-2">
                Upfront Processing Fee
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  %
                </div>
                <input
                  id="processing-fee"
                  type="number"
                  step="0.1"
                  value={processingFee || ''}
                  onChange={(e) => setProcessingFee(Number(e.target.value))}
                  className="block w-full py-3 pl-4 pr-10 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.processingFee && <p className="text-xs text-red-500 mt-1 font-medium">{errors.processingFee}</p>}
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
            <h2 className="text-xl font-bold text-foreground mb-6">Conversion Cost Analysis</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Monthly Installment
                  </span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    ${results.emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Interest Cost
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Upfront Processing Fee
                    </span>
                    <span className="block text-base font-bold text-foreground mt-1">
                      ${results.feeAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between items-center">
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Cost (Principal + Interest + Fee)
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <span className="text-xs bg-red-500/10 text-red-500 font-bold px-2 py-0.5 rounded-full">
                    +{((results.totalCost - amount) / amount * 100).toFixed(1)}% extra
                  </span>
                </div>

                {/* Proportion bar */}
                <div className="pt-2">
                  <span className="block text-[10px] font-bold text-foreground/40 uppercase tracking-wider mb-2">Cost Breakdown</span>
                  <div className="h-4 w-full rounded-full bg-border overflow-hidden flex">
                    <div 
                      className="bg-accent h-full transition-all duration-500" 
                      style={{ width: `${results.basePercent}%` }} 
                    />
                    <div 
                      className="bg-primary h-full transition-all duration-500" 
                      style={{ width: `${results.interestPercent}%` }} 
                    />
                    <div 
                      className="bg-amber-500 h-full transition-all duration-500" 
                      style={{ width: `${results.feePercent}%` }} 
                    />
                  </div>
                  <div className="flex flex-wrap gap-4 mt-3 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-foreground/70">Principal ({results.basePercent.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-foreground/70">Interest ({results.interestPercent.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-amber-500" />
                      <span className="text-foreground/70">Fee ({results.feePercent.toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter conversion details to view costs.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
