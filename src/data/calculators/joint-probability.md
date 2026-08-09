---
title: "Joint Probability Calculator – AND/OR Probability of Two Events"
seoTitle: "Joint Probability Calculator | CalculationDesk"
metaDescription: "Calculate the probability of two events both happening (AND) or either happening (OR) for independent, mutually exclusive, or dependent events."
category: "mathematics"
subcategory: "probability-calculators"
tags: ["joint probability calculator", "probability of A and B calculator", "probability of A or B calculator", "independent events probability"]
priority: "medium"
importance: 5
clusterPriority: "secondary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-09"
formulaVerified: true
version: "1.0"
contentStatus: "published"
lastReviewed: "2026-08-09"
nextReviewDate: "2026-11-09"
refreshPriority: "medium"
aiSummary:
  definition: "This calculator computes the joint probability of two events — the chance both happen (AND) or the chance at least one happens (OR) — based on whether the events are independent, mutually exclusive, or dependent."
  quickAnswer: "For two independent events with probabilities 50% and 40%, the chance both happen (AND) is 20%, and the chance at least one happens (OR) is 70%."
  formulaSummary: "Independent AND: P(A) x P(B). Independent OR: P(A) + P(B) - P(A)xP(B). Mutually exclusive OR: P(A) + P(B); mutually exclusive AND: 0."
  whenToUse: "Use it to calculate combined probabilities for two events in scenarios like games of chance, quality control, or basic risk estimation."
  whoShouldUse: "Students learning probability, and anyone estimating the combined likelihood of two related or unrelated events."
  limitations: "This handles two-event scenarios only, and the relationship type (independent, mutually exclusive, or dependent) must be correctly identified by the user — selecting the wrong relationship type will produce a mathematically valid but situationally wrong answer."
  keyTakeaways:
    - "Independent events (like two separate coin flips) don't affect each other's probability, while mutually exclusive events (like rolling a 2 or a 5 on one die) can't both happen at the same time — these require different formulas and are easy to confuse."
    - "For mutually exclusive events, the AND probability is always zero by definition, since the events by definition cannot occur together."
    - "The OR formula for independent events subtracts P(A) x P(B) to avoid double-counting the overlap where both events happen at once — a step that's easy to forget and leads to an inflated OR probability."
peopleAlsoAsk:
  - "What's the difference between independent and mutually exclusive events?"
  - "Why does the OR formula subtract P(A) times P(B)?"
  - "Can two events be both independent and mutually exclusive?"
  - "How does joint probability change for dependent events?"
examples:
  - title: "Two independent events, P(A)=50%, P(B)=40%"
    inputs: "P(A) = 50%, P(B) = 40%, Relationship = Independent"
    calculation: "AND: P(A) x P(B) = 0.5 x 0.4 = 0.20 = 20%. OR: P(A) + P(B) - P(A)xP(B) = 0.5 + 0.4 - 0.20 = 0.70 = 70%"
    result: "P(A and B) = 20%, P(A or B) = 70%"
faqs:
  - q: "What's the difference between independent and mutually exclusive events?"
    a: "Independent events don't influence each other's probability at all — like flipping a coin twice, where the first flip has zero effect on the second. Mutually exclusive events can't both happen at the same time — like rolling a single die and getting a 2 or a 5 on that one roll. These are actually opposite kinds of relationships and use different formulas, so it's important to correctly identify which one applies before calculating."
  - q: "Why does the OR formula subtract P(A) times P(B)?"
    a: "Adding P(A) and P(B) directly double-counts the overlap — the outcomes where both A and B happen get counted once in P(A) and again in P(B). Subtracting P(A) x P(B), which represents that overlap for independent events, corrects the double-count so the OR probability reflects each outcome exactly once."
  - q: "Can two events be both independent and mutually exclusive?"
    a: "Only if one of them has zero probability. If two events both have a nonzero chance of happening, being mutually exclusive (they can't co-occur) actually makes them dependent — knowing one happened tells you the other definitely didn't, which is the opposite of independence. This is a common conceptual mix-up worth double-checking before selecting a relationship type."
  - q: "How does joint probability change for dependent events?"
    a: "For dependent events, the AND probability uses a conditional probability instead of the two events' plain probabilities: P(A and B) = P(A) x P(B given A), where P(B given A) is the probability of B happening given that A already happened. This calculator supports entering that conditional probability directly when you select the dependent relationship option."
references:
  - "https://www.probabilitycourse.com/chapter1/1_4_2_joint_probability.php"
formulaDescription: "The formula used depends on the relationship between the two events. Independent events multiply their probabilities directly for AND, since one event's outcome doesn't change the other's likelihood; their OR probability adds the two and subtracts the overlap to avoid double-counting. Mutually exclusive events can never co-occur, so their AND probability is always zero, and their OR probability is a simple sum. Dependent events require a conditional probability (the chance of one event given the other already happened) in place of its plain probability."
variablesExplained:
  - name: "P(A)"
    description: "The probability of the first event occurring, entered as a percentage."
  - name: "P(B)"
    description: "The probability of the second event occurring, entered as a percentage."
  - name: "Relationship"
    description: "Whether the two events are independent, mutually exclusive, or dependent — this determines which formula is used."
stepByStep: "Enter the probability of each event and select how the two events relate to each other (independent, mutually exclusive, or dependent). The calculator applies the matching formula to compute both the AND probability (both events happen) and the OR probability (at least one happens)."
realWorldUses: "This kind of calculation comes up in games of chance (rolling dice, drawing cards), basic quality control (chance two independent components both fail), and introductory probability coursework where students need to combine two event probabilities correctly."
commonMistakes:
  - "Treating dependent events as independent (or vice versa), which produces a probability that looks reasonable but doesn't actually match the real relationship between the events."
  - "Forgetting to subtract the overlap term when calculating OR for independent events, which overstates the combined probability."
---

# Joint Probability Calculator

Enter the probability of two events and how they relate to each other, and this calculator computes the probability both happen (AND) and the probability at least one happens (OR).

## Formula

For **independent** events: **P(A and B) = P(A) × P(B)**, and **P(A or B) = P(A) + P(B) − P(A)×P(B)**. For **mutually exclusive** events: P(A and B) = 0, and P(A or B) = P(A) + P(B).

For two independent events with P(A)=50% and P(B)=40%: P(A and B) = 0.5 × 0.4 = 20%, and P(A or B) = 0.5 + 0.4 − 0.20 = 70%.

## Independent vs. mutually exclusive

These are opposite relationships, and mixing them up is the most common mistake. Independent events (like two separate coin flips) don't affect each other's odds at all. Mutually exclusive events (like rolling a 2 or a 5 on a single die roll) can't both happen at once — and if two events with nonzero probability truly can't co-occur, that actually makes them dependent, not independent, since knowing one happened tells you the other definitely didn't.

## Why OR subtracts the overlap

Simply adding P(A) and P(B) double-counts the outcomes where both events happen. Subtracting P(A) × P(B) — the size of that overlap for independent events — corrects for the double-count so each outcome is represented exactly once in the final probability.

## Dependent events

When one event's outcome affects the other's probability, the AND calculation swaps in a conditional probability: P(A and B) = P(A) × P(B given A), where P(B given A) is B's probability assuming A has already happened. Selecting the dependent option lets you enter that conditional value directly.
