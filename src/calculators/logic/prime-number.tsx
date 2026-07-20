'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Prime Number Checker verifies if a given positive integer is prime (divisible only by 1 and itself) or composite. It also returns the list of all prime factors, prime exponent representations, and identifies the adjacent prime numbers.`,
  formula: `Primality checking applies trial division algorithms up to the square root boundary:

**1. Primality Check:**
- If $N \\le 1$: Not prime.
- If $N = 2$ or $N = 3$: Prime.
- If $N \\pmod 2 = 0$ or $N \\pmod 3 = 0$: Not prime (composite).
- For $i = 5$ to $\\sqrt{N}$ in steps of 6:
  - If $N \\pmod i = 0$ or $N \\pmod{i + 2} = 0$: Not prime.
- Else: Prime.

**2. Prime Factorization:**
- Divide out factors starting from 2, then odd numbers up to $\\sqrt{N}$, keeping count of repetitions.`,
  example: `Suppose you enter the number: **45**.

1. 45 is not prime because it is divisible by 3 and 5 ($45 = 3^2 \\times 5^1$).
2. Prime factorization:
   $$45 = 3 \\times 3 \\times 5 = 3^2 \\times 5^1$$
3. Nearest lower prime = **43**.
4. Nearest higher prime = **47**.`,
  faqs: [
    {
      q: 'What is a prime number?',
      a: 'A prime number is a whole number greater than 1 whose only positive divisors are 1 and itself (e.g., 2, 3, 5, 7, 11, etc.).',
    },
    {
      q: 'Is 1 a prime number?',
      a: 'No. By mathematical definition, 1 is classified as neither a prime nor a composite number. It is a multiplicative identity (unit).',
    },
    {
      q: 'Why is 2 a unique prime number?',
      a: '2 is the smallest prime number and the only even prime number in existence, as all other even numbers are divisible by 2.',
    },
  ],
};

function isPrime(n: number): boolean {
  if (n <= 1) return false;
  if (n <= 3) return true;
  if (n % 2 === 0 || n % 3 === 0) return false;
  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}

function getPrimeFactors(n: number): Record<number, number> {
  const factors: Record<number, number> = {};
  let temp = n;

  // factor out 2s
  while (temp % 2 === 0) {
    factors[2] = (factors[2] || 0) + 1;
    temp /= 2;
  }

  // factor out odd primes
  for (let i = 3; i * i <= temp; i += 2) {
    while (temp % i === 0) {
      factors[i] = (factors[i] || 0) + 1;
      temp /= i;
    }
  }

  if (temp > 1) {
    factors[temp] = (factors[temp] || 0) + 1;
  }

  return factors;
}

export default function PrimeNumberChecker() {
  const [val, setVal] = useState<number>(17);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const isValid = !isNaN(val) && val > 0 && val <= 10000000;

  let results = null;
  if (isValid) {
    const primeStatus = isPrime(val);
    const factors = getPrimeFactors(val);

    // Find next prime
    let next = val + 1;
    while (!isPrime(next)) {
      next++;
    }

    // Find prev prime
    let prev = 0;
    if (val > 2) {
      prev = val - 1;
      while (prev > 1 && !isPrime(prev)) {
        prev--;
      }
    }

    results = {
      primeStatus,
      factors,
      next,
      prev: prev > 1 ? prev : null,
    };
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (isNaN(val) || val <= 0 || val > 10000000) {
      newErrors.val = 'Please enter a positive integer between 1 and 10,000,000';
    }
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    setVal(17);
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-6 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Integer</h2>
          
          <div className="space-y-5">
            <div>
              <label htmlFor="prime-val" className="block text-sm font-semibold text-foreground/80 mb-2">
                Enter Integer to Check
              </label>
              <div className="relative rounded-xl border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                <input
                  id="prime-val"
                  type="number"
                  value={val || ''}
                  onChange={(e) => { setVal(Number(e.target.value)); setErrors({}); }}
                  className="block w-full py-3 px-4 text-sm font-medium outline-none bg-transparent"
                />
              </div>
              {errors.val && <p className="text-xs text-red-500 mt-1 font-medium">{errors.val}</p>}
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Check Primality
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
            <h2 className="text-xl font-bold text-foreground mb-6">Primality Output</h2>
            {results ? (
              <div className="space-y-5">
                <div className={`rounded-xl p-4 border ${
                  results.primeStatus ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-600 dark:text-emerald-500' : 'bg-amber-500/5 border-amber-500/20 text-amber-600 dark:text-amber-500'
                }`}>
                  <span className="block text-xs font-bold uppercase tracking-wider opacity-60">Status</span>
                  <span className="block text-2xl font-extrabold mt-1">
                    {val} is {results.primeStatus ? 'a Prime Number' : 'a Composite Number'}
                  </span>
                </div>

                {!results.primeStatus && (
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider mb-2">Prime Factorization</span>
                    <span className="block text-sm font-semibold text-foreground/80 leading-relaxed font-mono">
                      {Object.keys(results.factors).map(f => {
                        const base = Number(f);
                        const exp = results.factors[base];
                        return exp > 1 ? `${base}^${exp}` : `${base}`;
                      }).join(' × ')}
                    </span>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Previous Prime</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.prev || 'None'}</span>
                  </div>
                  <div className="rounded-xl bg-background p-4 border border-border">
                    <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Next Prime</span>
                    <span className="block text-base font-bold text-foreground mt-1">{results.next}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter an integer to view outputs.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
