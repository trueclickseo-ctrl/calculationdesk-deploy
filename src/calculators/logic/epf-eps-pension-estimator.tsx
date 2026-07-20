'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The EPF & EPS Pension Estimator is a comprehensive retirement planning tool designed for salaried employees in India. It estimates the final wealth pool accumulated in your Employee Provident Fund (EPF) at retirement and calculates your monthly pension under the Employee Pension Scheme (EPS). By factoring in your basic monthly salary, current age, projected retirement age, annual salary increments, and the official interest rate, this utility helps you gauge your post-retirement financial security. You can check your EPF balance or read updates on the official [Employees Provident Fund Organisation (EPFO) website](https://www.epfindia.gov.in).',
  formula: `The mathematical model accounts for monthly compounding of EPF interest and caps EPS contributions:

1. **Monthly Contributions**:
   - **Employee EPF Share**: 12% of basic monthly salary + DA.
   - **Employer EPS Share**: 8.33% of basic monthly salary, capped at a salary limit of ₹15,000 (maximum of ₹1,250 per month).
   - **Employer EPF Share**: The remaining balance of the employer's 12% contribution:
     $$\\text{Employer EPF} = (\\text{Basic Salary} \\times 0.12) - \\min(\\text{Basic Salary}, 15000) \\times 0.0833$$

2. **EPF Accumulation**:
   Interest is set by EPFO (e.g., 8.25% for FY 2023-24) and calculated on the running monthly balance:
   $$\\text{Monthly Interest} = \\text{Running Balance} \\times \\frac{\\text{Annual Interest Rate}}{12}$$

3. **EPS Monthly Pension Payout**:
   At retirement age (58), the monthly pension is calculated as:
   $$\\text{Monthly Pension} = \\frac{\\text{Pensionable Salary} \\times \\text{Pensionable Service}}{70}$$
   Where:
   - Pensionable Salary is capped at ₹15,000.
   - Pensionable Service is years of service. A bonus of 2 years is added if service exceeds 20 years (max capped at 35 years).`,
  example: `Let's trace a retirement contribution example. Suppose a 25-year-old employee has a basic salary + DA of ₹30,000, planning to retire at age 58 (33 years of service), with a 5% annual salary growth rate, an 8.25% EPF interest rate, and starting with a zero initial balance.

1. **EPF Accumulation**:
   - Over 33 years, both the employee and employer contribute monthly.
   - Factoring in the 5% yearly salary compound increments and 8.25% interest rate, the total EPF balance accumulates to approximately ₹1.36 Crores (₹13.6 Million).

2. **EPS Pension**:
   - Years of Service = 33 years. Since service is > 20 years, a 2-year bonus is added, bringing Pensionable Service to 35 years (the maximum limit).
   - Pensionable Salary is capped at the standard statutory limit of ₹15,000.
   - Monthly EPS Pension = (₹15,000 × 35) / 70 = ₹7,500 per month.

Thus, at age 58, the employee retires with a tax-free EPF lump sum of ₹1.36 Crores and a guaranteed lifelong monthly pension of ₹7,500.`,
  faqs: [
    {
      q: 'What is the standard retirement age for EPS pension?',
      a: 'The statutory age for starting a regular EPS pension is 58 years. You can opt for an early pension from age 50, but it will be paid at a reduced rate (discounted by 4% for every year below 58).',
    },
    {
      q: 'Is the EPF maturity amount tax-free?',
      a: 'Yes. The final maturity withdrawal from EPF (including contributions and interest earned) is completely tax-exempt under Section 10(11) and 10(12), provided the employee has completed 5 or more years of continuous service.',
    },
    {
      q: 'What happens to the EPS contribution if my basic salary is above ₹15,000?',
      a: 'If your basic monthly salary exceeds ₹15,000, the employer\'s EPS contribution is still capped at 8.33% of ₹15,000 (which equals ₹1,250). Any remaining balance of the employer\'s 12% share is diverted into your EPF account.',
    },
    {
      q: 'Can I withdraw my EPS pension money before retirement?',
      a: 'If your total service tenure is less than 10 years, you can withdraw your EPS corpus as a lump sum. However, if your service exceeds 10 years, withdrawal is not allowed; you will instead receive a monthly pension starting at age 58.',
    },
    {
      q: 'Does EPS pension continue for the family after the employee\'s death?',
      a: 'Yes. In the event of the pensioner\'s demise, the EPS scheme provides a lifelong widow/widower pension, as well as child pensions (up to two children below 25 years of age).',
    },
  ],
};

export default function EpfEpsEstimator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('INR');
  const [basicSalary, setBasicSalary] = useState<number>(50000);
  const [currentAge, setCurrentAge] = useState<number>(25);
  const [retirementAge, setRetirementAge] = useState<number>(58);
  const [currentEpfBalance, setCurrentEpfBalance] = useState<number>(0);
  const [salaryIncrement, setSalaryIncrement] = useState<number>(5); // 5%
  const [epfInterest, setEpfInterest] = useState<number>(8.25); // 8.25%

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

  const isValid = basicSalary > 0 && currentAge >= 18 && retirementAge > currentAge && salaryIncrement >= 0 && epfInterest > 0;

  let results = null;
  if (isValid) {
    let epfBalance = currentEpfBalance;
    let totalEmployeeContrib = 0;
    let totalEmployerContrib = 0;
    let currentSalary = basicSalary;
    
    const yearsToRetire = retirementAge - currentAge;

    for (let year = 1; year <= yearsToRetire; year++) {
      // Annual contributions
      let yearEmployeeShare = 0;
      let yearEmployerShare = 0;

      for (let month = 1; month <= 12; month++) {
        // Employee share (12%)
        const employeeShare = currentSalary * 0.12;
        // Employer EPS share (8.33% capped at 15000 basic)
        const epsShare = Math.min(currentSalary, 15000) * 0.0833;
        // Employer EPF share (12% - EPS share)
        const employerShare = (currentSalary * 0.12) - epsShare;

        yearEmployeeShare += employeeShare;
        yearEmployerShare += employerShare;

        // Add monthly contribution to EPF
        const monthlyTotal = employeeShare + employerShare;
        epfBalance += monthlyTotal;
        
        // Calculate monthly interest
        const monthlyInterestVal = epfBalance * ((epfInterest / 100) / 12);
        epfBalance += monthlyInterestVal;
      }

      totalEmployeeContrib += yearEmployeeShare;
      totalEmployerContrib += yearEmployerShare;

      // Apply annual salary increment
      currentSalary = currentSalary * (1 + (salaryIncrement / 100));
    }

    const totalInterestEarned = Math.max(0, epfBalance - currentEpfBalance - totalEmployeeContrib - totalEmployerContrib);

    // EPS Pension Calculation
    const serviceYears = yearsToRetire;
    const bonusYears = serviceYears >= 20 ? 2 : 0;
    const adjustedService = Math.min(35, serviceYears + bonusYears);
    const pensionableSalary = Math.min(currentSalary, 15000); // capped standard
    const monthlyPension = (pensionableSalary * adjustedService) / 70;

    const totalAccumulated = epfBalance;

    results = {
      totalAccumulated,
      totalEmployeeContrib,
      totalEmployerContrib,
      totalInterestEarned,
      monthlyPension,
      serviceYears,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (basicSalary <= 0) newErrors.basicSalary = 'Basic salary must be greater than zero';
    if (currentAge < 18) newErrors.currentAge = 'Current age must be at least 18';
    if (retirementAge <= currentAge) newErrors.retirementAge = 'Retirement age must be greater than current age';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setBasicSalary(50000);
    setCurrentAge(25);
    setRetirementAge(58);
    setCurrentEpfBalance(0);
    setSalaryIncrement(5);
    setEpfInterest(8.25);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">EPF & EPS Inputs</h2>
            
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
                Monthly Basic Salary + DA
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
                <label htmlFor="current-age" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Current Age
                </label>
                <input
                  id="current-age"
                  type="number"
                  value={currentAge || ''}
                  onChange={(e) => setCurrentAge(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.currentAge && <p className="text-xs text-red-500 mt-1 font-medium">{errors.currentAge}</p>}
              </div>

              <div>
                <label htmlFor="retirement-age" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Retirement Age
                </label>
                <input
                  id="retirement-age"
                  type="number"
                  value={retirementAge || ''}
                  onChange={(e) => setRetirementAge(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.retirementAge && <p className="text-xs text-red-500 mt-1 font-medium">{errors.retirementAge}</p>}
              </div>
            </div>

            <div>
              <label htmlFor="current-bal" className="block text-sm font-semibold text-foreground/80 mb-2">
                Current EPF Balance (If Any)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="current-bal"
                  type="number"
                  value={currentEpfBalance || ''}
                  onChange={(e) => setCurrentEpfBalance(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="salary-inc" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Annual Increment (%)
                </label>
                <input
                  id="salary-inc"
                  type="number"
                  step="0.1"
                  value={salaryIncrement || ''}
                  onChange={(e) => setSalaryIncrement(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="interest-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  EPF Interest Rate (%)
                </label>
                <input
                  id="interest-rate"
                  type="number"
                  step="0.05"
                  value={epfInterest || ''}
                  onChange={(e) => setEpfInterest(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Pension & Fund
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
            <h2 className="text-xl font-bold text-foreground mb-6">Maturity & Pension Projections</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Highlights */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                      Total EPF Accumulation
                    </span>
                    <span className="block text-xl font-extrabold text-primary mt-1.5">
                      {currencySymbols[currency]}{results.totalAccumulated.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-emerald-500/5 p-4 border border-emerald-500/10">
                    <span className="block text-xs font-bold text-emerald-500/80 uppercase tracking-wider">
                      Monthly EPS Pension
                    </span>
                    <span className="block text-xl font-extrabold text-emerald-500 mt-1.5">
                      {currencySymbols[currency]}{results.monthlyPension.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Sub details */}
                <div className="space-y-3">
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Employee Contributions:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.totalEmployeeContrib.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Employer EPF Contributions:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.totalEmployerContrib.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Total Interest Earned:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.totalInterestEarned.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Total Contribution Service:</span>
                    <span className="font-bold text-foreground">{results.serviceYears} Years</span>
                  </div>
                </div>

                {/* Graphical bar indicator */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Fund Composition</h4>
                  <div className="w-full h-4 rounded-full bg-border overflow-hidden flex">
                    <div 
                      className="bg-primary h-full" 
                      style={{ width: `${(results.totalEmployeeContrib / results.totalAccumulated) * 100}%` }}
                      title="Employee"
                    />
                    <div 
                      className="bg-indigo-400 h-full" 
                      style={{ width: `${(results.totalEmployerContrib / results.totalAccumulated) * 100}%` }}
                      title="Employer"
                    />
                    <div 
                      className="bg-amber-400 h-full" 
                      style={{ width: `${(results.totalInterestEarned / results.totalAccumulated) * 100}%` }}
                      title="Interest"
                    />
                  </div>
                  <div className="flex gap-4 mt-2 justify-center text-[10px] font-bold text-foreground/60">
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-primary" /> Employee Share</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-indigo-400" /> Employer Share</span>
                    <span className="flex items-center gap-1"><span className="h-2 w-2 rounded-full bg-amber-400" /> Interest</span>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view retirement projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
