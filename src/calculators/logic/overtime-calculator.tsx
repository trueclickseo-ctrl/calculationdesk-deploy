'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Overtime Calculator estimates wages including regular hours, standard overtime (time-and-a-half or 1.5x), and double-time rates.`,
  formula: `Overtime calculations sum segmented hourly wages:

**1. Regular Pay:**
$$\\text{Regular Pay} = \\text{Regular Rate} \\times \\text{Regular Hours}$$

**2. Overtime Pay:**
$$\\text{Overtime Pay} = \\text{Regular Rate} \\times \\text{OT Multiplier} \\times \\text{OT Hours}$$

**3. Double Time Pay:**
$$\\text{Double Pay} = \\text{Regular Rate} \\times 2 \\times \\text{Double Hours}$$

**4. Total Compensation:**
$$\\text{Total} = \\text{Regular Pay} + \\text{Overtime Pay} + \\text{Double Pay}$$`,
  example: `**Calculate weekly earnings for 40 regular hours, 8 overtime hours (1.5x), and 2 double-time hours at a $20/hr base rate:**
- Base Hourly Rate = $20.
- Regular Pay = 40 × 20 = $800.
- Overtime Pay = 8 × (20 × 1.5) = 8 × 30 = $240.
- Double Pay = 2 × (20 × 2) = 2 × 40 = $80.
- Total Earnings = 800 + 240 + 8 = **$1,120.00**.`,
  faqs: [
    {
      q: 'What is the standard overtime multiplier?',
      a: 'In the United States and many other countries, the standard overtime multiplier is 1.5 times the employee\'s regular hourly wage (known as "time and a half") for hours worked beyond 40 per week.',
    },
    {
      q: 'What is double time?',
      a: 'Double time is a rate of pay equal to twice the regular hourly rate. It is often applied to work done on holidays, Sundays, or after working a certain number of overtime hours in a single shift.',
    },
    {
      q: 'Are salary employees eligible for overtime?',
      a: 'Salaried employees are only eligible for overtime if they are classified as "non-exempt" under labor laws such as the Fair Labor Standards Act (FLSA).',
    },
  ],
};

export default function OvertimeCalculator() {
  const [rate, setRate] = useState<number>(25);
  const [regularHours, setRegularHours] = useState<number>(40);
  const [otHours, setOtHours] = useState<number>(5);
  const [otMultiplier, setOtMultiplier] = useState<number>(1.5);
  const [doubleHours, setDoubleHours] = useState<number>(0);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setRate(25);
    setRegularHours(40);
    setOtHours(5);
    setOtMultiplier(1.5);
    setDoubleHours(0);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(rate) && rate >= 0 &&
                  !isNaN(regularHours) && regularHours >= 0 &&
                  !isNaN(otHours) && otHours >= 0 &&
                  !isNaN(otMultiplier) && otMultiplier >= 0 &&
                  !isNaN(doubleHours) && doubleHours >= 0;

  if (isValid) {
    const regularPay = rate * regularHours;
    
    const otRate = rate * otMultiplier;
    const otPay = otRate * otHours;

    const doubleRate = rate * 2;
    const doublePay = doubleRate * doubleHours;

    const totalPay = regularPay + otPay + doublePay;
    const totalHours = regularHours + otHours + doubleHours;
    const averageHourlyRate = totalHours > 0 ? totalPay / totalHours : 0;

    results = {
      regularPay,
      otRate,
      otPay,
      doubleRate,
      doublePay,
      totalPay,
      totalHours,
      averageHourlyRate,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (rate < 0 || isNaN(rate)) newErrors.rate = 'Hourly rate cannot be negative';
    if (regularHours < 0 || isNaN(regularHours)) newErrors.regularHours = 'Regular hours cannot be negative';
    if (otHours < 0 || isNaN(otHours)) newErrors.otHours = 'Overtime hours cannot be negative';
    if (otMultiplier < 0 || isNaN(otMultiplier)) newErrors.otMultiplier = 'Overtime multiplier cannot be negative';
    if (doubleHours < 0 || isNaN(doubleHours)) newErrors.doubleHours = 'Double time hours cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Timesheet Variables</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="hourly-rate" className="block text-sm font-semibold text-foreground/80 mb-2">Hourly Rate ($ / hr)</label>
              <input
                id="hourly-rate"
                type="number"
                value={rate}
                onChange={(e) => { setRate(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.rate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.rate}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="reg-hours" className="block text-sm font-semibold text-foreground/80 mb-2">Regular Hours</label>
                <input
                  id="reg-hours"
                  type="number"
                  value={regularHours}
                  onChange={(e) => { setRegularHours(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.regularHours && <p className="text-xs text-red-500 mt-1 font-medium">{errors.regularHours}</p>}
              </div>

              <div>
                <label htmlFor="ot-multiplier" className="block text-sm font-semibold text-foreground/80 mb-2">OT Rate Multiplier</label>
                <input
                  id="ot-multiplier"
                  type="number"
                  value={otMultiplier}
                  onChange={(e) => { setOtMultiplier(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.otMultiplier && <p className="text-xs text-red-500 mt-1 font-medium">{errors.otMultiplier}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="ot-hours" className="block text-sm font-semibold text-foreground/80 mb-2">Overtime Hours (OT)</label>
                <input
                  id="ot-hours"
                  type="number"
                  value={otHours}
                  onChange={(e) => { setOtHours(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.otHours && <p className="text-xs text-red-500 mt-1 font-medium">{errors.otHours}</p>}
              </div>

              <div>
                <label htmlFor="double-hours" className="block text-sm font-semibold text-foreground/80 mb-2">Double Time Hours</label>
                <input
                  id="double-hours"
                  type="number"
                  value={doubleHours}
                  onChange={(e) => { setDoubleHours(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.doubleHours && <p className="text-xs text-red-500 mt-1 font-medium">{errors.doubleHours}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Earnings
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
            <h2 className="text-xl font-bold text-foreground mb-6">Earnings Breakdown</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Gross Paycheck</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    ${results.totalPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Work Hours</span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      {results.totalHours.toLocaleString()} hrs
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Average Hourly Rate</span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.averageHourlyRate.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })} / hr
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Regular Earnings ({regularHours} hrs @ ${rate}/hr):</span>
                    <span className="text-foreground font-bold">${results.regularPay.toFixed(2)}</span>
                  </div>
                  {otHours > 0 && (
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-foreground/50">Overtime Earnings ({otHours} hrs @ ${results.otRate.toFixed(2)}/hr):</span>
                      <span className="text-foreground font-bold">${results.otPay.toFixed(2)}</span>
                    </div>
                  )}
                  {doubleHours > 0 && (
                    <div className="flex justify-between items-center text-xs font-semibold">
                      <span className="text-foreground/50">Double-Time Earnings ({doubleHours} hrs @ ${results.doubleRate.toFixed(2)}/hr):</span>
                      <span className="text-foreground font-bold">${results.doublePay.toFixed(2)}</span>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter work hour details.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
