---
title: "Crypto Tax Calculator - Cryptocurrency Capital Gains & Tax Liability"
seoTitle: "Crypto Tax Calculator - Estimate Cryptocurrency Capital Gains Tax | CalculationDesk"
metaDescription: "Estimate the tax due on a cryptocurrency trade, including trading fees, India's 1% TDS and GST-on-fees rules, and net take-home profit across multiple tax jurisdictions."
category: "financial"
subcategory: "tax-calculators"
tags: ["crypto tax calculator", "cryptocurrency capital gains calculator", "bitcoin tax calculator", "crypto tax by country"]
priority: "high"
importance: 7
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
  reason: "Primary cryptocurrency capital gains tax estimation query across multiple jurisdictions"
titleVariants:
  - "Crypto Tax Calculator - Estimate Cryptocurrency Capital Gains Tax | CalculationDesk"
aiSummary:
  definition: "This calculator estimates the tax owed on a single cryptocurrency buy-sell trade, applying a jurisdiction-specific tax rate to the net gain after trading fees. It includes special handling for India (a flat 30% rate, 1% TDS on the sale, and 18% GST added to trading fees) and preset rate suggestions by region and holding period for other jurisdictions."
  quickAnswer: "Buying 1 BTC for $30,000 and selling for $35,000 at a 0.2% trading fee, taxed as a US short-term gain at 22%, produces a net gain of $4,870.00, tax due of $1,071.40, and a net profit of $3,798.60."
  formulaSummary: "NetGain = (SellValue - SellFee - SellGST) - (BuyValue + BuyFee + BuyGST) | Non-India: Tax = NetGain * (Rate/100) | India: Tax = NetGain * 30%, plus 1% TDS on gross sale value, and 18% GST added to both buy and sell trading fees"
  whenToUse: "Use this calculator to estimate the tax impact and net take-home profit of a cryptocurrency trade before or after executing it."
  whoShouldUse: "Cryptocurrency investors and traders estimating their tax liability on a completed or planned trade."
  limitations: "Applies a single flat rate to a single trade's net gain — it does not implement full progressive income tax brackets, does not track cost basis across multiple lots or trades, and does not account for losses offsetting other gains except by leaving that calculation to the user. Jurisdiction rate presets (other than India's statutory rules) are illustrative starting points, not a complete legal tax calculation."
  keyTakeaways:
    - "India is the only jurisdiction with special-cased rules baked into the calculation itself: a flat 30% tax on gains, a 1% TDS deducted from the gross sale value, and 18% GST added on top of trading fees — no other jurisdiction gets GST or TDS treatment."
    - "For every other jurisdiction, the calculator applies whatever tax rate is currently entered in the rate field to the net gain — selecting a region or holding period only changes the suggested starting rate, it doesn't run a full progressive tax bracket calculation."
    - "Trading fees reduce the net gain (and therefore the tax due) on both sides of the trade — an all-in comparison ignoring fees will overstate both the gain and the tax compared to what the calculator actually computes with its default 0.2% fee rate."
peopleAlsoAsk:
  - "Can I offset crypto losses against crypto gains?"
  - "What is the 1% TDS on crypto transactions in India?"
  - "Is GST or VAT applicable to cryptocurrency trading?"
  - "How are long-term crypto holdings taxed differently from short-term?"
examples:
  - title: "US Short-Term Trade, 1 BTC ($30,000 → $35,000), 0.2% Fee, 22% Rate"
    inputs: "Buy Price = $30,000, Sell Price = $35,000, Quantity = 1, Trading Fee = 0.2%, Region = United States, Holding Period = Short-Term (22% rate)"
    calculation: "Buy Fee = 30,000*0.2% = $60. Total Buy Cost = 30,000+60 = $30,060. Sell Fee = 35,000*0.2% = $70. Net Sell Proceeds = 35,000-70 = $34,930. Net Gain = 34,930-30,060 = $4,870.00. Tax Due = 4,870*22% = $1,071.40. Net Profit = 4,870-1,071.40 = $3,798.60."
    result: "Net Gain = $4,870.00 | Tax Due = $1,071.40 | Net Profit = $3,798.60 | Total Fees = $130.00"
  - title: "Indian Trade, 1 BTC (₹30,000 → ₹35,000 scale), 0.2% Fee, Flat 30% + TDS + GST"
    inputs: "Buy Price = ₹30,000, Sell Price = ₹35,000, Quantity = 1, Trading Fee = 0.2%, Region = India"
    calculation: "Buy Fee = 30,000*0.2% = ₹60; GST on Buy Fee (18%) = ₹10.80; Total Buy Cost = 30,000+60+10.80 = ₹30,070.80. Sell Fee = 35,000*0.2% = ₹70; GST on Sell Fee = ₹12.60; Net Sell Proceeds = 35,000-70-12.60 = ₹34,917.40. Net Gain = 34,917.40-30,070.80 = ₹4,846.60. Tax Due (flat 30%) = ₹1,453.98. TDS (1% of gross sale ₹35,000) = ₹350.00. Net Profit = 4,846.60-1,453.98 = ₹3,392.62."
    result: "Net Gain = ₹4,846.60 | Tax Due = ₹1,453.98 | TDS Withheld = ₹350.00 | Net Profit = ₹3,392.62 | Total Fees (incl. GST) = ₹153.40"
faqs:
  - q: "Can I offset crypto losses against crypto gains?"
    a: "It depends on the jurisdiction. In the United States and the United Kingdom, capital losses can generally offset capital gains, and in the US a limited amount can even offset ordinary income each year. In India, under Section 115BBH, losses from one virtual digital asset cannot be offset against gains from another — each transaction's gain is taxed independently, and losses provide no tax benefit. This calculator computes tax on a single trade and doesn't model loss offsetting across multiple trades."
  - q: "What is the 1% TDS on crypto transactions in India?"
    a: "TDS (Tax Deducted at Source) is a 1% withholding applied to the gross sale value of a virtual digital asset transaction in India, deducted at the time of the trade regardless of whether the trade resulted in a gain or loss. It's separate from the 30% capital gains tax itself — TDS is a pre-payment credited against your eventual tax liability, not an additional tax on top of the 30%."
  - q: "Is GST or VAT applicable to cryptocurrency trading?"
    a: "In India, 18% GST applies to the trading fees (the exchange's commission) charged on a transaction, not to the value of the cryptocurrency itself — this calculator adds that GST on top of both the buy-side and sell-side trading fees when the India jurisdiction is selected. Other jurisdictions modeled here don't apply an equivalent tax to trading fees in this calculator."
  - q: "How are long-term crypto holdings taxed differently from short-term?"
    a: "In several jurisdictions this calculator covers, holding an asset longer changes the applicable rate — for example, choosing 'long-term' for the US preset lowers the suggested rate from 22% to 15%, and for the EU it can drop to 0% under Germany-style long-term exemptions. India makes no such distinction: all virtual digital asset gains are taxed at a flat 30% regardless of how long the asset was held."
references:
  - "https://www.irs.gov"
  - "https://incometaxindia.gov.in"
formulaDescription: "The calculator first nets out trading fees on both sides of the trade — subtracting the buy-side fee (and, for India, 18% GST on that fee) from the cost basis, and subtracting the sell-side fee (plus GST for India) from the sale proceeds — to get the actual net gain. For India, that net gain is taxed at a flat 30%, with an additional 1% TDS calculated separately on the gross (pre-fee) sale value. For every other jurisdiction, the net gain is simply multiplied by whatever tax rate is currently set in the rate field, which is pre-filled based on the selected region and holding period but can be edited directly."
variablesExplained:
  - name: "Buy Price / Sell Price"
    description: "The per-unit price paid when acquiring the asset and the per-unit price received when selling it."
  - name: "Trading Fee"
    description: "The exchange's fee, as a percentage, applied separately to both the buy and sell transaction values."
  - name: "Tax Rate"
    description: "The rate applied to the net gain for non-India jurisdictions — pre-filled by region and holding period selection, but directly editable."
stepByStep: "Select your currency and tax jurisdiction (which pre-fills a suggested tax rate), enter your buy price, sell price, quantity, and trading fee percentage, and — for non-India jurisdictions — choose a holding period to adjust the suggested rate. The calculator nets out fees (and, for India, GST on those fees and TDS on the sale) to compute your net gain, tax due, and net profit."
realWorldUses: "Crypto investors and traders use calculators like this to estimate tax exposure before selling a position, to compare how different jurisdictions or holding periods change the after-tax outcome of the same trade, and to get a rough sense of how much trading fees actually eat into net profit."
commonMistakes:
  - "Ignoring trading fees when estimating gains by hand — comparing sale price minus buy price alone overstates both the gain and the resulting tax versus what this calculator computes once fees (and, for India, GST on fees) are netted out."
  - "Assuming the preset tax rate shown for a jurisdiction is a complete, legally accurate calculation — for non-India jurisdictions, the calculator applies one flat rate to the net gain rather than a full progressive tax bracket calculation, so it should be treated as an estimate, not a filing-ready number."
---

# Crypto Tax Calculator – Cryptocurrency Capital Gains Estimator

This calculator estimates the tax due on a single cryptocurrency trade — buying at one price and selling at another — after accounting for trading fees. It includes special handling for **India**, where virtual digital assets are taxed under a distinct set of rules (flat 30% tax, 1% TDS, and GST on trading fees), and offers preset rate suggestions for other jurisdictions based on region and holding period.

## How the Calculation Works

**Net gain** is computed after fees on both sides of the trade:

$$\text{Net Gain} = (\text{Sell Value} - \text{Sell Fee} - \text{Sell GST}) - (\text{Buy Value} + \text{Buy Fee} + \text{Buy GST})$$

GST (18%) only applies to trading fees when the India jurisdiction is selected; it's zero elsewhere.

**For India**: tax is a flat 30% of net gain, plus a separate 1% TDS withheld from the gross (pre-fee) sale value.

**For every other jurisdiction**: tax is simply the net gain multiplied by whatever rate is currently set — that rate is pre-filled based on your selected region and holding period (for example, the US preset switches between 22% short-term and 15% long-term), but you can edit it directly.

## Worked Example: US Short-Term Trade

Buying **1 BTC at $30,000** and selling at **$35,000**, with a **0.2%** trading fee, taxed as a US short-term gain at **22%**:

1. Buy fee: $30{,}000 \times 0.2\% = \$60$. Total buy cost: $\$30{,}060$
2. Sell fee: $35{,}000 \times 0.2\% = \$70$. Net sell proceeds: $\$34{,}930$
3. Net gain: $\$34{,}930 - \$30{,}060 = \$4{,}870.00$
4. Tax due: $\$4{,}870.00 \times 22\% = \$1{,}071.40$
5. Net profit: $\$4{,}870.00 - \$1{,}071.40 = \$3{,}798.60$

## Worked Example: India (Flat 30% + TDS + GST)

The same trade scaled to a comparable ratio for India — buying at **₹30,000** and selling at **₹35,000** — highlights how differently India's rules apply:

1. Buy fee: ₹60, plus 18% GST on that fee (₹10.80) → total buy cost ₹30,070.80
2. Sell fee: ₹70, plus 18% GST (₹12.60) → net sell proceeds ₹34,917.40
3. Net gain: ₹34,917.40 − ₹30,070.80 = **₹4,846.60**
4. Tax due (flat 30%): **₹1,453.98**
5. TDS (1% of the gross ₹35,000 sale, calculated separately): **₹350.00**
6. Net profit: ₹4,846.60 − ₹1,453.98 = **₹3,392.62**

Notice India's total deductions (tax plus TDS) come to ₹1,803.98 on the same proportional trade — meaningfully more than the US example's $1,071.40, both because of the higher flat rate and the additional TDS withholding that doesn't exist in the other jurisdictions.

## Why Fees Matter More Than They Look

Ignoring fees entirely — just subtracting buy price from sell price — gives a $5,000 "gain" on the US example above. Once the calculator's default 0.2% trading fee is factored in on both sides, the real net gain drops to $4,870.00, and because tax is calculated on that smaller net gain, the tax due drops too (from a naive $1,100 to the actual $1,071.40). Fees compound in both directions: they shrink your gain and, as a side effect, shrink your tax bill along with it.

## What This Calculator Does Not Include

> [!NOTE]
> **Real-world exclusions**: Outside of India's statutory rules, this calculator applies one flat tax rate to a single trade's net gain rather than modeling full progressive income tax brackets, multi-lot cost basis tracking (FIFO/LIFO), or loss offsetting across multiple trades and tax years. Treat non-India results as an estimate, not a filing-ready figure — consult a tax professional or your jurisdiction's official guidance for an actual return.
