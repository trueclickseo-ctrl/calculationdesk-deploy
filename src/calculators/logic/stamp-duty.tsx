'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Stamp Duty Calculator estimates tax duties, registration levies, and government transfer fees associated with purchasing real estate.`,
  formula: `Property transaction fees are computed directly from the purchase price:

**1. Stamp Duty ($S$):**
$$S = \\text{Property Price} \\times \\left( \\frac{\\text{Stamp Duty Rate \\%}}{100} \\right)$$

**2. Registration Fee ($R$):**
$$R = \\text{Property Price} \\times \\left( \\frac{\\text{Registration Rate \\%}}{100} \\right)$$

**3. Total Capital Cost ($T$):**
$$T = \\text{Property Price} + S + R$$`,
  example: `**Calculate acquisition taxes for a $300,000 property with a 4% stamp duty rate and a 1% registration levy:**
- Stamp Duty = $300,000 × 4% = **$12,000**.
- Registration Fee = $300,000 × 1% = **$3,000**.
- Total Buying Cost = $300,000 + $12,000 + $3,000 = **$315,000**.`,
  faqs: [
    {
      q: 'What is Stamp Duty?',
      a: 'Stamp duty is a government-imposed tax on the legal documents that transfer ownership of real estate or other assets. It is usually paid by the buyer.',
    },
    {
      q: 'Are first-time home buyers exempt from stamp duty?',
      a: 'Many states, regions, and countries offer stamp duty concessions, reductions, or complete exemptions for first-time home buyers below certain purchase price thresholds to help them enter the housing market.',
    },
    {
      q: 'Can I include stamp duty in my home mortgage?',
      a: 'Generally no. Lenders usually require you to pay stamp duty and other transaction fees in cash at closing. These fees cannot be added to the mortgage principal.',
    },
  ],
};

export default function StampDutyCalculator() {
  const [price, setPrice] = useState<number>(300000);
  const [dutyRate, setDutyRate] = useState<number>(4);
  const [regRate, setRegRate] = useState<number>(1);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setPrice(300000);
    setDutyRate(4);
    setRegRate(1);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(price) && price > 0 &&
                  !isNaN(dutyRate) && dutyRate >= 0 &&
                  !isNaN(regRate) && regRate >= 0;

  if (isValid) {
    const stampDuty = price * (dutyRate / 100);
    const registration = price * (regRate / 100);
    const totalCost = price + stampDuty + registration;

    results = {
      stampDuty,
      registration,
      totalCost,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (price <= 0 || isNaN(price)) newErrors.price = 'Property price must be greater than zero';
    if (dutyRate < 0 || isNaN(dutyRate)) newErrors.dutyRate = 'Stamp duty rate cannot be negative';
    if (regRate < 0 || isNaN(regRate)) newErrors.regRate = 'Registration rate cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Tax Parameters</h2>

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

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="duty-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Duty Rate (%)</label>
                <input
                  id="duty-rate"
                  type="number"
                  step="0.01"
                  value={dutyRate}
                  onChange={(e) => { setDutyRate(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.dutyRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.dutyRate}</p>}
              </div>

              <div>
                <label htmlFor="reg-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Registration (%)</label>
                <input
                  id="reg-rate"
                  type="number"
                  step="0.01"
                  value={regRate}
                  onChange={(e) => { setRegRate(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.regRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.regRate}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Acquisition
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
            <h2 className="text-xl font-bold text-foreground mb-6">Tax Breakdown</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Total Capital Cost</span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    ${results.totalCost.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Stamp Duty Tax</span>
                    <span className="block text-base font-bold text-foreground mt-1 text-red-500">
                      ${results.stampDuty.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Registration Fees</span>
                    <span className="block text-base font-bold text-foreground mt-1 text-red-500">
                      ${results.registration.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter property price details.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
