---
title: "Pipe Flow Calculator – GPM from Diameter and Velocity"
seoTitle: "Pipe Flow Rate Calculator (GPM) | CalculationDesk"
metaDescription: "Calculate the flow rate in gallons per minute (GPM) through a cylindrical pipe from its diameter and flow velocity."
category: "engineering"
subcategory: "plumbing-calculators"
tags: ["pipe flow calculator", "gpm calculator", "pipe flow rate calculator", "flow velocity to gpm"]
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
  definition: "This calculator computes the flow rate in gallons per minute (GPM) through a cylindrical pipe, based on the pipe's inside diameter and the flow velocity."
  quickAnswer: "A 2-inch diameter pipe with water flowing at 5 feet per second delivers approximately 48.96 GPM."
  formulaSummary: "Flow (GPM) = Velocity (ft/s) x 2.448 x Diameter (in)^2."
  whenToUse: "Use it to size piping for a target flow rate, or to estimate flow rate through an existing pipe given its diameter and known or assumed flow velocity."
  whoShouldUse: "Plumbers, irrigation designers, and engineers sizing pipe systems for a required flow rate."
  limitations: "This formula assumes the pipe is running completely full and calculates flow based on velocity and cross-sectional area alone — it doesn't account for friction losses or pressure drop along pipe length, which affect actual achievable flow in a real system."
  keyTakeaways:
    - "Flow rate scales with the square of pipe diameter, not linearly — doubling a pipe's diameter roughly quadruples its flow capacity at the same velocity, which is why relatively small increases in pipe size can dramatically increase flow capacity."
    - "The 2.448 conversion constant bundles together the geometric relationship between a pipe's circular cross-sectional area and the unit conversions needed to get gallons per minute from feet per second and inches, so it doesn't need to be derived separately each time."
    - "This calculates theoretical flow capacity based on velocity and pipe size alone — actual flow in a real system is also limited by pump capacity, friction losses along the pipe, and elevation changes, none of which this simplified formula accounts for."
peopleAlsoAsk:
  - "Why does pipe diameter have such a big effect on flow rate?"
  - "What is a typical safe flow velocity for water pipes?"
  - "Where does the 2.448 conversion constant come from?"
  - "Does this account for friction losses in long pipe runs?"
examples:
  - title: "2-inch pipe, 5 ft/s velocity"
    inputs: "Diameter = 2 inches, Velocity = 5 ft/s"
    calculation: "Flow = 5 x 2.448 x 2^2 = 5 x 2.448 x 4 = 48.96 GPM"
    result: "Flow rate ≈ 48.96 GPM"
faqs:
  - q: "Why does pipe diameter have such a big effect on flow rate?"
    a: "Because flow rate depends on diameter squared, not diameter directly — a pipe's cross-sectional area (and therefore how much water can pass through at a given velocity) grows with the square of its radius. This is why upsizing from a 2-inch to a 3-inch pipe (a 1.5x increase in diameter) more than doubles flow capacity at the same velocity, roughly a 2.25x increase, rather than the modest 1.5x increase intuition might suggest."
  - q: "What is a typical safe flow velocity for water pipes?"
    a: "Common design guidelines for water distribution piping generally target velocities in the range of about 4 to 8 feet per second, balancing adequate flow against excessive noise, erosion, and water hammer risk at higher velocities. The appropriate target varies by application, pipe material, and specific engineering standards being followed, so this range is a general guideline rather than a strict universal rule."
  - q: "Where does the 2.448 conversion constant come from?"
    a: "This constant combines the geometric relationship for a circle's area (which involves pi) with the unit conversions needed to turn a velocity in feet per second and a diameter in inches directly into a flow rate in gallons per minute — bundling multiple conversion steps (area calculation, unit conversion for length, and unit conversion for volume and time) into one convenient multiplier so it doesn't need to be derived from scratch for each calculation."
  - q: "Does this account for friction losses in long pipe runs?"
    a: "No — this formula calculates flow capacity purely from a pipe's cross-sectional geometry and a given velocity, assuming that velocity is what's actually achieved. In a real system, friction along the pipe walls, fittings, elevation changes, and pump capacity all affect what velocity (and therefore flow rate) is actually achievable, which requires separate hydraulic calculations beyond this simplified formula."
references:
  - "https://www.engineeringtoolbox.com/flow-velocity-water-pipes-d_385.html"
formulaDescription: "The calculator multiplies flow velocity by the pipe's diameter squared and by a conversion constant of 2.448. This constant combines the geometric formula for a circle's cross-sectional area with the unit conversions needed to translate velocity in feet per second and diameter in inches directly into a flow rate expressed in gallons per minute, without requiring separate area and unit-conversion steps."
variablesExplained:
  - name: "Inside diameter"
    description: "The pipe's inside diameter, in inches."
  - name: "Flow velocity"
    description: "The speed at which fluid moves through the pipe, in feet per second."
stepByStep: "Enter the pipe's inside diameter and the flow velocity. The calculator multiplies velocity by diameter squared and by the 2.448 conversion constant to compute the flow rate in gallons per minute."
realWorldUses: "Plumbers and irrigation designers use this to size pipes for a target flow rate, and engineers use it to estimate flow capacity through existing piping given an assumed or measured flow velocity, as a starting point before more detailed hydraulic analysis."
commonMistakes:
  - "Treating this calculated flow rate as the guaranteed actual flow in a real system, when friction losses, elevation changes, and pump limitations can significantly reduce achievable flow below this theoretical geometric calculation."
  - "Underestimating how much pipe diameter affects flow capacity, since the squared relationship means even modest diameter increases produce disproportionately large gains in flow capacity."
---

# Pipe Flow Calculator

Enter a pipe's inside diameter and flow velocity, and this calculator computes the resulting flow rate in gallons per minute.

## Formula

**Flow (GPM) = Velocity (ft/s) × 2.448 × Diameter (in)²**.

A 2-inch pipe with water flowing at 5 ft/s: flow = 5 × 2.448 × 4 = 48.96 GPM.

## Why diameter matters so much

Flow rate scales with the square of pipe diameter, not diameter directly, since cross-sectional area grows with the square of radius. This is why going from a 2-inch to a 3-inch pipe — a 1.5x increase in diameter — more than doubles flow capacity at the same velocity (about a 2.25x increase), a much bigger jump than the diameter change alone might suggest.

## What the 2.448 constant bundles together

This single conversion factor combines a circle's area formula with the unit conversions needed to go directly from feet-per-second velocity and inches diameter to gallons-per-minute flow, saving the need to work through area calculation and separate unit conversions each time.

## What this formula doesn't capture

This calculates theoretical flow capacity from pipe geometry and velocity alone — it assumes that velocity is actually achieved and doesn't account for friction losses along the pipe, fittings, elevation changes, or pump capacity limits. Real-world achievable flow in a specific system requires additional hydraulic analysis beyond this simplified formula, which is best used as a starting-point sizing estimate.
