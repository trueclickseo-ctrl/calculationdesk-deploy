'use client';

import React, { useState } from 'react';
import { RefreshCw, Users, ArrowRight } from 'lucide-react';

export const seoData = {
  whatIs: `The Friendship Quiz is an interactive compatibility tool that evaluates the strength of a friendship using five psychological questions.`,
  formula: `The friendship score is determined by summing point values assigned to your multiple-choice answers:

$$\\text{Friendship Score} = \\sum_{i=1}^{5} \\text{Points}(\\text{Question } i)$$
Where:
- Option A = 20 points
- Option B = 15 points
- Option C = 10 points
- Option D = 5 points
The maximum score is 100% and the minimum is 25%.`,
  example: `**Play Friendship Quiz with scoring options:**
- Q1: Option A (20), Q2: Option B (15), Q3: Option A (20), Q4: Option C (10), Q5: Option A (20).
- Total Score = 20 + 15 + 20 + 10 + 20 = **85%**.`,
  faqs: [
    {
      q: 'How does the friendship compatibility quiz work?',
      a: 'The quiz rates five core areas of social connections: communication frequency, mutual support, trust, conflict resolution, and foundational values. It scores your responses to estimate a compatibility index.',
    },
    {
      q: 'Can two people get different scores answering for each other?',
      a: 'Yes, if their individual perceptions of the relationship dynamics, trust level, or communication vary, their scored outcomes will differ.',
    },
    {
      q: 'Is this quiz scientifically validated?',
      a: 'No. This is a lighthearted quiz designed for entertainment and self-reflection on friendship qualities.',
    },
  ],
};

interface Question {
  q: string;
  options: { text: string; points: number }[];
}

const QUESTIONS: Question[] = [
  {
    q: 'How often do you stay in touch or message each other?',
    options: [
      { text: 'Daily — we talk or text constantly.', points: 20 },
      { text: 'A few times a week.', points: 15 },
      { text: 'Once a week or on weekends.', points: 10 },
      { text: 'Rarely, but we pick up right where we left off.', points: 5 },
    ],
  },
  {
    q: 'If your friend is going through a tough time, what do you do?',
    options: [
      { text: 'Drop everything to listen and offer help.', points: 20 },
      { text: 'Offer support and help when I have free time.', points: 15 },
      { text: 'Send encouragement and check in periodically.', points: 10 },
      { text: 'Give them space to figure it out on their own.', points: 5 },
    ],
  },
  {
    q: 'How much do you trust each other with private secrets?',
    options: [
      { text: '100% trust — we know each other\'s deepest secrets.', points: 20 },
      { text: 'High trust — we share most important things.', points: 15 },
      { text: 'Medium trust — we share general life events.', points: 10 },
      { text: 'Low trust — we prefer to keep secrets private.', points: 5 },
    ],
  },
  {
    q: 'How do you usually handle arguments or disagreements?',
    options: [
      { text: 'Talk it out honestly and apologize quickly.', points: 20 },
      { text: 'Take a break and discuss calmly later.', points: 15 },
      { text: 'Agree to disagree without holding grudges.', points: 10 },
      { text: 'Avoid talking about it and let it blow over.', points: 5 },
    ],
  },
  {
    q: 'What is the main foundation of your relationship?',
    options: [
      { text: 'Complete mutual trust, loyalty, and empathy.', points: 20 },
      { text: 'Shared hobbies, sports, or work interests.', points: 15 },
      { text: 'Long-standing childhood history and memories.', points: 10 },
      { text: 'Convenience and hanging out in the same social groups.', points: 5 },
    ],
  },
];

export default function FriendshipCalculator() {
  const [name1, setName1] = useState<string>('');
  const [name2, setName2] = useState<string>('');
  const [step, setStep] = useState<number>(0); // 0 = names, 1-5 = questions, 6 = results
  const [answers, setAnswers] = useState<number[]>([]);
  const [error, setError] = useState<string>('');

  const handleReset = () => {
    setName1('');
    setName2('');
    setStep(0);
    setAnswers([]);
    setError('');
  };

  const handleStart = () => {
    if (!name1.trim() || !name2.trim()) {
      setError('Please enter both names to start the quiz.');
      return;
    }
    setError('');
    setStep(1);
  };

  const handleSelectOption = (points: number) => {
    const updated = [...answers, points];
    setAnswers(updated);
    if (step < QUESTIONS.length) {
      setStep(step + 1);
    } else {
      setStep(6);
    }
  };

  // Computations
  const score = answers.reduce((sum, val) => sum + val, 0);

  let verdict = '';
  if (score >= 90) {
    verdict = 'Inseparable Best Friends! Your friendship is built on absolute trust and loyalty.';
  } else if (score >= 70) {
    verdict = 'Close Friends. A highly supportive relationship with great mutual care.';
  } else if (score >= 50) {
    verdict = 'Good Friends. You share pleasant times, though communication may be occasional.';
  } else {
    verdict = 'Casual Acquaintances. You share some interests, but have different paths.';
  }

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Control Panel */}
        <div className="lg:col-span-5 rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h2 className="text-xl font-bold text-foreground mb-6">Friendship Quiz</h2>

          {step === 0 ? (
            <div className="space-y-5">
              <div>
                <label htmlFor="name-1" className="block text-sm font-semibold text-foreground/80 mb-2">Your Name</label>
                <input
                  id="name-1"
                  type="text"
                  value={name1}
                  onChange={(e) => { setName1(e.target.value); setError(''); }}
                  placeholder="e.g. Sarah"
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              <div>
                <label htmlFor="name-2" className="block text-sm font-semibold text-foreground/80 mb-2">Friend&apos;s Name</label>
                <input
                  id="name-2"
                  type="text"
                  value={name2}
                  onChange={(e) => { setName2(e.target.value); setError(''); }}
                  placeholder="e.g. Jessica"
                  className="block w-full py-3 px-4 text-sm font-medium rounded-xl border border-border bg-background outline-none focus:border-primary text-foreground/80"
                />
              </div>

              {error && <p className="text-xs text-red-500 font-medium">{error}</p>}

              <button
                type="button"
                onClick={handleStart}
                className="w-full bg-primary text-white font-bold py-3 px-4 rounded-xl hover:bg-primary-hover shadow-lg shadow-primary/20 transition-all cursor-pointer text-center text-sm inline-flex items-center justify-center gap-1.5"
              >
                Start Quiz
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="space-y-4 text-center">
              <span className="block text-sm font-bold text-foreground/60">
                Quiz active: {name1} & {name2}
              </span>
              <button
                type="button"
                onClick={handleReset}
                className="w-full inline-flex items-center justify-center gap-1.5 border border-border hover:bg-border font-semibold py-3 px-4 rounded-xl text-foreground/70 transition-all cursor-pointer text-sm"
              >
                <RefreshCw className="h-4 w-4" />
                Reset Quiz
              </button>
            </div>
          )}
        </div>

        {/* Right Active Quiz Panel */}
        <div className="lg:col-span-7 rounded-2xl border border-border bg-card p-6 shadow-sm flex flex-col justify-between min-h-[300px]">
          <div>
            <h2 className="text-xl font-bold text-foreground mb-6">
              {step > 0 && step <= QUESTIONS.length ? `Question ${step} of 5` : 'Quiz Output'}
            </h2>

            {step === 0 && (
              <div className="flex h-48 items-center justify-center text-foreground/40 text-sm text-center px-4">
                Enter your names on the left to start the friendship compatibility test.
              </div>
            )}

            {step > 0 && step <= QUESTIONS.length && (
              <div className="space-y-5">
                <p className="text-sm font-bold text-foreground leading-relaxed">
                  {QUESTIONS[step - 1].q}
                </p>
                <div className="grid grid-cols-1 gap-3">
                  {QUESTIONS[step - 1].options.map((opt, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleSelectOption(opt.points)}
                      className="block w-full py-2.5 px-4 text-left text-xs font-semibold rounded-xl border border-border bg-background hover:border-primary hover:bg-primary/5 text-foreground/80 transition-all cursor-pointer"
                    >
                      {opt.text}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {step === 6 && (
              <div className="space-y-6 text-center">
                <div className="relative inline-flex items-center justify-center">
                  <Users className="h-24 w-24 text-primary opacity-10" />
                  <span className="absolute text-3xl font-black text-primary">{score}%</span>
                </div>
                <div className="max-w-md mx-auto space-y-2">
                  <span className="block text-lg font-bold text-foreground">{name1} & {name2}</span>
                  <p className="text-xs font-semibold text-foreground/60 leading-relaxed px-4">
                    {verdict}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
