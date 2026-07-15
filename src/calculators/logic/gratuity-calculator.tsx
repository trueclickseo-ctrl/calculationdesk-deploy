'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `A Gratuity is a lump-sum financial benefit paid by an employer to an employee as a token of appreciation for their long-term service to the company. Typically, it is payable when an employee retires, resigns, or leaves the company after completing a minimum of 5 years of continuous service. It is a critical component of retirement planning.`,
  formula: `The standard formula used to calculate the gratuity payout is:

$$\\text{Gratuity} = \\frac{15}{26} \\times \\text{Last Drawn Monthly Salary} \\times \\text{Completed Years of Service}$$

Where:
- **Last Drawn Monthly Salary** includes the Basic Salary plus Dearness Allowance (DA).
- **15/26** represents 15 days of salary out of 26 working days in a month.
- **Completed Years of Service** is rounded to the nearest year (e.g., 5 years and 6 months or more is rounded up to 6 years; anything less is rounded down).`,
  example: `Suppose an employee has worked at a company for 9 years and 7 months, and their last drawn monthly salary (Basic + DA) is $10,000.

1. Completed Years of Service = 9 years and 7 months. Since the months exceed 6, we round up to **10 years**.
2. Last Drawn Salary = $10,000.
3. Compute Gratuity:
   $$\\text{Gratuity} = \\frac{15}{26} \\times 10,000 \\times 10$$
   $$\\text{Gratuity} = 0.5769 \\times 10,000 \\times 10 \\approx \\$57,692.31$$`,
  faqs: [
    {
      q: 'Is there a minimum tenure to become eligible for gratuity?',
      a: 'Yes. In most countries (such as under the Payment of Gratuity Act in India), an employee must complete at least 5 years of continuous service with the same employer to qualify for gratuity payments.',
    },
    {
      q: 'Is there a maximum cap on the gratuity payout?',
      a: 'Yes, governments typically set a statutory ceiling on tax-exempt gratuity payouts (for example, ₹20 Lakhs in India or equivalent regional limits). Any amount paid above this cap is subject to income tax.',
    },
    {
      q: 'Does gratuity apply in case of death or disablement?',
      a: 'If employment is terminated due to death or permanent disablement, the 5-year continuous service rule is waived, and gratuity is paid directly to the employee or their nominee.',
    },
  ],
};

export default function GratuityCalculator() {
  const [basicSalary, setBasicSalary] = useState<number>(10000);
  const [years, setYears] = useState<number>(10);
  const [months, setMonths] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = basicSalary > 0 && years >= 0 && (years > 0 || months >= 6) && months >= 0 && months < 12;

  let results = null;
  if (isValid) {
    // Round service period to nearest year
    let completedYears = years;
    if (months >= 6) {
      completedYears += 1;
    }

    const gratuityAmount = (15 / 26) * basicSalary * completedYears;

    results = {
      gratuityAmount,
      completedYears,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (basicSalary <= 0) newErrors.basicSalary = 'Monthly salary must be greater than zero';
    if (years < 0) newErrors.years = 'Years of service cannot be negative';
    if (months < 0 || months >= 12) newErrors.months = 'Months must be between 0 and 11';
    if (years === 0 && months < 6) {
      newErrors.years = 'Minimum service required for gratuity is 5 years (waived for death/disablement, but calculated from 6+ months)';
    }
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setBasicSalary(10000);
    setYears(10);
    setMonths(0);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Gratuity Payout Details</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="basic-salary" className="block text-sm font-semibold text-foreground/80 mb-2">
                Last Drawn Monthly Salary (Basic + DA)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
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
                <label htmlFor="years" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Service Years
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="years"
                    type="number"
                    value={years || ''}
                    onChange={(e) => setYears(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.years && <p className="text-xs text-red-500 mt-1 font-medium">{errors.years}</p>}
              </div>

              <div>
                <label htmlFor="months" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Service Months
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="months"
                    type="number"
                    value={months || ''}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.months && <p className="text-xs text-red-500 mt-1 font-medium">{errors.months}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate
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
            <h2 className="text-xl font-bold text-foreground mb-6">Gratuity Payout</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Estimated Gratuity Amount
                  </span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    ${results.gratuityAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Effective Service Period (Rounded)
                  </span>
                  <span className="block text-lg font-bold text-foreground mt-1">
                    {results.completedYears} years
                  </span>
                  <span className="block text-[10px] text-foreground/40 mt-1 font-semibold">
                    Calculated from actual: {years} years, {months} months
                  </span>
                </div>

                {years < 5 && (
                  <div className="rounded-xl border border-amber-500/20 bg-amber-500/5 p-4 text-xs text-amber-600 dark:text-amber-500 font-semibold leading-relaxed">
                    Note: Continuous service of less than 5 years typically disqualifies eligibility for gratuity payouts under standard regulations, unless terminated due to death or permanent disablement.
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter salary and service details to estimate gratuity.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
