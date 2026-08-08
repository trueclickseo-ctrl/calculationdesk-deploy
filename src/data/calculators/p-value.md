---
title: "P-Value Calculator – Z-Test Significance from a Test Statistic"
seoTitle: "P-Value Calculator - Left, Right & Two-Tailed | CalculationDesk"
metaDescription: "Enter a Z test statistic to get the left-tailed, right-tailed, and two-tailed p-value, and see whether it clears a chosen significance level."
category: "mathematics"
subcategory: "statistics-calculators"
tags: ["p value calculator", "z test calculator", "statistical significance calculator", "two tailed p value", "hypothesis test calculator"]
priority: "medium"
importance: 7
clusterPriority: "secondary"
searchIntent: "informational"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-08"
formulaVerified: true
version: "1.0"
contentStatus: "published"
lastReviewed: "2026-08-08"
nextReviewDate: "2026-11-08"
refreshPriority: "medium"
aiSummary:
  definition: "This calculator converts a Z test statistic into a p-value using the normal cumulative distribution function, for left-tailed, right-tailed, and two-tailed hypothesis tests."
  quickAnswer: "A Z statistic of 1.96 gives a two-tailed p-value of about 0.05, right at the conventional significance threshold."
  formulaSummary: "Two-tailed p = 2 x (1 - CDF(|Z|))  |  Right-tailed p = 1 - CDF(Z)  |  Left-tailed p = CDF(Z)"
  whenToUse: "Use it after computing a Z statistic (or an equivalent standardized test statistic) by hand or in stats software, when you need the corresponding p-value without looking it up in a printed Z-table."
  whoShouldUse: "Statistics students checking homework, researchers verifying a reported p-value, and anyone running a quick hypothesis test."
  limitations: "This calculator uses the standard normal distribution, appropriate for Z-tests. For small-sample t-tests, chi-square tests, or F-tests, the correct distribution has extra 'weight' in the tails governed by degrees of freedom, and a plain Z-based p-value will be somewhat inaccurate for small samples."
  keyTakeaways:
    - "A smaller p-value is stronger evidence against the null hypothesis, not stronger evidence for a particular effect size."
    - "Two-tailed tests are appropriate when you care about a difference in either direction; one-tailed tests when you only care about one direction."
    - "The conventional significance threshold is p <= 0.05, but that cutoff is a convention, not a law of statistics."
peopleAlsoAsk:
  - "What does a p-value of 0.05 mean?"
  - "What is the difference between a one-tailed and two-tailed p-value?"
  - "What does it mean if the p-value is very small?"
  - "Does a low p-value prove the alternative hypothesis is true?"
examples:
  - title: "Z = 1.96, two-tailed test"
    inputs: "Z statistic = 1.96, test type = two-tailed"
    calculation: "CDF(1.96) = 0.9750. Two-tailed p = 2 x (1 - 0.9750) = 2 x 0.0250 = 0.0500."
    result: "p = 0.050 — right at the conventional alpha = 0.05 significance boundary"
  - title: "Z = 2.58, right-tailed test"
    inputs: "Z statistic = 2.58, test type = right-tailed"
    calculation: "CDF(2.58) = 0.99506. Right-tailed p = 1 - 0.99506 = 0.00494."
    result: "p = 0.0049 — statistically significant at alpha = 0.05 and even alpha = 0.01"
faqs:
  - q: "What does a p-value of 0.05 mean?"
    a: "It means that if the null hypothesis were actually true, you'd see a result at least this extreme about 5% of the time by chance alone. It is not the probability that the null hypothesis itself is true."
  - q: "What is the difference between a one-tailed and two-tailed p-value?"
    a: "A two-tailed p-value accounts for a difference in either direction (higher or lower than expected) and is roughly double the one-tailed value for the same test statistic. Use a one-tailed test only when you have a specific directional hypothesis decided before looking at the data."
  - q: "What does it mean if the p-value is very small?"
    a: "A very small p-value (say, well under 0.01) means the observed result would be quite unlikely under the null hypothesis, which is usually treated as strong evidence against it. It doesn't by itself tell you how large or practically meaningful the effect is."
  - q: "Does a low p-value prove the alternative hypothesis is true?"
    a: "No. A low p-value is evidence against the null hypothesis, not proof of any particular alternative. Statistical significance also doesn't guarantee practical importance — a tiny, meaningless effect can still produce a small p-value with a large enough sample."
references:
  - "https://www.itl.nist.gov/div898/handbook/prc/section1/prc16.htm"
formulaDescription: "The p-value is the area under the standard normal curve beyond the observed test statistic. A two-tailed test doubles the tail area on one side to account for extreme results in either direction; a one-tailed test uses just the single relevant tail."
variablesExplained:
  - name: "Z"
    description: "The standardized test statistic — how many standard deviations the observed result is from the null hypothesis's expected value."
  - name: "CDF(Z)"
    description: "The cumulative distribution function of the standard normal curve at Z — the probability of observing a value at or below Z."
  - name: "alpha"
    description: "The significance level you're testing against, conventionally 0.05. If the p-value is at or below alpha, the result is usually called statistically significant."
stepByStep: "Choose the test type (left-tailed, right-tailed, or two-tailed) and enter your Z statistic. The calculator looks up the normal cumulative distribution at that value and applies the appropriate tail formula to return a p-value, then compares it against your chosen significance level."
realWorldUses: "This is the same lookup a printed Z-table provides, just computed directly — useful for checking homework, verifying a result reported in a paper, or running a quick significance check without switching to full statistical software."
commonMistakes:
  - "Using a two-tailed p-value when the original hypothesis was genuinely one-directional, which understates the evidence against the null in the direction that actually matters."
  - "Treating p-values from small samples as if they came from a normal distribution — small-sample t-tests need the t-distribution, which has heavier tails than the normal curve this calculator uses."
  - "Interpreting statistical significance (a low p-value) as proof of a large or practically important effect, when the two are independent questions."
---

# P-Value Calculator

A p-value answers one narrow question: if the null hypothesis were true, how likely would a result this extreme (or more extreme) be? Enter a Z test statistic and the tail direction, and this calculator returns the corresponding p-value.

## How the tail direction changes the answer

The same Z statistic produces three different p-values depending on what you're testing:

- **Left-tailed** — probability of a result at or below Z. Use when your hypothesis is specifically about a *lower* value.
- **Right-tailed** — probability of a result at or above Z. Use when your hypothesis is specifically about a *higher* value.
- **Two-tailed** — probability of a result at least as extreme in *either* direction, which doubles the relevant one-tailed area. This is the standard choice unless you committed to a direction before seeing the data.

## Reading the result

The conventional cutoff for "statistically significant" is p ≤ 0.05, meaning there's a 5% or lower chance of seeing a result this extreme if the null hypothesis were actually true. That threshold is a widely used convention, not a mathematical law — some fields use stricter cutoffs like 0.01, and a p-value just above 0.05 isn't meaningfully different from one just below it. A small p-value is evidence against the null hypothesis; it says nothing on its own about how large or practically important the underlying effect is.
