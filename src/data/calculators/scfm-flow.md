---
title: "SCFM Calculator – Convert ACFM to Standard Flow"
seoTitle: "ACFM to SCFM Calculator | CalculationDesk"
metaDescription: "Convert actual cubic feet per minute (ACFM) to standard cubic feet per minute (SCFM), correcting for pressure and temperature."
category: "engineering"
subcategory: "hvac-calculators"
tags: ["scfm calculator", "acfm to scfm converter", "standard cubic feet per minute", "compressed air flow calculator"]
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
  definition: "This calculator converts a gas flow rate measured under actual conditions (ACFM) into standard cubic feet per minute (SCFM), correcting for the actual pressure and temperature relative to standard reference conditions."
  quickAnswer: "100 ACFM at 100 psig and 100°F converts to approximately 724.7 SCFM."
  formulaSummary: "SCFM = ACFM x ((Actual pressure + 14.696) / 14.696) x (519.67 / (Actual temperature + 459.67))."
  whenToUse: "Use it when comparing or specifying compressed air or gas system capacity, since equipment ratings and flow measurements are typically standardized to SCFM rather than actual site conditions."
  whoShouldUse: "HVAC and compressed air system technicians and engineers sizing equipment or comparing flow measurements taken under different conditions."
  limitations: "This uses standard reference conditions of 14.696 psia and 60°F (519.67°R), the most common industrial standard — some industries or specific equipment manufacturers use slightly different standard reference conditions, which would require a different conversion."
  keyTakeaways:
    - "SCFM corrects a real, measured flow rate to a common reference point (standard temperature and pressure), making flow measurements taken under different real-world conditions directly comparable to each other."
    - "Higher actual pressure increases the SCFM value relative to ACFM, because compressed gas at higher pressure contains more actual gas molecules in the same volume — the pressure correction factor scales up accordingly."
    - "Higher actual temperature decreases the SCFM value relative to ACFM, since gas expands and becomes less dense at higher temperatures — fewer molecules occupy the same measured volume, so the temperature correction factor scales down."
peopleAlsoAsk:
  - "What's the difference between ACFM and SCFM?"
  - "Why does SCFM matter for compressed air equipment?"
  - "What are the standard reference conditions used in this calculation?"
  - "Why does higher pressure increase the SCFM value?"
examples:
  - title: "100 ACFM at 100 psig, 100°F"
    inputs: "ACFM = 100, Pressure = 100 psig, Temperature = 100°F"
    calculation: "SCFM = 100 x ((100 + 14.696)/14.696) x (519.67/(100+459.67)) = 100 x 7.8047 x 0.9285 ≈ 724.7"
    result: "SCFM ≈ 724.7"
faqs:
  - q: "What's the difference between ACFM and SCFM?"
    a: "ACFM (Actual Cubic Feet per Minute) measures gas flow under the real, actual conditions of pressure and temperature at the point of measurement. SCFM (Standard Cubic Feet per Minute) corrects that measurement to a standardized reference pressure and temperature, so flow rates measured at different pressures or temperatures can be directly and fairly compared, regardless of the specific conditions under which each was actually measured."
  - q: "Why does SCFM matter for compressed air equipment?"
    a: "Compressed air equipment — compressors, dryers, filters — is typically rated and specified in SCFM by manufacturers, since this gives a consistent, apples-to-apples comparison independent of the actual operating pressure and temperature at any specific installation site. Converting a real, measured ACFM flow to SCFM is necessary to properly compare it against equipment specifications or system design requirements."
  - q: "What are the standard reference conditions used in this calculation?"
    a: "This calculator uses 14.696 psia (standard atmospheric pressure) and 60°F (519.67°R) as the standard reference point — the most widely used industrial convention. Some industries or specific manufacturers define standard conditions slightly differently (a different reference temperature, for instance), so it's worth confirming which standard a particular specification or piece of equipment documentation is actually using."
  - q: "Why does higher pressure increase the SCFM value?"
    a: "Gas at higher pressure is more compressed, meaning more actual gas molecules occupy the same measured volume compared to gas at standard pressure. Correcting to standard pressure effectively 'expands' that compressed gas mathematically to figure out what volume it would occupy at standard conditions — and because it contains more molecules, that equivalent standard volume is larger than the original actual measured volume, which is why the SCFM figure comes out higher than the raw ACFM number when pressure is elevated above standard."
references:
  - "https://www.energy.gov/eere/amo/articles/compressed-air-tip-sheet"
formulaDescription: "The calculator applies two separate correction factors to the measured ACFM value. The pressure correction factor — actual absolute pressure divided by standard atmospheric pressure — accounts for how much more gas is packed into the same volume at higher pressure. The temperature correction factor — standard absolute temperature divided by actual absolute temperature — accounts for how gas density changes with temperature. Multiplying ACFM by both factors together produces the standardized SCFM value."
variablesExplained:
  - name: "Flow rate (ACFM)"
    description: "The gas flow rate measured under actual site conditions, in cubic feet per minute."
  - name: "Pressure"
    description: "The actual gauge pressure at the point of measurement, in psig."
  - name: "Temperature"
    description: "The actual temperature at the point of measurement, in degrees Fahrenheit."
stepByStep: "Enter the actual flow rate (ACFM), gauge pressure, and temperature at the measurement point. The calculator applies pressure and temperature correction factors to compute the equivalent standard flow rate (SCFM)."
realWorldUses: "HVAC technicians and compressed air system engineers use this conversion to compare real-world flow measurements against equipment SCFM ratings, size compressors and air treatment equipment correctly, and troubleshoot systems where actual operating conditions differ from standard reference conditions."
commonMistakes:
  - "Comparing an ACFM measurement directly against an SCFM equipment rating without converting first, which can lead to significantly oversizing or undersizing equipment since the two aren't the same measurement."
  - "Assuming all industries use identical standard reference conditions, when some contexts define 'standard' pressure and temperature slightly differently, requiring a different conversion basis."
---

# SCFM Calculator

Enter an actual flow rate along with the pressure and temperature at the point of measurement, and this calculator converts it to standard cubic feet per minute (SCFM).

## Formula

**SCFM = ACFM × ((Pressure + 14.696) ÷ 14.696) × (519.67 ÷ (Temperature + 459.67))**, using standard reference conditions of 14.696 psia and 60°F (519.67°R).

For 100 ACFM at 100 psig and 100°F: SCFM = 100 × 7.8047 × 0.9285 ≈ 724.7.

## Why ACFM and SCFM aren't the same number

ACFM measures flow under whatever real pressure and temperature conditions exist at the measurement point, while SCFM corrects that measurement to a fixed standard reference — making flow readings taken under different conditions directly comparable. Equipment like compressors, dryers, and filters is typically rated in SCFM specifically so that manufacturer specifications mean the same thing regardless of where or under what conditions the equipment is actually installed.

## Why pressure and temperature move SCFM in opposite directions

Higher actual pressure packs more gas molecules into the same measured volume, so correcting to standard pressure effectively expands that gas mathematically, producing a larger equivalent standard volume — which is why SCFM comes out higher than ACFM at elevated pressure. Higher actual temperature has the opposite effect: warmer gas is less dense, meaning fewer molecules occupy the measured volume, so the temperature correction pulls SCFM down relative to a colder reading at the same ACFM.

## A note on standard conditions

This calculator uses 14.696 psia and 60°F, the most widely used industrial reference point — but some industries or manufacturers define "standard" conditions slightly differently. It's worth double-checking which reference a specific spec sheet or system design is actually using before comparing SCFM figures across sources.
