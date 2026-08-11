---
title: "US Income Tax Calculator - Tax Year 2024 Federal Tax Estimator"
seoTitle: "US Income Tax Calculator - 2024 Federal Tax Bracket Estimator | CalculationDesk"
metaDescription: "Estimate your 2024 US federal income tax, marginal tax bracket, and effective tax rate using the progressive IRS tax brackets for Single or Married Filing Jointly."
category: "financial"
subcategory: "tax-calculators"
tags: ["us income tax calculator", "federal tax bracket calculator 2024", "effective tax rate calculator", "irs tax calculator"]
priority: "high"
importance: 9
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-09"
formulaVerified: true
version: "2.1"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "Primary US federal income tax bracket and effective rate calculation query"
titleVariants:
  - "US Income Tax Calculator - 2024 Federal Tax Bracket Estimator | CalculationDesk"
aiSummary:
  definition: "This calculator estimates 2024 US federal income tax liability using the IRS's progressive marginal tax brackets, supporting Single and Married Filing Jointly statuses with either the standard deduction or a custom itemized deduction."
  quickAnswer: "A Single filer earning $85,000 and claiming the $14,600 standard deduction owes $10,541 in federal tax on $70,400 of taxable income, landing in the 22% marginal bracket with an effective tax rate of 12.40%."
  formulaSummary: "TaxableIncome = max(0, GrossIncome - Deduction) | Tax computed bracket by bracket at each marginal rate (10% to 37%) | EffectiveRate = (Tax / GrossIncome) * 100"
  whenToUse: "Use this calculator to estimate your 2024 federal tax liability, see which marginal bracket you fall into, and compare your effective tax rate against your marginal rate."
  whoShouldUse: "US taxpayers estimating their federal tax bill for the 2024 tax year, filing in early 2025."
  limitations: "Estimates federal income tax only, using 2024 brackets and standard deduction amounts for Single and Married Filing Jointly statuses. Does not include state income tax, payroll taxes (Social Security/Medicare), tax credits, or other filing statuses like Head of Household."
  keyTakeaways:
    - "US federal tax brackets are progressive and marginal — each bracket's rate applies only to the slice of income that falls within it, not to your entire income, which is why your effective tax rate is always lower than your top marginal rate."
    - "Your marginal rate is the rate applied to your last dollar of income; your effective rate is your total tax divided by your gross income — the two numbers answer different questions and shouldn't be confused."
    - "The standard deduction amount depends on filing status ($14,600 for Single, $29,200 for Married Filing Jointly in 2024), and you can substitute a custom itemized deduction if it's larger than your standard deduction."
peopleAlsoAsk:
  - "What is the difference between standard and itemized deductions?"
  - "What is the difference between marginal and effective tax rates?"
  - "When do the 2024 tax brackets apply?"
  - "How do tax credits differ from tax deductions?"
examples:
  - title: "Single Filer, $85,000 Gross Income, Standard Deduction"
    inputs: "Gross Annual Income = $85,000, Filing Status = Single, Deduction = Standard ($14,600)"
    calculation: "Taxable Income = 85,000 - 14,600 = $70,400. 10% bracket on first $11,600 = $1,160.00. 12% bracket on $11,601-$47,150 ($35,550) = $4,266.00. 22% bracket on $47,151-$70,400 ($23,250) = $5,115.00. Total Tax = $1,160.00 + $4,266.00 + $5,115.00 = $10,541.00. Effective Rate = (10,541/85,000)*100 = 12.40%."
    result: "Taxable Income = $70,400.00 | Federal Tax Due = $10,541.00 | Marginal Bracket = 22% | Effective Tax Rate = 12.40%"
  - title: "Married Filing Jointly, $150,000 Gross Income, Standard Deduction"
    inputs: "Gross Annual Income = $150,000, Filing Status = Married Filing Jointly, Deduction = Standard ($29,200)"
    calculation: "Taxable Income = 150,000 - 29,200 = $120,800. Applying the married-filing-jointly brackets progressively (10% up to $23,200, 12% up to $94,300, 22% on the remainder up to $120,800) gives a total federal tax of $16,682.00."
    result: "Taxable Income = $120,800.00 | Federal Tax Due = $16,682.00 | Marginal Bracket = 22% | Effective Tax Rate = 11.12%"
faqs:
  - q: "What is the difference between standard and itemized deductions?"
    a: "The standard deduction is a flat amount set by filing status ($14,600 for Single, $29,200 for Married Filing Jointly in 2024) that reduces your taxable income automatically, with no need to document individual expenses. Itemizing instead means listing specific deductible expenses — like mortgage interest, charitable donations, or state and local taxes — and only makes sense if their total exceeds what the standard deduction would give you."
  - q: "What is the difference between marginal and effective tax rates?"
    a: "Your marginal tax rate is the rate applied to your last (highest) dollar of taxable income — 22% in the $85,000 example above. Your effective tax rate is your total tax divided by your gross income, expressed as a percentage — 12.40% in that same example. The effective rate is always lower than the marginal rate under a progressive system, because only the income within the top bracket is actually taxed at that top rate."
  - q: "When do the 2024 tax brackets apply?"
    a: "The 2024 federal tax brackets apply to income earned during the 2024 calendar year, and are used when filing your federal tax return in early 2025. The IRS typically adjusts bracket thresholds and standard deduction amounts annually for inflation, so a different year's income should be checked against that year's brackets."
  - q: "How do tax credits differ from tax deductions?"
    a: "A deduction reduces your taxable income before tax is calculated — a $1,000 deduction in the 22% bracket saves you $220 in tax. A credit instead reduces your actual tax bill dollar-for-dollar — a $1,000 credit saves you the full $1,000, regardless of your bracket. Credits are generally more valuable than deductions of the same face amount."
references:
  - "https://www.irs.gov"
formulaDescription: "US federal tax is progressive: taxable income is divided into brackets, and each bracket's rate applies only to the income that falls within that specific range, not to the whole amount. The calculator walks through each bracket in order, taxing whatever portion of income falls into it, until all taxable income has been accounted for — the sum of those bracket-by-bracket amounts is the total tax due."
variablesExplained:
  - name: "Gross Annual Income"
    description: "Total income before any deductions are applied."
  - name: "Filing Status"
    description: "Single or Married Filing Jointly — determines both the standard deduction amount and the bracket thresholds used."
  - name: "Deduction"
    description: "Either the flat standard deduction for your filing status, or a custom itemized deduction amount if you choose to itemize instead."
stepByStep: "Enter your gross annual income, select your filing status, and choose whether to use the standard deduction or enter a custom itemized deduction amount. The calculator computes your taxable income, walks it through each 2024 tax bracket to find your total federal tax, and reports your marginal bracket, effective tax rate, and estimated take-home amount."
realWorldUses: "Taxpayers use calculators like this to estimate their federal tax bill ahead of filing season, to see how a raise or bonus might push part of their income into a higher bracket, and to compare the standard deduction against itemizing when they have significant deductible expenses."
commonMistakes:
  - "Assuming your entire income is taxed at your top marginal rate — under a progressive system, only the income within that top bracket is taxed at that rate; everything below it is taxed at the lower rates for those brackets."
  - "Forgetting this calculator only covers federal income tax — actual take-home pay is also reduced by state income tax (where applicable) and payroll taxes for Social Security and Medicare, neither of which is modeled here."
---

# US Income Tax Calculator – 2024 Federal Tax Bracket Estimator

This calculator estimates your **2024 federal income tax** liability using the IRS's progressive marginal tax brackets, for **Single** or **Married Filing Jointly** filing status, with either the standard deduction or a custom itemized amount.

## How Progressive Tax Brackets Work

US federal tax brackets are progressive: each bracket's rate applies only to the slice of income that falls within that bracket, not to your entire income. Your last dollar earned is taxed at your top ("marginal") rate, but every dollar below that is taxed at the lower rates for its own bracket — which is why your effective tax rate always comes out lower than your marginal rate.

**2024 Single filer brackets:**

| Taxable Income | Rate |
| :--- | :---: |
| Up to $11,600 | 10% |
| $11,601 – $47,150 | 12% |
| $47,151 – $100,525 | 22% |
| $100,526 – $191,950 | 24% |
| $191,951 – $243,725 | 32% |
| $243,726 – $609,350 | 35% |
| Above $609,350 | 37% |

**2024 Married Filing Jointly brackets:**

| Taxable Income | Rate |
| :--- | :---: |
| Up to $23,200 | 10% |
| $23,201 – $94,300 | 12% |
| $94,301 – $201,050 | 22% |
| $201,051 – $383,900 | 24% |
| $383,901 – $487,450 | 32% |
| $487,451 – $731,200 | 35% |
| Above $731,200 | 37% |

The 2024 standard deduction is **$14,600** for Single filers and **$29,200** for Married Filing Jointly.

## Worked Example

A Single filer earning **$85,000**, claiming the standard deduction:

1. Taxable income: $85{,}000 - \$14{,}600 = \$70{,}400$
2. 10% bracket on first $11,600: $\$1{,}160.00$
3. 12% bracket on $11,601–$47,150 ($35,550): $\$4{,}266.00$
4. 22% bracket on $47,151–$70,400 ($23,250): $\$5{,}115.00$
5. Total federal tax: $\$1{,}160.00 + \$4{,}266.00 + \$5{,}115.00 = \$10{,}541.00$
6. Effective tax rate: $(10{,}541 \div 85{,}000) \times 100 \approx 12.40\%$

This filer lands in the **22% marginal bracket** despite an effective rate of just 12.40% — the gap between the two is the whole point of a progressive tax system.

## Marginal vs. Effective Rate at Different Incomes

Holding a Single filer with the standard deduction, at increasing income levels:

| Gross Income | Taxable Income | Federal Tax | Marginal Bracket | Effective Rate |
| :--- | :---: | :---: | :---: | :---: |
| $50,000 | $35,400 | $4,016.00 | 12% | 8.03% |
| $85,000 (example above) | $70,400 | $10,541.00 | 22% | 12.40% |
| $100,000 | $85,400 | $13,841.00 | 22% | 13.84% |
| $250,000 | $235,400 | $53,014.50 | 32% | 21.21% |

*Notice the effective rate climbs steadily but always stays well below the marginal rate at that income level — that gap is the effect of the lower brackets on all the income below the top one.*

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This estimates federal income tax only. It does not include state income tax (which varies widely by state, including several with no state income tax at all), payroll taxes for Social Security and Medicare, tax credits (like the Child Tax Credit or Earned Income Tax Credit), or filing statuses beyond Single and Married Filing Jointly, such as Head of Household or Married Filing Separately.
