---
title: "NPS (National Pension System) Calculator - Retirement & Annuity Calculator"
seoTitle: "NPS (National Pension System) Calculator - Calculate Corpus & Pension | CalculationDesk"
metaDescription: "Free online NPS (National Pension System) Calculator. Calculate retirement corpus, 60% tax-free lump sum, 40% annuity reinvestment, and projected monthly pension."
category: "financial"
subcategory: "retirement-calculators"
tags: ["nps national pension system calculator", "nps pension calculator", "nps lump sum annuity split", "pfrda nps calculator", "section 80ccd deduction"]
priority: "high"
importance: 10
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-09"
formulaVerified: true
version: "2.0"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "High organic search priority execution"
titleVariants:
  - "NPS (National Pension System) Calculator - Calculate Corpus & Pension | CalculationDesk"
aiSummary:
  definition: "The NPS (National Pension System) Calculator models systematic retirement wealth compounding, current balance growth, statutory 60% lump-sum / 40% annuity corpus splits, and monthly pension payouts."
  quickAnswer: "Contributing ₹10,000 monthly from age 25 to 60 at 10% expected return yields a total accumulated corpus of ₹3,82,82,768 (₹42 Lakhs invested | ₹3.40 Crores growth). With 40% annuity at 6%, lump-sum cash payout is ₹2.29 Crores and monthly pension is ₹76,566."
  formulaSummary: "Corpus FV = P × [((1+r)^n - 1) / r] × (1+r) + C × (1+r)^n | Lump Sum (60%) = FV - Annuity | Monthly Pension = (Annuity Corpus × Annuity Rate) / 12"
  whenToUse: "Use this tool to calculate your projected retirement corpus, configure annuity allocation options, and estimate your post-retirement monthly income."
  whoShouldUse: "Salaried employees, self-employed individuals, and retirement planners."
  limitations: "Assumes a constant expected rate of return over the investment horizon. Actual NPS fund returns depend on asset allocations (Equity, Corporate Bonds, Government Securities)."
  keyTakeaways:
 - "Calculates monthly compounding for recurring deposits plus lump-sum growth on existing balance."
 - "Mandatory statutory minimum of 40% must be reinvested in an annuity to generate a monthly pension."
 - "Up to 60% of the total accumulated corpus can be withdrawn as a tax-free lump sum at age 60."
peopleAlsoAsk:
  - "What is the formula for calculating total accumulated NPS corpus?"
  - "What is the statutory minimum annuity buy percentage in NPS?"
  - "How is the monthly pension calculated from the annuity corpus?"
  - "Is the 60% lump-sum withdrawal from NPS tax-free?"
examples:
  - title: "35-Year NPS Contribution (₹10,000/month at 10% expected return, 40% annuity at 6%)"
 inputs: "Monthly Contribution = ₹10,000, Current Age = 25, Retirement Age = 60, Current Balance = ₹0, Expected Return = 10%, Annuity % = 40%, Annuity Rate = 6%"
 calculation: "Total Months = 35 × 12 = 420 months; Monthly rate r = 10 / 1200; FV = 10,000 × [((1 + 10/1200)^420 - 1) / (10/1200)] × (1 + 10/1200) = ₹3,82,82,768; Reinvested Annuity (40%) = ₹1,53,13,107; Tax-Free Lump Sum (60%) = ₹2,29,69,661; Monthly Pension = (₹1,53,13,107 × 0.06) / 12 = ₹76,566/month."
 result: "Total Accumulated Corpus = ₹3,82,82,768 | Tax-Free Lump Sum = ₹2,29,69,661 | Reinvested Annuity = ₹1,53,13,107 | Monthly Pension = ₹76,566"
faqs:
  - q: "What is the statutory minimum annuity percentage in NPS?"
 a: "Upon reaching retirement at age 60, regulations mandate that a minimum of 40% of the total accumulated corpus must be used to purchase an annuity. You can elect to allocate up to 100% to annuity if you want a higher monthly pension."
  - q: "Is the 60% lump-sum withdrawal tax-free?"
 a: "Yes. Up to 60% of the total accumulated corpus can be withdrawn as a lump sum at age 60, and the entire 60% is 100% tax-free under Section 10(12A) of the Income Tax Act."
  - q: "How is the monthly pension calculated?"
 a: "Monthly pension is calculated by multiplying your total annuity corpus by the assumed annual annuity interest rate and dividing by 12 (Monthly Pension = frac(Annuity Corpus × Annuity Rate){12 × 100})."
  - q: "Does the calculator account for existing NPS balances?"
 a: "Yes. You can enter a 'Current NPS Balance' (C). The calculator compounds your existing balance alongside your ongoing monthly contributions (C × (1 + r)^n)."
references:
  - "https://www.pfrda.org.in"
  - "https://en.wikipedia.org/wiki/National_Pension_System"
---

# NPS (National Pension System) Calculator – Corpus & Pension Guide

The **National Pension System (NPS)** is a voluntary, long-term retirement savings scheme regulated by the Pension Fund Regulatory and Development Authority (PFRDA).

This tool computes **total accumulated retirement corpus, current balance growth, 60% tax-free lump-sum withdrawals, 40% mandatory annuity reinvestments, and projected monthly pensions**.

---

### How Inputs Drive the NPS Calculation

1. **Monthly Contribution (P) & Current NPS Balance (C)**: Your ongoing monthly savings and existing accumulated wealth.
2. **Current Age & Retirement Age (n)**: Establishes total investment months (n = (Retirement Age - Current Age) × 12).
3. **Expected Return Rate (%)**: The annual investment growth rate (r = Annual Return ÷ 12 ÷ 100).
4. **Annuity Buy % (Min 40%)**: The proportion of corpus allocated to purchase a pension plan.
5. **Annuity Return Rate (%)**: The annual interest rate paid by the annuity provider.

---

### Mathematical Methodology Used by the Calculator

#### 1. Total Accumulated Corpus (FV)

FV = P × ((1 + r)^n - 1 / r) × (1 + r) + C × (1 + r)^n

#### 2. Corpus Division

Annuity Corpus = FV × frac(Annuity Percentage){100}

Tax-Free Lump Sum Corpus = FV - Annuity Corpus

#### 3. Projected Monthly Pension Payout

Monthly Pension = frac(Annuity Corpus × frac{Annuity Rate){100}}{12}

---

### Worked Numerical Example (Verified against Code)

Suppose a **25-year-old** contributes **₹10,000 per month** until retiring at **age 60** (35 years = 420 months), starting with a **₹0 initial balance**, expecting a **10% annual return**, allocating **40% for annuity** at a **6% annuity return rate**:

1. **Investment Horizon**: 35 years = 420 months.
2. **Monthly Growth Rate (r)**: 10% ÷ 12 ÷ 100 = 0.008333 per month.
3. **Total Accrued Corpus (FV)**:
 FV = 10,000 × frac((1 + 0.008333)^420) - 1{0.008333} × (1 + 0.008333) ≈ ₹3,82,82,768
4. **Principal Invested vs. Growth**:
 - Total Invested Principal: ₹10,000 × 420 = ₹42,00,000$
 - Interest / Growth Earned: ₹3,82,82,768 - ₹42,00,000 = ₹3,40,82,768$
5. **Corpus Division at Age 60**:
 - Reinvested Annuity Corpus (40%): ₹3,82,82,768 × 0.40 = ₹1,53,13,107$
 - Tax-Free Lump Sum (60%): ₹3,82,82,768 × 0.60 = ₹2,29,69,661$
6. **Projected Monthly Pension**:
 Monthly Pension = (1,53,13,107 × 0.06 / 12) = ₹76,566 / month

---

### Frequently Asked Questions (FAQ)

* **Q1: What are the tax benefits under Section 80CCD?**
  * A1: NPS contributions qualify for tax deductions up to ₹1.5 Lakhs under Section 80C, plus an exclusive extra deduction up to ₹50,000 under Section 80CCD(1B), totaling up to ₹2 Lakhs per year.

* **Q2: Can I choose an annuity buy percentage higher than 40%?**
  * A2: Yes. The statutory minimum is 40%, but subscribers can allocate up to 100% to annuity if they prefer a larger monthly pension over a lump-sum cash payout.
