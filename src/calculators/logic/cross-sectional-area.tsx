'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Find cross-sectional areas of cylinders, rectangles, or triangles.',
  formula: 'Shape-specific area calculation equations.',
  example: 'Circle with 10-inch diameter has cross-sectional area ~78.54 sq in.',
  faqs: [{ q: 'What is cross-sectional area?', a: 'The intersection area of a three-dimensional body with a cutting plane perpendicular to its axis.' }]
};

export default function CrossSectionalArea() {
  const [shape, setShape] = useState<string>('circle');
  const [dim1, setDim1] = useState<number>(10);
  const [dim2, setDim2] = useState<number>(10);
  const [result, setResult] = useState<number | null>(null);

  const handleReset = () => { setShape('circle'); setDim1(10); setDim2(10); setResult(null); };
  const handleCalculate = () => {
    if (shape === 'circle') {
      const radius = dim1 / 2;
      setResult(Math.PI * radius * radius);
    } else if (shape === 'rectangle') {
      setResult(dim1 * dim2);
    } else {
      setResult(0.5 * dim1 * dim2);
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Profile Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2 font-medium">Shape</label>
              <select value={shape} onChange={e => { setShape(e.target.value); setResult(null); }} className="block w-full py-3 px-3 text-xs font-semibold rounded-xl border border-border bg-background text-foreground/80 focus:border-primary outline-none cursor-pointer">
                <option value="circle">Circle / Cylinder Profile</option>
                <option value="rectangle">Rectangle / Box Profile</option>
                <option value="triangle">Triangle Profile</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">
                {shape === 'circle' ? 'Diameter' : 'Base / Width'}
              </label>
              <input type="number" value={dim1} onChange={e => setDim1(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            {shape !== 'circle' && (
              <div>
                <label className="block text-sm font-semibold text-foreground/80 mb-2">Height</label>
                <input type="number" value={dim2} onChange={e => setDim2(Number(e.target.value))} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
              </div>
            )}
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Cross-Sectional Area</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">Profile Surface Area</span>
              <span className="block text-4xl font-extrabold text-primary mt-2">{result.toFixed(3)} units²</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter dimensions.</div>
          )}
        </div>
      </div>
    </div>
  );
}