---
title: "LCM Calculator - Least Common Multiple Solver"
seoTitle: "LCM Calculator - Calculate Least Common Multiple | CalculationDesk"
metaDescription: "Free online LCM Calculator. Calculate the Least Common Multiple (LCM) for two or more positive integers using prime factorization, GCD division, and multiple listings."
category: "math"
subcategory: "algebra-calculators"
tags: ["lcm calculator", "least common multiple", "lcm prime factorization", "lcm gcd formula", "common denominator solver"]
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
  - "LCM Calculator - Calculate Least Common Multiple | CalculationDesk"
aiSummary:
  definition: "The LCM Calculator computes the Least Common Multiple (LCM) for a group of positive integers, showing both the prime factorization method and the GCD-based formula."
  quickAnswer: "The LCM of 12, 18, and 30 is 180 (2² × 3² × 5¹ = 4 × 9 × 5 = 180). The LCM of 8 and 12 is 24."
  formulaSummary: "LCM(A, B) = |A × B| / GCD(A, B) | For multiple numbers: LCM(A, B, C) = LCM(LCM(A, B), C)"
  whenToUse: "Use this tool to find common denominators for adding or subtracting fractions, or to work out when repeating events will next align."
  whoShouldUse: "Students, teachers, musicians, network engineers, and schedule planners."
  limitations: "Calculates the least common multiple for positive integers up to 1,000,000."
  keyTakeaways:
    - "Calculates the LCM for two or more positive integers, not just pairs."
    - "Uses the GCD-based formula for pairs and combines results iteratively for three or more numbers."
    - "Essential for finding a common denominator when adding or subtracting fractions with different denominators."
peopleAlsoAsk:
  - "What is the Least Common Multiple (LCM)?"
  - "What is the difference between LCM and HCF/GCD?"
  - "How do you calculate LCM using prime factorization?"
  - "How does the GCD formula calculate LCM for two numbers?"
examples:
  - title: "Three Integer Worked Example (12, 18, 30)"
    inputs: "Integers = 12, 18, 30"
    calculation: "Prime factorizations: 12 = 2² × 3¹; 18 = 2¹ × 3²; 30 = 2¹ × 3¹ × 5¹. Highest powers: 2², 3², 5¹. Product: 4 × 9 × 5 = 180."
    result: "Least Common Multiple (LCM) = 180"
  - title: "Two Integer Simple Example (8, 12)"
    inputs: "Integers = 8, 12"
    calculation: "GCD(8, 12) = 4. Formula: LCM(8, 12) = |8 × 12| / 4 = 96 / 4 = 24. Prime factorization: 8 = 2³; 12 = 2² × 3¹. Highest powers: 2³ × 3¹ = 8 × 3 = 24."
    result: "Least Common Multiple (LCM) = 24"
faqs:
  - q: "What is the Least Common Multiple (LCM)?"
    a: "The LCM of two or more positive integers is the smallest positive integer that is evenly divisible by all of them without leaving a remainder."
  - q: "What is the difference between LCM and HCF/GCD?"
    a: "LCM is the smallest shared multiple, always equal to or larger than the input numbers, whereas HCF/GCD is the largest shared divisor, always equal to or smaller than the input numbers."
  - q: "How do you calculate LCM using prime factorization?"
    a: "Write out the prime factorization of every number, identify every distinct prime factor that appears across all of them, take the highest power each prime factor reaches in any single number, and multiply those highest powers together."
  - q: "How does the GCD formula calculate LCM for two numbers?"
    a: "For any two positive integers A and B, LCM(A, B) equals the absolute value of their product divided by their GCD: LCM(A, B) = |A × B| / GCD(A, B). For three or more numbers, this same formula is applied repeatedly, combining the running LCM with each next number."
references:
  - "https://www.mathsisfun.com/least-common-multiple.html"
formulaDescription: "For two numbers, the LCM is derived from the Greatest Common Divisor: multiplying the two numbers together and dividing by their GCD removes exactly the shared factors that were double-counted, leaving the smallest number divisible by both. For three or more numbers, the calculator applies this pairwise formula iteratively — first finding the LCM of the first two numbers, then finding the LCM of that result with the third number, and so on, since the LCM operation is associative."
variablesExplained:
  - name: "A, B (Input Integers)"
    description: "The positive integers whose least common multiple is being found."
  - name: "GCD(A, B)"
    description: "The Greatest Common Divisor of A and B — the largest integer that evenly divides both, used in the LCM formula to remove double-counted shared factors."
stepByStep: "Enter two or more positive integers, separated by commas, spaces, or newlines. The calculator computes their least common multiple by applying the GCD-based formula iteratively across every entered number."
realWorldUses: "The LCM is used to find a common denominator when adding or subtracting fractions with different denominators, and to work out when repeating events — like buses on different schedules, or blinking lights on different intervals — will next occur at the same time."
commonMistakes:
  - "Confusing LCM with GCD — LCM finds the smallest shared multiple (equal to or larger than the inputs), while GCD finds the largest shared factor (equal to or smaller than the inputs); mixing them up gives a dramatically wrong-sized answer."
  - "Assuming the LCM of a group of numbers is simply their product — this only holds when every pair of numbers shares no common factors; whenever numbers share a factor, the true LCM is smaller than the raw product."
---

# LCM Calculator – Least Common Multiple Guide

Finding the Least Common Multiple (LCM) is a core skill in arithmetic and algebra. The LCM of a group of numbers is the smallest positive integer that is evenly divisible by every number in that group. This calculator computes the LCM for two or more positive integers, demonstrating both the prime factorization method and the GCD relationship formula.

## Why the Least Common Multiple Matters

**Adding and subtracting fractions**: to add fractions with different denominators, such as $\frac{1}{12} + \frac{1}{18} + \frac{1}{30}$, the fractions must first be converted to a common denominator — the Least Common Denominator (LCD) is simply the LCM of the denominators, which is 180 in this case.

**Synchronizing repeating events**: if Bus A arrives every 12 minutes, Bus B every 18 minutes, and Bus C every 30 minutes, all three buses will next arrive simultaneously after the LCM of those intervals — 180 minutes, or 3 hours.

## LCM vs. HCF / GCD

**LCM (Least Common Multiple)** finds the smallest common multiple, equal to or larger than the input numbers. **HCF / GCD (Highest Common Factor / Greatest Common Divisor)** finds the largest common factor that divides into the input numbers, equal to or smaller than the input numbers.

## Two Methods to Calculate LCM

**Prime factorization**: write out the prime factorization of every number, identify every prime factor present across all of them, select the highest power reached by each prime factor, and multiply those highest powers together.

**GCD formula (for two numbers)**:

$$\text{LCM}(A, B) = \frac{|A \times B|}{\text{GCD}(A, B)}$$

## Worked Examples

### Example 1: Three Integers (12, 18, 30)

1. Prime factorizations: $12 = 2^2 \times 3^1$, $18 = 2^1 \times 3^2$, $30 = 2^1 \times 3^1 \times 5^1$
2. Highest prime powers: $2^2$ (from 12), $3^2$ (from 18), $5^1$ (from 30)
3. Multiply: $2^2 \times 3^2 \times 5^1 = 4 \times 9 \times 5 = 180$

### Example 2: Two Integers (8 and 12)

1. GCD method: $\text{GCD}(8, 12) = 4$, so $\text{LCM}(8, 12) = \dfrac{8 \times 12}{4} = \dfrac{96}{4} = 24$
2. Factorization method: $8 = 2^3$, $12 = 2^2 \times 3^1$, so $2^3 \times 3^1 = 8 \times 3 = 24$ — the same result by either method

## Input Considerations and Constraints

- **Positive integers**: input numbers must be positive integers greater than zero.
- **Order doesn't matter**: $\text{LCM}(12, 18) = \text{LCM}(18, 12)$.
- **Multiple numbers**: the calculator processes numbers sequentially, so $\text{LCM}(A, B, C) = \text{LCM}(\text{LCM}(A, B), C)$.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This calculator is limited to positive integers up to 1,000,000. It does not support decimal, fractional, or negative inputs, and treats any invalid or out-of-range token in the input list as ignored rather than flagging it individually.

To find the corresponding Greatest Common Factor instead, see the [HCF Calculator](/calculators/hcf-calculator/).
