---
title: "Decimal to Fraction Converter - Terminating & Repeating Solver"
seoTitle: "Decimal to Fraction Converter - Convert Terminating & Repeating Decimals | CalculationDesk"
metaDescription: "Free online Decimal to Fraction Converter. Convert terminating and repeating decimals into reduced proper fractions, mixed numbers, and step-by-step math breakdowns."
category: "math"
subcategory: "fraction-calculators"
tags: ["decimal to fraction converter", "terminating decimal to fraction", "repeating decimal to fraction", "reduce fraction gcf", "mixed number converter"]
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
  - "Decimal to Fraction Converter - Convert Terminating & Repeating Decimals | CalculationDesk"
aiSummary:
  definition: "The Decimal to Fraction Converter changes terminating and repeating decimals into simplified proper or mixed fraction equivalents with exact step-by-step math."
  quickAnswer: "0.375 converts to 3/8. 0.625 converts to 5/8. 0.2 converts to 1/5. Repeating 0.333... converts to 1/3. 2.75 converts to 11/4 (or mixed 2 3/4)."
  formulaSummary: "Terminating: Num = Decimal × 10^k, Den = 10^k | Repeating: Num = Repeating Digits R, Den = 10^k − 1 | Simplify via GCF"
  whenToUse: "Use this converter to turn measurement decimals into precise fractions or to simplify recurring decimal math."
  whoShouldUse: "Students, teachers, carpenters, engineers, and scientists working with exact fractional measurements."
  limitations: "Converts rational terminating and repeating decimals — it cannot represent irrational decimals as fractions, since none exist."
  keyTakeaways:
    - "Supports a Terminating Decimal mode (for example, 0.375 → 3/8) and a Repeating Decimal mode (for example, 0.333... → 1/3)."
    - "Reduces every raw fraction to lowest terms using the Greatest Common Factor (GCF, also called GCD)."
    - "Displays a mixed-number equivalent for decimals greater than 1, such as 2.75 → 11/4 = 2 3/4."
    - "Verifies each conversion by dividing the resulting fraction back out to a decimal, which should match the original input."
peopleAlsoAsk:
  - "How do you convert a terminating decimal to a simplified fraction?"
  - "How do you convert a repeating decimal to a fraction mathematically?"
  - "Why do we reduce fractions using the GCF?"
  - "Can all decimals be converted into fractions?"
examples:
  - title: "Terminating Decimal Example (0.375)"
    inputs: "Mode = Terminating, Decimal = 0.375"
    calculation: "3 decimal digits -> Denominator = 10^3 = 1000. Raw Fraction = 375 / 1000. GCF of 375 and 1000 is 125. Reduced Fraction = (375/125) / (1000/125) = 3 / 8."
    result: "Reduced Fraction = 3 / 8 | Verification Decimal = 0.375"
  - title: "Repeating Decimal Example (0.333...)"
    inputs: "Mode = Repeating, Repeating Digits = 3"
    calculation: "Repeating block R = 3 (length k = 1). Denominator = 10^1 - 1 = 9. Raw Fraction = 3 / 9. GCF of 3 and 9 is 3. Reduced Fraction = 1 / 3."
    result: "Reduced Fraction = 1 / 3 | Verification Decimal = 0.333333333"
  - title: "Decimal Greater Than 1 (2.75)"
    inputs: "Mode = Terminating, Decimal = 2.75"
    calculation: "2 decimal digits -> Denominator = 100. Raw Fraction = 275 / 100. GCF of 275 and 100 is 25. Reduced Fraction = 11 / 4. Whole = 2, Remainder = 3/4 -> 2 3/4."
    result: "Reduced Fraction = 11 / 4 | Mixed Number = 2 3/4"
faqs:
  - q: "What is the difference between terminating and repeating decimals?"
    a: "A terminating decimal has a finite number of digits after the decimal point, such as 0.375. A repeating decimal has digits that repeat infinitely in a periodic pattern, such as 0.333... or 0.1818..."
  - q: "How do you convert a repeating decimal to a fraction by hand?"
    a: "Let x = 0.333... Multiply both sides by 10^k, where k is the length of the repeating block, to get 10x = 3.333... Subtracting x from 10x gives 9x = 3, so x = 3/9 = 1/3."
  - q: "Why do we reduce fractions using the GCF?"
    a: "Reducing by the Greatest Common Factor removes every shared factor between the numerator and denominator, leaving the smallest equivalent whole-number fraction — the same value expressed in its simplest possible form."
  - q: "Can all decimals be converted into fractions?"
    a: "Only rational decimals, meaning terminating or repeating ones, can be converted into fractions. Irrational numbers like Pi (3.14159...) or √2 (1.4142...) have digits that never terminate and never repeat, so they cannot be expressed as an exact fraction."
references:
  - "https://www.mathsisfun.com/converting-decimals-fractions.html"
formulaDescription: "Terminating decimals are converted by treating every digit after the decimal point as part of a whole-number numerator over a power-of-ten denominator, then reducing by the greatest common factor. Repeating decimals use an algebraic technique: because the repeating block never resolves to a fixed power of ten, the block itself becomes the numerator over a denominator built from nines — one nine for every digit in the repeating block — which comes from the algebraic identity that emerges when subtracting the original repeating number from itself scaled by that same power of ten."
variablesExplained:
  - name: "k (Decimal Digit Count)"
    description: "The number of digits after the decimal point (terminating mode) or in the repeating block (repeating mode), used to determine the power-of-ten denominator."
  - name: "R (Repeating Block)"
    description: "The digit sequence that repeats infinitely in a repeating decimal, used directly as the numerator before reduction."
  - name: "GCF / GCD"
    description: "The Greatest Common Factor (equivalently, Greatest Common Divisor) of the numerator and denominator, used to reduce the raw fraction to its lowest terms."
stepByStep: "Choose Terminating or Repeating mode. For a terminating decimal, enter the full decimal value. For a repeating decimal, enter only the digits that repeat. The calculator builds the raw fraction, reduces it by the greatest common factor, and displays the simplified fraction along with a mixed-number form when applicable."
realWorldUses: "Carpenters and engineers convert measurement decimals into fractions to match ruler or tool markings, students use this to check homework on converting between decimal and fraction forms, and anyone working with recurring decimals can use it to find the exact fraction rather than an approximate rounded value."
commonMistakes:
  - "Entering a repeating decimal as if it were terminating — treating 0.333 as terminating gives 333/1000, which is close to but not exactly equal to 1/3 (0.333333...); the Repeating Decimal mode must be used to get the exact value."
  - "Forgetting to reduce a fraction to lowest terms — leaving 375/1000 unreduced instead of dividing both by their GCF of 125 to reach 3/8 produces a mathematically correct but non-simplified answer."
---

# Decimal to Fraction Converter – Terminating & Repeating Guide

Converting decimals into fractions is an essential mathematical skill used in woodworking, engineering, cooking, and algebra. Decimals represent parts of a whole using powers of 10 (0.1, 0.01, 0.001), while fractions express those same parts as exact ratios of two integers. This calculator converts both terminating decimals and repeating decimals into reduced proper fractions and mixed numbers.

## Terminating vs. Repeating Decimals

**Terminating decimals** end cleanly after a finite number of digits — examples include 0.2, 0.375, 0.625, and 2.75. **Repeating decimals** continue infinitely in a repeating pattern after the decimal point — examples include 0.333..., 0.1818..., and 0.142857...

## How to Convert Terminating Decimals to Fractions

1. **Count decimal digits (k)**: identify how many digits follow the decimal point.
2. **Set the denominator**: the denominator is $10^k$ — 10 for one digit, 100 for two digits, 1000 for three digits.
3. **Set the numerator**: multiply the original decimal by $10^k$ to create a whole-number numerator.
4. **Reduce using the GCF**: divide both numerator and denominator by their Greatest Common Factor.

### Worked Examples

- **Convert 0.2**: 1 decimal digit → denominator $10^1 = 10$. Numerator = $0.2 \times 10 = 2$. Raw fraction = $2/10$; GCF of 2 and 10 is 2. Reduced fraction = $1/5$.
- **Convert 0.375**: 3 decimal digits → denominator $10^3 = 1000$. Numerator = $0.375 \times 1000 = 375$. Raw fraction = $375/1000$; GCF of 375 and 1000 is 125. Reduced fraction = $3/8$.
- **Convert 0.625**: 3 decimal digits → denominator = 1000. Numerator = 625; GCF of 625 and 1000 is 125. Reduced fraction = $5/8$.
- **Convert 2.75 (greater than 1)**: 2 decimal digits → denominator = 100. Numerator = $2.75 \times 100 = 275$. Raw fraction = $275/100$; GCF of 275 and 100 is 25. Reduced fraction = $11/4$, or as a mixed number, $2\ \tfrac{3}{4}$ (2 whole, with a remainder of $75/100 = 3/4$).

## How to Convert Repeating Decimals to Fractions

Repeating decimals cannot be placed directly over a power of 10 because they never terminate. Instead, an algebraic subtraction technique is used.

### Algebraic Method for 0.333...

1. Let $x = 0.333...$
2. Since 1 digit repeats (3), multiply both sides by $10^1 = 10$: $10x = 3.333...$
3. Subtract $x$ from $10x$: $10x - x = 3.333... - 0.333... \Rightarrow 9x = 3$
4. Solve: $x = 3/9 = 1/3$

### General Formula for Repeating Decimals

For a repeating digit block $R$ of length $k$:

$$\text{Fraction} = \frac{R}{10^k - 1}$$

**Example (0.1818...)**: repeating block $R = 18$, length $k = 2$. Fraction = $18 / (10^2 - 1) = 18/99$. GCF of 18 and 99 is 9, so $(18/9)/(99/9) = 2/11$.

## Common Mistakes to Avoid

1. **Treating repeating decimals as terminating**: entering 0.333 as a terminating decimal yields $333/1000$, which does not exactly equal $1/3$ (0.33333...). Use Repeating Decimal mode for recurring numbers.
2. **Forgetting to reduce to lowest terms**: leaving $375/1000$ unreduced instead of dividing by the GCF of 125 to get $3/8$.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This calculator handles rational decimals only — terminating decimals and simple repeating decimals where the repeat starts immediately after the decimal point. It does not handle mixed repeating decimals where a non-repeating part precedes the repeating block (such as 0.1666...).

To simplify or combine fractions once converted, see the [Fraction Calculator](/calculators/fraction-calculator/).
