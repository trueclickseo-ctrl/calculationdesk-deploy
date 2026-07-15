'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The ANOVA Calculator computes one-way Analysis of Variance (ANOVA), comparing differences between group means to assess statistical significance.`,
  formula: `One-way ANOVA compares variance between groups (SSB) and within groups (SSW):

**1. Degrees of Freedom:**
$$df_{between} = k - 1$$
$$df_{within} = N - k$$
Where $k$ is group count, $N$ is total sample size.

**2. Mean Squares (MS):**
$$MSB = \\frac{SSB}{df_{between}}$$
$$MSW = \\frac{SSW}{df_{within}}$$

**3. F-Statistic:**
$$F = \\frac{MSB}{MSW}$$`,
  example: `**Compare three groups with scores: G1 [2, 3, 4], G2 [3, 4, 5], G3 [5, 6, 7]:**
- G1 mean = 3.0, G2 mean = 4.0, G3 mean = 6.0.
- Grand Mean = (3 + 4 + 6) / 3 = 4.333.
- SSB = 3 × [(3-4.33)^2 + (4-4.33)^2 + (6-4.33)^2] = 14.0.
- SSW = sum of squared deviations from group means = 2.0 + 2.0 + 2.0 = 6.0.
- $df_{between} = 2$, $df_{within} = 6$.
- $MSB = 7.0$, $MSW = 1.0$.
- $F = 7.0 / 1.0 = \\mathbf{7.000}$.`,
  faqs: [
    {
      q: 'What is one-way ANOVA used for?',
      a: 'It determines whether there are any statistically significant differences between the means of three or more independent groups (whereas t-tests are limited to comparing only two groups).',
    },
    {
      q: 'What are the assumptions of ANOVA?',
      a: 'The key assumptions are: data values within each group are normally distributed, the variances of the groups are equal (homoscedasticity), and the samples are independent.',
    },
    {
      q: 'How do you interpret the F-statistic?',
      a: 'A larger F-statistic indicates that the variance between group means is much larger than the variance within the groups, making it highly probable that at least one group mean is significantly different.',
    },
  ],
};

export default function AnovaCalculator() {
  const [g1, setG1] = useState<string>('2, 3, 4');
  const [g2, setG2] = useState<string>('3, 4, 5');
  const [g3, setG3] = useState<string>('5, 6, 7');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [results, setResults] = useState<{
    means: number[];
    grandMean: number;
    ssb: number;
    ssw: number;
    dfb: number;
    dfw: number;
    msb: number;
    msw: number;
    fStat: number;
  } | null>(null);

  const handleReset = () => {
    setG1('');
    setG2('');
    setG3('');
    setErrors({});
    setResults(null);
  };

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    const parseGroup = (str: string) =>
      str.split(',').map(x => Number(x.trim())).filter(x => !isNaN(x));

    const data1 = parseGroup(g1);
    const data2 = parseGroup(g2);
    const data3 = parseGroup(g3);

    if (data1.length < 2) newErrors.g1 = 'Enter at least 2 numbers';
    if (data2.length < 2) newErrors.g2 = 'Enter at least 2 numbers';
    if (data3.length < 2) newErrors.g3 = 'Enter at least 2 numbers';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setErrors({});

    const allGroups = [data1, data2, data3];
    const k = allGroups.length;
    const nList = allGroups.map(g => g.length);
    const totalN = nList.reduce((acc, x) => acc + x, 0);

    const sums = allGroups.map(g => g.reduce((acc, x) => acc + x, 0));
    const means = sums.map((s, idx) => s / nList[idx]);
    const grandSum = sums.reduce((acc, x) => acc + x, 0);
    const grandMean = grandSum / totalN;

    // Sum of Squares Between (SSB)
    let ssb = 0;
    for (let i = 0; i < k; i++) {
      ssb += nList[i] * Math.pow(means[i] - grandMean, 2);
    }

    // Sum of Squares Within (SSW)
    let ssw = 0;
    for (let i = 0; i < k; i++) {
      const g = allGroups[i];
      const m = means[i];
      for (const val of g) {
        ssw += Math.pow(val - m, 2);
      }
    }

    const dfb = k - 1;
    const dfw = totalN - k;

    const msb = ssb / dfb;
    const msw = ssw / dfw;
    const fStat = msw > 0 ? msb / msw : 0;

    setResults({
      means,
      grandMean,
      ssb,
      ssw,
      dfb,
      dfw,
      msb,
      msw,
      fStat,
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
          <h2 className="text-xl font-bold text-foreground mb-6">Group Datasets</h2>

          <div className="space-y-4">
            <div>
              <label htmlFor="group1-data" className="block text-sm font-semibold text-foreground/80 mb-2">Group 1 Data (comma-separated)</label>
              <input
                id="group1-data"
                type="text"
                value={g1}
                onChange={(e) => { setG1(e.target.value); setErrors({}); }}
                placeholder="e.g. 2, 3, 4"
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.g1 && <p className="text-xs text-red-500 mt-1 font-medium">{errors.g1}</p>}
            </div>

            <div>
              <label htmlFor="group2-data" className="block text-sm font-semibold text-foreground/80 mb-2">Group 2 Data (comma-separated)</label>
              <input
                id="group2-data"
                type="text"
                value={g2}
                onChange={(e) => { setG2(e.target.value); setErrors({}); }}
                placeholder="e.g. 3, 4, 5"
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.g2 && <p className="text-xs text-red-500 mt-1 font-medium">{errors.g2}</p>}
            </div>

            <div>
              <label htmlFor="group3-data" className="block text-sm font-semibold text-foreground/80 mb-2">Group 3 Data (comma-separated)</label>
              <input
                id="group3-data"
                type="text"
                value={g3}
                onChange={(e) => { setG3(e.target.value); setErrors({}); }}
                placeholder="e.g. 5, 6, 7"
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.g3 && <p className="text-xs text-red-500 mt-1 font-medium">{errors.g3}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve ANOVA
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
            <h2 className="text-xl font-bold text-foreground mb-6">Variance breakdown</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">F-Statistic Score</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.fStat.toFixed(4)}
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Degrees of freedom: between = {results.dfb}, within = {results.dfw}
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-2">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Group 1 Mean:</span>
                    <span className="text-foreground font-bold">{results.means[0].toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Group 2 Mean:</span>
                    <span className="text-foreground font-bold">{results.means[1].toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Group 3 Mean:</span>
                    <span className="text-foreground font-bold">{results.means[2].toFixed(3)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40 font-bold">
                    <span className="text-foreground/50">Grand Mean:</span>
                    <span className="text-foreground">{results.grandMean.toFixed(3)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">MS Between (MSB)</span>
                    <span className="block text-sm font-bold text-foreground mt-1">{results.msb.toFixed(4)}</span>
                  </div>
                  <div className="rounded-xl bg-background p-3 border border-border">
                    <span className="block text-[10px] font-bold text-foreground/50 uppercase">MS Within (MSW)</span>
                    <span className="block text-sm font-bold text-foreground mt-1">{results.msw.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter dataset entries.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
