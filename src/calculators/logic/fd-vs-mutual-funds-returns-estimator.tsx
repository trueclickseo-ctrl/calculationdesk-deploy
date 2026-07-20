'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The FD vs Mutual Funds returns estimator is a comparative financial planner designed to compare Fixed Deposits (FD) against Mutual Fund investments. While FDs offer guaranteed returns with quarterly compounding, Mutual Funds deliver higher expected returns subject to market volatility. This calculator projects maturity wealth and applies tax slab and capital gains tax rules to estimate the real post-tax yield of each asset class. You can verify income tax slabs and capital gains regulations on official revenue websites: the [IRS (US)](https://www.irs.gov), the [Income Tax Department (India)](https://incometaxindia.gov.in), [HMRC (UK)](https://www.gov.uk/government/organisations/hm-revenue-customs), the [European Commission (EU)](https://taxation-customs.ec.europa.eu), the [FBR (Pakistan)](https://www.fbr.gov.pk), the [NBR (Bangladesh)](https://nbr.gov.bd), and the [GIB (Turkey)](https://www.gib.gov.tr).',
  formula: `The mathematical comparison applies specific compounding and tax rules to both options:

1. **Fixed Deposit (FD)**:
   - FDs compound quarterly:
     $$\\text{Pre-Tax FD Value} = P \\times \\left(1 + \\frac{R_{\\text{FD}}}{400}\\right)^{4t}$$
   - FD interest is taxed annually at your marginal tax slab rate:
     $$R_{\\text{FD, post}} = R_{\\text{FD}} \\times \\left(1 - \\frac{\\text{Tax Slab}}{100}\\right)$$
     $$\\text{Post-Tax FD Value} = P \\times \\left(1 + \\frac{R_{\\text{FD, post}}}{400}\\right)^{4t}$$

2. **Mutual Funds (MF)**:
   - Mutual Funds compound annually:
     $$\\text{Pre-Tax MF Value} = P \\times \\left(1 + \\frac{R_{\\text{MF}}}{100}\\right)^t$$
   - Capital gains tax (LTCG) is applied at redemption:
     $$\\text{MF Pre-Tax Gain} = \\text{Pre-Tax MF Value} - P$$
     - If currency is INR (₹), a statutory exemption of ₹1,25,000 is subtracted from gains before applying tax.
     $$\\text{Taxable Gain} = \\max(0, \\text{MF Pre-Tax Gain} - \\text{Exemption})$$
     $$\\text{MF Tax} = \\text{Taxable Gain} \\times \\frac{\\text{LTCG Tax Rate}}{100}$$
     $$\\text{Post-Tax MF Value} = \\text{Pre-Tax MF Value} - \\text{MF Tax}$$`,
  example: `Let's analyze a comparative example. Suppose you invest ₹10,00,000 (10 Lakhs) for 5 years. You get a 7% interest rate on the Fixed Deposit (FD) and expect a 12% return on the Mutual Fund (MF). You are in the 30% income tax slab, and the Mutual Fund LTCG tax rate is 12.5%.

1. **Fixed Deposit (FD)**:
   - Pre-Tax Maturity = ₹14,14,778.
   - Post-Tax Interest Rate = 7% × (1 - 0.30) = 4.9%.
   - Post-Tax Maturity = ₹12,75,424.
   - Total Tax Paid = ₹1,39,354.

2. **Mutual Fund (MF)**:
   - Pre-Tax Maturity = ₹10,00,000 × (1.12)^5 = ₹17,62,342.
   - Pre-Tax Gain = ₹7,62,342.
   - Taxable Gain (exemption deducted) = ₹7,62,342 - ₹1,25,000 = ₹6,37,342.
   - LTCG Tax (12.5%) = ₹6,37,342 × 12.5% = ₹79,668.
   - Post-Tax Maturity = ₹17,62,342 - ₹79,668 = ₹16,82,674.

The mutual fund yields a post-tax maturity value of ₹16,82,674, outperforming the Fixed Deposit's ₹12,75,424 by over ₹4,00,000.`,
  faqs: [
    {
      q: 'Why are Fixed Deposits considered safer than Mutual Funds?',
      a: 'Fixed Deposits are backed by banking regulations and offer guaranteed returns unaffected by market fluctuations. In contrast, Mutual Funds invest in equity or debt securities, and their returns are subject to market volatility and are not guaranteed.',
    },
    {
      q: 'How is FD interest taxed compared to Mutual Funds?',
      a: 'FD interest is taxed annually at your regular slab rate (up to 30% or more), regardless of whether you withdraw it. Mutual funds are only taxed when you sell or redeem your units, and equity gains held over 1 year are taxed at a lower Long-Term Capital Gains (LTCG) rate of 12.5%.',
    },
    {
      q: 'What is the LTCG tax exemption on equity mutual funds in India?',
      a: 'Under current rules, long-term capital gains (LTCG) on equity mutual fund investments held for more than 12 months are tax-exempt up to ₹1,25,000 per financial year. Any gains exceeding this threshold are taxed at 12.5%.',
    },
    {
      q: 'Does this calculator compound FD returns quarterly?',
      a: 'Yes. Most commercial banks compound Fixed Deposit interest quarterly, which is the standard model implemented in this returns estimator.',
    },
    {
      q: 'Can I compare debt mutual funds with FDs?',
      a: 'Yes. Debt mutual funds generally earn a return rate closer to FDs (e.g., 6% to 8%). Note that under recent tax rules in India, debt mutual fund gains are taxed at your income slab rate, similar to FDs.',
    },
  ],
};

export default function FdVsMfCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('INR');
  const [principal, setPrincipal] = useState<number>(100000);
  const [timePeriod, setTimePeriod] = useState<number>(5);
  const [fdRate, setFdRate] = useState<number>(7);
  const [mfRate, setMfRate] = useState<number>(12);
  const [taxSlab, setTaxSlab] = useState<number>(30);
  const [mfTaxRate, setMfTaxRate] = useState<number>(12.5);

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

  const isValid = principal > 0 && timePeriod > 0 && timePeriod <= 40 && fdRate > 0 && mfRate > 0 && taxSlab >= 0 && taxSlab <= 100 && mfTaxRate >= 0 && mfTaxRate <= 100;

  let results = null;
  if (isValid) {
    const P = principal;
    const t = timePeriod;

    // FD Calculations (Quarterly compounding)
    const fdPreTax = P * Math.pow(1 + (fdRate / 400), 4 * t);
    const fdPostRate = fdRate * (1 - (taxSlab / 100));
    const fdPostTax = P * Math.pow(1 + (fdPostRate / 400), 4 * t);
    const fdTaxPaid = Math.max(0, fdPreTax - fdPostTax);

    // MF Calculations (Annual compounding)
    const mfPreTax = P * Math.pow(1 + (mfRate / 100), t);
    const mfPreTaxGain = Math.max(0, mfPreTax - P);

    // Exemption rules for LTCG (Only apply ₹1,25,000 exemption if currency is INR)
    const exemption = currency === 'INR' ? 125000 : 0;
    const mfTaxableGain = Math.max(0, mfPreTaxGain - exemption);
    const mfTaxPaid = mfTaxableGain * (mfTaxRate / 100);
    const mfPostTax = mfPreTax - mfTaxPaid;

    results = {
      fdPreTax,
      fdPostTax,
      fdTaxPaid,
      mfPreTax,
      mfPostTax,
      mfTaxPaid,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (principal <= 0) newErrors.principal = 'Investment principal must be greater than zero';
    if (timePeriod <= 0 || timePeriod > 40) newErrors.timePeriod = 'Tenure must be between 1 and 40 years';
    if (fdRate <= 0) newErrors.fdRate = 'FD interest rate must be greater than zero';
    if (mfRate <= 0) newErrors.mfRate = 'MF expected rate must be greater than zero';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setPrincipal(100000);
    setTimePeriod(5);
    setFdRate(7);
    setMfRate(12);
    setTaxSlab(30);
    setMfTaxRate(12.5);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Comparison Settings</h2>
            
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
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="principal-amount" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Investment Principal
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    {currencySymbols[currency]}
                  </div>
                  <input
                    id="principal-amount"
                    type="number"
                    value={principal || ''}
                    onChange={(e) => setPrincipal(Number(e.target.value))}
                    className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.principal && <p className="text-xs text-red-500 mt-1 font-medium">{errors.principal}</p>}
              </div>

              <div>
                <label htmlFor="time-period" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Tenure (Years)
                </label>
                <input
                  id="time-period"
                  type="number"
                  value={timePeriod || ''}
                  onChange={(e) => setTimePeriod(Number(e.target.value))}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.timePeriod && <p className="text-xs text-red-500 mt-1 font-medium">{errors.timePeriod}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-4">
              <div>
                <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">Fixed Deposit (FD)</h4>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="fd-rate" className="block text-xs font-semibold text-foreground/75 mb-1">Interest Rate (%)</label>
                    <input
                      id="fd-rate"
                      type="number"
                      value={fdRate || ''}
                      onChange={(e) => setFdRate(Number(e.target.value))}
                      className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="tax-slab" className="block text-xs font-semibold text-foreground/75 mb-1">Tax Slab Rate (%)</label>
                    <input
                      id="tax-slab"
                      type="number"
                      value={taxSlab || ''}
                      onChange={(e) => setTaxSlab(Number(e.target.value))}
                      className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">Mutual Fund (MF)</h4>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="mf-rate" className="block text-xs font-semibold text-foreground/75 mb-1">Expected Return (%)</label>
                    <input
                      id="mf-rate"
                      type="number"
                      value={mfRate || ''}
                      onChange={(e) => setMfRate(Number(e.target.value))}
                      className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none"
                    />
                  </div>
                  <div>
                    <label htmlFor="mf-tax" className="block text-xs font-semibold text-foreground/75 mb-1">LTCG Tax Rate (%)</label>
                    <input
                      id="mf-tax"
                      type="number"
                      value={mfTaxRate || ''}
                      onChange={(e) => setMfTaxRate(Number(e.target.value))}
                      className="block w-full py-2.5 px-3 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Compare Payouts
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
            <h2 className="text-xl font-bold text-foreground mb-6">Maturity Comparisons</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Comparative cards */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Fixed Deposit</span>
                    <span className="block text-xs font-semibold text-foreground/40">Pre-Tax:</span>
                    <span className="block text-sm font-bold text-foreground/70">
                      {currencySymbols[currency]}{results.fdPreTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="block text-xs font-semibold text-foreground/40 mt-1.5">Post-Tax:</span>
                    <span className="block text-lg font-black text-primary">
                      {currencySymbols[currency]}{results.fdPostTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2">Mutual Fund</span>
                    <span className="block text-xs font-semibold text-foreground/40">Pre-Tax:</span>
                    <span className="block text-sm font-bold text-foreground/70">
                      {currencySymbols[currency]}{results.mfPreTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                    <span className="block text-xs font-semibold text-foreground/40 mt-1.5">Post-Tax:</span>
                    <span className="block text-lg font-black text-emerald-500">
                      {currencySymbols[currency]}{results.mfPostTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>
                </div>

                {/* Sub details */}
                <div className="space-y-3.5">
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50">FD Interest Tax Deducted:</span>
                    <span className="font-bold text-red-500">-{currencySymbols[currency]}{results.fdTaxPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 flex justify-between text-xs border border-border">
                    <span className="font-semibold text-foreground/50">MF Capital Gains Tax Paid:</span>
                    <span className="font-bold text-red-500">-{currencySymbols[currency]}{results.mfTaxPaid.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                </div>

                {/* Graphical bar chart */}
                <div className="pt-2">
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider mb-2.5">Yield Projections (Post-Tax)</h4>
                  <div className="space-y-3">
                    {/* FD bar */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-foreground/60 mb-1">
                        <span>Fixed Deposit Maturity</span>
                        <span>{currencySymbols[currency]}{results.fdPostTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div 
                          className="h-full bg-primary rounded-full transition-all duration-500" 
                          style={{ width: `${(results.fdPostTax / Math.max(results.fdPostTax, results.mfPostTax)) * 100}%` }} 
                        />
                      </div>
                    </div>

                    {/* MF bar */}
                    <div>
                      <div className="flex justify-between text-xs font-bold text-foreground/60 mb-1">
                        <span>Mutual Fund Maturity</span>
                        <span>{currencySymbols[currency]}{results.mfPostTax.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div 
                          className="h-full bg-emerald-500 rounded-full transition-all duration-500" 
                          style={{ width: `${(results.mfPostTax / Math.max(results.fdPostTax, results.mfPostTax)) * 100}%` }} 
                        />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter details to view comparisons.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
