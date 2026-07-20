'use client';

import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'The ML to OZ Converter is a volume-conversion tool designed to translate milliliters (ml) into US fluid ounces (fl oz). Bartenders, chefs, baristas, medical practitioners, and beauty experts use this tool to translate recipe measures, liquid dosages, and cosmetics packaging. Since fluid ounces are widely used in the United States while milliliters are the metric standard globally, this converter bridges the gap instantly.',
  formula: `To convert milliliters to fluid ounces, multiply the volume in milliliters by 0.033814:

$$\\text{Fluid Ounces} = \\text{Milliliters} \\times 0.033814$$

This multiplier represents the volume of one milliliter expressed in US fluid ounces. Because one US fluid ounce is internationally defined as exactly 29.5735295625 milliliters, dividing 1 by 29.5735295625 gives the conversion constant of approximately 0.033814. Knowing the convert ml to oz formula is very helpful in culinary measurements.`,
  example: `Let's look at an ml to oz calculation example. Suppose you have a beverage container that holds exactly 500 ml of water, and you want to find its volume in fluid ounces.

1. Identify the input volume: $V = 500$ ml.
2. Apply the conversion formula:
   $$\\text{Fluid Ounces} = 500 \\times 0.033814$$
3. Perform the multiplication:
   $$\\text{Fluid Ounces} \\approx 16.907$$

Thus, 500 ml is equivalent to approximately 16.91 US fluid ounces.`,
  faqs: [
    {
      q: 'How many milliliters are in one fluid ounce?',
      a: 'There are approximately 29.5735 milliliters in one US fluid ounce. In the UK and Imperial system, one fluid ounce is slightly smaller and equals exactly 28.4130625 milliliters.',
    },
    {
      q: 'Is this converter based on US fluid ounces or UK Imperial fluid ounces?',
      a: 'This converter utilizes the US fluid ounce standard ($1\\text{ fl oz} \\approx 29.5735\\text{ ml}$), which is the standard system of units in the United States and international commerce.',
    },
    {
      q: 'How do you convert milliliters to ounces manually?',
      a: 'To convert manually, you can divide the milliliter amount by 29.57. For a quick approximation, divide by 30 (e.g., 150 ml is approximately 150 / 30 = 5 fl oz).',
    },
    {
      q: 'What is 250 ml in ounces?',
      a: '250 ml (approximately a standard cup size) is equal to 250 × 0.033814 ≈ 8.45 US fluid ounces.',
    },
    {
      q: 'Why is there a difference between dry ounces and fluid ounces?',
      a: 'Dry ounces (oz) measure weight and are based on mass units, whereas fluid ounces (fl oz) measure volume and are based on the capacity of liquid containers. They are not interchangeable.',
    },
  ],
};

export default function Convertermltooz() {
  const [val, setVal] = useState<number>(250);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setVal(250); setResult(null); };
  const handleCalculate = () => {
    setResult(val * 0.0338140227);
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Convert Unit</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Volume in Milliliters (ml)</label>
              <input type="number" value={val} onChange={e => { setVal(Number(e.target.value)); setResult(null); }} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Converted Value</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-[10px] font-bold text-foreground/50 uppercase font-mono">Resulting Amount</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(2)} Fluid Ounces (fl oz)</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter value to convert.</div>
          )}
        </div>
      </div>
    </div>
  );
}
