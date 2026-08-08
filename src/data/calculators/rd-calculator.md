---
title: "RD Calculator - Recurring Deposit Maturity Calculator"
seoTitle: "RD Calculator - Calculate Recurring Deposit Returns | CalculationDesk"
metaDescription: "Free online RD Calculator. Calculate Recurring Deposit maturity values, total monthly deposits, and quarterly compounding interest earned."
category: "financial"
subcategory: "investment-calculators"
tags: ["rd calculator", "recurring deposit calculator", "rd interest rate", "quarterly compounding rd", "monthly savings calculator"]
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
  - "RD Calculator - Calculate Recurring Deposit Returns | CalculationDesk"
aiSummary:
  definition: "A Recurring Deposit (RD) is a bank term deposit where an investor deposits a fixed amount monthly over a set tenure, earning quarterly compounding interest identical to Fixed Deposit rates."
  quickAnswer: "Depositing 5,000 monthly for 5 years (60 months) at 6.8% annual interest yields a total maturity value of 357,964 ($300,000 invested principal | 57,964 interest earned)."
  formulaSummary: "M = Sum_{k=1}^n P × (1 + r / 400)^(k / 3)"
  whenToUse: "Use this calculator to determine maturity amounts and interest returns for systematic monthly bank savings deposits."
  whoShouldUse: "Salaried individuals, regular monthly savers, and conservative investors."
  limitations: "Calculates RD returns using standard commercial banking quarterly compounding formulas."
  keyTakeaways:
 - "Models monthly deposits with quarterly interest compounding for each installment."
 - "First monthly deposit earns interest for the full tenure; the last deposit earns interest for 1 month."
 - "Locks in a fixed interest rate for all future monthly installments over the tenure."
peopleAlsoAsk:
  - "What is the formula for calculating Recurring Deposit maturity value?"
  - "How does quarterly compounding work for monthly RD deposits?"
  - "How does an RD differ from a Fixed Deposit (FD)?"
  - "Is RD interest taxable?"
examples:
  - title: "5-Year Monthly RD ($5,000/month at 6.8% p.a. interest rate)"
 inputs: "Monthly Deposit = 5,000, Interest Rate = 6.8% p.a., Tenure = 5 Years (60 Months)"
 calculation: "Quarterly rate = 6.8 / 400 = 0.017; Sum_{k=1}^60 5,000 × (1.017)^(k / 3)"
 result: "Total Invested = 300,000 | Est. Interest = 57,964 | Maturity Amount = 357,964"
faqs:
  - q: "How is RD interest calculated by banks?"
 a: "Commercial banks compound RD interest quarterly. Each monthly deposit earns interest for the exact number of remaining months it stays in the account (M = sum_{k=1}^n P × (1 + (r / 400))^k/3)."
  - q: "What is the difference between an RD and an FD?"
 a: "A Fixed Deposit requires investing a lump-sum amount up front on day one. A Recurring Deposit lets you build wealth by depositing a smaller fixed amount every month over the tenure."
  - q: "Does the RD interest rate change during the tenure?"
 a: "No. When you open an RD account, the interest rate stays locked in for all monthly deposits throughout the agreed tenure."
references:
  - "https://en.wikipedia.org/wiki/Recurring_deposit"
---

# RD Calculator – Recurring Deposit Returns & Growth Guide

A **Recurring Deposit (RD)** is a specialized term deposit service offered by banks that allows individuals to build savings by depositing a fixed amount every month. RDs offer the safety of guaranteed returns and earn interest rates comparable to Fixed Deposits.

---

### How Bank RD Compounding Works

Unlike a single lump-sum deposit, an RD consists of multiple monthly installments. Commercial banking standards apply **quarterly compounding** to each installment based on how many months that deposit remains in the account:
- Your **first deposit** earns interest for the full duration (n months).
- Your **second deposit** earns interest for n-1 months.
- Your **final deposit** earns interest for 1 month.

#### The Mathematical Banking RD Formula

M = sum_{k=1}^n P × 1 + (r / 4 × 100)^(k / 3)

Where:
- **M (Maturity Amount)**: Total accumulated balance at maturity.
- **P (Monthly Deposit Amount)**: Fixed sum deposited each month.
- **r (Annual Interest Rate %)**: Quoted annual rate of interest.
- **n (Total Number of Months)**: Tenure in years × 12.
- **k (Remaining Months)**: Number of months each installment stays in the account (k = n - month + 1).

---

### Step-by-Step Worked Numerical Example

Let's calculate the maturity value for a **$5,000 monthly deposit** over **5 years (60 months)** at an annual interest rate of **6.8%**:

1. **Calculate Quarterly Interest Rate**:
 Quarterly Rate = (6.8 / 4 × 100) = 0.017
2. **Sum All 60 Monthly Installments**:
 - Month 1 Deposit (k=60): \5,000 × (1.017)^60/3 = $5,000 × (1.017)^20 = $7,002.39
 - Month 2 Deposit (k=59): \5,000 × (1.017)^59/3 = $6,962.97
 - dots
 - Month 60 Deposit (k=1): \5,000 × (1.017)^1/3 = $5,028.18
3. **Total Calculation Summary (Verified against Code)**:
 - **Total Principal Invested**: \5,000 × 60 = $300,000
 - **Estimated Interest Earned**: **$57,964**
 - **Total Expected Maturity Amount**: **$357,964**

---

### Frequently Asked Questions (FAQ)

* **Q1: What happens if I miss an RD monthly payment?**
  * A1: Banks may charge a small penalty fee for defaulted installments and calculate interest based on actual received payments.

* **Q2: Is RD interest taxable?**
  * A2: Yes. Interest earned on Recurring Deposits is treated as taxable income under standard income tax regulations.
