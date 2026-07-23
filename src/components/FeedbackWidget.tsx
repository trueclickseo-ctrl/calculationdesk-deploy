'use client';

import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown, Check, Send } from 'lucide-react';

export default function FeedbackWidget() {
  const [response, setResponse] = useState<'yes' | 'no' | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [comment, setComment] = useState('');

  const handleFeedback = (val: 'yes' | 'no') => {
    setResponse(val);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="no-print rounded-2xl border border-border bg-card p-5 shadow-sm mt-8">
      {!submitted ? (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <h3 className="text-sm md:text-base font-bold text-foreground">Was this calculator helpful?</h3>
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => handleFeedback('yes')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  response === 'yes'
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600'
                    : 'bg-background hover:bg-border border-border text-foreground/80'
                }`}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>Yes</span>
              </button>
              <button
                type="button"
                onClick={() => handleFeedback('no')}
                className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                  response === 'no'
                    ? 'bg-rose-500/10 border-rose-500/30 text-rose-600'
                    : 'bg-background hover:bg-border border-border text-foreground/80'
                }`}
              >
                <ThumbsDown className="h-3.5 w-3.5" />
                <span>No</span>
              </button>
            </div>
          </div>

          {response && (
            <form onSubmit={handleSubmit} className="space-y-3 animate-in fade-in duration-200">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder={response === 'yes' ? 'What did you like about it? (Optional)' : 'How can we make this calculator better? (Optional)'}
                className="w-full min-h-[80px] rounded-xl border border-border bg-background p-3 text-xs md:text-sm outline-none transition-all focus:border-primary focus:ring-4 focus:ring-ring-custom resize-y"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 bg-primary hover:bg-primary-hover text-white font-bold py-2 px-4 rounded-xl text-xs shadow-lg shadow-primary/10 transition-all cursor-pointer"
                >
                  <Send className="h-3.5 w-3.5" />
                  <span>Submit Feedback</span>
                </button>
              </div>
            </form>
          )}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-4 text-center animate-in zoom-in-95 duration-200">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500 mb-3">
            <Check className="h-5 w-5" />
          </div>
          <h4 className="text-sm font-bold text-foreground">Thank you for your feedback!</h4>
          <p className="text-xs text-foreground/50 mt-1">Your response helps us improve the calculations for everyone.</p>
        </div>
      )}
    </div>
  );
}
