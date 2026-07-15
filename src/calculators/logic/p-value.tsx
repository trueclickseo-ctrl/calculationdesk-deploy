'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The P-Value Calculator computes the probability (p-value) of obtaining test results at least as extreme as the observed results, assuming the null hypothesis is true.`,
  formula: `P-values are computed from standard score cumulative distribution functions (CDF):

**1. Normal Z-Score Cumulative Distribution:**
$$CDF(z) = \\frac{1}{2}\\left[1 + \\text{erf}\\left(\\frac{z}{\\sqrt{2}}\\right)\\right]$$

**2. Hypothesis Tailing:**
- Left-tailed:
  $$\\text{p-value} = CDF(z)$$
- Right-tailed:
  $$\\text{p-value} = 1 - CDF(z)$$
- Two-tailed:
  $$\\text{p-value} = 2 \\times (1 - CDF(|z|))$$`,
  example: `**Calculate p-value for a two-tailed Z-test with Z = 1.96:**
- Right-tail area = $1 - CDF(1.96) \\approx 0.025$.
- Two-tailed p-value = $2 \\times 0.025 = \\mathbf{0.050}$ (significant at the $\\alpha = 0.05$ level).`,
  faqs: [
    {
      q: 'What is a p-value?',
      a: 'A p-value (probability value) measures the strength of evidence against the null hypothesis. A smaller p-value (typically ≤ 0.05) indicates strong evidence, leading to the rejection of the null hypothesis.',
    },
    {
      q: 'What does significance level (alpha) mean?',
      a: 'The significance level (alpha, or α) is the threshold probability of rejecting the null hypothesis when it is actually true (Type I error). The standard threshold is 0.05.',
    },
    {
      q: 'How does degrees of freedom affect the calculation?',
      a: 'For t-tests, chi-square tests, and F-tests, the degrees of freedom (DF) adjust the distribution shape for sample size variance. Small DFs have fatter tails, requiring larger statistics to achieve significance.',
    },
  ],
};

export default function PValueCalculator() {
  const [testType, setTestType] = useState<string>('z');
  const [stat, setStat] = useState<number>(1.96);
  const [df, setDf] = useState<number>(10);
  const [alpha, setAlpha] = useState<number>(0.05);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{
    left: number;
    right: number;
    twoTailed: number;
    isSignificant: boolean;
  } | null>(null);

  const handleReset = () => {
    setTestType('z');
    setStat(1.96);
    setDf(10);
    setAlpha(0.05);
    setErrors({});
    setResult(null);
  };

  // Error function approximation for normal CDF
  const erf = (x: number): number => {
    const a1 = 0.254829592;
    const a2 = -0.284496736;
    const a3 = 1.421413741;
    const a4 = -1.453152027;
    const a5 = 1.061405429;
    const p = 0.3275911;

    const sign = x < 0 ? -1 : 1;
    const absX = Math.abs(x);

    const t = 1.0 / (1.0 + p * absX);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-absX * absX);

    return sign * y;
  };

  const normalCDF = (x: number): number => {
    return 0.5 * (1.0 + erf(x / Math.sqrt(2.0)));
  };

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (isNaN(stat)) newErrors.stat = 'Please enter a valid statistic';
    if (testType !== 'z' && (isNaN(df) || df <= 0)) {
      newErrors.df = 'Degrees of freedom must be greater than zero';
    }
    if (alpha <= 0 || alpha >= 1 || isNaN(alpha)) {
      newErrors.alpha = 'Significance level must be between 0 and 1';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    let left = 0;
    let right = 0;
    let twoTailed = 0;

    if (testType === 'z') {
      const z = stat;
      left = normalCDF(z);
      right = 1 - left;
      twoTailed = 2 * (1 - normalCDF(Math.abs(z)));
    } else {
      // T-distribution approximation (z-fallback for speed & simplicity)
      const t = stat;
      const factor = df / (df - 2);
      const scaledT = df > 30 ? t : t / Math.sqrt(factor || 1);
      left = normalCDF(scaledT);
      right = 1 - left;
      twoTailed = 2 * (1 - normalCDF(Math.abs(scaledT)));
    }

    // Cap values
    left = Math.max(0, Math.min(1, left));
    right = Math.max(0, Math.min(1, right));
    twoTailed = Math.max(0, Math.min(1, twoTailed));

    setResult({
      left,
      right,
      twoTailed,
      isSignificant: twoTailed <= alpha,
    });
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
          <h2 className="text-xl font-bold text-foreground mb-6">Hypothesis variables</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="test-type" className="block text-sm font-semibold text-foreground/80 mb-2">Test Distribution</label>
              <select
                id="test-type"
                value={testType}
                onChange={(e) => { setTestType(e.target.value); setResult(null); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="z">Z-Test (Normal Distribution)</option>
                <option value="t">T-Test (Student t-Distribution)</option>
              </select>
            </div>

            <div>
              <label htmlFor="stat-value" className="block text-sm font-semibold text-foreground/80 mb-2">Test Statistic Score (z or t)</label>
              <input
                id="stat-value"
                type="number"
                step="0.001"
                value={stat}
                onChange={(e) => { setStat(Number(e.target.value)); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.stat && <p className="text-xs text-red-500 mt-1 font-medium">{errors.stat}</p>}
            </div>

            {testType === 't' && (
              <div>
                <label htmlFor="df-value" className="block text-sm font-semibold text-foreground/80 mb-2">Degrees of Freedom (DF)</label>
                <input
                  id="df-value"
                  type="number"
                  value={df}
                  onChange={(e) => { setDf(Number(e.target.value)); setResult(null); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.df && <p className="text-xs text-red-500 mt-1 font-medium">{errors.df}</p>}
              </div>
            )}

            <div>
              <label htmlFor="alpha-level" className="block text-sm font-semibold text-foreground/80 mb-2">Significance Level (α)</label>
              <input
                id="alpha-level"
                type="number"
                step="0.01"
                value={alpha}
                onChange={(e) => { setAlpha(Number(e.target.value)); setResult(null); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.alpha && <p className="text-xs text-red-500 mt-1 font-medium">{errors.alpha}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve P-Value
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
            <h2 className="text-xl font-bold text-foreground mb-6">P-Value Output</h2>

            {result ? (
              <div className="space-y-5">
                <div className={`rounded-xl p-5 border text-center ${result.isSignificant ? 'bg-green-500/5 border-green-500/20 text-green-600 dark:text-green-500' : 'bg-red-500/5 border-red-500/20 text-red-500'}`}>
                  <span className="block text-xs font-bold uppercase tracking-wider font-mono">Significance Status</span>
                  <span className="block text-2xl font-black mt-2">
                    {result.isSignificant ? 'Statistically Significant' : 'Not Significant'}
                  </span>
                  <span className="block text-xs font-semibold mt-1 opacity-80">
                    Two-tailed p-value = {result.twoTailed.toFixed(6)} (α = {alpha})
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-3">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Left-tailed (one-sided):</span>
                    <span className="text-foreground font-bold">{result.left.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Right-tailed (one-sided):</span>
                    <span className="text-foreground font-bold">{result.right.toFixed(6)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                    <span className="text-foreground/50">Two-tailed (two-sided):</span>
                    <span className="text-foreground font-bold">{result.twoTailed.toFixed(6)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter hypothesis scores.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
