---
title: "Z-Score Calculator – Standardize a Value Against a Distribution"
seoTitle: "Z-Score Calculator | CalculationDesk"
metaDescription: "Enter an observed value, mean, and standard deviation to calculate its z-score — how many standard deviations it is from the mean."
category: "mathematics"
subcategory: "statistics-calculators"
tags: ["z score calculator", "standard score calculator", "z score formula", "standard deviations from mean"]
priority: "medium"
importance: 6
clusterPriority: "secondary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-09"
formulaVerified: true
version: "2.0"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "medium"
aiSummary:
  definition: "This calculator computes a z-score, which measures how many standard deviations an observed value is above or below the mean of its distribution."
  quickAnswer: "A value of 85 in a distribution with a mean of 70 and a standard deviation of 10 has a z-score of 1.5, meaning it's 1.5 standard deviations above the mean."
  formulaSummary: "z = (Value - Mean) / Standard deviation"
  whenToUse: "Use it to see how unusual or typical a specific value is relative to a known mean and standard deviation, or to compare values that come from different scales or distributions."
  whoShouldUse: "Students and anyone working with normally-distributed data who wants to standardize or compare individual values."
  limitations: "Z-scores are most directly interpretable when the underlying distribution is approximately normal (bell-shaped). For skewed or unusual distributions, the same z-score value doesn't necessarily correspond to the same probability or percentile as it would under a normal distribution."
  keyTakeaways:
    - "A z-score of 0 means the value equals the mean exactly; positive z-scores are above the mean, negative z-scores are below it."
    - "Because z-scores are standardized, they let you compare values from different distributions on the same scale — for example, comparing a test score to a height measurement isn't meaningful directly, but their z-scores are."
    - "In a normal distribution, about 68% of values fall within a z-score of -1 to +1, and about 95% fall within -2 to +2 — a useful rule of thumb for judging how unusual a given z-score is."
peopleAlsoAsk:
  - "What does a z-score actually tell you?"
  - "What's considered a 'high' or unusual z-score?"
  - "Can z-scores be negative?"
  - "Why standardize a value into a z-score instead of just using the raw number?"
examples:
  - title: "Value of 85, mean 70, standard deviation 10"
    inputs: "Value = 85, Mean = 70, Standard deviation = 10"
    calculation: "z = (85 - 70) / 10 = 15/10 = 1.5"
    result: "Z-score = 1.5"
faqs:
  - q: "What does a z-score actually tell you?"
    a: "It tells you how many standard deviations a specific value sits from the mean of its distribution. A z-score of 1.5 means the value is 1.5 standard deviations above average; a z-score of -2 means it's 2 standard deviations below average. It converts a raw value into a standardized measure of how typical or extreme it is."
  - q: "What's considered a 'high' or unusual z-score?"
    a: "In a roughly normal distribution, about 68% of values fall between z-scores of -1 and +1, and about 95% fall between -2 and +2, so a z-score beyond ±2 is already fairly uncommon, and beyond ±3 is quite rare. What counts as 'unusual' in practice still depends on the context and field you're working in."
  - q: "Can z-scores be negative?"
    a: "Yes — a negative z-score simply means the value is below the mean. The sign indicates direction (above or below average) and the magnitude indicates how far, in standard deviation units."
  - q: "Why standardize a value into a z-score instead of just using the raw number?"
    a: "Standardizing removes the original units and scale, which lets you compare values from completely different distributions on equal footing — for example, comparing how unusual a specific exam score is relative to how unusual a specific height measurement is, even though raw scores and raw heights aren't directly comparable."
references:
  - "https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b.htm"
formulaDescription: "The mean is subtracted from the observed value to find how far it deviates from average, in the original units. Dividing that deviation by the standard deviation converts it into a standardized unit — the number of standard deviations the value sits from the mean — which is comparable across different distributions."
variablesExplained:
  - name: "Observed value"
    description: "The specific data point you want to standardize."
  - name: "Mean"
    description: "The average of the distribution the value belongs to."
  - name: "Standard deviation"
    description: "A measure of how spread out the distribution is around its mean."
stepByStep: "Enter the observed value, the mean of its distribution, and the standard deviation. The calculator subtracts the mean from the value and divides the result by the standard deviation to produce the z-score."
realWorldUses: "Z-scores are used to see how a specific test score, measurement, or data point compares to a known average and spread, and to compare values across different scales — such as comparing performance on two different tests with different scoring systems by looking at each result's z-score instead of its raw score."
commonMistakes:
  - "Treating a z-score's interpretation as reliable for distributions that aren't roughly normal (bell-shaped), where the standard percentile associations don't hold as cleanly."
  - "Confusing the mean and standard deviation of the whole distribution with a single sample value — the mean and standard deviation need to describe the group the value is being compared against, not the value itself."
---

# Z-Score Calculator

Enter a value along with the mean and standard deviation of its distribution, and this calculator returns the z-score — a standardized measure of how far that value sits from average, expressed in standard deviation units.

## Formula

**z = (Value − Mean) ÷ Standard deviation**. Subtracting the mean shows how far the value deviates from average in its original units; dividing by the standard deviation converts that deviation into a standardized scale that's comparable across different distributions, regardless of their original units or spread.

For a value of 85 in a distribution with a mean of 70 and a standard deviation of 10, the z-score is (85−70)/10 = 1.5 — the value sits 1.5 standard deviations above the mean.

## Reading the result

A z-score of 0 means the value exactly equals the mean. Positive z-scores sit above the mean; negative ones sit below it. In a roughly normal (bell-shaped) distribution, about 68% of values fall within a z-score of ±1, and about 95% fall within ±2 — so a z-score of 1.5 is above average but still well within the range most values in a normal distribution would fall into, while a z-score beyond ±2 starts to represent a genuinely uncommon value.

## Why standardize at all

Raw values from different distributions usually aren't directly comparable — a test score of 85 and a height of 68 inches don't mean anything relative to each other. Converting both to z-scores puts them on the same standardized scale, so you can meaningfully compare how unusual or typical each one is relative to its own distribution, even though the original measurements have nothing in common.
