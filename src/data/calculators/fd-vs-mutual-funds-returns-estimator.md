---
title: "FD vs Mutual Funds Returns Estimator - Investment Yield Comparison"
seoTitle: "FD vs Mutual Funds Returns Estimator - Post-Tax Yield Comparison | CalculationDesk"
metaDescription: "Compare pre-tax and post-tax maturity returns between a Fixed Deposit and a Mutual Fund, including income-slab FD taxation and LTCG rules on mutual fund gains."
category: "financial"
subcategory: "investment-calculators"
tags: ["fd vs mutual funds", "fixed deposit vs mutual fund", "post tax yield estimator", "ltcg tax calculator", "fd tax slab"]
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
  reason: "Primary FD vs mutual fund post-tax return comparison query"
titleVariants:
  - "FD vs Mutual Funds Returns Estimator - Post-Tax Yield Comparison | CalculationDesk"
aiSummary:
  definition: "This calculator compares the post-tax maturity value of a Fixed Deposit — taxed annually at your income slab rate — against a Mutual Fund investment, taxed once at redemption under long-term capital gains (LTCG) rules, including India's statutory LTCG exemption."
  quickAnswer: "Investing ₹10,00,000 for 5 years at a 7% FD rate (30% tax slab) yields a post-tax maturity of ₹12,75,721.01. The same amount in a mutual fund at a 12% expected return (12.5% LTCG tax) yields ₹16,82,673.97 — outperforming the FD by ₹4,06,952.96."
  formulaSummary: "FD: R_post = R_fd*(1-TaxSlab/100), Post-Tax = P*(1+R_post/400)^(4t) | MF: PreTax = P*(1+R_mf/100)^t, Tax = max(0,Gain-Exemption)*TaxRate/100"
  whenToUse: "Use this calculator to compare the real, after-tax return of a guaranteed Fixed Deposit against a market-linked Mutual Fund investment, rather than comparing their headline interest and return rates directly."
  whoShouldUse: "Investors deciding between guaranteed fixed-income products and market-linked mutual funds, and anyone wanting to see how taxation timing (annual for FDs, at redemption for mutual funds) changes the real comparison."
  limitations: "Assumes a single constant FD rate and a single constant expected mutual fund return for the entire tenure — mutual fund returns are not guaranteed and can vary significantly from the assumed rate. The ₹1,25,000 LTCG exemption is only applied when the currency is set to INR; other currencies apply the entered capital gains tax rate to the full taxable gain with no exemption."
  keyTakeaways:
    - "Fixed deposit interest is taxed every year at your income slab rate whether or not you withdraw it, while mutual fund gains compound completely untaxed until the investment is actually redeemed — this tax-deferred compounding is a real structural advantage for mutual funds, separate from any difference in expected return rate."
    - "For INR-denominated mutual fund investments, the calculator subtracts a ₹1,25,000 statutory LTCG exemption from the gain before applying the capital gains tax rate — this exemption doesn't apply to FD interest, which is taxed on every rupee earned above zero."
    - "A higher expected mutual fund return doesn't automatically mean a higher post-tax outcome is guaranteed — mutual fund returns are market-linked and can fall short of the assumed rate, while FD returns are contractually guaranteed at the stated rate for the deposit term."
peopleAlsoAsk:
  - "How are Fixed Deposits taxed compared to Mutual Funds?"
  - "What is the LTCG tax exemption on equity mutual funds in India?"
  - "Why do mutual funds often deliver higher post-tax returns than FDs?"
  - "Are mutual fund returns guaranteed?"
examples:
  - title: "5-Year ₹10,00,000 Investment: 7% FD @ 30% Tax Slab vs. 12% MF @ 12.5% LTCG Tax"
    inputs: "Principal = ₹10,00,000, Tenure = 5 Years, FD Rate = 7%, Tax Slab = 30%, MF Rate = 12%, LTCG Tax Rate = 12.5%"
    calculation: "FD: Post-tax rate = 7 × (1 - 0.30) = 4.9%. Post-Tax FD = 10,00,000 × (1 + 4.9/400)^20 = ₹12,75,721.01. Tax Paid = ₹1,39,057.18. MF: Pre-Tax = 10,00,000 × (1.12)^5 = ₹17,62,341.68. Gain = ₹7,62,341.68. Taxable Gain (after ₹1.25L exemption) = ₹6,37,341.68. LTCG Tax = 6,37,341.68 × 12.5% = ₹79,667.71. Post-Tax MF = ₹16,82,673.97."
    result: "FD Post-Tax Maturity = ₹12,75,721.01 | MF Post-Tax Maturity = ₹16,82,673.97 | MF Outperformance = ₹4,06,952.96"
  - title: "Same Inputs, Shorter 3-Year Tenure"
    inputs: "Principal = ₹10,00,000, Tenure = 3 Years, FD Rate = 7%, Tax Slab = 30%, MF Rate = 12%, LTCG Tax Rate = 12.5%"
    calculation: "Over a shorter 3-year tenure, MF gains before the ₹1,25,000 exemption are smaller, so a larger share of the gain escapes LTCG tax entirely, but there's also less time for the mutual fund's growth advantage to compound: FD Post-Tax = ₹11,57,319.91. MF Post-Tax = ₹13,69,937.00."
    result: "FD Post-Tax Maturity = ₹11,57,319.91 | MF Post-Tax Maturity = ₹13,69,937.00 | MF Outperformance = ₹2,12,617.09"
faqs:
  - q: "How are Fixed Deposits taxed compared to Mutual Funds?"
    a: "FD interest is taxed every financial year at your marginal income tax slab rate, regardless of whether you withdraw the interest or let it reinvest. Mutual fund gains, by contrast, are only taxed once — when you actually redeem your units — under capital gains rules, which for equity funds held over a year (long-term) means a lower LTCG rate rather than your full income slab rate."
  - q: "What is the LTCG tax exemption on equity mutual funds in India?"
    a: "Under current Indian rules, long-term capital gains on equity mutual funds held over 12 months are exempt from tax up to ₹1,25,000 per financial year — only gains above that threshold are taxed at the LTCG rate. This calculator applies that exemption automatically when the currency is set to INR."
  - q: "Why do mutual funds often deliver higher post-tax returns than FDs?"
    a: "Two factors compound together: mutual funds are typically assumed to earn a higher expected return than FD interest rates, and mutual fund gains grow completely untaxed until redemption rather than being taxed annually. Both effects favor mutual funds in this comparison, though the mutual fund's return is an assumption, not a guarantee, unlike the FD's contracted rate."
  - q: "Are mutual fund returns guaranteed?"
    a: "No. Fixed deposits offer a guaranteed, contracted interest rate for the deposit term. Mutual funds are market-linked investments whose actual returns depend on market performance and can be higher or lower than any assumed rate — including negative in a down market — so the mutual fund figures here are a projection, not a promise."
references:
  - "https://incometaxindia.gov.in"
formulaDescription: "The two investment types are modeled with their own tax timing. The FD's stated interest rate is first reduced by the investor's tax slab percentage to get a post-tax effective rate, which then compounds quarterly over the tenure — meaning tax is effectively deducted from the rate every compounding period, matching how FD interest is taxed as it's earned each year. The mutual fund compounds untaxed at its full expected rate for the entire tenure; only at the end is the total gain calculated, reduced by any statutory exemption, and taxed once at the capital gains rate to arrive at the post-tax maturity value."
variablesExplained:
  - name: "R_FD, R_MF"
    description: "The FD's annual interest rate and the mutual fund's expected annual return rate, both entered as percentages."
  - name: "Tax Slab / LTCG Tax Rate"
    description: "The investor's income tax slab rate (applied to FD interest annually) and the long-term capital gains tax rate (applied to mutual fund gains once, at redemption)."
  - name: "Exemption"
    description: "The ₹1,25,000 statutory LTCG exemption subtracted from mutual fund gains before tax, applied only when the currency is set to INR."
stepByStep: "Enter the investment principal, tenure, FD interest rate, your income tax slab, the mutual fund's expected return, and the mutual fund LTCG tax rate. The calculator compounds the FD quarterly at a tax-adjusted rate and the mutual fund annually at its full rate, applies capital gains tax once at redemption for the mutual fund, and compares the two post-tax maturity values."
realWorldUses: "Investors use this to see whether a mutual fund's typically higher expected return still wins after accounting for how differently the two investments are taxed, and to test how a lower or higher tax slab changes which option comes out ahead for their specific situation."
commonMistakes:
  - "Comparing FD and mutual fund headline rates directly without accounting for the very different tax treatment — an FD's stated rate is reduced every year by tax, while a mutual fund's stated rate compounds in full until redemption, so equal headline rates don't produce equal post-tax outcomes."
  - "Treating the mutual fund's assumed return rate as guaranteed the way an FD's rate is — mutual fund performance is market-dependent, and a materially lower real-world return could easily flip which option actually performs better after tax."
---

# FD vs Mutual Funds Returns Estimator – Tax & Yield Guide

Comparing a Fixed Deposit against a Mutual Fund by headline rate alone is misleading, because the two are taxed under entirely different rules. This calculator projects the **pre-tax maturity, tax paid, and post-tax maturity value** for both, so the comparison reflects what an investor would actually keep.

## How Each Investment Is Taxed and Compounded

**Fixed Deposit** — interest taxed annually at the income slab rate, then compounded quarterly:

$$R_{\text{post}} = R_{FD} \times \left(1 - \frac{\text{Tax Slab}}{100}\right) \qquad \text{Post-Tax FD} = P \times \left(1 + \frac{R_{\text{post}}}{400}\right)^{4t}$$

**Mutual Fund** — compounds untaxed, then taxed once at redemption:

$$\text{Pre-Tax MF} = P \times \left(1 + \frac{R_{MF}}{100}\right)^t \qquad \text{Taxable Gain} = \max(0, \text{Gain} - \text{Exemption})$$

$$\text{Post-Tax MF} = \text{Pre-Tax MF} - \left(\text{Taxable Gain} \times \frac{\text{LTCG Rate}}{100}\right)$$

For INR investments, a statutory **₹1,25,000** exemption is subtracted from the mutual fund gain before applying the LTCG rate.

## Worked Example

**₹10,00,000** invested for **5 years** at a **7%** FD rate (**30%** tax slab) versus a **12%** expected mutual fund return (**12.5%** LTCG tax):

**Fixed Deposit:**
1. Post-tax rate: $7 \times (1 - 0.30) = 4.9\%$
2. Post-tax maturity: $10{,}00{,}000 \times (1 + 4.9/400)^{20} \approx ₹12{,}75{,}721.01$
3. Tax paid: $₹14{,}14{,}778.20 - ₹12{,}75{,}721.01 = ₹1{,}39{,}057.18$

**Mutual Fund:**
1. Pre-tax maturity: $10{,}00{,}000 \times (1.12)^5 \approx ₹17{,}62{,}341.68$
2. Gain: $₹17{,}62{,}341.68 - ₹10{,}00{,}000 = ₹7{,}62{,}341.68$
3. Taxable gain (after exemption): $₹7{,}62{,}341.68 - ₹1{,}25{,}000 = ₹6{,}37{,}341.68$
4. LTCG tax: $₹6{,}37{,}341.68 \times 12.5\% \approx ₹79{,}667.71$
5. Post-tax maturity: $₹17{,}62{,}341.68 - ₹79{,}667.71 \approx ₹16{,}82{,}673.97$

The mutual fund's post-tax maturity of **₹16,82,673.97** outperforms the FD's **₹12,75,721.01** by **₹4,06,952.96** — driven both by the higher assumed return and by paying tax only once, at redemption, instead of every year.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: Mutual fund returns are assumed constant and are not guaranteed — actual market performance can be higher or lower. This doesn't model FD premature-withdrawal penalties, mutual fund expense ratios or exit loads, or tax rule changes over a multi-year holding period. The ₹1,25,000 exemption applies to equity mutual funds under current Indian rules and may not reflect debt fund taxation, which is generally taxed at the income slab rate similar to FDs.

To model a fixed deposit on its own without a comparison, see the [FD Calculator](/calculators/fd-calculator/).
