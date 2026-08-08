---
title: "FD Calculator - Fixed Deposit Maturity Calculator"
seoTitle: "FD Calculator - Calculate Fixed Deposit Interest & Maturity | CalculationDesk"
metaDescription: "Free online FD Calculator. Calculate Fixed Deposit maturity amounts, total interest earned, and the impact of compounding frequencies (monthly, quarterly, yearly)."
category: "financial"
subcategory: "investment-calculators"
tags: ["fd calculator", "fixed deposit calculator", "fd interest rate", "compound interest calculator", "term deposit calculator"]
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
  - "FD Calculator - Calculate Fixed Deposit Interest & Maturity | CalculationDesk"
aiSummary:
  definition: "A Fixed Deposit (FD) is a secure financial investment offered by banks and institutions where a lump-sum principal is locked in at a guaranteed interest rate over a fixed tenure."
  quickAnswer: "Investing $100,000 at 6.5% p.a. interest compounded quarterly for 5 years yields a maturity value of $138,042 ($38,042 interest earned)."
  formulaSummary: "A = P × (1 + r / (n × 100))^(n × t)"
  whenToUse: "Use this calculator to calculate maturity amounts and interest returns for fixed-rate bank term deposits across various compounding frequencies."
  whoShouldUse: "Conservative investors, retirees, salaried individuals, and financial planners."
  limitations: "Calculates pre-tax maturity amounts based on a fixed annual interest rate and chosen compounding frequency."
  keyTakeaways:
    - "Calculates compound interest based on selected frequency (monthly, quarterly, half-yearly, yearly)."
    - "Quarterly compounding is the standard default banking norm for fixed deposits."
    - "More frequent compounding (e.g. monthly) yields slightly higher overall interest returns."
peopleAlsoAsk:
  - "What is the formula for calculating Fixed Deposit maturity amount?"
  - "How does compounding frequency affect FD returns?"
  - "What is the difference between simple and compound interest in an FD?"
  - "Is FD interest taxable?"
examples:
  - title: "5-Year FD ($100,000 at 6.5% p.a., Quarterly Compounding)"
    inputs: "Principal = $100,000, Interest Rate = 6.5% p.a., Tenure = 5 Years, Compounding = Quarterly"
    calculation: "P = 100,000; r = 6.5; n = 4; t = 5; A = 100,000 × (1 + 6.5 / 400)^(4 × 5)"
    result: "Invested Principal = $100,000 | Est. Interest = $38,042 | Maturity Amount = $138,042"
faqs:
  - q: "What formula does this calculator use for FD maturity?"
    a: "The calculator uses the compound interest equation: $A = P \times \left(1 + \frac{r}{n \times 100}\right)^{n \times t}$, where $n$ represents the compounding frequency per year."
  - q: "What is the standard compounding frequency used by banks?"
    a: "Most commercial banks use quarterly compounding ($n = 4$) as their default standard for fixed deposits."
  - q: "How does monthly compounding compare to quarterly compounding?"
    a: "Monthly compounding ($n = 12$) reinvests interest 12 times a year instead of 4, yielding slightly higher total interest payouts over the investment tenure."
references:
  - "https://en.wikipedia.org/wiki/Fixed_deposit"
---

# FD Calculator – Fixed Deposit Interest & Maturity Guide

A **Fixed Deposit (FD)** is a low-risk investment product where you deposit a lump-sum amount with a bank or financial institution for a fixed period at a guaranteed interest rate. FDs offer predictable returns and capital protection.

---

### How Fixed Deposit Compounding Works

When you open an FD, your principal earns interest that compounds at regular intervals (monthly, quarterly, half-yearly, or yearly). Reinvesting accrued interest increases your effective return over time.

#### The Mathematical FD Maturity Formula

$$A = P \times \left(1 + \frac{r}{n \times 100}\right)^{n \times t}$$

Where:
- **$A$ (Maturity Amount)**: Total accumulated balance at the end of tenure.
- **$P$ (Principal Investment)**: Initial lump-sum deposit.
- **$r$ (Annual Interest Rate %)**: Quoted annual rate of interest.
- **$n$ (Compounding Frequency per Year)**: 
  - Monthly: $n = 12$
  - Quarterly: $n = 4$
  - Half-Yearly: $n = 2$
  - Yearly: $n = 1$
- **$t$ (Tenure in Years)**: Total investment duration in years.

---

### Step-by-Step Worked Numerical Example

Let's calculate the maturity value for a **$100,000 principal** invested at **6.5% annual interest** for **5 years**, compounded **quarterly ($n = 4$)**:

1. **Identify Inputs**:
   - $P = 100,000$
   - $r = 6.5\%$
   - $n = 4\text{ (quarterly)}$
   - $t = 5\text{ years}$
2. **Apply the FD Formula**:
   $$A = 100,000 \times \left(1 + \frac{6.5}{4 \times 100}\right)^{4 \times 5}$$
   $$A = 100,000 \times (1 + 0.01625)^{20}$$
   $$A = 100,000 \times (1.01625)^{20} \approx \mathbf{\$138,041.99}$$
3. **Summary (Verified against Code)**:
   - **Invested Principal**: **$100,000**
   - **Estimated Interest Earned**: $\$138,042 - \$100,000 = \mathbf{\$38,042}$
   - **Total Expected Maturity Amount**: **$138,042**

---

### Impact of Compounding Frequencies

Here is how compounding frequency affects returns on a **$100,000 FD at 6.5% over 5 years**:

- **Yearly Compounding ($n=1$)**: Maturity = **$137,009** | Interest = **$37,009**
- **Half-Yearly Compounding ($n=2$)**: Maturity = **$137,689** | Interest = **$37,689**
- **Quarterly Compounding ($n=4$)**: Maturity = **$138,042** | Interest = **$38,042**
- **Monthly Compounding ($n=12$)**: Maturity = **$138,282** | Interest = **$38,282**

*Key Takeaway*: Higher compounding frequencies reinvest interest faster, boosting total earnings.

---

### Frequently Asked Questions (FAQ)

* **Q1: Can I calculate FD tenure in months instead of years?**
  * A1: Yes, our calculator allows you to toggle tenure inputs between years and months. When entering months, the calculator automatically converts tenure to fractional years ($t = \text{months} \div 12$).
