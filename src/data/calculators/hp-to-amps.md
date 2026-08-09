---
title: "HP to Amps Calculator – Motor Horsepower to Current"
seoTitle: "HP to Amps Calculator | CalculationDesk"
metaDescription: "Convert motor horsepower to electrical current draw in amps, accounting for voltage and efficiency."
category: "engineering"
subcategory: "electrical-calculators"
tags: ["hp to amps calculator", "horsepower to amps", "motor amperage calculator", "motor current draw"]
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
  definition: "This calculator converts a motor's mechanical horsepower rating into the electrical current it draws, based on operating voltage and efficiency."
  quickAnswer: "A 1 HP motor running at 120 volts with 80% efficiency draws approximately 7.79 amps."
  formulaSummary: "Amps = (Horsepower x 746) / (Volts x Efficiency)."
  whenToUse: "Use it when sizing wiring, breakers, or a power supply for an electric motor and you have its horsepower rating but need the expected current draw."
  whoShouldUse: "Electricians and technicians wiring or troubleshooting single-phase electric motors, such as those in pumps, compressors, and shop tools."
  limitations: "This gives full-load running current for a resistive-equivalent estimate — actual motor inrush (starting) current is typically several times higher than running current, and this doesn't account for power factor in AC induction motors, which further affects real current draw."
  keyTakeaways:
    - "746 watts equals exactly one mechanical horsepower, which is the conversion constant at the core of this formula."
    - "Motor efficiency matters because not all electrical input power is converted into mechanical output — some is lost as heat, so a less efficient motor draws more current for the same horsepower rating."
    - "This calculates steady running current, not the much higher inrush current motors briefly draw at startup, which is critical to account for separately when sizing breakers or wiring."
peopleAlsoAsk:
  - "How many watts is 1 horsepower?"
  - "Why does motor efficiency affect current draw?"
  - "What's the difference between running current and starting current?"
  - "Does this formula work for three-phase motors?"
examples:
  - title: "1 HP motor, 120V, 80% efficiency"
    inputs: "Horsepower = 1 HP, Voltage = 120V, Efficiency = 80%"
    calculation: "Amps = (1 x 746) / (120 x 0.80) = 746 / 96 ≈ 7.77"
    result: "Current Demand ≈ 7.77 Amps"
faqs:
  - q: "How many watts is 1 horsepower?"
    a: "Exactly 746 electrical watts equals 1 mechanical horsepower — this is a fixed conversion constant, not an approximation, and it's the foundation of converting any horsepower rating into an equivalent electrical power figure before working out current draw."
  - q: "Why does motor efficiency affect current draw?"
    a: "A motor's horsepower rating describes its mechanical output — the useful work it actually performs — but not every watt of electrical input becomes mechanical output; some is lost as heat in the windings and through friction. A motor rated at 80% efficiency needs to draw more electrical input power (and therefore more current) than a 95%-efficient motor to deliver the same horsepower of mechanical output."
  - q: "What's the difference between running current and starting current?"
    a: "Running current, which this calculator estimates, is the steady current a motor draws once it's up to speed and operating normally. Starting (or inrush) current is what the motor draws for a brief moment when first switched on, and it's typically 3 to 8 times higher than running current for standard induction motors — a critical figure to account for separately when sizing breakers, since undersizing for inrush causes nuisance trips."
  - q: "Does this formula work for three-phase motors?"
    a: "This simplified formula is intended for single-phase motor calculations. Three-phase motor current draw follows a different formula that includes a factor of the square root of 3 and typically accounts for power factor explicitly, since three-phase power delivery works differently from single-phase — using this single-phase formula for a three-phase motor will give an incorrect result."
references:
  - "https://www.nema.org/standards/view/motors-and-generators"
formulaDescription: "The calculator first converts horsepower to watts by multiplying by 746, the fixed conversion constant between mechanical horsepower and electrical watts. It then divides that wattage by the product of voltage and efficiency (expressed as a decimal) — dividing by voltage converts power to current, and dividing by efficiency accounts for the fact that some electrical input is lost rather than converted to mechanical output."
variablesExplained:
  - name: "Horsepower"
    description: "The motor's rated mechanical output, in horsepower."
  - name: "Voltage"
    description: "The motor's operating voltage, in volts."
  - name: "Efficiency"
    description: "The motor's efficiency rating, as a percentage — how much of the electrical input power is converted to mechanical output."
stepByStep: "Enter the motor's horsepower rating, operating voltage, and efficiency percentage. The calculator converts horsepower to watts, then divides by voltage and efficiency to return the estimated current draw in amps."
realWorldUses: "Electricians and technicians use this calculation to select appropriately sized wiring and circuit breakers for pumps, compressors, and other electric motor loads, and to sanity-check nameplate current ratings against expected values."
commonMistakes:
  - "Sizing wiring or breakers based only on this running-current estimate without accounting for a motor's much higher starting current, which can trip breakers or overheat undersized wiring during startup."
  - "Assuming 100% efficiency (omitting the efficiency factor) when a real motor's nameplate efficiency is meaningfully lower, which understates the actual current draw."
---

# HP to Amps Calculator

Enter a motor's horsepower, operating voltage, and efficiency, and this calculator returns its estimated running current in amps.

## Formula

**Amps = (Horsepower × 746) ÷ (Volts × Efficiency)**

For a 1 HP motor at 120V and 80% efficiency: Amps = (1 × 746) ÷ (120 × 0.80) = 746 ÷ 96 ≈ 7.77 Amps.

## Where 746 comes from

746 watts equals exactly one mechanical horsepower — a fixed, universally used conversion constant, not a rounded approximation. Multiplying horsepower by 746 converts a motor's mechanical output rating into the equivalent electrical power figure, which is the necessary first step before current can be worked out from voltage.

## Why efficiency isn't optional in this formula

A motor's horsepower rating reflects mechanical output, but electrical input always has to be somewhat higher, since some energy is inevitably lost to heat in the windings and friction in the bearings. Dividing by efficiency (as a decimal) scales the wattage back up to reflect the actual electrical power the motor draws to deliver its rated mechanical output — skip this step and the current estimate will be too low, sometimes significantly so for lower-efficiency motors.
