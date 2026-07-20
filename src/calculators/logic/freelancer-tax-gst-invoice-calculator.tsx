'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Freelancer Tax & GST Invoice Calculator is an interactive utility designed for independent contractors, freelancers, gig workers, and self-employed professionals. This tool simplifies invoice creation and tax estimation by calculating the Goods and Services Tax (GST/VAT) added to base rates, Tax Deducted at Source (TDS), deductible professional business expenses, and personal income tax liabilities. By inputting project rates and tax rates, freelancers can project their actual take-home earnings and prepare for quarterly tax filings. You can cross-reference business tax rules on official revenue portals: the [IRS (US)](https://www.irs.gov), the [GST Portal (India)](https://www.gst.gov.in), [HMRC (UK)](https://www.gov.uk/government/organisations/hm-revenue-customs), the [European Commission (EU)](https://taxation-customs.ec.europa.eu), the [FBR (Pakistan)](https://www.fbr.gov.pk), the [NBR (Bangladesh)](https://nbr.gov.bd), and the [GIB (Turkey)](https://www.gib.gov.tr).',
  formula: `The calculator uses the following financial flow to determine net earnings:

1. **GST/VAT Amount**:
   $$\\text{GST} = \\text{Base Invoice} \\times \\frac{\\text{GST Rate}}{100}$$

2. **Gross Invoice Amount**:
   $$\\text{Gross} = \\text{Base Invoice} + \\text{GST}$$

3. **Tax Deducted at Source (TDS)**:
   $$\\text{TDS} = \\text{Base Invoice} \\times \\frac{\\text{TDS Rate}}{100}$$

4. **Taxable Business Profit**:
   $$\\text{Taxable Income} = \\max(0, \\text{Base Invoice} - \\text{Business Expenses})$$

5. **Income Tax Liability**:
   $$\\text{Income Tax} = \\text{Taxable Income} \\times \\frac{\\text{Income Tax Bracket}}{100}$$

6. **Net Take-Home Earnings**:
   $$\\text{Net Take-Home} = \\text{Taxable Income} - \\text{Income Tax}$$

Understanding the freelancer tax calculator rules helps you allocate funds for tax season.`,
  example: `Let's trace a freelancer tax calculation example. Suppose you issue a base invoice of $10,000 to a client. Your business charges 18% GST, has a 10% TDS withholding, and you incurred $2,000 in software and office expenses. Your income tax bracket is 20%.

1. **Invoice Calculations**:
   - Base Invoice = $10,000.
   - GST (18%) = $1,800.
   - Gross Invoice Value = $11,800.
   - TDS (10% of Base) = $1,000.
   - Net Client Payout = Gross - TDS = $11,800 - $1,000 = $10,800.

2. **Profit and Tax Calculations**:
   - Business Expenses = $2,000.
   - Taxable Profit = $10,000 - $2,000 = $8,000.
   - Income Tax (20% of Taxable Profit) = $1,600.

3. **Take-Home Breakdown**:
   - Net Take-Home Earnings = Taxable Profit - Income Tax = $8,000 - $1,600 = $6,400.
   - Realized immediate Cash In-hand = $10,800 (Payout) - $1,800 (GST payable) - $1,600 (Tax payable) = $7,400 (Note that the $1,000 TDS is a tax asset that can be claimed back or offset).`,
  faqs: [
    {
      q: 'What is the difference between GST and Income Tax?',
      a: 'GST (Goods and Services Tax) is an indirect consumption tax that you collect from your client and pass on to the government. Income Tax is a direct tax on the net profits (income minus business expenses) that you earn.',
    },
    {
      q: 'What counts as a deductible business expense for a freelancer?',
      a: 'Any expense incurred exclusively for running your freelancing business can be deducted. This includes software subscriptions, laptop depreciation, internet bills, coworking space fees, advertising costs, and professional courses.',
    },
    {
      q: 'Can I claim back TDS deducted by clients?',
      a: 'Yes. TDS is advance tax paid on your behalf. When you file your income tax return, if your total tax liability is lower than the total TDS deducted, the government will refund the excess TDS amount.',
    },
    {
      q: 'Do I need to register for GST as a freelancer?',
      a: 'GST registration thresholds vary by country. In India, registration is mandatory if annual turnover exceeds ₹20 Lakhs (or ₹10 Lakhs in special states) for services. In other regions, VAT/GST thresholds vary.',
    },
    {
      q: 'How does the presumptive taxation scheme work for professionals?',
      a: 'Some countries (like India under Section 44ADA) offer a presumptive taxation scheme where freelancers can declare 50% of their gross receipts as taxable profit, avoiding the need to maintain detailed business expense records.',
    },
  ],
};

export default function FreelancerTaxCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [baseInvoice, setBaseInvoice] = useState<number>(10000);
  const [gstRate, setGstRate] = useState<number>(18);
  const [tdsRate, setTdsRate] = useState<number>(10);
  const [expenses, setExpenses] = useState<number>(2000);
  const [taxBracket, setTaxBracket] = useState<number>(20);
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

  const isValid = baseInvoice > 0 && gstRate >= 0 && gstRate <= 50 && tdsRate >= 0 && tdsRate <= 50 &&
                  expenses >= 0 && expenses <= baseInvoice && taxBracket >= 0 && taxBracket <= 50;

  let results = null;
  if (isValid) {
    const gstAmount = baseInvoice * (gstRate / 100);
    const grossInvoice = baseInvoice + gstAmount;
    const tdsAmount = baseInvoice * (tdsRate / 100);
    const netPayout = grossInvoice - tdsAmount;
    const taxableProfit = Math.max(0, baseInvoice - expenses);
    const incomeTax = taxableProfit * (taxBracket / 100);
    const netTakeHome = taxableProfit - incomeTax;

    // SVG Chart percentages
    const totalRepresented = netTakeHome + expenses + incomeTax + gstAmount;
    const takeHomePct = (netTakeHome / totalRepresented) * 100;
    const expensePct = (expenses / totalRepresented) * 100;
    const taxPct = (incomeTax / totalRepresented) * 100;
    const gstPct = (gstAmount / totalRepresented) * 100;

    results = {
      gstAmount,
      grossInvoice,
      tdsAmount,
      netPayout,
      taxableProfit,
      incomeTax,
      netTakeHome,
      takeHomePct,
      expensePct,
      taxPct,
      gstPct,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (baseInvoice <= 0) newErrors.baseInvoice = 'Invoice amount must be greater than zero';
    if (gstRate < 0 || gstRate > 50) newErrors.gstRate = 'GST rate must be between 0% and 50%';
    if (tdsRate < 0 || tdsRate > 50) newErrors.tdsRate = 'TDS rate must be between 0% and 50%';
    if (expenses < 0 || expenses > baseInvoice) newErrors.expenses = 'Expenses cannot exceed base invoice amount';
    if (taxBracket < 0 || taxBracket > 50) newErrors.taxBracket = 'Tax bracket must be between 0% and 50%';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setBaseInvoice(10000);
    setGstRate(18);
    setTdsRate(10);
    setExpenses(2000);
    setTaxBracket(20);
    setErrors({});
  };

  const radius = 45;
  const circ = 2 * Math.PI * radius; // ~282.74

  let currentOffset = 0;
  const getStrokeDash = (pct: number) => {
    const strokeLength = (pct / 100) * circ;
    const dashArray = `${strokeLength} ${circ - strokeLength}`;
    const dashOffset = currentOffset;
    currentOffset -= strokeLength;
    return { dashArray, dashOffset };
  };

  const takeHomeDash = results ? getStrokeDash(results.takeHomePct) : null;
  const expenseDash = results ? getStrokeDash(results.expensePct) : null;
  const taxDash = results ? getStrokeDash(results.taxPct) : null;
  const gstDash = results ? getStrokeDash(results.gstPct) : null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Invoice & Tax Details</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="currency-select" className="block text-sm font-semibold text-foreground/80 mb-2">
                Currency
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <select
                  id="currency-select"
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value as any)}
                  className="block w-full py-3 px-3 text-sm font-semibold rounded-xl bg-transparent text-foreground/80 outline-none cursor-pointer"
                >
                  <option value="USD">USD ($)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="PKR">PKR (Rs)</option>
                  <option value="BDT">BDT (৳)</option>
                  <option value="TRY">TRY (₺)</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="base-invoice" className="block text-sm font-semibold text-foreground/80 mb-2">
                Base Invoice Amount (excluding tax)
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="base-invoice"
                  type="number"
                  value={baseInvoice || ''}
                  onChange={(e) => setBaseInvoice(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.baseInvoice && <p className="text-xs text-red-500 mt-1 font-medium">{errors.baseInvoice}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="gst-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  GST/VAT Rate
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="gst-rate"
                    type="number"
                    value={gstRate || ''}
                    onChange={(e) => setGstRate(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-8 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.gstRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.gstRate}</p>}
              </div>

              <div>
                <label htmlFor="tds-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  TDS Rate (Withholding)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="tds-rate"
                    type="number"
                    value={tdsRate || ''}
                    onChange={(e) => setTdsRate(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-8 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.tdsRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tdsRate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="expenses" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Business Expenses
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    {currencySymbols[currency]}
                  </div>
                  <input
                    id="expenses"
                    type="number"
                    value={expenses || ''}
                    onChange={(e) => setExpenses(Number(e.target.value))}
                    className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.expenses && <p className="text-xs text-red-500 mt-1 font-medium">{errors.expenses}</p>}
              </div>

              <div>
                <label htmlFor="tax-bracket" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Income Tax Bracket
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="tax-bracket"
                    type="number"
                    value={taxBracket || ''}
                    onChange={(e) => setTaxBracket(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-8 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.taxBracket && <p className="text-xs text-red-500 mt-1 font-medium">{errors.taxBracket}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate Net Earnings
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
            <h2 className="text-xl font-bold text-foreground mb-6">Net Take-Home Projection</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-3.5">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                      Net Take-Home Income
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {currencySymbols[currency]}{results.netTakeHome.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Gross Invoice (with GST):</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.grossInvoice.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">GST to Pay (Indirect Tax):</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.gstAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">TDS Withheld (Advanced Tax):</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.tdsAmount.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Income Tax Liability:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.incomeTax.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 110 110">
                      <circle
                        cx="55"
                        cy="55"
                        r={radius}
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      {takeHomeDash && results.takeHomePct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="var(--primary)"
                          strokeWidth="8"
                          strokeDasharray={takeHomeDash.dashArray}
                          strokeDashoffset={takeHomeDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {expenseDash && results.expensePct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#6b7280"
                          strokeWidth="8"
                          strokeDasharray={expenseDash.dashArray}
                          strokeDashoffset={expenseDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {taxDash && results.taxPct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#ef4444"
                          strokeWidth="8"
                          strokeDasharray={taxDash.dashArray}
                          strokeDashoffset={taxDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {gstDash && results.gstPct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#f59e0b"
                          strokeWidth="8"
                          strokeDasharray={gstDash.dashArray}
                          strokeDashoffset={gstDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/40">
                        Take-Home Margin
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {results.takeHomePct.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-5 text-[10px] font-semibold w-full">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-foreground/70 truncate">Take-Home ({results.takeHomePct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-gray-500" />
                      <span className="text-foreground/70 truncate">Expenses ({results.expensePct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="text-foreground/70 truncate">Income Tax ({results.taxPct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      <span className="text-foreground/70 truncate">GST ({results.gstPct.toFixed(0)}%)</span>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
