'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Car Loan Calculator estimates the monthly loan installment (EMI) you will owe on a vehicle purchase. It helps you assess your car budget based on the dealer price, down payment trade-in value, interest rate, and repayment tenure.`,
  formula: `Car loan payments are calculated using the standard compound reducing balance loan formula:

$$EMI = P \\times r \\times \\frac{(1 + r)^N}{(1 + r)^N - 1}$$

Where:
- **P** is the loan principal amount (Vehicle Price minus Down Payment).
- **r** is the monthly interest rate ($R / 12 / 100$).
- **N** is the tenure in months ($T \\times 12$).`,
  example: `Suppose you buy a car priced at $35,000, trade in your old vehicle for a down payment of $7,000 (20%), and take a 5-year loan at 5% interest.

1. Loan Principal (P) = $35,000 - $7,000 = $28,000.
2. Monthly Interest (r) = 5% / 12 / 100 = 0.004167.
3. Total Months (N) = 5 × 12 = 60.
4. Calculate EMI:
   $$EMI = 28,000 \\times 0.004167 \\times \\frac{(1.004167)^{60}}{(1.004167)^{60} - 1} \\approx \\$528.40 \\text{ / month}$$
5. Total Repayment = $528.40 × 60 = $31,704.
6. Total Interest = $31,704 - $28,000 = $3,704.`,
  faqs: [
    {
      q: 'Does a car down payment include trade-in value?',
      a: 'Yes. When buying a new vehicle, dealers allow you to trade in your current car. The agreed value of your old car acts as a down payment, reducing the overall loan amount needed.',
    },
    {
      q: 'What is a typical tenure for a car loan?',
      a: 'Car loans typically range from 3 to 7 years (36 to 84 months). Shorter tenures (e.g., 3–5 years) yield higher monthly EMIs but save you significant interest costs over the life of the loan.',
    },
    {
      q: 'Can I negotiate car loan interest rates?',
      a: 'Yes. Rates depend heavily on your credit score, loan amount, and the age of the car (new cars usually attract lower rates than used cars). It is recommended to compare rates from credit unions, banks, and dealership financing.',
    },
  ],
};

export default function CarLoanCalculator() {
  const [carPrice, setCarPrice] = useState<number>(30000);
  const [downPayment, setDownPayment] = useState<number>(6000);
  const [interestRate, setInterestRate] = useState<number>(5.5);
  const [tenure, setTenure] = useState<number>(5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = carPrice > 0 && downPayment >= 0 && downPayment < carPrice &&
                  interestRate > 0 && interestRate <= 100 && tenure > 0 && tenure <= 10;

  let results = null;
  if (isValid) {
    const P = carPrice - downPayment;
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
    const downPaymentPercent = (downPayment / carPrice) * 100;

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
    if (carPrice <= 0) newErrors.carPrice = 'Car price must be greater than zero';
    if (downPayment < 0 || downPayment >= carPrice) newErrors.downPayment = 'Down payment must be less than car price';
    if (interestRate <= 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0.1% and 100%';
    if (tenure <= 0 || tenure > 10) newErrors.tenure = 'Tenure must be between 1 and 10 years';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setCarPrice(30000);
    setDownPayment(6000);
    setInterestRate(5.5);
    setTenure(5);
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
          <h2 className="text-xl font-bold text-foreground mb-6">Car Loan Details</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="car-price" className="block text-sm font-semibold text-foreground/80 mb-2">
                Vehicle Purchase Price
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="car-price"
                  type="number"
                  value={carPrice || ''}
                  onChange={(e) => setCarPrice(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.carPrice && <p className="text-xs text-red-500 mt-1 font-medium">{errors.carPrice}</p>}
            </div>

            <div>
              <label htmlFor="down-payment" className="block text-sm font-semibold text-foreground/80 mb-2">
                Down Payment / Trade-In Amount
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
                {results ? `Ratio: ${results.downPaymentPercent.toFixed(1)}% of vehicle cost` : ''}
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
                Calculate Payment
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
                      Monthly Car EMI
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
                      Total Interest Cost
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
