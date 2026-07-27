import React from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import { Target, TrendingUp, AlertTriangle, Search } from 'lucide-react';

export const metadata = {
  title: 'Internal SEO Opportunity Engine Dashboard',
  robots: 'noindex, nofollow',
};

const QUICK_WINS = [
  { url: '/calculators/emi-calculator', query: 'emi calculator', impressions: 45000, position: 6.2, ctr: 4.2 },
  { url: '/calculators/sip-calculator', query: 'sip calculator online', impressions: 38000, position: 7.8, ctr: 3.1 },
  { url: '/calculators/bmi-calculator', query: 'bmi calculator free', impressions: 29000, position: 5.4, ctr: 5.8 }
];

const CTR_ISSUES = [
  { url: '/calculators/loan-calculator', query: 'loan interest calculator', impressions: 120000, position: 3.4, ctr: 1.1, action: 'Refine Title Variant B' },
  { url: '/calculators/mortgage-calculator', query: 'mortgage calculator online', impressions: 85000, position: 4.1, ctr: 1.4, action: 'Extend FAQ Schema markup' }
];

export default function SeoDashboardPage() {
  return (
    <div className="min-h-screen bg-background p-6">
      <div className="mx-auto max-w-7xl space-y-8">
        <Breadcrumbs items={[{ label: 'SEO Dashboard' }]} />

        <div className="rounded-3xl border border-border bg-card p-6 md:p-8 shadow-sm">
          <h1 className="text-2xl font-black text-foreground mb-2 flex items-center gap-2">
            <Target className="h-6 w-6 text-primary" />
            SEO Opportunity Engine Dashboard
          </h1>
          <p className="text-xs md:text-sm text-foreground/60 leading-relaxed">
            Internal administration console for tracking Search Console metrics, search impressions, and A/B title variants performance.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Quick Wins */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-emerald-500" />
              Quick Wins (Positions 5-20)
            </h2>
            <div className="space-y-3">
              {QUICK_WINS.map((item, idx) => (
                <div key={idx} className="p-3 bg-foreground/5 rounded-xl text-xs md:text-sm space-y-1">
                  <div className="font-bold text-primary">{item.url}</div>
                  <div className="text-foreground/70">Query: <span className="font-semibold text-foreground">{item.query}</span></div>
                  <div className="flex gap-4 text-foreground/50 text-[11px]">
                    <span>Impressions: {item.impressions.toLocaleString()}</span>
                    <span>Position: {item.position}</span>
                    <span>CTR: {item.ctr}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTR Problems */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-sm">
            <h2 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-amber-500" />
              CTR Issues (Low CTR, High Impressions)
            </h2>
            <div className="space-y-3">
              {CTR_ISSUES.map((item, idx) => (
                <div key={idx} className="p-3 bg-foreground/5 rounded-xl text-xs md:text-sm space-y-1">
                  <div className="font-bold text-primary">{item.url}</div>
                  <div className="text-foreground/70">Query: <span className="font-semibold text-foreground">{item.query}</span></div>
                  <div className="flex justify-between items-center mt-2">
                    <div className="flex gap-4 text-foreground/50 text-[11px]">
                      <span>Impressions: {item.impressions.toLocaleString()}</span>
                      <span>CTR: {item.ctr}%</span>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold text-[10px]">
                      {item.action}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
