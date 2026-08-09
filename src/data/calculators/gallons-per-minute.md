---
title: "Gallons Per Minute Calculator – Pipe Flow Discharge"
seoTitle: "GPM Calculator | CalculationDesk"
metaDescription: "Calculate pipe flow discharge in gallons per minute from flow velocity and pipe diameter."
category: "engineering"
subcategory: "fluid-mechanics-calculators"
tags: ["gallons per minute calculator", "gpm calculator", "pipe flow rate calculator", "flow velocity to gpm"]
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
  definition: "This calculator finds the flow rate through a pipe in gallons per minute (GPM), from the pipe's inside diameter and the fluid's flow velocity."
  quickAnswer: "A 2-inch diameter pipe with a flow velocity of 5 ft/s delivers approximately 48.96 GPM."
  formulaSummary: "Flow (GPM) = Velocity (ft/s) x 2.448 x Diameter (in)^2."
  whenToUse: "Use it when you know a pipe's flow velocity and diameter and need the volumetric flow rate in gallons per minute, for sizing pumps, plumbing, or irrigation systems."
  whoShouldUse: "Plumbers, irrigation designers, and engineers sizing piping systems by flow capacity."
  limitations: "This assumes the pipe is flowing completely full and the velocity given is a uniform average across the cross-section — real flow profiles vary somewhat across a pipe's diameter (slower near the walls, faster in the center), which this simplified calculation doesn't separately account for."
  keyTakeaways:
    - "Flow rate scales with the square of pipe diameter, meaning doubling a pipe's diameter quadruples its flow capacity at the same velocity — a small increase in pipe size dramatically increases flow potential."
    - "The constant 2.448 in this formula converts flow velocity and pipe cross-sectional area (from diameter) directly into gallons per minute, accounting for the necessary unit conversions between feet, inches, and gallons."
    - "This calculation is mathematically identical to a general pipe flow rate formula — GPM is simply the volumetric flow rate expressed in a specific, commonly used unit for plumbing and irrigation contexts."
peopleAlsoAsk:
  - "Why does pipe diameter have such a big effect on flow rate?"
  - "What is a typical flow velocity for water pipes?"
  - "How is this different from a general pipe flow rate calculator?"
  - "What happens if the pipe isn't flowing completely full?"
examples:
  - title: "2-inch pipe at 5 ft/s"
    inputs: "Diameter = 2 in, Velocity = 5 ft/s"
    calculation: "GPM = 5 x 2.448 x 2^2 = 5 x 2.448 x 4 = 48.96"
    result: "Discharge = 48.96 GPM"
faqs:
  - q: "Why does pipe diameter have such a big effect on flow rate?"
    a: "Flow rate depends on the cross-sectional area of the pipe, and area scales with the square of the radius (or diameter) — not linearly. That's why doubling a pipe's diameter doesn't just double its flow capacity, it quadruples it, assuming the same flow velocity. This squared relationship is why even a modest increase in pipe size can dramatically boost how much water a system can move."
  - q: "What is a typical flow velocity for water pipes?"
    a: "Residential water supply piping is commonly designed for flow velocities in the range of 4 to 8 feet per second, balancing adequate flow capacity against noise and erosion concerns that come with excessively fast-moving water. Irrigation systems and larger municipal supply lines may use different target velocities depending on pipe material, pressure, and system design goals."
  - q: "How is this different from a general pipe flow rate calculator?"
    a: "It isn't, really — gallons per minute (GPM) is simply the specific unit this calculator expresses flow rate in, since it's the most commonly used unit in US plumbing, irrigation, and water system design contexts. A general pipe flow rate calculation follows the identical underlying formula and physics; GPM is just the practical, industry-standard unit of choice for these applications."
  - q: "What happens if the pipe isn't flowing completely full?"
    a: "This calculation assumes the pipe is flowing full, with fluid occupying its entire cross-sectional area — a common assumption for pressurized water supply lines. For partially filled pipes, such as gravity-fed drainage or sewer lines that often run only partly full, a different calculation accounting for the actual wetted cross-sectional area (rather than the full pipe area) is needed for an accurate flow rate."
references:
  - "https://www.engineeringtoolbox.com/flow-velocity-water-pipes-d_385.html"
formulaDescription: "The formula combines a pipe's cross-sectional area (derived from its diameter) with the fluid's flow velocity to determine volumetric flow rate, with the constant 2.448 handling the necessary conversions between the input units (feet per second, inches) and the output unit of gallons per minute."
variablesExplained:
  - name: "Diameter"
    description: "The pipe's inside diameter, in inches."
  - name: "Velocity"
    description: "The fluid's flow velocity through the pipe, in feet per second."
stepByStep: "Enter the pipe's inside diameter in inches and the fluid's flow velocity in feet per second. The calculator multiplies velocity by 2.448 and by the diameter squared to return the flow rate in gallons per minute."
realWorldUses: "Plumbers and irrigation designers use GPM calculations to size pipes and pumps appropriately for a required flow rate, and to verify that an existing pipe and pump combination can deliver the flow capacity a system actually needs."
commonMistakes:
  - "Assuming flow rate scales linearly with pipe diameter, when it actually scales with the square of diameter — a mistake that can lead to significantly underestimating how much a modest pipe size increase actually improves flow capacity."
  - "Applying this full-pipe flow assumption to a gravity-fed or partially filled pipe system, where the actual wetted cross-sectional area is less than the full pipe area this formula assumes."
---

# Gallons Per Minute Calculator

Enter a pipe's inside diameter and the fluid's flow velocity, and this calculator returns the flow rate in gallons per minute.

## Formula

**Flow (GPM) = Velocity (ft/s) × 2.448 × Diameter (in)²**

For a 2-inch pipe with a flow velocity of 5 ft/s: GPM = 5 × 2.448 × 2² = 48.96 GPM.

## Why pipe size matters more than it seems

Flow capacity depends on a pipe's cross-sectional area, and area grows with the square of diameter rather than in direct proportion to it. That squared relationship means a seemingly modest jump — say, from a 2-inch to a 3-inch pipe — more than doubles the flow capacity at the same velocity, which is why even small increases in pipe diameter can meaningfully change what a plumbing or irrigation system is able to deliver.

## What "full pipe" means for this calculation

This formula assumes the fluid completely fills the pipe's cross-section, which is the standard assumption for pressurized water supply lines. Gravity-fed systems like drain or sewer lines often run only partially full, where the actual wetted area is smaller than the pipe's full cross-section — a different calculation accounting for that partial fill level is needed to get an accurate flow rate in those cases.
