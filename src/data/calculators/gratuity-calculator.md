---
title: "Gratuity Calculator - Payment of Gratuity Act Calculator"
seoTitle: "Gratuity Calculator - Calculate Employee Gratuity & Tax Exemption | CalculationDesk"
metaDescription: "Calculate the gratuity amount payable to an employee based on last drawn salary, years of service, and applicable statutory rounding rules."
category: "financial"
subcategory: "retirement-calculators"
tags: ["gratuity calculator", "payment of gratuity act calculator", "employee gratuity calculator", "gratuity tax exemption calculator"]
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
  reason: "Primary statutory gratuity entitlement and tax exemption calculation query"
titleVariants:
  - "Gratuity Calculator - Calculate Employee Gratuity & Tax Exemption | CalculationDesk"
aiSummary:
  definition: "Gratuity is a statutory retirement benefit paid by employers to employees who complete a minimum period of continuous service, calculated from the employee's last drawn basic salary plus dearness allowance and their years of service."
  quickAnswer: "An employee covered under the Act with a last drawn basic salary + DA of ₹80,000 and 12 years 7 months of service (rounded up to 13 years) is entitled to a gratuity of ₹6,00,000, which is fully tax-exempt since it's well below the ₹20,00,000 statutory ceiling."
  formulaSummary: "Covered: Gratuity = 15 * (Basic + DA) * RoundedYears / 26 | Not Covered: Gratuity = 15 * (Basic + DA) * CompletedYears / 30 | TaxFree = min(Gratuity, 2000000)"
  whenToUse: "Use this calculator to estimate the gratuity payout due when leaving a job after qualifying service, and to check how much of it falls within the tax-free limit."
  whoShouldUse: "Employees nearing retirement or resignation after long service, and HR or payroll teams calculating statutory dues."
  limitations: "Calculates the statutory formula amount only. Does not account for employer-specific gratuity schemes that pay above the statutory minimum, or country-specific variations outside the Payment of Gratuity Act framework."
  keyTakeaways:
    - "Employees covered under the Act use a divisor of 26 (representing working days in a month) and round their service period to the nearest year; employees not covered use a divisor of 30 and no rounding, which produces a different result even for identical inputs."
    - "Service exceeding 6 months rounds up to the next full year for covered employees, while 6 months or less rounds down — so 12 years 7 months becomes 13 years, but 12 years 6 months stays at 12."
    - "Gratuity is only payable after a minimum of 5 years of continuous service, except in cases of death or permanent disablement, where the minimum service requirement is waived."
peopleAlsoAsk:
  - "Is there a minimum service period to get gratuity?"
  - "Are contract employees eligible for gratuity?"
  - "Is Dearness Allowance included in the gratuity calculation?"
  - "What is the maximum tax-free gratuity limit?"
examples:
  - title: "Covered Employee, 12 Years 7 Months Service (₹80,000 Basic + DA)"
    inputs: "Last Drawn Basic + DA = ₹80,000, Years of Service = 12, Additional Months = 7, Covered Under Act = Yes"
    calculation: "Since 7 months exceeds the 6-month rounding threshold, service rounds up to 13 years. Gratuity = (15 * 80,000 * 13) / 26 = 15,600,000 / 26 = ₹6,00,000."
    result: "Rounded Years of Service = 13 | Gratuity Amount = ₹6,00,000.00 | Tax-Free Amount = ₹6,00,000.00 (fully exempt)"
  - title: "Non-Covered Employee, 10 Years 7 Months Service (₹80,000 Basic + DA)"
    inputs: "Last Drawn Basic + DA = ₹80,000, Years of Service = 10, Additional Months = 7, Covered Under Act = No"
    calculation: "Non-covered employees use completed years without rounding, so 10 years 7 months is treated as 10 completed years. Gratuity = (15 * 80,000 * 10) / 30 = ₹4,00,000."
    result: "Completed Years of Service = 10 | Gratuity Amount = ₹4,00,000.00 | Tax-Free Amount = ₹4,00,000.00 (fully exempt)"
faqs:
  - q: "Is there a minimum service period to get gratuity?"
    a: "Yes — under the Act, an employee must complete a minimum of 5 years of continuous service with the same employer to qualify for gratuity. This minimum-service requirement is waived only if the employee's service ends due to death or permanent disablement."
  - q: "Are contract employees eligible for gratuity?"
    a: "Generally yes — any employee hired directly by a company, including contract employees, is eligible for gratuity as long as they complete 5 years of continuous service and the employer meets the applicable headcount threshold (commonly 10 or more employees) at some point in the preceding year."
  - q: "Is Dearness Allowance included in the gratuity calculation?"
    a: "Yes — the calculation is based on the employee's last drawn Basic Salary plus Dearness Allowance (DA) only. Other components like House Rent Allowance, special allowances, or bonuses are not factored into the statutory gratuity formula."
  - q: "What is the maximum tax-free gratuity limit?"
    a: "The statutory tax-exempt ceiling is currently ₹20,00,000. Any gratuity amount an employee receives above this limit becomes taxable as income, even though the amount below the ceiling remains fully exempt."
  - q: "How is service rounded in the gratuity calculation?"
    a: "For employees covered under the Act, a service period with more than 6 months in the final year rounds up to the next full year — for example, 12 years and 7 months becomes 13 years. A remainder of 6 months or less rounds down instead, so 12 years and 6 months stays at 12 years. Employees not covered under the Act don't get this rounding; only fully completed years count."
references:
  - "https://labour.gov.in"
formulaDescription: "The formula pays 15 days of the employee's last drawn basic salary plus DA for every year of service, using a monthly divisor that differs depending on coverage: 26 working days per month for employees covered under the Act (with their service period rounded to the nearest year), or 30 calendar days per month for employees not covered (using only fully completed years, with no rounding). Whichever total results is then compared against the statutory tax-free ceiling to split it into exempt and taxable portions."
variablesExplained:
  - name: "Basic + DA"
    description: "The employee's last drawn basic salary plus dearness allowance — the only salary components used in the statutory formula."
  - name: "Years / Months of Service"
    description: "The employee's total continuous service, entered as whole years plus any additional months."
  - name: "Covered Under the Act"
    description: "Whether the employee's employment falls under the Payment of Gratuity Act, which determines the divisor (26 vs. 30) and whether service is rounded."
stepByStep: "Enter the employee's last drawn basic salary plus DA, their total years and months of service, and whether they're covered under the Payment of Gratuity Act. The calculator applies the appropriate divisor and rounding rule, computes the gratuity amount, and splits it into tax-free and taxable portions based on the statutory ceiling."
realWorldUses: "Employees use this calculator to estimate their gratuity payout before resigning or retiring, and HR or payroll teams use the same formula to compute statutory dues and determine how much of a departing employee's gratuity is taxable."
commonMistakes:
  - "Applying the wrong divisor for the employee's coverage status — using 26 for a non-covered employee or 30 for a covered one produces an incorrect gratuity figure."
  - "Forgetting that only Basic Salary plus DA counts toward the calculation, and mistakenly including other salary components like HRA or bonuses that the statutory formula excludes."
---

# Gratuity Calculator – Statutory Employee Gratuity & Tax Exemption

**Gratuity** is a statutory retirement benefit that employers pay to employees who complete a minimum period of continuous service, calculated from the employee's last drawn basic salary plus dearness allowance (DA) and their total years of service. This calculator computes the gratuity amount payable, along with how much of it falls within the statutory tax-free limit.

## The Gratuity Formulas

**For employees covered under the Act** (service rounded to the nearest year):

$$\text{Gratuity} = \frac{15 \times (\text{Basic} + \text{DA}) \times \text{Rounded Years of Service}}{26}$$

**For employees not covered under the Act** (no rounding, completed years only):

$$\text{Gratuity} = \frac{15 \times (\text{Basic} + \text{DA}) \times \text{Completed Years of Service}}{30}$$

**Tax exemption**: the statutory tax-free ceiling is currently ₹20,00,000. Any amount above that ceiling is taxable.

## Worked Example

An employee **covered under the Act**, with a last drawn basic salary + DA of **₹80,000**, has worked **12 years and 7 months**:

1. Since 7 months exceeds the 6-month rounding threshold, service rounds up to **13 years**.
2. Gratuity = $\dfrac{15 \times 80{,}000 \times 13}{26} = \text{₹}6{,}00{,}000$
3. Since ₹6,00,000 is well below the ₹20,00,000 ceiling, the entire amount is tax-free.

## Covered vs. Not Covered

Whether an employee is "covered under the Act" changes two things at once: the divisor used in the formula (26 versus 30) and whether service gets rounded. A non-covered employee with the same ₹80,000 salary and roughly the same tenure — 10 years and 7 months, treated as 10 completed years with no rounding — gets a materially different result: $\dfrac{15 \times 80{,}000 \times 10}{30} = \text{₹}4{,}00{,}000$. The two formulas aren't interchangeable, so it matters which one actually applies to a given employee.

## How Service Length Affects the Payout

For a covered employee earning ₹80,000 (basic + DA), with no partial-year rounding needed:

| Years of Service | Gratuity Amount |
| :--- | :---: |
| 5 years | ₹2,30,769.23 |
| 10 years | ₹4,61,538.46 |
| 15 years | ₹6,92,307.69 |
| 20 years | ₹9,23,076.92 |

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This calculator applies the statutory minimum formula only. Some employers offer gratuity schemes that pay more generously than the statutory minimum, and this tool does not model those employer-specific enhancements, nor does it account for gratuity rules outside the Payment of Gratuity Act framework.
