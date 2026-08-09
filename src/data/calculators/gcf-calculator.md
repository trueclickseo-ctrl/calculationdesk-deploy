---
title: "GCF Calculator – Greatest Common Factor and LCM"
seoTitle: "GCF Calculator | CalculationDesk"
metaDescription: "Calculate the greatest common factor (GCF) and least common multiple (LCM) of two integers."
category: "math"
subcategory: "number-theory-calculators"
tags: ["gcf calculator", "greatest common factor calculator", "lcm calculator", "gcd and lcm calculator"]
priority: "medium"
importance: 6
clusterPriority: "secondary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-09"
formulaVerified: true
version: "1.0"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "medium"
aiSummary:
  definition: "This calculator finds both the greatest common factor (GCF, also called GCD) and the least common multiple (LCM) of two integers, using the Euclidean algorithm."
  quickAnswer: "The greatest common factor of 24 and 36 is 12, and their least common multiple is 72."
  formulaSummary: "GCF found via the Euclidean algorithm; LCM = (Number A x Number B) / GCF."
  whenToUse: "Use it when simplifying fractions, finding common denominators, or solving problems involving evenly dividing or evenly combining quantities."
  whoShouldUse: "Students learning number theory and fraction concepts, and anyone solving problems involving common factors or multiples."
  limitations: "This calculates GCF and LCM for exactly two integers — for finding the GCF or LCM of three or more numbers, the calculation needs to be applied iteratively (finding the GCF or LCM of the first two, then combining that result with the third number, and so on)."
  keyTakeaways:
    - "GCF (greatest common factor) is the largest number that divides evenly into both numbers, while LCM (least common multiple) is the smallest number that both numbers divide evenly into — they answer opposite kinds of questions."
    - "GCF and LCM are mathematically linked by a simple relationship: multiplying them together always equals the product of the original two numbers, which is exactly how this calculator finds LCM once it has the GCF."
    - "GCF is essential for simplifying fractions to their lowest terms, while LCM is essential for finding a common denominator when adding or subtracting fractions with different denominators."
peopleAlsoAsk:
  - "What's the difference between GCF and LCM?"
  - "How is GCF used to simplify fractions?"
  - "How is LCM used when adding fractions?"
  - "What is the relationship between GCF and LCM?"
examples:
  - title: "24 and 36"
    inputs: "Number A = 24, Number B = 36"
    calculation: "GCF = 12 (Euclidean algorithm); LCM = (24 x 36)/12 = 864/12 = 72"
    result: "GCF = 12, LCM = 72"
faqs:
  - q: "What's the difference between GCF and LCM?"
    a: "GCF (greatest common factor, also called GCD) is the largest number that divides evenly into both given numbers with no remainder — it's about finding the biggest shared building block. LCM (least common multiple) is the smallest number that both given numbers divide evenly into — it's about finding the smallest number that both can 'reach' through multiplication. They're related but answer fundamentally different questions."
  - q: "How is GCF used to simplify fractions?"
    a: "To reduce a fraction to its simplest form, you divide both the numerator and denominator by their greatest common factor — this removes every shared factor at once, guaranteeing the resulting fraction is fully simplified in a single step, rather than needing multiple rounds of dividing by smaller common factors."
  - q: "How is LCM used when adding fractions?"
    a: "Fractions can only be added or subtracted directly once they share a common denominator, and the least common multiple of the original denominators gives the smallest such shared denominator to work with. Using the LCM rather than just any common multiple (like the product of the two denominators) keeps the numbers involved as small and manageable as possible during the calculation."
  - q: "What is the relationship between GCF and LCM?"
    a: "For any two positive integers, the product of their GCF and LCM always equals the product of the two original numbers — a useful mathematical identity that lets you compute one from the other quickly. This calculator relies on exactly this relationship: once it finds the GCF using the Euclidean algorithm, it calculates the LCM simply by multiplying the two original numbers together and dividing by that GCF."
references:
  - "https://www.mathsisfun.com/greatest-common-factor.html"
formulaDescription: "GCF is found using the Euclidean algorithm — repeatedly dividing the larger number by the smaller and replacing the larger with the remainder, until the remainder reaches zero, at which point the last non-zero divisor is the GCF. LCM is then calculated using the mathematical relationship that the product of two numbers always equals the product of their GCF and LCM, so dividing the product of the original numbers by the GCF yields the LCM directly."
variablesExplained:
  - name: "Number A"
    description: "The first integer."
  - name: "Number B"
    description: "The second integer."
stepByStep: "Enter two integers. The calculator applies the Euclidean algorithm to find their greatest common factor, then uses that result to calculate their least common multiple."
realWorldUses: "Students use GCF and LCM for simplifying fractions and finding common denominators in math coursework, and both concepts appear in practical scheduling problems (like determining when two repeating events will coincide, which relates to LCM) and grouping or packaging problems (like dividing items into the largest equal groups possible, which relates to GCF)."
commonMistakes:
  - "Confusing which value — GCF or LCM — is needed for a given problem, since simplifying a fraction requires GCF while finding a common denominator for adding fractions requires LCM."
  - "Applying the two-number GCF or LCM formula directly to three or more numbers without the necessary iterative approach, which produces an incorrect result for groups larger than two numbers."
---

# GCF Calculator

Enter two integers, and this calculator returns their greatest common factor (GCF) and least common multiple (LCM).

## Formula

**GCF** found via the Euclidean algorithm; **LCM = (Number A × Number B) ÷ GCF**

For 24 and 36: GCF = 12, and LCM = (24 × 36) ÷ 12 = 864 ÷ 12 = 72.

## Two questions, one calculator

GCF and LCM sound related, and they are, but they answer opposite kinds of questions. GCF asks "what's the biggest number that divides evenly into both?" — useful for breaking things down, like simplifying a fraction to its smallest equivalent form. LCM asks "what's the smallest number that both divide evenly into?" — useful for building things up, like finding a common denominator to add two fractions together. Knowing which one a given problem actually calls for is half the battle.

## The shortcut connecting them

Rather than calculating LCM independently, this calculator takes advantage of a neat mathematical fact: for any two positive integers, multiplying their GCF by their LCM always gives back the product of the original two numbers. That means once the Euclidean algorithm finds the GCF, LCM falls out immediately — just multiply the two original numbers together and divide by the GCF already found, no separate calculation required.
