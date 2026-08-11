---
title: "Fraction Calculator - Fraction Arithmetic & Mixed Number Solver"
seoTitle: "Fraction Calculator - Add, Subtract, Multiply & Divide Fractions | CalculationDesk"
metaDescription: "Free online Fraction Calculator. Perform addition, subtraction, multiplication, and division on fractions, generating reduced proper fractions, mixed numbers, and decimals."
category: "math"
subcategory: "fraction-calculators"
tags: ["fraction calculator", "add fractions calculator", "subtract fractions calculator", "multiply divide fractions", "mixed fraction converter"]
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
  - "Fraction Calculator - Add, Subtract, Multiply & Divide Fractions | CalculationDesk"
aiSummary:
  definition: "The Fraction Calculator performs the four fundamental arithmetic operations (addition, subtraction, multiplication, division) on two common fractions, simplifying the result into a reduced proper fraction, mixed number, and exact decimal value."
  quickAnswer: "Adding 1/2 + 2/3 yields 7/6, which simplifies to the mixed fraction 1 1/6 and the decimal 1.166667."
  formulaSummary: "Addition: (a/b) + (c/d) = (ad + bc)/bd | Subtraction: (a/b) - (c/d) = (ad - bc)/bd | Multiplication: (a/b) x (c/d) = ac/bd | Division: (a/b) / (c/d) = ad/bc"
  whenToUse: "Use this tool to solve fraction homework, convert improper fractions to mixed numbers, and reduce fractions to lowest terms."
  whoShouldUse: "Students, teachers, parents, and engineers."
  limitations: "Calculates exact fraction arithmetic on two fractions and simplifies results using Greatest Common Divisor (GCD) reduction."
  keyTakeaways:
    - "Supports 4 basic operations: Addition (+), Subtraction (-), Multiplication (x), and Division (/)."
    - "Automatically simplifies the final fraction to lowest terms using GCD reduction."
    - "Provides 3 output formats: Reduced Fraction, Mixed Fraction (e.g. 1 1/6), and Decimal Representation."
    - "A negative resulting denominator is normalized by moving the negative sign to the numerator instead."
peopleAlsoAsk:
  - "How do you add two fractions with different denominators?"
  - "How do you multiply and divide fractions?"
  - "How is an improper fraction converted to a mixed number?"
  - "Why can a denominator never be zero?"
examples:
  - title: "Fraction Addition (1/2 + 2/3)"
    inputs: "Fraction 1 = 1/2, Operator = +, Fraction 2 = 2/3"
    calculation: "Numerator = 1 x 3 + 2 x 2 = 3 + 4 = 7. Denominator = 2 x 3 = 6. Raw result = 7/6. GCD(7, 6) = 1, so reduced = 7/6. Mixed = 7 div 6 = 1 remainder 1, giving 1 1/6. Decimal = 7 / 6 = 1.166667."
    result: "Reduced Fraction = 7/6 | Mixed Fraction = 1 1/6 | Decimal = 1.166667"
  - title: "Fraction Division (3/4 / 2/5)"
    inputs: "Fraction 1 = 3/4, Operator = /, Fraction 2 = 2/5"
    calculation: "Numerator = 3 x 5 = 15. Denominator = 4 x 2 = 8. Raw result = 15/8. GCD(15, 8) = 1, so reduced = 15/8. Mixed = 15 div 8 = 1 remainder 7, giving 1 7/8. Decimal = 15 / 8 = 1.875."
    result: "Reduced Fraction = 15/8 | Mixed Fraction = 1 7/8 | Decimal = 1.875"
  - title: "Fraction Subtraction (5/6 - 1/4)"
    inputs: "Fraction 1 = 5/6, Operator = -, Fraction 2 = 1/4"
    calculation: "Numerator = 5 x 4 - 1 x 6 = 20 - 6 = 14. Denominator = 6 x 4 = 24. Raw result = 14/24. GCD(14, 24) = 2, so reduced = 7/12. Since the numerator (7) is smaller than the denominator (12), there is no whole-number part. Decimal = 7 / 12 = 0.583333."
    result: "Reduced Fraction = 7/12 | Mixed Fraction = 7/12 (no whole part) | Decimal = 0.583333"
faqs:
  - q: "How do you add fractions with different denominators?"
    a: "Cross-multiply the numerators by the opposite denominators, sum them for the new numerator, and multiply the denominators together: (a/b) + (c/d) = (ad + bc) / bd."
  - q: "How does the calculator reduce fractions to lowest terms?"
    a: "The calculator computes the Greatest Common Divisor (GCD) of the resulting numerator and denominator using the Euclidean algorithm, then divides both numbers by that factor."
  - q: "What happens if a denominator is entered as zero?"
    a: "Division by zero is mathematically undefined. The calculator validates both denominator fields and will not compute a result if either denominator is zero, and it also blocks division operations where the second numerator is zero, since that would divide by zero."
  - q: "Why does the reduced fraction sometimes have no whole-number part?"
    a: "A fraction only converts to a mixed number when the absolute value of its reduced numerator is greater than or equal to its denominator (an improper fraction). As the subtraction example (7/12) shows, a proper fraction — where the numerator is smaller than the denominator — displays with a whole-number part of 0 and no separate mixed format."
references:
  - "https://www.mathsisfun.com/fractions.html"
formulaDescription: "The calculator applies cross-multiplication rules to combine the two fractions into a single raw numerator and denominator depending on the selected operation, normalizes the sign so the denominator is always positive, then reduces the result using the Greatest Common Divisor (GCD, found with the Euclidean algorithm). If the reduced numerator's absolute value is at least as large as the denominator, it also produces a mixed-number representation and a decimal equivalent."
variablesExplained:
  - name: "Numerator and Denominator"
    description: "Each fraction is entered as a numerator (top number) over a non-zero denominator (bottom number)."
  - name: "GCD (Greatest Common Divisor)"
    description: "The largest integer that evenly divides both the resulting numerator and denominator; dividing both by it produces the fraction in lowest terms."
  - name: "Mixed Number"
    description: "An alternate way of writing an improper fraction (where the numerator is at least as large as the denominator) as a whole number plus a proper fraction remainder."
stepByStep: "Enter the numerator and denominator for each of the two fractions, and choose an operation (addition, subtraction, multiplication, or division). The calculator combines the fractions using the standard cross-multiplication rule for that operation, normalizes the sign, reduces to lowest terms using the GCD, and displays the reduced fraction, its mixed-number form (when applicable), and its decimal equivalent."
realWorldUses: "Fraction arithmetic like this is fundamental to cooking and baking (scaling recipe measurements), construction and woodworking (combining measurements given in fractions of an inch), and core math coursework from elementary school through algebra."
commonMistakes:
  - "Adding or subtracting numerators and denominators directly without cross-multiplying first — 1/2 + 2/3 is not (1+2)/(2+3); the denominators must first be brought to a common base via cross-multiplication before the numerators can be combined."
  - "Forgetting to reduce the result to lowest terms — an unreduced fraction like 14/24 is mathematically correct but should be simplified to 7/12 using the GCD for a proper final answer."
---

# Fraction Calculator – Arithmetic & Mixed Number Guide

Working with fractions requires applying specific cross-multiplication and reduction rules depending on whether you are adding, subtracting, multiplying, or dividing. This calculator solves fractional equations, returning a reduced proper fraction, its mixed-number form, and its decimal equivalent.

## How Fraction Calculations Work

**Addition and subtraction** cross-multiply to find a common denominator:

$$\frac{a}{b} + \frac{c}{d} = \frac{ad + bc}{bd} \qquad \frac{a}{b} - \frac{c}{d} = \frac{ad - bc}{bd}$$

**Multiplication and division** combine numerators and denominators directly (division multiplies by the reciprocal of the second fraction):

$$\frac{a}{b} \times \frac{c}{d} = \frac{ac}{bd} \qquad \frac{a}{b} \div \frac{c}{d} = \frac{ad}{bc}$$

**Reduction and mixed numbers.** The raw result is reduced by dividing both the numerator and denominator by their Greatest Common Divisor (GCD). If the reduced numerator's absolute value is at least as large as the denominator, the calculator also expresses the result as a mixed number: the whole-number part is the truncated quotient, and the remaining fractional part uses the remainder over the same denominator.

## Worked Examples

### Example 1: Addition — 1/2 + 2/3

Numerator $= 1 \times 3 + 2 \times 2 = 7$. Denominator $= 2 \times 3 = 6$. Raw result $= 7/6$, already in lowest terms since $\gcd(7, 6) = 1$. As a mixed number: $7 \div 6 = 1$ remainder $1$, so $1\ \tfrac{1}{6}$. Decimal: $7 / 6 \approx 1.166667$.

### Example 2: Division — 3/4 ÷ 2/5

Numerator $= 3 \times 5 = 15$. Denominator $= 4 \times 2 = 8$. Raw result $= 15/8$, already reduced since $\gcd(15, 8) = 1$. As a mixed number: $15 \div 8 = 1$ remainder $7$, so $1\ \tfrac{7}{8}$. Decimal: $15 / 8 = 1.875$.

### Example 3: Subtraction — 5/6 − 1/4

Numerator $= 5 \times 4 - 1 \times 6 = 20 - 6 = 14$. Denominator $= 6 \times 4 = 24$. Raw result $= 14/24$, and since $\gcd(14, 24) = 2$, the reduced fraction is $7/12$. Because the numerator (7) is smaller than the denominator (12), this is already a proper fraction — no whole-number part is shown. Decimal: $7 / 12 \approx 0.583333$.

## Denominator Restrictions

> [!IMPORTANT]
> **Zero denominators**: Division by zero is mathematically undefined, so neither denominator can be entered as zero. When dividing, the second fraction's numerator also cannot be zero, since division flips it into the new denominator.

## Frequently Asked Questions

### How do you add fractions with different denominators?

Cross-multiply the numerators by the opposite denominators, sum them for the new numerator, and multiply the denominators together: (a/b) + (c/d) = (ad + bc) / bd.

### How does the calculator reduce fractions to lowest terms?

The calculator computes the Greatest Common Divisor (GCD) of the resulting numerator and denominator using the Euclidean algorithm, then divides both numbers by that factor.

### What happens if a denominator is entered as zero?

Division by zero is mathematically undefined. The calculator validates both denominator fields and will not compute a result if either denominator is zero, and it also blocks division operations where the second numerator is zero, since that would divide by zero.

### Why does the reduced fraction sometimes have no whole-number part?

A fraction only converts to a mixed number when the absolute value of its reduced numerator is greater than or equal to its denominator (an improper fraction). As the subtraction example (7/12) shows, a proper fraction — where the numerator is smaller than the denominator — displays with a whole-number part of 0 and no separate mixed format.
