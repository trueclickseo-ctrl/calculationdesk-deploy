---
title: "Gratuity Calculator - Payment of Gratuity Act Calculator"
seoTitle: "Gratuity Calculator - Calculate Gratuity & Tax Exemption | CalculationDesk"
metaDescription: "Free online Gratuity Calculator. Calculate statutory employee gratuity payouts under the Payment of Gratuity Act 1972, service rounding, and tax-free limits."
category: "financial"
subcategory: "retirement-calculators"
tags: ["gratuity calculator", "payment of gratuity act 1972", "gratuity formula", "tax free gratuity limit", "gratuity eligibility"]
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
  - "Gratuity Calculator - Calculate Gratuity & Tax Exemption | CalculationDesk"
aiSummary:
  definition: "The Gratuity Calculator computes statutory lump-sum gratuity benefits payable to employees upon retirement, resignation, or termination under the Payment of Gratuity Act 1972."
  quickAnswer: "An employee covered under the Act with a last drawn basic salary + DA of ₹80,000 and 10 years 7 months service (rounded to 11 years) receives an accrued gratuity of ₹5,07,692, which is 100% tax-free (below the ₹20 Lakh ceiling)."
  formulaSummary: "Covered: Gratuity = (15 × Basic × Rounded Years) / 26 | Not Covered: Gratuity = (15 × Basic × Completed Years) / 30 | Tax-Free Ceiling = ₹20,00,000"
  whenToUse: "Use this calculator to determine your gratuity payout eligibility and tax-free status when resigning, retiring, or switching jobs."
  whoShouldUse: "Salaried employees, HR managers, and payroll accountants."
  limitations: "Standard eligibility requires a minimum of 5 years of continuous service (waived only for death or permanent disability)."
  keyTakeaways:
 - "Calculates gratuity based on last drawn Basic Salary + Dearness Allowance (DA)."
 - "For covered employees, service extra months > 6 are rounded up to the next full year."
 - "Statutory tax-free exemption ceiling is capped at ₹20,00,000."
peopleAlsoAsk:
  - "What is the formula for calculating gratuity for covered employees?"
  - "How are extra service months rounded in gratuity calculation?"
  - "What is the tax-free gratuity exemption limit?"
  - "Is 5 years of continuous service mandatory for gratuity?"
examples:
  - title: "Covered Employee (10 Years 7 Months Service, ₹80,000 Basic Salary)"
 inputs: "Basic Salary + DA = ₹80,000, Completed Years = 10, Extra Months = 7, Covered = Yes"
 calculation: "Service extra months (7) > 6 months -> Rounded Service = 11 years. Gratuity = (15 × 80,000 × 11) / 26 = 13,200,000 / 26 = ₹5,07,692. Statutory tax ceiling = ₹20,00,000."
 result: "Calculation Tenure = 11 Years | Accrued Gratuity = ₹5,07,692 | Tax-Free Amount = ₹5,07,692 | Taxable Gratuity = ₹0"
faqs:
  - q: "What is the mandatory eligibility period for gratuity?"
 a: "Under the Payment of Gratuity Act 1972, an employee must complete at least 5 years of continuous service with an employer to be eligible. This 5-year condition is waived in the event of death or permanent disablement."
  - q: "How are extra service months treated under the Gratuity Act?"
 a: "For employees covered under the Act, if the extra service is more than 6 months (7–11 months), it is rounded up to an additional full year. If it is 6 months or less (0–6 months), it is ignored. For employees NOT covered under the Act, no rounding applies."
  - q: "Which salary components are included in the gratuity formula?"
 a: "Only your last drawn 'Basic Salary' plus 'Dearness Allowance (DA)' are included. HRA, special allowances, overtime pay, and bonuses are excluded."
  - q: "What is the statutory tax-free exemption ceiling?"
 a: "The maximum tax-exempt gratuity limit under Section 10(10) of the Income Tax Act is ₹20,00,000 ($2,000,000 equivalent). Any gratuity received exceeding this limit is taxable."
references:
  - "https://labour.gov.in"
  - "https://en.wikipedia.org/wiki/Payment_of_Gratuity_Act,_1972"
---

# Gratuity Calculator – Payment of Gratuity Act 1972 Guide

**Gratuity** is a statutory lump-sum financial benefit paid by employers to employees upon retirement, resignation, or termination after completing a period of continuous service.

This calculator computes **accrued gratuity, service tenure rounding, tax-free limits, and taxable gratuity** under the Payment of Gratuity Act 1972.

---

### Key Rules & Eligibility Requirements

1. **Minimum Service Requirement**: Employees must complete **5 years of continuous service** with the same organization to qualify.
 - *Exception*: The 5-year requirement is legally waived if employment ends due to **death or permanent disablement**.
2. **Salary Components Used**: Only **Last Drawn Basic Salary + Dearness Allowance (DA)** is considered. Allowances like HRA or incentive bonuses are omitted.
3. **Statutory Tax Exemption Ceiling**: Up to **₹20,00,000** ($2,000,000 equivalent) of gratuity is 100% tax-free under Section 10(10). Any excess amount is taxable as income from salary.

---

### Mathematical Formulas Implemented by the Calculator

#### 1. Employees Covered under the Payment of Gratuity Act

Service duration is rounded to the nearest year (extra service > 6$ months is rounded up):

Rounded Years = Completed Years + (Extra Months > 6 ? 1 : 0)

Accrued Gratuity = frac(15 × (Basic Salary + DA) × Rounded Years){26}

*(Note: The factor 26 represents working days in a month).*

#### 2. Employees NOT Covered under the Gratuity Act

No rounding applies to incomplete years of service:

Accrued Gratuity = frac(15 × (Basic Salary + DA) × Completed Years){30}

#### 3. Tax Exemption & Taxable Gratuity

Tax-Free Gratuity = min(Accrued Gratuity, 2000000)

Taxable Gratuity = max(0, Accrued Gratuity - 2000000)

---

### Worked Numerical Example (Verified against Code)

Suppose an employee covered under the Act has a **last drawn basic salary + DA of ₹80,000** and has rendered **10 years and 7 months of service**:

1. **Service Rounding**:
 - Extra months = 7 ($> 6$ months).
 - Rounded Service Tenure = 10 + 1 = 11 years.
2. **Accrued Gratuity Calculation**:
 Gratuity = (15 × 80,000 × 11 / 26) = (13,200,000 / 26) ≈ ₹5,07,692.31
3. **Tax Treatment**:
 - Statutory Ceiling = **₹20,00,000**.
 - Tax-Free Amount = min(507,692, 2000000) = ₹5,07,692.
 - Taxable Amount = max(0, 507,692 - 2000000) = ₹0.

---

### Frequently Asked Questions (FAQ)

* **Q1: Why is the denominator 26 instead of 30 for covered employees?**
  * A1: Under the Act, a working month is calculated as 26 days (excluding 4 weekly off-days).

* **Q2: Does gratuity apply to contract workers?**
  * A2: Yes, if the contract worker is hired directly by the establishment and completes 5 continuous years of service.
