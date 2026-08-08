---
title: "EMI Calculator – Calculate Monthly Loan Payments & Amortization Schedule"
seoTitle: "EMI Calculator - Calculate Loan Payments & Amortization | CalculationDesk"
metaDescription: "Calculate your Equated Monthly Installment (EMI), total interest payable, and total loan repayment with an interactive yearly/monthly amortization schedule."
category: "financial"
subcategory: "loan-calculators"
tags: ["emi calculator", "loan emi calculator", "home loan emi calculator", "car loan emi calculator", "reducing balance amortization calculator"]
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
  reason: "Primary loan equated monthly installment payment and amortization schedule calculation query"
titleVariants:
  - "EMI Calculator - Calculate Loan Payments & Amortization | CalculationDesk"
aiSummary:
  definition: "The EMI Calculator computes the Equated Monthly Installment (EMI) required to repay a fixed-rate loan over a specified tenure using reducing-balance amortization mathematics."
  quickAnswer: "A $100,000 loan at an annual interest rate of 9.5% over a 5-year tenure (60 months) results in a monthly EMI of $2,100.19, total interest payable of $26,011.17, and a total repayment amount of $126,011.17."
  formulaSummary: "EMI = P * [R * (1 + R)^N] / [(1 + R)^N - 1] | R = AnnualRate / 12 / 100 | TotalRepayment = EMI * N | TotalInterest = TotalRepayment - P"
  whenToUse: "Use this loan calculation tool before applying for home mortgages, auto loans, personal loans, or business financing to evaluate monthly cash flow obligations."
  whoShouldUse: "Borrowers, homebuyers, car buyers, personal loan applicants, and financial planners."
  limitations: "Calculates scheduled reducing-balance amortization assuming a fixed interest rate. Excludes lender processing fees, origination charges, taxes, insurance, and variable-rate adjustments."
  keyTakeaways:
    - "Calculates Monthly EMI, Principal Loan Amount, Total Interest Payable, and Total Repayment."
    - "Generates a full interactive yearly and monthly Amortization Schedule."
    - "Uses standard reducing-balance math where monthly interest is calculated on remaining principal."
    - "Illustrates how principal repayment increases while interest charges decline over the loan tenure."
peopleAlsoAsk:
  - "What does EMI stand for in loan calculations?"
  - "How is the monthly EMI formula calculated?"
  - "Why is interest higher in the early months of a loan?"
  - "How does loan tenure affect total interest paid?"
  - "What is an amortization schedule?"
examples:
  - title: "5-Year Loan ($100,000 Principal @ 9.5% p.a. Interest)"
    inputs: "Loan Amount = $100,000, Interest Rate = 9.5% p.a., Tenure = 5 Years (60 Months)"
    calculation: "Step 1: Monthly Rate R = 9.5 / 12 / 100 = 0.00791667. Step 2: Months N = 60. Step 3: EMI = 100,000 * 0.00791667 * (1.00791667)^60 / [(1.00791667)^60 - 1] = $2,100.19/month. Step 4: Total Repayment = $126,011.17. Step 5: Total Interest = $126,011.17 - $100,000.00 = $26,011.17. Step 6: Principal Share = 79.4%, Interest Share = 20.6%."
    result: "Monthly EMI = $2,100.19 | Total Interest = $26,011.17 | Total Repayment = $126,011.17 | Principal Share = 79.4% | Interest Share = 20.6%"
  - title: "3-Year Auto Loan ($30,000 Principal @ 6.0% p.a. Interest)"
    inputs: "Loan Amount = $30,000, Interest Rate = 6.0% p.a., Tenure = 3 Years (36 Months)"
    calculation: "Step 1: Monthly Rate R = 6.0 / 12 / 100 = 0.005. Step 2: Months N = 36. Step 3: EMI = $912.66/month. Step 4: Total Repayment = $32,855.69. Step 5: Total Interest = $2,855.69."
    result: "Monthly EMI = $912.66 | Total Interest = $2,855.69 | Total Repayment = $32,855.69"
faqs:
  - q: "What does EMI stand for in banking?"
    a: "EMI stands for **Equated Monthly Installment**. It is a fixed payment amount made by a borrower to a bank or financial institution on a set date each month until a loan is paid off in full."
  - q: "Why is the interest portion higher in the early months of a loan?"
    a: "Because consumer loans use the **reducing-balance method**. In the first few months, your outstanding principal balance is at its highest, so interest charges consume a larger dollar share of your fixed EMI payment. As your principal balance drops, monthly interest charges decline, allowing more of your payment to reduce the loan balance."
  - q: "How does choosing a longer loan tenure affect my costs?"
    a: "Choosing a longer tenure **lowers your monthly EMI payment**, making it easier to fit into your monthly budget. However, it significantly **increases the total interest you pay** over the life of the loan because interest accrues over a longer period."
  - q: "What is the difference between principal share and interest share?"
    a: "In the summary display, **Principal Share (79.4%)** and **Interest Share (20.6%)** represent how much of your total repayment over the entire loan term goes toward paying back the borrowed capital versus paying financing interest fees."
references:
  - "https://www.consumerfinance.gov/owning-a-home/loan-options/"
  - "https://www.federalreserve.gov/consumerspec.htm"
formulaDescription: "The formula assumes a fixed interest rate applied to a shrinking balance, so it only needs three inputs: how much you borrowed, the rate, and how many months you'll take to repay it. Total repayment is simply the monthly EMI multiplied by the number of months, calculated at full precision rather than on the rounded number you see on screen."
variablesExplained:
  - name: "P (Principal)"
    description: "The total amount borrowed."
  - name: "R (Monthly rate)"
    description: "The annual interest rate divided by 12 and by 100, converting a percentage-per-year into a decimal rate per month."
  - name: "N (Number of installments)"
    description: "Loan tenure in months — years multiplied by 12, or entered directly in months."
stepByStep: "Enter the loan amount, the annual interest rate, and the tenure in years or months. The calculator converts the annual rate to a monthly rate, applies the standard amortization formula to get your EMI, then multiplies that EMI by the number of months to get total repayment and total interest."
realWorldUses: "Lenders use the same reducing-balance math to generate the EMI figure on a loan offer, so this calculator lets you check that number, compare offers with different rates or tenures, and see how much of each payment goes toward interest versus principal before you sign anything."
commonMistakes:
  - "Entering a monthly interest rate where the calculator expects an annual rate (or vice versa) — always confirm which one your lender quoted."
  - "Comparing loans with different tenures purely on monthly EMI, without checking the total interest paid over the full term."
  - "Assuming a quoted EMI already includes processing fees, insurance, or taxes — most lender quotes do not."
---

# EMI Calculator – Calculate Monthly Loan Payments & Amortization Schedule

An **Equated Monthly Installment (EMI)** is the fixed amount you pay to a bank or lender on a set date every month until your loan balance is completely cleared. Whether you are financing a primary home purchase, buying a car, or securing a personal loan, understanding your monthly EMI helps you evaluate budget affordability before signing a loan contract.

This calculator computes your **Monthly EMI**, **Principal Loan Amount**, **Total Interest Payable**, **Total Repayment**, and generates a full interactive yearly/monthly **Amortization Schedule**.

---

> [!IMPORTANT]
> **Borrower Disclosure**: This calculator provides mathematical estimations based on standard reducing-balance loan formulas. Actual lender quotes may vary slightly due to processing fees, administrative charges, insurance requirements, or day-count conventions.

---

### How Reducing-Balance Amortization Works

Most personal, auto, and residential mortgage loans use **reducing-balance amortization**. This means interest is calculated only on the remaining unpaid principal balance at the beginning of each monthly billing cycle. On a $100,000 loan at 9.5%, the first payment splits into $791.67 of interest and $1,308.52 of principal; because the balance is now lower, the next payment's interest charge drops to $781.31 and a larger $1,318.88 goes toward principal. That shift — more interest early, more principal later — repeats every month until the loan is paid off.

---

### The Mathematical EMI Formula

The calculator evaluates monthly payments using the standard amortizing loan equation:

$$EMI = P \times R \times \frac{(1 + R)^N}{(1 + R)^N - 1}$$

Where:
* **P**: Principal Loan Amount (total money borrowed).
* **R**: Monthly Periodic Interest Rate, derived by dividing the annual rate by 12:
  $$R = \frac{\text{Annual Interest Rate (p.a.)}}{12 \times 100}$$
* **N**: Total Number of Monthly Installments ($\text{Tenure in Years} \times 12$ or total months).

#### Derived Totals
* **Total Repayment**: $\text{Monthly EMI} \times N$ (calculated using full internal precision)
* **Total Interest Payable**: $\text{Total Repayment} - P$
* **Principal Share %**: $(P \div \text{Total Repayment}) \times 100$
* **Interest Share %**: $(\text{Total Interest} \div \text{Total Repayment}) \times 100$

---

### Step-by-Step Worked Numerical Example (Matches Calculator Defaults)

Let's calculate the EMI and payment breakdown for a **$100,000 loan** at an annual interest rate of **9.5%** over a **5-year tenure (60 months)**:

#### Step 1: Convert Annual Rate to Monthly Periodic Rate ($R$)
* **Annual Rate**: 9.5%
* **Monthly Periodic Rate ($R$)**: 9.5% ÷ 12 ÷ 100 = **0.0079166667** (or 0.791667% per month)

#### Step 2: Determine Total Number of Payments ($N$)
* 5 years × 12 months = **60 monthly payments**

#### Step 3: Compute Monthly EMI
Using the reducing-balance formula:
* $P = \$100,000$
* $R = 0.0079166667$
* $N = 60$
* $(1 + R)^{60} = (1.0079166667)^{60} \approx 1.605009$
* $\text{Factor} = 1.605009 \div (1.605009 - 1) \approx 2.652866$
* **Monthly EMI**: $100,000 \times 0.0079166667 \times 2.652866 =$ **$2,100.19** per month

#### Step 4: Calculate Total Repayment & Total Interest Payable
* **Total Repayment**: **$126,011.17**
* **Total Interest Payable**: $126,011.17 - $100,000.00 = **$26,011.17**

> [!NOTE]
> **Note on precision**: The screen shows a monthly EMI of $2,100.19, rounded to the nearest cent. Internally the calculator keeps the unrounded value ($2,100.186131...) and multiplies that by 60 to get total repayment, which is why $2,100.19 × 60 ($126,011.40) doesn't exactly match the displayed total repayment ($126,011.17) — the difference is only a few cents and comes entirely from that display rounding.

#### Step 5: Understand the Payment Split (Percentages)
* **Principal Share**: ($100,000.00 ÷ $126,011.17) × 100 = **79.4%**
* **Interest Share**: ($26,011.17 ÷ $126,011.17) × 100 = **20.6%**

---

### First 3 Months Amortization Breakdown ($100,000 @ 9.5% p.a.)

The table below illustrates how the monthly $2,100.19 EMI payment shifts from interest toward principal during the initial billing cycles:

| Billing Cycle | Opening Principal Balance | Monthly EMI | Interest Charged ($R = 0.7917\%$) | Principal Repaid | Ending Principal Balance |
| :--- | :---: | :---: | :---: | :---: | :---: |
| **Month 1** | **$100,000.00** | $2,100.19 | **$791.67** | **$1,308.52** | **$98,691.48** |
| **Month 2** | **$98,691.48** | $2,100.19 | **$781.31** | **$1,318.88** | **$97,372.60** |
| **Month 3** | **$97,372.60** | $2,100.19 | **$770.87** | **$1,329.32** | **$96,043.28** |

*Notice how monthly interest drops from $791.67 in Month 1 to $770.87 in Month 3 as the remaining loan balance falls!*

---

### Impact of Loan Tenure Selection ($100,000 Principal @ 9.5% p.a.)

Adjusting your loan tenure creates a direct trade-off between monthly payment affordability and long-term interest cost:

| Loan Tenure | Total Months ($N$) | Monthly EMI | Total Interest Payable | Total Repayment | Financial Trade-Off |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **3 Years** | 36 months | **$3,203.29** | **$15,318.62** | $115,318.62 | High monthly payment; saves **$10,693** in interest |
| **5 Years (Baseline)**| **60 months** | **$2,100.19** | **$26,011.17** | **$126,011.17**| **Standard balanced repayment schedule** |
| **7 Years** | 84 months | **$1,634.40** | **$37,289.45** | $137,289.45 | Lower monthly payment; adds **$11,278** in interest |
| **10 Years** | 120 months | **$1,293.98** | **$55,277.07** | $155,277.07 | Lowest monthly payment; pays **$29,266** more interest |

---

### What This Calculator Does NOT Include

> [!NOTE]
> **Out-of-Pocket Cost Exclusions**:
> - **Lender Fees**: Loan processing fees, origination charges, administrative documentation costs, and legal appraisal fees.
> - **Mandatory Insurance**: Property hazard insurance or credit life insurance policies required by mortgage and auto lenders.
> - **Prepayment & Early Settlement Penalties**: Fees charged by lenders if you pay off the principal balance ahead of schedule.
> - **Variable/Floating Rate Adjustments**: Assumes a constant fixed annual rate (9.5%). If your loan has a floating or adjustable rate (ARM), market benchmark shifts will adjust your EMI or remaining tenure over time.

To model home purchase affordability limits before applying for a loan, try the [Home Affordability Calculator](/calculators/home-affordability/) or estimate long-term investment growth with the [SIP Calculator](/calculators/sip-calculator/).
