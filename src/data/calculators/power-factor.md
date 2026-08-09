---
title: "Power Factor Calculator – Real Power to Apparent Power Ratio"
seoTitle: "Power Factor Calculator | CalculationDesk"
metaDescription: "Calculate electrical power factor from real power (kW) and apparent power (kVA) to assess system efficiency."
category: "engineering"
subcategory: "electrical-calculators"
tags: ["power factor calculator", "kw to kva power factor", "electrical efficiency calculator", "pf calculator"]
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
  definition: "This calculator finds the power factor of an electrical system — the ratio of real power (used for work) to apparent power (total demand) — from measured kW and kVA values."
  quickAnswer: "A system drawing 8 kW of real power and 10 kVA of apparent power has a power factor of 0.8."
  formulaSummary: "Power Factor = Real Power (kW) / Apparent Power (kVA)."
  whenToUse: "Use it when you have both real power and apparent power measurements from a meter or equipment nameplate and want to assess how efficiently a facility or piece of equipment is using its electrical supply."
  whoShouldUse: "Facility managers, electricians, and electrical engineers evaluating equipment efficiency or working to reduce utility power factor penalties."
  limitations: "This calculates the overall power factor from measured kW and kVA — it doesn't distinguish between the two underlying causes of low power factor (phase displacement from reactive loads versus current distortion from non-linear loads), which matters for choosing the correct correction method."
  keyTakeaways:
    - "A power factor of 1.0 is ideal, meaning all supplied electrical power is converted into useful work with none wasted circulating as reactive power."
    - "Inductive loads like motors, transformers, and fluorescent lighting ballasts typically pull power factor below 1.0, and utilities often charge commercial customers penalties for low power factor because it forces them to deliver more current than the useful work performed would otherwise require."
    - "Power factor correction, commonly done by adding capacitor banks to offset inductive reactance, can bring a facility's power factor closer to 1.0 and reduce or eliminate utility penalties."
peopleAlsoAsk:
  - "What is considered a good power factor?"
  - "Why do utilities penalize low power factor?"
  - "How can power factor be corrected?"
  - "What causes a low power factor?"
examples:
  - title: "8 kW real power, 10 kVA apparent power"
    inputs: "Real Power = 8 kW, Apparent Power = 10 kVA"
    calculation: "PF = 8 / 10 = 0.8"
    result: "Power Factor = 0.8"
faqs:
  - q: "What is considered a good power factor?"
    a: "A power factor of 0.95 or higher is generally considered good in commercial and industrial settings, with 1.0 being the theoretical ideal where all apparent power is converted to useful work. Many utilities set a penalty threshold around 0.90 to 0.95 — facilities operating below that level often face additional charges on their electric bill."
  - q: "Why do utilities penalize low power factor?"
    a: "A low power factor means a facility is drawing more current from the grid than the useful work it performs would otherwise require, since some of that current is circulating as reactive power rather than doing productive work. That extra current still requires the utility to size and maintain larger generation, transmission, and distribution equipment, which is the basis for the penalty charges some utilities apply to low-power-factor commercial and industrial customers."
  - q: "How can power factor be corrected?"
    a: "The most common method is installing capacitor banks, which supply reactive power locally to offset the reactive power drawn by inductive loads like motors and transformers, reducing the total current the utility has to supply for the same amount of real work. Facilities with severely fluctuating or harmonic-heavy loads sometimes use active power factor correction equipment instead, which responds dynamically rather than providing a fixed capacitive offset."
  - q: "What causes a low power factor?"
    a: "Inductive loads are the most common cause — electric motors, transformers, and fluorescent or HID lighting ballasts all draw reactive power in addition to real power, which pulls the power factor below 1.0. Non-linear loads like variable-frequency drives and electronic power supplies can also distort the current waveform in ways that further reduce the effective power factor."
references:
  - "https://www.energy.gov/eere/femp/articles/power-factor-and-electricity-savings"
formulaDescription: "Power factor is simply the ratio of real power — the portion of electrical power actually converted into useful work — to apparent power, the total electrical power the system demands including any reactive component. Dividing the kW reading by the kVA reading directly yields this ratio, always a value between 0 and 1."
variablesExplained:
  - name: "Real Power"
    description: "The portion of electrical power actually converted into useful work, in kilowatts (kW)."
  - name: "Apparent Power"
    description: "The total electrical power the system draws, including both real and reactive components, in kilovolt-amps (kVA)."
stepByStep: "Enter the real power (kW) and apparent power (kVA) readings for a circuit or facility. The calculator divides real power by apparent power to return the power factor."
realWorldUses: "Facility managers use power factor calculations to check whether they're at risk of utility penalty charges, and electrical engineers use it to size power factor correction equipment like capacitor banks needed to bring a facility's power factor up to an acceptable level."
commonMistakes:
  - "Confusing real power (kW) with apparent power (kVA) on a utility bill or meter readout, which produces a power factor calculation that's inverted or otherwise wrong."
  - "Assuming power factor issues can only be fixed by reducing electrical load, when in most cases the more practical fix is adding power factor correction equipment rather than reducing actual power consumption."
---

# Power Factor Calculator

Enter a system's real power (kW) and apparent power (kVA), and this calculator returns the power factor — a measure of how efficiently that electrical supply is being used.

## Formula

**Power Factor = Real Power (kW) ÷ Apparent Power (kVA)**

For 8 kW of real power and 10 kVA of apparent power: PF = 8 ÷ 10 = 0.8.

## What power factor actually measures

Real power is the portion of electricity that does useful work — running a motor, lighting a bulb, heating an element. Apparent power is the total electrical demand a system places on the supply, including any reactive power that circulates without performing work. Power factor is simply the ratio between the two, so a value of 1.0 means every bit of supplied power is being put to use, while a lower value means some capacity is going toward reactive power that the utility still has to generate and deliver but that doesn't accomplish anything useful.

## Why it matters beyond the meter reading

Facilities running a lot of inductive equipment — motors, transformers, older fluorescent ballasts — commonly see power factor drop below 0.9, and many utilities charge commercial and industrial customers a penalty once it falls under a set threshold. The usual fix isn't cutting electrical usage but adding power factor correction equipment, typically capacitor banks, which supply reactive power locally and bring the measured power factor closer to 1.0.
