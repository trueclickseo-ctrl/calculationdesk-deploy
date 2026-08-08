---
title: "Home Affordability Calculator – Estimate Maximum Purchasing Power"
seoTitle: "Home Affordability Calculator - How Much House Can I Afford? | CalculationDesk"
metaDescription: "Estimate maximum affordable home purchase prices, maximum monthly mortgage payments, and borrowable loan amounts using gross income and DTI ratios."
category: "real-estate"
subcategory: "home-ownership-calculators"
tags: ["home affordability calculator", "how much house can i afford", "dti affordability calculator", "maximum mortgage loan calculator", "home purchase price capacity"]
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
  reason: "Primary home purchasing power and mortgage affordability capacity query"
titleVariants:
  - "Home Affordability Calculator - How Much House Can I Afford? | CalculationDesk"
aiSummary:
  definition: "The Home Affordability Calculator estimates the maximum home purchase price you can afford by working backward from your Debt-to-Income (DTI) ratio, annual income, monthly non-housing debt obligations, and saved down payment capital."
  quickAnswer: "A household earning $100,000 annually with $500 in monthly debts, $50,000 in saved down payment funds, and a 6.0% 30-year mortgage interest rate can afford a maximum home price of $383,583 at a standard 36% DTI limit."
  formulaSummary: "MaxMonthlyDebt = (Income/12) * (DTI%/100) | MaxHousingP&I = (MaxMonthlyDebt - Debts) * 0.80 | MaxLoan = P&I_pv | MaxPrice = MaxLoan + DownPayment"
  whenToUse: "Use this financial planning calculator before touring homes, contacting realtors, or submitting pre-approval mortgage applications."
  whoShouldUse: "First-time homebuyers, households upgrading homes, financial planners, and mortgage advisors."
  limitations: "Provides an educational affordability estimate based on standard DTI limits. Does not guarantee bank mortgage pre-approval, which depends on credit scores, employment history, and appraisal."
  keyTakeaways:
 - "Calculates Maximum Affordable Price, Maximum Monthly P&I, and Maximum Borrowable Loan."
 - "Applies standard Debt-to-Income (DTI) ratio caps (default 36%)."
 - "Allocates a realistic 20% buffer for property taxes and hazard insurance overhead."
 - "Demonstrates how existing monthly consumer debt directly reduces home purchasing power."
peopleAlsoAsk:
  - "How much house can I afford on a $100,000 salary?"
  - "What is the 28/36 rule in mortgage underwriting?"
  - "How do student loans and car payments affect home affordability?"
  - "What Debt-to-Income ratio do mortgage lenders prefer?"
examples:
  - title: "$100,000 Income ($500/mo Debts, $50,000 Down Payment @ 36% DTI)"
    inputs: "Annual Income = $100,000, Monthly Debts = $500, Down Payment = $50,000, Interest Rate = 6.0%, Loan Term = 30 Years, DTI Limit = 36%"
    calculation: "Step 1: Monthly Income = $100,000 / 12 = $8,333.33. Step 2: Max Monthly Debt Allowed = $8,333.33 * 0.36 = $3,000.00. Step 3: Max Housing P&I (after 20% tax/ins reserve) = ($3,000 - $500) * 0.80 = $2,000.00/month. Step 4: Max Borrowable Loan Principal at 6% over 30 yrs = $333,583.17. Step 5: Max Affordable Price = $333,583.17 + $50,000 = $383,583.17."
    result: "Maximum Affordable Price = $383,583.17 | Maximum Monthly P&I = $2,000.00 | Maximum Borrowable Loan = $333,583.17"
  - title: "$150,000 Income ($1,200/mo Debts, $100,000 Down Payment @ 43% DTI)"
    inputs: "Annual Income = $150,000, Monthly Debts = $1,200, Down Payment = $100,000, Interest Rate = 6.5%, Loan Term = 30 Years, DTI Limit = 43%"
    calculation: "Step 1: Monthly Income = $12,500. Step 2: Max Monthly Debt = $5,375. Step 3: Max Housing P&I = ($5,375 - $1,200) * 0.80 = $3,340.00. Step 4: Max Loan = $528,382. Step 5: Max Price = $528,382 + $100,000 = $628,382."
    result: "Maximum Affordable Price = $628,382.00 | Maximum Monthly P&I = $3,340.00 | Maximum Borrowable Loan = $528,382.00"
faqs:
  - q: "What is the Debt-to-Income (DTI) ratio?"
    a: "The DTI ratio is the percentage of your gross monthly income committed to recurring debt payments (student loans, car payments, credit cards, child support, and proposed housing payments). Lenders prefer a total DTI under 36% for conventional loans."
  - q: "How do monthly consumer debts reduce home purchasing power?"
    a: "Every $100 in existing monthly debt payments reduces your allowable monthly housing payment by $80, which decreases your maximum borrowable mortgage amount by approximately **$13,300** at a 6% interest rate."
  - q: "Does a higher down payment increase my maximum home price?"
    a: "Yes. Every dollar added to your down payment increases your home purchasing capacity dollar-for-dollar without raising your monthly mortgage payment or interest charges."
references:
  - "https://www.consumerfinance.gov/"
  - "https://www.hud.gov/"
---

# Home Affordability Calculator – Estimate Maximum Purchasing Power

Determining how much house you can afford involves more than just checking your bank account balance. Mortgage lenders evaluate your **Debt-to-Income (DTI)** ratio to determine the maximum loan principal they will underwrite based on your gross income, existing debt obligations, and saved down payment.

This calculator computes **Maximum Affordable Price**, **Maximum Monthly P&I**, and **Maximum Borrowable Loan**.

---

### Affordability Mathematical Model & Equations

The calculator solves backward from your Debt-to-Income (DTI) cap to establish maximum allowable mortgage parameters:

#### 1. Maximum Gross Monthly Debt Allowed ($D_{\text{max}}$)
$$D_{\text{max}} = \left( \frac{\text{Annual Gross Income}}{12} \right) \times \left( \frac{\text{DTI Limit \%}}{100} \right)$$

#### 2. Maximum Housing Principal & Interest Budget ($M_{\text{max}}$)
Subtracts existing non-housing monthly debt payments ($D_{\text{existing}}$) and allocates a **20% reserve** for property taxes and home insurance overhead:

$$M_{\text{max}} = (D_{\text{max}} - D_{\text{existing}}) \times 0.80$$

#### 3. Maximum Borrowable Loan Principal ($P_{\text{max}}$)
Solves present value of an annuity for monthly interest rate $r$ and total payments $n = \text{Term} \times 12$:

$$P_{\text{max}} = M_{\text{max}} \times \frac{(1+r)^n - 1}{r(1+r)^n}$$

#### 4. Maximum Affordable Property Price
$$\mathbf{\text{Maximum Affordable Price} = P_{\text{max}} + \text{Down Payment Savings}}$$

---

### Income vs. Debt Impact Matrix ($6% Mortgage Rate over 30 Years)

The table below illustrates how different debt levels impact home purchasing capacity for a household earning **$100,000 annually** with **$50,000 down payment savings** (at 36% DTI):

| Monthly Consumer Debts ($D_{\text{existing}}$) | Max Monthly Debt Cap ($D_{\text{max}}$) | Max Housing P&I ($M_{\text{max}}$) | Max Borrowable Loan ($P_{\text{max}}$) | Maximum Affordable Home Price | Purchasing Power Lost |
| :--- | :---: | :---: | :---: | :---: | :--- |
| **$0 / month (Debt Free)** | $3,000 / mo | $2,400.00 / mo | $400,300 | **$450,300** | Maximum borrowing capacity |
| **$250 / month** | $3,000 / mo | $2,200.00 / mo | $366,941 | **$416,941** | -$33,359 home capacity |
| **$500 / month (Baseline)**| **$3,000 / mo** | **$2,000.00 / mo** | **$333,583** | **$383,583** | **-$66,717 home capacity** |
| **$1,000 / month** | $3,000 / mo | $1,600.00 / mo | $266,867 | **$316,867** | -$133,433 home capacity |

---

### Verified Step-by-Step Worked Example

Let's calculate home affordability for a household earning **$100,000 annually** with **$500 in monthly debts**, **$50,000 down payment savings**, a **6.0% interest rate**, and a **36% DTI limit**:

#### Step 1: Calculate Gross Monthly Income & Max Debt Cap
$$\text{Monthly Income} = \frac{\$100,000}{12} = \$8,333.33$$
$$D_{\text{max}} = \$8,333.33 \times 0.36 = \mathbf{\$3,000.00 / month}$$

#### Step 2: Compute Maximum Housing P&I Budget
$$M_{\text{max}} = (\$3,000.00 - \$500.00) \times 0.80 = \$2,500 \times 0.80 = \mathbf{\$2,000.00 / month}$$

#### Step 3: Compute Maximum Borrowable Loan Principal ($P_{\text{max}}$)
$$r = \frac{0.06}{12} = 0.005, \quad n = 360 \text{ months}$$
$$P_{\text{max}} = 2,000 \times \frac{(1.005)^{360} - 1}{0.005 \times (1.005)^{360}} = 2,000 \times 166.7916 = \mathbf{\$333,583.17}$$

#### Step 4: Calculate Maximum Affordable Property Price
$$\text{Max Price} = \$333,583.17 + \$50,000.00 = \mathbf{\$383,583.17}$$

---

### Underwriting Factors Beyond Debt-to-Income Ratios

> [!NOTE]
> - **Credit Score Tiers**: FICO scores above 740 qualify for the lowest mortgage interest rates, while lower scores (620–680) incur loan-level price adjustments (LLPAs) that increase monthly rates and reduce borrowing limits.
> - **Liquid Reserve Requirements**: Lenders often require buyers to maintain **2 to 6 months of housing payments in reserve** cash after paying the down payment and closing costs.

To model specific monthly mortgage payments with taxes and insurance, check our [Mortgage Calculator](file:///d:/Project-Calculator/src/data/calculators/mortgage-calculator.md) or evaluate property acquisition taxes with the [Stamp Duty Calculator](file:///d:/Project-Calculator/src/data/calculators/stamp-duty.md).

---

### Frequently Asked Questions (FAQ)

* **Q1: What is the 28/36 rule in real estate?**
  * A1: The 28/36 rule dictates that you should spend no more than **28% of your gross monthly income** on total housing costs, and no more than **36% on total debt obligations** (housing + consumer debts).
* **Q2: Does pre-qualification equal mortgage pre-approval?**
  * A2: No. Pre-qualification is an informal estimate based on self-reported figures. Mortgage pre-approval requires full lender verification of tax returns, W-2s, bank statements, and credit reports.
