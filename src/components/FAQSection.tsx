import React from 'react';

interface FAQItem {
  q: string;
  a: string;
}

interface FAQSectionProps {
  faqs: FAQItem[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
  if (!faqs || !Array.isArray(faqs) || faqs.length === 0) return null;
  return (
    <div className="space-y-4">
      {faqs.map((faq, index) => (
        <div 
          key={index} 
          className="rounded-2xl border border-border bg-background/50 p-5 hover:border-primary/20 transition-colors"
        >
          <h3 className="text-sm md:text-base font-bold text-foreground mb-2 flex gap-2">
            <span className="text-primary font-extrabold">Q:</span>
            {faq.q}
          </h3>
          <p className="text-xs md:text-sm text-foreground/75 leading-relaxed pl-5">
            {faq.a}
          </p>
        </div>
      ))}
    </div>
  );
}
