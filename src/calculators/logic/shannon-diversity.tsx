'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Shannon Diversity Index Calculator computes species diversity, richness, and evenness indices for ecological datasets based on sample counts.`,
  formula: `Ecological diversity scores use species counts to measure entropy:

**1. Proportion ($p_i$):**
$$p_i = \\frac{n_i}{N}$$
Where $n_i$ is the count of species $i$, and $N$ is total population.

**2. Shannon Index ($H$):**
$$H = -\\sum_{i=1}^{S} p_i \\ln(p_i)$$

**3. Shannon Evenness ($E_H$):**
$$E_H = \\frac{H}{\\ln(S)}$$
Where $S$ is species richness (number of unique species).`,
  example: `**Calculate diversity for three species with counts 50, 30, and 20:**
- Total $N = 100$.
- Proportions: $p_1 = 0.5$, $p_2 = 0.3$, $p_3 = 0.2$.
- $H = -[0.5\\ln(0.5) + 0.3\\ln(0.3) + 0.2\\ln(0.2)] \\approx 1.0296$.
- Evenness $E_H = 1.0296 / \\ln(3) \\approx 0.9372$.`,
  faqs: [
    {
      q: 'What does the Shannon Diversity Index measure?',
      a: 'It measures the uncertainty of predicting the species identity of an individual chosen at random. Higher values indicate higher biodiversity and a more balanced ecosystem.',
    },
    {
      q: 'What is the difference between richness and evenness?',
      a: 'Species richness is the total number of different species in a community. Species evenness measures how close in numbers each species in an environment is.',
    },
    {
      q: 'What is a typical Shannon Index value?',
      a: 'In real-world ecosystems, the Shannon index usually ranges between 1.5 and 3.5. It rarely exceeds 4.0.',
    },
  ],
};

export default function ShannonDiversityCalculator() {
  const [countsStr, setCountsStr] = useState<string>('50, 30, 20, 10');
  const [result, setResult] = useState<{
    shannon: number;
    evenness: number;
    richness: number;
    totalCount: number;
    simpson: number;
    simpsonDiv: number;
  } | null>(null);
  const [error, setError] = useState<string>('');

  const handleReset = () => {
    setCountsStr('');
    setResult(null);
    setError('');
  };

  const handleCalculate = () => {
    if (!countsStr.trim()) {
      setError('Please enter species counts');
      return;
    }
    setError('');

    const counts = countsStr
      .split(',')
      .map((x) => Number(x.trim()))
      .filter((x) => !isNaN(x) && x > 0);

    if (counts.length < 2) {
      setError('Please enter at least two valid positive counts');
      return;
    }

    const totalCount = counts.reduce((acc, c) => acc + c, 0);
    const richness = counts.length;

    let shannon = 0;
    let simpson = 0;

    for (const c of counts) {
      const p = c / totalCount;
      shannon -= p * Math.log(p);
      simpson += p * p;
    }

    const evenness = shannon / Math.log(richness);
    const simpsonDiv = 1 - simpson;

    setResult({
      shannon,
      evenness: isNaN(evenness) ? 0 : evenness,
      richness,
      totalCount,
      simpson,
      simpsonDiv,
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
          <h2 className="text-xl font-bold text-foreground mb-6">Species Data</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="species-counts" className="block text-sm font-semibold text-foreground/80 mb-2">
                Species Counts (comma-separated)
              </label>
              <textarea
                id="species-counts"
                value={countsStr}
                onChange={(e) => {
                  setCountsStr(e.target.value);
                  setError('');
                }}
                placeholder="e.g. 50, 30, 20, 10"
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 resize-none h-28"
              />
              {error && <p className="text-xs text-red-500 mt-1 font-medium">{error}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Diversity
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
            <h2 className="text-xl font-bold text-foreground mb-6">Diversity Indices</h2>

            {result ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">
                      Shannon Index (H)
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {result.shannon.toFixed(4)}
                    </span>
                  </div>
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">
                      Evenness (EH)
                    </span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {result.evenness.toFixed(4)}
                    </span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border space-y-2.5">
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Species Richness (S):</span>
                    <span className="text-foreground font-bold">{result.richness} species</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Total Sample Population (N):</span>
                    <span className="text-foreground font-bold">{result.totalCount}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold pt-2 border-t border-border/40">
                    <span className="text-foreground/50">Simpson&apos;s Index (D):</span>
                    <span className="text-foreground font-bold">{result.simpson.toFixed(4)}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-semibold">
                    <span className="text-foreground/50">Simpson&apos;s Index of Diversity (1 - D):</span>
                    <span className="text-foreground font-bold">{result.simpsonDiv.toFixed(4)}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter species population counts to estimate diversity indices.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
