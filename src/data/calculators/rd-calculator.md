---
title: "RD Calculator - Recurring Deposit Maturity Calculator"
seoTitle: "RD Calculator - Recurring Deposit Maturity Calculator | CalculationDesk"
metaDescription: "Calculate the maturity value of a Recurring Deposit (RD) with quarterly-compounded interest on your fixed monthly installments."
category: "financial"
subcategory: "investment-calculators"
tags: ["rd calculator", "recurring deposit calculator", "rd maturity calculator", "recurring deposit interest calculator"]
priority: "high"
importance: 8
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
  reason: "Primary recurring deposit maturity projection query"
titleVariants:
  - "RD Calculator - Recurring Deposit Maturity Calculator | CalculationDesk"
aiSummary:
  definition: "A Recurring Deposit (RD) is a term deposit that lets you deposit a fixed amount every month into a bank account, earning interest compounded quarterly, similar to a Fixed Deposit but built around monthly contributions rather than a single lump sum."
  quickAnswer: "Depositing $1,000 every month for 1 year at an 8% annual interest rate (compounded quarterly) grows to a maturity value of approximately $12,529.33, made up of $12,000 in deposits and $529.33 in interest."
  formulaSummary: "M = sum over each monthly deposit of P * (1 + r/(4*100))^(k/3), where k is the number of months that installment remains on deposit"
  whenToUse: "Use this calculator to project the maturity value of a recurring monthly deposit before opening an RD account, or to compare it against a lump-sum Fixed Deposit."
  whoShouldUse: "Salaried savers who want to build a disciplined monthly savings habit with a fixed, predictable return."
  limitations: "Assumes a constant interest rate for the full tenure, no missed installments, and standard quarterly compounding. Real banks may compound differently or apply penalties for missed payments."
  keyTakeaways:
    - "Each monthly installment earns interest for a different length of time — the first deposit compounds for nearly the full tenure, while the last deposit barely compounds at all — so the maturity value is the sum of many individually-compounded deposits, not one single calculation."
    - "RD interest compounds quarterly by standard banking convention, even though deposits themselves are made monthly."
    - "An RD spreads your savings commitment across the year like a SIP, but pays a fixed, bank-guaranteed rate instead of a market-linked return."
peopleAlsoAsk:
  - "Does the RD interest rate change during the tenure?"
  - "Is there a penalty for missing a monthly RD payment?"
  - "Can I withdraw a Recurring Deposit before maturity?"
  - "Is RD interest taxable?"
examples:
  - title: "1-Year RD ($1,000/month @ 8% p.a.)"
    inputs: "Monthly Deposit = $1,000, Interest Rate = 8% p.a., Tenure = 12 Months"
    calculation: "Quarterly rate = 8/4/100 = 0.02. Each of the 12 monthly deposits compounds for its own remaining term (the first deposit for 12 months, the last for 1 month), summed together: M = sum of P*(1+0.02)^(k/3) for k = 12 down to 1 = $12,529.33. Total Invested = $1,000 * 12 = $12,000.00."
    result: "Maturity Amount = $12,529.33 | Total Invested = $12,000.00 | Interest Earned = $529.33"
  - title: "5-Year RD ($5,000/month @ 6.8% p.a.)"
    inputs: "Monthly Deposit = $5,000, Interest Rate = 6.8% p.a., Tenure = 5 Years (60 Months)"
    calculation: "Quarterly rate = 6.8/4/100 = 0.017. Summing the compounded value of all 60 monthly deposits gives a maturity amount of $357,771.11."
    result: "Maturity Amount = $357,771.11 | Total Invested = $300,000.00 | Interest Earned = $57,771.11"
faqs:
  - q: "Does the RD interest rate change during the tenure?"
    a: "No — the interest rate is locked in at the rate offered when you open the Recurring Deposit account, and stays fixed for the full tenure regardless of how market rates move afterward."
  - q: "Is there a penalty for missing a monthly RD payment?"
    a: "Most banks charge a small penalty fee for a missed monthly installment, and repeated missed payments can lead to the account being closed prematurely, sometimes with reduced interest on whatever was already deposited."
  - q: "Can I withdraw a Recurring Deposit before maturity?"
    a: "Yes, premature withdrawal is generally allowed, but banks typically apply a penalty — often a reduced interest rate (commonly 0.5% to 1% lower than the contracted rate) for the time the deposit was actually held, and partial withdrawals usually aren't permitted."
  - q: "Is RD interest taxable?"
    a: "In most jurisdictions, interest earned on a Recurring Deposit is fully taxable as regular income according to your applicable tax bracket. Some countries also require banks to withhold tax at source once total interest across your deposits crosses a set threshold in a financial year."
references:
  - "https://www.rbi.org.in"
formulaDescription: "Because each monthly deposit sits in the account for a different length of time before maturity, the calculator treats every installment as its own small compounding deposit: the first month's deposit compounds for almost the entire tenure, while the deposit made in the final month barely compounds at all. Interest compounds quarterly on each of these individual deposits, and summing all of them together gives the total maturity amount."
variablesExplained:
  - name: "P (Monthly Deposit)"
    description: "The fixed amount deposited into the RD account each month."
  - name: "r (Annual Rate)"
    description: "The annual interest rate offered on the RD, compounded quarterly."
  - name: "k (Remaining Months)"
    description: "For a given installment, the number of months left until maturity — used to determine how long that specific deposit compounds for."
stepByStep: "Enter your planned monthly deposit, the annual interest rate, and your tenure in years or months. The calculator computes the compounded value of every individual monthly deposit (each held for a different length of time) and sums them to project your total maturity amount."
realWorldUses: "Savers use RD calculators to project how a monthly savings habit will grow by a fixed maturity date, and to compare that projected return against alternatives like a lump-sum Fixed Deposit or a market-linked SIP."
commonMistakes:
  - "Assuming an RD compounds the same way a lump-sum Fixed Deposit does — because deposits arrive monthly but interest compounds quarterly, the calculation is meaningfully different from a single-deposit FD."
  - "Missing monthly installments without accounting for the penalty fees or reduced final maturity value that most banks apply for defaults."
---

# RD Calculator – Recurring Deposit Maturity Projection

A **Recurring Deposit (RD)** lets you build savings the way a Systematic Investment Plan does — with a fixed amount deposited every month — but pays a fixed, bank-guaranteed interest rate instead of a market-linked return, and compounds that interest quarterly like a standard Fixed Deposit.

This calculator projects your **Maturity Amount**, **Total Invested**, and **Interest Earned** based on your monthly deposit, interest rate, and tenure.

## How RD Maturity Is Calculated

Because each monthly deposit sits in the bank for a different length of time, the calculator treats every installment as its own separate compounding deposit. The very first deposit compounds for nearly the entire tenure; the last deposit, made just before maturity, barely compounds at all. Interest is applied quarterly (the standard convention for RDs, even though deposits are monthly), and the maturity amount is the sum of all these individually-compounded installments:

$$M = \sum_{k=1}^{n} P \times \left(1 + \frac{r}{4 \times 100}\right)^{\frac{k}{3}}$$

Where:
* **M**: Total maturity amount.
* **P**: Fixed monthly deposit.
* **r**: Annual interest rate.
* **n**: Total number of monthly deposits.
* **k**: Number of months a given installment remains on deposit (from 1 up to n).

## Worked Example

For a monthly deposit of **$1,000** over **1 year (12 months)** at an annual rate of **8%**:

1. Quarterly rate: $8 \div 4 \div 100 = 0.02$
2. The first deposit compounds for the full 12 months; the last compounds for just 1 month. Summing the compounded value of all 12 deposits gives $M \approx \$12{,}529.33$
3. Total invested: $\$1{,}000 \times 12 = \$12{,}000.00$
4. Interest earned: $\$12{,}529.33 - \$12{,}000.00 = \$529.33$

## Tenure Sensitivity ($5,000/month @ 6.8% p.a.)

| Tenure | Maturity Amount | Total Invested | Interest Earned |
| :--- | :---: | :---: | :---: |
| 1 year | $62,243.64 | $60,000.00 | $2,243.64 |
| 3 years | $200,058.97 | $180,000.00 | $20,058.97 |
| 5 years | $357,771.11 | $300,000.00 | $57,771.11 |
| 10 years | $858,986.41 | $600,000.00 | $258,986.41 |

## RD vs. Fixed Deposit

An RD and an FD both pay a fixed, bank-guaranteed rate — the difference is entirely in how the money goes in. An FD is a single lump sum deposited all at once, so the entire principal compounds from day one. An RD instead builds up gradually through monthly deposits, so only a fraction of your eventual total is actually earning interest in the early months. For the same total amount contributed over the same term, an FD will generally earn more interest than an RD, simply because more money is compounding for longer. Compare the two directly with the [FD Calculator](/calculators/fd-calculator/).

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This projection assumes every monthly installment is paid on time with no missed deposits, and does not account for premature-withdrawal penalties or taxes on the interest earned.
