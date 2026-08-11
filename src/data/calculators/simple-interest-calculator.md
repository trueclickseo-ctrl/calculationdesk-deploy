---
title: "Simple Interest Calculator - Short-Term Interest & Loan Yield Planner"
seoTitle: "Simple Interest Calculator - Calculate Linear Interest & Maturity | CalculationDesk"
metaDescription: "Calculate simple (non-compounding) interest earned on a principal amount, with support for tenure entered in years, months, or days."
category: "financial"
subcategory: "investment-calculators"
tags: ["simple interest calculator", "simple interest formula", "linear interest rate", "short term loan interest", "simple interest days months"]
priority: "high"
importance: 8
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-11"
formulaVerified: true
version: "2.1"
contentStatus: "published"
lastReviewed: "2026-08-11"
nextReviewDate: "2026-11-11"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "Primary simple (non-compounding) interest calculation query"
titleVariants:
  - "Simple Interest Calculator - Calculate Linear Interest & Maturity | CalculationDesk"
aiSummary:
  definition: "This calculator computes simple interest — interest calculated only on the original principal, never on previously accrued interest — over a tenure entered in years, months, or days, and returns the total maturity value."
  quickAnswer: "Depositing $10,000 for 18 months at 6% annual simple interest earns $900.00 in interest, for a total maturity value of $10,900.00."
  formulaSummary: "I = P * (R/100) * t | A = P + I | t = Years, or Months/12, or Days/365"
  whenToUse: "Use this calculator for interest that doesn't compound — short-term loans, some promissory notes, and certain fixed-payout savings products."
  whoShouldUse: "Borrowers and lenders on short-term, non-compounding loans, and students learning the basic interest formula."
  limitations: "Calculates linear, non-compounding interest only. Uses a 365-day year when tenure is entered in days, which is the standard convention but may not match every lender's specific day-count method (some use 360-day conventions)."
  keyTakeaways:
    - "Every period earns exactly the same dollar amount of interest, because simple interest is always calculated on the original principal alone — unlike compound interest, prior interest earned never gets added to the base that future interest is calculated from."
    - "The calculator converts whatever tenure unit is entered — years, months, or days — into a fractional number of years before applying the formula, so a loan described in months or days still uses the same underlying yearly-rate formula."
    - "For any tenure longer than a single compounding period, compound interest will always produce a higher return than simple interest at the same nominal rate, because compounding lets interest itself start earning interest."
peopleAlsoAsk:
  - "What is the formula for calculating simple interest?"
  - "How are months and days converted to fractional years in simple interest?"
  - "What is the difference between simple and compound interest?"
  - "When is simple interest used in real life?"
examples:
  - title: "$10,000 at 6% for 18 Months"
    inputs: "Principal = $10,000, Interest Rate = 6% p.a., Tenure = 18 Months"
    calculation: "Fractional years: t = 18 / 12 = 1.5. Interest: I = 10,000 × (6/100) × 1.5 = $900.00. Maturity Value: A = 10,000 + 900 = $10,900.00."
    result: "Principal = $10,000 | Simple Interest Earned = $900.00 | Maturity Value = $10,900.00"
  - title: "$10,000 at 6% for 270 Days"
    inputs: "Principal = $10,000, Interest Rate = 6% p.a., Tenure = 270 Days"
    calculation: "Fractional years: t = 270 / 365 = 0.7397. Interest: I = 10,000 × (6/100) × 0.7397 = $443.84. Maturity Value: A = 10,000 + 443.84 = $10,443.84."
    result: "Principal = $10,000 | Simple Interest Earned = $443.84 | Maturity Value = $10,443.84"
faqs:
  - q: "What is the formula for calculating simple interest?"
    a: "Simple interest is I = P × (R/100) × t, where P is the principal, R is the annual interest rate as a percentage, and t is the tenure expressed as a fraction of a year. The maturity value is then the principal plus that interest: A = P + I."
  - q: "How are months and days converted to fractional years in simple interest?"
    a: "When tenure is entered in months, it's divided by 12 to get a fractional year (t = months ÷ 12). When entered in days, it's divided by 365 (t = days ÷ 365), following the standard banking day-count convention — some lenders use a 360-day convention instead, which would produce a slightly different result."
  - q: "What is the difference between simple and compound interest?"
    a: "Simple interest is calculated only on the original principal for every period, so the interest earned each period is identical and returns grow in a straight line. Compound interest adds each period's interest back into the balance, so future interest is calculated on a growing base, producing accelerating, exponential growth instead."
  - q: "When is simple interest used in real life?"
    a: "Simple interest commonly appears in short-term loans, some auto and personal loans, certain promissory notes, and a few fixed-payout deposit products. Most long-term savings and investment products (mutual funds, most fixed deposits, most bonds held to maturity) use compound interest instead."
references:
  - "https://www.sec.gov/investor/pubs/inwstors.htm"
formulaDescription: "The calculator first converts the entered tenure into a fraction of a year — using the number directly if entered in years, dividing by 12 if entered in months, or dividing by 365 if entered in days. That fractional-year tenure is then multiplied by the principal and the interest rate to give the total interest for the entire period, which is added to the principal for the final maturity value."
variablesExplained:
  - name: "P (Principal)"
    description: "The original amount deposited or borrowed."
  - name: "R (Interest Rate)"
    description: "The annual interest rate, entered as a percentage."
  - name: "t (Tenure Fraction)"
    description: "The tenure expressed as a fraction of a year — entered directly for years, divided by 12 for months, or divided by 365 for days."
stepByStep: "Enter the principal amount, the annual interest rate, and the tenure — choosing whether that tenure is in years, months, or days. The calculator converts the tenure to a fractional year, applies the simple interest formula, and returns the interest earned and total maturity value."
realWorldUses: "Borrowers and lenders use this to calculate the exact interest owed or earned on short-term, non-compounding loans and deposits, and students use it to understand the basic mechanics of interest before moving on to compound interest."
commonMistakes:
  - "Assuming simple interest compounds like most long-term savings products do — it never does, so every period's interest is identical rather than growing over time."
  - "Mixing up which day-count convention a specific lender uses — this calculator uses the common 365-day convention, but some lenders use 360 days, which would produce a slightly different interest figure for the same rate and day count."
---

# Simple Interest Calculator – Linear Interest Guide

Simple interest is calculated as a fixed percentage of the original principal for the entire tenure — the interest earned is never added back into the principal, so returns grow in a straight line rather than compounding.

## The Simple Interest Formula

$$I = P \times \frac{R}{100} \times t \qquad A = P + I$$

Where **P** is the principal, **R** is the annual interest rate, and **t** is the tenure expressed as a fraction of a year:

* If tenure is in years: $t = \text{Tenure}$
* If tenure is in months: $t = \dfrac{\text{Tenure}}{12}$
* If tenure is in days: $t = \dfrac{\text{Tenure}}{365}$

## Worked Example

**$10,000** invested for **18 months** at **6%** annual simple interest:

1. Convert to fractional years: $t = 18 \div 12 = 1.5$
2. Interest earned: $I = 10{,}000 \times \dfrac{6}{100} \times 1.5 = \$900.00$
3. Maturity value: $A = \$10{,}000 + \$900.00 = \$10{,}900.00$

## Tenure in Days

The same formula applies when tenure is entered in days, just using a 365-day year to find the fractional tenure. For the same $10,000 at 6%, a **270-day** term works out to:

1. Fractional years: $t = 270 \div 365 \approx 0.7397$
2. Interest: $I = 10{,}000 \times \dfrac{6}{100} \times 0.7397 \approx \$443.84$
3. Maturity value: $A = \$10{,}000 + \$443.84 = \$10{,}443.84$

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This uses a 365-day year for day-based tenures, which is standard but not universal — some lenders use a 360-day convention, producing a slightly different result for the same nominal rate and day count. This also doesn't model taxes on interest income or any fees a real loan or deposit might carry.

To see how the same principal grows with compounding instead, see the [Simple vs Compound Interest Calculator](/calculators/simple-compound-interest/).
