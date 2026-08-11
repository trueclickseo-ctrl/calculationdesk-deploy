---
title: "Debt Payoff Calculator – Find How Long a Fixed Payment Takes"
seoTitle: "Debt Payoff Calculator | CalculationDesk"
metaDescription: "Enter a debt balance, interest rate, and fixed monthly payment to calculate how many months it will take to pay it off."
category: "finance"
subcategory: "debt-calculators"
tags: ["debt payoff calculator", "how long to pay off debt", "credit card payoff calculator", "months to pay off loan"]
priority: "high"
importance: 7
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
aiSummary:
  definition: "This calculator computes how many months it will take to pay off a debt balance at a given interest rate, using a fixed monthly payment."
  quickAnswer: "A $10,000 balance at 18% APR, paid down with a fixed $300 monthly payment, takes about 46.6 months to pay off — the calculator rounds this up and displays 47 months."
  formulaSummary: "Months = -ln(1 - (Balance x monthly rate) / Payment) / ln(1 + monthly rate), where monthly rate = annual rate / 12."
  whenToUse: "Use it to see how long a debt will take to clear at your current payment, or to test how increasing the monthly payment shortens the payoff timeline."
  whoShouldUse: "Anyone paying down a credit card, personal loan, or other fixed-rate debt with a set monthly payment."
  limitations: "This assumes a fixed payment amount and a fixed interest rate for the entire payoff period, which matches how many loans work but not how variable-rate credit cards or cards with changing minimum payments behave. It also doesn't account for late fees, promotional rate periods, or additional charges added to the balance."
  keyTakeaways:
    - "If your payment doesn't exceed the interest accruing each month, the balance never actually goes down — the calculator can't return a valid answer in that case, because the debt would never be paid off."
    - "Even a modest increase in the monthly payment can meaningfully cut the payoff time, especially on high-interest debt, since more of each payment goes toward principal rather than interest."
    - "This calculates payoff time for a single debt with one fixed payment — it doesn't optimize across multiple debts or a payment that grows over time."
peopleAlsoAsk:
  - "What happens if my payment barely covers the interest?"
  - "How much faster does debt get paid off if I increase the payment?"
  - "Why does the same balance take different times to pay off at different interest rates?"
  - "Does this account for minimum payments that go down over time?"
examples:
  - title: "$10,000 balance, 18% APR, $300/month"
    inputs: "Balance = $10,000, Interest rate = 18% APR, Monthly payment = $300"
    calculation: "Monthly rate = 0.18/12 = 0.015. Months = -ln(1 - (10,000 x 0.015)/300) / ln(1.015) = -ln(1 - 0.5) / ln(1.015) = -ln(0.5)/0.014889 = 0.6931/0.014889 = 46.6"
    result: "Payoff time ≈ 46.6 months (about 3 years 11 months)"
faqs:
  - q: "What happens if my payment barely covers the interest?"
    a: "If your fixed payment is less than or equal to the interest accruing on the balance each month, the debt mathematically never gets paid off — the balance either stays flat or grows. This calculator can't return a valid payoff time in that situation, which is a useful warning sign that the payment needs to increase."
  - q: "How much faster does debt get paid off if I increase the payment?"
    a: "Often significantly, especially on high-interest debt, because a larger payment doesn't just add to what covers interest — a bigger share of it starts going toward the principal balance itself. Try raising the payment amount in the calculator by even a modest amount to see how much time (and total interest) it saves."
  - q: "Why does the same balance take different times to pay off at different interest rates?"
    a: "A higher interest rate means more of each fixed payment goes toward covering accrued interest and less goes toward reducing the actual balance, so the balance shrinks more slowly and the payoff stretches out longer — even with the identical payment amount."
  - q: "Does this account for minimum payments that go down over time?"
    a: "No — this assumes a constant fixed payment for the entire payoff period. Many credit cards calculate a minimum payment as a percentage of the current balance, meaning the required minimum shrinks as the balance shrinks, which stretches out payoff time significantly compared to a truly fixed payment. Using a fixed payment (rather than just the minimum) is generally the faster path to paying off a card."
references:
  - "https://www.consumerfinance.gov/ask-cfpb/how-can-i-pay-off-my-credit-card-debt-faster-en-1859/"
formulaDescription: "This uses the standard loan amortization formula solved for the number of periods, rather than the payment amount. It works out how many monthly payments of a fixed size are needed to bring a balance accruing interest at a given monthly rate down to zero."
variablesExplained:
  - name: "Debt balance"
    description: "The current outstanding balance you're paying down."
  - name: "Interest rate"
    description: "The debt's annual interest rate (APR), entered as a percentage."
  - name: "Monthly payment"
    description: "The fixed amount you plan to pay every month toward this debt."
stepByStep: "Enter your current balance, the annual interest rate, and the fixed monthly payment you're making. The calculator converts the annual rate to a monthly rate and solves for the number of months needed to bring the balance to zero at that payment level."
realWorldUses: "People use this to see how long a credit card or personal loan balance will take to clear at their current payment, and to test how much time (and by extension, interest) they'd save by paying more than the minimum each month."
commonMistakes:
  - "Entering a payment that's at or below the monthly interest charge, which produces an invalid result since the balance would never actually decrease at that payment level."
  - "Assuming this reflects a credit card's declining minimum payment schedule, when it actually assumes a constant fixed payment throughout — real minimum-payment schedules typically take much longer."
---

# Debt Payoff Calculator

Enter a debt balance, its interest rate, and the fixed amount you're paying each month, and this calculator returns how many months it will take to pay the balance down to zero.

## Formula

**Months = −ln(1 − (Balance × monthly rate) / Payment) / ln(1 + monthly rate)**, where the monthly rate is the annual interest rate divided by 12. This is the loan amortization formula solved for time instead of payment amount — it accounts for the fact that as the balance shrinks, less of each payment goes toward interest and more goes toward principal, which is why payoff accelerates somewhat toward the end.

For a $10,000 balance at 18% APR with a fixed $300 monthly payment, that works out to about 46.6 months — just under four years. The calculator rounds this up to a whole number of months and displays **47 months**, since a payment made partway through the final month wouldn't fully clear the balance.

## Why the payment has to clear the interest first

If a payment is less than or equal to the interest accruing that month, the balance can't shrink — it either holds flat or grows, and there's no finite payoff time. This calculator will return an invalid result in that case, which is actually a useful signal: it means the payment needs to increase before the debt can realistically be paid off at all.

## Increasing the payment helps more than it might seem

Because a bigger payment doesn't just cover more interest, it also starts chipping away at principal faster, raising the payment even modestly on high-interest debt can cut the payoff timeline substantially — often by more than the percentage increase in the payment itself, since the compounding effect works in your favor once more of the balance starts shrinking each month.

## What this doesn't model

This assumes one fixed payment amount and one fixed interest rate for the whole payoff period. Real credit cards often calculate a minimum payment as a shrinking percentage of the current balance, which drags out payoff time well beyond what a truly fixed payment would achieve — so using a level, fixed payment (rather than just whatever the statement's minimum happens to be) is generally the faster route to actually clearing the balance.
