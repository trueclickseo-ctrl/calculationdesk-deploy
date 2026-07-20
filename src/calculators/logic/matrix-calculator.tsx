'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Matrix Calculator is an advanced mathematical utility that performs operations on 2x2 and 3x3 matrices. It calculates matrix sums, differences, cross multiplications, determinants, transposes, and matrix inverses.`,
  formula: `Matrix operations use these linear algebra formulas:

**1. Determinant of a 2x2 Matrix:**
$$|A| = a_{11}a_{22} - a_{12}a_{21}$$

**2. Inverse of a 2x2 Matrix:**
$$A^{-1} = \\frac{1}{|A|} \\begin{pmatrix} a_{22} & -a_{12} \\\\ -a_{21} & a_{11} \\end{pmatrix}$$

**3. Determinant of a 3x3 Matrix:**
$$|A| = a_{11}(a_{22}a_{33} - a_{23}a_{32}) - a_{12}(a_{21}a_{33} - a_{23}a_{31}) + a_{13}(a_{21}a_{32} - a_{22}a_{31})$$`,
  example: `Suppose Matrix A is:
$$A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$$

1. Determinant of A = 1(4) - 2(3) = 4 - 6 = **-2**.
2. Transpose of A =
$$\\begin{pmatrix} 1 & 3 \\\\ 2 & 4 \\end{pmatrix}$$
3. Inverse of A =
$$-0.5 \\times \\begin{pmatrix} 4 & -2 \\\\ -3 & 1 \\end{pmatrix} = \\begin{pmatrix} -2 & 1 \\\\ 1.5 & -0.5 \\end{pmatrix}$$`,
  faqs: [
    {
      q: 'What is a singular matrix?',
      a: 'A singular matrix is a matrix with a determinant of exactly zero. Singular matrices do not have a multiplicative inverse ($A^{-1}$ is undefined).',
    },
    {
      q: 'Does Matrix multiplication order matter?',
      a: 'Yes. Matrix multiplication is non-commutative, meaning $A \\times B \\neq B \\times A$ in general.',
    },
    {
      q: 'How is a matrix transpose calculated?',
      a: 'A transpose is calculated by swapping rows with columns. The element at row $i$ and column $j$ moves to row $j$ and column $i$.',
    },
  ],
};

type Dimension = 2 | 3;
type Matrix = number[][];

interface MatrixResult {
  type: 'matrix';
  mat: Matrix;
}
interface ScalarResult {
  type: 'scalar';
  val: number;
}
interface ErrorResult {
  type: 'error';
  msg: string;
}
type MatrixCalculatorResults = MatrixResult | ScalarResult | ErrorResult;

export default function MatrixCalculator() {
  const [dim, setDim] = useState<Dimension>(2);
  const [op, setOp] = useState<string>('*');

  // Matrix A (default values)
  const [matA, setMatA] = useState<Matrix>([
    [1, 2, 0],
    [3, 4, 0],
    [0, 0, 1]
  ]);

  // Matrix B (default values)
  const [matB, setMatB] = useState<Matrix>([
    [2, 0, 0],
    [1, 2, 0],
    [0, 0, 1]
  ]);

  const handleUpdateVal = (matrix: 'A' | 'B', row: number, col: number, val: number) => {
    if (matrix === 'A') {
      const copy = matA.map((r, rIdx) => r.map((c, cIdx) => (rIdx === row && cIdx === col ? val : c)));
      setMatA(copy);
    } else {
      const copy = matB.map((r, rIdx) => r.map((c, cIdx) => (rIdx === row && cIdx === col ? val : c)));
      setMatB(copy);
    }
  };

  const handleReset = () => {
    setMatA([
      [1, 2, 0],
      [3, 4, 0],
      [0, 0, 1]
    ]);
    setMatB([
      [2, 0, 0],
      [1, 2, 0],
      [0, 0, 1]
    ]);
  };

  // Computations
  let results: MatrixCalculatorResults | null = null;

  const getDet2x2 = (m: Matrix) => m[0][0] * m[1][1] - m[0][1] * m[1][0];
  const getDet3x3 = (m: Matrix) => {
    return m[0][0] * (m[1][1] * m[2][2] - m[1][2] * m[2][1]) -
           m[0][1] * (m[1][0] * m[2][2] - m[1][2] * m[2][0]) +
           m[0][2] * (m[1][0] * m[2][1] - m[1][1] * m[2][0]);
  };

  const invert2x2 = (m: Matrix): Matrix | null => {
    const det = getDet2x2(m);
    if (det === 0) return null;
    const invDet = 1 / det;
    return [
      [m[1][1] * invDet, -m[0][1] * invDet, 0],
      [-m[1][0] * invDet, m[0][0] * invDet, 0],
      [0, 0, 0]
    ];
  };

  const invert3x3 = (m: Matrix): Matrix | null => {
    const det = getDet3x3(m);
    if (det === 0) return null;
    const invDet = 1 / det;

    const c00 = m[1][1] * m[2][2] - m[1][2] * m[2][1];
    const c01 = -(m[1][0] * m[2][2] - m[1][2] * m[2][0]);
    const c02 = m[1][0] * m[2][1] - m[1][1] * m[2][0];

    const c10 = -(m[0][1] * m[2][2] - m[0][2] * m[2][1]);
    const c11 = m[0][0] * m[2][2] - m[0][2] * m[2][0];
    const c12 = -(m[0][0] * m[2][1] - m[0][1] * m[2][0]);

    const c20 = m[0][1] * m[1][2] - m[0][2] * m[1][1];
    const c21 = -(m[0][0] * m[1][2] - m[0][2] * m[1][0]);
    const c22 = m[0][0] * m[1][1] - m[0][1] * m[1][0];

    // Transpose of cofactor matrix (adjugate)
    return [
      [c00 * invDet, c10 * invDet, c20 * invDet],
      [c01 * invDet, c11 * invDet, c21 * invDet],
      [c02 * invDet, c12 * invDet, c22 * invDet]
    ];
  };

  if (dim === 2) {
    if (op === '+') {
      const mat = [
        [matA[0][0] + matB[0][0], matA[0][1] + matB[0][1]],
        [matA[1][0] + matB[1][0], matA[1][1] + matB[1][1]]
      ];
      results = { type: 'matrix', mat };
    } else if (op === '-') {
      const mat = [
        [matA[0][0] - matB[0][0], matA[0][1] - matB[0][1]],
        [matA[1][0] - matB[1][0], matA[1][1] - matB[1][1]]
      ];
      results = { type: 'matrix', mat };
    } else if (op === '*') {
      const mat = [
        [
          matA[0][0] * matB[0][0] + matA[0][1] * matB[1][0],
          matA[0][0] * matB[0][1] + matA[0][1] * matB[1][1]
        ],
        [
          matA[1][0] * matB[0][0] + matA[1][1] * matB[1][0],
          matA[1][0] * matB[0][1] + matA[1][1] * matB[1][1]
        ]
      ];
      results = { type: 'matrix', mat };
    } else if (op === 'det') {
      results = { type: 'scalar', val: getDet2x2(matA) };
    } else if (op === 'trans') {
      const mat = [
        [matA[0][0], matA[1][0]],
        [matA[0][1], matA[1][1]]
      ];
      results = { type: 'matrix', mat };
    } else if (op === 'inv') {
      const mat = invert2x2(matA);
      results = mat ? { type: 'matrix', mat } : { type: 'error', msg: 'Matrix is singular (det = 0). No inverse exists.' };
    }
  } else {
    // 3x3
    if (op === '+') {
      const mat = matA.map((r, rIdx) => r.map((c, cIdx) => c + matB[rIdx][cIdx]));
      results = { type: 'matrix', mat };
    } else if (op === '-') {
      const mat = matA.map((r, rIdx) => r.map((c, cIdx) => c - matB[rIdx][cIdx]));
      results = { type: 'matrix', mat };
    } else if (op === '*') {
      const mat = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          mat[i][j] = matA[i][0] * matB[0][j] + matA[i][1] * matB[1][j] + matA[i][2] * matB[2][j];
        }
      }
      results = { type: 'matrix', mat };
    } else if (op === 'det') {
      results = { type: 'scalar', val: getDet3x3(matA) };
    } else if (op === 'trans') {
      const mat = [
        [matA[0][0], matA[1][0], matA[2][0]],
        [matA[0][1], matA[1][1], matA[2][1]],
        [matA[0][2], matA[1][2], matA[2][2]]
      ];
      results = { type: 'matrix', mat };
    } else if (op === 'inv') {
      const mat = invert3x3(matA);
      results = mat ? { type: 'matrix', mat: mat.slice(0, 3) } : { type: 'error', msg: 'Matrix is singular (det = 0). No inverse exists.' };
    }
  }

  const isUnary = ['det', 'trans', 'inv'].includes(op);

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-8 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Matrix Arrays</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset
            </button>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <span className="block text-xs font-semibold text-foreground/80 mb-2">Dimension</span>
              <div className="flex gap-2">
                {[2, 3].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDim(d as Dimension)}
                    className={`flex-1 py-2 text-xs font-bold rounded-lg border cursor-pointer transition-all ${
                      dim === d
                        ? 'border-primary bg-primary/5 text-primary'
                        : 'border-border bg-background hover:bg-border text-foreground/70'
                    }`}
                  >
                    {d}x{d}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="block text-xs font-semibold text-foreground/80 mb-2">Operation</span>
              <select
                value={op}
                onChange={(e) => setOp(e.target.value)}
                className="block w-full py-2 px-3 border border-border bg-background rounded-lg text-xs font-bold focus:border-primary outline-none"
              >
                <option value="*">A × B (Multiplication)</option>
                <option value="+">A + B (Addition)</option>
                <option value="-">A - B (Subtraction)</option>
                <option value="det">det(A) (Determinant)</option>
                <option value="trans">Aᵀ (Transpose)</option>
                <option value="inv">A⁻¹ (Inverse)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-border">
            {/* Matrix A */}
            <div>
              <span className="block text-sm font-bold text-foreground/80 mb-3 text-center">Matrix A</span>
              <div className="flex flex-col gap-2 max-w-[200px] mx-auto">
                {Array.from({ length: dim }).map((_, rIdx) => (
                  <div key={rIdx} className="flex gap-2">
                    {Array.from({ length: dim }).map((_, cIdx) => (
                      <input
                        key={cIdx}
                        type="number"
                        value={matA[rIdx][cIdx]}
                        onChange={(e) => handleUpdateVal('A', rIdx, cIdx, Number(e.target.value))}
                        className="w-12 h-10 border border-border bg-background rounded-lg text-center text-xs font-bold outline-none focus:border-primary"
                      />
                    ))}
                  </div>
                ))}
              </div>
            </div>

            {/* Matrix B (only if binary operation) */}
            {!isUnary ? (
              <div>
                <span className="block text-sm font-bold text-foreground/80 mb-3 text-center">Matrix B</span>
                <div className="flex flex-col gap-2 max-w-[200px] mx-auto">
                  {Array.from({ length: dim }).map((_, rIdx) => (
                    <div key={rIdx} className="flex gap-2">
                      {Array.from({ length: dim }).map((_, cIdx) => (
                        <input
                          key={cIdx}
                          type="number"
                          value={matB[rIdx][cIdx]}
                          onChange={(e) => handleUpdateVal('B', rIdx, cIdx, Number(e.target.value))}
                          className="w-12 h-10 border border-border bg-background rounded-lg text-center text-xs font-bold outline-none focus:border-primary"
                        />
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center text-xs text-foreground/40 font-semibold italic text-center p-4">
                Unary operation selected. Matrix B values will not be used in calculation.
              </div>
            )}
          </div>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-4 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Result Outcome</h2>
            {results ? (
              <div className="space-y-5">
                {results.type === 'scalar' && (
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                      Result Determinant Value
                    </span>
                    <span className="block text-3xl font-extrabold text-primary mt-1">
                      {results.val.toLocaleString(undefined, { maximumFractionDigits: 6 })}
                    </span>
                  </div>
                )}

                {results.type === 'error' && (
                  <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-red-600 dark:text-red-500 text-xs font-semibold">
                    {results.msg}
                  </div>
                )}

                {results.type === 'matrix' && (
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider mb-3">
                      Output Matrix Array
                    </span>
                    <div className="flex flex-col gap-2 max-w-[200px]">
                      {results.mat.slice(0, dim).map((row: number[], rIdx: number) => (
                        <div key={rIdx} className="flex gap-2">
                          {row.slice(0, dim).map((val: number, cIdx: number) => (
                            <div
                              key={cIdx}
                              className="w-12 h-10 rounded-lg border border-primary/20 bg-background flex items-center justify-center text-xs font-extrabold text-foreground"
                            >
                              {val.toLocaleString(undefined, { maximumFractionDigits: 3 })}
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter values to view result.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
