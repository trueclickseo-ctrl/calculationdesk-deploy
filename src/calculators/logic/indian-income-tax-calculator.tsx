'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Indian Income Tax Calculator is a specialized financial tool designed to estimate income tax liabilities for FY 2024-25 (AY 2025-26). It offers a side-by-side comparison between the Old Tax Regime (which allows various deductions like Section 80C, 80D, and HRA) and the simplified New Tax Regime under Section 115BAC (which features lower tax rates but fewer deductions). Salaried individuals and business owners use this calculator to identify which tax structure offers greater tax savings. You can verify slab details on the official [Income Tax Department of India website](https://incometaxindia.gov.in).',
  formula: `Tax liabilities are calculated based on the official slab rates announced by the Ministry of Finance for FY 2024-25 (AY 2025-26):

1. **New Tax Regime Slabs (Salaried Standard Deduction: ₹75,000)**:
   - Up to ₹3,00,000: Nil (0%)
   - ₹3,00,001 to ₹7,00,000: 5%
   - ₹7,00,001 to ₹10,00,000: 10%
   - ₹10,00,001 to ₹12,00,000: 15%
   - ₹12,00,001 to ₹15,00,000: 20%
   - Above ₹15,00,000: 30%
   *Note: Section 87A rebate applies if taxable income does not exceed ₹7,00,000 (tax is Nil).*

2. **Old Tax Regime Slabs (Salaried Standard Deduction: ₹50,000)**:
   - Up to ₹2,50,000: Nil (0%)
   - ₹2,50,001 to ₹5,00,000: 5%
   - ₹5,00,001 to ₹10,00,000: 20%
   - Above ₹10,00,000: 30%
   *Note: Section 87A rebate applies if taxable income does not exceed ₹5,00,000 (tax is Nil).*

3. **Cess Surcharge**:
   $$\\text{Total Tax} = (\\text{Basic Slab Tax} - \\text{Rebate}) \\times 1.04$$
   (A 4% Health and Education Cess is added to the net tax payable).`,
  example: `To verify that this calculator uses the right method, let's look at an income tax calculation example comparing the Old Regime and New Regime for FY 2024-25. Suppose a salaried individual under 60 years has a gross annual salary of ₹12,00,000, claiming ₹1,50,000 under Section 80C and ₹25,000 under Section 80D.

1. **New Regime Calculation (under Section 115BAC)**:
   - Gross Annual Income = ₹12,00,000.
   - Salaried Standard Deduction = ₹75,000 (increased in July 2024 Budget).
   - Net Taxable Income = ₹12,00,000 - ₹75,000 = ₹11,25,000.
   - Income Tax Slabs:
     - Up to ₹3,00,000 (0% slab) = ₹0.
     - ₹3,00,001 to ₹7,00,000 (5% slab on ₹4,00,000) = ₹20,000.
     - ₹7,00,001 to ₹10,00,000 (10% slab on ₹3,00,000) = ₹30,000.
     - ₹10,00,001 to ₹11,25,000 (15% slab on ₹1,25,000) = ₹18,750.
   - Total Basic Tax = ₹68,750.
   - Health & Education Cess (4% of ₹68,750) = ₹2,750.
   - Total New Regime Tax Due = ₹68,750 + ₹2,750 = ₹71,500.

2. **Old Regime Calculation (with traditional tax deductions)**:
   - Gross Annual Income = ₹12,00,000.
   - Salaried Standard Deduction = ₹50,000.
   - Section 80C Deduction (Max limit) = ₹1,50,000.
   - Section 80D Health Premium Deduction = ₹25,000.
   - Net Taxable Income = ₹12,00,000 - (₹50,000 + ₹1,50,000 + ₹25,000) = ₹9,75,000.
   - Income Tax Slabs:
     - Up to ₹2,50,000 (0% slab) = ₹0.
     - ₹2,50,001 to ₹5,00,000 (5% slab on ₹2,50,000) = ₹12,500.
     - ₹5,00,001 to ₹9,75,000 (20% slab on ₹4,75,000) = ₹95,000.
   - Total Basic Tax = ₹1,07,500.
   - Health & Education Cess (4% of ₹1,07,500) = ₹4,300.
   - Total Old Regime Tax Due = ₹1,07,500 + ₹4,300 = ₹1,11,800.

By comparing both regimes side-by-side, the visitor can verify that the New Tax Regime results in an annual tax savings of ₹40,300, proving that the simplified tax model is highly beneficial for this income profile.`,
  faqs: [
    {
      q: 'What is the standard deduction in FY 2024-25?',
      a: 'Salaried employees and pensioners receive a flat standard deduction of ₹75,000 under the New Tax Regime (increased from ₹50,000 in July 2024) and ₹50,000 under the Old Tax Regime.',
    },
    {
      q: 'Can I switch between the Old and New tax regimes?',
      a: 'Salaried individuals can choose and switch their regime every financial year at the time of filing their Income Tax Return (ITR). Business owners can only switch once in a lifetime.',
    },
    {
      q: 'Are home loan interest deductions allowed in the New Tax Regime?',
      a: 'No. Deductions for home loan interest on self-occupied property (Section 24b) are not allowed under the New Tax Regime. They are only allowed under the Old Regime up to a limit of ₹2 Lakhs.',
    },
    {
      q: 'Is there a tax rebate if my income is below ₹7 Lakhs?',
      a: 'Yes. Under the New Tax Regime, if your taxable income (after standard deduction) is up to ₹7,00,000, you are entitled to a full tax rebate under Section 87A, resulting in zero tax liability.',
    },
    {
      q: 'What deductions can I claim under Section 80C?',
      a: 'Under the Old Tax Regime, you can claim up to ₹1,50,000 per year for investments in the Public Provident Fund (PPF), Employee Provident Fund (EPF), National Savings Certificate (NSC), life insurance premiums, ELSS mutual funds, and children\'s school tuition fees.',
    },
  ],
};

export default function IndianTaxCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('INR');
  const [grossSalary, setGrossSalary] = useState<number>(1200000);
  const [otherIncome, setOtherIncome] = useState<number>(0);
  const [isSalaried, setIsSalaried] = useState<boolean>(true);

  // Old Regime Deductions
  const [sec80C, setSec80C] = useState<number>(150000);
  const [sec80D, setSec80D] = useState<number>(25000);
  const [sec24b, setSec24b] = useState<number>(0); // Home loan
  const [otherDeductions, setOtherDeductions] = useState<number>(0);

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

  const isValid = grossSalary >= 0 && otherIncome >= 0 && sec80C >= 0 && sec80D >= 0 && sec24b >= 0 && otherDeductions >= 0;

  // New Regime Calculation (FY 2024-25 slabs)
  const calculateNewRegimeTax = (taxable: number) => {
    if (taxable <= 700000) return 0; // Rebate makes it nil

    let tax = 0;
    // Up to 3L: Nil
    if (taxable > 300000) {
      const slabAmt = Math.min(taxable - 300000, 400000); // 3L to 7L
      tax += slabAmt * 0.05;
    }
    if (taxable > 700000) {
      const slabAmt = Math.min(taxable - 700000, 300000); // 7L to 10L
      tax += slabAmt * 0.10;
    }
    if (taxable > 1000000) {
      const slabAmt = Math.min(taxable - 1000000, 200000); // 10L to 12L
      tax += slabAmt * 0.15;
    }
    if (taxable > 1200000) {
      const slabAmt = Math.min(taxable - 1200000, 300000); // 12L to 15L
      tax += slabAmt * 0.20;
    }
    if (taxable > 1500000) {
      tax += (taxable - 1500000) * 0.30;
    }

    return tax;
  };

  // Old Regime Calculation
  const calculateOldRegimeTax = (taxable: number) => {
    if (taxable <= 500000) return 0; // Rebate makes it nil

    let tax = 0;
    // Up to 2.5L: Nil
    if (taxable > 250000) {
      const slabAmt = Math.min(taxable - 250000, 250000); // 2.5L to 5L
      tax += slabAmt * 0.05;
    }
    if (taxable > 500000) {
      const slabAmt = Math.min(taxable - 500000, 500000); // 5L to 10L
      tax += slabAmt * 0.20;
    }
    if (taxable > 1000000) {
      tax += (taxable - 1000000) * 0.30;
    }

    return tax;
  };

  let results = null;
  if (isValid) {
    // 1. New Regime
    const stdNew = isSalaried ? 75000 : 0;
    const taxableNew = Math.max(0, grossSalary + otherIncome - stdNew);
    const basicTaxNew = calculateNewRegimeTax(taxableNew);
    const cessNew = basicTaxNew * 0.04;
    const totalTaxNew = basicTaxNew + cessNew;

    // 2. Old Regime
    const stdOld = isSalaried ? 50000 : 0;
    const deductionsTotal = Math.min(150000, sec80C) + Math.min(100000, sec80D) + Math.min(200000, sec24b) + otherDeductions;
    const taxableOld = Math.max(0, grossSalary + otherIncome - stdOld - deductionsTotal);
    const basicTaxOld = calculateOldRegimeTax(taxableOld);
    const cessOld = basicTaxOld * 0.04;
    const totalTaxOld = basicTaxOld + cessOld;

    // Comparison
    const savings = Math.max(0, totalTaxOld - totalTaxNew);
    const preferredRegime = totalTaxNew <= totalTaxOld ? 'New Tax Regime' : 'Old Tax Regime';

    results = {
      taxableNew,
      totalTaxNew,
      taxableOld,
      totalTaxOld,
      savings,
      preferredRegime,
      deductionsTotal,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (grossSalary < 0) newErrors.grossSalary = 'Gross salary cannot be negative';
    if (otherIncome < 0) newErrors.otherIncome = 'Other income cannot be negative';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setGrossSalary(1200000);
    setOtherIncome(0);
    setIsSalaried(true);
    setSec80C(150000);
    setSec80D(25000);
    setSec24b(0);
    setOtherDeductions(0);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Income & Deductions</h2>
            
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
              <label htmlFor="gross-salary" className="block text-sm font-semibold text-foreground/80 mb-2">
                Annual Gross Salary
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="gross-salary"
                  type="number"
                  value={grossSalary || ''}
                  onChange={(e) => setGrossSalary(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.grossSalary && <p className="text-xs text-red-500 mt-1 font-medium">{errors.grossSalary}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="other-income" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Other Income
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    {currencySymbols[currency]}
                  </div>
                  <input
                    id="other-income"
                    type="number"
                    value={otherIncome || ''}
                    onChange={(e) => setOtherIncome(Number(e.target.value))}
                    className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Employment Type</label>
                <div className="flex items-center h-12">
                  <input
                    id="is-salaried"
                    type="checkbox"
                    checked={isSalaried}
                    onChange={(e) => setIsSalaried(e.target.checked)}
                    className="h-4 w-4 rounded border-border text-primary focus:ring-primary cursor-pointer"
                  />
                  <label htmlFor="is-salaried" className="ml-2 text-sm font-semibold text-foreground/70 cursor-pointer">
                    Salaried Employee
                  </label>
                </div>
              </div>
            </div>

            {/* Old Regime Deductions Section */}
            <div className="border-t border-border/60 pt-4">
              <h3 className="text-sm font-bold text-foreground mb-3">Deductions (Only for Old Regime)</h3>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="sec-80c" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                    Section 80C (PPF, EPF - Max 1.5L)
                  </label>
                  <input
                    id="sec-80c"
                    type="number"
                    value={sec80C || ''}
                    onChange={(e) => setSec80C(Number(e.target.value))}
                    className="block w-full py-2.5 px-3.5 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                </div>

                <div>
                  <label htmlFor="sec-80d" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                    Section 80D (Health Insurance)
                  </label>
                  <input
                    id="sec-80d"
                    type="number"
                    value={sec80D || ''}
                    onChange={(e) => setSec80D(Number(e.target.value))}
                    className="block w-full py-2.5 px-3.5 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="sec-24b" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                    Section 24b (Home Interest - Max 2L)
                  </label>
                  <input
                    id="sec-24b"
                    type="number"
                    value={sec24b || ''}
                    onChange={(e) => setSec24b(Number(e.target.value))}
                    className="block w-full py-2.5 px-3.5 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                </div>

                <div>
                  <label htmlFor="other-ded" className="block text-xs font-semibold text-foreground/70 mb-1.5">
                    HRA & Other Exemptions
                  </label>
                  <input
                    id="other-ded"
                    type="number"
                    value={otherDeductions || ''}
                    onChange={(e) => setOtherDeductions(Number(e.target.value))}
                    className="block w-full py-2.5 px-3.5 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Compare Regimes
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
            <h2 className="text-xl font-bold text-foreground mb-6">Tax Regime Comparison</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Savings Banner */}
                <div className="rounded-xl bg-primary/5 p-5 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                    Recommended Regime
                  </span>
                  <span className="block text-2xl font-extrabold text-primary mt-1">
                    {results.preferredRegime}
                  </span>
                  {results.savings > 0 && (
                    <span className="block text-xs font-semibold text-foreground/50 mt-1.5">
                      Saves {currencySymbols[currency]}{results.savings.toLocaleString(undefined, { maximumFractionDigits: 0 })} annually
                    </span>
                  )}
                </div>

                {/* Side-by-side comparison tables */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      New Tax Regime
                    </span>
                    <span className="block text-xl font-extrabold text-foreground mt-2">
                      {currencySymbols[currency]}{results.totalTaxNew.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-[10px] text-foreground/45 block mt-2">
                      Taxable: {currencySymbols[currency]}{results.taxableNew.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Old Tax Regime
                    </span>
                    <span className="block text-xl font-extrabold text-foreground mt-2">
                      {currencySymbols[currency]}{results.totalTaxOld.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="text-[10px] text-foreground/45 block mt-2">
                      Taxable: {currencySymbols[currency]}{results.taxableOld.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Horizontal Cost comparison bar chart */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Tax Liability Comparison</h4>
                  <div className="space-y-2.5">
                    {/* New Regime Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/70 mb-1">
                        <span>New Tax Regime</span>
                        <span>{currencySymbols[currency]}{results.totalTaxNew.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${results.totalTaxNew === 0 ? 0 : Math.max(5, (results.totalTaxNew / Math.max(results.totalTaxNew, results.totalTaxOld, 1)) * 100)}%` }} />
                      </div>
                    </div>

                    {/* Old Regime Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/70 mb-1">
                        <span>Old Tax Regime</span>
                        <span>{currencySymbols[currency]}{results.totalTaxOld.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${results.totalTaxOld === 0 ? 0 : Math.max(5, (results.totalTaxOld / Math.max(results.totalTaxNew, results.totalTaxOld, 1)) * 100)}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter income details to view comparisons.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
