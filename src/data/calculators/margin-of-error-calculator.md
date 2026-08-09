---
title: "Margin of Error Calculator – Find the Margin of Error for a Survey"
seoTitle: "Margin of Error Calculator | CalculationDesk"
metaDescription: "Enter your sample size, confidence level, and sample proportion to calculate the margin of error for a survey or poll."
category: "mathematics"
subcategory: "statistics-calculators"
tags: ["margin of error calculator", "survey margin of error", "confidence interval", "poll accuracy"]
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
  definition: "This calculator estimates the margin of error for a survey or poll result, based on sample size, confidence level, and the sample proportion."
  quickAnswer: "A survey of 400 people at 95% confidence with an even 50/50 split has a margin of error of about ±4.9 percentage points."
  formulaSummary: "Margin of error = z x sqrt(p(1-p) / n), where z is the value tied to the confidence level, p is the sample proportion, and n is sample size."
  whenToUse: "Use it when reporting or interpreting survey results, to state how much a reported percentage could reasonably differ from the true population value."
  whoShouldUse: "Anyone running or reading a survey, poll, or study that reports a percentage result."
  limitations: "This assumes a simple random sample from a large population and doesn't account for non-response bias, wording effects, or non-random sampling methods, which typically add error beyond what this formula captures."
  keyTakeaways:
    - "Margin of error shrinks as sample size grows, but slowly — quadrupling the sample size only halves the margin of error, since the formula depends on the square root of n."
    - "The margin of error is largest when the true proportion is near 50%, and shrinks as it moves toward 0% or 100%."
    - "A higher confidence level (99% vs 95%) means a wider margin of error for the same sample, because you're demanding more certainty that the true value falls inside the range."
peopleAlsoAsk:
  - "What sample size do I need for a 5% margin of error?"
  - "Why does a bigger sample lower the margin of error?"
  - "What does '95% confidence, +/- 3%' actually mean?"
  - "Why use 50% for the proportion if I don't know the real one?"
examples:
  - title: "400 respondents, 95% confidence, 50% proportion"
    inputs: "Sample size = 400, Confidence = 95% (z = 1.96), Proportion = 50%"
    calculation: "MOE = 1.96 x sqrt(0.5 x 0.5 / 400) = 1.96 x sqrt(0.000625) = 1.96 x 0.025 = 0.049 = 4.9%"
    result: "Margin of error = ±4.9%"
  - title: "1,000 respondents, 90% confidence, 30% proportion"
    inputs: "Sample size = 1000, Confidence = 90% (z = 1.645), Proportion = 30%"
    calculation: "MOE = 1.645 x sqrt(0.3 x 0.7 / 1000) = 1.645 x sqrt(0.00021) = 1.645 x 0.01449 = 0.0238 = 2.38%"
    result: "Margin of error = ±2.38%"
faqs:
  - q: "What sample size do I need for a 5% margin of error?"
    a: "At 95% confidence with a 50% proportion assumption, you'd need roughly 385 respondents to hit a ±5% margin of error. Tightening the target margin of error requires a rapidly growing sample, since the relationship follows a square root."
  - q: "Why does a bigger sample lower the margin of error?"
    a: "The formula divides by the square root of the sample size, so error shrinks as sample size grows — but not proportionally. Going from 100 to 400 respondents (4x the sample) roughly halves the margin of error, not quarters it."
  - q: "What does '95% confidence, +/- 3%' actually mean?"
    a: "It means that if you repeated the same survey many times using the same method, about 95% of the resulting confidence intervals (the reported percentage plus or minus 3 points) would contain the true population value. It's a statement about the reliability of the method, not a guarantee about this one specific result."
  - q: "Why use 50% for the proportion if I don't know the real one?"
    a: "50% produces the largest possible margin of error for a given sample size and confidence level, so using it gives you a conservative (worst-case) estimate when you don't have prior data on what the actual split is likely to be."
references:
  - "https://www.pewresearch.org/decoded/2016/09/08/probability-and-non-probability-surveys/"
formulaDescription: "The margin of error combines how variable a proportion is (largest when it's near 50%, via p(1-p)), how large the sample is (larger samples shrink the error via the square root of n), and how much certainty you're demanding (a wider z-value for a higher confidence level)."
variablesExplained:
  - name: "Confidence level"
    description: "How certain you want to be that the true population value falls within the margin of error — commonly 90%, 95%, or 99%. Higher confidence widens the margin of error."
  - name: "Sample size"
    description: "The number of people or observations in your survey or study."
  - name: "Sample proportion"
    description: "The percentage result you're reporting (for example, the share of respondents who answered 'yes'). Use 50% if you don't have a prior estimate, since it produces the most conservative margin of error."
stepByStep: "Enter your sample size, pick a confidence level, and enter the sample proportion (or leave it at 50% for the most conservative estimate). The calculator looks up the z-value for your confidence level and applies the margin of error formula."
realWorldUses: "Pollsters and researchers use this to state how precise a reported percentage is — a headline like '52% support, margin of error ±3 points' comes directly from this calculation, and reporters and readers use the same math to judge how much weight to put on a close result."
commonMistakes:
  - "Treating the margin of error as covering every source of error in a survey — it only covers random sampling error, not bias from question wording, non-response, or a non-random sample."
  - "Comparing two poll results that differ by less than the combined margin of error and treating the difference as meaningful, when it may just be sampling noise."
---

# Margin of Error Calculator

Survey results are estimates, not exact figures, and the margin of error is how you quantify that uncertainty. This calculator takes your sample size, confidence level, and the reported proportion, and returns how many percentage points the true population value could plausibly differ from what you measured.

## How the formula works

**Margin of error = z × √(p(1−p) / n)**. The z-value comes from your confidence level (1.96 for 95%, 1.645 for 90%, 2.576 for 99%) and reflects how much certainty you're demanding. The p(1−p) term captures how variable the proportion itself is — it's largest when p is near 50% and shrinks as the result gets closer to 0% or 100%. Dividing by n and taking the square root captures the fact that larger samples produce more stable, precise estimates, though with diminishing returns.

## Why bigger samples help less than you'd expect

Because the formula divides by the square root of the sample size, cutting your margin of error in half requires roughly quadrupling your sample. Going from 100 to 400 respondents meaningfully tightens the estimate; going from 10,000 to 40,000 barely moves it further, at a much higher cost. This is why most national polls settle around 1,000–1,500 respondents — it's close to the point of diminishing returns for a typical ±3% target.

## What this doesn't cover

This margin of error only accounts for random sampling variation. It says nothing about whether the sample was actually representative, whether the question was worded in a leading way, or whether certain groups were less likely to respond — all of which can introduce error this formula can't detect or correct for.
