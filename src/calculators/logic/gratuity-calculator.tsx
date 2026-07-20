'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Gratuity Calculator is a financial tool designed to calculate the gratuity amount payable to an employee upon leaving an organization. Gratuity is a statutory retirement benefit paid by employers under the Payment of Gratuity Act 1972 to employees who have rendered at least 5 years of continuous service. This calculator computes both the total accrued gratuity and the tax-free limit, ensuring compliance with the statutory ceiling. You can review standard gratuity regulations on the official [Ministry of Labour & Employment website](https://labour.gov.in).',
  formula: `The gratuity calculation formula depends on whether the employee is covered under the Payment of Gratuity Act 1972:

1. **For Employees Covered under the Act**:
   The service duration is rounded to the nearest year (extra service above 6 months is rounded up).
   $$\\text{Gratuity Amount} = \\frac{15 \\times \\text{Last Drawn Basic Salary + DA} \\times \\text{Rounded Years of Service}}{26}$$

2. **For Employees Not Covered under the Act**:
   No rounding applies to incomplete years of service.
   $$\\text{Gratuity Amount} = \\frac{15 \\times \\text{Last Drawn Basic Salary + DA} \\times \\text{Completed Years of Service}}{30}$$

3. **Tax Exemption Ceiling**:
   Under the current rules of the Income Tax Act, the maximum tax-free gratuity amount allowed is capped at ₹20,00,000 ($2,000,000 equivalent). Any gratuity received exceeding this limit is taxable.`,
  example: `Let's walk through an employee gratuity calculation example. Suppose an employee covered under the Act has a last drawn basic salary + DA of ₹80,000 and has worked for 12 years and 7 months.

1. **Rounded Years of Service**:
   Since the extra service (7 months) is greater than 6 months, the service period is rounded up to 13 years.

2. **Accrued Gratuity**:
   $$\\text{Gratuity} = \\frac{15 \\times 80,000 \\times 13}{26} = \\text{₹}6,00,000$$

3. **Tax Exemption**:
   Since ₹6,00,000 is well below the statutory tax-free ceiling of ₹20,00,000, the entire amount is fully exempt from income tax.`,
  faqs: [
    {
      q: 'Is there a minimum service period to get gratuity?',
      a: 'Yes. To be eligible for gratuity payouts under the Act, you must complete a minimum of 5 years of continuous service with the same employer. This condition is waived only in the event of death or permanent disablement.',
    },
    {
      q: 'Are contract employees eligible for gratuity?',
      a: 'Yes. Any employee hired directly by a company (including contract employees) is eligible for gratuity, provided they work continuously for 5 years and the company has 10 or more employees on any day of the preceding year.',
    },
    {
      q: 'Is DA (Dearness Allowance) included in the gratuity calculation?',
      a: 'Yes. The calculation is based on the last drawn "Basic Salary" plus "Dearness Allowance (DA)". No other allowances like HRA, special allowances, or bonuses are included.',
    },
    {
      q: 'What is the maximum tax-free gratuity limit?',
      a: 'The maximum tax-exempt gratuity limit is currently ₹20,00,000. Any gratuity received above this statutory limit is subject to income tax under the head "Income from Salary".',
    },
    {
      q: 'How is service rounded in the gratuity calculation?',
      a: 'For covered employees, service exceeding 6 months is rounded up to the next full year (e.g., 5 years and 7 months becomes 6 years). Service of 6 months or less is rounded down (e.g., 5 years and 5 months becomes 5 years).',
    },
  ],
};

export default function GratuityCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('INR');
  const [basicSalary, setBasicSalary] = useState<number>(80000);
  const [serviceYears, setServiceYears] = useState<number>(10);
  const [serviceMonths, setServiceMonths] = useState<number>(7);
  const [isCovered, setIsCovered] = useState<boolean>(true);
  const [isDeathOrDisability, setIsDeathOrDisability] = useState<boolean>(false);

  const [errors, setErrors] = useState<Record<string, string>>({});

  const currencySymbols: Record<string, string> = {
    INR: '₹',
    USD: '$',
    EUR: '€',
    GBP: '£',
    PKR: 'Rs',
    BDT: '৳',
    TRY: '₺',
  };

  const isEligible = serviceYears >= 5 || isDeathOrDisability;
  const isValid = basicSalary > 0 && serviceYears >= 0 && serviceMonths >= 0 && serviceMonths <= 11;

  let results = null;
  if (isValid) {
    let roundedYears = serviceYears;
    if (isCovered) {
      if (serviceMonths > 6) {
        roundedYears += 1;
      }
    }

    let gratuityAmount = 0;
    if (isCovered) {
      gratuityAmount = (15 * basicSalary * roundedYears) / 26;
    } else {
      gratuityAmount = (15 * basicSalary * serviceYears) / 30;
    }

    const taxCeiling = 2000000;
    const taxFreeAmount = Math.min(gratuityAmount, taxCeiling);
    const taxableAmount = Math.max(0, gratuityAmount - taxCeiling);

    results = {
      gratuityAmount,
      taxFreeAmount,
      taxableAmount,
      roundedYears,
      taxCeiling,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (basicSalary <= 0) newErrors.basicSalary = 'Salary must be greater than zero';
    if (serviceYears < 0) newErrors.serviceYears = 'Service years cannot be negative';
    if (serviceMonths < 0 || serviceMonths > 11) newErrors.serviceMonths = 'Service months must be between 0 and 11';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setBasicSalary(80000);
    setServiceYears(10);
    setServiceMonths(7);
    setIsCovered(true);
    setIsDeathOrDisability(false);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Service Details</h2>
            
            {/* Currency Select */}
            <div className="w-24">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="block w-full py-1.5 px-2 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none cursor-pointer"
              >
                <option value="INR">INR (₹)</option>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
                <option value="PKR">PKR (Rs)</option>
                <option value="BDT">BDT (৳)</option>
                <option value="TRY">TRY (₺)</option>
              </select>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="basic-salary" className="block text-sm font-semibold text-foreground/80 mb-2">
                Last Drawn Monthly Basic Salary + DA
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="basic-salary"
                  type="number"
                  value={basicSalary || ''}
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.basicSalary && <p className="text-xs text-red-500 mt-1 font-medium">{errors.basicSalary}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="service-years" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Completed Years
                </label>
                <input
                  id="service-years"
                  type="number"
                  value={serviceYears || ''}
                  onChange={(e) => setServiceYears(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.serviceYears && <p className="text-xs text-red-500 mt-1 font-medium">{errors.serviceYears}</p>}
              </div>

              <div>
                <label htmlFor="service-months" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Extra Months (0-11)
                </label>
                <input
                  id="service-months"
                  type="number"
                  value={serviceMonths || ''}
                  onChange={(e) => setServiceMonths(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.serviceMonths && <p className="text-xs text-red-500 mt-1 font-medium">{errors.serviceMonths}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Act Status</label>
                <div className="flex items-center h-10">
                  <input
                    id="is-covered"
                    type="checkbox"
                    checked={isCovered}
                    onChange={(e) => setIsCovered(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="is-covered" className="ml-2 text-xs font-semibold text-foreground/70 cursor-pointer">
                    Covered under Gratuity Act
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Exception Cases</label>
                <div className="flex items-center h-10">
                  <input
                    id="is-death"
                    type="checkbox"
                    checked={isDeathOrDisability}
                    onChange={(e) => setIsDeathOrDisability(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="is-death" className="ml-2 text-xs font-semibold text-foreground/70 cursor-pointer">
                    Death / Permanent Disability
                  </label>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Gratuity
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
            <h2 className="text-xl font-bold text-foreground mb-6">Gratuity Payout Projections</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Warnings or notices */}
                {!isEligible && (
                  <div className="rounded-xl bg-amber-500/5 p-4 border border-amber-500/10 text-xs font-semibold text-amber-600">
                    ⚠️ Note: Minimum 5 years of continuous service required to be eligible for gratuity (waived for death/disability).
                  </div>
                )}

                {/* Highlights */}
                <div className="rounded-xl bg-primary/5 p-5 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                    Total Accrued Gratuity
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {currencySymbols[currency]}{results.gratuityAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Tax-Free Gratuity
                    </span>
                    <span className="block text-lg font-bold text-emerald-500 mt-1">
                      {currencySymbols[currency]}{results.taxFreeAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Taxable Gratuity
                    </span>
                    <span className="block text-lg font-bold text-red-500 mt-1">
                      {currencySymbols[currency]}{results.taxableAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Sub details */}
                <div className="space-y-3">
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Calculation Service Tenure:</span>
                    <span className="font-bold text-foreground">{results.roundedYears} Years {isCovered && '(Rounded)'}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Statutory Exemption Ceiling:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.taxCeiling.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view gratuity projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
