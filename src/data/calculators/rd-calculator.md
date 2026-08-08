---
title: "RD Calculator - Recurring Deposit Maturity Calculator"
seoTitle: "RD Calculator - Calculate Recurring Deposit Returns | CalculationDesk"
metaDescription: "Free online Recurring Deposit (RD) Calculator. Calculate monthly deposit growth, interest earned, and final maturity amounts with quarterly compounding equations."
category: "financial"
subcategory: "investment-calculators"
tags: ["rd calculator", "recurring deposit calculator", "rd interest calculator", "monthly deposit calculator", "compound interest"]
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
  definition: "A Recurring Deposit (RD) is a term deposit account offered by banks allowing individuals to deposit a fixed sum of money every month over a set tenure while earning guaranteed interest."
  quickAnswer: "Depositing $5,000 monthly for 5 years (60 months) at 6.8% p.a. interest compounded quarterly yields a maturity value of $357,966 (Invested: $300,000 | Interest: $57,966)."
  formulaSummary: "M = Sum(P × (1 + r / 400)^(k / 3)) for k = 1 to n"
  whenToUse: "Use this tool to calculate expected returns when building monthly savings habits through bank term deposits."
  whoShouldUse: "Salaried workers, conservative savers, and financial planners."
  limitations: "Assumes consistent monthly deposits without missing payment deadlines. Premature withdrawals incur bank penalties."
  keyTakeaways:
    - "RD combines structured monthly savings with guaranteed fixed deposit interest rates."
    - "Interest is compounded quarterly by standard banking convention."
    - "Earlier monthly installments earn interest for a longer duration than later installments."
peopleAlsoAsk:
  - "What is the formula for calculating Recurring Deposit maturity value?"
  - "How is interest compounded on a Recurring Deposit (RD)?"
  - "What is the difference between RD and SIP?"
  - "What happens if I miss a monthly RD payment?"
examples:
  - title: "5-Year Monthly RD ($5,000 at 6.8% p.a.)"
    inputs: "Monthly Deposit = $5,000, Interest Rate = 6.8% p.a., Tenure = 5 Years (60 Months)"
    calculation: "Quarterly Rate = 6.8 / 400 = 0.017; M = Sum(5,000 × (1.017)^(k / 3)) for k = 1 to 60"
    result: "Total Invested = $300,000 | Est. Interest = $57,966 | Maturity Amount = $357,966"
faqs:
  - q: "What is a Recurring Deposit (RD)?"
    a: "A Recurring Deposit is a specialized bank term deposit where you save a fixed amount of money every month for a chosen tenure (e.g., 6 months to 10 years) at a fixed interest rate."
  - q: "How does RD differ from a Fixed Deposit (FD)?"
    a: "An FD requires a lump-sum single deposit up-front. An RD allows you to build savings gradually by depositing a fixed amount every month."
  - q: "How is RD interest compounded?"
    a: "Standard commercial banking rules compound RD interest on a quarterly basis. Because each monthly installment remains deposited for a different number of months, earlier installments accumulate more interest than later installments."
  - q: "Is RD interest taxable?"
    a: "Yes. RD interest is fully taxable based on your income tax bracket. In India, banks deduct TDS (Tax Deducted at Source) if total interest across term deposits exceeds threshold limits."
references:
  - "https://en.wikipedia.org/wiki/Recurring_deposit"
  - "https://www.rbi.org.in"
---

# RD Calculator – Recurring Deposit Returns & Maturity Guide

A **Recurring Deposit (RD)** is a popular term deposit product offered by commercial banks and post offices. It enables individuals with regular monthly income to build capital systematically by depositing a fixed sum of money every month while earning guaranteed interest rates comparable to Fixed Deposits.

---

### How Recurring Deposits Work

Unlike a Fixed Deposit (which requires a single lump-sum upfront payment), a Recurring Deposit allows you to save incrementally:
1. You commit to depositing a **fixed amount ($P$) every month**.
2. You select a **fixed tenure ($n$ months)**, usually ranging from 6 months to 10 years.
3. Interest is **compounded quarterly** on each installment based on the remaining months ($k$) the money stays in the account.

#### The Mathematical RD Formula (Quarterly Compounding)

Because each monthly deposit remains in the bank for a different duration, the maturity amount ($M$) is calculated by summing the future value of all individual monthly deposits:

$$M = \sum_{k=1}^{n} P \times \left(1 + \frac{r}{4 \times 100}\right)^{\frac{k}{3}}$$

Where:
- **$M$**: Total maturity amount payout.
- **$P$**: Fixed monthly installment deposit.
- **$r$**: Annual interest rate (percentage).
- **$n$**: Total number of monthly deposits ($\text{Tenure in Years} \times 12$).
- **$k$**: Remaining months each specific installment stays in the account ($k = n, n-1, \dots, 1$).

---

### Worked RD Example with Actual Numbers

Let's calculate the maturity value of depositing **$5,000 every month** at an annual interest rate of **6.8%** for **5 years (60 months)**:

1. **Calculate Quarterly Rate**:
   $$\text{Quarterly Rate} = \frac{6.8}{4 \times 100} = 0.017$$
2. **Apply Summation Across 60 Installments**:
   - Installment 1 (held 60 months = 20 quarters): $\$5,000 \times (1.017)^{20} = \$7,002.37$
   - Installment 2 (held 59 months): $\$5,000 \times (1.017)^{59/3} = \$6,962.90$
   - $\dots$
   - Installment 60 (held 1 month): $\$5,000 \times (1.017)^{1/3} = \$5,028.18$
3. **Sum of All 60 Installments ($M$)**:
   $$M \approx \$357,966$$
4. **Summary**:
   - **Total Deposits Paid**: $\$5,000 \times 60 = \$300,000$
   - **Estimated Interest Earned**: $\$357,966 - \$300,000 = \mathbf{\$57,966}$
   - **Total Maturity Value**: **$357,966**

---

### Key Factors Influencing RD Growth

1. **Monthly Deposit Amount**: Increasing your monthly contribution linearly increases both your invested capital and total interest.
2. **Tenure & Compounding**: Because earlier installments spend up to 5–10 years compounding in the bank, longer tenures significantly boost total interest earned relative to principal.
3. **Timely Deposits**: Missing monthly deposit deadlines may result in small bank penalty fees or loss of interest for that month.

---

### Frequently Asked Questions (FAQ)

* **Q1: Can the RD interest rate change after opening the account?**
  * A1: No. The interest rate remains locked in for the entire tenure at the contracted rate upon account opening.

* **Q2: What is the difference between RD and SIP?**
  * A2: An RD is a bank term deposit offering guaranteed, non-market-linked returns. A SIP (Systematic Investment Plan) invests in mutual funds where returns depend on stock/bond market performance.

* **Q3: Can I withdraw an RD account prematurely?**
  * A3: Yes, premature closure is permitted, but banks apply a penalty fee (usually 0.5%–1% interest rate reduction) and do not allow partial withdrawals.
