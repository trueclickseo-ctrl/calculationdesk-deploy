---
title: "Rate Constant Calculator – First-Order Reaction Rate from Half-Life"
seoTitle: "First-Order Rate Constant Calculator | CalculationDesk"
metaDescription: "Calculate a first-order reaction's rate constant from its half-life."
category: "science"
subcategory: "chemistry-calculators"
tags: ["rate constant calculator", "first order rate constant", "half life to rate constant", "reaction kinetics calculator"]
priority: "medium"
importance: 5
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
  definition: "This calculator computes the rate constant of a first-order reaction from its half-life, the time it takes for half of the reactant to be consumed."
  quickAnswer: "A reaction with a 60-second half-life has a rate constant of approximately 0.01155 per second."
  formulaSummary: "k = ln(2) / half-life."
  whenToUse: "Use it to find a first-order reaction's rate constant when you know (or have measured) its half-life."
  whoShouldUse: "Chemistry students studying reaction kinetics, and anyone working with first-order decay processes like radioactive decay or certain drug elimination kinetics."
  limitations: "This formula applies specifically to first-order reactions, where the relationship between half-life and rate constant is fixed and independent of starting concentration — it does not apply to zero-order or second-order reactions, which have different half-life relationships."
  keyTakeaways:
    - "This formula only works for first-order reactions — unlike first-order kinetics, zero-order and second-order reactions have half-lives that depend on starting concentration, so they require entirely different formulas."
    - "For a first-order reaction, half-life is constant regardless of how much reactant is initially present — this is a defining, distinguishing feature of first-order kinetics compared to other reaction orders."
    - "The natural log of 2 (approximately 0.693) appears because half-life is defined as the time for concentration to drop to exactly half, and first-order decay follows an exponential relationship where that specific ratio produces this particular constant."
peopleAlsoAsk:
  - "Why does this formula only work for first-order reactions?"
  - "What does half-life mean in a chemical reaction?"
  - "Where does the natural log of 2 come from?"
  - "What's a real-world example of first-order kinetics?"
examples:
  - title: "Half-life = 60 seconds"
    inputs: "Half-life = 60 seconds"
    calculation: "k = ln(2) / 60 = 0.6931 / 60 ≈ 0.01155"
    result: "Rate constant k ≈ 0.01155 s^-1"
faqs:
  - q: "Why does this formula only work for first-order reactions?"
    a: "A defining property of first-order reactions is that their half-life is constant, independent of the starting concentration — this constant relationship is exactly what allows a simple direct formula (k = ln(2) / half-life) to connect rate constant and half-life. Zero-order reactions have a half-life that depends directly on starting concentration, and second-order reactions have a half-life that's inversely related to starting concentration, so both require different formulas that account for that dependence."
  - q: "What does half-life mean in a chemical reaction?"
    a: "Half-life is the time required for the concentration of a reactant to drop to exactly half its starting value. For a first-order reaction, this time is the same no matter what concentration you start from — a defining characteristic that makes half-life a convenient, concentration-independent way to characterize how fast a first-order process proceeds."
  - q: "Where does the natural log of 2 come from?"
    a: "First-order reactions follow exponential decay, where concentration decreases proportionally to how much is currently present. Solving the exponential decay equation for the specific time when concentration reaches exactly half its starting value mathematically produces a natural log of 2 term — a fixed mathematical consequence of exponential decay reaching the 50% mark, not an arbitrary constant."
  - q: "What's a real-world example of first-order kinetics?"
    a: "Radioactive decay is the most commonly cited example of first-order kinetics — each radioactive isotope has a characteristic half-life independent of how much material is present, from fractions of a second to billions of years depending on the isotope. Certain drug elimination processes in pharmacology also follow first-order kinetics, where a drug's concentration in the body decreases by a constant fraction over each equal time interval."
references:
  - "https://chem.libretexts.org/Bookshelves/Physical_and_Theoretical_Chemistry"
formulaDescription: "The calculator divides the natural logarithm of 2 (approximately 0.6931) by the entered half-life. This relationship comes directly from solving the first-order exponential decay equation for the specific time at which concentration reaches exactly half its initial value — a calculation that, for first-order kinetics specifically, doesn't depend on what that initial concentration actually was."
variablesExplained:
  - name: "Half-life"
    description: "The time it takes for the reactant concentration to drop to half its starting value, in seconds."
stepByStep: "Enter the reaction's half-life. The calculator divides the natural log of 2 by the half-life to compute the first-order rate constant."
realWorldUses: "This calculation is used in radioactive decay dating and safety calculations, pharmacokinetics for drugs that follow first-order elimination, and general chemical kinetics coursework studying reaction rates."
commonMistakes:
  - "Applying this half-life-to-rate-constant formula to a reaction that isn't actually first order, since zero-order and second-order reactions have entirely different half-life relationships that this formula doesn't capture."
  - "Mixing up time units between the half-life input and the resulting rate constant's units — the rate constant's time unit (like per second or per minute) directly follows from whatever time unit was used for the half-life."
---

# Rate Constant Calculator

Enter a first-order reaction's half-life, and this calculator computes the corresponding rate constant.

## Formula

**k = ln(2) ÷ Half-life**.

A 60-second half-life gives k = 0.6931 ÷ 60 ≈ 0.01155 s⁻¹.

## Why this only applies to first-order reactions

A defining feature of first-order kinetics is that half-life stays constant no matter what concentration the reaction starts from — this fixed relationship is exactly what makes a simple direct formula between k and half-life possible. Zero-order reactions have a half-life that depends on starting concentration, and second-order reactions have one that's inversely related to it, so neither can use this same simple formula.

## Where ln(2) comes from

First-order reactions follow exponential decay, where the rate of concentration loss is proportional to how much is currently present. Solving that exponential decay relationship for the specific moment concentration reaches exactly half its starting value produces the natural log of 2 as a fixed mathematical result — not an arbitrary constant, but a direct consequence of what "half-life" means applied to exponential decay.

## Where this shows up in practice

Radioactive decay is the classic example of first-order kinetics — every radioactive isotope has a fixed, characteristic half-life independent of sample size, ranging from fractions of a second to billions of years. Certain pharmacological drug elimination processes also follow first-order kinetics, where drug concentration in the body drops by a consistent fraction over each equal time interval.
