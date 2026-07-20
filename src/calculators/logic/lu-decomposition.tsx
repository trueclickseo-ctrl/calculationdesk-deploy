'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Decompose a 2x2 matrix into Lower (L) and Upper (U) triangular matrices.',
  formula: '$$A = L \\times U$$',
  example: 'Matrix [[4, 3], [6, 3]] factors to L=[[1, 0], [1.5, 1]] and U=[[4, 3], [0, -1.5]].',
  faqs: [{ q: 'What is LU decomposition?', a: 'An algebraic factorization method representing a matrix as the product of lower and upper triangular components.' }]
};

export default function LuDecomposition() {
  const [a11, setA11] = useState<number>(4);
  const [a12, setA12] = useState<number>(3);
  const [a21, setA21] = useState<number>(6);
  const [a22, setA22] = useState<number>(3);
  const [result, setResult] = useState<any>(null);

  const handleReset = () => { setA11(4); setA12(3); setA21(6); setA22(3); setResult(null); };
  const handleCalculate = () => {
    // A = [[a11, a12], [a21, a22]]
    // L = [[1, 0], [l21, 1]]
    // U = [[u11, u12], [0, u22]]
    const u11 = a11;
    const u12 = a12;
    const l21 = a21 / u11;
    const u22 = a22 - l21 * u12;

    setResult({ l21, u11, u12, u22 });
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">2x2 Matrix elements</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">A11</label>
                <input type="number" value={a11} onChange={e => setA11(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">A12</label>
                <input type="number" value={a12} onChange={e => setA12(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">A21</label>
                <input type="number" value={a21} onChange={e => setA21(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">A22</label>
                <input type="number" value={a22} onChange={e => setA22(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80 text-center" />
              </div>
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm space-y-4">
          <h2 className="text-xl font-bold text-foreground mb-6">Decomposition Matrices</h2>
          {result ? (
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Lower Matrix (L)</span>
                <span className="block text-sm font-bold text-foreground mt-2">
                  [[1.0, 0.0], [{result.l21.toFixed(2)}, 1.0]]
                </span>
              </div>
              <div className="rounded-xl bg-background p-4 border border-border">
                <span className="block text-xs font-bold text-foreground/50 uppercase font-mono font-bold">Upper Matrix (U)</span>
                <span className="block text-sm font-bold text-foreground/80 mt-2">
                  [[{result.u11.toFixed(2)}, {result.u12.toFixed(2)}], [0.0, {result.u22.toFixed(2)}]]
                </span>
              </div>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter matrix values.</div>
          )}
        </div>
      </div>
    </div>
  );
}