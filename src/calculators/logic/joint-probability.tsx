'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Joint Probability Calculator computes intersection (AND) and union (OR) probabilities for independent, mutually exclusive, or dependent events.`,
  formula: `Compound event formulas rely on conditional relationship styles:

**1. Probability of A and B (Intersection, $P(A \\cap B)$):**
- Independent:
  $$P(A \\cap B) = P(A) \\times P(B)$$
- Mutually Exclusive:
  $$P(A \\cap B) = 0$$
- Dependent:
  $$P(A \\cap B) = P(A) \\times P(B|A)$$

**2. Probability of A or B (Union, $P(A \\cup B)$):**
- Independent or Dependent:
  $$P(A \\cup B) = P(A) + P(B) - P(A \\cap B)$$
- Mutually Exclusive:
  $$P(A \\cup B) = P(A) + P(B)$$`,
  example: `**For independent events where P(A) = 0.50 and P(B) = 0.40:**
- $P(A \\text{ and } B) = 0.50 \\times 0.40 = \\mathbf{0.20}$ (20% chance).
- $P(A \\text{ or } B) = 0.50 + 0.40 - 0.20 = \\mathbf{0.70}$ (70% chance).`,
  faqs: [
    {
      q: 'What are independent events?',
      a: 'Independent events are occurrences where the outcome of the first event does not influence the probability of the second event (e.g. flipping a coin twice).',
    },
    {
      q: 'What does mutually exclusive mean?',
      a: 'Mutually exclusive events cannot occur at the same time. For example, rolling a single die cannot result in both a 3 and a 4 simultaneously. Their joint probability is always zero.',
    },
    {
      q: 'How does conditional dependency affect joint probability?',
      a: 'When events are dependent, the occurrence of Event A changes the likelihood of Event B. We must multiply P(A) by the conditional probability P(B|A) to find the joint probability.',
    },
  ],
};

export default function JointProbabilityCalculator() {
  const [pA, setPA] = useState<number>(50); // %
  const [pB, setPB] = useState<number>(40); // %
  const [relation, setRelation] = useState<string>('independent');
  const [pBGivenA, setPBGivenA] = useState<number>(60); // % P(B|A)
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleReset = () => {
    setPA(50);
    setPB(40);
    setRelation('independent');
    setPBGivenA(60);
    setErrors({});
  };

  // Computations
  let results = null;
  const isValid = !isNaN(pA) && pA >= 0 && pA <= 100 &&
                  !isNaN(pB) && pB >= 0 && pB <= 100 &&
                  (!isNaN(pBGivenA) && pBGivenA >= 0 && pBGivenA <= 100);

  if (isValid) {
    const valA = pA / 100;
    const valB = pB / 100;
    const valBGivenA = pBGivenA / 100;

    let andProb = 0;
    let orProb = 0;

    if (relation === 'independent') {
      andProb = valA * valB;
      orProb = valA + valB - andProb;
    } else if (relation === 'mutually-exclusive') {
      andProb = 0;
      orProb = Math.min(1, valA + valB);
    } else {
      // Dependent
      andProb = valA * valBGivenA;
      orProb = valA + valB - andProb;
    }

    results = {
      andProb: andProb * 100,
      orProb: orProb * 100,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (pA < 0 || pA > 100 || isNaN(pA)) newErrors.pA = 'Probability must be between 0% and 100%';
    if (pB < 0 || pB > 100 || isNaN(pB)) newErrors.pB = 'Probability must be between 0% and 100%';
    if (relation === 'dependent' && (pBGivenA < 0 || pBGivenA > 100 || isNaN(pBGivenA))) {
      newErrors.pBGivenA = 'Conditional probability must be between 0% and 100%';
    }
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
          <h2 className="text-xl font-bold text-foreground mb-6">Probability parameters</h2>

          <div className="space-y-5">
            <div>
              <label htmlFor="pA-val" className="block text-sm font-semibold text-foreground/80 mb-2">Probability of Event A, P(A) %</label>
              <input
                id="pA-val"
                type="number"
                value={pA}
                onChange={(e) => { setPA(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.pA && <p className="text-xs text-red-500 mt-1 font-medium">{errors.pA}</p>}
            </div>

            <div>
              <label htmlFor="pB-val" className="block text-sm font-semibold text-foreground/80 mb-2">Probability of Event B, P(B) %</label>
              <input
                id="pB-val"
                type="number"
                value={pB}
                onChange={(e) => { setPB(Number(e.target.value)); setErrors({}); }}
                className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
              />
              {errors.pB && <p className="text-xs text-red-500 mt-1 font-medium">{errors.pB}</p>}
            </div>

            <div>
              <label htmlFor="relation-format" className="block text-sm font-semibold text-foreground/80 mb-2">Event Relationship</label>
              <select
                id="relation-format"
                value={relation}
                onChange={(e) => { setRelation(e.target.value); setErrors({}); }}
                className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer"
              >
                <option value="independent">Independent (Default)</option>
                <option value="mutually-exclusive">Mutually Exclusive</option>
                <option value="dependent">Dependent (Conditional)</option>
              </select>
            </div>

            {relation === 'dependent' && (
              <div>
                <label htmlFor="conditional-val" className="block text-sm font-semibold text-foreground/80 mb-2">Conditional P(B|A) %</label>
                <input
                  id="conditional-val"
                  type="number"
                  value={pBGivenA}
                  onChange={(e) => { setPBGivenA(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
                {errors.pBGivenA && <p className="text-xs text-red-500 mt-1 font-medium">{errors.pBGivenA}</p>}
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Joint Probability
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
            <h2 className="text-xl font-bold text-foreground mb-6">Joint Probabilities</h2>

            {results ? (
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">P(A and B) [Intersection]</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {results.andProb.toFixed(2)}%
                    </span>
                  </div>
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider font-mono">P(A or B) [Union]</span>
                    <span className="block text-2xl font-extrabold text-primary mt-1">
                      {results.orProb.toFixed(2)}%
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter probability settings.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
