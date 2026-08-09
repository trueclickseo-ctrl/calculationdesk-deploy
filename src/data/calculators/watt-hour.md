---
title: "Watt-Hour Calculator – Amp-Hours to Wh"
seoTitle: "Watt-Hour Calculator | CalculationDesk"
metaDescription: "Convert battery amp-hour (Ah) capacity to watt-hours (Wh) using voltage, to compare batteries across different voltages."
category: "engineering"
subcategory: "electrical-calculators"
tags: ["watt hour calculator", "amp hours to watt hours", "battery capacity calculator", "wh converter"]
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
  definition: "This calculator converts a battery's amp-hour (Ah) capacity into watt-hours (Wh), the true measure of stored energy that accounts for voltage."
  quickAnswer: "A 100 Ah battery rated at 12 volts stores 1,200 Wh of energy."
  formulaSummary: "Watt-hours = Amp-hours x Volts."
  whenToUse: "Use it whenever you need to compare batteries of different voltages on stored energy, or need to convert Ah battery specs into Wh for sizing solar systems, generators, or portable power stations."
  whoShouldUse: "Anyone sizing a battery bank, solar power system, or portable power station, and anyone comparing batteries rated in different units."
  limitations: "This calculates nominal stored energy at the battery's rated voltage — actual usable energy is typically somewhat lower due to voltage sag under load, depth-of-discharge limits, and round-trip efficiency losses."
  keyTakeaways:
    - "Amp-hours alone don't measure energy — they measure charge capacity, so two batteries with identical Ah ratings but different voltages store very different amounts of actual energy."
    - "Watt-hours are the correct unit for comparing batteries of different voltages or chemistries, since they capture both the charge capacity and the voltage at which that charge is delivered."
    - "This conversion assumes the full amp-hour rating is deliverable at a constant nominal voltage — real battery discharge curves aren't perfectly flat, so actual usable watt-hours may be somewhat lower than this nominal calculation."
peopleAlsoAsk:
  - "Why aren't amp-hours enough to compare batteries?"
  - "How do I convert watt-hours back to amp-hours?"
  - "What's a typical watt-hour rating for a car battery?"
  - "Why do solar and power station specs use watt-hours?"
examples:
  - title: "100 Ah battery at 12V"
    inputs: "Capacity = 100 Ah, Voltage = 12V"
    calculation: "Wh = 100 x 12 = 1200"
    result: "Energy Capacity = 1,200 Wh"
faqs:
  - q: "Why aren't amp-hours enough to compare batteries?"
    a: "Amp-hours measure electric charge capacity — how much current a battery can deliver over time — but not energy, because they leave out voltage. A 100 Ah battery at 12V and a 100 Ah battery at 48V both hold 100 amp-hours of charge, but the 48V battery stores four times as much actual usable energy, since energy is charge multiplied by voltage."
  - q: "How do I convert watt-hours back to amp-hours?"
    a: "Rearrange the formula to divide instead of multiply: Amp-hours = Watt-hours ÷ Volts. For example, a 600 Wh power station rated at 12V has an equivalent capacity of 50 Ah, which is the conversion you'd need if comparing it against a battery spec sheet listed only in amp-hours."
  - q: "What's a typical watt-hour rating for a car battery?"
    a: "A typical automotive lead-acid battery is rated around 45–60 Ah at 12V, which works out to roughly 540–720 Wh of stored energy. Deep-cycle batteries used for RVs, boats, or solar storage are often rated higher, commonly in the 100–200 Ah range at 12V, translating to 1,200–2,400 Wh."
  - q: "Why do solar and power station specs use watt-hours?"
    a: "Watt-hours give a single, voltage-independent number for comparing energy storage or consumption across very different types of equipment — a solar panel's daily output, a power station's total capacity, and a laptop's battery life can all be measured and compared directly in watt-hours, whereas amp-hour figures alone would need voltage context to mean anything comparable."
references:
  - "https://www.batteryuniversity.com/article/bu-903-how-to-measure-state-of-charge"
formulaDescription: "Electrical energy is the product of charge and voltage. Amp-hours already represent a quantity of charge delivered over time, so multiplying that figure by the battery's voltage converts the charge-based rating into a true energy figure, expressed in watt-hours."
variablesExplained:
  - name: "Capacity"
    description: "The battery's rated charge capacity, in amp-hours (Ah)."
  - name: "Voltage"
    description: "The battery's nominal operating voltage, in volts."
stepByStep: "Enter the battery's amp-hour capacity and its rated voltage. The calculator multiplies the two to return the total stored energy in watt-hours."
realWorldUses: "People sizing solar power systems, portable power stations, or off-grid battery banks use watt-hours to match total available energy against expected daily consumption, since watt-hours (unlike amp-hours alone) account for voltage and can be compared directly across different battery types."
commonMistakes:
  - "Comparing two batteries by amp-hour rating alone without checking their voltage, which can make a lower-capacity high-voltage battery look weaker than a higher-capacity low-voltage one when the opposite may be true in actual stored energy."
  - "Treating the nominal watt-hour figure as fully usable energy, when real-world factors like depth-of-discharge limits and voltage sag under load typically reduce the energy actually available."
---

# Watt-Hour Calculator

Enter a battery's amp-hour capacity and its voltage, and this calculator returns the total stored energy in watt-hours — the unit that actually lets you compare batteries of different voltages.

## Formula

**Watt-hours (Wh) = Amp-hours (Ah) × Volts**

For a 100 Ah battery at 12V: Wh = 100 × 12 = 1,200 Wh.

## Why amp-hours alone can be misleading

Amp-hours measure charge capacity, not energy — they say nothing about the voltage at which that charge is delivered. Two batteries both rated at 100 Ah can store very different amounts of usable energy if one runs at 12V and the other at 48V, since energy scales with both charge and voltage together. Watt-hours fold both factors into a single number, which is why it's the right unit whenever batteries of different voltages or chemistries need to be compared on equal footing.

## What this figure doesn't capture

The watt-hour value here is the nominal stored energy at the battery's rated voltage, not necessarily what you'll actually get out of it in use. Real batteries have discharge curves that aren't perfectly flat, depth-of-discharge limits that make part of the rated capacity off-limits for longevity, and some voltage sag under heavy load — so treat this number as a ceiling for comparison purposes, not a guarantee of usable output.
