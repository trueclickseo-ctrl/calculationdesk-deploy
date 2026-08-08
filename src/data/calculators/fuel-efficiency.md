---
title: "Fuel Efficiency Converter - MPG, L/100km & km/L"
seoTitle: "Fuel Efficiency Converter - Convert MPG, L/100km, km/L | CalculationDesk"
metaDescription: "Free online fuel efficiency converter. Convert between US MPG, UK MPG, liters per 100 km, and km/L. Explains the reciprocal formula and US vs UK gallon difference."
category: "conversion"
subcategory: "fuel-converters"
tags: ["fuel efficiency converter", "mpg to l/100km", "l/100km to mpg", "km/l to mpg", "US MPG UK MPG difference"]
priority: "high"
importance: 8
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
seoPriority:
  tier: 1
  reason: "Moderate search volume: mpg to l/100km, fuel efficiency"
aiSummary:
  definition: "The Fuel Efficiency Converter converts between US miles per gallon (US MPG), UK miles per gallon (UK MPG), liters per 100 kilometers (L/100km), and kilometers per liter (km/L) using reciprocal formulas through an L/100km base."
  quickAnswer: "25 US MPG = 9.41 L/100km = 10.63 km/L = 30.03 UK MPG. Formula: US MPG to L/100km: divide 235.215 by US MPG. L/100km to US MPG: divide 235.215 by L/100km."
  formulaSummary: "US MPG to L/100km: L/100km = 235.214583 / US MPG | UK MPG to L/100km: L/100km = 282.4809363 / UK MPG | km/L to L/100km: L/100km = 100 / km/L | Reverse: same divisor (these are reciprocal relationships)"
  whenToUse: "Use when comparing fuel economy of cars from different countries, calculating fuel cost for road trips, or understanding efficiency ratings on rental or imported vehicles."
  whoShouldUse: "Car buyers comparing international models, travelers renting vehicles abroad, fleet managers, and anyone comparing efficiency ratings expressed in different units."
  limitations: "Fuel efficiency ratings are based on standardized tests that may not reflect real-world driving. This converter translates rated values between units but does not predict actual fuel use."
  keyTakeaways:
 - "25 US MPG = 9.41 L/100km — the calculator's default example, verified exactly."
 - "US MPG and UK MPG use different gallon sizes — 25 US MPG equals approximately 30 UK MPG for the same vehicle."
 - "L/100km and MPG are inverse measures: higher L/100km = more fuel used; higher MPG = less fuel used."
 - "Conversion is NOT a simple multiply — it uses a reciprocal formula through L/100km."
examples:
  - title: "Default Example: 25 US MPG to L/100km"
 inputs: "25 US MPG"
 calculation: "235.214583 / 25 = 9.40858 L/100km"
 result: "25 US MPG = 9.41 L/100km"
  - title: "European Car: 6.5 L/100km to US MPG"
 inputs: "6.5 L/100km"
 calculation: "235.214583 / 6.5 = 36.19 US MPG"
 result: "6.5 L/100km = 36.19 US MPG"
  - title: "Efficient Hybrid: 50 US MPG to L/100km and km/L"
 inputs: "50 US MPG"
 calculation: "L/100km: 235.214583 / 50 = 4.704 L/100km. km/L: 100 / 4.704 = 21.26 km/L."
 result: "50 US MPG = 4.70 L/100km = 21.26 km/L"
faqs:
  - q: "Why can't I just multiply by a simple factor to convert MPG to L/100km?"
 a: "Because MPG and L/100km are inverse measures — one measures how far you go per unit of fuel, the other measures how much fuel you use per unit of distance. More MPG means less fuel per kilometer. More L/100km also means more fuel per kilometer. When a quantity appears in the denominator of one measure and the numerator of the other, you cannot convert with a simple linear factor. You must use the reciprocal relationship: L/100km = 235.214583 / MPG."
  - q: "Why are US MPG and UK MPG different for the same vehicle?"
 a: "The US and UK use differently sized gallons. The US liquid gallon = 3.785411784 liters. The UK Imperial gallon = 4.54609188 liters (about 20% larger). A car consuming exactly 1 gallon to travel 30 miles uses 3.785 liters for 30 miles in the US, or 4.546 liters for 30 miles in the UK. The US MPG is therefore smaller for the same physical fuel consumption. The conversion factor constants (235.215 for US, 282.481 for UK) encode this gallon size difference."
  - q: "Which is better: higher MPG or lower L/100km?"
 a: "Higher MPG means more distance per unit of fuel — better efficiency. Lower L/100km means less fuel needed per 100 km — also better efficiency. They measure the same thing in opposite directions. A car getting 40 US MPG (great) uses 5.88 L/100km (also great). A gas-guzzler at 15 MPG uses 15.68 L/100km."
  - q: "What is the L/100km constant 235.214583?"
 a: "This constant comes from the unit definitions. One US mile = 1.609344 km. One US gallon = 3.785411784 L. Converting MPG to L/100km: (100 km per segment) x (3.785411784 L/gallon) / (1.609344 km/mile) = 235.214583. So 235.215 / MPG gives L per 100 km. The UK constant 282.481 uses the same logic with 4.54609188 L for the Imperial gallon."
  - q: "How do I estimate fuel cost for a road trip?"
 a: "First use this converter to find your car's L/100km rating. Then: Fuel Cost = (Distance in km / 100) x L/100km x Price per liter. For example, a 500 km trip with a car rated at 8 L/100km and fuel at 1.70 per liter: (500/100) x 8 x 1.70 = 5 x 8 x 1.70 = 68 in fuel cost. For miles and US gallons: Fuel Cost = (Distance in miles / MPG) x Price per gallon."
references:
  - "https://www.fueleconomy.gov"
  - "https://www.nist.gov/pml/weights-and-measures/si-units-volume"
---

### Why Fuel Efficiency Conversion Is Different

Most unit conversions are simple multiplications: multiply pounds by 0.4536 to get kilograms. Fuel efficiency is different. Miles per gallon (MPG) and liters per 100 kilometers (L/100km) are inverse measures — one is distance traveled per unit of fuel, the other is fuel consumed per unit of distance. They point in opposite directions.

A car that gets 50 MPG is very efficient. A car that consumes 4.7 L/100km is also very efficient. These turn out to be the same vehicle. But you cannot find one from the other by multiplying by a simple number. You must use a reciprocal formula.

### The Four Units

**US Miles per Gallon (US MPG)** is the standard efficiency rating in the United States. The US gallon = 3.785411784 liters. A typical compact car gets 30-35 US MPG; large trucks or SUVs get 15-22 US MPG; hybrid and electric vehicles might show 50+ MPG equivalent.

**UK Miles per Gallon (UK MPG)** is used in the United Kingdom. The Imperial (UK) gallon = 4.54609188 liters — about 20% larger than the US gallon. This means UK MPG figures are always about 20% higher than US MPG figures for the same physical vehicle. A car rated 40 US MPG is approximately 48 UK MPG.

**Liters per 100 km (L/100km)** is the European and Australian standard. Lower numbers mean better efficiency. A compact sedan might be rated 6-7 L/100km; a luxury SUV might use 10-12 L/100km; a hybrid could achieve 4.5 L/100km or less.

**Kilometers per liter (km/L)** is used in some Asian markets. Higher numbers mean better efficiency. 15 km/L is good fuel economy; 8 km/L is average.

### The Conversion Formulas

All conversions go through L/100km as an intermediate base:

**US MPG to L/100km:** L/100km = 235.214583 / US MPG
**UK MPG to L/100km:** L/100km = 282.4809363 / UK MPG
**km/L to L/100km:** L/100km = 100 / km/L

The reverse conversions use the same formulas (since they're reciprocal relationships):
**L/100km to US MPG:** US MPG = 235.214583 / L/100km
**L/100km to UK MPG:** UK MPG = 282.4809363 / L/100km
**L/100km to km/L:** km/L = 100 / L/100km

### Worked Examples

**Default example — 25 US MPG to L/100km:**
235.214583 / 25 = 9.40858 L/100km. The calculator displays 9.4086, which matches.

**European compact — 6.5 L/100km to US MPG:**
235.214583 / 6.5 = 36.19 US MPG.

**Hybrid — 50 US MPG to full table:**
L/100km: 235.214583 / 50 = 4.70 L/100km
km/L: 100 / 4.70 = 21.28 km/L
UK MPG: 282.481 / 4.70 = 60.1 UK MPG

### Where the Constants Come From

The constant 235.214583 encodes the relationship between miles, gallons, and kilometers. One US mile = 1.609344 km. One US gallon = 3.785411784 liters. For a car driving exactly 1 US gallon per mile: 3.785411784 L per 1.609344 km = 2.35215 L per km = 235.215 L per 100 km. Dividing 235.215 by any MPG value converts it to L/100km.

The UK constant 282.4809363 is the same calculation using the Imperial gallon (4.54609188 liters): 4.54609188 / 1.609344 x 100 = 282.481.

### Practical Application

When comparing car specifications from different countries, always confirm which MPG standard is used. A UK car brochure quoting 55 MPG would be only about 46 US MPG if the vehicle were sold in America. When renting a car in Europe, the L/100km figure on the spec sheet is what matters for estimating fuel costs.
