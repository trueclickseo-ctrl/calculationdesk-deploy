import React from 'react';
import { ShieldAlert, Award, Calendar, CheckCircle } from 'lucide-react';
import { getAuthorProfile, getReviewerProfile } from '../utils/seo-helpers';

interface EEATAuthorCardProps {
  authorId: string;
  reviewerId: string;
  lastUpdated: string;
  formulaVerified: boolean;
}

export default function EEATAuthorCard({ authorId, reviewerId, lastUpdated, formulaVerified }: EEATAuthorCardProps) {
  const author = getAuthorProfile(authorId);
  const reviewer = getReviewerProfile(reviewerId);

  return (
    <div className="rounded-3xl border border-border bg-card p-6 shadow-sm space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 pb-4">
        <div className="flex items-center gap-2 text-xs font-semibold text-foreground/60">
          <Calendar className="h-4 w-4 text-primary" />
          <span>Last Updated: {lastUpdated}</span>
        </div>
        {formulaVerified && (
          <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
            <CheckCircle className="h-3.5 w-3.5 fill-emerald-500/15" />
            <span>Formula Verified</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Author */}
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
            <Award className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">Written By</span>
            <h4 className="text-sm font-bold text-foreground">{author.name}</h4>
            <p className="text-[11px] text-foreground/50 font-medium">{author.role}</p>
            <p className="text-xs text-foreground/70 mt-1.5 leading-relaxed">{author.bio}</p>
          </div>
        </div>

        {/* Reviewer */}
        <div className="flex gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/15 text-secondary">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <span className="text-[10px] uppercase font-bold tracking-wider text-foreground/40">Reviewed By</span>
            <h4 className="text-sm font-bold text-foreground">{reviewer.name}</h4>
            <p className="text-[11px] text-foreground/50 font-medium">{reviewer.role}</p>
            <p className="text-xs text-foreground/70 mt-1.5 leading-relaxed">{reviewer.bio}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
