'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Payroll Calculator estimates net take-home pay by subtracting federal/state income taxes, FICA social security taxes, and pre-tax or post-tax deductions from gross salary amounts.`,
  formula: `Payroll deductions follow a sequential taxation flow:

**1. Pre-Tax Deductions:**
$$\\text{Taxable Income} = \\text{Gross Pay} - \\text{Pre-Tax Deductions}$$

**2. Income Tax and FICA withholding:**
$$\\text{Tax Witheld} = \\text{Taxable Income} \\times \\left( \\frac{\\text{Tax Rate \\%}}{100} \\right)$$

**3. Net Take-Home Pay:**
$$\\text{Net Pay} = \\text{Taxable Income} - \\text{Total Tax Withholding} - \\text{Post-Tax Deductions}$$`,
  example: `**Calculate take-home pay on a $5,000 monthly gross income:**
- Gross Pay = $5,000. Pre-tax 401k = 5% ($250).
- Taxable Income = 5,000 - 250 = $4,750.
- Taxes: Federal 12% ($570), FICA 7.65% ($363.38).
- Post-tax Deduction = $50.
- Net Pay = 4,750 - 570 - 363.38 - 50 = **$3,766.62**.`,
  faqs: [
    {
      q: 'What is the difference between pre-tax and post-tax deductions?',
      a: 'Pre-tax deductions (like standard health insurance or 401k) reduce your taxable income, meaning you pay less income tax. Post-tax deductions (like Roth IRAs or wage garnishments) are taken out after taxes are calculated.',
    },
    {
      q: 'What is FICA tax?',
      a: 'FICA stands for Federal Insurance Contributions Act. It consists of Social Security (6.2%) and Medicare (1.45%) taxes, totaling 7.65% for standard employee paychecks.',
    },
    {
      q: 'How is net pay calculated?',
      a: 'Net pay is your final take-home salary after subtracting all taxes, FICA contributions, healthcare premiums, retirement funds, and other paycheck deductions.',
    },
  ],
};

type DeductionType = 'percent' | 'flat';

export default function PayrollCalculator() {
  const [grossPay, setGrossPay] = useState<number>(5000);
  const [deductionType, setDeductionType] = useState<DeductionType>('percent');
  const [preTaxDeduction, setPreTaxDeduction] = useState<number>(5); // e.g. 401k %
  const [federalTax, setFederalTax] = useState<number>(12);
  const [stateTax, setStateTax] = useState<number>(4);
  const [ficaTax, setFicaTax] = useState<number>(7.65);
  const [postTaxDeduction, setPostTaxDeduction] = useState<number>(50);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setGrossPay(5000);
    setDeductionType('percent');
    setPreTaxDeduction(5);
    setFederalTax(12);
    setStateTax(4);
    setFicaTax(7.65);
    setPostTaxDeduction(50);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(grossPay) && grossPay >= 0 &&
                  !isNaN(preTaxDeduction) && preTaxDeduction >= 0 &&
                  !isNaN(federalTax) && federalTax >= 0 &&
                  !isNaN(stateTax) && stateTax >= 0 &&
                  !isNaN(ficaTax) && ficaTax >= 0 &&
                  !isNaN(postTaxDeduction) && postTaxDeduction >= 0;

  if (isValid) {
    const preTaxAmount = deductionType === 'percent'
      ? grossPay * (preTaxDeduction / 100)
      : preTaxDeduction;

    const taxableIncome = Math.max(0, grossPay - preTaxAmount);

    const fedWithheld = taxableIncome * (federalTax / 100);
    const stateWithheld = taxableIncome * (stateTax / 100);
    const ficaWithheld = taxableIncome * (ficaTax / 100);
    const totalTaxes = fedWithheld + stateWithheld + ficaWithheld;

    const netPay = Math.max(0, taxableIncome - totalTaxes - postTaxDeduction);

    results = {
      preTaxAmount,
      taxableIncome,
      fedWithheld,
      stateWithheld,
      ficaWithheld,
      totalTaxes,
      netPay,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (grossPay < 0 || isNaN(grossPay)) newErrors.grossPay = 'Gross pay cannot be negative';
    if (preTaxDeduction < 0 || isNaN(preTaxDeduction)) newErrors.preTaxDeduction = 'Pre-tax deductions cannot be negative';
    if (federalTax < 0 || isNaN(federalTax)) newErrors.federalTax = 'Federal tax cannot be negative';
    if (stateTax < 0 || isNaN(stateTax)) newErrors.stateTax = 'State tax cannot be negative';
    if (ficaTax < 0 || isNaN(ficaTax)) newErrors.ficaTax = 'FICA rate cannot be negative';
    if (postTaxDeduction < 0 || isNaN(postTaxDeduction)) newErrors.postTaxDeduction = 'Post-tax deductions cannot be negative';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Payroll Details</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="gross-pay" className="block text-sm font-semibold text-foreground/80 mb-2">Gross Pay per Period ($)</label>
              <input
                id="gross-pay"
                type="number"
                value={grossPay}
                onChange={(e) => { setGrossPay(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.grossPay && <p className="text-xs text-red-500 mt-1 font-medium">{errors.grossPay}</p>}
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Pre-Tax Deductions</label>
              <div className="flex gap-2">
                <input
                  type="number"
                  value={preTaxDeduction}
                  onChange={(e) => { setPreTaxDeduction(Number(e.target.value)); setErrors({}); }}
                  className="flex-1 py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                <select
                  value={deductionType}
                  onChange={(e) => { setDeductionType(e.target.value as DeductionType); setErrors({}); }}
                  className="w-24 py-3 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
                >
                  <option value="percent">% of Gross</option>
                  <option value="flat">Flat ($)</option>
                </select>
              </div>
              {errors.preTaxDeduction && <p className="text-xs text-red-500 mt-1 font-medium">{errors.preTaxDeduction}</p>}
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label htmlFor="fed-tax" className="block text-[11px] font-bold text-foreground/75 mb-1.5">Federal Tax (%)</label>
                <input
                  id="fed-tax"
                  type="number"
                  value={federalTax}
                  onChange={(e) => { setFederalTax(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-2.5 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>
              <div>
                <label htmlFor="state-tax" className="block text-[11px] font-bold text-foreground/75 mb-1.5">State Tax (%)</label>
                <input
                  id="state-tax"
                  type="number"
                  value={stateTax}
                  onChange={(e) => { setStateTax(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-2.5 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>
              <div>
                <label htmlFor="fica-tax" className="block text-[11px] font-bold text-foreground/75 mb-1.5">FICA Tax (%)</label>
                <input
                  id="fica-tax"
                  type="number"
                  value={ficaTax}
                  onChange={(e) => { setFicaTax(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-2.5 px-3 text-xs font-medium rounded-lg border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>
            </div>

            <div>
              <label htmlFor="post-tax" className="block text-sm font-semibold text-foreground/80 mb-2">Post-Tax Deductions ($)</label>
              <input
                id="post-tax"
                type="number"
                value={postTaxDeduction}
                onChange={(e) => { setPostTaxDeduction(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.postTaxDeduction && <p className="text-xs text-red-500 mt-1 font-medium">{errors.postTaxDeduction}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Payroll
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
            <h2 className="text-xl font-bold text-foreground mb-6">Take-Home Estimate</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Net Take-Home Pay</span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    ${results.netPay.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Taxable Income</span>
                    <span className="block text-lg font-bold text-foreground mt-1">
                      ${results.taxableIncome.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Total Tax Withheld</span>
                    <span className="block text-lg font-bold text-red-500 mt-1">
                      -${results.totalTaxes.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="rounded-xl bg-background p-3 border border-border text-center">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">Federal</span>
                    <span className="block text-sm font-bold text-foreground mt-1">${results.fedWithheld.toFixed(2)}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border text-center">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">State</span>
                    <span className="block text-sm font-bold text-foreground mt-1">${results.stateWithheld.toFixed(2)}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border text-center">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">FICA</span>
                    <span className="block text-sm font-bold text-foreground mt-1">${results.ficaWithheld.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter paycheck details.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
