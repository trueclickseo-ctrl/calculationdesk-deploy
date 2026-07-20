'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The Algebra Calculator is a business and student solver designed to solve quadratic equations and systems of two linear equations. It parses real coefficient parameters, displays intermediate determinants, and outputs exact roots (including complex roots with imaginary components).`,
  formula: `The mathematical equations for the algebra modules are:

**1. Quadratic Equation Solver ($ax^2 + bx + c = 0$):**
- Discriminant: $D = b^2 - 4ac$
- If $D > 0$ (Two Real Roots):
  $$x_1, x_2 = \\frac{-b \\pm \\sqrt{D}}{2a}$$
- If $D = 0$ (One Repeated Root):
  $$x = \\frac{-b}{2a}$$
- If $D < 0$ (Two Complex/Imaginary Roots):
  $$x_{1,2} = \\frac{-b}{2a} \\pm i \\frac{\\sqrt{-D}}{2a}$$

**2. System of 2 Linear Equations ($a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$):**
Using Cramer's Rule:
- System Determinant: $D_s = a_1b_2 - a_2b_1$
- X Determinant: $D_x = c_1b_2 - c_2b_1$
- Y Determinant: $D_y = a_1c_2 - a_2c_1$
- Solutions:
  $$x = \\frac{D_x}{D_s}, \\quad y = \\frac{D_y}{D_s}$$ (if $D_s \\neq 0$)`,
  example: `**1. Solve $x^2 - 5x + 6 = 0$:**
- Coefficients: a = 1, b = -5, c = 6.
- Discriminant: D = (-5)^2 - 4(1)(6) = 25 - 24 = 1.
- Roots: x1 = (-(-5) + 1)/2 = 3; x2 = (-(-5) - 1)/2 = 2.

**2. Solve $2x + y = 5$ and $3x - y = 5$:**
- Coefficients: a1=2, b1=1, c1=5; a2=3, b2=-1, c2=5.
- Ds = 2(-1) - 3(1) = -5.
- Dx = 5(-1) - 5(1) = -10. Dy = 2(5) - 3(5) = -5.
- x = -10 / -5 = 2. y = -5 / -5 = 1.`,
  faqs: [
    {
      q: 'What does a discriminant of zero indicate?',
      a: 'A discriminant of zero ($b^2 - 4ac = 0$) means the quadratic equation has exactly one real, repeating root. The vertex of the parabola lies directly on the x-axis.',
    },
    {
      q: 'What if the linear system determinant is zero?',
      a: 'If $a_1b_2 - a_2b_1 = 0$, the two lines are parallel. They either never intersect (no solution) or lie directly on top of each other (infinitely many solutions).',
    },
    {
      q: 'Does this calculator handle complex roots?',
      a: 'Yes. If the quadratic discriminant is negative, standard square roots yield imaginary values. The calculator separates the real and imaginary parts to output the root in standard complex notation: $a \\pm bi$.',
    },
  ],
};

type AlgebraTab = 'quadratic' | 'linear';

interface QuadRealDistinct {
  type: 'real-distinct';
  D: number;
  x1: number;
  x2: number;
}
interface QuadRealRepeated {
  type: 'real-repeated';
  D: number;
  x: number;
}
interface QuadComplex {
  type: 'complex';
  D: number;
  real: number;
  imag: number;
}
type QuadResults = QuadRealDistinct | QuadRealRepeated | QuadComplex;

interface LinearUnique {
  type: 'unique';
  Ds: number;
  Dx: number;
  Dy: number;
  x: number;
  y: number;
}
interface LinearInfinite {
  type: 'infinite';
  Ds: number;
  Dx: number;
  Dy: number;
}
interface LinearNone {
  type: 'none';
  Ds: number;
  Dx: number;
  Dy: number;
}
type LinearResults = LinearUnique | LinearInfinite | LinearNone;

export default function AlgebraCalculator() {
  const [activeTab, setActiveTab] = useState<AlgebraTab>('quadratic');

  // Quadratic state (ax^2 + bx + c = 0)
  const [quadA, setQuadA] = useState<number>(1);
  const [quadB, setQuadB] = useState<number>(-5);
  const [quadC, setQuadC] = useState<number>(6);

  // Linear System state (a1x + b1y = c1, a2x + b2y = c2)
  const [linA1, setLinA1] = useState<number>(2);
  const [linB1, setLinB1] = useState<number>(1);
  const [linC1, setLinC1] = useState<number>(5);
  const [linA2, setLinA2] = useState<number>(3);
  const [linB2, setLinB2] = useState<number>(-1);
  const [linC2, setLinC2] = useState<number>(5);

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Compute Quadratic roots
  let quadResults: QuadResults | null = null;
  const isQuadValid = !isNaN(quadA) && !isNaN(quadB) && !isNaN(quadC) && quadA !== 0;
  if (activeTab === 'quadratic' && isQuadValid) {
    const D = quadB * quadB - 4 * quadA * quadC;
    if (D > 0) {
      const x1 = (-quadB + Math.sqrt(D)) / (2 * quadA);
      const x2 = (-quadB - Math.sqrt(D)) / (2 * quadA);
      quadResults = { type: 'real-distinct', D, x1, x2 };
    } else if (D === 0) {
      const x = -quadB / (2 * quadA);
      quadResults = { type: 'real-repeated', D, x };
    } else {
      const real = -quadB / (2 * quadA);
      const imag = Math.sqrt(-D) / (2 * quadA);
      quadResults = { type: 'complex', D, real, imag };
    }
  }

  // Compute Linear System solutions
  let linearResults: LinearResults | null = null;
  const isLinearValid = !isNaN(linA1) && !isNaN(linB1) && !isNaN(linC1) &&
                        !isNaN(linA2) && !isNaN(linB2) && !isNaN(linC2);
  if (activeTab === 'linear' && isLinearValid) {
    const Ds = linA1 * linB2 - linA2 * linB1;
    const Dx = linC1 * linB2 - linC2 * linB1;
    const Dy = linA1 * linC2 - linA2 * linC1;

    if (Ds === 0) {
      if (Dx === 0 && Dy === 0) {
        linearResults = { type: 'infinite', Ds, Dx, Dy };
      } else {
        linearResults = { type: 'none', Ds, Dx, Dy };
      }
    } else {
      const x = Dx / Ds;
      const y = Dy / Ds;
      linearResults = { type: 'unique', Ds, Dx, Dy, x, y };
    }
  }

  const handleCalculate = () => {
    const newErrors: Record<string, string> = {};
    if (activeTab === 'quadratic') {
      if (quadA === 0) newErrors.quadA = 'Coefficient "a" cannot be zero in a quadratic equation';
    }
    setErrors(newErrors);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCalculate();
    }
  };

  const handleReset = () => {
    if (activeTab === 'quadratic') {
      setQuadA(1);
      setQuadB(-5);
      setQuadC(6);
    } else {
      setLinA1(2);
      setLinB1(1);
      setLinC1(5);
      setLinA2(3);
      setLinB2(-1);
      setLinC2(5);
    }
    setErrors({});
  };

  return (
    <div className="space-y-8" onKeyDown={handleKeyDown}>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Equation Solver</h2>

          <div className="flex gap-1.5 mb-6 bg-background/50 border border-border p-1 rounded-xl">
            <button
              type="button"
              onClick={() => { setActiveTab('quadratic'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === 'quadratic'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Quadratic Equation
            </button>
            <button
              type="button"
              onClick={() => { setActiveTab('linear'); setErrors({}); }}
              className={`flex-1 py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                activeTab === 'linear'
                  ? 'bg-primary text-white shadow-md shadow-primary/10'
                  : 'text-foreground/60 hover:text-foreground hover:bg-border/40'
              }`}
            >
              Linear System (2 variables)
            </button>
          </div>

          <div className="space-y-5">
            {activeTab === 'quadratic' && (
              <div className="space-y-4">
                <div className="text-center font-mono text-base font-bold bg-background p-4 rounded-xl border border-border">
                  {quadA === 1 ? '' : quadA === -1 ? '-' : quadA}x² {quadB >= 0 ? `+ ${quadB}` : `- ${Math.abs(quadB)}`}x {quadC >= 0 ? `+ ${quadC}` : `- ${Math.abs(quadC)}`} = 0
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label htmlFor="quad-a" className="block text-xs font-semibold text-foreground/80 mb-1.5">Coefficient a</label>
                    <input
                      id="quad-a"
                      type="number"
                      value={quadA}
                      onChange={(e) => setQuadA(Number(e.target.value))}
                      className="block w-full py-2.5 px-3 text-sm font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                    {errors.quadA && <p className="text-[10px] text-red-500 mt-1 font-semibold">{errors.quadA}</p>}
                  </div>
                  <div>
                    <label htmlFor="quad-b" className="block text-xs font-semibold text-foreground/80 mb-1.5">Coefficient b</label>
                    <input
                      id="quad-b"
                      type="number"
                      value={quadB}
                      onChange={(e) => setQuadB(Number(e.target.value))}
                      className="block w-full py-2.5 px-3 text-sm font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                  </div>
                  <div>
                    <label htmlFor="quad-c" className="block text-xs font-semibold text-foreground/80 mb-1.5">Coefficient c</label>
                    <input
                      id="quad-c"
                      type="number"
                      value={quadC}
                      onChange={(e) => setQuadC(Number(e.target.value))}
                      className="block w-full py-2.5 px-3 text-sm font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'linear' && (
              <div className="space-y-4">
                <div className="bg-background p-4 rounded-xl border border-border space-y-1 text-center font-mono text-sm font-bold">
                  <div>{linA1}x {linB1 >= 0 ? `+ ${linB1}` : `- ${Math.abs(linB1)}`}y = {linC1}</div>
                  <div>{linA2}x {linB2 >= 0 ? `+ ${linB2}` : `- ${Math.abs(linB2)}`}y = {linC2}</div>
                </div>

                <div className="space-y-3">
                  <span className="block text-[10px] font-bold text-foreground/45 uppercase tracking-wider">Equation 1 coefficients</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="lin-a1" className="block text-[10px] font-semibold text-foreground/60 mb-1">a1</label>
                      <input
                        id="lin-a1"
                        type="number"
                        value={linA1}
                        onChange={(e) => setLinA1(Number(e.target.value))}
                        className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="lin-b1" className="block text-[10px] font-semibold text-foreground/60 mb-1">b1</label>
                      <input
                        id="lin-b1"
                        type="number"
                        value={linB1}
                        onChange={(e) => setLinB1(Number(e.target.value))}
                        className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="lin-c1" className="block text-[10px] font-semibold text-foreground/60 mb-1">c1</label>
                      <input
                        id="lin-c1"
                        type="number"
                        value={linC1}
                        onChange={(e) => setLinC1(Number(e.target.value))}
                        className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                      />
                    </div>
                  </div>

                  <span className="block text-[10px] font-bold text-foreground/45 uppercase tracking-wider pt-2">Equation 2 coefficients</span>
                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label htmlFor="lin-a2" className="block text-[10px] font-semibold text-foreground/60 mb-1">a2</label>
                      <input
                        id="lin-a2"
                        type="number"
                        value={linA2}
                        onChange={(e) => setLinA2(Number(e.target.value))}
                        className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="lin-b2" className="block text-[10px] font-semibold text-foreground/60 mb-1">b2</label>
                      <input
                        id="lin-b2"
                        type="number"
                        value={linB2}
                        onChange={(e) => setLinB2(Number(e.target.value))}
                        className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label htmlFor="lin-c2" className="block text-[10px] font-semibold text-foreground/60 mb-1">c2</label>
                      <input
                        id="lin-c2"
                        type="number"
                        value={linC2}
                        onChange={(e) => setLinC2(Number(e.target.value))}
                        className="block w-full py-2 px-2.5 text-xs font-semibold rounded-lg border border-border bg-background outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-3 pt-4 border-t border-border">
              <button
                type="button"
                onClick={handleCalculate}
                className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm"
              >
                Solve Algebra
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
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Solved Output</h2>
            
            {activeTab === 'quadratic' && (
              quadResults ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">Discriminant (D)</span>
                    <span className="block text-xl font-extrabold text-primary mt-1">{quadResults.D.toLocaleString()}</span>
                  </div>

                  {quadResults.type === 'real-distinct' && (
                    <div className="space-y-3">
                      <div className="rounded-xl bg-background p-4 border border-border">
                        <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Root x1</span>
                        <span className="block text-lg font-bold text-foreground mt-1">{quadResults.x1.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                      </div>
                      <div className="rounded-xl bg-background p-4 border border-border">
                        <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Root x2</span>
                        <span className="block text-lg font-bold text-foreground mt-1">{quadResults.x2.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                      </div>
                    </div>
                  )}

                  {quadResults.type === 'real-repeated' && (
                    <div className="rounded-xl bg-background p-4 border border-border">
                      <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Single Repeated Root x</span>
                      <span className="block text-lg font-bold text-foreground mt-1">{quadResults.x.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                    </div>
                  )}

                  {quadResults.type === 'complex' && (
                    <div className="space-y-3">
                      <div className="rounded-xl bg-background p-4 border border-border">
                        <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Root x1</span>
                        <span className="block text-base font-bold text-foreground mt-1">
                          {quadResults.real.toFixed(4)} + {quadResults.imag.toFixed(4)}i
                        </span>
                      </div>
                      <div className="rounded-xl bg-background p-4 border border-border">
                        <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Root x2</span>
                        <span className="block text-base font-bold text-foreground mt-1">
                          {quadResults.real.toFixed(4)} - {quadResults.imag.toFixed(4)}i
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter non-zero value for &quot;a&quot;.</div>
              )
            )}

            {activeTab === 'linear' && (
              linearResults ? (
                <div className="space-y-4">
                  <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                    <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">System Determinant (Ds)</span>
                    <span className="block text-lg font-extrabold text-primary mt-1">{linearResults.Ds.toLocaleString()}</span>
                  </div>

                  {linearResults.type === 'unique' && (
                    <div className="space-y-3">
                      <div className="rounded-xl bg-background p-4 border border-border">
                        <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Variable x</span>
                        <span className="block text-lg font-bold text-foreground mt-1">{linearResults.x.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                      </div>
                      <div className="rounded-xl bg-background p-4 border border-border">
                        <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">Variable y</span>
                        <span className="block text-lg font-bold text-foreground mt-1">{linearResults.y.toLocaleString(undefined, { maximumFractionDigits: 6 })}</span>
                      </div>
                    </div>
                  )}

                  {linearResults.type === 'infinite' && (
                    <div className="rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 text-emerald-600 dark:text-emerald-500 text-xs font-semibold">
                      The equations represent the same line. There are infinitely many solution points.
                    </div>
                  )}

                  {linearResults.type === 'none' && (
                    <div className="rounded-xl border border-red-500/20 bg-red-500/5 p-4 text-red-600 dark:text-red-500 text-xs font-semibold">
                      The equations represent parallel lines. There is no solution point.
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter valid parameters.</div>
              )
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
