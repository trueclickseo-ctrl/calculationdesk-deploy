---
title: "Roof Truss Calculator – Rafter Length from Span and Pitch"
seoTitle: "Roof Truss Rafter Calculator | CalculationDesk"
metaDescription: "Calculate rafter length for a symmetrical gable roof truss from building span, pitch, and overhang."
category: "construction"
subcategory: "roofing-calculators"
tags: ["roof truss calculator", "rafter length calculator", "gable roof rafter calculator", "roof pitch to rafter"]
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
  definition: "This calculator finds the rafter length needed for a symmetrical gable roof truss, from the building's span, roof pitch, and overhang."
  quickAnswer: "A 24 ft span with a 4:12 pitch and a 12-inch overhang requires a rafter length of approximately 13.65 feet."
  formulaSummary: "Rafter Length = sqrt((Span/2)^2 + Rise^2) + (Overhang / 12), where Rise = (Span/2) x (Pitch/12)."
  whenToUse: "Use it when framing a standard symmetrical gable roof and need to determine the required rafter length from the building's span and chosen pitch."
  whoShouldUse: "Carpenters, framers, and DIY builders planning gable roof truss construction."
  limitations: "This calculates rafter length for a standard symmetrical gable roof — it doesn't apply directly to more complex roof shapes like hip roofs, roofs with unequal pitches on each side, or roofs with dormers and other intersecting sections."
  keyTakeaways:
    - "Roof pitch is conventionally expressed as inches of rise per 12 inches of horizontal run, so a 4:12 pitch rises 4 inches vertically for every 12 inches it moves horizontally toward the ridge."
    - "Rafter length calculation is a direct application of the Pythagorean theorem — the horizontal run and vertical rise form the two legs of a right triangle, and the rafter itself is the hypotenuse."
    - "Overhang adds directly to the calculated rafter length and needs to be included separately, since it extends the rafter past the point where the roof's rise and run relationship is actually measured (the wall plate)."
peopleAlsoAsk:
  - "How is roof pitch measured and expressed?"
  - "Why is overhang added after the Pythagorean calculation?"
  - "What's a typical roof pitch for different climates?"
  - "Does this work for hip roofs?"
examples:
  - title: "24 ft span, 4:12 pitch, 12in overhang"
    inputs: "Span = 24 ft, Pitch = 4/12, Overhang = 12 in"
    calculation: "Run=12, Rise=12x(4/12)=4, Rafter=sqrt(144+16)+1 = 12.649+1 = 13.65"
    result: "Rafter Length ≈ 13.65 feet"
faqs:
  - q: "How is roof pitch measured and expressed?"
    a: "Roof pitch is conventionally written as a ratio of rise to a fixed 12-inch run, such as 4:12 or 6:12 — meaning the roof rises 4 (or 6) inches vertically for every 12 inches it travels horizontally. Steeper pitches, like 12:12 (a 45-degree angle), shed snow and water more effectively, while shallower pitches, like 3:12, are more common in milder climates or for certain architectural styles."
  - q: "Why is overhang added after the Pythagorean calculation?"
    a: "The core rise-and-run relationship that defines a roof's pitch is measured from the wall plate (where the wall meets the roof) to the ridge — overhang is additional rafter length that extends past that wall plate to create eave protection, and it doesn't follow the same rise-over-run pitch relationship since it's typically framed level or with a small additional drop rather than continuing the roof's full pitch angle outward. That's why it's added as a separate length rather than folded into the Pythagorean calculation itself."
  - q: "What's a typical roof pitch for different climates?"
    a: "Areas with heavy snowfall often use steeper pitches, commonly 8:12 to 12:12 or more, to help snow slide off before it accumulates to damaging weight. Milder or drier climates frequently use shallower pitches, often in the 3:12 to 6:12 range, since snow load isn't a major design concern and a lower pitch typically costs less in materials and labor."
  - q: "Does this work for hip roofs?"
    a: "This calculation is designed for a standard symmetrical gable roof, where each rafter runs from the wall plate straight up to a central ridge. Hip roofs, which slope on all four sides rather than just two, involve additional geometry for hip and jack rafters that this simplified formula doesn't cover — hip roof framing typically requires more specialized rafter tables or software."
references:
  - "https://www.finehomebuilding.com/2016/07/22/roof-framing-basics"
formulaDescription: "The calculation treats half the building span as the horizontal run and the roof's pitch-derived vertical rise as the two legs of a right triangle, applying the Pythagorean theorem to find the rafter's core length as the hypotenuse. The overhang, converted from inches to feet, is then added on separately as additional rafter length extending past the wall plate."
variablesExplained:
  - name: "Span"
    description: "The total width of the building being roofed, in feet."
  - name: "Pitch"
    description: "The roof's steepness, expressed as inches of rise per 12 inches of horizontal run."
  - name: "Overhang"
    description: "The additional rafter length extending past the wall plate to form the roof eave, in inches."
stepByStep: "Enter the building's span, the roof pitch, and the desired overhang. The calculator applies the Pythagorean theorem to the half-span run and pitch-derived rise, then adds the overhang to return the total rafter length."
realWorldUses: "Carpenters and framers use rafter length calculations to determine lumber cut lengths for gable roof trusses, and to verify truss manufacturer specifications match the intended building dimensions and pitch before construction begins."
commonMistakes:
  - "Forgetting to add overhang to the core rafter length calculated from span and pitch, resulting in rafters cut too short to properly cover the building's eaves."
  - "Applying this symmetrical gable roof formula to a more complex roof shape like a hip roof or a roof with unequal pitches, where additional geometry beyond this simplified calculation is needed."
---

# Roof Truss Calculator

Enter the building span, roof pitch, and overhang, and this calculator returns the rafter length needed for a standard symmetrical gable roof.

## Formula

**Rafter Length = √((Span ÷ 2)² + Rise²) + (Overhang ÷ 12)**, where Rise = (Span ÷ 2) × (Pitch ÷ 12)

For a 24 ft span, 4:12 pitch, and 12-inch overhang: Run = 12, Rise = 12 × (4/12) = 4, Rafter = √(144 + 16) + 1 ≈ 13.65 ft.

## The right triangle hiding in every roof

A rafter, half the roof's rise, and half the roof's span form a right triangle — the run and rise are the two legs, and the rafter itself is the hypotenuse. That's the entire geometric basis for this calculation: the Pythagorean theorem, applied to whatever run and rise a given span and pitch produce. It's the same underlying math carpenters have used for centuries, just automated here.

## Why overhang gets tacked on separately

The pitch relationship that defines a roof's rise and run is measured from the wall plate up to the ridge — overhang is extra rafter length beyond that wall plate, added to create the protective eave that keeps water off the walls below. Because overhang doesn't follow the same rise-over-run geometry as the main rafter span, it's simply added on afterward as a flat additional length, converted from inches to feet, rather than folded into the triangle calculation itself.
