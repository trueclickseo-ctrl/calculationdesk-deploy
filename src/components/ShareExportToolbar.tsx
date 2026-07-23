'use client';

import React, { useState } from 'react';
import { Share2, Link, MessageSquare, Mail, Printer, Check } from 'lucide-react';

interface ShareExportToolbarProps {
  title: string;
  slug: string;
}

export default function ShareExportToolbar({ title, slug }: ShareExportToolbarProps) {
  const [copied, setCopied] = useState(false);

  const getPageUrl = () => {
    if (typeof window !== 'undefined') {
      return window.location.href;
    }
    return `https://calculationdesk.com/calculators/${slug}/`;
  };

  const handleCopyLink = () => {
    const url = getPageUrl();
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out this free ${title} on CalculationDesk!`)}&url=${encodeURIComponent(getPageUrl())}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(getPageUrl())}`,
    whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this free ${title} on CalculationDesk: ${getPageUrl()}`)}`,
    email: `mailto:?subject=${encodeURIComponent(`${title} Results - CalculationDesk`)}&body=${encodeURIComponent(`Here is the link to the ${title} on CalculationDesk:\n\n${getPageUrl()}`)}`
  };

  const triggerPrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="no-print rounded-2xl border border-border bg-card p-4 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4 my-6">
      <div className="flex items-center gap-2 text-foreground/80 font-semibold text-sm">
        <Share2 className="h-4 w-4 text-primary" />
        <span>Share or Export Results</span>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={handleCopyLink}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-background hover:bg-border border border-border text-foreground transition-all cursor-pointer"
          title="Copy Link"
        >
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-500" /> : <Link className="h-3.5 w-3.5" />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>

        <a
          href={shareLinks.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-background hover:bg-border border border-border text-foreground transition-all"
          title="Share on X (Twitter)"
        >
          {/* Custom X Logo */}
          <svg className="h-3.5 w-3.5 text-foreground/80 fill-current" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>

        <a
          href={shareLinks.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-background hover:bg-border border border-border text-foreground transition-all"
          title="Share on Facebook"
        >
          {/* Custom Facebook Logo */}
          <svg className="h-3.5 w-3.5 text-blue-600 fill-current" viewBox="0 0 24 24">
            <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c4.56-.93 8-4.96 8-9.75z"/>
          </svg>
        </a>

        <a
          href={shareLinks.whatsapp}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-background hover:bg-border border border-border text-foreground transition-all"
          title="Share on WhatsApp"
        >
          <MessageSquare className="h-3.5 w-3.5 text-emerald-500" />
        </a>

        <a
          href={shareLinks.email}
          className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-bold bg-background hover:bg-border border border-border text-foreground transition-all"
          title="Email Results"
        >
          <Mail className="h-3.5 w-3.5 text-red-500" />
        </a>

        <button
          onClick={triggerPrint}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-primary hover:bg-primary-hover text-white transition-all cursor-pointer"
          title="Export as PDF / Print Results"
        >
          <Printer className="h-3.5 w-3.5" />
          <span>Save PDF / Print</span>
        </button>
      </div>
    </div>
  );
}
