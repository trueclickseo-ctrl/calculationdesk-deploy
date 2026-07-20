'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The Portfolio Asset Allocation & Risk Analyzer is an advanced investment tool designed to evaluate the asset mix of your wealth portfolio. Applying core principles of Modern Portfolio Theory (MPT), this analyzer calculates your weighted expected returns and models the overall portfolio volatility (risk) using standard asset class correlations. Investors and advisors use this analyzer to ensure their portfolios match their personal risk tolerance and avoid over-concentration in highly volatile assets. You can study more about asset allocation strategies on the [US Securities and Exchange Commission Investor website](https://www.investor.gov).',
  formula: `The calculations in this analyzer utilize standard portfolio construction mathematics:

1. **Asset Class Weights**:
   $$w_i = \\frac{V_i}{V_{\\text{total}}}$$
   Where $V_i$ is the value of asset class $i$, and $V_{\\text{total}}$ is the total portfolio value.

2. **Portfolio Expected Return**:
   $$E(R_p) = \\sum_{i=1}^{n} (w_i \\times E(R_i))$$
   Where $E(R_i)$ is the expected return of asset class $i$.

3. **Portfolio Volatility (Risk)**:
   $$\\sigma_p = \\sqrt{\\sum_{i=1}^{n} \\sum_{j=1}^{n} (w_i \\times w_j \\times \\sigma_i \\times \\sigma_j \\times \\rho_{i,j})}$$
   Where $\\sigma_i$ is the standard deviation (volatility) of asset class $i$, and $\\rho_{i,j}$ is the correlation coefficient between asset class $i$ and asset class $j$. Knowing your portfolio asset allocation is key to long-term compounding.`,
  example: `Let's look at a portfolio risk analysis example with three asset classes (Equities, Bonds, Cash) and a total portfolio of $100,000.

1. **Portfolio Asset Allocations**:
   - Equities: $60,000 (Weight $w_1 = 0.60$, Return $R_1 = 10\\%$, Volatility $\\sigma_1 = 15\\%$)
   - Bonds: $30,000 (Weight $w_2 = 0.30$, Return $R_2 = 5\\%$, Volatility $\\sigma_2 = 5\\%$)
   - Cash: $10,000 (Weight $w_3 = 0.10$, Return $R_3 = 3\\%$, Volatility $\\sigma_3 = 1\\%$)

2. **Portfolio Expected Return**:
   $$E(R_p) = (0.60 \\times 10\\%) + (0.30 \\times 5\\%) + (0.10 \\times 3\\%) = 6.0\\% + 1.5\\% + 0.3\\% = 7.8\\%$$

3. **Portfolio Volatility (assuming standard correlations)**:
   - Applying the portfolio variance double-sum formula with correlations (e.g. $\\rho_{1,2} = -0.10$), we calculate:
     $$\\sigma_p = \\sqrt{(0.60^2 \\times 15^2) + (0.30^2 \\times 5^2) + (0.10^2 \\times 1^2) + 2(0.60 \\times 0.30 \\times 15 \\times 5 \\times -0.10)} \\approx 9.07\\%$$

Thus, this asset mix yields an expected annual return of 7.8% with an overall portfolio risk of 9.07% (Moderate-Conservative).`,
  faqs: [
    {
      q: 'What is asset allocation?',
      a: 'Asset allocation is the strategy of dividing your investment portfolio among different asset categories, such as stocks, bonds, cash, real estate, and alternative assets. It is the primary driver of both portfolio returns and overall risk levels.',
    },
    {
      q: 'Why is the portfolio volatility lower than the stock volatility?',
      a: 'This is the core benefit of diversification. Because different asset classes do not move in perfect lockstep (they have low or negative correlations), the price fluctuations of some assets offset others, lowering the combined portfolio risk.',
    },
    {
      q: 'What is the correlation coefficient?',
      a: 'A correlation coefficient (\\rho) measures how two assets move relative to each other. It ranges from -1.0 (perfect opposite movement) to +1.0 (perfect parallel movement). A correlation of 0.0 means the movements are completely independent.',
    },
    {
      q: 'How often should I rebalance my portfolio?',
      a: 'Most financial planners recommend reviewing and rebalancing your portfolio annually or semi-annually, or whenever market movements cause your asset weights to drift by more than 5% from your target model allocation.',
    },
    {
      q: 'What is a conservative vs. aggressive portfolio?',
      a: 'A conservative portfolio typically allocates 70% or more to stable assets like bonds and cash, prioritizing capital preservation. An aggressive portfolio allocates 80% or more to equities and alternative assets, prioritizing long-term capital growth.',
    },
  ],
};

// Standard asset class correlation matrix (Equities, Bonds, Cash, Real Estate, Alternatives)
const CORRELATIONS = [
  [1.0, -0.1, 0.0, 0.4, 0.3],    // Equities
  [-0.1, 1.0, 0.2, 0.1, -0.1],   // Bonds
  [0.0, 0.2, 1.0, 0.0, 0.0],     // Cash
  [0.4, 0.1, 0.0, 1.0, 0.2],     // Real Estate
  [0.3, -0.1, 0.0, 0.2, 1.0],    // Alternatives
];

export default function PortfolioAnalyzer() {
  const [currency, setCurrency] = useState<'INR' | 'USD' | 'EUR' | 'GBP' | 'PKR' | 'BDT' | 'TRY'>('USD');
  const [equities, setEquities] = useState<number>(60000);
  const [bonds, setBonds] = useState<number>(30000);
  const [cash, setCash] = useState<number>(10000);
  const [realEstate, setRealEstate] = useState<number>(0);
  const [alternatives, setAlternatives] = useState<number>(0);

  const [eqReturn, setEqReturn] = useState<number>(10);
  const [bondReturn, setBondReturn] = useState<number>(5);
  const [cashReturn, setCashReturn] = useState<number>(3);
  const [reReturn, setReReturn] = useState<number>(7);
  const [altReturn, setAltReturn] = useState<number>(12);

  const [eqRisk, setEqRisk] = useState<number>(15);
  const [bondRisk, setBondRisk] = useState<number>(5);
  const [cashRisk, setCashRisk] = useState<number>(1);
  const [reRisk, setReRisk] = useState<number>(10);
  const [altRisk, setAltRisk] = useState<number>(25);

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

  const values = [equities, bonds, cash, realEstate, alternatives];
  const returns = [eqReturn, bondReturn, cashReturn, reReturn, altReturn];
  const risks = [eqRisk, bondRisk, cashRisk, reRisk, altRisk];

  const totalValue = values.reduce((sum, val) => sum + (val || 0), 0);
  const isValid = totalValue > 0 && returns.every(r => r >= -50 && r <= 100) && risks.every(r => r >= 0 && r <= 100);

  let results = null;
  if (isValid) {
    const weights = values.map(v => (v || 0) / totalValue);

    // 1. Portfolio Expected Return
    const expectedReturn = weights.reduce((sum, w, idx) => sum + w * (returns[idx] / 100), 0) * 100;

    // 2. Portfolio Volatility (Risk) using correlation matrix
    let variance = 0;
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        variance += weights[i] * weights[j] * (risks[i] / 100) * (risks[j] / 100) * CORRELATIONS[i][j];
      }
    }
    const volatility = Math.sqrt(Math.max(0, variance)) * 100;

    // 3. Risk Level Classification
    let riskLevel = 'Conservative';
    let riskColor = 'text-green-500 bg-green-500/5 border-green-500/10';
    if (volatility >= 15) {
      riskLevel = 'Aggressive';
      riskColor = 'text-red-500 bg-red-500/5 border-red-500/10';
    } else if (volatility >= 10) {
      riskLevel = 'Moderate-Aggressive';
      riskColor = 'text-orange-500 bg-orange-500/5 border-orange-500/10';
    } else if (volatility >= 5) {
      riskLevel = 'Moderate-Conservative';
      riskColor = 'text-amber-500 bg-amber-500/5 border-amber-500/10';
    }

    results = {
      weights,
      expectedReturn,
      volatility,
      riskLevel,
      riskColor,
      percentages: weights.map(w => w * 100),
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (totalValue <= 0) newErrors.general = 'Total portfolio value must be greater than zero';
    if (returns.some(r => r < -50 || r > 100)) newErrors.returns = 'Expected returns must be between -50% and 100%';
    if (risks.some(r => r < 0 || r > 100)) newErrors.risks = 'Volatility/Risk must be between 0% and 100%';
    setErrors(newErrors);
  };

  const handleReset = () => {
    setEquities(60000);
    setBonds(30000);
    setCash(10000);
    setRealEstate(0);
    setAlternatives(0);
    setEqReturn(10);
    setBondReturn(5);
    setCashReturn(3);
    setReReturn(7);
    setAltReturn(12);
    setEqRisk(15);
    setBondRisk(5);
    setCashRisk(1);
    setReRisk(10);
    setAltRisk(25);
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

  const colors = ['#3b82f6', '#10b981', '#6b7280', '#8b5cf6', '#ec4899']; // Equities, Bonds, Cash, Real Estate, Alternatives

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Asset Class Allocations</h2>
            
            {/* Currency Select */}
            <div className="w-32">
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

          {errors.general && <p className="text-xs text-red-500 mb-4 font-medium">{errors.general}</p>}
          {errors.returns && <p className="text-xs text-red-500 mb-4 font-medium">{errors.returns}</p>}
          {errors.risks && <p className="text-xs text-red-500 mb-4 font-medium">{errors.risks}</p>}

          <div className="space-y-4">
            {/* Table headers */}
            <div className="grid grid-cols-12 gap-4 text-xs font-bold text-foreground/50 uppercase tracking-wider pb-2 border-b border-border/60">
              <div className="col-span-5">Asset Class</div>
              <div className="col-span-3">Value ({currencySymbols[currency]})</div>
              <div className="col-span-2">Return (%)</div>
              <div className="col-span-2">Risk (%)</div>
            </div>

            {/* Asset Row: Equities */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-blue-500 shrink-0" />
                <span className="text-sm font-semibold text-foreground/80">Equities / Stocks</span>
              </div>
              <input
                type="number"
                value={equities || ''}
                onChange={(e) => setEquities(Number(e.target.value))}
                className="col-span-3 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              <input
                type="number"
                value={eqReturn || ''}
                onChange={(e) => setEqReturn(Number(e.target.value))}
                className="col-span-2 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              <input
                type="number"
                value={eqRisk || ''}
                onChange={(e) => setEqRisk(Number(e.target.value))}
                className="col-span-2 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            {/* Asset Row: Bonds */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-emerald-500 shrink-0" />
                <span className="text-sm font-semibold text-foreground/80">Bonds / Fixed Income</span>
              </div>
              <input
                type="number"
                value={bonds || ''}
                onChange={(e) => setBonds(Number(e.target.value))}
                className="col-span-3 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              <input
                type="number"
                value={bondReturn || ''}
                onChange={(e) => setBondReturn(Number(e.target.value))}
                className="col-span-2 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              <input
                type="number"
                value={bondRisk || ''}
                onChange={(e) => setBondRisk(Number(e.target.value))}
                className="col-span-2 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            {/* Asset Row: Cash */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-gray-500 shrink-0" />
                <span className="text-sm font-semibold text-foreground/80">Cash / Liquid Cash</span>
              </div>
              <input
                type="number"
                value={cash || ''}
                onChange={(e) => setCash(Number(e.target.value))}
                className="col-span-3 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              <input
                type="number"
                value={cashReturn || ''}
                onChange={(e) => setCashReturn(Number(e.target.value))}
                className="col-span-2 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              <input
                type="number"
                value={cashRisk || ''}
                onChange={(e) => setCashRisk(Number(e.target.value))}
                className="col-span-2 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            {/* Asset Row: Real Estate */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-violet-500 shrink-0" />
                <span className="text-sm font-semibold text-foreground/80">Real Estate / REITs</span>
              </div>
              <input
                type="number"
                value={realEstate || ''}
                onChange={(e) => setRealEstate(Number(e.target.value))}
                className="col-span-3 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              <input
                type="number"
                value={reReturn || ''}
                onChange={(e) => setReReturn(Number(e.target.value))}
                className="col-span-2 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              <input
                type="number"
                value={reRisk || ''}
                onChange={(e) => setReRisk(Number(e.target.value))}
                className="col-span-2 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            {/* Asset Row: Alternatives */}
            <div className="grid grid-cols-12 gap-4 items-center">
              <div className="col-span-5 flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-pink-500 shrink-0" />
                <span className="text-sm font-semibold text-foreground/80">Alternatives / Gold</span>
              </div>
              <input
                type="number"
                value={alternatives || ''}
                onChange={(e) => setAlternatives(Number(e.target.value))}
                className="col-span-3 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              <input
                type="number"
                value={altReturn || ''}
                onChange={(e) => setAltReturn(Number(e.target.value))}
                className="col-span-2 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              <input
                type="number"
                value={altRisk || ''}
                onChange={(e) => setAltRisk(Number(e.target.value))}
                className="col-span-2 py-2 px-3 text-xs font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
            </div>

            <div className="flex gap-3 pt-4 border-t border-border/60">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-grow bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Analyze Portfolio
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
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Allocation & Risk Projections</h2>
            {results ? (
              <div className="space-y-6">
                
                {/* Total Value */}
                <div className="rounded-xl bg-background p-4 border border-border text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Total Portfolio Value
                  </span>
                  <span className="block text-2xl font-extrabold text-foreground mt-1">
                    {currencySymbols[currency]}{totalValue.toLocaleString(undefined, { maximumFractionDigits: 2 })}
                  </span>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                    <span className="block text-xs font-bold text-primary/80 uppercase tracking-wider">
                      Expected Return
                    </span>
                    <span className="block text-xl font-extrabold text-primary mt-1">
                      {results.expectedReturn.toFixed(2)}%
                    </span>
                  </div>

                  <div className={`rounded-xl p-4 border text-center ${results.riskColor}`}>
                    <span className="block text-xs font-bold uppercase tracking-wider opacity-80">
                      Portfolio Volatility
                    </span>
                    <span className="block text-xl font-extrabold mt-1">
                      {results.volatility.toFixed(2)}%
                    </span>
                  </div>
                </div>

                {/* Risk Level Badge */}
                <div className={`rounded-xl p-3.5 border text-center font-bold text-xs uppercase tracking-widest ${results.riskColor}`}>
                  Risk Classification: {results.riskLevel}
                </div>

                {/* Donut Chart */}
                <div className="flex flex-col items-center justify-center pt-2">
                  <div className="relative h-36 w-36">
                    <svg className="h-full w-full" viewBox="0 0 110 110">
                      <circle
                        cx="55"
                        cy="55"
                        r={radius}
                        fill="transparent"
                        stroke="#e2e8f0"
                        strokeWidth="8"
                      />
                      {results.percentages.map((pct, idx) => {
                        if (pct <= 0) return null;
                        const dash = getStrokeDash(pct);
                        return (
                          <circle
                            key={idx}
                            cx="55"
                            cy="55"
                            r={radius}
                            fill="transparent"
                            stroke={colors[idx]}
                            strokeWidth="8"
                            strokeDasharray={dash.dashArray}
                            strokeDashoffset={dash.dashOffset}
                            className="transition-all duration-500 ease-out"
                          />
                        );
                      })}
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                      <span className="text-[8px] font-bold uppercase tracking-wider text-foreground/40">
                        Asset classes
                      </span>
                      <span className="text-xs font-extrabold text-foreground">
                        {values.filter(v => v > 0).length} Active
                      </span>
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
