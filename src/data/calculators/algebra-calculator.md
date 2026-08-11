---
title: "Algebra Calculator - Quadratic & 2-Variable Linear System Solver"
seoTitle: "Algebra Calculator - Solve Quadratic & 2-Variable Linear Equations | CalculationDesk"
metaDescription: "Free online Algebra Calculator. Solve quadratic equations ax² + bx + c = 0 and systems of 2 linear equations using real, repeated, or complex root logic."
category: "math"
subcategory: "algebra-calculators"
tags: ["algebra calculator", "quadratic equation solver", "linear system solver", "discriminant calculator", "complex roots calculator"]
priority: "high"
importance: 10
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-11"
formulaVerified: true
version: "2.1"
contentStatus: "published"
lastReviewed: "2026-08-11"
nextReviewDate: "2026-11-11"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "High organic search priority execution"
titleVariants:
  - "Algebra Calculator - Solve Quadratic & 2-Variable Linear Equations | CalculationDesk"
aiSummary:
  definition: "The Algebra Calculator solves quadratic equations ax^2 + bx + c = 0 (returning real, repeated, or complex roots) and 2-variable linear systems of equations a1x + b1y = c1 and a2x + b2y = c2 (using Cramer's Rule)."
  quickAnswer: "Solving x^2 - 5x + 6 = 0 yields discriminant D = 1 with real roots x1 = 3 and x2 = 2. Solving 2x + y = 5 and 3x - y = 5 yields x = 2 and y = 1."
  formulaSummary: "Quadratic: D = b^2 - 4ac, x = (-b +/- sqrt(D)) / 2a | Linear System (Cramer's Rule): Ds = a1b2 - a2b1, Dx = c1b2 - c2b1, Dy = a1c2 - a2c1, x = Dx/Ds, y = Dy/Ds"
  whenToUse: "Use this tool to solve quadratic equations and 2-variable linear systems with step-by-step discriminant and determinant breakdowns."
  whoShouldUse: "High school algebra students, college students, teachers, and engineers."
  limitations: "Solves quadratic equations and 2-variable systems of linear equations only — it does not solve higher-degree polynomials or systems with 3 or more variables."
  keyTakeaways:
    - "Quadratic Module computes discriminant D = b^2 - 4ac and solves real, repeated, or complex imaginary roots depending on its sign."
    - "Linear System Module uses Cramer's Rule to solve 2-variable linear systems (a1x + b1y = c1, a2x + b2y = c2)."
    - "Identifies special system conditions: single unique solution, infinitely many solutions (coincident lines), or no solution (parallel lines)."
peopleAlsoAsk:
  - "How is the quadratic discriminant D calculated?"
  - "What does a negative discriminant mean in quadratic equations?"
  - "How does Cramer's Rule solve a 2-variable system of linear equations?"
  - "What happens when a linear system determinant Ds is zero?"
examples:
  - title: "Quadratic Equation with Two Real Roots (x^2 - 5x + 6 = 0)"
    inputs: "Mode = Quadratic, a = 1, b = -5, c = 6"
    calculation: "Discriminant D = (-5)^2 - 4(1)(6) = 25 - 24 = 1. Since D > 0, x1 = (5 + sqrt(1)) / 2 = 3; x2 = (5 - sqrt(1)) / 2 = 2."
    result: "Discriminant D = 1 | Root x1 = 3 | Root x2 = 2"
  - title: "Linear System of 2 Equations (2x + y = 5, 3x - y = 5)"
    inputs: "Mode = Linear System, a1 = 2, b1 = 1, c1 = 5; a2 = 3, b2 = -1, c2 = 5"
    calculation: "Ds = 2(-1) - 3(1) = -5. Dx = 5(-1) - 5(1) = -10. Dy = 2(5) - 3(5) = -5. x = -10 / -5 = 2. y = -5 / -5 = 1."
    result: "System Determinant Ds = -5 | Variable x = 2 | Variable y = 1"
  - title: "Quadratic Equation with Complex Roots (x^2 + 2x + 5 = 0)"
    inputs: "Mode = Quadratic, a = 1, b = 2, c = 5"
    calculation: "Discriminant D = 2^2 - 4(1)(5) = 4 - 20 = -16. Since D < 0, the roots are complex: Real Part = -2 / (2 x 1) = -1. Imaginary Part = sqrt(16) / (2 x 1) = 4 / 2 = 2."
    result: "Discriminant D = -16 | Root x1 = -1 + 2i | Root x2 = -1 - 2i"
faqs:
  - q: "What does the quadratic discriminant D indicate?"
    a: "The discriminant D = b^2 - 4ac determines root behavior: if D > 0, there are 2 distinct real roots; if D = 0, there is 1 real repeated root; if D < 0, there are 2 complex imaginary roots (a +/- bi)."
  - q: "What does a linear system determinant Ds = 0 mean?"
    a: "When Ds = a1b2 - a2b1 = 0, the lines are parallel. If Dx = 0 and Dy = 0, the lines coincide (infinitely many solutions). If Dx is not 0 or Dy is not 0, the lines never intersect (no solution)."
  - q: "How does the calculator compute complex roots?"
    a: "When the discriminant D is negative, the calculator cannot take a real square root of it, so it computes the real part as -b / (2a) and the imaginary part as sqrt(-D) / (2a) (taking the square root of the positive value -D instead), then reports the two conjugate roots as Real Part plus or minus Imaginary Part times i, as shown in the x^2 + 2x + 5 = 0 example."
  - q: "Why does the same Cramer's Rule formula work for any 2-variable linear system?"
    a: "Cramer's Rule expresses the solution to a 2-by-2 linear system purely in terms of determinants built from the equations' coefficients, so it works for any pair of 2-variable linear equations without needing substitution or elimination steps — the calculator only needs the six coefficients (a1, b1, c1, a2, b2, c2) to compute Ds, Dx, and Dy directly."
references:
  - "https://www.mathsisfun.com/algebra/quadratic-equation.html"
formulaDescription: "In Quadratic mode, the calculator computes the discriminant D = b^2 - 4ac from the entered coefficients a, b, c, then branches on its sign: two real roots via the quadratic formula if D > 0, one repeated real root -b/(2a) if D = 0, or two complex conjugate roots (real part -b/(2a), imaginary part sqrt(-D)/(2a)) if D < 0. In Linear System mode, the calculator applies Cramer's Rule to the six coefficients of two 2-variable equations, computing three determinants (Ds, Dx, Dy) and dividing to find x and y, with special-case handling when Ds is zero."
variablesExplained:
  - name: "Discriminant (D)"
    description: "The value b^2 - 4ac in a quadratic equation, whose sign determines whether the equation has two real roots, one repeated real root, or two complex roots."
  - name: "System Determinant (Ds)"
    description: "The determinant a1*b2 - a2*b1 of a 2-variable linear system's coefficient matrix; a nonzero Ds guarantees exactly one (x, y) solution."
  - name: "Dx and Dy"
    description: "Determinants formed by replacing the x-coefficient column (for Dx) or y-coefficient column (for Dy) with the constants column; dividing each by Ds via Cramer's Rule gives the value of x and y respectively."
stepByStep: "Choose Quadratic mode and enter coefficients a, b, and c to solve ax^2 + bx + c = 0, or choose Linear System mode and enter the six coefficients of two equations a1x + b1y = c1 and a2x + b2y = c2. In Quadratic mode, the calculator computes the discriminant and returns real, repeated, or complex roots depending on its sign. In Linear System mode, it computes the three Cramer's Rule determinants and returns a unique solution, infinitely many solutions, or no solution."
realWorldUses: "Quadratic equations model projectile motion, area and optimization problems, and revenue/profit maximization in economics; 2-variable linear systems model break-even analysis, mixture problems, and any scenario requiring two unknowns to satisfy two simultaneous constraints, such as supply-and-demand equilibrium."
commonMistakes:
  - "Forgetting the sign of b when applying the quadratic formula — since D = b^2 - 4ac uses b squared, but the roots formula uses -b directly, a sign error in b changes both the discriminant computation and the final root values."
  - "Assuming a linear system with Ds = 0 always has no solution — Ds = 0 means the lines are parallel, but they could still be the exact same line (infinitely many solutions) if Dx and Dy are also both zero; only when Dx or Dy is nonzero alongside Ds = 0 does the system have no solution."
---

# Algebra Calculator – Quadratic & Linear System Guide

Solving algebraic equations requires different mathematical methods depending on whether you are analyzing a second-degree polynomial (quadratic) or a 2-variable system of linear equations. This calculator supports two dedicated algebra modules, providing complete mathematical breakdowns for discriminants, determinants, and roots.

## How the Algebra Modules Work

**Module 1: Quadratic equations** ($ax^2 + bx + c = 0$). The discriminant is $D = b^2 - 4ac$, and its sign determines the root type:

$$D > 0: \quad x_{1,2} = \frac{-b \pm \sqrt{D}}{2a} \qquad D = 0: \quad x = \frac{-b}{2a} \qquad D < 0: \quad x_{1,2} = \frac{-b}{2a} \pm i\frac{\sqrt{-D}}{2a}$$

**Module 2: System of 2 linear equations.** Solves $a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$ using Cramer's Rule:

$$D_s = a_1 b_2 - a_2 b_1 \qquad D_x = c_1 b_2 - c_2 b_1 \qquad D_y = a_1 c_2 - a_2 c_1$$

If $D_s \neq 0$: unique solution $x = D_x / D_s$, $y = D_y / D_s$. If $D_s = 0$ and both $D_x = 0$ and $D_y = 0$: infinitely many solutions (coincident lines). If $D_s = 0$ and either $D_x \neq 0$ or $D_y \neq 0$: no solution (parallel lines).

## Worked Examples

### Example 1: Quadratic Mode — Two Real Roots ($x^2 - 5x + 6 = 0$)

With $a = 1$, $b = -5$, $c = 6$: discriminant $D = (-5)^2 - 4(1)(6) = 25 - 24 = 1$. Since $D > 0$: $x_1 = (5 + \sqrt{1})/2 = 3$, and $x_2 = (5 - \sqrt{1})/2 = 2$.

### Example 2: Linear System Mode ($2x + y = 5$ and $3x - y = 5$)

With $a_1=2, b_1=1, c_1=5$ and $a_2=3, b_2=-1, c_2=5$: $D_s = 2(-1) - 3(1) = -5$, $D_x = 5(-1) - 5(1) = -10$, $D_y = 2(5) - 3(5) = -5$. So $x = -10/-5 = 2$ and $y = -5/-5 = 1$.

### Example 3: Quadratic Mode — Complex Roots ($x^2 + 2x + 5 = 0$)

With $a = 1$, $b = 2$, $c = 5$: discriminant $D = 2^2 - 4(1)(5) = 4 - 20 = -16$. Since $D < 0$, the roots are complex: real part $= -2/(2 \times 1) = -1$, imaginary part $= \sqrt{16}/(2 \times 1) = 2$. The roots are $x_{1,2} = -1 \pm 2i$.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This calculator solves single quadratic equations and 2-variable linear systems only. It does not solve cubic or higher-degree polynomials, or linear systems with 3 or more variables — for matrix-based systems, see the [Matrix Calculator](/calculators/matrix-calculator/).

## Frequently Asked Questions

### What does the quadratic discriminant D indicate?

The discriminant D = b² − 4ac determines root behavior: if D > 0, there are 2 distinct real roots; if D = 0, there is 1 real repeated root; if D < 0, there are 2 complex imaginary roots (a ± bi).

### What does a linear system determinant Ds = 0 mean?

When Ds = a1b2 − a2b1 = 0, the lines are parallel. If Dx = 0 and Dy = 0, the lines coincide (infinitely many solutions). If Dx ≠ 0 or Dy ≠ 0, the lines never intersect (no solution).

### How does the calculator compute complex roots?

When the discriminant D is negative, the calculator cannot take a real square root of it, so it computes the real part as −b / (2a) and the imaginary part as √(−D) / (2a) (taking the square root of the positive value −D instead), then reports the two conjugate roots as Real Part plus or minus Imaginary Part times i, as shown in the x² + 2x + 5 = 0 example.

### Why does the same Cramer's Rule formula work for any 2-variable linear system?

Cramer's Rule expresses the solution to a 2-by-2 linear system purely in terms of determinants built from the equations' coefficients, so it works for any pair of 2-variable linear equations without needing substitution or elimination steps — the calculator only needs the six coefficients (a1, b1, c1, a2, b2, c2) to compute Ds, Dx, and Dy directly.
