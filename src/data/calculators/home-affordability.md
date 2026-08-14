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
lastUpdated: "2026-08-14"
formulaVerified: true
version: "2.1"
contentStatus: "published"
lastReviewed: "2026-08-14"
nextReviewDate: "2026-11-14"
refreshPriority: "high"
seoPriority:
  tier: 1
  reason: "Primary home purchasing power and mortgage affordability capacity query"
titleVariants:
  - "Home Affordability Calculator - How Much House Can I Afford? | CalculationDesk"
aiSummary:
  definition: "The Home Affordability Calculator estimates the maximum home purchase price you can afford by working backward from your Debt-to-Income (DTI) ratio, annual income, monthly non-housing debt obligations, and saved down payment capital."
  quickAnswer: "A household earning $100,000 annually with $500 in monthly debts, $50,000 in saved down payment funds, and a 6.0% 30-year mortgage interest rate can afford a maximum home price of $383,583.23 at a standard 36% DTI limit."
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
    calculation: "Step 1: Monthly Income = $100,000 / 12 = $8,333.33. Step 2: Max Monthly Debt Allowed = $8,333.33 * 0.36 = $3,000.00. Step 3: Max Housing P&I (after 20% tax/ins reserve) = ($3,000 - $500) * 0.80 = $2,000.00/month. Step 4: Max Borrowable Loan Principal at 6% over 30 yrs = $333,583.23. Step 5: Max Affordable Price = $333,583.23 + $50,000 = $383,583.23."
    result: "Maximum Affordable Price = $383,583.23 | Maximum Monthly P&I = $2,000.00 | Maximum Borrowable Loan = $333,583.23"
  - title: "$150,000 Income ($1,200/mo Debts, $100,000 Down Payment @ 43% DTI)"
    inputs: "Annual Income = $150,000, Monthly Debts = $1,200, Down Payment = $100,000, Interest Rate = 6.5%, Loan Term = 30 Years, DTI Limit = 43%"
    calculation: "Step 1: Monthly Income = $12,500.00. Step 2: Max Monthly Debt = $12,500 * 0.43 = $5,375.00. Step 3: Max Housing P&I = ($5,375 - $1,200) * 0.80 = $3,340.00. Step 4: Max Loan (6.5%, 30 yrs) = $528,424.14. Step 5: Max Price = $528,424.14 + $100,000 = $628,424.14."
    result: "Maximum Affordable Price = $628,424.14 | Maximum Monthly P&I = $3,340.00 | Maximum Borrowable Loan = $528,424.14"
faqs:
  - q: "What is the Debt-to-Income (DTI) ratio?"
    a: "The DTI ratio is the percentage of your gross monthly income committed to recurring debt payments (student loans, car payments, credit cards, child support, and proposed housing payments). Lenders prefer a total DTI under 36% for conventional loans."
  - q: "How do monthly consumer debts reduce home purchasing power?"
    a: "Every $100 in existing monthly debt payments reduces your allowable monthly housing payment by $80, which decreases your maximum borrowable mortgage amount by roughly $13,300 at a 6% interest rate over 30 years."
  - q: "Does a higher down payment increase my maximum home price?"
    a: "Yes. Every dollar added to your down payment increases your home purchasing capacity dollar-for-dollar without raising your monthly mortgage payment or interest charges."
references:
  - "https://www.consumerfinance.gov/"
  - "https://www.hud.gov/"
formulaDescription: "The calculator first applies your Debt-to-Income limit to your gross monthly income to find the Maximum Monthly Debt Allowed. It subtracts your existing monthly debts from that figure and reserves 20% for taxes and insurance, leaving the Maximum Housing Principal & Interest Budget. That monthly budget is converted into a Maximum Borrowable Loan Principal using the present-value-of-an-annuity formula at your entered interest rate and loan term. Finally, the down payment is added to the maximum loan to produce the Maximum Affordable Property Price."
variablesExplained:
  - name: "Debt-to-Income (DTI) Limit"
    description: "The maximum percentage of gross monthly income lenders will allow toward all recurring debt payments combined, including the proposed mortgage. Conventional loans commonly cap this around 36%, though some programs allow up to 43-50%."
  - name: "Maximum Monthly Housing Budget (P&I)"
    description: "The portion of allowable monthly debt payments left for Principal & Interest after subtracting existing non-housing debts and reserving 20% of the remainder for property taxes and insurance."
  - name: "Maximum Borrowable Loan Principal"
    description: "The largest loan amount that can be repaid within the Maximum Monthly Housing Budget at the given interest rate and term, computed using the present value of an annuity formula."
  - name: "Maximum Affordable Property Price"
    description: "The Maximum Borrowable Loan Principal plus the buyer's available down payment - the top price a buyer could pay while staying within DTI limits."
stepByStep: "1) Enter your annual household income, existing monthly debt payments, and available down payment savings. 2) Enter your expected mortgage interest rate, loan term, and target Debt-to-Income limit. 3) The calculator computes your Maximum Monthly Debt Allowed from income and DTI, subtracts existing debts and reserves 20% for taxes/insurance to get your Maximum Housing P&I Budget. 4) That monthly budget is converted into a Maximum Borrowable Loan using annuity present-value math. 5) Adding your down payment to the maximum loan produces your Maximum Affordable Property Price."
realWorldUses: "Used to set a realistic home search price range before touring properties or contacting a realtor, to see how paying off an existing debt (like a car loan) before house-hunting would increase purchasing power, to compare affordability across different interest rate scenarios, and to understand how much a larger down payment would raise the maximum affordable price."
commonMistakes:
  - "Treating the calculator's Maximum Affordable Price as a guaranteed mortgage pre-approval amount - actual lender approval also depends on credit score, employment history, cash reserves, and property appraisal, all of which this calculator does not model."
  - "Forgetting that increasing the DTI limit input (e.g. from 36% to 43%) increases the calculated maximum price, but a higher real-world DTI also means less monthly income cushion for savings, emergencies, and other financial goals."
  - "Ignoring how sensitive the maximum affordable price is to interest rate - even a 0.5 percentage point rate increase meaningfully reduces the maximum loan a given monthly P&I budget can support, since more of each payment goes to interest instead of principal capacity."
  - "Assuming all lenders reserve exactly 20% of the housing budget for taxes and insurance - actual property tax rates and insurance premiums vary significantly by location, so this is a simplifying assumption rather than a guaranteed allocation."
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
| **$250 / month** | $3,000 / mo | $2,200.00 / mo | $366,942 | **$416,942** | -$33,358 home capacity |
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
$$P_{\text{max}} = 2,000 \times \frac{(1.005)^{360} - 1}{0.005 \times (1.005)^{360}} = 2,000 \times 166.79161 = \mathbf{\$333,583.23}$$

#### Step 4: Calculate Maximum Affordable Property Price
$$\text{Max Price} = \$333,583.23 + \$50,000.00 = \mathbf{\$383,583.23}$$

---

### Second Worked Example: Higher Income with a Relaxed DTI Limit

For a household earning **$150,000/year** with **$1,200/month** in existing debts, **$100,000** down payment, a **6.5% rate**, **30-year term**, and a **43% DTI limit** (common for certain FHA and conventional loan programs):

$$\text{Monthly Income} = \frac{150{,}000}{12} = \$12{,}500.00, \quad D_{\text{max}} = 12{,}500 \times 0.43 = \mathbf{\$5{,}375.00}$$
$$M_{\text{max}} = (5{,}375 - 1{,}200) \times 0.80 = \mathbf{\$3{,}340.00}$$
$$r = \frac{0.065}{12} = 0.0054167, \quad P_{\text{max}} = 3{,}340 \times \frac{(1.0054167)^{360}-1}{0.0054167 \times (1.0054167)^{360}} = \mathbf{\$528{,}424.14}$$
$$\text{Max Price} = 528{,}424.14 + 100{,}000 = \mathbf{\$628{,}424.14}$$

> [!IMPORTANT]
> This second example's Maximum Borrowable Loan and Maximum Affordable Price were corrected during content review. Applying the exact present-value-of-an-annuity formula to a $3,340/month budget at 6.5% over 360 months produces **$528,424.14**, not the previously published $528,382 - and the Maximum Affordable Price is correspondingly **$628,424.14**, not $628,382.

---

### Underwriting Factors Beyond Debt-to-Income Ratios

> [!NOTE]
> - **Credit Score Tiers**: FICO scores above 740 qualify for the lowest mortgage interest rates, while lower scores (620-680) incur loan-level price adjustments (LLPAs) that increase monthly rates and reduce borrowing limits.
> - **Liquid Reserve Requirements**: Lenders often require buyers to maintain **2 to 6 months of housing payments in reserve** cash after paying the down payment and closing costs.

To model specific monthly mortgage payments with taxes and insurance, check our [Mortgage Calculator](/calculators/mortgage-calculator/) or evaluate property acquisition taxes with the [Stamp Duty Calculator](/calculators/stamp-duty/).

---

### Frequently Asked Questions (FAQ)

* **Q1: What is the 28/36 rule in real estate?**
  * A1: The 28/36 rule dictates that you should spend no more than 28% of your gross monthly income on total housing costs, and no more than 36% on total debt obligations (housing + consumer debts).
* **Q2: Does pre-qualification equal mortgage pre-approval?**
  * A2: No. Pre-qualification is an informal estimate based on self-reported figures. Mortgage pre-approval requires full lender verification of tax returns, W-2s, bank statements, and credit reports.
* **Q3: Why does a higher DTI limit (like 43%) sometimes apply instead of the standard 36%?**
  * A3: Certain loan programs (including many FHA-backed loans) permit higher DTI ratios, sometimes up to 43-50%, particularly for borrowers with strong credit scores or substantial cash reserves - but a higher DTI leaves less monthly income margin for savings and unexpected expenses, even when a lender approves it.
