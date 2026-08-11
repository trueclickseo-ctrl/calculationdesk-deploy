---
title: "Home Loan Calculator - Mortgage EMI & Repayment Planner"
seoTitle: "Home Loan Calculator - Mortgage EMI & Total Interest Calculator | CalculationDesk"
metaDescription: "Calculate your monthly home loan (mortgage) EMI, total interest payable, and total repayment based on property value, down payment, interest rate, and tenure."
category: "financial"
subcategory: "loan-calculators"
tags: ["home loan calculator", "mortgage emi calculator", "home loan interest calculator", "mortgage payment calculator"]
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
  reason: "Primary home loan / mortgage EMI and total interest calculation query"
titleVariants:
  - "Home Loan Calculator - Mortgage EMI & Total Interest Calculator | CalculationDesk"
aiSummary:
  definition: "This calculator estimates the monthly mortgage payment (EMI) on a home loan, based on the property value, down payment, interest rate, and repayment tenure, using the standard reducing-balance amortization formula."
  quickAnswer: "A $400,000 property with an $80,000 (20%) down payment, financed over 30 years at 6.5% interest, results in a $320,000 loan with a monthly EMI of $2,022.62, total interest of $408,142.36, and total repayment of $728,142.36."
  formulaSummary: "P = PropertyValue - DownPayment | r = AnnualRate/12/100 | N = Years*12 | EMI = P*r*(1+r)^N / ((1+r)^N - 1)"
  whenToUse: "Use this calculator before applying for a mortgage to estimate your monthly payment obligation and see how down payment size or loan tenure changes your total cost."
  whoShouldUse: "Homebuyers evaluating mortgage affordability and comparing loan offers with different tenures or down payment amounts."
  limitations: "Calculates principal and interest only, using a fixed interest rate for the full tenure. Does not include property taxes, homeowners insurance, private mortgage insurance (PMI), or closing costs, all of which typically add to a real monthly mortgage payment."
  keyTakeaways:
    - "A larger down payment directly reduces the loan principal, which lowers both the monthly EMI and the total interest paid over the life of the loan — the effect compounds because a smaller principal also means smaller interest charges every single month."
    - "This calculator computes principal and interest only; a real monthly mortgage payment (often abbreviated PITI) also typically includes property taxes and insurance, which this tool does not model."
    - "Stretching the same loan amount over a longer tenure lowers the monthly EMI but substantially increases total interest paid, since interest accrues over more months even though each individual payment is smaller."
peopleAlsoAsk:
  - "What is a typical down payment for a home loan?"
  - "Does home loan EMI include property tax or insurance?"
  - "Can I pay off my home loan early?"
  - "How does tenure length affect total interest paid?"
examples:
  - title: "$400,000 Property, $80,000 (20%) Down Payment, 30-Year Loan @ 6.5%"
    inputs: "Property Value = $400,000, Down Payment = $80,000, Interest Rate = 6.5% p.a., Tenure = 30 Years"
    calculation: "Loan Principal (P) = 400,000 - 80,000 = $320,000. Monthly Rate (r) = 6.5/12/100 = 0.005417. Total Months (N) = 360. EMI = 320,000 * 0.005417 * (1.005417)^360 / [(1.005417)^360 - 1] = $2,022.62/month. Total Repayment = 2,022.62 * 360 = $728,142.36. Total Interest = 728,142.36 - 320,000 = $408,142.36."
    result: "Loan Amount = $320,000.00 | Monthly EMI = $2,022.62 | Total Interest = $408,142.36 | Total Repayment = $728,142.36"
  - title: "$300,000 Property, $60,000 (20%) Down Payment, 20-Year Loan @ 6.5%"
    inputs: "Property Value = $300,000, Down Payment = $60,000, Interest Rate = 6.5% p.a., Tenure = 20 Years"
    calculation: "Loan Principal = 300,000 - 60,000 = $240,000. With the same 6.5% rate over a shorter 20-year tenure, EMI = $1,789.38/month."
    result: "Loan Amount = $240,000.00 | Monthly EMI = $1,789.38 | Total Interest = $189,450.13 | Total Repayment = $429,450.13"
faqs:
  - q: "What is a typical down payment for a home loan?"
    a: "Most mortgage lenders look for a down payment of at least 10% to 20% of the property value, though some loan programs allow less. A larger down payment reduces both your loan principal and monthly EMI, and putting down 20% or more often helps borrowers avoid additional private mortgage insurance (PMI) costs."
  - q: "Does home loan EMI include property tax or insurance?"
    a: "No — this calculator computes only the principal-and-interest portion of your payment. A real-world monthly mortgage payment (commonly abbreviated PITI: Principal, Interest, Taxes, Insurance) often bundles in property tax and homeowners insurance escrow amounts, and sometimes private mortgage insurance, which can add a meaningful amount on top of the EMI figure shown here."
  - q: "Can I pay off my home loan early?"
    a: "Yes, most lenders allow prepayment or early payoff, which reduces the outstanding principal ahead of schedule and can save substantial interest over the remaining tenure since future interest charges are calculated on a smaller balance. Some loans carry prepayment penalties, so it's worth checking your specific loan terms."
  - q: "How does tenure length affect total interest paid?"
    a: "A longer tenure lowers the monthly EMI by spreading the same principal over more payments, but it increases the total interest paid over the life of the loan, since interest keeps accruing on the outstanding balance for a longer period. A shorter tenure raises the monthly EMI but reduces total interest substantially — it's a direct tradeoff between monthly affordability and total cost."
references:
  - "https://www.consumerfinance.gov/owning-a-home/"
formulaDescription: "This is the standard reducing-balance loan amortization formula: it treats the loan principal (property value minus down payment) as compounding at a fixed monthly interest rate, and solves for the constant monthly payment that fully repays both principal and accumulated interest by the end of the loan term."
variablesExplained:
  - name: "P (Loan Principal)"
    description: "Property value minus down payment — the actual amount borrowed."
  - name: "r (Monthly Rate)"
    description: "The annual interest rate divided by 12 and by 100."
  - name: "N (Number of Payments)"
    description: "Loan tenure in months — years multiplied by 12."
stepByStep: "Enter the property value, your planned down payment, the annual interest rate, and the loan tenure in years. The calculator subtracts the down payment from the property value to find your loan principal, applies the standard amortization formula, and returns your monthly EMI, total interest, and total repayment."
realWorldUses: "Homebuyers use mortgage calculators like this to check whether a target property fits their monthly budget, to compare how different down payment amounts or loan tenures change their EMI, and to see the total interest cost tradeoff between a 15-, 20-, or 30-year mortgage before committing to one."
commonMistakes:
  - "Assuming the EMI shown here is the full monthly housing payment — property tax, homeowners insurance, and PMI (if applicable) are typically added on top by the lender in an actual mortgage payment."
  - "Focusing only on the lower monthly EMI of a longer tenure without weighing the significantly larger total interest paid over the life of the loan."
---

# Home Loan Calculator – Mortgage EMI & Total Interest

This calculator estimates the monthly payment (**EMI**) on a home loan based on your property value, down payment, interest rate, and tenure, using the same reducing-balance amortization math lenders use to generate a mortgage quote.

## The Home Loan EMI Formula

$$EMI = P \times r \times \frac{(1 + r)^N}{(1 + r)^N - 1}$$

Where:
* **P**: Loan principal — property value minus down payment.
* **r**: Monthly interest rate (annual rate ÷ 12 ÷ 100).
* **N**: Total number of monthly payments (tenure in years × 12).

## Worked Example

A **$400,000** property with an **$80,000 (20%)** down payment, financed over **30 years** at **6.5%**:

1. Loan principal: $\$400{,}000 - \$80{,}000 = \$320{,}000$
2. Monthly rate: $6.5 \div 12 \div 100 = 0.005417$
3. Total months: $30 \times 12 = 360$
4. EMI: $320{,}000 \times 0.005417 \times \dfrac{(1.005417)^{360}}{(1.005417)^{360} - 1} \approx \$2{,}022.62$ per month
5. Total repayment: $\$2{,}022.62 \times 360 \approx \$728{,}142.36$
6. Total interest: $\$728{,}142.36 - \$320{,}000.00 = \$408{,}142.36$

## Down Payment and Tenure Both Move the Needle

Holding the same $320,000 principal at 6.5% and only changing tenure:

| Tenure | Monthly EMI | Total Interest | Total Repayment |
| :--- | :---: | :---: | :---: |
| 15 years | $2,787.54 | $181,757.84 | $501,757.84 |
| 20 years | $2,385.83 | $252,600.17 | $572,600.17 |
| 25 years | $2,160.66 | $328,198.87 | $648,198.87 |
| 30 years (example above) | $2,022.62 | $408,142.36 | $728,142.36 |

*Going from a 15-year to a 30-year term roughly cuts the monthly payment in half — but more than doubles the total interest paid over the life of the loan.*

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: This EMI figure covers principal and interest only. A real monthly mortgage payment typically also includes property tax and homeowners insurance escrow, and sometimes private mortgage insurance (PMI) if the down payment is below 20% — none of which are modeled here.

To compare this loan against paying it off ahead of schedule, or to model a different loan type, see the [EMI Calculator](/calculators/emi-calculator/).
