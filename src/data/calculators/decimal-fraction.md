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
lastUpdated: "2026-08-09"
formulaVerified: true
version: "2.0"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "High organic search priority execution"
titleVariants:
  - "Decimal to Fraction Converter - Convert Terminating & Repeating Decimals | CalculationDesk"
aiSummary:
  definition: "The Decimal to Fraction Converter changes terminating and repeating decimals into simplified proper or mixed fraction equivalents with exact step-by-step math."
  quickAnswer: "0.375 converts to 3/8. 0.625 converts to 5/8. 0.2 converts to 1/5. Repeating 0.333... converts to 1/3. 2.75 converts to 11/4 (or mixed 2 3/4)."
  formulaSummary: "Terminating: Num = Decimal × 10^k, Den = 10^k | Repeating: Num = Repeating Digits R, Den = 10^k - 1 | Simplify via GCF"
  whenToUse: "Use this converter to convert measurement decimals into precise fractions or simplify recurring decimal math."
  whoShouldUse: "Students, teachers, carpenters, engineers, and scientists."
  limitations: "Converts rational terminating and repeating decimals."
  keyTakeaways:
 - "Supports Terminating Decimal mode (e.g. 0.375 -> 3/8) and Repeating Decimal mode (e.g. 0.333... -> 1/3)."
 - "Reduces raw fractions to lowest terms using Greatest Common Factor (GCF/GCD)."
 - "Displays mixed number equivalents for decimals greater than 1 (e.g. 2.75 -> 11/4 = 2 3/4)."
 - "Provides decimal re-verification by evaluating numerator divided by denominator."
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
 calculation: "2 decimal digits -> Denominator = 100. Raw Fraction = 275 / 100. GCF of 275 and 100 is 25. Reduced Fraction = 27 / 4 = 11 / 4. Whole = 2, Remainder = 3/4 -> 2 3/4."
 result: "Reduced Fraction = 11 / 4 | Mixed Number = 2 3/4"
faqs:
  - q: "What is the difference between terminating and repeating decimals?"
 a: "A terminating decimal has a finite number of digits after the decimal point (e.g., 0.375). A repeating decimal has digits that repeat infinitely in a periodic pattern (e.g., 0.333... or 0.1818...)."
  - q: "How do you convert a repeating decimal to a fraction by hand?"
 a: "Let x = 0.333... Multiply by 10^k (where k is the repeating length) to get 10x = 3.333... Subtract x from 10x: 9x = 3, so x = 3/9 = 1/3."
  - q: "Can all decimals be converted into fractions?"
 a: "Only rational decimals (terminating or repeating) can be converted to fractions. Irrational numbers like Pi (3.14159...) or √2 (1.4142...) cannot be expressed as fractions."
references:
  - "https://www.mathsisfun.com/converting-decimals-fractions.html"
---

# Decimal to Fraction Converter – Terminating & Repeating Guide

Converting **decimals into fractions** is an essential mathematical skill used in woodworking, engineering, cooking, and algebra. 

Decimals represent parts of a whole using powers of 10 ($0.1, 0.01, 0.001$), while fractions express those same parts as exact ratios of two integers ((a / b)).

This calculator converts both **Terminating Decimals** and **Repeating Decimals** into reduced proper fractions and mixed numbers.

---

### Terminating vs. Repeating Decimals

1. **Terminating Decimals**: Decimals that end cleanly after a finite number of digits.
 * *Examples*: 0.2$, 0.375$, 0.625$, 2.75$.
2. **Repeating Decimals**: Decimals that continue infinitely in a repeating pattern after the decimal point.
 * *Examples*: 0.333...$, 0.1818...$, 0.142857...$

---

### How to Convert Terminating Decimals to Fractions

To convert a terminating decimal into a fraction:
1. **Count Decimal Digits (k)**: Identify how many numbers follow the decimal point.
2. **Set the Denominator**: The denominator is 10^k ($10$ for 1 digit, 100$ for 2 digits, 1000$ for 3 digits).
3. **Set the Numerator**: Multiply the original decimal by 10^k to create a whole number numerator.
4. **Reduce using GCF**: Divide both numerator and denominator by their **Greatest Common Factor (GCF)**.

#### Step-by-Step Examples (Verified against Code)

* **Convert 0.2$**:
  - 1$ decimal digit implies Denominator = 10^1 = 10$.
  - Numerator = 0.2 × 10 = 2$.
  - Raw Fraction = 2 / 10$. GCF of 2 and 10 is 2.
  - Reduced Fraction = (2/2) / (10/2) = 1 / 5$.

* **Convert 0.375$**:
  - 3$ decimal digits implies Denominator = 10^3 = 1000$.
  - Numerator = 0.375 × 1000 = 375$.
  - Raw Fraction = 375 / 1000$. GCF of 375 and 1000 is 125.
  - Reduced Fraction = (375/125) / (1000/125) = 3 / 8$.

* **Convert 0.625$**:
  - 3$ decimal digits implies Denominator = 1000$.
  - Numerator = 625$. GCF of 625 and 1000 is 125.
  - Reduced Fraction = (625/125) / (1000/125) = 5 / 8$.

* **Convert Decimals Greater Than 1 ($2.75$)**:
  - 2$ decimal digits implies Denominator = 100$.
  - Numerator = 2.75 × 100 = 275$.
  - Raw Fraction = 275 / 100$. GCF of 275 and 100 is 25.
  - Reduced Fraction = 11 / 4$.
  - Mixed Number = 2\ 3/4$ ($275/100 = 2$ whole with remainder 75/100 = 3/4$).

---

### How to Convert Repeating Decimals to Fractions

Repeating decimals cannot be placed over powers of 10 because they never terminate. Instead, we use an algebraic subtraction technique.

#### Algebraic Method for 0.333...$
1. Let x = 0.333...
2. Since 1 digit repeats ($3$), multiply both sides by 10^1 = 10$:
 10x = 3.333...
3. Subtract x from 10x:
 10x - x = 3.333... - 0.333...
 9x = 3
4. Solve for x:
 x = (3 / 9) = (1 / 3)

#### General Formula for Repeating Decimals
For a repeating digit block R of length k:
Fraction = (R / 10^k - 1)

* *Example ($0.1818...$)*: Repeating block R = 18, length k = 2.
  Fraction = (18 / 10^2 - 1) = (18 / 99)
  GCF of 18 and 99 is 9 implies (18/9) / (99/9) = 2 / 11.

---

### Common Mistakes to Avoid

1. **Treating Repeating Decimals as Terminating**: Entering 0.333$ as a terminating decimal yields (333 / 1000), which does NOT equal (1 / 3) ($0.33333...$). Use **Repeating Decimal Mode** for recurring numbers.
2. **Forgetting to Reduce to Lowest Terms**: Leaving (375 / 1000) unreduced instead of dividing by GCF 125$ to get (3 / 8).

---

### Frequently Asked Questions (FAQ)

* **Q1: What is the difference between terminating and repeating decimals?**
  * A1: A terminating decimal has a finite number of digits after the decimal point (e.g., 0.375). A repeating decimal has digits that repeat infinitely in a periodic pattern (e.g., 0.333... or 0.1818...).
* **Q2: How do you convert a repeating decimal to a fraction by hand?**
  * A2: Let x = 0.333... Multiply by 10^k (where k is the repeating length) to get 10x = 3.333... Subtract x from 10x: 9x = 3, so x = 3/9 = 1/3.
* **Q3: Can all decimals be converted into fractions?**
  * A3: Only rational decimals (terminating or repeating) can be converted to fractions. Irrational numbers like Pi (3.14159...) or √2 (1.4142...) cannot be expressed as fractions.
