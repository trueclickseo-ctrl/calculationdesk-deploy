'use client';
import React, { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: 'Translate molecular formulas to standard chemical names.',
  formula: 'Direct matching nomenclature lookup.',
  example: 'NaCl is Sodium Chloride.',
  faqs: [{ q: 'Which formulas are supported?', a: 'NaCl, H2O, CO2, NaOH, HCl, C6H12O6, NH3, and other common substances.' }]
};

const NAMES: Record<string, string> = {
  nacl: 'Sodium Chloride (Common Salt)',
  h2o: 'Dihydrogen Monoxide (Water)',
  co2: 'Carbon Dioxide',
  naoh: 'Sodium Hydroxide (Lye)',
  hcl: 'Hydrochloric Acid',
  c6h12o6: 'Glucose',
  nh3: 'Ammonia',
  ch4: 'Methane',
  caco3: 'Calcium Carbonate (Limestone)',
  h2so4: 'Sulfuric Acid'
};

export default function ChemicalNomenclature() {
  const [formula, setFormula] = useState<string>('NaCl');
  const [result, setResult] = useState<string | null>(null);

  const handleReset = () => { setFormula('NaCl'); setResult(null); };
  const handleCalculate = () => {
    const key = formula.toLowerCase().trim();
    setResult(NAMES[key] || 'Formula name not found in database. Try H2O, NaCl, CO2, NaOH.');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Molecular Formula</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-foreground/80 mb-2">Formula (e.g. H2O)</label>
              <input type="text" value={formula} onChange={e => setFormula(e.target.value)} className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80" />
            </div>
            <div className="flex gap-3 pt-4 border-t border-border">
              <button type="button" onClick={handleCalculate} className="flex-1 bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-sm">Solve Name</button>
              <button type="button" onClick={handleReset} className="border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"><RefreshCw className="h-4 w-4" /></button>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Chemical Name</h2>
          {result !== null ? (
            <div className="rounded-xl bg-primary/5 p-6 border border-primary/10 text-center">
              <span className="block text-xs font-bold text-foreground/50 uppercase font-mono">IUPAC / Common Name</span>
              <span className="block text-2xl font-extrabold text-primary mt-2">{result}</span>
            </div>
          ) : (
            <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">Enter formula.</div>
          )}
        </div>
      </div>
    </div>
  );
}