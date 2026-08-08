---
title: "Loan Eligibility Calculator - Borrowing Capacity & FOIR Planner"
seoTitle: "Loan Eligibility Calculator - Calculate Borrowing Capacity & FOIR | CalculationDesk"
metaDescription: "Free online Loan Eligibility Calculator. Calculate your maximum eligible loan principal, max allowed monthly EMI, and FOIR ratio debt capacity."
category: "financial"
subcategory: "loan-calculators"
tags: ["loan eligibility calculator", "borrowing capacity calculator", "foir calculator", "max loan amount eligible", "debt eligibility planner"]
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
  - "Loan Eligibility Calculator - Calculate Borrowing Capacity & FOIR | CalculationDesk"
aiSummary:
  definition: "The Loan Eligibility Calculator estimates the maximum loan amount a bank is likely to approve based on your net monthly income, existing debt obligations, and maximum FOIR (Fixed Obligations to Income Ratio) limit."
  quickAnswer: "With a $10,000 monthly income, $1,500 existing EMIs, a 50% FOIR limit, a 20-year tenure, and 7.5% interest, your max allowed EMI capability is $3,500/month, resulting in a maximum eligible loan principal of $434,166."
  formulaSummary: "1. Max EMI Capability = (Income × FOIR / 100) - Existing EMIs | 2. Max Loan Amount = Max EMI × [((1+r)^N - 1) / (r × (1+r)^N)]"
  whenToUse: "Use this tool to calculate your borrowing power before applying for home, personal, or commercial loans."
  whoShouldUse: "Home buyers, loan applicants, borrowers, and financial planners."
  limitations: "Calculates maximum borrowing eligibility using standard FOIR debt capacity rules and reducing-balance present value equations."
  keyTakeaways:
    - "FOIR (Fixed Obligations to Income Ratio) caps the maximum proportion of monthly income allocated to debts (calculator default is 50%)."
    - "Calculates Max Allowed EMI as (Income × FOIR / 100) − Existing EMIs."
    - "Reverses reducing-balance EMI math to derive the maximum loan principal approved."
peopleAlsoAsk:
  - "What is FOIR in loan eligibility calculations?"
  - "How is maximum eligible loan principal calculated from monthly income?"
  - "How do existing EMIs reduce new loan eligibility?"
  - "How can I increase my maximum borrowing capacity?"
examples:
  - title: "20-Year Loan ($10,000 Monthly Income, $1,500 Existing EMIs, 50% FOIR, 7.5% p.a. Interest)"
    inputs: "Net Monthly Income = $10,000, Existing Monthly EMIs = $1,500, Expected Interest = 7.5% p.a., Duration = 20 Years, FOIR Limit = 50%"
    calculation: "Max EMI Capability = (10,000 × 50%) - 1,500 = $3,500/month. Monthly rate r = 7.5 / 12 / 100 = 0.00625; Months N = 240. Max Loan Amount = 3,500 × [((1.00625)^240 - 1) / (0.00625 × (1.00625)^240)] = $434,166."
    result: "Max EMI Allowed = $3,500 | Max Eligible Loan Principal = $434,166 | Existing Debt Ratio = 15%"
faqs:
  - q: "What is FOIR (Fixed Obligations to Income Ratio)?"
    a: "FOIR is a debt-to-income metric used by financial institutions to measure what portion of your take-home pay is committed to debt repayments. Lenders typically limit total monthly debt obligations to 40%–60% of net monthly salary."
  - q: "Do all banks use a 50% FOIR limit?"
    a: "No. Bank FOIR thresholds vary depending on lender risk policies, borrower salary brackets, and loan types. Higher-income applicants may qualify for FOIR limits up to 60%–65%, whereas lower-income brackets may be capped at 40%."
  - q: "What happens if my existing EMIs exceed the FOIR limit?"
    a: "If your active debt payments equal or exceed your maximum allowed FOIR threshold, your available EMI budget drops to $0, resulting in $0 additional loan eligibility until existing debts are paid off."
references:
  - "https://www.consumerfinance.gov/ask-cfpb/what-is-a-debt-to-income-ratio-en-1791/"
---

# Loan Eligibility Calculator – Borrowing Capacity & FOIR Guide

Before applying for a loan, financial institutions assess your **borrowing capacity** to ensure you can afford monthly repayments without defaulting.

This calculator computes your **maximum allowed monthly EMI, maximum eligible loan principal, and income buffer balance** based on your income, active debts, and FOIR limit.

---

### How the Eligibility Calculation Engine Works

#### Step 1: Maximum Monthly EMI Capability
Max EMI Allowed = (Net Monthly Income × FOIR % / 100) − Existing Monthly EMIs

Where FOIR (Fixed Obligations to Income Ratio) represents the percentage cap set by lenders (typically 50%).

#### Step 2: Maximum Approved Loan Principal (Max Principal)
By reversing the standard reducing-balance EMI formula, the calculator converts your Max Monthly EMI capability into total principal:

Max Principal = Max EMI Allowed × [ ((1 + r)^N − 1) / (r × (1 + r)^N) ]

Where:
- **r**: Monthly interest rate (Annual Rate % / 12 / 100).
- **N**: Total loan duration in months (Tenure in Years × 12).

---

### Step-by-Step Worked Numerical Example (Verified against Code)

Suppose an applicant earns a **net monthly income of $10,000**, pays **$1,500 in existing monthly EMIs**, has a bank **FOIR cap of 50%**, and seeks a **20-year loan (240 months)** at an interest rate of **7.5%**:

1. **Calculate Maximum Monthly EMI Capability**:
   Max EMI = ($10,000 × 0.50) − $1,500 = $5,000 − $1,500 = **$3,500.00 / month**
2. **Calculate Monthly Interest Rate (r)**:
   r = 7.5 / (12 × 100) = 0.00625
3. **Calculate Maximum Eligible Loan Principal (Max Principal)**:
   Max Principal = 3,500 × [ ((1.00625)^240 − 1) / (0.00625 × (1.00625)^240) ] = **$434,166**
4. **Summary**:
   - **Net Monthly Salary**: **$10,000**
   - **Existing Debts**: **$1,500 (15% of income)**
   - **Max Monthly EMI Allowed**: **$3,500**
   - **Max Eligible Loan Principal**: **$434,166**

---

### Frequently Asked Questions (FAQ)

* **Q1: Does this eligibility figure guarantee final loan approval?**
  * A1: No. This calculator provides an accurate mathematical baseline. Final lender approval also depends on credit score verification, property valuation, employment status, and individual underwriting criteria.
