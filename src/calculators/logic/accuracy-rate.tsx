'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Accuracy Calculator evaluates binary classification models by computing scores for overall accuracy, precision, recall (sensitivity), specificity, and F1-score.`,
  formula: `Model indices use confusion matrix metrics:

**1. Accuracy:**
$$\\text{Accuracy} = \\frac{TP + TN}{TP + TN + FP + FN}$$

**2. Precision:**
$$\\text{Precision} = \\frac{TP}{TP + FP}$$

**3. Recall (Sensitivity):**
$$\\text{Recall} = \\frac{TP}{TP + FN}$$

**4. Specificity:**
$$\\text{Specificity} = \\frac{TN}{TN + FP}$$

**5. F1-Score:**
$$F_1 = 2 \\times \\frac{\\text{Precision} \\times \\text{Recall}}{\\text{Precision} + \\text{Recall}}$$`,
  example: `**For a confusion matrix with TP = 80, TN = 10, FP = 5, FN = 5:**
- Accuracy = (80 + 10) / (80 + 10 + 5 + 5) = 90 / 100 = **90.0%**.
- Precision = 80 / (80 + 5) = 80 / 85 = **94.1%**.
- Recall = 80 / (80 + 5) = 80 / 85 = **94.1%**.
- Specificity = 10 / (10 + 5) = 10 / 15 = **66.7%**.
- F1-Score = 2 × (0.941 × 0.941) / (0.941 + 0.941) = **94.1%**.`,
  faqs: [
    {
      q: 'What is a confusion matrix?',
      a: 'A confusion matrix is a table layout that visualizes the performance of a supervised classification model. It maps the true classes (positive/negative) against predicted classes.',
    },
    {
      q: 'Why isn’t accuracy always a good metric?',
      a: 'In imbalanced datasets (e.g. diagnosing rare diseases where 99% of people are negative), a model that predicts everyone is negative achieves 99% accuracy but has 0% recall. F1-score and recall are better in these cases.',
    },
    {
      q: 'What is the F1-Score?',
      a: 'The F1-score is the harmonic mean of precision and recall. It balances the trade-off between the two, providing a single rating of classification quality.',
    },
  ],
};

export default function AccuracyCalculator() {
  const [tp, setTp] = useState<number>(80);
  const [tn, setTn] = useState<number>(10);
  const [fp, setFp] = useState<number>(5);
  const [fn, setFn] = useState<number>(5);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setTp(80);
    setTn(10);
    setFp(5);
    setFn(5);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(tp) && tp >= 0 &&
                  !isNaN(tn) && tn >= 0 &&
                  !isNaN(fp) && fp >= 0 &&
                  !isNaN(fn) && fn >= 0 &&
                  (tp + tn + fp + fn) > 0;

  if (isValid) {
    const total = tp + tn + fp + fn;
    const accuracy = ((tp + tn) / total) * 100;
    
    const precision = tp + fp > 0 ? (tp / (tp + fp)) * 100 : 0;
    const recall = tp + fn > 0 ? (tp / (tp + fn)) * 100 : 0;
    const specificity = tn + fp > 0 ? (tn / (tn + fp)) * 100 : 0;

    const precDec = precision / 100;
    const recDec = recall / 100;
    const f1Score = (precDec + recDec) > 0 ? (2 * (precDec * recDec) / (precDec + recDec)) * 100 : 0;

    results = {
      accuracy,
      precision,
      recall,
      specificity,
      f1Score,
      total,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (tp < 0 || isNaN(tp)) newErrors.tp = 'Value cannot be negative';
    if (tn < 0 || isNaN(tn)) newErrors.tn = 'Value cannot be negative';
    if (fp < 0 || isNaN(fp)) newErrors.fp = 'Value cannot be negative';
    if (fn < 0 || isNaN(fn)) newErrors.fn = 'Value cannot be negative';
    if (tp + tn + fp + fn === 0) newErrors.tp = 'Sum of all matrix scores must be greater than zero';
    setErrors(newErrors);
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
          <h2 className="text-xl font-bold text-foreground mb-6">Confusion Matrix Counts</h2>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="tp-val" className="block text-xs font-bold text-foreground/80 mb-2 uppercase tracking-wider">True Positives (TP)</label>
                <input
                  id="tp-val"
                  type="number"
                  value={tp}
                  onChange={(e) => { setTp(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.tp && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tp}</p>}
              </div>

              <div>
                <label htmlFor="tn-val" className="block text-xs font-bold text-foreground/80 mb-2 uppercase tracking-wider">True Negatives (TN)</label>
                <input
                  id="tn-val"
                  type="number"
                  value={tn}
                  onChange={(e) => { setTn(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.tn && <p className="text-xs text-red-500 mt-1 font-medium">{errors.tn}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="fp-val" className="block text-xs font-bold text-foreground/80 mb-2 uppercase tracking-wider">False Positives (FP)</label>
                <input
                  id="fp-val"
                  type="number"
                  value={fp}
                  onChange={(e) => { setFp(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.fp && <p className="text-xs text-red-500 mt-1 font-medium">{errors.fp}</p>}
              </div>

              <div>
                <label htmlFor="fn-val" className="block text-xs font-bold text-foreground/80 mb-2 uppercase tracking-wider">False Negatives (FN)</label>
                <input
                  id="fn-val"
                  type="number"
                  value={fn}
                  onChange={(e) => { setFn(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.fn && <p className="text-xs text-red-500 mt-1 font-medium">{errors.fn}</p>}
              </div>
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Model
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
            <h2 className="text-xl font-bold text-foreground mb-6">Model evaluation</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Classification Accuracy</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.accuracy.toFixed(2)}%
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Evaluated from {results.total.toLocaleString()} total sample tests
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Precision (PPV)</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.precision.toFixed(2)}%</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Recall / Sensitivity</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.recall.toFixed(2)}%</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Specificity (TNR)</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.specificity.toFixed(2)}%</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">F1-Score</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.f1Score.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter confusion matrix variables.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
