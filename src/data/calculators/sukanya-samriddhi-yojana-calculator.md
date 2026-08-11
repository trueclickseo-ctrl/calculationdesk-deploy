---
title: "Sukanya Samriddhi Yojana (SSY) Calculator - Girl Child Savings Planner"
seoTitle: "Sukanya Samriddhi Yojana Calculator - Calculate SSY Maturity Returns | CalculationDesk"
metaDescription: "Calculate the 21-year maturity value of a Sukanya Samriddhi Yojana (SSY) account, based on 15 years of annual deposits followed by 6 years of compounding-only growth."
category: "financial"
subcategory: "investment-calculators"
tags: ["sukanya samriddhi yojana calculator", "ssy calculator", "girl child savings scheme", "ssy maturity amount", "ssy interest rate"]
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
  reason: "Primary SSY maturity value calculation query"
titleVariants:
  - "Sukanya Samriddhi Yojana Calculator - Calculate SSY Maturity Returns | CalculationDesk"
aiSummary:
  definition: "This calculator estimates the maturity value of a Sukanya Samriddhi Yojana (SSY) account — India's government-backed girl child savings scheme — based on 15 years of annual deposits followed by 6 additional years where the balance keeps compounding without new contributions, reaching maturity at 21 years."
  quickAnswer: "Depositing ₹50,000 annually for 15 years at 8.2% interest builds a balance of ₹14,91,996.44 by year 15, which then grows to ₹23,94,039.72 by year 21 — a tax-free maturity corpus with ₹16,44,039.72 in total interest on ₹7,50,000 invested."
  formulaSummary: "Years 1-15: B_t = (B_(t-1)+P)*(1+R/100) | Years 16-21: B_t = B_(t-1)*(1+R/100)"
  whenToUse: "Use this calculator to plan long-term savings for a girl child's education or marriage under the SSY scheme, and to see how the 15-year deposit period compares to the full 21-year maturity timeline."
  whoShouldUse: "Parents or legal guardians of a girl child under age 10 who is an Indian resident, planning long-term tax-free savings."
  limitations: "Assumes a single constant interest rate is maintained for the full 21-year period and that the exact same deposit amount is made every year for 15 years without a missed payment. Real SSY interest rates are revised periodically by the government."
  keyTakeaways:
    - "SSY has two distinct phases within its 21-year maturity timeline — 15 years of active annual deposits, followed by 6 more years where the account keeps earning compound interest with no further contributions allowed, before the full balance becomes payable."
    - "Because deposits stop after 15 years but the account doesn't mature until year 21, the account holder still benefits from 6 years of interest-only compounding on the accumulated balance — for the calculator's default example, that final 6-year stretch alone adds over ₹9 Lakhs to the balance."
    - "SSY carries Exempt-Exempt-Exempt (EEE) tax status in India — deposits qualify for Section 80C deduction, the interest earned is tax-free, and the entire maturity payout is exempt from income tax, which is a significant advantage over many other fixed-income options."
peopleAlsoAsk:
  - "What is the deposit tenure vs. maturity tenure in SSY?"
  - "What are the minimum and maximum annual deposit limits in SSY?"
  - "Who is eligible to open an SSY account?"
  - "Is the SSY maturity amount completely tax-free?"
examples:
  - title: "₹50,000/Year for 15 Years at 8.2% Interest"
    inputs: "Yearly Deposit = ₹50,000, Interest Rate = 8.2% p.a., Child Age = 1 Year"
    calculation: "Contribution phase (years 1-15): balance compounds annually with each year's deposit added first, reaching ₹14,91,996.44 by the end of year 15 (total deposited: ₹7,50,000). Growth phase (years 16-21): the balance continues compounding with no new deposits, reaching ₹23,94,039.72 by year 21."
    result: "Total Invested = ₹7,50,000 | Interest Earned = ₹16,44,039.72 | Tax-Free Maturity Amount = ₹23,94,039.72"
  - title: "₹1,00,000/Year for 15 Years at 8.2% Interest"
    inputs: "Yearly Deposit = ₹1,00,000, Interest Rate = 8.2% p.a., Child Age = 1 Year"
    calculation: "With double the annual deposit, balance at year 15 reaches ₹29,83,992.88 (total deposited: ₹15,00,000), growing to ₹47,88,079.45 by year 21 after the 6-year compounding-only phase."
    result: "Total Invested = ₹15,00,000 | Interest Earned = ₹32,88,079.45 | Tax-Free Maturity Amount = ₹47,88,079.45"
faqs:
  - q: "What is the deposit tenure vs. maturity tenure in SSY?"
    a: "Deposits are made annually for the first 15 years from account opening. After that, no further deposits are accepted, but the accumulated balance continues earning compound interest for another 6 years — the account reaches full maturity, and the balance becomes payable, at 21 years from opening."
  - q: "What are the minimum and maximum annual deposit limits in SSY?"
    a: "A minimum of ₹250 and a maximum of ₹1,50,000 can be deposited in a financial year. Depositing more than ₹1,50,000 doesn't earn interest on the excess, and that excess amount can be withdrawn."
  - q: "Who is eligible to open an SSY account?"
    a: "A parent or legal guardian can open an SSY account for a girl child who is an Indian resident and under 10 years of age at account opening. A family is generally limited to two SSY accounts, with an exception allowing a third in the case of twins or triplets."
  - q: "Is the SSY maturity amount completely tax-free?"
    a: "Yes. SSY has Exempt-Exempt-Exempt (EEE) tax status in India — deposits qualify for a Section 80C deduction, the interest that accrues each year is tax-free, and the full maturity amount paid out at the end of 21 years is exempt from income tax entirely."
references:
  - "https://www.nsiindia.gov.in"
formulaDescription: "The simulation runs year by year across the full 21-year account life. In each of the first 15 years, that year's deposit is added to the running balance before the combined total compounds at the annual interest rate — mirroring how deposits made early in the financial year earn a full year of interest. For the remaining 6 years, no deposit is added; the balance simply compounds on itself at the same rate each year until maturity."
variablesExplained:
  - name: "P (Yearly Contribution)"
    description: "The amount deposited each year during the 15-year contribution phase, subject to the ₹250 minimum and ₹1,50,000 maximum per year."
  - name: "R (Interest Rate)"
    description: "The scheme's current government-notified annual interest rate, applied to the growing balance every year across all 21 years."
  - name: "Contribution Phase vs. Growth Phase"
    description: "Years 1-15, when deposits are made and compound; and years 16-21, when the balance compounds alone with no further deposits allowed."
stepByStep: "Enter the planned yearly deposit amount, the current SSY interest rate, and the girl child's current age. The calculator simulates 15 years of annual deposits compounding together, then simulates 6 further years of compounding with no new deposits, and returns the total maturity value, total amount invested, and total interest earned at the end of the 21-year period."
realWorldUses: "Parents and guardians use this to plan how much to deposit annually to reach a target education or marriage fund by the time the account matures, and to see how much of the eventual payout comes from the deposit years versus the later compounding-only years."
commonMistakes:
  - "Assuming the account matures after the 15-year deposit period ends — SSY actually continues compounding for 6 more years with no further deposits, and the balance isn't payable until the full 21-year mark."
  - "Assuming the same interest rate will hold for the entire 21-year period — the government periodically revises SSY's rate, so a long-term projection using today's rate is an estimate, not a guarantee, of the actual eventual maturity value."
---

# Sukanya Samriddhi Yojana (SSY) Calculator – Girl Child Savings Guide

The Sukanya Samriddhi Yojana (SSY) is a government-backed savings scheme in India offering high interest rates and full tax exemption to build a dedicated fund for a girl child's education or marriage. This calculator projects the full **21-year maturity value**, split across a **15-year deposit phase** and a **6-year compounding-only growth phase**.

## How the SSY Calculation Works

**Contribution phase (years 1–15)** — each year's deposit is added, then the balance compounds:

$$\text{Balance}_t = (\text{Balance}_{t-1} + P) \times \left(1 + \frac{R}{100}\right)$$

**Growth-only phase (years 16–21)** — no new deposits, the balance simply compounds:

$$\text{Balance}_t = \text{Balance}_{t-1} \times \left(1 + \frac{R}{100}\right)$$

Where **P** is the annual deposit and **R** is the annual interest rate.

## Worked Example

Depositing **₹50,000 annually** for **15 years** at **8.2%**:

1. Contribution phase: each year, ₹50,000 is added and the total compounds at 8.2% — after 15 years, the balance reaches **₹14,91,996.44**, against **₹7,50,000** deposited
2. Growth phase: with no further deposits, that balance compounds for 6 more years, reaching **₹23,94,039.72** by year 21
3. Interest earned: $₹23{,}94{,}039.72 - ₹7{,}50{,}000 = ₹16{,}44{,}039.72$

## Why the Final 6 Years Matter So Much

Because the account doesn't mature until year 21 even though deposits stop at year 15, the compounding-only growth phase adds a substantial amount on its own — in the ₹50,000/year example, the balance grows from about ₹14.92 Lakhs to nearly ₹23.94 Lakhs in those final 6 years alone, an increase of over **₹9 Lakhs** with no additional money deposited. This is a meaningful part of the scheme's total return and is easy to overlook if only the 15-year deposit period is considered.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This assumes the same deposit is made every year without a missed payment, and that the interest rate stays constant for the full 21 years. SSY's rate is set and periodically revised by the Government of India, so a long-horizon projection using today's rate is an estimate rather than a guarantee of the eventual maturity value.

To compare against another government-backed savings option, see the [Post Office Scheme Interest Planner](/calculators/post-office-scheme-interest-planner/).
