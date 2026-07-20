'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Mortgage Calculator computes monthly home loan payments, factoring in principal, interest, annual property taxes, home insurance, and homeowners association (HOA) fees.`,
  formula: `The total monthly housing cost is the sum of several components:

**1. Monthly Principal & Interest ($M$):**
$$M = P \\times \\frac{r(1+r)^n}{(1+r)^n - 1}$$
Where:
- $P$ = Principal loan amount (Property Price - Down Payment)
- $r$ = Monthly interest rate (Annual Rate / 12 / 100)
- $n$ = Total payments (Years × 12)

**2. Monthly Property Tax ($T$):**
$$T = \\frac{\\text{Property Price} \\times \\text{Tax Rate \\%}}{12 \\times 100}$$

**3. Total Monthly Payment:**
$$\\text{Total} = M + T + \\frac{\\text{Annual Insurance}}{12} + \\text{Monthly HOA}$$`,
  example: `**Calculate payments for a $300,000 home with a 20% ($60,000) down payment, a 30-year term at 6% interest, 1.2% property tax, and $1,200 annual insurance:**
- Principal $P$ = $240,000.
- Monthly rate $r$ = 0.005. Monthly payments $n = 360$.
- Monthly $M$ = 240,000 × [0.005(1.005)^360] / [(1.005)^360 - 1] = **$1,438.92**.
- Monthly Property Tax $T$ = (300,000 × 1.2%) / 12 = **$300.00**.
- Monthly Insurance = 1,200 / 12 = **$100.00**.
- Total Monthly Cost = 1,438.92 + 300.00 + 100.00 = **$1,838.92**.`,
  faqs: [
    {
      q: 'What is the 20% down payment rule?',
      a: 'Paying at least 20% down on a home purchase helps you avoid paying Private Mortgage Insurance (PMI), which protects the lender against defaults but adds to your monthly payment.',
    },
    {
      q: 'How does loan term affect total interest paid?',
      a: 'Shorter terms (like 15 years) have higher monthly payments but significantly lower interest rates and total interest costs over the life of the loan compared to 30-year mortgages.',
    },
    {
      q: 'What are HOA fees?',
      a: 'Homeowners Association (HOA) fees are monthly charges paid by condo or planned development owners to cover community maintenance, amenities, and building insurance.',
    },
  ],
};

export default function MortgageCalculator() {
  const [price, setPrice] = useState<number>(300000);
  const [downPayment, setDownPayment] = useState<number>(60000);
  const [term, setTerm] = useState<number>(30);
  const [rate, setRate] = useState<number>(6);
  const [taxRate, setTaxRate] = useState<number>(1.2);
  const [insurance, setInsurance] = useState<number>(1200);
  const [hoa, setHoa] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setPrice(300000);
    setDownPayment(60000);
    setTerm(30);
    setRate(6);
    setTaxRate(1.2);
    setInsurance(1200);
    setHoa(0);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(price) && price > 0 &&
                  !isNaN(downPayment) && downPayment >= 0 && downPayment < price &&
                  !isNaN(term) && term > 0 &&
                  !isNaN(rate) && rate > 0 &&
                  !isNaN(taxRate) && taxRate >= 0 &&
                  !isNaN(insurance) && insurance >= 0 &&
                  !isNaN(hoa) && hoa >= 0;

  if (isValid) {
    const principal = price - downPayment;
    const monthlyRate = rate / 12 / 100;
    const numPayments = term * 12;

    const monthlyPI = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) / (Math.pow(1 + monthlyRate, numPayments) - 1);
    const monthlyTax = (price * (taxRate / 100)) / 12;
    const monthlyIns = insurance / 12;
    const totalMonthly = monthlyPI + monthlyTax + monthlyIns + hoa;

    results = {
      principal,
      monthlyPI,
      monthlyTax,
      monthlyIns,
      totalMonthly,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (price <= 0 || isNaN(price)) newErrors.price = 'Price must be greater than zero';
    if (downPayment < 0 || downPayment >= price || isNaN(downPayment)) {
      newErrors.downPayment = 'Down payment must be between 0 and the property price';
    }
    if (term <= 0 || isNaN(term)) newErrors.term = 'Term must be greater than zero';
    if (rate <= 0 || isNaN(rate)) newErrors.rate = 'Interest rate must be greater than zero';
    if (taxRate < 0 || isNaN(taxRate)) newErrors.taxRate = 'Tax rate cannot be negative';
    if (insurance < 0 || isNaN(insurance)) newErrors.insurance = 'Insurance cannot be negative';
    if (hoa < 0 || isNaN(hoa)) newErrors.hoa = 'HOA fee cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Home & Loan Specs</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="property-price" className="block text-sm font-semibold text-foreground/80 mb-2">Property Price ($)</label>
              <input
                id="property-price"
                type="number"
                value={price}
                onChange={(e) => { setPrice(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.price && <p className="text-xs text-red-500 mt-1 font-medium">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="down-payment" className="block text-sm font-semibold text-foreground/80 mb-2">Down Payment ($)</label>
              <input
                id="down-payment"
                type="number"
                value={downPayment}
                onChange={(e) => { setDownPayment(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.downPayment && <p className="text-xs text-red-500 mt-1 font-medium">{errors.downPayment}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="loan-term" className="block text-sm font-semibold text-foreground/80 mb-2">Term (Years)</label>
                <input
                  id="loan-term"
                  type="number"
                  value={term}
                  onChange={(e) => { setTerm(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.term && <p className="text-xs text-red-500 mt-1 font-medium">{errors.term}</p>}
              </div>

              <div>
                <label htmlFor="interest-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Rate (%)</label>
                <input
                  id="interest-rate"
                  type="number"
                  step="0.01"
                  value={rate}
                  onChange={(e) => { setRate(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.rate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.rate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label htmlFor="tax-rate" className="block text-xs font-bold text-foreground/75 mb-2">Tax (%)</label>
                <input
                  id="tax-rate"
                  type="number"
                  step="0.01"
                  value={taxRate}
                  onChange={(e) => { setTaxRate(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-2 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="insurance-annual" className="block text-xs font-bold text-foreground/75 mb-2">Insurance ($/yr)</label>
                <input
                  id="insurance-annual"
                  type="number"
                  value={insurance}
                  onChange={(e) => { setInsurance(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-2 px-3 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="hoa-fees" className="block text-xs font-bold text-foreground/75 mb-2">HOA ($/mo)</label>
                <input
                  id="hoa-fees"
                  type="number"
                  value={hoa}
                  onChange={(e) => { setHoa(Number(e.target.value)); setErrors({}); }}
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
                Solve Mortgage
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
            <h2 className="text-xl font-bold text-foreground mb-6">Payment Projections</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Total Monthly Payment</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    ${results.totalMonthly.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-3">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50 font-semibold">Principal & Interest (P&I):</span>
                    <span className="text-foreground font-bold">
                      ${results.monthlyPI.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Property Taxes:</span>
                    <span className="text-foreground font-bold">
                      ${results.monthlyTax.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                    <span className="text-foreground/50">Home Insurance:</span>
                    <span className="text-foreground font-bold">
                      ${results.monthlyIns.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  {hoa > 0 && (
                    <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                      <span className="text-foreground/50">HOA Dues:</span>
                      <span className="text-foreground font-bold">${hoa.toLocaleString()}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter property details.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
