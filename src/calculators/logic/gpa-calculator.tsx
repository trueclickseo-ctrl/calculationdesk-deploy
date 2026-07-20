'use client';

import React, { useState } from 'react';
import { Plus, Trash2, RefreshCw } from 'lucide-react';

export const seoData = {
  whatIs: `The GPA Calculator is an academic planner that estimates your semester or cumulative Grade Point Average (GPA). It operates on course credits and letter grades, calculating a weighted average that reflects class sizes and difficulty, which serves as the official transcript grading metric in US and international institutions.`,
  formula: `GPA is computed as the weighted average of course grade points, using credit hours as weights:

$$\\text{GPA} = \\frac{\\sum_{k=1}^{n} (\\text{Grade Point}_k \\times \\text{Credits}_k)}{\\sum_{k=1}^{n} \\text{Credits}_k}$$

Where:
- **Grade Point_k** is the numerical value assigned to course letter grade *k* (e.g., A = 4.0, B = 3.0).
- **Credits_k** is the credit weight assigned to course *k*.
- **n** is the number of courses in the semester.`,
  example: `Suppose you took 4 courses in a semester:
1. Math (4 credits): Grade A (4.0 points)
2. Physics (3 credits): Grade B+ (3.3 points)
3. English (3 credits): Grade A- (3.7 points)
4. Lab (1 credit): Grade B (3.0 points)

**Weighted Calculation:**
- Math points = 4 × 4.0 = 16.0.
- Physics points = 3 × 3.3 = 9.9.
- English points = 3 × 3.7 = 11.1.
- Lab points = 1 × 3.0 = 3.0.
- Sum of Credit Points = 16.0 + 9.9 + 11.1 + 3.0 = 40.0.
- Sum of Credits = 4 + 3 + 3 + 1 = 11.
- GPA = 40.0 / 11 ≈ **3.64**.`,
  faqs: [
    {
      q: 'What is the standard 4.0 GPA scale table?',
      a: 'The standard conversion table is: A+ = 4.3, A = 4.0, A- = 3.7, B+ = 3.3, B = 3.0, B- = 2.7, C+ = 2.3, C = 2.0, C- = 1.7, D = 1.0, F = 0.0.',
    },
    {
      q: 'What is a weighted GPA vs unweighted GPA?',
      a: 'An unweighted GPA treats all courses equally and caps at 4.0. A weighted GPA grants extra grade points for advanced placement (AP), Honors, or International Baccalaureate (IB) classes (often adding 0.5 to 1.0 points), which can push GPA scores above 4.0.',
    },
    {
      q: 'Does an F grade affect my GPA?',
      a: 'Yes. An F grade yields 0.0 grade points but the credit hours are still added to the denominator, which severely drags down your overall GPA ratio.',
    },
  ],
};

interface CourseRow {
  id: number;
  name: string;
  grade: string;
  credits: number;
}

const GRADE_VALUES: Record<string, number> = {
  'A+': 4.3,
  'A': 4.0,
  'A-': 3.7,
  'B+': 3.3,
  'B': 3.0,
  'B-': 2.7,
  'C+': 2.3,
  'C': 2.0,
  'C-': 1.7,
  'D': 1.0,
  'F': 0.0,
};

export default function GpaCalculator() {
  const [courses, setCourses] = useState<CourseRow[]>([
    { id: 1, name: 'Course 1', grade: 'A', credits: 4 },
    { id: 2, name: 'Course 2', grade: 'B+', credits: 3 },
    { id: 3, name: 'Course 3', grade: 'B', credits: 3 },
  ]);
  const [errors, setErrors] = useState<string>('');

  const isValid = courses.length > 0 && courses.every(c => c.credits > 0 && c.grade in GRADE_VALUES);

  let results = null;
  if (isValid) {
    let totalPoints = 0;
    let totalCredits = 0;

    courses.forEach(c => {
      const gp = GRADE_VALUES[c.grade];
      totalPoints += gp * c.credits;
      totalCredits += c.credits;
    });

    const gpa = totalCredits > 0 ? totalPoints / totalCredits : 0;

    results = {
      gpa,
      totalCredits,
      totalPoints,
    };
  }

  const handleAddCourse = () => {
    const nextId = courses.length > 0 ? Math.max(...courses.map(c => c.id)) + 1 : 1;
    setCourses([...courses, { id: nextId, name: `Course ${nextId}`, grade: 'A', credits: 3 }]);
    setErrors('');
  };

  const handleRemoveCourse = (id: number) => {
    if (courses.length <= 1) {
      setErrors('At least one course entry is required');
      return;
    }
    setCourses(courses.filter(c => c.id !== id));
    setErrors('');
  };

  const handleUpdateCourse = (id: number, field: keyof CourseRow, value: string | number) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, [field]: value } : c)));
    setErrors('');
  };

  const handleReset = () => {
    setCourses([
      { id: 1, name: 'Course 1', grade: 'A', credits: 4 },
      { id: 2, name: 'Course 2', grade: 'B+', credits: 3 },
      { id: 3, name: 'Course 3', grade: 'B', credits: 3 },
    ]);
    setErrors('');
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Input Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold text-foreground">Course Ledger</h2>
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
            {courses.map((row) => (
              <div key={row.id} className="flex gap-2.5 items-center rounded-xl bg-background/50 border border-border p-3">
                <div className="flex-1 min-w-0">
                  <input
                    type="text"
                    value={row.name}
                    onChange={(e) => handleUpdateCourse(row.id, 'name', e.target.value)}
                    className="block w-full py-1.5 px-3 border border-border bg-background rounded-lg text-xs font-semibold focus:border-primary outline-none"
                    placeholder="Course name"
                  />
                </div>

                <div className="w-24 shrink-0">
                  <select
                    value={row.grade}
                    onChange={(e) => handleUpdateCourse(row.id, 'grade', e.target.value)}
                    className="block w-full py-1.5 px-2 border border-border bg-background rounded-lg text-xs font-semibold focus:border-primary outline-none"
                  >
                    {Object.keys(GRADE_VALUES).map(g => (
                      <option key={g} value={g}>{g} ({GRADE_VALUES[g].toFixed(1)})</option>
                    ))}
                  </select>
                </div>

                <div className="w-20 shrink-0">
                  <input
                    type="number"
                    min="1"
                    max="10"
                    value={row.credits || ''}
                    onChange={(e) => handleUpdateCourse(row.id, 'credits', Number(e.target.value))}
                    className="block w-full py-1.5 px-2 border border-border bg-background rounded-lg text-xs font-semibold text-center focus:border-primary outline-none"
                    placeholder="Credits"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => handleRemoveCourse(row.id)}
                  className="p-1.5 rounded-lg text-red-500 hover:bg-red-500/5 transition-all cursor-pointer shrink-0"
                  title="Remove course"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>

          {errors && <p className="text-xs text-red-500 mt-2 font-semibold">{errors}</p>}

          <button
            type="button"
            onClick={handleAddCourse}
            className="w-full mt-4 flex items-center justify-center gap-1.5 border border-dashed border-border hover:border-primary hover:text-primary rounded-xl py-3 text-xs font-bold text-foreground/60 transition-all cursor-pointer"
          >
            <Plus className="h-4 w-4" />
            Add Course Entry
          </button>
        </div>

        {/* Results Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">Semester GPA</h2>
            {results ? (
              <div className="space-y-5">
                <div className="rounded-xl bg-primary/5 p-4 border border-primary/10">
                  <span className="block text-xs font-bold text-foreground/50 uppercase tracking-wider">
                    Term GPA Index
                  </span>
                  <span className="block text-3xl font-extrabold text-primary mt-1">
                    {results.gpa.toFixed(3)} / 4.3
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Total Credit Hours (Weights)
                  </span>
                  <span className="block text-lg font-bold text-foreground mt-1">
                    {results.totalCredits} credits
                  </span>
                </div>

                <div className="rounded-xl bg-background p-4 border border-border">
                  <span className="block text-xs font-semibold text-foreground/50 uppercase tracking-wider">
                    Accumulated Grade Points
                  </span>
                  <span className="block text-lg font-bold text-foreground mt-1">
                    {results.totalPoints.toFixed(1)} points
                  </span>
                </div>
              </div>
            ) : (
              <div className="flex h-64 items-center justify-center text-foreground/40 text-sm">
                Enter course records (positive credits) to compute GPA.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
