'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Standard Deviation Calculator measures the dispersion or spread of a numeric dataset relative to its mean. It computes both population and sample standard deviation, along with their respective variances and the sum of squared differences (sum of squares).`,
  formula: `Standard deviations are calculated using the following equations:

**1. Sum of Squares (SSD):**
$$SSD = \\sum (x_i - \\bar{x})^2$$

**2. Population Standard Deviation (σ):**
$$\\sigma = \\sqrt{\\frac{SSD}{N}}$$

**3. Sample Standard Deviation (s):**
$$s = \\sqrt{\\frac{SSD}{N - 1}}$$

Where:
- **N** is the total number of items in the dataset.
- **x̄** is the arithmetic mean.`,
  example: `Suppose you enter the dataset: **4, 8, 12, 16**.

1. Count (N) = 4. Mean (x̄) = (4+8+12+16)/4 = 10.
2. Sum of Squares (SSD):
   $$(4-10)^2 + (8-10)^2 + (12-10)^2 + (16-10)^2 = 36 + 4 + 4 + 36 = 80$$
3. Population Standard Deviation (σ) = √(80 / 4) = √20 ≈ **4.4721**.
4. Sample Standard Deviation (s) = √(80 / (4 - 1)) = √(80 / 3) ≈ **5.1640**.`,
  faqs: [
    {
      q: 'What does a high standard deviation indicate?',
      a: 'A high standard deviation indicates that the data points are spread out widely over a larger range of values, suggesting high volatility or variability in the dataset.',
    },
    {
      q: 'What does a standard deviation of zero mean?',
      a: 'A standard deviation of exactly zero means that all data values in the set are identical, meaning there is zero spread or deviation from the mean.',
    },
    {
      q: 'What is the coefficient of variation?',
      a: 'The coefficient of variation (CV) is the ratio of the standard deviation to the mean ($SD / Mean$), showing the relative variability of the data in comparison to its size.',
    },
  ],
};

export default function StandardDeviationCalculator() {
  const [inputText, setInputText] = useState<string>('4, 8, 12, 16');
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
  const isValid = nums.length > 1; // standard deviation requires at least 2 values

  let results = null;
  if (isValid) {
    const count = nums.length;
    const sum = nums.reduce((acc, curr) => acc + curr, 0);
    const mean = sum / count;

    let ssd = 0;
    nums.forEach(n => {
      ssd += Math.pow(n - mean, 2);
    });

    const popVar = ssd / count;
    const sampleVar = ssd / (count - 1);
    
    const popSD = Math.sqrt(popVar);
    const sampleSD = Math.sqrt(sampleVar);

    results = {
      count,
      sum,
      mean,
      ssd,
      popVar,
      sampleVar,
      popSD,
      sampleSD,
    };
  }

  const handleCalculate = () => {
    if (nums.length <= 1) {
      setErrors('Please enter at least 2 numbers to compute standard deviation');
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
    setInputText('4, 8, 12, 16');
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
                Enter your numbers (comma or space separated)
              </label>
              <textarea
                id="input-text"
                rows={6}
                value={inputText}
                onChange={(e) => { setInputText(e.target.value); setErrors(''); }}
                placeholder="e.g. 4, 8, 12, 16"
                className="block w-full rounded-xl border border-border bg-background py-3 px-4 text-sm font-medium outline-none focus:border-primary focus:ring-4 focus:ring-ring-custom transition-all"
              />
              <span className="block text-[10px] text-foreground/40 mt-1.5 font-semibold">Separate values by commas or spaces. Ctrl + Enter to calculate.</span>
            </div>

            {errors && <p className="text-xs text-red-500 font-semibold">{errors}</p>}

            <button
              type="button"
              onClick={handleCalculate}
              className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
            >
              Solve Deviations
            </button>
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Deviations Output</h2>
            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Sample Standard Deviation (s)</span>
                    <span className="block text-xl font-extrabold text-primary mt-1">{results.sampleSD.toFixed(4)}</span>
                  </div>
                  <div className="rounded-xl bg-accent/5 p-4 border border-accent/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Population Standard Deviation (σ)</span>
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
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Dataset Mean (Average)</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.mean.toFixed(4)}</span>
                  </div>
                </div>
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
