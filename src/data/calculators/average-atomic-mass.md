---
title: "Average Atomic Mass Calculator – Weighted Isotope Average"
seoTitle: "Average Atomic Mass Calculator | CalculationDesk"
metaDescription: "Calculate an element's weighted average atomic mass from the mass and natural abundance of its isotopes."
category: "science"
subcategory: "chemistry-calculators"
tags: ["average atomic mass calculator", "weighted atomic mass", "isotope abundance calculator", "atomic mass unit calculator"]
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
  definition: "This calculator computes an element's weighted average atomic mass from the individual masses and natural abundance percentages of two isotopes."
  quickAnswer: "Carbon-12 (mass 12, 98.9% abundance) and Carbon-13 (mass 13.00335, 1.1% abundance) combine to a weighted average atomic mass of about 12.011 amu."
  formulaSummary: "Weighted Mass = Sum of (Isotope Mass x Fractional Abundance) for each isotope."
  whenToUse: "Use it to understand or verify how an element's periodic table atomic mass is derived from its naturally occurring isotopes."
  whoShouldUse: "Chemistry students learning about isotopes and atomic mass, and anyone verifying a weighted average calculation."
  limitations: "This handles two isotopes at a time — elements with three or more naturally significant isotopes would need the same weighted-average principle extended across all isotopes present, which this two-isotope version doesn't directly support."
  keyTakeaways:
    - "The periodic table's listed atomic mass for an element is itself a weighted average of that element's naturally occurring isotopes, not the mass of any single atom — carbon's familiar 12.011 comes from exactly this kind of calculation."
    - "Because natural abundance percentages must sum to 100%, an isotope with much higher abundance dominates the weighted average — carbon-12's 98.9% abundance is why carbon's average mass (12.011) sits so close to 12 rather than being roughly halfway between 12 and 13."
    - "Isotopes of the same element have the same number of protons but different numbers of neutrons, which is why they have different masses despite being the same chemical element."
peopleAlsoAsk:
  - "Why is carbon's atomic mass 12.011 instead of exactly 12?"
  - "What is an isotope?"
  - "How does abundance affect the weighted average?"
  - "What is an atomic mass unit (amu)?"
examples:
  - title: "Carbon-12 and Carbon-13"
    inputs: "Isotope 1: mass = 12 amu, abundance = 98.9%. Isotope 2: mass = 13.00335 amu, abundance = 1.1%"
    calculation: "Weighted mass = (12 x 0.989) + (13.00335 x 0.011) = 11.868 + 0.1430 = 12.011"
    result: "Weighted average atomic mass ≈ 12.011 amu"
faqs:
  - q: "Why is carbon's atomic mass 12.011 instead of exactly 12?"
    a: "Carbon-12, the most common isotope, makes up about 98.9% of naturally occurring carbon and has a mass defined as exactly 12 amu. But a small fraction (about 1.1%) is the heavier carbon-13 isotope, which pulls the weighted average slightly above 12 — to 12.011. The periodic table's atomic mass values are these kinds of isotope-weighted averages, not the mass of a single atom."
  - q: "What is an isotope?"
    a: "Isotopes are atoms of the same element (same number of protons, which defines what element it is) that have different numbers of neutrons, giving them different atomic masses. Most elements have multiple naturally occurring isotopes in varying proportions, and it's the weighted average of all of them that gives the atomic mass value listed on the periodic table."
  - q: "How does abundance affect the weighted average?"
    a: "Since abundance percentages act as weights in the average, an isotope present in much higher proportion pulls the overall average much closer to its own mass. This is why carbon's average mass (12.011) sits very close to carbon-12's mass (12) rather than being roughly midway between 12 and 13 — carbon-12's overwhelming 98.9% abundance dominates the calculation."
  - q: "What is an atomic mass unit (amu)?"
    a: "An atomic mass unit is the standard unit for expressing atomic and molecular masses, defined as exactly 1/12th the mass of a single carbon-12 atom. It's a convenient reference scale that keeps atomic mass values as manageable numbers rather than expressing them in extremely small fractions of a gram."
references:
  - "https://www.nist.gov/pml/periodic-table-elements"
formulaDescription: "The calculator multiplies each isotope's mass by its fractional abundance (its percentage abundance divided by 100), then adds these weighted contributions together. This produces a single average mass value that reflects how common each isotope actually is in nature, rather than treating all isotopes as equally likely."
variablesExplained:
  - name: "Isotope 1 mass"
    description: "The atomic mass of the first isotope, in amu."
  - name: "Isotope 1 abundance"
    description: "The natural abundance of the first isotope, as a percentage."
  - name: "Isotope 2 mass"
    description: "The atomic mass of the second isotope, in amu."
  - name: "Isotope 2 abundance"
    description: "The natural abundance of the second isotope, as a percentage."
stepByStep: "Enter the mass and natural abundance percentage for each of the two isotopes. The calculator multiplies each mass by its fractional abundance and sums the results to compute the element's weighted average atomic mass."
realWorldUses: "This is used in chemistry education to demonstrate how periodic table atomic mass values are derived, and to work through isotope-related calculations for elements with well-characterized isotope ratios."
commonMistakes:
  - "Entering abundance as a decimal (like 0.989) instead of a percentage (98.9), which the calculator expects and converts internally — this mismatch would produce a drastically wrong result."
  - "Assuming the two abundance percentages must be manually checked to sum to 100% — while they should in a real natural sample, the calculator itself doesn't enforce or validate this, so incorrect input abundances would silently produce a misleading average."
---

# Average Atomic Mass Calculator

Enter the mass and natural abundance of two isotopes, and this calculator computes the element's weighted average atomic mass.

## Formula

**Weighted Mass = Σ (Isotope Mass × Fractional Abundance)**.

For Carbon-12 (mass 12, 98.9% abundance) and Carbon-13 (mass 13.00335, 1.1% abundance): weighted mass = (12 × 0.989) + (13.00335 × 0.011) = 11.868 + 0.143 ≈ 12.011 amu.

## Why the periodic table shows a decimal, not a whole number

The atomic mass listed for an element on the periodic table isn't the mass of any single atom — it's this same kind of isotope-weighted average. Carbon's familiar 12.011 reflects that carbon-12 (mass exactly 12) makes up about 98.9% of naturally occurring carbon, while the small remaining fraction is heavier carbon-13, pulling the average just slightly above 12.

## Abundance dominates the average

Because abundance percentages act as weights, the isotope present in much greater proportion pulls the weighted average close to its own mass. That's why carbon's average mass sits near 12 rather than roughly halfway between 12 and 13 — carbon-12's overwhelming natural abundance dominates the calculation, with carbon-13 contributing only a small nudge.
