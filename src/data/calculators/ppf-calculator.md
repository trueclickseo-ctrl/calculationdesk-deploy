---
title: "PPF Calculator - Public Provident Fund Calculator"
seoTitle: "PPF Calculator - Public Provident Fund Maturity Calculator | CalculationDesk"
metaDescription: "Calculate your Public Provident Fund (PPF) maturity amount, total deposits, and interest earned over the 15-year (or extended) lock-in period."
category: "financial"
subcategory: "investment-calculators"
tags: ["ppf calculator", "public provident fund calculator", "ppf maturity calculator", "ppf interest calculator"]
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
  reason: "Primary Public Provident Fund maturity and interest projection query"
titleVariants:
  - "PPF Calculator - Public Provident Fund Maturity Calculator | CalculationDesk"
aiSummary:
  definition: "The Public Provident Fund (PPF) is a long-term, government-backed savings scheme with a minimum 15-year lock-in and annually compounded interest. This calculator projects the maturity value of yearly PPF deposits made at the start of each year."
  quickAnswer: "Depositing 150,000 every year for the standard 15-year tenure at an annual interest rate of 7.1% grows to a maturity value of approximately 4,068,209.22, made up of 2,250,000 in total deposits and 1,818,209.22 in interest earned."
  formulaSummary: "M = P * [((1 + i)^n - 1) / i] * (1 + i) | i = AnnualRate / 100"
  whenToUse: "Use this calculator to project the maturity value of a PPF account over its mandatory 15-year lock-in, or over an extended tenure in blocks of 5 years."
  whoShouldUse: "PPF account holders and anyone evaluating this scheme as part of a long-term, low-risk savings plan."
  limitations: "Assumes a constant annual interest rate and a fixed annual deposit made at the start of each year. The actual PPF rate is set by the government and revised periodically, and real-world deposit timing may vary."
  keyTakeaways:
    - "PPF uses the same annuity-due compounding formula as a SIP, but compounds annually rather than monthly since deposits and interest crediting both happen on a yearly basis."
    - "The mandatory minimum tenure is 15 years, after which the account can be extended indefinitely in blocks of 5 years, with or without further deposits."
    - "Because PPF compounds annually at a government-set rate rather than a market-linked one, the projection here is far more predictable than an SIP or lumpsum equity projection."
peopleAlsoAsk:
  - "What is the lock-in period for a PPF account?"
  - "Can I extend my PPF account after 15 years?"
  - "Is there a limit on how much I can deposit in PPF each year?"
  - "Is PPF interest tax-free?"
examples:
  - title: "Standard 15-Year PPF Tenure (150,000/year @ 7.1% p.a.)"
    inputs: "Annual Deposit = 150,000, Interest Rate = 7.1% p.a., Tenure = 15 Years"
    calculation: "i = 0.071; n = 15; M = 150,000 * [((1.071)^15 - 1) / 0.071] * 1.071 = 150,000 * 27.121395 = 4,068,209.22. Total Invested = 150,000 * 15 = 2,250,000. Interest Earned = 4,068,209.22 - 2,250,000 = 1,818,209.22."
    result: "Maturity Amount = 4,068,209.22 | Total Invested = 2,250,000.00 | Interest Earned = 1,818,209.22"
  - title: "Extended 25-Year PPF Tenure (150,000/year @ 7.1% p.a.)"
    inputs: "Annual Deposit = 150,000, Interest Rate = 7.1% p.a., Tenure = 25 Years (two 5-year extensions)"
    calculation: "i = 0.071; n = 25; M = 150,000 * [((1.071)^25 - 1) / 0.071] * 1.071 = 10,308,014.97."
    result: "Maturity Amount = 10,308,014.97 | Total Invested = 3,750,000.00 | Interest Earned = 6,558,014.97"
faqs:
  - q: "What is the lock-in period for a PPF account?"
    a: "A PPF account has a mandatory minimum lock-in period of 15 years from the date it was opened. Partial withdrawals are typically permitted from the 7th year onward, subject to specific rules and limits."
  - q: "Can I extend my PPF account after 15 years?"
    a: "Yes. Once the initial 15-year term ends, the account can be extended indefinitely in blocks of 5 years at a time, either with continued annual deposits or without making any further contributions."
  - q: "Is there a limit on how much I can deposit in PPF each year?"
    a: "Yes — PPF schemes typically set both a minimum and a maximum annual deposit limit (for example, a minimum of 500 and a maximum of 150,000 in a given financial year under Indian PPF rules). Deposits above the maximum limit are generally not eligible for interest."
  - q: "Is PPF interest tax-free?"
    a: "In jurisdictions where PPF is offered (such as India), the scheme is often structured to be tax-exempt on contributions, interest earned, and the maturity amount, subject to the specific tax rules in effect at the time. Tax treatment can change, so this calculator focuses on the maturity math rather than tax outcomes."
references:
  - "https://www.nsiindia.gov.in/(S(g25krd45pnyv1zzjne3ktp45))/InternalPage.aspx?Id_Pk=53"
formulaDescription: "PPF deposits are treated as an annuity due, just like a monthly SIP — except the period is a full year instead of a month, since PPF deposits and interest crediting both happen annually. Each year's deposit is assumed to be made at the start of that year, giving it the full year to compound before the next deposit arrives."
variablesExplained:
  - name: "P (Annual Deposit)"
    description: "The amount deposited into the PPF account each year."
  - name: "i (Annual Rate)"
    description: "The government-declared annual PPF interest rate, converted to a decimal."
  - name: "n (Tenure in Years)"
    description: "The number of years the account has been active — a minimum of 15, extendable in blocks of 5."
stepByStep: "Enter your planned annual deposit, the current PPF interest rate, and your intended tenure in years (minimum 15). The calculator compounds each year's deposit annually using the annuity-due formula and returns your projected maturity amount, total deposits, and interest earned."
realWorldUses: "PPF account holders use calculators like this to project how much their account will be worth at the end of the mandatory 15-year term, or after extending it in 5-year blocks, and to compare that against other long-term, lower-risk savings options."
commonMistakes:
  - "Assuming the PPF interest rate stays fixed for the entire tenure, when in practice the government reviews and can revise the rate periodically — this calculator uses whichever single rate you enter for the full projection."
  - "Forgetting that PPF has a mandatory minimum tenure of 15 years and cannot be withdrawn in full before then except under limited, specific circumstances."
---

# PPF Calculator – Public Provident Fund Maturity Projection

The **Public Provident Fund (PPF)** is a long-term, government-backed savings scheme with a mandatory minimum lock-in of 15 years. Interest compounds annually at a rate set by the government and reviewed periodically, making it one of the more predictable long-term savings vehicles available to account holders.

This calculator projects your **Maturity Amount**, **Total Invested**, and **Interest Earned** based on your planned annual deposit, the current interest rate, and your chosen tenure.

## The PPF Maturity Formula

PPF deposits compound the same way a SIP does, except annually instead of monthly — each year's deposit is treated as though it's made at the start of the year, giving it a full year to grow before the next deposit arrives:

$$M = P \times \left[ \frac{(1 + i)^n - 1}{i} \right] \times (1 + i)$$

Where:
* **M**: Projected maturity amount.
* **P**: Annual deposit amount.
* **i**: Annual interest rate, as a decimal.
* **n**: Tenure in years (minimum 15, extendable in blocks of 5).

## Worked Example

For an annual deposit of **150,000** over the standard **15-year** tenure at **7.1%** annual interest:

1. $i = 0.071$, $n = 15$
2. $(1.071)^{15} \approx 2.797964$
3. $M = 150{,}000 \times \left[\dfrac{2.797964 - 1}{0.071}\right] \times 1.071 \approx 4{,}068{,}209.22$
4. Total invested: $150{,}000 \times 15 = 2{,}250{,}000.00$
5. Interest earned: $4{,}068{,}209.22 - 2{,}250{,}000.00 = 1{,}818{,}209.22$

## Extending Beyond 15 Years

PPF accounts can be extended indefinitely in 5-year blocks after the initial 15-year term, either with continued deposits or without. Extending the same 150,000/year deposit and 7.1% rate:

| Tenure | Maturity Amount | Total Invested | Interest Earned |
| :--- | :---: | :---: | :---: |
| 15 years (standard) | 4,068,209.22 | 2,250,000.00 | 1,818,209.22 |
| 20 years | 6,658,288.17 | 3,000,000.00 | 3,658,288.17 |
| 25 years | 10,308,014.97 | 3,750,000.00 | 6,558,014.97 |
| 30 years | 15,450,910.59 | 4,500,000.00 | 10,950,910.59 |

*Each additional 5-year extension adds proportionally more to the maturity value than the last, since a larger balance is compounding for those extra years.*

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This projection assumes a single fixed interest rate for the entire tenure, when the actual government-declared PPF rate can be revised from year to year. It also doesn't model partial withdrawals, which are typically allowed from the 7th year onward and would reduce the compounding balance.

To compare a PPF projection against a market-linked recurring investment, see the [SIP Calculator](/calculators/sip-calculator/), or model a fixed-term bank deposit with the [FD Calculator](/calculators/fd-calculator/).
