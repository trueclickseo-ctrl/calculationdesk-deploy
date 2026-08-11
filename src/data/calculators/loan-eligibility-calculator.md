---
title: "Loan Eligibility Calculator - Borrowing Capacity & FOIR Planner"
seoTitle: "Loan Eligibility Calculator - Calculate Borrowing Capacity & FOIR | CalculationDesk"
metaDescription: "Calculate your maximum eligible loan amount based on your net monthly income, existing debt obligations, and the bank's FOIR (Fixed Obligations to Income Ratio) limit."
category: "financial"
subcategory: "loan-calculators"
tags: ["loan eligibility calculator", "borrowing capacity calculator", "foir calculator", "max loan amount eligible", "debt eligibility planner"]
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
  reason: "Primary loan eligibility and borrowing-capacity FOIR query"
titleVariants:
  - "Loan Eligibility Calculator - Calculate Borrowing Capacity & FOIR | CalculationDesk"
aiSummary:
  definition: "This calculator estimates the maximum loan amount a bank is likely to approve, based on net monthly income, existing debt obligations, and the lender's maximum FOIR (Fixed Obligations to Income Ratio) — the share of income a borrower can safely allocate to debt repayment."
  quickAnswer: "With a $10,000 monthly income, $1,500 in existing EMIs, a 50% FOIR limit, 7.5% interest, and a 20-year tenure, the maximum EMI budget is $3,500/month, resulting in a maximum eligible loan amount of $434,462.46."
  formulaSummary: "Max EMI = (Income * FOIR/100) - Existing EMIs | r = Rate/12/100 | N = Years*12 | Max Loan = Max EMI * ((1+r)^N - 1) / (r*(1+r)^N)"
  whenToUse: "Use this calculator before applying for a home, personal, or auto loan to estimate how much a lender is likely to approve based on your income and existing debts."
  whoShouldUse: "Prospective home buyers, loan applicants, and anyone budgeting for a major purchase who wants to know their borrowing capacity before approaching a lender."
  limitations: "Uses a single FOIR percentage and a single fixed interest rate for the full tenure — actual bank approval also depends on credit score, employment verification, collateral, and each lender's individual underwriting policy, which can differ meaningfully from this estimate."
  keyTakeaways:
    - "FOIR (Fixed Obligations to Income Ratio) caps the share of monthly income a lender will let you commit to debt repayment, typically 40% to 60% depending on the lender and income bracket — this calculator uses that cap, minus your existing EMIs, to find your remaining monthly loan budget."
    - "The maximum eligible loan amount isn't set directly by income alone — it comes from reversing the standard EMI formula, converting your maximum affordable monthly payment into the largest principal that payment could service over the chosen tenure and rate."
    - "Paying off existing debts before applying, or extending the loan tenure, both increase the maximum eligible amount — paying down debt frees up more of the FOIR budget, while a longer tenure lowers the EMI needed to service any given loan size."
peopleAlsoAsk:
  - "What is FOIR in loan eligibility calculations?"
  - "How can I increase my loan eligibility?"
  - "Does a credit score affect loan eligibility?"
  - "What happens if my existing EMIs exceed the FOIR limit?"
examples:
  - title: "$10,000 Income, $1,500 Existing EMIs, 50% FOIR, 7.5% Interest, 20-Year Term"
    inputs: "Net Monthly Income = $10,000, Existing Monthly EMIs = $1,500, FOIR Limit = 50%, Interest Rate = 7.5% p.a., Tenure = 20 Years"
    calculation: "Max EMI = (10,000 * 50%) - 1,500 = $3,500/month. Monthly Rate (r) = 7.5/12/100 = 0.00625. Total Months (N) = 240. Max Loan = 3,500 * [(1.00625)^240 - 1] / [0.00625 * (1.00625)^240] = $434,462.46."
    result: "Max Monthly EMI Allowed = $3,500 | Max Eligible Loan Amount = $434,462.46 | Existing Debt Ratio = 15% of income"
  - title: "Same Profile, 30-Year Term Instead of 20"
    inputs: "Net Monthly Income = $10,000, Existing Monthly EMIs = $1,500, FOIR Limit = 50%, Interest Rate = 7.5% p.a., Tenure = 30 Years"
    calculation: "Max EMI stays $3,500/month, but extending the tenure to 360 months lets that same monthly budget support a larger loan: Max Loan = 3,500 * [(1.00625)^360 - 1] / [0.00625 * (1.00625)^360] = $500,561.70."
    result: "Max Monthly EMI Allowed = $3,500 | Max Eligible Loan Amount = $500,561.70"
faqs:
  - q: "What is FOIR in loan eligibility calculations?"
    a: "FOIR (Fixed Obligations to Income Ratio) is the percentage of your net monthly income that a lender will allow you to commit to fixed debt obligations — including the new loan's EMI plus any existing EMIs. Lenders commonly cap FOIR between 40% and 60%, with higher-income applicants sometimes qualifying for higher limits."
  - q: "How can I increase my loan eligibility?"
    a: "Three common levers: paying off or reducing existing debts to free up more of your FOIR budget, adding a co-applicant so their income is pooled into the eligibility calculation, or extending the requested loan tenure, which lowers the monthly EMI needed to service the loan and lets the same income support a larger principal."
  - q: "Does a credit score affect loan eligibility?"
    a: "Yes, though not directly through this calculator's formula. A strong credit score (typically 750 and above) makes lenders more willing to offer a higher FOIR limit and a lower interest rate, both of which increase the maximum loan amount you'd actually be able to borrow in practice."
  - q: "What happens if my existing EMIs exceed the FOIR limit?"
    a: "If your existing monthly obligations already meet or exceed the maximum FOIR budget, your available EMI capacity drops to zero and the calculator shows no additional loan eligibility — you'd need to reduce existing debt, increase income, or find a lender with a higher FOIR limit before qualifying for more borrowing."
references:
  - "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/"
formulaDescription: "The calculation happens in two steps. First, the maximum monthly EMI budget is found by applying the lender's FOIR percentage to net monthly income and subtracting any existing EMI obligations. Second, that maximum EMI is run backward through the standard reducing-balance loan formula — instead of solving for the payment given a principal, it solves for the largest principal a lender would let that payment service, given the interest rate and requested tenure."
variablesExplained:
  - name: "FOIR"
    description: "Fixed Obligations to Income Ratio — the maximum share of income a lender allows for combined debt repayment."
  - name: "Max EMI"
    description: "The largest monthly payment available for a new loan after subtracting existing debt obligations from the FOIR-capped income budget."
  - name: "r, N"
    description: "The monthly interest rate (annual rate ÷ 12 ÷ 100) and total number of monthly payments (tenure in years × 12) used to convert the Max EMI into a maximum loan principal."
stepByStep: "Enter your net monthly income, your existing monthly debt obligations, the expected interest rate, the loan tenure in years, and the lender's FOIR limit. The calculator first finds your maximum available monthly EMI budget, then converts that budget into the largest loan principal it could service at the given rate and tenure."
realWorldUses: "Prospective borrowers use this before approaching a bank to get a realistic sense of what loan size they're likely to qualify for, and to see how paying down existing debt, choosing a longer tenure, or a higher FOIR limit from a different lender would change their borrowing capacity."
commonMistakes:
  - "Treating the eligible amount as a guarantee rather than an estimate — actual approval also depends on credit score, employment verification, and each lender's specific underwriting policy, which can differ from a simple FOIR-based calculation."
  - "Forgetting that a longer tenure increases eligibility by lowering the required EMI, which can tempt borrowers into taking a larger loan than they'd actually want to pay interest on over a much longer period."
---

# Loan Eligibility Calculator – Borrowing Capacity & FOIR Guide

Before approving a loan, lenders check whether your income can realistically support the repayment without over-extending your finances. This calculator estimates your **maximum monthly EMI budget** and the **largest loan amount** that budget could service, based on your income, existing obligations, and the lender's FOIR limit.

## The Two-Step Eligibility Formula

**Step 1 — Maximum EMI budget:**

$$\text{Max EMI} = \left(\text{Net Monthly Income} \times \frac{\text{FOIR}}{100}\right) - \text{Existing Monthly EMIs}$$

**Step 2 — Maximum loan principal** (the standard EMI formula, reversed to solve for principal):

$$\text{Max Loan} = \text{Max EMI} \times \frac{(1 + r)^N - 1}{r \times (1 + r)^N}$$

Where **r** is the monthly interest rate and **N** is the tenure in months.

## Worked Example

A **$10,000** monthly income, **$1,500** in existing EMIs, a **50%** FOIR limit, **7.5%** interest, over a **20-year** term:

1. Max EMI budget: $(10{,}000 \times 0.50) - 1{,}500 = \$3{,}500$ per month
2. Monthly rate: $7.5 \div 12 \div 100 = 0.00625$
3. Total months: $20 \times 12 = 240$
4. Max loan amount: $3{,}500 \times \dfrac{(1.00625)^{240} - 1}{0.00625 \times (1.00625)^{240}} \approx \$434{,}462.46$

## How Tenure Changes Eligibility

The same $3,500 monthly EMI budget can support very different loan sizes depending on the tenure — a longer term lowers the payment required per dollar borrowed, which raises the maximum principal that budget can service:

| Tenure | Max Eligible Loan Amount |
|---|---|
| 10 years | $294,856.60 |
| 15 years | $377,556.99 |
| 20 years | $434,462.46 |
| 25 years | $473,618.64 |
| 30 years | $500,561.70 |

## How the FOIR Limit Changes Eligibility

At the same $10,000 income, $1,500 existing EMIs, 7.5% rate, and 20-year term, a lender's FOIR policy alone can swing eligibility significantly:

| FOIR Limit | Max EMI Budget | Max Eligible Loan Amount |
|---|---|---|
| 40% | $2,500 | $310,330.33 |
| 50% | $3,500 | $434,462.46 |
| 60% | $4,500 | $558,594.59 |

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This is a mathematical FOIR-based estimate only. It doesn't perform credit score checks, verify employment or income documentation, account for property valuation or collateral requirements, or reflect any individual lender's specific underwriting rules — all of which affect real-world loan approval.

To estimate the actual EMI on a loan of a given size rather than your maximum eligibility, see the [Home Loan Calculator](/calculators/home-loan-calculator/) or [Personal Loan Calculator](/calculators/personal-loan-calculator/).
