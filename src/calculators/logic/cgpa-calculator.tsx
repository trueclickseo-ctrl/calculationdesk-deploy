'use client';

import React, { useState } from 'react';
import { Plus, Trash2, RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The CGPA Calculator is an educational utility designed to compute the Cumulative Grade Point Average (CGPA) of a student based on semester-wise GPA (or SGPA) values. It aggregates semester grades to present an overall cumulative academic score, which is widely used by universities, colleges, and job recruiters to evaluate a student's academic standing.`,
  formula: `CGPA is calculated by taking the simple average of GPA values across all completed semesters:

$$\\text{CGPA} = \\frac{\\sum_{k=1}^{n} \\text{GPA}_k}{n}$$

Where:
- **GPA_k** is the Grade Point Average obtained in semester *k*.
- **n** is the total number of semesters completed.

To convert CGPA to equivalent percentage (under standard board norms like CBSE):
$$\\text{Percentage (\\%)} = \\text{CGPA} \\times 9.5$$`,
  example: `Suppose a student completed 4 semesters with the following SGPAs:
- Semester 1: 8.5
- Semester 2: 7.8
- Semester 3: 8.2
- Semester 4: 9.0

**CGPA Calculation:**
- Total Semesters (n) = 4.
- Sum of GPAs = 8.5 + 7.8 + 8.2 + 9.0 = 33.5.
- CGPA = 33.5 / 4 = **8.38**.
- CBSE Percentage Equivalent = 8.38 × 9.5 = **79.61%**.`,
  faqs: [
    {
      q: 'What is the difference between GPA, SGPA, and CGPA?',
      a: 'GPA (Grade Point Average) is a general term for grading. SGPA (Semester Grade Point Average) is the score earned in a single semester. CGPA (Cumulative Grade Point Average) is the overall average of all SGPAs earned throughout the entire course program.',
    },
    {
      q: 'Why do we multiply CGPA by 9.5 to get percentage?',
      a: 'Standard boards (like CBSE) analyzed historical pass statistics and established that a multiplier of 9.5 represents the closest fit to align CGPA ratios with traditional percentage grading bands.',
    },
    {
      q: 'Can semesters have different credit weights in CGPA?',
      a: 'Normally, CGPA is the direct average of SGPAs. However, if individual semesters have vastly different total credit counts, a weighted average is used: $\\sum (\\text{SGPA} \\times \\text{Credits}) / \\sum \\text{Credits}$. This calculator supports equal weights, which is the standard model.',
    },
  ],
};

interface SemesterRow {
  id: number;
  gpa: number;
}

export default function CgpaCalculator() {
  const [rows, setRows] = useState<SemesterRow[]>([
    { id: 1, gpa: 8.5 },
    { id: 2, gpa: 8.0 },
  ]);
  const [errors, setErrors] = useState<string>('');

  const isValid = rows.length > 0 && rows.every(r => r.gpa >= 0 && r.gpa <= 10);

  let results = null;
  if (isValid) {
    let totalGpa = 0;
    rows.forEach(r => {
      totalGpa += r.gpa;
    });

    const cgpa = totalGpa / rows.length;
    const percentage = cgpa * 9.5;

    results = {
      cgpa,
      percentage,
    };
  }

  const handleAddRow = () => {
    const nextId = rows.length > 0 ? Math.max(...rows.map(r => r.id)) + 1 : 1;
    setRows([...rows, { id: nextId, gpa: 0 }]);
    setErrors('');
  };

  const handleRemoveRow = (id: number) => {
    if (rows.length <= 1) {
      setErrors('At least one semester entry is required');
      return;
    }
    setRows(rows.filter(r => r.id !== id));
    setErrors('');
  };

  const handleUpdateRow = (id: number, value: number) => {
    setRows(rows.map(r => (r.id === id ? { ...r, gpa: value } : r)));
    setErrors('');
  };

  const handleReset = () => {
    setRows([
      { id: 1, gpa: 8.5 },
      { id: 2, gpa: 8.0 },
    ]);
    setErrors('');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Semester GPAs</h2>
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-foreground/50 hover:text-foreground font-semibold cursor-pointer"
            >
              <RefreshCw className="h-3 w-3" />
              Reset All
            </button>
          </div>

          <div className="space-y-3 max-h-[400px] overflow-y-auto pr-1">
            {rows.map((row, index) => (
              <div key={row.id} className="flex gap-3 items-center rounded-xl bg-background/50 border border-border p-3">
                <span className="text-xs font-bold text-foreground/35 w-24 text-left shrink-0">Semester {index + 1} GPA</span>
                
                <div className="flex-1 min-w-0">
                  <div className="relative rounded-lg border border-border bg-background focus-within:border-primary focus-within:ring-4 focus-within:ring-ring-custom transition-all">
                    <input
                      type="number"
                      step="0.01"
                      placeholder="GPA (e.g. 8.5)"
                      value={row.gpa || ''}
                      onChange={(e) => handleUpdateRow(row.id, Number(e.target.value))}
                      className="block w-full py-2 px-3 text-sm font-medium outline-none bg-transparent"
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveRow(row.id)}
                  className="p-2 rounded-lg text-red-500 hover:bg-red-500/5 transition-all cursor-pointer shrink-0"
                  title="Delete semester"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {errors && <p className="text-xs text-red-500 mt-2 font-semibold">{errors}</p>}

          <button
            type="button"
            onClick={handleAddRow}
            className="w-full mt-4 flex items-center justify-center gap-1.5 border border-dashed border-border hover:border-primary hover:text-primary rounded-xl py-3 text-xs font-bold text-foreground/60 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Semester GPA Row
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Cumulative Score</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Cumulative CGPA
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.cgpa.toFixed(2)} / 10.0
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Equivalent Percentage (CBSE 9.5 Scale)
                  </span>
                  <span className="block text-xl font-bold text-foreground mt-1">
                    {results.percentage.toFixed(2)}%
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Total Semesters Evaluated
                  </span>
                  <span className="block text-base font-bold text-foreground mt-1">
                    {rows.length} terms
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter semester GPAs (0 to 10) to compute CGPA.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
