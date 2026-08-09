---
title: "Linear Regression Calculator – Find the Line of Best Fit"
seoTitle: "Linear Regression Calculator | CalculationDesk"
metaDescription: "Enter paired X and Y values to calculate the linear regression equation (slope and intercept) that best fits your data."
category: "mathematics"
subcategory: "statistics-calculators"
tags: ["linear regression calculator", "line of best fit calculator", "regression equation calculator", "slope and intercept calculator"]
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
  definition: "This calculator finds the linear regression equation (y = mx + b) that best fits a set of paired X and Y values, using the least-squares method."
  quickAnswer: "The pairs (1,2), (2,3), (3,5), (4,4), (5,6) produce a best-fit line of y = 0.9x + 1.3."
  formulaSummary: "Slope (m) = (n*sum(xy) - sum(x)*sum(y)) / (n*sum(x^2) - sum(x)^2). Intercept (b) = (sum(y) - m*sum(x)) / n."
  whenToUse: "Use it to find the straight-line equation that best summarizes the relationship between two paired variables, which you can then use to describe the trend or estimate y for a new x value."
  whoShouldUse: "Students and analysts fitting a simple linear trend line to paired data."
  limitations: "This fits a straight line regardless of whether the underlying relationship is actually linear — it will return an equation even for data that's better described by a curve, so it's worth visually checking whether a straight line is a reasonable fit before relying on the result. It also doesn't report how well the line fits (that requires a separate R-squared or correlation calculation)."
  keyTakeaways:
    - "The slope tells you how much y changes, on average, for each one-unit increase in x — a slope of 0.9 means y increases by about 0.9 for every increase of 1 in x."
    - "This calculator always returns a line, even if the data isn't actually linear — check a scatter plot to see whether a straight line is a sensible fit before trusting the equation."
    - "Using this line to predict y far outside the range of your original x values (extrapolation) is much less reliable than using it within the range the data actually covers."
peopleAlsoAsk:
  - "What do the slope and intercept actually mean?"
  - "How do I know if a linear fit is even appropriate for my data?"
  - "Can I use this equation to predict new values?"
  - "What's the difference between regression and correlation?"
examples:
  - title: "Five paired data points"
    inputs: "X values = 1, 2, 3, 4, 5. Y values = 2, 3, 5, 4, 6"
    calculation: "n=5, sum(x)=15, sum(y)=20, sum(xy)=68, sum(x^2)=55. Slope = (5x68 - 15x20)/(5x55 - 15^2) = (340-300)/(275-225) = 40/50 = 0.9. Intercept = (20 - 0.9x15)/5 = (20-13.5)/5 = 1.3"
    result: "Regression equation: y = 0.9x + 1.3"
faqs:
  - q: "What do the slope and intercept actually mean?"
    a: "The slope is the average change in y for each one-unit increase in x — a slope of 0.9 means y tends to rise by about 0.9 every time x increases by 1. The intercept is the predicted value of y when x equals 0, which is sometimes meaningful and sometimes just a mathematical anchor point for the line, depending on whether x=0 makes sense in context."
  - q: "How do I know if a linear fit is even appropriate for my data?"
    a: "This calculator will always return a straight-line equation regardless of the actual shape of your data, so it's worth plotting the points first. If they clearly curve rather than following a straight-line trend, a linear equation will fit poorly even though the calculator produces a result — a different type of model would describe the data better."
  - q: "Can I use this equation to predict new values?"
    a: "You can plug a new x value into y = mx + b to get a predicted y, but predictions are much more reliable for x values within the range of your original data than for x values well outside it. Extrapolating far beyond your data's range assumes the same linear trend continues, which often isn't a safe assumption."
  - q: "What's the difference between regression and correlation?"
    a: "Correlation (Pearson's r) measures how strongly two variables move together in a straight-line pattern, as a single number between -1 and 1. Regression goes a step further and gives you the actual equation of the best-fit line, so you can describe the relationship quantitatively and use it to estimate y for a given x."
references:
  - "https://www.itl.nist.gov/div898/handbook/pmd/section1/pmd141.htm"
formulaDescription: "The least-squares method finds the slope and intercept that minimize the total squared vertical distance between the line and every data point. The slope formula compares how x and y vary together against how much x varies on its own; the intercept is then derived so the line passes through the average of the data."
variablesExplained:
  - name: "X values"
    description: "The independent variable's values, entered as a comma-separated list."
  - name: "Y values"
    description: "The dependent variable's values, entered in the same order as their corresponding X values."
stepByStep: "Enter both lists of paired values in matching order. The calculator applies the least-squares formulas to compute the slope and intercept of the best-fit line, and returns the resulting equation in the form y = mx + b."
realWorldUses: "This is a starting point for describing a linear trend in paired data — for example, how a measurement changes over time, how one quantity scales with another, or as a baseline before applying more advanced statistical modeling."
commonMistakes:
  - "Fitting a straight line to data that's clearly non-linear just because the calculator will produce an equation regardless — check a scatter plot first."
  - "Using the resulting equation to predict y for x values far outside the range of the original data, where the linear trend may no longer hold."
---

# Linear Regression Calculator

Enter paired X and Y values, and this calculator finds the straight line — expressed as y = mx + b — that best fits your data using the least-squares method.

## Formula

**Slope (m) = (n·Σxy − Σx·Σy) / (n·Σx² − (Σx)²)**, and **Intercept (b) = (Σy − m·Σx) / n**. The least-squares approach finds the specific slope and intercept that minimize the total squared vertical distance between the line and every data point — it's the line that fits the data as closely as possible in that specific sense.

For the pairs (1,2), (2,3), (3,5), (4,4), and (5,6), this works out to a slope of 0.9 and an intercept of 1.3, giving the equation **y = 0.9x + 1.3**.

## Reading the equation

The slope tells you the average change in y for each one-unit increase in x — here, y tends to rise by about 0.9 for every increase of 1 in x. The intercept, 1.3, is the line's predicted value of y when x equals 0; whether that number is meaningful depends on whether x=0 is a sensible point in your data's context, or just a mathematical anchor for the line.

## This always returns a line — check if that's the right call

This calculator fits a straight line no matter what the underlying data actually looks like. If a scatter plot of your points clearly curves rather than following a straight trend, the regression equation will still compute, but it won't describe the data well. It's worth visually checking the shape of your data before relying on a linear equation to summarize or predict from it — and being cautious about using the equation to predict y values far outside the range of x values you actually have data for.
