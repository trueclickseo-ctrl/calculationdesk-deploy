---
title: "Water Density Calculator – Temperature to kg/m³"
seoTitle: "Water Density Calculator | CalculationDesk"
metaDescription: "Calculate the density of liquid water at a given temperature, using the Kell equation."
category: "chemistry"
subcategory: "physical-properties-calculators"
tags: ["water density calculator", "density of water at temperature", "kell equation calculator", "water density table"]
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
  definition: "This calculator finds the density of liquid water at a given temperature, using the Kell equation, a well-established empirical formula fit to measured water density data."
  quickAnswer: "At 20°C, water has a density of approximately 998.20 kg/m³. At its maximum, near 4°C, water reaches almost exactly 1,000 kg/m³."
  formulaSummary: "Density (kg/m3) = (999.83952 + 16.945176T - 7.9870401e-3T^2 - 46.170461e-6T^3 + 105.56302e-9T^4 - 280.54253e-12T^5) / (1 + 16.879850e-3T), where T is temperature in degrees Celsius."
  whenToUse: "Use it when you need the precise density of pure liquid water at a specific temperature, for lab calculations, engineering design, or converting between volume and mass of water."
  whoShouldUse: "Chemistry and physics students, lab technicians performing volumetric measurements, and engineers working with water-based systems where temperature-dependent density matters."
  limitations: "This formula applies to pure liquid water at standard atmospheric pressure between 0°C and 100°C — it doesn't account for dissolved solids (like salinity), pressure other than 1 atmosphere, or water in its solid or vapor phase."
  keyTakeaways:
    - "Water's density doesn't decrease steadily as temperature drops — it actually peaks near 3.98°C, then decreases again as the water approaches freezing, which is why ice floats and why deep lakes stratify with the densest water near the bottom in winter."
    - "The difference between water's density at 0°C (about 999.84 kg/m³) and at 100°C (about 958.4 kg/m³) is roughly 4%, which is significant enough to matter in precision volumetric lab work and engineering calculations."
    - "The commonly cited round figure of 1,000 kg/m³ for water density is only exactly true very close to 4°C — at other common temperatures like 20°C or 25°C, the actual density is measurably lower."
peopleAlsoAsk:
  - "Why is water densest at 4°C instead of at freezing?"
  - "How much does water density change between 0°C and 100°C?"
  - "Does dissolved salt affect water density?"
  - "Why does water density matter for lab measurements?"
examples:
  - title: "Water at 20°C"
    inputs: "Temperature = 20°C"
    calculation: "Applying the Kell equation numerator and denominator at T=20 gives density ≈ 998.20"
    result: "Density ≈ 998.20 kg/m³"
faqs:
  - q: "Why is water densest at 4°C instead of at freezing?"
    a: "As water cools toward freezing, two competing effects are at play: thermal contraction (which would normally increase density as temperature drops) and the increasing formation of hydrogen-bonded, more open molecular structures that precede ice formation (which decreases density). Below about 3.98°C, the hydrogen-bonding effect wins out, causing water to actually expand slightly as it approaches 0°C — which is why maximum density occurs at 4°C rather than at the freezing point itself."
  - q: "How much does water density change between 0°C and 100°C?"
    a: "Water density decreases from about 999.84 kg/m³ at 0°C to roughly 958.4 kg/m³ at 100°C — a change of about 4.1%. While that might sound small, it's large enough to matter in precision volumetric measurements, calibration of lab glassware, and engineering applications like water-based cooling systems where temperature swings are significant."
  - q: "Does dissolved salt affect water density?"
    a: "Yes, significantly — this calculator applies to pure water only. Seawater, with roughly 3.5% dissolved salts, is meaningfully denser than pure fresh water at the same temperature (around 1,025 kg/m³ near the surface versus roughly 997–1,000 kg/m³ for fresh water in typical ranges), which is a large part of why objects float more easily in the ocean than in a freshwater lake or pool."
  - q: "Why does water density matter for lab measurements?"
    a: "Precision volumetric work — like calibrating pipettes or preparing exact molar solutions — often relies on converting a measured mass of water into a volume, or vice versa, and using a generic 1,000 kg/m³ figure instead of the actual temperature-corrected density can introduce small but meaningful errors, particularly in analytical chemistry contexts where accuracy to several decimal places matters."
references:
  - "https://www.nist.gov/pml/density-water-particular-temperatures"
formulaDescription: "The Kell equation is an empirical polynomial fit, developed by researchers analyzing precise experimental water density measurements across the 0-100°C range. The numerator is a fifth-order polynomial in temperature, and the denominator is a linear correction term — together, the ratio reproduces measured water density to within a very small fraction of a percent across the full liquid range."
variablesExplained:
  - name: "Temperature"
    description: "The temperature of the liquid water, in degrees Celsius."
stepByStep: "Enter a water temperature in degrees Celsius. The calculator applies the Kell equation, a polynomial formula fit to precise experimental measurements, to return water's density at that temperature in kilograms per cubic meter."
realWorldUses: "Lab technicians use temperature-corrected water density for precision volumetric measurements and pipette calibration, and engineers use it when designing systems where water's mass and volume both matter across a range of operating temperatures, such as cooling loops and hydraulic systems."
commonMistakes:
  - "Assuming water density is a flat 1,000 kg/m³ at all temperatures, when it actually varies measurably across the 0-100°C range and peaks near 4°C rather than at that round number."
  - "Applying this pure-water formula to seawater, brine, or other water-based solutions with dissolved solids, which have meaningfully different densities than pure water."
---

# Water Density Calculator

Enter a water temperature, and this calculator returns the density of pure liquid water at that temperature, using the Kell equation — an empirical formula fit to precise experimental measurements.

## Formula

**Density (kg/m³) = (999.83952 + 16.945176T − 7.9870401×10⁻³T² − 46.170461×10⁻⁶T³ + 105.56302×10⁻⁹T⁴ − 280.54253×10⁻¹²T⁵) ÷ (1 + 16.879850×10⁻³T)**, where T is temperature in °C.

At 20°C: Density ≈ 998.20 kg/m³.

## Water's odd behavior near freezing

Most liquids simply get denser as they cool, but water breaks that pattern below about 4°C. As it approaches freezing, water molecules increasingly arrange into the more open, hydrogen-bonded structure that precedes ice formation — a structure that takes up more space than the liquid's typical packing. That effect outweighs ordinary thermal contraction below roughly 3.98°C, which is why water actually reaches its maximum density at 4°C rather than at the freezing point itself, and why ice, being less dense than liquid water, floats.

## Why "1,000 kg/m³" is only approximately true

It's common shorthand to treat water as exactly 1,000 kg/m³, and that figure is nearly exact right around 4°C. But density drops measurably away from that point — down to about 998.2 kg/m³ at 20°C (room temperature) and roughly 958.4 kg/m³ at 100°C (boiling). For everyday estimates the round number is fine, but for precision lab work or engineering calculations spanning a temperature range, the actual temperature-corrected value can matter.
