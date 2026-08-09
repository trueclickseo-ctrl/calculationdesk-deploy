---
title: "Weighted Average Percentage Calculator"
seoTitle: "Weighted Average Percentage Calculator | CalculationDesk"
metaDescription: "Calculate a weighted average of multiple percentages, accounting for different sample sizes or weights."
category: "math"
subcategory: "statistics-calculators"
tags: ["weighted average percentage calculator", "average percentage calculator", "weighted mean calculator", "combined percentage calculator"]
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
  definition: "This calculator finds the weighted average of two percentages, accounting for different sample sizes or weights behind each percentage rather than treating them as equally important."
  quickAnswer: "80% (weight 1) combined with 90% (weight 2) gives a weighted average of 86.67%."
  formulaSummary: "Weighted Average = (Percent1 x Weight1 + Percent2 x Weight2) / (Weight1 + Weight2)."
  whenToUse: "Use it when combining two percentages that came from groups of different sizes or importance — like combining pass rates from two classes of different sizes, or combining survey results with different sample sizes."
  whoShouldUse: "Analysts, teachers, and researchers combining percentage figures from groups of unequal size or importance."
  limitations: "This calculator combines exactly two percentage-weight pairs — combining more than two groups requires extending the same weighted average formula to include additional percent-and-weight terms in both the numerator and denominator."
  keyTakeaways:
    - "A simple (unweighted) average of two percentages treats both groups as equally important regardless of their actual size — which can produce a misleading combined figure when the underlying groups are very different sizes."
    - "The weighted average always falls closer to whichever percentage has the larger weight, correctly reflecting that a bigger group should have proportionally more influence on the combined result."
    - "This is the same weighted average concept used broadly in statistics — weighted GPA calculations, weighted survey results, and portfolio return calculations all follow this identical mathematical structure."
peopleAlsoAsk:
  - "Why is a weighted average different from a simple average?"
  - "When should you use a weighted average instead of a simple average?"
  - "What happens if both weights are equal?"
  - "Can this be extended to combine more than two percentages?"
examples:
  - title: "80% (weight 1), 90% (weight 2)"
    inputs: "Percent1 = 80%, Weight1 = 1, Percent2 = 90%, Weight2 = 2"
    calculation: "Weighted Avg = ((80x1)+(90x2))/(1+2) = (80+180)/3 = 260/3 ≈ 86.67"
    result: "Weighted Average ≈ 86.67%"
faqs:
  - q: "Why is a weighted average different from a simple average?"
    a: "A simple average treats every value equally, regardless of how much data or how many people are actually behind each figure — averaging 80% and 90% simply gives 85%, no matter the underlying context. A weighted average instead accounts for the relative size or importance of each figure, so a percentage backed by a much larger group properly counts for more in the combined result, which is why the weighted average in the example (86.67%) differs from the simple average (85%)."
  - q: "When should you use a weighted average instead of a simple average?"
    a: "A weighted average is the correct choice whenever the two (or more) percentages being combined don't represent equally sized or equally important groups — combining a 90% pass rate from a class of 40 students with an 80% pass rate from a class of 10 students, for instance, should weight the larger class more heavily, since it represents more actual students, which a simple average would fail to reflect."
  - q: "What happens if both weights are equal?"
    a: "When both weights are set to the same value, the weighted average calculation mathematically simplifies to exactly the same result as a simple, unweighted average of the two percentages — equal weights cancel out any weighting effect, confirming that a simple average is really just a special case of a weighted average where every group happens to carry identical importance."
  - q: "Can this be extended to combine more than two percentages?"
    a: "Yes — the same weighted average formula extends naturally to any number of groups: multiply each percentage by its own weight, sum all of those products together, then divide by the sum of all the weights. This calculator handles two groups directly, but the underlying mathematical principle scales to combining as many percentage-and-weight pairs as needed."
references:
  - "https://www.investopedia.com/terms/w/weightedaverage.asp"
formulaDescription: "The formula multiplies each percentage by its corresponding weight, sums those weighted values together, and divides by the total combined weight — ensuring that percentages backed by a larger weight contribute proportionally more to the final combined average than those backed by a smaller weight."
variablesExplained:
  - name: "Percent 1 / Percent 2"
    description: "The two percentage values being combined."
  - name: "Weight 1 / Weight 2"
    description: "The relative size or importance of each corresponding percentage — larger weights count for more in the combined result."
stepByStep: "Enter two percentages along with a weight for each, reflecting their relative size or importance. The calculator multiplies each percentage by its weight, sums the results, and divides by the total weight to return the weighted average."
realWorldUses: "Teachers use weighted averages to combine grades from assignments of different importance, researchers use them to combine survey or study results from groups of different sample sizes, and analysts use them for combining metrics like conversion rates across channels with very different traffic volumes."
commonMistakes:
  - "Using a simple average when the underlying groups being combined are actually different sizes, which produces a combined figure that doesn't accurately reflect the larger group's proportionally greater influence."
  - "Assigning arbitrary or inconsistent weights that don't actually reflect the true relative size or importance of each group, which undermines the accuracy the weighted average calculation is meant to provide."
---

# Weighted Average Percentage Calculator

Enter two percentages along with a weight for each, and this calculator returns their weighted average.

## Formula

**Weighted Average = (Percent1 × Weight1 + Percent2 × Weight2) ÷ (Weight1 + Weight2)**

For 80% (weight 1) and 90% (weight 2): Weighted Average = ((80×1) + (90×2)) ÷ 3 = 260 ÷ 3 ≈ 86.67%.

## Why a simple average can be misleading

Averaging 80% and 90% the plain way gives 85% — but that number silently assumes both percentages represent equally important or equally sized groups. If the 90% figure actually comes from a group twice the size of the one behind the 80% figure, treating them as equal understates how much that larger group should actually influence the combined result. The weighted average corrects for this, pulling the combined figure closer to whichever percentage carries more weight — in this case, closer to 90% than a simple average would land.

## A simple average is just a special case

It's worth noticing that if both weights in this formula were set equal to each other, the weighted average calculation collapses down to exactly the same result as an ordinary simple average. That's not a coincidence — a simple average is really just a weighted average where every group happens to carry identical importance. The weighted version is the more general, more broadly applicable tool, useful anywhere the groups being combined aren't actually equal in size or significance.
