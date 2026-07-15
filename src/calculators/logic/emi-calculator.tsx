'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `An Equated Monthly Installment (EMI) is a fixed payment amount made by a borrower to a lender at a specified date each calendar month. EMIs are applied to both interest and principal each month, so that over a specified number of years, the loan is paid off in full. It offers borrowers the benefit of knowing exactly how much money they will need to pay each month to service their debt, making personal budgeting easier.`,
  formula: `The mathematical formula used to calculate EMI is:

$$EMI = P \\times R \\times \\frac{(1 + R)^N}{(1 + R)^N - 1}$$

Where:
- **P** is the Principal loan amount.
- **R** is the monthly interest rate (Annual interest rate divided by 12, and then divided by 100).
- **N** is the number of monthly installments (Loan tenure in years multiplied by 12).`,
  example: `Let's assume a borrower takes a loan of $100,000 (P) at an annual interest rate of 10% (R_annual) for a tenure of 1 year or 12 months (N).

1. Monthly Interest Rate (R) = 10% / 12 / 100 = 0.008333 per month.
2. Number of installments (N) = 12.
3. Compute the EMI:
   $$EMI = 100,000 \\times 0.008333 \\times \\frac{(1 + 0.008333)^{12}}{(1 + 0.008333)^{12} - 1}$$
   $$EMI = 833.33 \\times \\frac{1.104713}{0.104713} \\approx \\$8,791.59$$
4. Total Interest Paid = (EMI × N) - P = ($8,791.59 × 12) - $100,000 = $5,499.08.`,
  faqs: [
    {
      q: 'What does EMI stand for?',
      a: 'EMI stands for Equated Monthly Installment. It is the fixed monthly amount you pay back to service a loan until it is fully paid.',
    },
    {
      q: 'How does loan prepayment affect my EMI?',
      a: 'Prepaying a portion of your loan reduces the outstanding principal. Lenders typically allow you to either reduce your monthly EMI amount (keeping tenure same) or decrease the remaining loan tenure (keeping monthly EMI same).',
    },
    {
      q: 'Is the EMI interest rate fixed or floating?',
      a: 'EMIs can be calculated for both. Fixed rate loans keep the same EMI throughout the tenure. Floating rate loans change as market interest benchmarks shift, causing either the EMI amount or the loan tenure to fluctuate.',
    },
  ],
};

interface ScheduleYear {
  year: number;
  principalPaid: number;
  interestPaid: number;
  totalPaid: number;
  remainingBalance: number;
  months: {
    monthIndex: number;
    monthName: string;
    principal: number;
    interest: number;
    emi: number;
    endingBalance: number;
  }[];
}

export default function EmiCalculator() {
  const [loanAmount, setLoanAmount] = useState<number>(100000);
  const [interestRate, setInterestRate] = useState<number>(9.5);
  const [tenure, setTenure] = useState<number>(5);
  const [tenureType, setTenureType] = useState<'years' | 'months'>('years');
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [expandedYears, setExpandedYears] = useState<Record<number, boolean>>({});

  // Validate inputs inline during render to decide whether to compute results
  const isValid = loanAmount > 0 && interestRate > 0 && interestRate <= 100 && tenure > 0 && 
                  (tenureType === 'years' ? tenure <= 50 : tenure <= 600);

  // Compute results during render
  let results = null;
  if (isValid) {
    const principal = loanAmount;
    const annualRate = interestRate;
    const totalMonths = tenureType === 'years' ? tenure * 12 : tenure;
    const monthlyRate = annualRate / 12 / 100;

    let emi = 0;
    if (monthlyRate === 0) {
      emi = principal / totalMonths;
    } else {
      emi = (principal * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) / 
            (Math.pow(1 + monthlyRate, totalMonths) - 1);
    }

    const totalPayment = emi * totalMonths;
    const totalInterest = totalPayment - principal;

    const principalPercent = (principal / totalPayment) * 100;
    const interestPercent = (totalInterest / totalPayment) * 100;

    // Build Amortization Schedule
    const schedule: ScheduleYear[] = [];
    let currentBalance = principal;
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    // Start date assumption (current date)
    const startDate = new Date();

    for (let m = 1; m <= totalMonths; m++) {
      const interestForMonth = currentBalance * monthlyRate;
      const principalForMonth = emi - interestForMonth;
      const endingBalance = Math.max(0, currentBalance - principalForMonth);

      const payDate = new Date(startDate.getFullYear(), startDate.getMonth() + m - 1, 1);
      const yearNum = payDate.getFullYear();
      const monthName = `${monthNames[payDate.getMonth()]} ${yearNum}`;

      let yearEntry = schedule.find(y => y.year === yearNum);
      if (!yearEntry) {
        yearEntry = {
          year: yearNum,
          principalPaid: 0,
          interestPaid: 0,
          totalPaid: 0,
          remainingBalance: endingBalance,
          months: [],
        };
        schedule.push(yearEntry);
      }

      yearEntry.principalPaid += principalForMonth;
      yearEntry.interestPaid += interestForMonth;
      yearEntry.totalPaid += emi;
      yearEntry.remainingBalance = endingBalance;
      yearEntry.months.push({
        monthIndex: m,
        monthName,
        principal: principalForMonth,
        interest: interestForMonth,
        emi,
        endingBalance,
      });

      currentBalance = endingBalance;
    }

    results = {
      emi,
      totalInterest,
      totalPayment,
      principalPercent,
      interestPercent,
      schedule,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (loanAmount <= 0) newErrors.loanAmount = 'Amount must be greater than zero';
    if (interestRate <= 0 || interestRate > 100) newErrors.interestRate = 'Rate must be between 0.1% and 100%';
    if (tenure <= 0) newErrors.tenure = 'Tenure must be greater than zero';
    if (tenureType === 'years' && tenure > 50) newErrors.tenure = 'Max tenure is 50 years';
    if (tenureType === 'months' && tenure > 600) newErrors.tenure = 'Max tenure is 600 months';
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setLoanAmount(100000);
    setInterestRate(9.5);
    setTenure(5);
    setTenureType('years');
    setErrors({});
    setExpandedYears({});
  };

  const toggleYear = (year: number) => {
    setExpandedYears(prev => ({
      ...prev,
      [year]: !prev[year],
    }));
  };

  // Custom SVG Pie Chart calculations
  const radius = 50;
  const circ = 2 * Math.PI * radius; // ~314.159
  const principalStroke = results ? (results.principalPercent / 100) * circ : 0;

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Calculate Loan EMI</h2>
          
          <div className="space-y-5">
            {/* Loan Amount */}
            <div>
              <label htmlFor="loan-amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                Loan Amount
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  $
                </div>
                <input
                  id="loan-amount"
                  type="number"
                  value={loanAmount || ''}
                  onChange={(e) => setLoanAmount(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.loanAmount && <p className="text-xs text-red-500 mt-1 font-medium">{errors.loanAmount}</p>}
            </div>

            {/* Interest Rate */}
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

            {/* Loan Tenure */}
            <div>
              <label htmlFor="loan-tenure" className="block text-sm font-semibold text-foreground/80 mb-2">
                Loan Tenure
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1 rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="loan-tenure"
                    type="number"
                    value={tenure || ''}
                    onChange={(e) => setTenure(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                <div className="flex rounded-xl border border-border bg-background p-1.5 gap-1 select-none">
                  <button
                    type="button"
                    onClick={() => { setTenureType('years'); if (errors.tenure) setErrors({}); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      tenureType === 'years'
                        ? 'bg-primary text-white'
                        : 'text-foreground/75 hover:bg-border'
                    }`}
                  >
                    Years
                  </button>
                  <button
                    type="button"
                    onClick={() => { setTenureType('months'); if (errors.tenure) setErrors({}); }}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-colors ${
                      tenureType === 'months'
                        ? 'bg-primary text-white'
                        : 'text-foreground/75 hover:bg-border'
                    }`}
                  >
                    Months
                  </button>
                </div>
              </div>
              {errors.tenure && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tenure}</p>}
            </div>

            {/* Action Buttons */}
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
            <h2 className="text-xl font-bold text-foreground mb-6">Repayment Summary</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                
                {/* Stats */}
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Monthly EMI
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      ${results.emi.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Principal Loan Amount
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${loanAmount.toLocaleString()}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Interest Payable
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.totalInterest.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Repayment
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.totalPayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                {/* SVG Pie Chart */}
                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-44 w-44">
                    <svg className="h-full w-full transform -rotate-90" viewBox="0 0 120 120">
                      {/* Circumference track (Interest - colored red/amber or slate) */}
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="var(--primary)"
                        strokeWidth="12"
                        className="text-primary"
                      />
                      {/* Principal segment */}
                      <circle
                        cx="60"
                        cy="60"
                        r={radius}
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="12.5"
                        strokeDasharray={circ}
                        strokeDashoffset={results.principalPercent === 100 ? 0 : principalStroke}
                        className="transition-all duration-500 ease-out"
                        style={{
                          stroke: 'var(--accent)',
                        }}
                      />
                    </svg>
                    {/* Inner Label */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-foreground/40">
                        Interest
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {results.interestPercent.toFixed(1)}%
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6 text-xs font-semibold">
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-accent" />
                      <span className="text-foreground/70">Principal ({results.principalPercent.toFixed(1)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-3 w-3 rounded-full bg-primary" />
                      <span className="text-foreground/70">Interest ({results.interestPercent.toFixed(1)}%)</span>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter your loan details to view results.
              </div>
            )}
          </div>
        </div>

      </div>

      {/* Amortization Schedule */}
      {results && results.schedule.length > 0 && (
        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground">Amortization Schedule</h2>
          <p className="text-xs text-foreground/50 mt-1 mb-6">Yearly payment breakdowns (Click a year to expand monthly payments)</p>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-border text-foreground/60 text-xs font-bold uppercase tracking-wider">
                  <th className="py-3 px-4">Year</th>
                  <th className="py-3 px-4 text-right">Principal Paid</th>
                  <th className="py-3 px-4 text-right">Interest Paid</th>
                  <th className="py-3 px-4 text-right">Total Paid</th>
                  <th className="py-3 px-4 text-right">Remaining Balance</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border text-sm font-medium">
                {results.schedule.map((yearData) => {
                  const isExpanded = !!expandedYears[yearData.year];
                  return (
                    <React.Fragment key={yearData.year}>
                      {/* Year Row */}
                      <tr 
                        onClick={() => toggleYear(yearData.year)}
                        className="hover:bg-background cursor-pointer transition-colors"
                      >
                        <td className="py-3.5 px-4 font-bold text-primary flex items-center gap-1">
                          <span>Year {yearData.year}</span>
                          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded ml-1.5 font-semibold">
                            {isExpanded ? 'Hide Months' : 'Show Months'}
                          </span>
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold">
                          ${yearData.principalPaid.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold">
                          ${yearData.interestPaid.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 px-4 text-right font-bold text-foreground">
                          ${yearData.totalPaid.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </td>
                        <td className="py-3.5 px-4 text-right font-semibold text-foreground/70">
                          ${yearData.remainingBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                        </td>
                      </tr>

                      {/* Monthly Rows (conditional rendering) */}
                      {isExpanded && (
                        <tr className="bg-background/40">
                          <td colSpan={5} className="p-0 border-t border-border">
                            <table className="w-full text-left bg-background/30 text-xs divide-y divide-border/60">
                              <thead>
                                <tr className="text-foreground/50 font-bold uppercase tracking-wider bg-background/50">
                                  <th className="py-2.5 pl-8 pr-4">Month</th>
                                  <th className="py-2.5 px-4 text-right">Principal Repaid</th>
                                  <th className="py-2.5 px-4 text-right">Interest Charged</th>
                                  <th className="py-2.5 px-4 text-right">Total Paid (EMI)</th>
                                  <th className="py-2.5 px-4 text-right">Ending Balance</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-border/30 text-foreground/80 font-medium">
                                {yearData.months.map((month) => (
                                  <tr key={month.monthIndex} className="hover:bg-background/80">
                                    <td className="py-2.5 pl-8 pr-4 text-foreground/60">{month.monthName}</td>
                                    <td className="py-2.5 px-4 text-right">${month.principal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td className="py-2.5 px-4 text-right">${month.interest.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td className="py-2.5 px-4 text-right font-semibold text-foreground">${month.emi.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                    <td className="py-2.5 px-4 text-right">${month.endingBalance.toLocaleString(undefined, { maximumFractionDigits: 2 })}</td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
