'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Rental Yield Calculator computes the gross and net returns on real estate purchases based on acquisition costs, monthly rents, and annual maintenance expenses.`,
  formula: `Rental yields are estimated as percentage rates of return:

**1. Gross Annual Yield ($Y_g$):**
$$Y_g = \\frac{\\text{Monthly Rent} \\times 12}{\\text{Purchase Price}} \\times 100$$

**2. Net Annual Yield ($Y_n$):**
$$Y_n = \\frac{(\\text{Monthly Rent} \\times 12) - \\text{Annual Expenses}}{\\text{Purchase Price}} \\times 100$$`,
  example: `**Calculate yields for a $300,000 home generating $2,000/mo rent with $4,000 in annual expenses:**
- Gross income = $2,000 × 12 = $24,000.
- Gross Yield = ($24,000 / $300,000) × 100 = **8.00%**.
- Net income = $24,000 - $4,000 = $20,000.
- Net Yield = ($20,000 / $300,000) × 100 = **6.67%**.`,
  faqs: [
    {
      q: 'What is a good rental yield?',
      a: 'A good rental yield varies by market, but generally, 5% to 8% is considered a healthy yield for residential properties, whereas commercial properties typically target 7% to 10% yields due to higher management complexity.',
    },
    {
      q: 'What is the difference between Gross and Net yield?',
      a: 'Gross yield is calculated before any expenses (taxes, repairs, insurance, management fees) are subtracted. Net yield deducts these operational costs, providing a more accurate picture of real cash flow returns.',
    },
    {
      q: 'Should purchasing costs be included in the price?',
      a: 'Yes, for the most accurate calculation, you should add transactional costs (stamp duty, legal fees, inspection costs) to the property purchase price to calculate the true yield on your total capital output.',
    },
  ],
};

export default function RentalYieldCalculator() {
  const [price, setPrice] = useState<number>(300000);
  const [rent, setRent] = useState<number>(2000);
  const [expenses, setExpenses] = useState<number>(4000);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setPrice(300000);
    setRent(2000);
    setExpenses(4000);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(price) && price > 0 &&
                  !isNaN(rent) && rent >= 0 &&
                  !isNaN(expenses) && expenses >= 0;

  if (isValid) {
    const grossAnnual = rent * 12;
    const netAnnual = grossAnnual - expenses;

    const grossYield = (grossAnnual / price) * 100;
    const netYield = (netAnnual / price) * 100;

    results = {
      grossAnnual,
      netAnnual,
      grossYield,
      netYield,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (price <= 0 || isNaN(price)) newErrors.price = 'Purchase price must be greater than zero';
    if (rent < 0 || isNaN(rent)) newErrors.rent = 'Rent cannot be negative';
    if (expenses < 0 || isNaN(expenses)) newErrors.expenses = 'Operating expenses cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Property Financials</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="purchase-price" className="block text-sm font-semibold text-foreground/80 mb-2">Purchase Price ($)</label>
              <input
                id="purchase-price"
                type="number"
                value={price}
                onChange={(e) => { setPrice(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.price && <p className="text-xs text-red-500 mt-1 font-medium">{errors.price}</p>}
            </div>

            <div>
              <label htmlFor="monthly-rent" className="block text-sm font-semibold text-foreground/80 mb-2">Monthly Rental Income ($)</label>
              <input
                id="monthly-rent"
                type="number"
                value={rent}
                onChange={(e) => { setRent(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.rent && <p className="text-xs text-red-500 mt-1 font-medium">{errors.rent}</p>}
            </div>

            <div>
              <label htmlFor="annual-expenses" className="block text-sm font-semibold text-foreground/80 mb-2">Annual Operating Expenses ($)</label>
              <input
                id="annual-expenses"
                type="number"
                value={expenses}
                onChange={(e) => { setExpenses(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.expenses && <p className="text-xs text-red-500 mt-1 font-medium">{errors.expenses}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Yields
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
            <h2 className="text-xl font-bold text-foreground mb-6">Yield Projections</h2>

            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Gross Yield</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {results.grossYield.toFixed(2)}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Net Yield</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {results.netYield.toFixed(2)}%
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Gross Annual Revenue:</span>
                    <span className="text-foreground font-bold">
                      ${results.grossAnnual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                    <span className="text-foreground/50">Net Annual Revenue:</span>
                    <span className="text-foreground font-bold">
                      ${results.netAnnual.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
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
