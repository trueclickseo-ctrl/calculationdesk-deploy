import React from 'react';
import { InlineMarkdown } from '@/components/MarkdownContent';

interface ExampleItem {
  title: string;
  inputs: string;
  calculation: string;
  result: string;
}

interface CalculatorExamplesProps {
  examples: ExampleItem[];
}

export default function CalculatorExamples({ examples }: CalculatorExamplesProps) {
  if (!examples || !Array.isArray(examples) || examples.length === 0) return null;
  return (
    <div className="space-y-6">
      {examples.map((item, index) => (
        <div key={index} className="rounded-2xl border border-border bg-background p-5 space-y-3">
          <h3 className="text-sm md:text-base font-bold text-foreground flex items-center gap-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10 text-primary text-xs font-black">
              {index + 1}
            </span>
            <InlineMarkdown text={item.title} />
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs md:text-sm pt-2 border-t border-border/40">
            <div>
              <span className="font-bold text-foreground/50 uppercase tracking-wider text-[10px]">Inputs Given:</span>
              <p className="mt-1 text-foreground/80 font-medium"><InlineMarkdown text={item.inputs} /></p>
            </div>
            <div>
              <span className="font-bold text-foreground/50 uppercase tracking-wider text-[10px]">Step-by-Step Calculation:</span>
              <p className="mt-1 text-foreground/80 font-medium"><InlineMarkdown text={item.calculation} /></p>
            </div>
            <div>
              <span className="font-bold text-foreground/50 uppercase tracking-wider text-[10px]">Result Obtained:</span>
              <p className="mt-1 text-primary font-bold"><InlineMarkdown text={item.result} /></p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
