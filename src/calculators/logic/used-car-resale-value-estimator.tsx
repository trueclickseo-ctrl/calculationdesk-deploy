'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Used Car Resale Value Estimator is a mathematical valuation tool designed to calculate the current market value of a second-hand passenger vehicle. By analyzing original list price, age, total mileage, vehicle condition, and manufacturer reliability, this calculator evaluates the rate of asset depreciation. Buyers, sellers, and insurance agents use this estimator to establish fair transaction benchmarks and negotiate car deals. You can compare relative market valuation indices on the [Kelley Blue Book website](https://www.kbb.com).',
  formula: `The valuation model combines time depreciation and situational adjustments:

1. **Base Time Depreciation**:
   $$V_{\\text{base}} = V_{\\text{original}} \\times (1 - r)^{\\text{Age}}$$
   Where $r$ is the annual depreciation rate depending on manufacturer brand class (High Reliability: 10%, Medium: 13%, Low/Luxury: 17%).

2. **Mileage Penalty / Bonus**:
   $$\\text{Adj}_{\\text{mile}} = (\\text{Expected Mileage} - \\text{Actual Mileage}) \\times 0.00005 \\times V_{\\text{original}}$$
   (Expected mileage is set at 12,000 miles/year; adjustments are capped between -20% and +5% of original price).

3. **Condition & Owner Adjustment**:
   $$V_{\\text{final}} = (V_{\\text{base}} + \\text{Adj}_{\\text{mile}}) \\times C_{\\text{cond}} \\times C_{\\text{owners}}$$
   Where $C_{\\text{cond}}$ represents the condition factor (Excellent: 1.05, Good: 1.00, Fair: 0.85, Poor: 0.60) and $C_{\\text{owners}}$ represents the ownership count factor (1 owner: 1.00, 2 owners: 0.95, 3+ owners: 0.88). Knowing the used car resale value estimator formulas is very useful before trade-in negotiation.`,
  example: `Let's analyze a used car resale calculation example. Suppose you bought a mid-tier sedan for $30,000 brand new. You are selling it after 5 years with 50,000 miles on the odometer. The vehicle is in Good condition, has high brand reliability, and had only 1 previous owner.

1. **Base Depreciation**:
   - High reliability depreciation rate ($r$) = 10%.
   - Base value after 5 years:
     $$V_{\\text{base}} = 30,000 \\times (1 - 0.10)^5 = 30,000 \\times 0.59049 = \\$17,714.70$$

2. **Mileage Adjustment**:
   - Expected mileage = 5 years × 12,000 miles/year = 60,000 miles.
   - Odometer reading = 50,000 miles (10,000 miles under expectation).
   - Mileage Bonus:
     $$\\text{Bonus} = 10,000 \\times 0.00005 \\times 30,000 = \\$150.00$$
   - Adjusted Value = $17,714.70 + $150.00 = $17,864.70.

3. **Condition & Owners Factors**:
   - Good condition multiplier ($C_{\\text{cond}}$) = 1.00.
   - 1 owner multiplier ($C_{\\text{owners}}$) = 1.00.
   - Final Resale Value = $17,864.70.

Thus, the estimated resale value of the vehicle after 5 years is $17,865, representing a total depreciation of $12,135 (40.4% loss).`,
  faqs: [
    {
      q: 'What brand factors cause some cars to depreciate faster than others?',
      a: 'Luxury vehicles, high-end electric cars, and niche brands typically depreciate much faster (up to 60% in the first three years) due to high initial pricing, expensive maintenance costs, and rapid technological obsolescence compared to mass-market brands.',
    },
    {
      q: 'How does a vehicle history report impact resale value?',
      a: 'An accident history, salvage title, structural frame damage, or unresolved odometer discrepancies will drastically reduce resale value by 20% to 50%, moving the vehicle condition to "Poor" or "Fair" instantly.',
    },
    {
      q: 'Does modifying a car increase its resale value?',
      a: 'Rarely. Aftermarket modifications like custom spoilers, exhaust systems, or paint jobs often reduce the buyer pool and can decrease the vehicle value. Original factory parts and clean maintenance logs increase resale prices.',
    },
    {
      q: 'What is the salvage value of a car?',
      a: 'Salvage or scrap value is the residual value of the car\'s raw materials (metals, reusable spare parts) when it is no longer roadworthy. Typically, this is estimated at 5% to 10% of the vehicle\'s original purchase price.',
    },
    {
      q: 'Why do cars lose 20% of their value in the first year?',
      a: 'As soon as a brand new car is driven off the dealership lot, it transitionally changes status from "new" to "used" in the wholesale market, losing its retail premium instantly due to transaction friction and immediate vehicle registration records.',
    },
  ],
};

export default function UsedCarValuator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [mileageUnit, setMileageUnit] = useState<'miles' | 'km'>('miles');
  
  const [originalPrice, setOriginalPrice] = useState<number>(30000);
  const [carAge, setCarAge] = useState<number>(5);
  const [mileage, setMileage] = useState<number>(50000);
  
  const [condition, setCondition] = useState<'excellent' | 'good' | 'fair' | 'poor'>('good');
  const [reliability, setReliability] = useState<'high' | 'medium' | 'low'>('high');
  const [previousOwners, setPreviousOwners] = useState<number>(1);

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

  const isValid = originalPrice > 0 && carAge >= 0 && carAge <= 30 && mileage >= 0 && previousOwners >= 1;

  let results = null;
  if (isValid) {
    // 1. Base depreciation rate
    let depRate = 0.13; // medium default
    if (reliability === 'high') depRate = 0.10;
    if (reliability === 'low') depRate = 0.17;

    const baseValue = originalPrice * Math.pow(1 - depRate, carAge);

    // 2. Mileage adjustment
    // Expected mileage is 12,000 miles (20,000 km) per year
    const annualExpected = mileageUnit === 'miles' ? 12000 : 20000;
    const expectedMileage = annualExpected * carAge;
    const diffMileage = expectedMileage - mileage; // positive is under expected mileage
    
    // 1,000 miles difference yields 0.05% of original price as adjustment
    const step = mileageUnit === 'miles' ? 1000 : 1600;
    let mileageAdjustment = (diffMileage / step) * 0.0005 * originalPrice;
    
    // Cap mileage adjustment between -20% and +5% of original price
    mileageAdjustment = Math.max(-0.20 * originalPrice, Math.min(0.05 * originalPrice, mileageAdjustment));

    // 3. Condition multiplier
    let conditionMult = 1.0;
    if (condition === 'excellent') conditionMult = 1.05;
    if (condition === 'fair') conditionMult = 0.85;
    if (condition === 'poor') conditionMult = 0.60;

    // 4. Ownership penalty
    let ownerMult = 1.0;
    if (previousOwners === 2) ownerMult = 0.95;
    if (previousOwners >= 3) ownerMult = 0.88;

    // Final Calculation
    let estimatedValue = (baseValue + mileageAdjustment) * conditionMult * ownerMult;
    
    // Capped by Salvage Value (8% of original price)
    const salvageValue = originalPrice * 0.08;
    estimatedValue = Math.max(salvageValue, estimatedValue);

    const totalDepreciation = originalPrice - estimatedValue;
    const remainingPct = (estimatedValue / originalPrice) * 100;
    const depreciatedPct = (totalDepreciation / originalPrice) * 100;

    results = {
      baseValue,
      mileageAdjustment,
      estimatedValue,
      totalDepreciation,
      remainingPct,
      depreciatedPct,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (originalPrice <= 0) newErrors.originalPrice = 'Purchase price must be greater than zero';
    if (carAge < 0 || carAge > 30) newErrors.carAge = 'Age must be between 0 and 30 years';
    if (mileage < 0) newErrors.mileage = 'Odometer reading cannot be negative';
    if (previousOwners < 1) newErrors.previousOwners = 'Previous owners must be at least 1';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setOriginalPrice(30000);
    setCarAge(5);
    setMileage(50000);
    setCondition('good');
    setReliability('high');
    setPreviousOwners(1);
    setErrors({});
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Car Specifications</h2>
            
            {/* Currency select */}
            <div className="w-24">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value as any)}
                className="block w-full py-1.5 px-2 text-xs font-semibold rounded-lg border border-border bg-background text-foreground/80 outline-none cursor-pointer"
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

          <div className="space-y-5">
            {/* Units Toggle */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  if (mileageUnit === 'km') {
                    setMileageUnit('miles');
                    setMileage(Math.round(mileage * 0.621371));
                  }
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${mileageUnit === 'miles' ? 'bg-primary text-white border-primary' : 'bg-transparent text-foreground/60 border-border hover:bg-border/40'}`}
              >
                Imperial (Miles)
              </button>
              <button
                type="button"
                onClick={() => {
                  if (mileageUnit === 'miles') {
                    setMileageUnit('km');
                    setMileage(Math.round(mileage * 1.609344));
                  }
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${mileageUnit === 'km' ? 'bg-primary text-white border-primary' : 'bg-transparent text-foreground/60 border-border hover:bg-border/40'}`}
              >
                Metric (Km)
              </button>
            </div>

            <div>
              <label htmlFor="original-price" className="block text-sm font-semibold text-foreground/80 mb-2">
                Original Purchase Price
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-foreground/40 font-semibold">
                  {currencySymbols[currency]}
                </div>
                <input
                  id="original-price"
                  type="number"
                  value={originalPrice || ''}
                  onChange={(e) => setOriginalPrice(Number(e.target.value))}
                  className="block w-full py-3 pl-8 pr-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.originalPrice && <p className="text-xs text-red-500 mt-1 font-medium">{errors.originalPrice}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="car-age" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Car Age (years)
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="car-age"
                    type="number"
                    value={carAge || 0}
                    onChange={(e) => setCarAge(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.carAge && <p className="text-xs text-red-500 mt-1 font-medium">{errors.carAge}</p>}
              </div>

              <div>
                <label htmlFor="mileage" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Mileage ({mileageUnit})
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="mileage"
                    type="number"
                    value={mileage || 0}
                    onChange={(e) => setMileage(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.mileage && <p className="text-xs text-red-500 mt-1 font-medium">{errors.mileage}</p>}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="condition" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Condition
                </label>
                <select
                  id="condition"
                  value={condition}
                  onChange={(e) => setCondition(e.target.value as any)}
                  className="block w-full py-2.5 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 outline-none"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                  <option value="poor">Poor</option>
                </select>
              </div>

              <div>
                <label htmlFor="reliability" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Brand Type
                </label>
                <select
                  id="reliability"
                  value={reliability}
                  onChange={(e) => setReliability(e.target.value as any)}
                  className="block w-full py-2.5 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 outline-none"
                >
                  <option value="high">High Reliability</option>
                  <option value="medium">Standard / Mid</option>
                  <option value="low">Luxury / Niche</option>
                </select>
              </div>

              <div>
                <label htmlFor="owners" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Owners
                </label>
                <input
                  id="owners"
                  type="number"
                  min="1"
                  value={previousOwners || 1}
                  onChange={(e) => setPreviousOwners(Number(e.target.value))}
                  className="block w-full py-2 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 outline-none"
                />
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Value
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
            <h2 className="text-xl font-bold text-foreground mb-6">Valuation Summary</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Final Estimated Resale Value */}
                <div className="rounded-xl bg-primary/5 p-5 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                    Estimated Current Market Value
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1.5">
                    {currencySymbols[currency]}{results.estimatedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Total Depreciation Loss
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1 text-red-500">
                      -{currencySymbols[currency]}{results.totalDepreciation.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-4 border border-border text-center">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                      Remaining Value (%)
                    </span>
                    <span className="block text-lg font-bold text-foreground mt-1 text-green-600">
                      {results.remainingPct.toFixed(1)}%
                    </span>
                  </div>
                </div>

                {/* Additional adjustment results */}
                <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                  <span className="font-semibold text-foreground/50">Mileage Adjustment:</span>
                  <span className={`font-bold ${results.mileageAdjustment >= 0 ? 'text-green-600' : 'text-red-500'}`}>
                    {results.mileageAdjustment >= 0 ? '+' : ''}{currencySymbols[currency]}{results.mileageAdjustment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                  </span>
                </div>

                {/* Horizontal Cost comparison bar chart */}
                <div className="space-y-3 pt-2">
                  <h4 className="text-xs font-bold text-foreground/50 uppercase tracking-wider">Asset Depreciation Breakdown</h4>
                  <div className="space-y-2.5">
                    {/* Remaining Value Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/70 mb-1">
                        <span>Retained Value ({results.remainingPct.toFixed(0)}%)</span>
                        <span>{currencySymbols[currency]}{results.estimatedValue.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-primary rounded-full transition-all duration-500 ease-out" style={{ width: `${results.remainingPct}%` }} />
                      </div>
                    </div>

                    {/* Lost Value Bar */}
                    <div>
                      <div className="flex justify-between text-xs font-semibold text-foreground/70 mb-1">
                        <span>Depreciated Value ({results.depreciatedPct.toFixed(0)}%)</span>
                        <span>{currencySymbols[currency]}{results.totalDepreciation.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                      </div>
                      <div className="w-full h-3 rounded-full bg-border overflow-hidden">
                        <div className="h-full bg-red-500 rounded-full transition-all duration-500 ease-out" style={{ width: `${results.depreciatedPct}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter vehicle details to view projections.
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
