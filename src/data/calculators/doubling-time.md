---
title: "Doubling Time Calculator – Years to Double at a Growth Rate"
seoTitle: "Doubling Time Calculator | CalculationDesk"
metaDescription: "Calculate how long it takes an investment or quantity to double at a given compound growth rate."
category: "finance"
subcategory: "investment-calculators"
tags: ["doubling time calculator", "rule of 72 calculator", "compound growth doubling time", "investment doubling calculator"]
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
  definition: "This calculator finds how many compounding periods it takes for a quantity — like an investment — to double in value at a given constant growth rate."
  quickAnswer: "An annual growth rate of 7% doubles an investment in approximately 10.24 years."
  formulaSummary: "Doubling Time = ln(2) / ln(1 + Rate/100)."
  whenToUse: "Use it to understand how long compound growth (in an investment, population, or any exponentially growing quantity) takes to double at a given rate, using the precise logarithmic formula rather than the Rule of 72 approximation."
  whoShouldUse: "Investors and finance students wanting a precise doubling time calculation for compound growth scenarios."
  limitations: "This calculates doubling time assuming a constant, unchanging growth rate every period — real investment returns and growth rates fluctuate over time, so this gives a theoretical doubling time under the assumption of steady, consistent growth, not a guaranteed real-world outcome."
  keyTakeaways:
    - "This exact logarithmic formula gives a more precise result than the popular Rule of 72 shortcut (72 divided by the rate), which is a quick mental approximation rather than an exact calculation."
    - "Doubling time shrinks non-linearly as growth rate increases — going from a 2% to a 4% growth rate cuts doubling time by much more than half, since the relationship between rate and doubling time is logarithmic, not linear."
    - "The same formula and logic apply to any exponentially growing or compounding quantity, not just financial investments — population growth, bacterial cultures, and other compound growth phenomena all follow the identical mathematical relationship."
peopleAlsoAsk:
  - "What is the Rule of 72 and how accurate is it?"
  - "Why does a small increase in growth rate significantly reduce doubling time?"
  - "Does this work for things other than investments?"
  - "What's the difference between doubling time and CAGR?"
examples:
  - title: "7% annual growth rate"
    inputs: "Growth Rate = 7%"
    calculation: "Doubling Time = ln(2) / ln(1.07) ≈ 0.6931 / 0.0677 ≈ 10.24"
    result: "Doubling Time ≈ 10.24 years"
faqs:
  - q: "What is the Rule of 72 and how accurate is it?"
    a: "The Rule of 72 is a popular mental math shortcut for estimating doubling time — simply divide 72 by the growth rate percentage to get an approximate number of years (72 ÷ 7 ≈ 10.3 years for a 7% rate). It's remarkably close to the exact logarithmic calculation for growth rates roughly in the 6-10% range, but becomes noticeably less accurate at very low or very high growth rates, where the exact formula this calculator uses gives a more reliable result."
  - q: "Why does a small increase in growth rate significantly reduce doubling time?"
    a: "Because doubling time follows a logarithmic relationship with growth rate rather than a simple linear one, the reduction in doubling time from a rate increase is more dramatic at lower starting rates than at higher ones. Moving from a 2% to a 4% growth rate, for instance, cuts doubling time by considerably more than half, illustrating why even modest improvements to a low growth rate can meaningfully accelerate how quickly an investment or quantity doubles."
  - q: "Does this work for things other than investments?"
    a: "Yes — the mathematics of doubling time applies to any quantity undergoing exponential (compound) growth, not just financial investments. Population growth, bacterial culture growth, and even certain business metrics like user growth for a fast-scaling company all follow the same underlying compound growth math, and this identical formula can be applied to find how long any of them takes to double at a given constant growth rate."
  - q: "What's the difference between doubling time and CAGR?"
    a: "Doubling time answers 'how long until this quantity doubles at a given growth rate,' while CAGR (compound annual growth rate) answers the reverse question: 'given a starting and ending value over a known time period, what constant annual growth rate would produce that result?' They're two related but different tools for working with compound growth — doubling time projects forward from a known rate, while CAGR calculates backward from known start and end values."
references:
  - "https://www.investopedia.com/terms/r/ruleof72.asp"
formulaDescription: "This formula derives directly from solving the compound growth equation for the time it takes a quantity to reach exactly twice its starting value, using natural logarithms. Dividing the natural log of 2 (representing a doubling) by the natural log of one plus the growth rate gives the exact number of compounding periods needed."
variablesExplained:
  - name: "Growth Rate"
    description: "The constant compound growth rate per period, expressed as a percentage."
stepByStep: "Enter a constant compound growth rate as a percentage. The calculator applies the logarithmic doubling time formula to return the exact number of periods needed for the quantity to double."
realWorldUses: "Investors use doubling time to understand how quickly a portfolio or investment at a given expected return will grow to twice its current value, and the same calculation applies to any exponentially growing quantity, from population studies to business growth metrics."
commonMistakes:
  - "Assuming a calculated growth rate will remain perfectly constant over the entire doubling period, when real investment returns and growth rates typically fluctuate year to year rather than compounding at one steady rate."
  - "Relying on the Rule of 72 approximation for precision-critical calculations at very low or very high growth rates, where its accuracy diverges more noticeably from the exact logarithmic formula this calculator uses."
---

# Doubling Time Calculator

Enter a constant compound growth rate, and this calculator returns exactly how long it takes a quantity to double.

## Formula

**Doubling Time = ln(2) ÷ ln(1 + Rate/100)**

For a 7% annual growth rate: Doubling Time = ln(2) ÷ ln(1.07) ≈ 0.6931 ÷ 0.0677 ≈ 10.24 years.

## The exact math behind the Rule of 72 shortcut

Most people know the Rule of 72 — divide 72 by the growth rate for a quick doubling time estimate — but it's an approximation, not an exact calculation. This calculator uses the actual logarithmic formula the Rule of 72 approximates, which stays accurate across the full range of growth rates rather than just the middle range (roughly 6-10%) where the Rule of 72 happens to line up closely with reality.

## Why doubling time doesn't shrink in a straight line

Because this relationship is logarithmic rather than linear, equal increases in growth rate don't produce equal reductions in doubling time — the effect is much bigger at low rates than at high ones. Bumping a 2% growth rate up to 4% cuts doubling time by a lot more than half, which is a useful thing to understand when evaluating whether chasing a somewhat higher return is worth the added risk, since the payoff in time saved isn't a simple proportional relationship.
