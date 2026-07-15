'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Statistics Calculator generates a complete descriptive statistics profile for a numeric dataset. It evaluates the sample and population variance, sample and population standard deviation, sum of squares, geometric mean, and harmonic mean from copy-pasted series data.`,
  formula: `The statistical equations computed for numeric series arrays are:

**1. Sum of Squares (SSD):**
$$SSD = \\sum_{k=1}^{N} (x_k - \\bar{x})^2$$

**2. Variance (σ² or s²):**
- Population Variance:
  $$\\sigma^2 = \\frac{SSD}{N}$$
- Sample Variance:
  $$s^2 = \\frac{SSD}{N - 1}$$

**3. Standard Deviation (σ or s):**
- Population Std Dev:
  $$\\sigma = \\sqrt{\\sigma^2}$$
- Sample Std Dev:
  $$s = \\sqrt{s^2}$$

**4. Geometric Mean:**
$$G = \\left(\\prod_{k=1}^{N} x_k\\right)^{\\frac{1}{N}}$$`,
  example: `Suppose you enter the dataset: **2, 4, 8, 16**.
1. Count (N) = 4. Mean (x̄) = (2+4+8+16)/4 = 7.5.
2. Sum of Squares (SSD):
   $$(2-7.5)^2 + (4-7.5)^2 + (8-7.5)^2 + (16-7.5)^2 = 30.25 + 12.25 + 0.25 + 72.25 = 115$$
3. Population Variance = 115 / 4 = 28.75.
4. Sample Variance = 115 / 3 ≈ 38.33.
5. Population Standard Deviation = √28.75 ≈ 5.36.
6. Sample Standard Deviation = √38.33 ≈ 6.19.
7. Geometric Mean = (2 × 4 × 8 × 16)^(1/4) = 1024^(0.25) ≈ 5.66.`,
  faqs: [
    {
      q: 'Why do we divide by N - 1 in sample standard deviation?',
      a: 'Dividing by $N-1$ (Bessel\'s correction) compensates for the fact that a smaller sample tends to underestimate the overall variability of the parent population, yielding an unbiased estimator.',
    },
    {
      q: 'When should I use population vs sample standard deviation?',
      a: 'Use Population SD when your dataset represents the *entirety* of the group you are studying (e.g., test scores of all students in a small class). Use Sample SD when your dataset is a representative subset of a larger population.',
    },
    {
      q: 'What is the harmonic mean?',
      a: 'The harmonic mean is the reciprocal of the arithmetic mean of the reciprocals. It is commonly used to find average rates (such as average speed or travel ratios). It is only defined for positive numbers.',
    },
  ],
};

export default function StatisticsCalculator() {
  const [inputText, setInputText] = useState<string>('2, 4, 8, 16');
  const [errors, setErrors] = useState<string>('');

  const parseNumbers = (text: string): number[] => {
    const tokens = text.split(/[,\s;\n]+/);
    const nums: number[] = [];
    tokens.forEach(t => {
      const clean = t.trim();
      if (clean !== '') {
        const n = Number(clean);
        if (!isNaN(n)) {
          nums.push(n);
        }
      }
    });
    return nums;
  };

  const nums = parseNumbers(inputText);
  const isValid = nums.length > 1; // Needs at least 2 numbers for sample SD

  let results = null;
  if (isValid) {
    const count = nums.length;
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / count;

    // Sum of Squares
    let ssd = 0;
    nums.forEach(n => {
      ssd += Math.pow(n - mean, 2);
    });

    const popVar = ssd / count;
    const sampleVar = ssd / (count - 1);
    
    const popSD = Math.sqrt(popVar);
    const sampleSD = Math.sqrt(sampleVar);

    // Geometric & Harmonic Mean (only valid if all numbers > 0)
    const allPositive = nums.every(n => n > 0);
    let geometricMean = 0;
    let harmonicMean = 0;

    if (allPositive) {
      // Geometric Mean (use log sums to prevent overflow)
      let logSum = 0;
      nums.forEach(n => {
        logSum += Math.log(n);
      });
      geometricMean = Math.exp(logSum / count);

      // Harmonic Mean
      let recipSum = 0;
      nums.forEach(n => {
        recipSum += 1 / n;
      });
      harmonicMean = count / recipSum;
    }

    results = {
      count,
      sum,
      mean,
      ssd,
      popVar,
      sampleVar,
      popSD,
      sampleSD,
      geometricMean,
      harmonicMean,
      allPositive,
    };
  }

  const handleCalculate = () => {
    if (nums.length <= 1) {
      setErrors('Please enter at least 2 valid numbers to calculate standard deviation statistics');
    } else {
      setErrors('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setInputText('2, 4, 8, 16');
    setErrors('');
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Numeric Series</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="input-text" className="block text-sm font-semibold text-foreground/80 mb-2">
                Enter numbers (comma or space separated)
              </label>
              <textarea
                id="input-text"
                rows={6}
                value={inputText}
                onChange={(e) => { setInputText(e.target.value); setErrors(''); }}
                placeholder="e.g. 2, 4, 8, 16"
                className="block w-full rounded-xl border border-border bg-background py-3 px-4 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-ring-custom transition-all"
              />
              <span className="block text-[10px] text-foreground/40 mt-1.5 font-semibold">Separate by commas, spaces, or lines. Ctrl + Enter to calculate.</span>
            </div>

            {errors && <p className="text-xs text-red-500 font-semibold">{errors}</p>}

            <button
              type="button"
              onClick={handleCalculate}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
            >
              Analyze Dataset
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Descriptive Statistics</h2>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Sample Std Deviation (s)</span>
                    <span className="block text-xl font-extrabold text-primary mt-1">{results.sampleSD.toFixed(4)}</span>
                  </div>
                  <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Population Std Dev (σ)</span>
                    <span className="block text-xl font-extrabold text-accent mt-1">{results.popSD.toFixed(4)}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Sample Variance (s²)</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.sampleVar.toFixed(4)}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Population Variance (σ²)</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.popVar.toFixed(4)}</span>
                  </div>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border flex justify-between">
                  <div>
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Sum of Squares (SSD)</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.ssd.toFixed(2)}</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Arithmetic Mean (Average)</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.mean.toFixed(4)}</span>
                  </div>
                </div>

                {results.allPositive && (
                  <div className="grid grid-cols-2 gap-4">
                    <div className="rounded-xl bg-background p-4 border border-border">
                      <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Geometric Mean</span>
                      <span className="block text-base font-bold text-foreground mt-1">{results.geometricMean.toFixed(4)}</span>
                    </div>
                    <div className="rounded-xl bg-background p-4 border border-border">
                      <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Harmonic Mean</span>
                      <span className="block text-base font-bold text-foreground mt-1">{results.harmonicMean.toFixed(4)}</span>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter numbers to generate stats.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
