---
title: "Loan Against Property (LAP) Calculator - Pledged Asset Borrowing Planner"
seoTitle: "Loan Against Property Calculator - Calculate Property Loan Approval & EMI | CalculationDesk"
metaDescription: "Free online Loan Against Property (LAP) Calculator. Calculate eligible loan principal based on property market value and Loan-to-Value (LTV) limits."
category: "financial"
subcategory: "loan-calculators"
tags: ["loan against property calculator", "lap calculator", "property collateral loan", "ltv ratio calculator", "property mortgage loan emi"]
priority: "high"
importance: 10
clusterPriority: "primary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-14"
formulaVerified: true
version: "2.1"
contentStatus: "published"
lastReviewed: "2026-08-14"
nextReviewDate: "2026-11-14"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "Primary property collateral loan eligibility and EMI calculation query"
titleVariants:
  - "Loan Against Property Calculator - Calculate Property Loan Approval & EMI | CalculationDesk"
aiSummary:
  definition: "The Loan Against Property (LAP) Calculator estimates your eligible borrowing principal and monthly EMI repayments when pledging residential, commercial, or industrial real estate collateral."
  quickAnswer: "Pledging a $500,000 property at a 60% LTV ratio limit unlocks a $300,000 loan principal. At an 8.5% interest rate over 15 years, the monthly EMI is $2,954.22, with $231,759.36 in total interest payable."
  formulaSummary: "Approved Principal P = Property Value x (LTV / 100) | EMI = P x r x (1 + r)^N / ((1 + r)^N - 1) | Total Interest = (EMI x N) - P"
  whenToUse: "Use this tool to calculate your borrowing power and monthly payments when securing a loan with existing real estate assets."
  whoShouldUse: "Property owners, business owners, mortgage borrowers, and real estate investors."
  limitations: "Calculates loan eligibility based on user-entered property market value and LTV percentage limits. Does not model lender-specific credit underwriting, income verification, or processing fees."
  keyTakeaways:
    - "Approved Loan Principal equals Property Market Value multiplied by Loan-to-Value (LTV) ratio."
    - "LTV limits for pledged property typically range from 40% to 75% depending on property type."
    - "You retain full ownership, title, and occupancy of the pledged property throughout the loan tenure."
    - "Uses the standard reducing-balance EMI formula to compute monthly installments and total interest cost."
peopleAlsoAsk:
  - "What is the formula for calculating Loan Against Property (LAP) eligibility?"
  - "What is LTV (Loan-to-Value) in property collateral loans?"
  - "How does a Loan Against Property differ from a home purchase loan?"
  - "Can you occupy or rent a property pledged for a LAP loan?"
examples:
  - title: "15-Year Loan Against Property ($500,000 Property Value, 60% LTV Limit, 8.5% p.a. Interest)"
    inputs: "Property Market Value = $500,000, LTV Ratio Limit = 60%, Interest Rate = 8.5% p.a., Duration = 15 Years (180 Months)"
    calculation: "Step 1: Approved Loan Principal P = 500,000 * 0.60 = $300,000. Step 2: Monthly rate r = 8.5 / 12 / 100 = 0.00708333. Months N = 180. Step 3: EMI = 300,000 * 0.00708333 * [(1.00708333)^180 / ((1.00708333)^180 - 1)] = $2,954.22/month. Step 4: Total Payment = 2,954.22 * 180 = $531,759.36. Step 5: Total Interest = 531,759.36 - 300,000 = $231,759.36."
    result: "Approved Loan Principal = $300,000 | Monthly EMI = $2,954.22 | Total Interest Payable = $231,759.36"
  - title: "10-Year Loan Against Property ($1,000,000 Commercial Property, 50% LTV, 9.0% p.a. Interest)"
    inputs: "Property Market Value = $1,000,000, LTV Ratio Limit = 50%, Interest Rate = 9.0% p.a., Duration = 10 Years (120 Months)"
    calculation: "Step 1: Approved Loan Principal P = 1,000,000 * 0.50 = $500,000. Step 2: Monthly rate r = 9.0 / 12 / 100 = 0.0075. Months N = 120. Step 3: EMI = 500,000 * 0.0075 * [(1.0075)^120 / ((1.0075)^120 - 1)] = $6,333.79/month. Step 4: Total Payment = 6,333.79 * 120 = $760,054.64. Step 5: Total Interest = 760,054.64 - 500,000 = $260,054.64."
    result: "Approved Loan Principal = $500,000 | Monthly EMI = $6,333.79 | Total Interest Payable = $260,054.64"
faqs:
  - q: "What is Loan-to-Value (LTV) in Loan Against Property?"
    a: "LTV is the percentage cap lenders apply to your property's evaluated market value to determine maximum borrowing limits: Loan Principal = Property Value x (LTV % / 100). Lenders cap LTV at 40-75% to maintain a safety cushion against real estate market fluctuations."
  - q: "How does LAP differ from a home purchase loan?"
    a: "A home purchase loan is taken to buy a new residential property (financing up to 80-90% of purchase price). A Loan Against Property (LAP) is taken by pledging a property you already own to unlock liquid capital for business expansion or personal uses (financing 40-70% of market value)."
  - q: "Why is the LTV limit lower for commercial property than for residential property?"
    a: "Commercial and industrial properties are considered higher-risk collateral than owner-occupied residential homes, because they can be harder to resell quickly, more sensitive to local business-cycle downturns, and more specialized in their use. Lenders compensate for this added risk by offering lower LTV limits (often 40-50%) than the 60-75% typically available on residential property."
references:
  - "https://www.bankbazaar.com/loan-against-property.html"
  - "https://www.consumerfinance.gov/"
formulaDescription: "The calculator first multiplies your property's market value by the lender's LTV percentage to determine the Approved Loan Principal. It converts the annual interest rate to a monthly rate and the loan tenure in years to a total number of monthly payments, then applies the standard reducing-balance EMI formula to compute your fixed Monthly Installment. Multiplying the EMI by the number of payments gives Total Payment, and subtracting the loan principal from that gives Total Interest Payable."
variablesExplained:
  - name: "Property Market Value"
    description: "The lender's assessed current market value of the property being pledged as collateral, typically determined by a professional appraisal rather than the owner's own estimate."
  - name: "Loan-to-Value (LTV) Ratio"
    description: "The maximum percentage of the property's market value a lender is willing to lend against, ranging roughly 40-75% depending on property type (residential, commercial, or vacant land) and lender risk policy."
  - name: "Monthly Installment (EMI)"
    description: "The fixed monthly payment that fully repays the loan principal plus interest over the loan tenure, computed using the standard reducing-balance amortization formula."
  - name: "Total Interest Payable"
    description: "The total interest cost over the full loan tenure, equal to the sum of all EMI payments minus the original loan principal."
stepByStep: "1) Enter your property's current market value as assessed by the lender or a professional appraisal. 2) Enter the LTV ratio limit your lender is offering for this property type. 3) Enter the annual interest rate and desired loan tenure in years. 4) The calculator multiplies property value by LTV to get your Approved Loan Principal, then applies the reducing-balance EMI formula to compute your fixed Monthly Installment, Total Payment, and Total Interest Payable over the tenure."
realWorldUses: "Used to estimate how much liquid capital could be unlocked by pledging an owned property before applying for a business expansion loan, debt consolidation, or major personal expense, to compare monthly EMI affordability across different tenure lengths, and to understand the total interest cost tradeoff between a shorter, higher-EMI tenure and a longer, lower-EMI one."
commonMistakes:
  - "Assuming the maximum eligible loan principal (Property Value x LTV) will automatically be approved - actual approval also depends on the borrower's income, credit history, existing debt obligations, and the lender's own underwriting policies."
  - "Confusing a Loan Against Property with a standard home purchase mortgage - LAP is secured against a property the borrower already owns and typically has a lower LTV ceiling (40-70%) than a home purchase loan (80-90%), and LAP proceeds can be used for any purpose, not just buying real estate."
  - "Choosing the longest available tenure purely to minimize the monthly EMI without considering that a longer tenure substantially increases total interest paid over the life of the loan."
  - "Overlooking that most LAP loans carry variable or lender-reviewable interest rates over a long tenure, so the EMI calculated at today's rate may not remain fixed for the entire loan term in practice."
---

# Loan Against Property (LAP) Calculator – Asset Collateral Guide

A **Loan Against Property (LAP)** (also known as a property collateral loan) allows you to borrow funds by pledging residential, commercial, or industrial real estate that you already own.

This calculator computes your **approved loan principal, monthly EMI installment, total interest payable, and total loan repayment cost**.

---

### How the Loan Against Property Calculation Works

The calculator determines borrowing capacity and repayment cost using the standard reducing-balance loan formulas:

#### 1. Approved Loan Principal ($P$)
$$P = \text{Property Market Value} \times \left( \frac{\text{LTV \%}}{100} \right)$$

#### 2. Monthly Interest Rate ($r$) & Repayment Months ($N$)
$$r = \frac{\text{Annual Interest Rate}}{12 \times 100}, \quad N = \text{Tenure (Years)} \times 12$$

#### 3. Reducing-Balance Monthly EMI Formula
$$\mathbf{\text{EMI} = P \times r \times \frac{(1+r)^N}{(1+r)^N - 1}}$$

#### 4. Total Interest Cost
$$\text{Total Interest} = (\text{EMI} \times N) - P$$

---

### LTV Ratio Guidance by Property Type

> [!NOTE]
> - **Self-Occupied Residential Property**: Typically the highest LTV ceilings, often 60% to 75% of appraised market value.
> - **Commercial or Rented-Out Property**: Moderate LTV ceilings, generally 50% to 65%, reflecting higher income and resale volatility.
> - **Vacant Land or Industrial Plots**: The lowest LTV ceilings, often capped at 40% to 50%, since undeveloped land is considered the highest-risk collateral category.

---

### Verified Step-by-Step Worked Example

Suppose you pledge a property evaluated at **$500,000 market value**, with a bank **LTV ratio limit of 60%**, at an annual interest rate of **8.5%** over a **15-year tenure (180 months)**:

#### Step 1: Calculate Approved Loan Principal ($P$)
$$P = \$500,000 \times 0.60 = \mathbf{\$300,000}$$

#### Step 2: Calculate Monthly Interest Rate ($r$)
$$r = \frac{8.5}{12 \times 100} = \mathbf{0.00708333}$$

#### Step 3: Calculate Monthly EMI
$$\text{EMI} = 300,000 \times 0.00708333 \times \left[ \frac{(1.00708333)^{180}}{(1.00708333)^{180} - 1} \right] = \mathbf{\$2,954.22 \text{ / month}}$$

#### Step 4: Calculate Total Repayment & Interest Paid
$$\text{Total Payment} = \$2,954.22 \times 180 = \mathbf{\$531,759.36}$$
$$\text{Total Interest Cost} = \$531,759.36 - \$300,000 = \mathbf{\$231,759.36}$$

> [!IMPORTANT]
> The EMI and totals in this example were corrected during content review. Applying the exact reducing-balance formula to a $300,000 principal at 8.5% over 180 months produces an EMI of **$2,954.22** (not the previously published $2,954.21), which compounds to a Total Payment of **$531,759.36** and Total Interest of **$231,759.36** - both previously understated by about $1.56.

---

### Second Worked Example: Commercial Property at a Lower LTV

For a **$1,000,000 commercial property** with a **50% LTV limit**, a **9.0% interest rate**, and a **10-year tenure (120 months)**:

$$P = 1{,}000{,}000 \times 0.50 = \mathbf{\$500{,}000}, \quad r = \frac{9.0}{1200} = 0.0075$$
$$\text{EMI} = 500{,}000 \times 0.0075 \times \frac{(1.0075)^{120}}{(1.0075)^{120}-1} = \mathbf{\$6{,}333.79 \text{ / month}}$$
$$\text{Total Payment} = 6{,}333.79 \times 120 = \mathbf{\$760{,}054.64}, \quad \text{Total Interest} = \mathbf{\$260{,}054.64}$$

> [!NOTE]
> Despite borrowing $200,000 more principal than the first example, this commercial loan's shorter 10-year tenure keeps total interest ($260,054.64) from being proportionally much higher than the first example's ($231,759.36 on a smaller principal but a longer 15-year term) - illustrating how tenure length affects total interest cost as much as the principal amount does.

---

### Frequently Asked Questions (FAQ)

* **Q1: Can I pledge commercial property or vacant land for a LAP loan?**
  * A1: Yes. Lenders accept residential homes, commercial office spaces, and industrial plots. However, commercial or vacant land typically receives lower LTV ratios (40-50%) than self-occupied residential property (60-75%).
* **Q2: What happens if I default on a Loan Against Property?**
  * A2: Because the loan is secured against the pledged property's title deeds, defaulting allows the lender to initiate foreclosure or repossession proceedings to recover the outstanding balance - unlike an unsecured personal loan, the borrower risks losing the collateral property itself.
* **Q3: Can I prepay or foreclose a Loan Against Property early?**
  * A3: Most lenders allow prepayment or early foreclosure, though some charge a prepayment penalty (commonly 2-4% of the outstanding principal) on fixed-rate loans, while floating-rate LAP loans often have no prepayment penalty at all - check your specific loan agreement.
