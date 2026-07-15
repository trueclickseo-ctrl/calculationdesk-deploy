'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Bayes' Theorem Calculator computes conditional probabilities, revising prior beliefs based on new evidence or test results.`,
  formula: `Bayes theorem calculates posterior probabilities from prior odds and likelihoods:

**1. Probability of Event not Occurring ($P(A^c)$):**
$$P(A^c) = 1 - P(A)$$

**2. Marginal Probability of Evidence ($P(B)$):**
$$P(B) = P(B|A)P(A) + P(B|A^c)P(A^c)$$

**3. Posterior Probability ($P(A|B)$):**
$$P(A|B) = \\frac{P(B|A)P(A)}{P(B)}$$`,
  example: `**Calculate medical test validity where a disease occurs in 1% of people ($P(A)=0.01$), the test has 99% sensitivity ($P(B|A)=0.99$), and a 5% false-positive rate ($P(B|A^c)=0.05$):**
- $P(A^c) = 0.99$.
- $P(B) = 0.99 \\times 0.01 + 0.05 \\times 0.99 = 0.0099 + 0.0495 = 0.0594$.
- $P(A|B) = 0.0099 / 0.0594 = \\mathbf{16.67\\%}$.
- *Only 16.67% of people with positive tests actually have the disease.*`,
  faqs: [
    {
      q: "What is the difference between prior and posterior probability?",
      a: 'Prior probability is the initial chance of an event before new evidence is introduced. Posterior probability is the updated chance of the event after the new evidence is observed.',
    },
    {
      q: 'Why is P(A|B) often lower than expected in diagnostic testing?',
      a: 'This is the "base rate fallacy." If a disease is rare in the general population, even a highly accurate test will generate more total false positives than true positives, dragging down the likelihood that a positive test indicates disease.',
    },
    {
      q: 'Can Bayes Theorem be used outside of medicine?',
      a: 'Yes, it is widely used in spam filters (Bayesian filtering), machine learning models, search algorithms, finance, and legal evidence evaluations.',
    },
  ],
};

export default function BayesTheoremCalculator() {
  const [prior, setPrior] = useState<number>(1.0); // P(A) %
  const [sensitivity, setSensitivity] = useState<number>(99.0); // P(B|A) %
  const [falsePos, setFalsePos] = useState<number>(5.0); // P(B|not A) %
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setPrior(1.0);
    setSensitivity(99.0);
    setFalsePos(5.0);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(prior) && prior >= 0 && prior <= 100 &&
                  !isNaN(sensitivity) && sensitivity >= 0 && sensitivity <= 100 &&
                  !isNaN(falsePos) && falsePos >= 0 && falsePos <= 100;

  if (isValid) {
    const pA = prior / 100;
    const pNotA = 1 - pA;
    const pB_A = sensitivity / 100;
    const pB_NotA = falsePos / 100;

    const pB = (pB_A * pA) + (pB_NotA * pNotA);
    const pA_B = pB > 0 ? (pB_A * pA) / pB : 0;

    results = {
      pNotA: pNotA * 100,
      pB: pB * 100,
      pA_B: pA_B * 100,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (prior < 0 || prior > 100 || isNaN(prior)) newErrors.prior = 'Must be between 0% and 100%';
    if (sensitivity < 0 || sensitivity > 100 || isNaN(sensitivity)) newErrors.sensitivity = 'Must be between 0% and 100%';
    if (falsePos < 0 || falsePos > 100 || isNaN(falsePos)) newErrors.falsePos = 'Must be between 0% and 100%';
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
          <h2 className="text-xl font-bold text-foreground mb-6">Probability Inputs</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="prior-val" className="block text-sm font-semibold text-foreground/80 mb-2">Prior Probability P(A) %</label>
              <input
                id="prior-val"
                type="number"
                step="0.01"
                value={prior}
                onChange={(e) => { setPrior(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.prior && <p className="text-xs text-red-500 mt-1 font-medium">{errors.prior}</p>}
            </div>

            <div>
              <label htmlFor="sens-val" className="block text-sm font-semibold text-foreground/80 mb-2">Likelihood P(B|A) % (Sensitivity)</label>
              <input
                id="sens-val"
                type="number"
                step="0.1"
                value={sensitivity}
                onChange={(e) => { setSensitivity(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.sensitivity && <p className="text-xs text-red-500 mt-1 font-medium">{errors.sensitivity}</p>}
            </div>

            <div>
              <label htmlFor="falsepos-val" className="block text-sm font-semibold text-foreground/80 mb-2">False Positive Rate P(B|not A) %</label>
              <input
                id="falsepos-val"
                type="number"
                step="0.1"
                value={falsePos}
                onChange={(e) => { setFalsePos(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.falsePos && <p className="text-xs text-red-500 mt-1 font-medium">{errors.falsePos}</p>}
            </div>

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Theorem
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
            <h2 className="text-xl font-bold text-foreground mb-6">Bayesian probability output</h2>

            {results ? (
              <div className="space-y-4">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10 text-center">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">Posterior Probability P(A|B)</span>
                  <span className="block text-3xl font-extrabold text-primary mt-2">
                    {results.pA_B.toFixed(3)}%
                  </span>
                  <span className="block text-xs font-semibold text-foreground/50 mt-1">
                    Chance that event A is true given positive evidence B
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Probability of Not A</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.pNotA.toFixed(2)}%</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Probability of Evidence P(B)</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.pB.toFixed(2)}%</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter probability values.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
