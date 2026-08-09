---
title: "Earth Curvature Calculator – Visual Drop Over Distance"
seoTitle: "Earth Curvature Calculator | CalculationDesk"
metaDescription: "Calculate how much the Earth's curvature causes a distant object to drop out of sight over a given viewing distance."
category: "science"
subcategory: "physics-calculators"
tags: ["earth curvature calculator", "how much does the earth curve", "curvature drop calculator", "line of sight calculator"]
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
  definition: "This calculator computes the geometric drop caused by Earth's curvature over a given viewing distance — how much a distant point falls below a level line of sight."
  quickAnswer: "At a distance of 10 miles, Earth's curvature causes a geometric drop of about 66.7 feet."
  formulaSummary: "Drop (feet) = (8 x Distance in miles squared) / 12, using the approximation that curvature drop in inches is roughly 8 times the distance in miles squared."
  whenToUse: "Use it to estimate how much of a distant object or landscape is geometrically hidden below the horizon at a given distance, useful for long-range visibility, photography, and surveying discussions."
  whoShouldUse: "Photographers, surveyors, and anyone curious about how Earth's curvature affects long-distance visibility."
  limitations: "This calculates pure geometric curvature drop only — it does not include atmospheric refraction, which bends light slightly and typically makes distant objects appear a bit higher than pure geometry alone would predict, an effect commonly estimated at around 8% of the geometric curvature value."
  keyTakeaways:
    - "Curvature drop grows with the square of distance, not linearly — doubling the viewing distance quadruples the geometric drop, which is why the effect becomes dramatically more significant at long distances than short ones."
    - "This calculates pure geometric curvature only, without atmospheric refraction — real-world visibility is typically somewhat better than the pure geometric calculation suggests, since refraction bends light slightly around the Earth's curve."
    - "The classic '8 inches per mile squared' approximation is a widely used rule of thumb in these calculations, convenient for quick estimates though it's ultimately an approximation of the more exact spherical geometry."
peopleAlsoAsk:
  - "Why does curvature drop grow so much faster at longer distances?"
  - "Does this account for atmospheric refraction?"
  - "Where does the '8 inches per mile squared' rule come from?"
  - "How is curvature drop relevant to photography or surveying?"
examples:
  - title: "10 mile viewing distance"
    inputs: "Distance = 10 miles"
    calculation: "Drop (inches) = 8 x 10^2 = 800 inches. Drop (feet) = 800 / 12 ≈ 66.7 feet"
    result: "Curvature drop ≈ 66.7 feet at 10 miles"
faqs:
  - q: "Why does curvature drop grow so much faster at longer distances?"
    a: "Because the formula scales with distance squared, not distance itself — doubling the distance from 10 to 20 miles doesn't double the drop, it quadruples it (from about 66.7 feet to roughly 266.7 feet). This squared relationship is why curvature is barely noticeable over short distances like a few hundred yards but becomes a very significant factor over tens of miles, which is relevant for things like long-range visibility across open water or flat terrain."
  - q: "Does this account for atmospheric refraction?"
    a: "No — this calculates pure geometric curvature drop only, treating light as traveling in perfectly straight lines. In reality, Earth's atmosphere bends (refracts) light slightly as it travels through air of varying density, which typically makes distant objects appear a bit higher than the pure geometric calculation predicts — commonly estimated at reducing the effective drop by around 8%, though this varies with atmospheric conditions like temperature and humidity."
  - q: "Where does the '8 inches per mile squared' rule come from?"
    a: "This is a well-known approximation derived from Earth's radius and the geometry of a sphere, simplified into an easy-to-remember rule: curvature drop in inches is approximately 8 times the distance in miles, squared. It's accurate enough for most practical purposes at the ranges typically discussed (a few to a few dozen miles), though it's technically an approximation of the more precise trigonometric calculation based on Earth's actual radius."
  - q: "How is curvature drop relevant to photography or surveying?"
    a: "Long-range photographers and surveyors need to account for curvature drop when working across large distances — a distant landmark, coastline, or survey point can be geometrically hidden below the horizon by a significant amount at ranges of many miles, even before accounting for terrain or obstructions. Understanding this effect helps set realistic expectations for what should actually be visible at a given distance and elevation."
references:
  - "https://en.wikipedia.org/wiki/Horizon"
formulaDescription: "The calculator uses the common approximation that curvature drop in inches equals roughly 8 times the square of the distance in miles, then divides by 12 to convert the result into feet. This approximation is derived from the geometry of a sphere the size of Earth, simplified into an easy-to-apply formula that's accurate enough for typical viewing-distance calculations."
variablesExplained:
  - name: "Distance"
    description: "The viewing distance to the point of interest, in miles."
stepByStep: "Enter a viewing distance in miles. The calculator applies the standard curvature approximation (8 inches per mile squared) and converts the result into feet to show the geometric drop at that distance."
realWorldUses: "This is used by photographers and enthusiasts discussing long-range visibility across open landscapes or water, by surveyors accounting for curvature in long-baseline measurements, and generally by anyone curious about how much of a distant object is geometrically obscured by Earth's curvature at a given range."
commonMistakes:
  - "Treating the calculated geometric drop as the complete real-world visibility picture, when atmospheric refraction typically makes distant objects appear somewhat higher than pure geometry alone predicts."
  - "Assuming curvature drop scales linearly with distance, when it actually scales with the square of distance — a mistake that significantly underestimates the effect at longer ranges."
---

# Earth Curvature Calculator

Enter a viewing distance, and this calculator computes the geometric drop caused by Earth's curvature at that distance.

## Formula

**Drop (feet) = (8 × Distance in miles²) ÷ 12**, using the standard approximation that curvature drop in inches is roughly 8 times the squared distance in miles.

At 10 miles: drop = (8 × 10²) ÷ 12 = 800 ÷ 12 ≈ 66.7 feet.

## Why the effect grows so quickly with distance

Because the formula scales with distance squared, doubling the viewing distance quadruples the curvature drop rather than doubling it — going from 10 to 20 miles takes the drop from about 66.7 feet to roughly 266.7 feet. This squared relationship is why curvature barely registers over short distances but becomes a dominant factor over long ones, like visibility across open water or flat terrain.

## What this doesn't include: atmospheric refraction

This calculates pure geometric curvature, treating light as traveling in perfectly straight lines. In reality, Earth's atmosphere bends light slightly as it passes through air of varying density, which typically makes distant objects appear somewhat higher than the pure geometric calculation predicts — a commonly cited estimate reduces the effective drop by roughly 8%, though the exact amount varies with atmospheric conditions.

## Where the "8 inches per mile squared" rule comes from

This is a well-established approximation derived from Earth's actual radius and spherical geometry, simplified into an easy-to-remember rule of thumb. It's accurate enough for the typical few-to-several-dozen-mile ranges these calculations usually cover, though it's technically a simplification of the more exact trigonometric geometry.
