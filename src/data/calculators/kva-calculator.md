---
title: "kVA Calculator – Volts and Amps to Apparent Power"
seoTitle: "kVA Calculator | CalculationDesk"
metaDescription: "Calculate apparent power in kVA from voltage and current, for single-phase and three-phase electrical systems."
category: "engineering"
subcategory: "electrical-calculators"
tags: ["kva calculator", "volts to kva", "apparent power calculator", "three phase kva"]
priority: "medium"
importance: 6
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
  definition: "This calculator finds apparent power in kilovolt-amps (kVA) from voltage and current, for either single-phase or three-phase electrical systems."
  quickAnswer: "A single-phase circuit carrying 10 amps at 120 volts has an apparent power of 1.2 kVA."
  formulaSummary: "kVA = (Volts x Amps x Phase Factor) / 1000, where the phase factor is 1 for single-phase and the square root of 3 (≈1.732) for three-phase systems."
  whenToUse: "Use it when sizing electrical equipment such as generators, transformers, and UPS units, which are typically rated in kVA rather than kilowatts."
  whoShouldUse: "Electricians and electrical engineers specifying or sizing generators, transformers, or backup power systems."
  limitations: "This calculates apparent power (kVA), not real power (kW) — the two are only equal when the power factor is exactly 1.0; for loads with a lower power factor, the real power delivered is less than the apparent power calculated here."
  keyTakeaways:
    - "kVA measures apparent power — the total electrical capacity a circuit demands — while kW measures real power, the portion that actually does useful work; the two differ whenever the power factor is below 1.0."
    - "Three-phase systems use the square root of 3 (approximately 1.732) as a multiplier because the three phases combine to deliver more total power for the same per-phase voltage and current than a single-phase circuit would."
    - "Generators, transformers, and UPS systems are conventionally rated in kVA rather than kW because their physical components (windings, insulation) are limited by current and voltage, which is what apparent power directly reflects."
peopleAlsoAsk:
  - "What's the difference between kVA and kW?"
  - "Why do three-phase systems use the square root of 3?"
  - "How do I size a generator using kVA?"
  - "What is power factor and how does it relate to kVA?"
examples:
  - title: "Single-phase, 120V at 10A"
    inputs: "Voltage = 120V, Current = 10A, Phase = Single-phase"
    calculation: "kVA = (120 x 10 x 1) / 1000 = 1.2"
    result: "Apparent Power = 1.2 kVA"
faqs:
  - q: "What's the difference between kVA and kW?"
    a: "kVA (kilovolt-amps) measures apparent power — the total electrical capacity that voltage and current together demand from a circuit. kW (kilowatts) measures real power, the portion of that capacity actually converted into useful work like heat, light, or motion. The two are equal only when the power factor is 1.0 (a purely resistive load); for motors and other inductive loads with a power factor below 1.0, kW is always less than kVA."
  - q: "Why do three-phase systems use the square root of 3?"
    a: "In a three-phase system, three alternating voltage waveforms are offset by 120 degrees from each other. When you work out how those three phases combine to deliver total power relative to any single phase's voltage and current, the trigonometry resolves to a factor of the square root of 3 (approximately 1.732) rather than a simple factor of 3, because the phases aren't all peaking at the same instant."
  - q: "How do I size a generator using kVA?"
    a: "Add up the kVA demand of every device the generator needs to power simultaneously, then choose a generator rated at or above that total, with some headroom for startup surges from motors and compressors, which briefly draw several times their running current. Manufacturers rate generators in kVA specifically because their windings and insulation are limited by current and voltage, which apparent power reflects directly."
  - q: "What is power factor and how does it relate to kVA?"
    a: "Power factor is the ratio of real power (kW) to apparent power (kVA), ranging from 0 to 1. A power factor of 1.0 means all the apparent power is being converted to useful work; a lower power factor — common with motors, transformers, and other inductive loads — means some of that apparent power is circulating without doing useful work, so the real power delivered is less than the kVA figure alone would suggest."
references:
  - "https://www.energy.gov/eere/femp/articles/power-factor-and-electricity-savings"
formulaDescription: "Apparent power is the product of voltage and current, which for a single-phase circuit is simply Volts multiplied by Amps. For three-phase circuits, that per-phase product is further multiplied by the square root of 3, which accounts for how the three offset phase currents combine to deliver total system power. Dividing by 1,000 converts the result from volt-amps to kilovolt-amps."
variablesExplained:
  - name: "Voltage"
    description: "The voltage of the circuit, in volts."
  - name: "Current"
    description: "The current flowing through the circuit, in amps."
  - name: "Phase"
    description: "Whether the circuit is single-phase or three-phase, which determines the multiplier applied."
stepByStep: "Enter the circuit's voltage and current, and select whether it's single-phase or three-phase. The calculator multiplies voltage by current (and by the square root of 3 for three-phase) then divides by 1,000 to return apparent power in kVA."
realWorldUses: "Electricians and engineers use kVA calculations to size generators, transformers, and UPS systems, and to verify that a planned electrical installation stays within a service panel's or utility connection's rated capacity."
commonMistakes:
  - "Treating kVA and kW as interchangeable when sizing equipment, which can lead to undersizing a generator or transformer for loads with a poor power factor."
  - "Applying the three-phase multiplier to a single-phase circuit (or vice-versa), which produces a result roughly 73% too high or too low."
---

# kVA Calculator

Enter voltage, current, and whether the circuit is single-phase or three-phase, and this calculator returns apparent power in kilovolt-amps (kVA) — the rating unit used for generators, transformers, and UPS systems.

## Formula

**kVA = (Volts × Amps × Phase Factor) ÷ 1,000**, where the phase factor is 1 for single-phase and √3 (≈1.732) for three-phase.

For a single-phase circuit at 120V and 10A: kVA = (120 × 10 × 1) ÷ 1,000 = 1.2 kVA.

## kVA versus kW

kVA measures apparent power — the total electrical capacity a circuit's voltage and current together demand. kW measures real power, the portion of that capacity actually doing useful work. The two match exactly only when the power factor is 1.0; for motors, transformers, and other inductive loads with a lower power factor, the real power delivered is always less than the apparent power calculated here.

## Why three-phase gets a different multiplier

A three-phase system carries three voltage waveforms offset by 120 degrees from one another, so they don't all peak simultaneously. Working through how those offset phases combine into total delivered power produces a factor of the square root of 3, not a plain factor of 3 — which is why three-phase kVA calculations use roughly 1.732 as the multiplier rather than the number of phases itself.
