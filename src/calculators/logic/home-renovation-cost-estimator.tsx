'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Home Renovation Cost Estimator is a construction and home design planning tool engineered to calculate the average budget needed for residential remodeling projects. By analyzing floor area sizes, specific room types, quality of finishes, labor options, and contingency buffers, this calculator breaks down project costs. Homeowners, realtors, and interior designers use this estimator to prevent budget overruns and plan financial renovations. You can review standard housing guidelines on the [US Department of Housing and Urban Development website](https://www.hud.gov).',
  formula: `The cost estimation methodology incorporates room-specific baselines, quality multipliers, and labor margins:

1. **Material Cost**:
   $$\\text{Material Cost} = \\text{Area} \\times \\text{Base Rate} \\times M_{\\text{quality}}$$
   Where the Base Rate per sq ft depends on the room type (Kitchen: $150, Bathroom: $200, Living Room: $60, Bedroom: $50, Full House: $100) and $M_{\\text{quality}}$ is the material finish factor (Economy: 0.80, Standard: 1.00, Premium: 1.60).

2. **Labor Cost**:
   $$\\text{Labor Cost} = \\text{Material Cost} \\times L_{\\text{type}}$$
   Where $L_{\\text{type}}$ is the labor cost coefficient (DIY: 0%, Professional: 50%, General Contractor: 80%).

3. **Total Budget (with Contingency)**:
   $$\\text{Total Cost} = (\\text{Material Cost} + \\text{Labor Cost}) \\times (1 + \\text{Contingency Buffer})$$
   (Contingency buffers usually range from 10% to 20% to cover hidden structural or plumbing issues). Knowing the home renovation cost estimator rates helps you negotiate with builders.`,
  example: `Let's calculate a home renovation budget example. Suppose you plan to remodel a 300 sq ft Kitchen using Standard materials. You hire a professional contractor (50% labor surcharge) and include a 15% contingency buffer.

1. **Material Cost**:
   - Area = 300 sq ft.
   - Base Kitchen Rate = $150/sq ft.
   - Standard material factor = 1.00.
   - Material Cost = 300 × $150 × 1.00 = $45,000.

2. **Labor Cost**:
   - Labor factor (Professional) = 50%.
   - Labor Cost = $45,000 × 0.50 = $22,500.

3. **Subtotal**:
   - Subtotal = $45,000 + $22,500 = $67,500.

4. **Contingency Buffer**:
   - Contingency (15%) = $67,500 × 0.15 = $10,125.
   - Total Estimated Cost = $67,500 + $10,125 = $77,625.

Thus, the estimated kitchen renovation budget is $77,625, with $45,000 allocated to materials, $22,500 to labor, and a $10,125 emergency reserve.`,
  faqs: [
    {
      q: 'Why is a contingency buffer recommended for home renovations?',
      a: 'When opening walls or floors, contractors frequently discover unexpected issues like water damage, electrical code violations, mold, or rotten framing. A 10% to 20% contingency budget covers these surprises without halting work.',
    },
    {
      q: 'What is the most expensive room to renovate?',
      a: 'Bathrooms and kitchens are the most expensive rooms to renovate per square foot. They require specialized plumbing, electrical wiring, custom cabinetry, appliances, waterproofing, and tile work.',
    },
    {
      q: 'How do metric and imperial measurements compare in renovation costs?',
      a: 'The cost per square meter is roughly 10.76 times higher than the cost per square foot, since one square meter contains approximately 10.764 square feet. This calculator scales unit costs automatically.',
    },
    {
      q: 'Is it cheaper to renovate or build a new house?',
      a: 'If the foundation and structural framing are in excellent condition, renovating is usually cheaper. However, if the house requires extensive structural repairs, dry rot replacement, and total utility refitting, rebuilding from scratch may be more cost-effective.',
    },
    {
      q: 'How can I reduce my home renovation costs?',
      a: 'You can reduce costs by keeping the existing layout (avoiding moving plumbing lines and load-bearing walls), doing some prep/demolition work yourself (DIY), choosing standard-grade finishes, and sourcing materials in advance.',
    },
  ],
};

const BASE_RATES = {
  kitchen: 150,
  bathroom: 200,
  livingRoom: 60,
  bedroom: 50,
  fullHouse: 100,
};

export default function RenovationEstimator() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [areaUnit, setAreaUnit] = useState<'sqft' | 'sqm'>('sqft');
  
  const [area, setArea] = useState<number>(300);
  const [roomType, setRoomType] = useState<keyof typeof BASE_RATES>('kitchen');
  const [quality, setQuality] = useState<'economy' | 'standard' | 'premium'>('standard');
  const [laborType, setLaborType] = useState<'diy' | 'professional' | 'contractor'>('professional');
  const [contingency, setContingency] = useState<number>(15);

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

  const isValid = area > 0 && contingency >= 0 && contingency <= 50;

  let results = null;
  if (isValid) {
    // Determine baseline rate per area unit
    let baseRate = BASE_RATES[roomType];
    
    // If unit is sqm, multiply rates by 10.7639 to match area equivalence
    if (areaUnit === 'sqm') {
      baseRate = baseRate * 10.7639;
    }

    // Material Quality multipliers
    let qualityMult = 1.0;
    if (quality === 'economy') qualityMult = 0.8;
    if (quality === 'premium') qualityMult = 1.6;

    // Labor coefficients
    let laborCoeff = 0.5; // professional 50%
    if (laborType === 'diy') laborCoeff = 0.0;
    if (laborType === 'contractor') laborCoeff = 0.8;

    // Calculations
    const materialCost = area * baseRate * qualityMult;
    const laborCost = materialCost * laborCoeff;
    const subtotal = materialCost + laborCost;
    const contingencyAmount = subtotal * (contingency / 100);
    const totalCost = subtotal + contingencyAmount;

    // Chart scale percentages
    const materialPct = (materialCost / totalCost) * 100;
    const laborPct = (laborCost / totalCost) * 100;
    const contingencyPct = (contingencyAmount / totalCost) * 100;

    results = {
      materialCost,
      laborCost,
      subtotal,
      contingencyAmount,
      totalCost,
      materialPct,
      laborPct,
      contingencyPct,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (area <= 0) newErrors.area = 'Area must be greater than zero';
    if (contingency < 0 || contingency > 50) newErrors.contingency = 'Contingency must be between 0% and 50%';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setArea(300);
    setRoomType('kitchen');
    setQuality('standard');
    setLaborType('professional');
    setContingency(15);
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

  const materialDash = results ? getStrokeDash(results.materialPct) : null;
  const laborDash = results ? getStrokeDash(results.laborPct) : null;
  const contingencyDash = results ? getStrokeDash(results.contingencyPct) : null;

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Remodel Parameters</h2>
            
            {/* Currency Select */}
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
            {/* Unit Toggle */}
            <div className="flex gap-4">
              <button
                type="button"
                onClick={() => {
                  if (areaUnit === 'sqm') {
                    setAreaUnit('sqft');
                    setArea(Math.round(area * 10.7639));
                  }
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${areaUnit === 'sqft' ? 'bg-primary text-white border-primary' : 'bg-transparent text-foreground/60 border-border hover:bg-border/40'}`}
              >
                Square Feet (sq ft)
              </button>
              <button
                type="button"
                onClick={() => {
                  if (areaUnit === 'sqft') {
                    setAreaUnit('sqm');
                    setArea(Math.round(area / 10.7639));
                  }
                }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${areaUnit === 'sqm' ? 'bg-primary text-white border-primary' : 'bg-transparent text-foreground/60 border-border hover:bg-border/40'}`}
              >
                Square Meters (sq m)
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="area" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Total Floor Area
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                  <input
                    id="area"
                    type="number"
                    value={area || ''}
                    onChange={(e) => setArea(Number(e.target.value))}
                    className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                  />
                </div>
                {errors.area && <p className="text-xs text-red-500 mt-1 font-medium">{errors.area}</p>}
              </div>

              <div>
                <label htmlFor="room-type" className="block text-sm font-semibold text-foreground/80 mb-2">
                  Project Type
                </label>
                <select
                  id="room-type"
                  value={roomType}
                  onChange={(e) => setRoomType(e.target.value as any)}
                  className="block w-full py-3 px-3 text-sm font-semibold rounded-xl border border-border bg-background text-foreground/80 outline-none cursor-pointer"
                >
                  <option value="kitchen">Kitchen Remodel</option>
                  <option value="bathroom">Bathroom Remodel</option>
                  <option value="livingRoom">Living Room</option>
                  <option value="bedroom">Bedroom</option>
                  <option value="fullHouse">Full House Remodel</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label htmlFor="quality" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Finish Quality
                </label>
                <select
                  id="quality"
                  value={quality}
                  onChange={(e) => setQuality(e.target.value as any)}
                  className="block w-full py-2.5 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 outline-none"
                >
                  <option value="economy">Economy</option>
                  <option value="standard">Standard</option>
                  <option value="premium">Premium Finish</option>
                </select>
              </div>

              <div>
                <label htmlFor="labor" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Labor Type
                </label>
                <select
                  id="labor"
                  value={laborType}
                  onChange={(e) => setLaborType(e.target.value as any)}
                  className="block w-full py-2.5 px-2 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 outline-none"
                >
                  <option value="diy">DIY (No Labor)</option>
                  <option value="professional">Professional</option>
                  <option value="contractor">GC Managed</option>
                </select>
              </div>

              <div>
                <label htmlFor="contingency" className="block text-xs font-semibold text-foreground/80 mb-1.5">
                  Contingency %
                </label>
                <div className="relative rounded-xl border border-border bg-background focus-within:border-primary transition-all">
                  <div className="absolute inset-y-0 right-0 pr-2.5 flex items-center pointer-events-none text-foreground/40 font-semibold text-[10px]">
                    %
                  </div>
                  <input
                    id="contingency"
                    type="number"
                    value={contingency || ''}
                    onChange={(e) => setContingency(Number(e.target.value))}
                    className="block w-full py-2 px-2 pr-6 text-xs font-semibold rounded-xl bg-transparent text-foreground/80 outline-none"
                  />
                </div>
                {errors.contingency && <p className="text-[10px] text-red-500 mt-1">{errors.contingency}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Estimate Budget
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
            <h2 className="text-xl font-bold text-foreground mb-6">Budget Projections</h2>
            {results ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-center">
                <div className="space-y-3.5">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                      Total Estimated Budget
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {currencySymbols[currency]}{results.totalCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                    </span>
                  </div>

                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Materials Cost:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.materialCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Labor Surcharge:</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.laborCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3.5 border border-border flex justify-between text-xs">
                    <span className="font-semibold text-foreground/50">Contingency Buffer ({contingency}%):</span>
                    <span className="font-bold text-foreground">{currencySymbols[currency]}{results.contingencyAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
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
                      {materialDash && results.materialPct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="var(--primary)"
                          strokeWidth="8"
                          strokeDasharray={materialDash.dashArray}
                          strokeDashoffset={materialDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {laborDash && results.laborPct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="var(--accent)"
                          strokeWidth="8"
                          strokeDasharray={laborDash.dashArray}
                          strokeDashoffset={laborDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                      {contingencyDash && results.contingencyPct > 0 && (
                        <circle
                          cx="55"
                          cy="55"
                          r={radius}
                          fill="transparent"
                          stroke="#ef4444"
                          strokeWidth="8"
                          strokeDasharray={contingencyDash.dashArray}
                          strokeDashoffset={contingencyDash.dashOffset}
                          className="transition-all duration-500 ease-out"
                        />
                      )}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[9px] font-bold uppercase tracking-wider text-foreground/40">
                        Material Ratio
                      </span>
                      <span className="text-sm font-extrabold text-foreground">
                        {results.materialPct.toFixed(0)}%
                      </span>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 gap-1.5 mt-5 text-[10px] font-semibold w-full">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-primary" />
                        <span className="text-foreground/70 truncate">Materials ({results.materialPct.toFixed(0)}%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-accent" />
                        <span className="text-foreground/70 truncate">Labor ({results.laborPct.toFixed(0)}%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="h-2 w-2 rounded-full bg-red-500" />
                        <span className="text-foreground/70 truncate">Contingency ({results.contingencyPct.toFixed(0)}%)</span>
                      </div>
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
