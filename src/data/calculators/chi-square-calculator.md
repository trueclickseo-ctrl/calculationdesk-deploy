---
title: "Chi-Square Calculator – Goodness of Fit Test Statistic"
seoTitle: "Chi-Square Calculator | CalculationDesk"
metaDescription: "Enter observed and expected values to calculate the chi-square goodness of fit statistic."
category: "mathematics"
subcategory: "statistics-calculators"
tags: ["chi square calculator", "chi square goodness of fit", "chi square test statistic", "chi square formula"]
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
  definition: "This calculator computes the chi-square goodness of fit statistic, which measures how far a set of observed values deviates from a set of expected values."
  quickAnswer: "Observed values of 10, 20, 30 against expected values of 15, 15, 30 give a chi-square statistic of 3.33."
  formulaSummary: "Chi-square = sum of (Observed - Expected)^2 / Expected, across all categories"
  whenToUse: "Use it to test whether observed frequencies in categorical data (like survey responses, dice rolls, or defect counts) differ meaningfully from what you'd expect under some hypothesis."
  whoShouldUse: "Students and researchers running a chi-square goodness of fit test on categorical count data."
  limitations: "This calculates the chi-square statistic only — it does not compute the p-value or compare against a critical value, which requires knowing the degrees of freedom and consulting a chi-square distribution table or statistical software to determine significance."
  keyTakeaways:
    - "A chi-square value of 0 means the observed values exactly match the expected values; larger values indicate bigger deviations."
    - "Whether a given chi-square value is 'statistically significant' depends on the degrees of freedom and your chosen significance level — the raw statistic alone doesn't tell you that."
    - "This is the goodness-of-fit version of the chi-square test, comparing one set of observed counts to expected counts — it's a different setup from a chi-square test of independence between two categorical variables."
peopleAlsoAsk:
  - "What does the chi-square statistic actually measure?"
  - "How do I know if my chi-square value is significant?"
  - "What's the difference between goodness of fit and test of independence?"
  - "Why do I need expected values, not just observed ones?"
examples:
  - title: "Three categories"
    inputs: "Observed = 10, 20, 30. Expected = 15, 15, 30"
    calculation: "(10-15)^2/15 + (20-15)^2/15 + (30-30)^2/30 = 25/15 + 25/15 + 0/30 = 1.667 + 1.667 + 0 = 3.33"
    result: "Chi-square statistic = 3.33"
faqs:
  - q: "What does the chi-square statistic actually measure?"
    a: "It sums up how far each observed count is from its expected count, squared (so direction doesn't matter and bigger gaps count more), and scaled by the expected count (so a given gap matters more when the expected count is small). The total is a single number summarizing overall deviation across all categories."
  - q: "How do I know if my chi-square value is significant?"
    a: "You need to compare it against a critical value from the chi-square distribution, which depends on your degrees of freedom (number of categories minus 1 for a goodness of fit test) and your chosen significance level (commonly 0.05). This calculator returns the statistic itself; determining significance requires that additional lookup step."
  - q: "What's the difference between goodness of fit and test of independence?"
    a: "Goodness of fit (what this calculator computes) compares one variable's observed distribution to an expected distribution — for example, are dice rolls evenly distributed across six faces? A test of independence instead checks whether two categorical variables are related to each other, using a contingency table rather than a single list of observed and expected values."
  - q: "Why do I need expected values, not just observed ones?"
    a: "The chi-square test measures deviation from something — without a defined expectation (from a theoretical distribution, a prior study, or an assumed even split), there's nothing to measure the observed values against. The expected values represent what you'd see if your null hypothesis were true."
references:
  - "https://www.itl.nist.gov/div898/handbook/eda/section3/eda35f.htm"
formulaDescription: "For each category, the difference between what was observed and what was expected is squared (removing the sign so overshoots and undershoots both count as deviation) and divided by the expected value (so the same absolute gap counts for more when the expected value is small). Summing this across every category produces the chi-square statistic."
variablesExplained:
  - name: "Observed values"
    description: "The actual counts recorded in your data for each category."
  - name: "Expected values"
    description: "The counts you'd expect in each category under your hypothesis (for example, an even split, or a theoretical distribution)."
stepByStep: "Enter your observed counts and the corresponding expected counts for each category, in matching order. The calculator computes the squared difference divided by the expected value for each category and sums the results."
realWorldUses: "This test comes up whenever you want to check if categorical data matches an expected pattern — testing whether a die is fair, whether survey responses match a hypothesized distribution, or whether defect rates differ from a target across production categories."
commonMistakes:
  - "Entering observed and expected values in mismatched order across categories, which produces a meaningless statistic even though the calculation runs without error."
  - "Treating the raw chi-square statistic as automatically meaningful without checking it against a critical value for the relevant degrees of freedom and significance level."
---

# Chi-Square Calculator

Enter a set of observed counts and the expected counts you're comparing them against, and this calculator returns the chi-square goodness of fit statistic — a single number summarizing how far your observed data deviates from what was expected.

## Formula

**Chi-square = Σ (Observed − Expected)² / Expected**, summed across every category. Squaring the difference means both overshoots and undershoots count as deviation and larger gaps count disproportionately more; dividing by the expected value means the same raw gap matters more in a category where you expected a small count than in one where you expected a large count.

For observed counts of 10, 20, and 30 against expected counts of 15, 15, and 30, the three category contributions are 1.667, 1.667, and 0 — summing to a chi-square statistic of 3.33.

## What the number means on its own

A chi-square value of 0 means the observed data matches the expected data exactly. Beyond that, the raw number by itself doesn't tell you whether the deviation is "significant" — that requires comparing it against a critical value from the chi-square distribution, which depends on your degrees of freedom (the number of categories minus 1, for a goodness of fit test) and the significance level you're testing at, commonly 0.05. This calculator computes the statistic; the significance lookup is a separate step against a chi-square table or statistical software.

## Goodness of fit vs. test of independence

This is specifically the goodness-of-fit version of the chi-square test — one variable's observed counts compared against a single set of expected counts. A chi-square test of independence, which checks whether two categorical variables are related using a contingency table, uses the same underlying idea but a different setup and isn't what this calculator computes.
