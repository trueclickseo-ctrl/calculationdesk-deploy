'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Crypto Tax Calculator is a dedicated tool built to estimate tax liabilities on cryptocurrency transactions across global tax jurisdictions. It supports United States IRS capital gains rules (short-term and long-term rates), Indian Virtual Digital Assets (VDA) flat 30% tax rules, European Union capital gains guidelines, United Kingdom HMRC capital gains rules, and tax frameworks for Pakistan, Bangladesh, and Turkey. Investors and traders use this calculator to estimate progressive tax gains, assess transaction fees, and project net take-home profits. You can verify details on official revenue websites: the [IRS (US)](https://www.irs.gov), the [Income Tax Department (India)](https://incometaxindia.gov.in), [HMRC (UK)](https://www.gov.uk/government/organisations/hm-revenue-customs), the [European Commission (EU)](https://taxation-customs.ec.europa.eu), the [FBR (Pakistan)](https://www.fbr.gov.pk), the [NBR (Bangladesh)](https://nbr.gov.bd), and the [GIB (Turkey)](https://www.gib.gov.tr).',
  formula: `Crypto taxes are computed depending on the selected tax jurisdiction:

1. **United States (IRS Rules)**:
   - Capital gains are calculated as:
     $$\\text{Capital Gain} = \\text{Net Sale Proceeds} - \\text{Total Cost Basis}$$
   - Short-term gains are taxed at ordinary income rates (10% to 37%); long-term gains are taxed at preferential rates (0% to 20%).

2. **India (Section 115BBH)**:
   - Flat 30% tax rate on net gains, plus 1% TDS on sales. No loss offsets are allowed.

3. **European Union (e.g. Germany)**:
   - Short-term gains are taxed at progressive income rates; long-term gains (held > 1 year) are tax-free under select exemptions.

4. **United Kingdom (HMRC)**:
   - Capital gains above the annual tax-free allowance are taxed at 10% or 20%.

5. **Pakistan, Bangladesh & Turkey**:
   - Gains are generally treated under capital gains tax frameworks (defaulting to 15%).`,
  example: `Let's look at how the calculation differs across regions for a trade of 1 BTC bought for 30,000 and sold for 35,000 (net gain of 5,000, ignoring fees):

1. **US Filer (Short-Term, 22% rate)**:
   - Tax Due = 5,000 × 22% = 1,100.
   - Net Profit = 3,900.

2. **Indian Filer (Flat 30% rate)**:
   - Tax Due = 5,000 × 30% = 1,500.
   - TDS (1% on 35,000 sale) = 350.
   - Net Profit = 3,500.

3. **European Union Filer (Held > 1 Year, 0% rate)**:
   - Tax Due = 5,000 × 0% = 0.
   - Net Profit = 5,000.

4. **UK Filer (20% Capital Gains rate)**:
   - Tax Due = 5,000 × 20% = 1,000 (before applying the annual exempt allowance).
   - Net Profit = 4,000.`,
  faqs: [
    {
      q: 'Can I offset crypto losses against crypto gains?',
      a: 'It depends on your jurisdiction. In the United States and the United Kingdom, crypto losses can be offset against gains and even ordinary income (up to $3,000/year in the US). However, under Section 115BBH of the Indian Income Tax Act, losses from one crypto token cannot be set off against gains from another token.',
    },
    {
      q: 'What is the 1% TDS on crypto transactions?',
      a: 'A 1% Tax Deducted at Source (TDS) is unique to India and is levied on the transfer of virtual digital assets (VDAs) when the transaction exceeds specified annual limits. This does not apply to US, EU, or UK tax jurisdictions.',
    },
    {
      q: 'Is GST/VAT applicable to cryptocurrency trading?',
      a: 'Yes, standard Goods and Services Tax (GST) or Value Added Tax (VAT) applies to the trading fees (brokerage) charged by exchanges, not on the actual token transaction volume itself.',
    },
    {
      q: 'How are long-term crypto holdings taxed?',
      a: 'In the US, holdings over 1 year enjoy lower tax rates (0%, 15%, or 20%). In Germany (EU), holdings over 1 year are completely tax-free under select exemptions. In India, no distinction is made between short-term and long-term, and all VDA gains are taxed at a flat 30%.',
    },
    {
      q: 'How do I report crypto on my tax return?',
      a: 'You must report all transactions using your country\'s official tax schedule (e.g., Form 8949 and Schedule D in the US, Capital Gains Summary in the UK, or Schedule VDA in India).',
    },
  ],
};

export default function CryptoTaxCalculator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [region, setRegion] = useState<'US' | 'IN' | 'EU' | 'GB' | 'PK' | 'BD' | 'TR'>('US');
  const [holdingPeriod, setHoldingPeriod] = useState<'short' | 'long'>('short');
  const [usTaxRate, setUsTaxRate] = useState<number>(22);
  const [buyPrice, setBuyPrice] = useState<number>(30000);
  const [sellPrice, setSellPrice] = useState<number>(35000);
  const [quantity, setQuantity] = useState<number>(1);
  const [feeRate, setFeeRate] = useState<number>(0.2); // percentage
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

  const isValid = buyPrice > 0 && sellPrice > 0 && quantity > 0 && feeRate >= 0 && feeRate <= 5;

  let results = null;
  if (isValid) {
    const rawBuy = buyPrice * quantity;
    const rawSell = sellPrice * quantity;

    const buyFee = rawBuy * (feeRate / 100);
    const buyGST = region === 'IN' ? buyFee * 0.18 : 0;
    const totalBuy = rawBuy + buyFee + buyGST;

    const sellFee = rawSell * (feeRate / 100);
    const sellGST = region === 'IN' ? sellFee * 0.18 : 0;
    const totalSell = rawSell - sellFee - sellGST;

    const netGain = Math.max(0, totalSell - totalBuy);
    
    let taxDue = 0;
    let tds = 0;
    if (region === 'IN') {
      taxDue = netGain * 0.30;
      tds = rawSell * 0.01;
    } else {
      taxDue = netGain * (usTaxRate / 100);
      tds = 0;
    }
    
    const netProfit = Math.max(0, netGain - taxDue);
    const totalFees = buyFee + buyGST + sellFee + sellGST;

    // SVG Pie Chart calculations
    // Categories: 1. Total Buy Cost, 2. Tax, 3. Trading Fees & GST, 4. Net Profit
    const totalRepresented = totalBuy + taxDue + totalFees + netProfit;
    const buyPct = (totalBuy / totalRepresented) * 100;
    const taxPct = (taxDue / totalRepresented) * 100;
    const feePct = (totalFees / totalRepresented) * 100;
    const profitPct = (netProfit / totalRepresented) * 100;

    results = {
      rawBuy,
      rawSell,
      totalBuy,
      totalSell,
      netGain,
      taxDue,
      tds,
      netProfit,
      totalFees,
      buyPct,
      taxPct,
      feePct,
      profitPct,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (buyPrice <= 0) newErrors.buyPrice = 'Buy price must be greater than zero';
    if (sellPrice <= 0) newErrors.sellPrice = 'Sell price must be greater than zero';
    if (quantity <= 0) newErrors.quantity = 'Quantity must be greater than zero';
    if (feeRate < 0 || feeRate > 5) newErrors.feeRate = 'Trading fee must be between 0% and 5%';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setBuyPrice(300000);
    setSellPrice(350000);
    setQuantity(1);
    setFeeRate(0.2);
    setErrors({});
  };

  const radius = 45;
  const circ = 2 * Math.PI * radius; // ~282.74

  // Accumulate stroke dashes for the donut chart
  let currentOffset = 0;
  const getStrokeDash = (pct: number) => {
    const strokeLength = (pct / 100) * circ;
    const dashArray = `${strokeLength} ${circ - strokeLength}`;
    const dashOffset = currentOffset;
    currentOffset -= strokeLength;
    return { dashArray, dashOffset };
  };

  const buyDash = results ? getStrokeDash(results.buyPct) : null;
  const taxDash = results ? getStrokeDash(results.taxPct) : null;
  const feeDash = results ? getStrokeDash(results.feePct) : null;
  const profitDash = results ? getStrokeDash(results.profitPct) : null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Cryptocurrency Details</h2>
          
          <div className="space-y-5">
            <div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="currency-select" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Currency
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                  <select
                    id="currency-select"
                    value={currency}
                    onChange={(e) => {
                      const cur = e.target.value as any;
                      setCurrency(cur);
                      const mapping: Record<string, string> = {
                        USD: 'US',
                        INR: 'IN',
                        EUR: 'EU',
                        GBP: 'GB',
                        PKR: 'PK',
                        BDT: 'BD',
                        TRY: 'TR',
                      };
                      const nextRegion = mapping[cur] || 'US';
                      setRegion(nextRegion as any);
                      if (nextRegion === 'IN') {
                        setUsTaxRate(30);
                      } else if (nextRegion === 'EU') {
                        setUsTaxRate(25);
                      } else if (nextRegion === 'GB') {
                        setUsTaxRate(20);
                      } else if (nextRegion === 'US') {
                        setUsTaxRate(22);
                      } else {
                        setUsTaxRate(15);
                      }
                    }}
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
                <label htmlFor="region-select" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Tax Jurisdiction
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                  <select
                    id="region-select"
                    value={region}
                    onChange={(e) => {
                      const selectedRegion = e.target.value as any;
                      setRegion(selectedRegion);
                      const mapping: Record<string, string> = {
                        US: 'USD',
                        IN: 'INR',
                        EU: 'EUR',
                        GB: 'GBP',
                        PK: 'PKR',
                        BD: 'BDT',
                        TR: 'TRY',
                      };
                      setCurrency(mapping[selectedRegion] as any);
                      if (selectedRegion === 'IN') {
                        setUsTaxRate(30);
                        setBuyPrice(300000);
                        setSellPrice(350000);
                      } else if (selectedRegion === 'EU') {
                        setUsTaxRate(25);
                        setBuyPrice(28000);
                        setSellPrice(32000);
                      } else if (selectedRegion === 'GB') {
                        setUsTaxRate(20);
                        setBuyPrice(24000);
                        setSellPrice(28000);
                      } else if (selectedRegion === 'US') {
                        setUsTaxRate(22);
                        setBuyPrice(30000);
                        setSellPrice(35000);
                      } else if (selectedRegion === 'PK') {
                        setUsTaxRate(15);
                        setBuyPrice(8000000);
                        setSellPrice(9500000);
                      } else if (selectedRegion === 'BD') {
                        setUsTaxRate(15);
                        setBuyPrice(3500000);
                        setSellPrice(4000000);
                      } else if (selectedRegion === 'TR') {
                        setUsTaxRate(15);
                        setBuyPrice(1000000);
                        setSellPrice(1200000);
                      }
                    }}
                    className="block w-full py-3 px-3 text-sm font-semibold rounded-xl bg-transparent text-foreground/80 outline-none cursor-pointer"
                  >
                    <option value="US">United States (IRS)</option>
                    <option value="IN">India (Section 115BBH)</option>
                    <option value="EU">European Union (Capital Gains)</option>
                    <option value="GB">United Kingdom (HMRC)</option>
                    <option value="PK">Pakistan (FBR Tax Guidelines)</option>
                    <option value="BD">Bangladesh (NBR Tax Guidelines)</option>
                    <option value="TR">Turkey (GIB Tax Guidelines)</option>
                  </select>
                </div>
              </div>
            </div>

            {region !== 'IN' && (
              <div className="grid grid-cols-2 gap-4 border-t border-border/60 pt-4">
                <div>
                  <label htmlFor="holding-period" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                    Holding Period
                  </label>
                  <select
                    id="holding-period"
                    value={holdingPeriod}
                    onChange={(e) => {
                      const period = e.target.value as 'short' | 'long';
                      setHoldingPeriod(period);
                      if (region === 'US') setUsTaxRate(period === 'short' ? 22 : 15);
                      if (region === 'GB') setUsTaxRate(period === 'short' ? 20 : 10);
                      if (region === 'EU') setUsTaxRate(period === 'short' ? 25 : 0);
                    }}
                    className="block w-full py-2.5 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 outline-none"
                  >
                    <option value="short">Short-Term (≤ 1 Year)</option>
                    <option value="long">Long-Term (&gt; 1 Year)</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="us-tax-rate" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                    Tax Rate (%)
                  </label>
                  <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                    <input
                      id="us-tax-rate"
                      type="number"
                      value={usTaxRate}
                      onChange={(e) => setUsTaxRate(Number(e.target.value))}
                      className="block w-full py-2.5 px-2 text-xs font-semibold rounded-xl bg-transparent text-foreground/80 outline-none"
                    />
                  </div>
                </div>
              </div>
            )}
            </div>

            <div>
              <label htmlFor="buy-price" className="block text-sm font-semibold text-foreground/80 mb-2">
                Purchase Price per Token ({currency})
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="buy-price"
                  type="number"
                  value={buyPrice || ''}
                  onChange={(e) => setBuyPrice(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.buyPrice && <p className="text-xs text-red-500 mt-1 font-medium">{errors.buyPrice}</p>}
            </div>

            <div>
              <label htmlFor="sell-price" className="block text-sm font-semibold text-foreground/80 mb-2">
                Sale Price per Token ({currency})
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="sell-price"
                  type="number"
                  value={sellPrice || ''}
                  onChange={(e) => setSellPrice(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.sellPrice && <p className="text-xs text-red-500 mt-1 font-medium">{errors.sellPrice}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="quantity" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Quantity
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="quantity"
                    type="number"
                    step="0.0001"
                    value={quantity || ''}
                    onChange={(e) => setQuantity(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.quantity && <p className="text-xs text-red-500 mt-1 font-medium">{errors.quantity}</p>}
              </div>

              <div>
                <label htmlFor="fee-rate" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Trading Fee Rate
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                    %
                  </div>
                  <input
                    id="fee-rate"
                    type="number"
                    step="0.01"
                    value={feeRate || ''}
                    onChange={(e) => setFeeRate(Number(e.target.value))}
                    className="block w-full py-3 pl-4 pr-8 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.feeRate && <p className="text-xs text-red-500 mt-1 font-medium">{errors.feeRate}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Calculate Tax
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
            <h2 className="text-xl font-bold text-foreground mb-6">Tax Breakdown & Projections</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-3.5">
                  <div className="rounded-xl bg-red-500/5 p-4 border border-red-500/10">
                    <span className="block text-xs font-bold text-red-500/80 uppercase tracking-wider">
                      Tax Liability ({region === 'IN' ? '30% Flat' : `${usTaxRate}% Rate`})
                    </span>
                    <span className="block text-2xl font-extrabold text-red-500 mt-1">
                      {currencySymbols[currency]}{results.taxDue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-semibold text-primary/80 uppercase tracking-wider">
                      Net Gain (Capital Gain)
                    </span>
                    <span className="block text-lg font-bold text-primary mt-1">
                      {currencySymbols[currency]}{results.netGain.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  {region === 'IN' && (
                    <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                      <span className="font-semibold text-foreground/50">TDS (1% Deducted):</span>
                      <span className="font-bold text-foreground">{currencySymbols[currency]}{results.tds.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">
                      {region === 'IN' ? 'Trading Fees + GST:' : 'Trading Fees:'}
                    </span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.totalFees.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center justify-center p-4">
                  <div className="relative h-40 w-40">
                    <svg className="h-full w-full" viewBox="0 0 110 110">
                      {/* Buy Cost */}
                      <circle
                        cx="55"
                        cy="55"
                        r={radius}
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      {buyDash && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="var(--accent)"
                          strokeWidth="8"
                          strokeDasharray={buyDash.dashArray}
                          strokeDashoffset={buyDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {/* Tax Due */}
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
                      {/* Fees */}
                      {feeDash && results.feePct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#f59e0b"
                          strokeWidth="8"
                          strokeDasharray={feeDash.dashArray}
                          strokeDashoffset={feeDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {/* Profit */}
                      {profitDash && results.profitPct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="var(--primary)"
                          strokeWidth="8"
                          strokeDasharray={profitDash.dashArray}
                          strokeDashoffset={profitDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/40">
                        Net Profit Margin
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {results.profitPct.toFixed(1)}%
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 mt-5 text-[10px] font-semibold w-full">
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-accent" />
                      <span className="text-foreground/70 truncate">Acquisition ({results.buyPct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-red-500" />
                      <span className="text-foreground/70 truncate">Tax ({results.taxPct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-amber-500" />
                      <span className="text-foreground/70 truncate">Fees ({results.feePct.toFixed(0)}%)</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-2 w-2 rounded-full bg-primary" />
                      <span className="text-foreground/70 truncate">Net Profit ({results.profitPct.toFixed(0)}%)</span>
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
