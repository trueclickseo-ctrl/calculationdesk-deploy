---
title: "Rebar Calculator – Estimate Total Reinforcement Length for a Slab"
seoTitle: "Rebar Calculator - Slab Reinforcement Length | CalculationDesk"
metaDescription: "Enter a slab's length, width, and grid spacing to estimate the total length of rebar needed for a two-way reinforcement grid."
category: "construction"
subcategory: "concrete-calculators"
tags: ["rebar calculator", "slab reinforcement calculator", "rebar grid spacing", "concrete rebar estimator", "reinforcement mesh calculator"]
priority: "medium"
importance: 6
clusterPriority: "secondary"
searchIntent: "transactional"
authorId: "editorial-team"
reviewerId: "calculationdesk-review-team"
lastUpdated: "2026-08-08"
formulaVerified: true
version: "1.0"
contentStatus: "published"
lastReviewed: "2026-08-08"
nextReviewDate: "2026-11-08"
refreshPriority: "medium"
aiSummary:
  definition: "This calculator estimates the total linear feet of rebar needed for a two-way reinforcement grid across a rectangular concrete slab, based on the slab's dimensions and the grid spacing."
  quickAnswer: "A 20 by 20 foot slab reinforced on an 18-inch grid needs about 560 feet of rebar total."
  formulaSummary: "Bars per direction = floor(Length / Spacing) + 1  |  Total length = (bars_x x Width) + (bars_y x Length)"
  whenToUse: "Use it during early material planning for a slab pour, before getting a formal quote from a supplier, to estimate how much rebar (or welded wire mesh, at a similar spacing) a job will need."
  whoShouldUse: "DIY concrete pourers, contractors doing a rough material takeoff, and anyone budgeting a slab project."
  limitations: "This is a straight-line length estimate for a simple rectangular grid. It does not add extra length for lap splices where bars overlap, does not account for edge/perimeter bars beyond the grid itself, and does not factor in waste from cutting standard-length rebar stock (typically sold in 20 or 40 foot lengths)."
  keyTakeaways:
    - "The grid runs bars in both directions (a two-way mat), not just one."
    - "Bar count per direction is based on how many spacing intervals fit across the slab, plus one for the starting bar."
    - "The total does not include splice overlap or perimeter/edge reinforcement — add roughly 10-15% for those in a real material order."
peopleAlsoAsk:
  - "How much rebar do I need for a 20x20 slab?"
  - "What is standard rebar spacing for a slab?"
  - "What is standard rebar overlap/splice length?"
  - "Does closer rebar spacing mean a stronger slab?"
examples:
  - title: "20 x 20 ft slab, 18-inch grid"
    inputs: "Length = 20 ft, Width = 20 ft, Grid spacing = 18 inches"
    calculation: "Spacing in feet = 18 / 12 = 1.5 ft. Bars across length = floor(20 / 1.5) + 1 = 13 + 1 = 14. Bars across width = floor(20 / 1.5) + 1 = 14. Total length = (14 x 20) + (14 x 20) = 280 + 280 = 560 ft."
    result: "Total rebar length = 560 feet"
  - title: "30 x 15 ft slab, 12-inch grid"
    inputs: "Length = 30 ft, Width = 15 ft, Grid spacing = 12 inches"
    calculation: "Spacing in feet = 12 / 12 = 1.0 ft. Bars across length = floor(30 / 1.0) + 1 = 31. Bars across width = floor(15 / 1.0) + 1 = 16. Total length = (31 x 15) + (16 x 30) = 465 + 480 = 945 ft."
    result: "Total rebar length = 945 feet"
faqs:
  - q: "How much rebar do I need for a 20x20 slab?"
    a: "On a standard 18-inch grid, a 20x20 foot slab needs about 560 linear feet of rebar for the reinforcement grid itself. Add roughly 10-15% more to account for splice overlaps and any perimeter bars, which this calculator doesn't include."
  - q: "What is standard rebar spacing for a slab?"
    a: "Residential slabs commonly use 12 to 18 inch grid spacing, depending on the slab's thickness and load requirements. Structural engineers specify exact spacing based on the specific project — this calculator lets you test different spacings to see how they change material needs."
  - q: "What is standard rebar overlap/splice length?"
    a: "A common rule of thumb is 30 to 40 times the rebar's diameter, though local code and engineering specs should always take precedence. For a common #4 bar (0.5 inch diameter), that's roughly 15 to 20 inches of overlap at each splice."
  - q: "Does closer rebar spacing mean a stronger slab?"
    a: "Generally yes, up to the point specified by the structural design — tighter spacing distributes tensile stress more evenly and controls cracking better. But going tighter than an engineer's spec doesn't necessarily add useful strength and does add material cost."
references:
  - "https://www.cement.org/cement-concrete/concrete-materials/reinforcement"
formulaDescription: "The grid is built by placing parallel bars every 'spacing' interval in both directions across the slab. The number of bars needed in each direction is the number of full spacing intervals that fit across the opposite dimension, plus one for the starting bar at the edge. Each bar's length equals the slab's dimension it runs across."
variablesExplained:
  - name: "Length, Width"
    description: "The slab's two dimensions in feet."
  - name: "Grid spacing"
    description: "The center-to-center distance between parallel bars, entered in inches (converted to feet for the calculation)."
stepByStep: "Enter the slab's length and width in feet, and the grid spacing in inches. The calculator converts spacing to feet, works out how many bars run in each direction, multiplies bar count by the length they span, and adds the two directions together for a total linear footage."
realWorldUses: "Contractors and DIYers use a rough length estimate like this to plan how many standard-length rebar sticks (typically 20 or 40 feet) to order, and to compare material cost between different grid spacings before finalizing a slab design with an engineer."
commonMistakes:
  - "Forgetting to add extra length for splice overlaps when bars need to be joined to span a distance longer than standard stock length."
  - "Using this straight grid estimate for a slab with a non-rectangular shape, cutouts, or thickened edge beams, where actual material needs will differ."
---

# Rebar Calculator

This calculator estimates how much rebar a rectangular slab needs for a standard two-way reinforcement grid — bars running in both directions, spaced evenly across the pour.

## How the estimate is built

For each direction, the calculator works out how many bars fit across the *opposite* dimension at the given spacing (one bar per spacing interval, plus one for the starting edge bar), then multiplies that count by the length each bar has to span. Adding both directions together gives the total linear footage of rebar for the grid.

For a 20×20 foot slab on an 18-inch grid, that works out to 14 bars running each direction, each 20 feet long — 560 feet of rebar total. Tightening the spacing to 12 inches on the same slab pushes the total up substantially, since more bars are now needed in both directions.

## What this doesn't include

This is a straight-line grid estimate, not a full material order. Real jobs need extra length for splice overlaps wherever a bar has to be joined to span farther than standard stock length (commonly 20 or 40 feet), and often need additional perimeter or edge bars beyond the interior grid. A common rule of thumb is to add 10-15% to a grid estimate like this one to cover splices, though your structural drawings — if you have them — should always take precedence over any calculator estimate.
