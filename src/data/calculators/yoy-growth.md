---
title: "Year-over-Year (YoY) Growth Calculator"
seoTitle: "YoY Growth Calculator | CalculationDesk"
metaDescription: "Calculate year-over-year growth percentage between two annual values, for revenue, users, or any recurring metric."
category: "business"
subcategory: "growth-metrics-calculators"
tags: ["yoy growth calculator", "year over year growth", "annual growth rate calculator", "revenue growth percentage"]
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
  definition: "This calculator finds the year-over-year (YoY) growth rate between two values from the same period a year apart, expressed as a percentage."
  quickAnswer: "Revenue growing from $100,000 to $120,000 represents 20% year-over-year growth."
  formulaSummary: "YoY Growth % = ((Current Period - Previous Period) / Previous Period) x 100."
  whenToUse: "Use it to measure growth or decline in any recurring metric — revenue, users, sales volume — comparing the same period across two consecutive years, which naturally controls for seasonal fluctuations within a year."
  whoShouldUse: "Business analysts, investors, and company leadership tracking annual performance trends."
  limitations: "This measures growth between exactly two data points a year apart — it doesn't capture what happened in between (a metric could have spiked and crashed mid-year and still show steady YoY growth), so it's best paired with more granular period-over-period tracking for a complete picture."
  keyTakeaways:
    - "Comparing the same period one year apart is specifically what makes YoY growth useful for businesses with seasonal patterns, since it avoids the distortion of comparing, say, holiday-season sales against a slower month."
    - "A negative result indicates a year-over-year decline rather than growth — the same formula and sign convention naturally captures both directions of change."
    - "YoY growth can exceed 100% when a metric more than doubles compared to the prior year, which is common for early-stage, fast-growing businesses or metrics recovering from an unusually low prior-year baseline."
peopleAlsoAsk:
  - "Why is YoY growth preferred over month-over-month growth?"
  - "What's considered a good YoY growth rate?"
  - "How is YoY different from CAGR (compound annual growth rate)?"
  - "Can YoY growth be misleading?"
examples:
  - title: "$100k to $120k"
    inputs: "Previous Period = $100,000, Current Period = $120,000"
    calculation: "YoY = ((120000-100000)/100000) x 100 = 20"
    result: "YoY Growth = 20%"
faqs:
  - q: "Why is YoY growth preferred over month-over-month growth?"
    a: "Comparing a period against the same period one year earlier — rather than the immediately preceding month or quarter — cancels out seasonal effects that would otherwise distort the comparison. A retailer's December sales are naturally much higher than November's regardless of underlying business health, so comparing December to the prior December (YoY) gives a much clearer signal of real growth than comparing December to November."
  - q: "What's considered a good YoY growth rate?"
    a: "It depends heavily on the industry, company stage, and broader economic conditions — a mature, established company might consider 5-10% annual growth strong, while an early-stage startup might be expected to grow 50-100% or more year over year to be considered on a healthy trajectory. There's no single universal benchmark; YoY growth is most meaningful when compared against a company's own historical trend or against direct industry peers."
  - q: "How is YoY different from CAGR (compound annual growth rate)?"
    a: "YoY growth measures the change between exactly two points in time, one year apart, in a single snapshot calculation. CAGR (compound annual growth rate) measures the smoothed, average annual growth rate over a longer multi-year period, accounting for compounding — it's the constant annual rate that would take a starting value to an ending value over several years. CAGR is more useful for evaluating a longer growth trend, while YoY is better suited to tracking recent, period-specific performance."
  - q: "Can YoY growth be misleading?"
    a: "Yes — a single YoY growth figure only reflects two specific data points a year apart and says nothing about what happened in between, so a metric that dipped sharply mid-year and then recovered could still show a healthy YoY growth figure that masks real volatility. YoY growth calculated from an unusually low or unusually high prior-year baseline (a pandemic-affected year, for example) can also produce a misleadingly large or small growth percentage that doesn't reflect a business's typical trajectory."
references:
  - "https://www.investopedia.com/terms/y/year-over-year.asp"
formulaDescription: "The formula finds the difference between the current period's value and the same period from one year prior, then divides by the previous period's value to express that change as a proportion, and multiplies by 100 to convert it into a percentage."
variablesExplained:
  - name: "Previous Period"
    description: "The metric's value from one year prior."
  - name: "Current Period"
    description: "The metric's current value, from the same period this year."
stepByStep: "Enter the metric's value from one year ago and its current value for the same period. The calculator finds the percentage change between the two to return the year-over-year growth rate."
realWorldUses: "Business analysts and investors use YoY growth to track revenue, user count, and other key performance metrics over time, comparing a company's growth trajectory against its own history or against industry peers while controlling for seasonal effects within a given year."
commonMistakes:
  - "Comparing mismatched periods (like comparing a full year to a single quarter) rather than the exact same period a year apart, which produces a meaningless or misleading growth figure."
  - "Treating a single YoY growth figure as the complete picture of a business's performance, when it says nothing about volatility or trends that occurred between the two measured points."
---

# YoY Growth Calculator

Enter a metric's value from a year ago and its current value, and this calculator returns the year-over-year growth rate.

## Formula

**YoY Growth % = ((Current Period − Previous Period) ÷ Previous Period) × 100**

For revenue growing from $100,000 to $120,000: YoY = ((120,000 − 100,000) ÷ 100,000) × 100 = 20%.

## Why "same period, one year apart" is the whole point

The reason YoY comparisons are so widely used isn't arbitrary — comparing a period against itself from exactly one year earlier cancels out seasonal swings that would otherwise muddy the picture. A business comparing this December to last December sees real underlying growth or decline, while comparing December to November would mostly just reflect the holiday shopping bump that happens every year regardless of how the business is actually doing.

## What a single YoY number doesn't tell you

Because this calculation only looks at two snapshots exactly a year apart, it has no visibility into what happened in between — a metric that spiked and then crashed mid-year could still show a perfectly respectable YoY growth figure. It's also sensitive to the specific baseline used: growth calculated off an unusually low or high prior-year figure can look more dramatic than a business's typical trend actually warrants, which is worth keeping in mind before drawing conclusions from a single YoY number in isolation.
