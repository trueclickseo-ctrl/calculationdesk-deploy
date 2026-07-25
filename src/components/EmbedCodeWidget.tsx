'use client';

import React, { useState } from 'react';
import { Code, Check, Copy } from 'lucide-react';

interface EmbedCodeWidgetProps {
  title: string;
  slug: string;
}

export default function EmbedCodeWidget({ title, slug }: EmbedCodeWidgetProps) {
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe src="https://www.calculationdesk.com/calculators/${slug}/?embed=true" width="100%" height="650" style="border:none;border-radius:12px;box-shadow:0 4px 12px rgba(0,0,0,0.08);" title="${title} Widget"></iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="no-print rounded-2xl border border-border bg-card p-5 shadow-sm mt-8">
      <div className="flex items-center gap-2 mb-3">
        <Code className="h-4.5 w-4.5 text-primary" />
        <h3 className="text-sm md:text-base font-bold text-foreground">Embed this Calculator</h3>
      </div>
      <p className="text-xs text-foreground/60 mb-4">
        You are welcome to embed this tool on your own blog or website. Simply copy the code snippet below and paste it into your HTML code.
      </p>

      <div className="relative flex items-center bg-background rounded-xl border border-border overflow-hidden">
        <input
          type="text"
          readOnly
          value={embedCode}
          className="w-full bg-transparent px-4 py-3 text-[11px] font-mono text-foreground/75 outline-none select-all pr-12"
        />
        <button
          onClick={handleCopy}
          className="absolute right-2 p-1.5 rounded-lg hover:bg-border transition-colors cursor-pointer text-foreground/60 hover:text-foreground"
          title="Copy Embed Code"
        >
          {copied ? <Check className="h-4 w-4 text-emerald-500" /> : <Copy className="h-4 w-4" />}
        </button>
      </div>
    </div>
  );
}
