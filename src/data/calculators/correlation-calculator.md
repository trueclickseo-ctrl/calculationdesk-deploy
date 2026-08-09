---
title: "Correlation Calculator – Calculate Pearson's Correlation Coefficient"
seoTitle: "Correlation Coefficient Calculator | CalculationDesk"
metaDescription: "Enter two sets of paired values to calculate Pearson's correlation coefficient (r) and see how strongly they're linearly related."
category: "mathematics"
subcategory: "statistics-calculators"
tags: ["correlation calculator", "pearson correlation coefficient", "correlation coefficient calculator", "r value calculator"]
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
  definition: "This calculator computes Pearson's correlation coefficient (r), which measures the strength and direction of the linear relationship between two paired sets of values."
  quickAnswer: "The pairs (1,2), (2,4), (3,5), (4,4), (5,5) have a Pearson correlation coefficient of about 0.775, indicating a fairly strong positive linear relationship."
  formulaSummary: "r = (n*sum(xy) - sum(x)*sum(y)) / sqrt((n*sum(x^2) - sum(x)^2) * (n*sum(y^2) - sum(y)^2))"
  whenToUse: "Use it to check whether two paired variables move together in a straight-line pattern, and how strongly — before deciding whether a linear model or trend line makes sense for the data."
  whoShouldUse: "Students, researchers, or analysts checking the linear relationship between two paired variables."
  limitations: "Pearson's r only measures linear relationships. Two variables can be strongly related in a curved, non-linear way and still show a correlation near 0. Correlation also does not establish that one variable causes the other, regardless of how strong the r value is."
  keyTakeaways:
    - "r ranges from -1 to 1: values near 1 mean a strong positive linear relationship, near -1 mean a strong negative one, and near 0 means little to no linear relationship."
    - "A high correlation does not mean one variable causes the other — both could be driven by a third factor, or the relationship could be coincidental."
    - "Pearson's r specifically measures linear association; a clear curved (non-linear) relationship between two variables can still produce a low r value."
peopleAlsoAsk:
  - "What does a correlation coefficient close to 0 mean?"
  - "Does correlation mean causation?"
  - "What's considered a strong vs. weak correlation?"
  - "Can two variables be related but still have a low correlation coefficient?"
examples:
  - title: "Five paired data points"
    inputs: "X values = 1, 2, 3, 4, 5. Y values = 2, 4, 5, 4, 5"
    calculation: "n=5, sum(x)=15, sum(y)=20, sum(xy)=68, sum(x^2)=55, sum(y^2)=86. r = (5x68 - 15x20) / sqrt((5x55-15^2)(5x86-20^2)) = (340-300) / sqrt(50x30) = 40/38.73 = 0.775"
    result: "Pearson correlation coefficient (r) ≈ 0.775"
faqs:
  - q: "What does a correlation coefficient close to 0 mean?"
    a: "It means there's little to no linear relationship between the two variables — as one goes up, the other doesn't reliably go up or down in a straight-line pattern. It doesn't necessarily mean the variables are unrelated; they could still have a strong non-linear relationship that a straight-line measure like Pearson's r won't detect."
  - q: "Does correlation mean causation?"
    a: "No. A strong correlation only shows that two variables tend to move together in a linear pattern — it says nothing about whether one causes the other. Both variables could be driven by a shared third factor, the relationship could run in the opposite direction than assumed, or the correlation could simply be coincidental in a small dataset."
  - q: "What's considered a strong vs. weak correlation?"
    a: "There's no universal cutoff, but a common rough guide treats |r| above 0.7 as strong, 0.4 to 0.7 as moderate, and below 0.4 as weak — though the right threshold really depends on the field and what you're studying. In some sciences even a 0.3 correlation is considered meaningful, while in others 0.7 might be unremarkable."
  - q: "Can two variables be related but still have a low correlation coefficient?"
    a: "Yes — Pearson's r only captures linear relationships. Two variables with a strong U-shaped or curved relationship can produce a correlation coefficient near 0, even though they're clearly related, simply because that relationship isn't a straight line. Always look at a scatter plot alongside the r value when possible."
references:
  - "https://www.itl.nist.gov/div898/handbook/eda/section3/eda35b1.htm"
formulaDescription: "The formula compares how much x and y vary together (the numerator) against how much each varies on its own (the denominator), producing a single number between -1 and 1 that captures both the strength and direction of their linear relationship."
variablesExplained:
  - name: "X values"
    description: "The first set of paired values, entered as a comma-separated list."
  - name: "Y values"
    description: "The second set of paired values, entered in the same order as the corresponding X values."
stepByStep: "Enter both lists of values in matching order, so each X pairs with its corresponding Y. The calculator applies Pearson's correlation formula to the paired data and returns a single coefficient between -1 and 1."
realWorldUses: "Analysts use this to check, for example, whether advertising spend and sales move together, whether study hours and test scores are linearly related, or whether two measurements taken on the same subjects tend to track each other — as a first step before building any kind of linear model."
commonMistakes:
  - "Interpreting a strong correlation as proof of a causal relationship, when it only demonstrates that the two variables move together linearly."
  - "Assuming a low r value means the variables are unrelated, when the relationship might simply be non-linear and undetectable by Pearson's correlation."
---

# Correlation Calculator

Enter two lists of paired values, and this calculator returns Pearson's correlation coefficient (r) — a single number from -1 to 1 that captures how strongly, and in what direction, the two variables move together in a straight-line pattern.

## Formula

**r = (n·Σxy − Σx·Σy) / √((n·Σx² − (Σx)²)(n·Σy² − (Σy)²))**. The numerator compares how x and y vary together; the denominator normalizes that against how much each variable varies on its own, which is what keeps the result bounded between -1 and 1 regardless of the scale of the original data.

For the pairs (1,2), (2,4), (3,5), (4,4), and (5,5), that formula works out to r ≈ 0.775 — a fairly strong positive relationship, meaning as x increases, y tends to increase too, in a reasonably linear pattern.

## Reading the number

Values near +1 mean a strong positive linear relationship — as one variable increases, the other reliably increases too. Values near -1 mean a strong negative relationship — one increases as the other decreases. Values near 0 mean little to no *linear* relationship, though the variables could still be related in a curved or more complex way that a straight-line measure like this one won't pick up.

## Correlation isn't causation, and it isn't the whole story

A high correlation coefficient shows that two variables tend to move together — it says nothing about whether one causes the other. Both could be driven by some third factor, or the relationship could simply be coincidental in a small sample. It's also worth remembering Pearson's r only measures *linear* association: two variables with an obvious curved relationship (like a U-shape) can still produce a correlation near 0, so it's worth looking at a scatter plot alongside this number whenever you can.
